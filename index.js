import fs from 'fs';
import readline from 'readline';
import { marked } from 'marked';
import { htmlToText } from 'html-to-text';

//// CONFIGS
// Raw gpt4dict json file
const jsonFilePath = './res/gptwords.json';
// Format raw json data to json object array
const jsonFormattedFilePath = './out/gptwords_formatted.json';
// MDX source file
const mdxSrcFilePath = './out/gptwords.txt';
// Invalid content data in raw json
const invalidWords = [
  'Bahmad',
  'NBA',
  'XD',
  'generally',
  'imply',
  'ore',
  'presently',
  'assistance',
  'firefighter',
  'sensor',
  'ozone',
  'upbringing',
  'zoom',
  'vengeance',
  'whisker'
];

// Categories of words (CN: EN)
const enCategories = {
  分析词义: 'def',
  例句: 'ex',
  词根分析: 'root',
  发展历史和文化背景: 'hist',
  单词变形: 'forms',
  记忆辅助: 'aid',
  小故事: 'story'
};

// Categories of words (EN: CN)
const cnCategories = Object.fromEntries(
  Object.entries(enCategories).map(([key, value]) => [value, key])
);

// Chinese categories
const categories = Object.keys(enCategories);

// Total of words
let total = 0;

/**
 * Parse raw word's content
 * @param {string} Raw word's content
 * @returns Object content
 */
const parseContent = content => {
  const html = marked(content);
  content = htmlToText(html);
  if (!content.startsWith('分析词义')) {
    content = '分析词义\n' + content;
  }

  const sections = {};
  let currentKeyword = '';
  let currentEnKeyword = '';

  const regex = new RegExp(`(${categories.join('|')})`, 'g');
  const parts = content.split(regex);

  parts.forEach(part => {
    const key = part.trim();
    if (categories.includes(key)) {
      currentKeyword = key;
      currentEnKeyword = enCategories[key];
      sections[currentEnKeyword] = '';
    } else if (currentKeyword) {
      sections[currentEnKeyword] += part.trim() + '\n\n';
    }
  });

  for (let key in sections) {
    sections[key] = sections[key]
      .trim()
      .replace(/^[:：\*]+|[:：\*]+$/g, '')
      .replace(new RegExp(`列举$`), '')
      .trim();
  }

  return sections;
};

/**
 * Convert raw json file to formatted json object array file and mdx source file
 * @param {array} Actions of convert, ["json", "mdx"]
 */
const convertDict = async actions => {
  let jsonArray = [];

  if (actions.includes('json')) {
    console.log('Begin to format JSON.');
    const fileStream = fs.createReadStream(jsonFilePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });

    for await (const line of rl) {
      const jsonObject = JSON.parse(line);
      const word = jsonObject.word;
      if (invalidWords.includes(word)) {
        console.log(`Invalid word: ${word}.`);
        continue;
      }
      const content = parseContent(jsonObject.content);
      jsonObject.content = content;
      jsonArray.push(jsonObject);
      if (Object.keys(content).length < 2) {
        console.log(`Add to invalid word: ${word}.`);
        break;
      }
      total++;
    }
    console.log(`Total of words: ${total}.`);

    fs.writeFile(
      jsonFormattedFilePath,
      JSON.stringify(jsonArray, null, 2),
      err => {
        if (err) {
          console.error(`Error writing to JSON file: ${err}.`);
        } else {
          console.log(
            `Formated JSON file is written to ${jsonFormattedFilePath}.`
          );
        }
      }
    );
  }

  if (actions.includes('mdx')) {
    console.log('Begin to generate mdxBuilder source file.');
    if (fs.existsSync(mdxSrcFilePath)) {
      fs.unlinkSync(mdxSrcFilePath);
    }
    if (jsonArray.length == 0) {
      const rawJson = fs.readFileSync(jsonFormattedFilePath);
      jsonArray = JSON.parse(rawJson);
    }

    const writeStream = fs.createWriteStream(mdxSrcFilePath, { flags: 'a' });
    jsonArray.forEach(word => {
      writeStream.write(word.word + '\r\n');
      writeStream.write(
        `<div style="background: #fff; color: #555; line-height: 180%">\r\n<div style="font-size: 16px; font-weight: bold; color: #000; padding: 10px 0">${word.word}</div>\r\n`
      );
      let id = 1;
      for (const key in word.content) {
        const content = word.content[key].replace('\n', '<br>');
        writeStream.write(
          `<div style="padding: 5px; font-size: 12px; font-weight: bold; background: #eee">${id}. ${cnCategories[key]}</div>\r\n`
        );
        writeStream.write(
          `<div style="font-size: 14px; padding: 10px">${content}</div>\r\n`
        );
        id++;
      }
      writeStream.write('</div>\r\n');
      writeStream.write('</>\r\n');
    });
    writeStream.end();
    console.log(`mdxBuilder source file is written to ${mdxSrcFilePath}.`);
  }
};

// Two arguments of command line
// json: Convert to formated json
// mdx: Convert to mdx source file
// Empty: json and mdx
const args = process.argv;
let actions = ['json', 'mdx'];
if (args.length > 2) {
  actions = [args[2]];
}

await convertDict(actions);
