Steps to convert Star dict dictionary files into mdx format:
1) download the dictionary files in tarball format from http://stardict.sourceforge.net/Dictionaries.php
the following steps will use file in http://stardict.sourceforge.net/Dictionaries_ja.php as example

2) download both "JMDict-en-ja dictionary" and  "JMDict-ja-en dictionary"
One dictionary file is enough, but we will show you how to merge two dictionary into one file, so need to download two dictionaries here.

3) extract the file into a temporary directory for example: c:\temp
There should be 4 files in c:\temp now:
2003-07-04  01:47         1,414,385 jmdict-en-ja.dict.dz
2003-11-12  19:38         2,392,521 jmdict-en-ja.idx
2003-11-12  19:38               351 jmdict-en-ja.ifo
2003-07-04  01:47         2,702,509 jmdict-ja-en.dict.dz
2003-11-12  19:38         3,732,514 jmdict-ja-en.idx
2003-11-12  19:38               352 jmdict-ja-en.ifo

4) copy the "convstar.exe" and "star_style.txt" into c:\temp too. 

5) run:
a) convstar jmdict-en-ja.ifo e2j.txt
b) convstar jmdict-ja-en.ifo j2e.txt
c) copy e2j.txt+j2e.txt all.txt /b
if you don't need to merge two dictionaries into one, you can stip b) and c)

6) Run MdxConvert, fill in these parameters:
Source: C:\temp\all.txt
Target: C:\temp\JMDict.mdx
Format: C:\temp\star_style.txt
Original Format: MDict(Compact HTML)
Encoding: UTF-8(Unicode)   <---Must use UTF-8 for all stardict dictionaries
Title: JMDict English-Japnanese Dictionary
Description: <font size=5 color=red>JMDict English-Japnanese Dictionary</font>

7) Click Start

8) Done. 

Note: Some dictionaries contains International phonetic alphabets(IPA) symbols, to display them correctly, you need to install true type fonts which support IPA, for example the Lucida Sans Unicode font in win98/2000/XP 
( copy the windows\fonts\l_10646.ttf  into PDAs \windows\ or \windows\fonts\, may need to soft reset your pocket pc)