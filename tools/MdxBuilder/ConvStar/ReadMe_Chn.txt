转换Star Dict文件到mdx格式的步骤:
1) 从http://stardict.sourceforge.net/Dictionaries.php下载tarball格式的辞典文件
下面的步骤以http://stardict.sourceforge.net/Dictionaries_ja.php内的辞典为示范

2) 下载 "JMDict-en-ja dictionary" 和 "JMDict-ja-en dictionary"
通常一个辞典一个文件, 下面会示范如何合并两个辞典文件所有要下载两个辞典

3) 将文件解压到c:\temp
c:\temp目录下应该有4个文件:
2003-07-04  01:47         1,414,385 jmdict-en-ja.dict.dz
2003-11-12  19:38         2,392,521 jmdict-en-ja.idx
2003-11-12  19:38               351 jmdict-en-ja.ifo
2003-07-04  01:47         2,702,509 jmdict-ja-en.dict.dz
2003-11-12  19:38         3,732,514 jmdict-ja-en.idx
2003-11-12  19:38               352 jmdict-ja-en.ifo

4) 将"convstar.exe" 和 "star_style.txt" 也copy到 c:\temp 目录下

5) 运行:
a) convstar jmdict-en-ja.ifo e2j.txt
b) convstar jmdict-ja-en.ifo j2e.txt
c) copy e2j.txt+j2e.txt all.txt /b
如果你不想合并辞典,可以省略b) 和 c)

6) 运行 MdxConvert, 填入以下参数
Source: C:\temp\all.txt
Target: C:\temp\JMDict.mdx
Format: C:\temp\star_style.txt
Original Format: MDict(Compact HTML)
Encoding: UTF-8(Unicode)   <---Must use UTF-8 for all stardict dictionaries
Title: JMDict English-Japnanese Dictionary
Description: <font size=5 color=red>JMDict English-Japnanese Dictionary</font>

7) Click Start

8) Done. 

注意: 部分辞典含有国际音标(International phonetic alphabets(IPA) symbols), 如果需要正常显示音标的话, 需要在PDA中安装支持IPA的TrueType字体, 例如win98/2000/XP  中的"Lucida Sans Unicode" ( 将windows\fonts\l_10646.ttf copy到PDAs的\windows\ or \windows\fonts\, 可能需要软启动你的Pocket PC)


