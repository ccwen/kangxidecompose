kangxidecompose
===============

C:\dev2014>git clone https://github.com/yapcheahshen/kangxidecompose

C:\dev2014>git clone https://github.com/ksanaforge/kangxizidian

C:\dev2014/kangxizidian>npm install request

C:\dev2014/kangxizidian>node download_chise.js

C:\dev2014>git clone  https://github.com/ksanaforge/kangxizidian

C:\dev2014/kangxizidian>node gen_kangxi_wordhead.js

C:\dev2014/kangxizidian>node gen_chise_ids.js

C:\dev2014/kangxizidian>node gen_kangxi_finalpart.js

㐀 [U+3400](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=3400)	~ 䶵 [U+4DB5](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=4DB5)	unicode ext-a 

一 [U+4E00](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=4E00)	~ 龥 [U+9FA5](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=9FA5)	unicode CJK 中日韓漢字內碼

𠀀 [U+20000](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=20000)	~ 𪛖 [U+2A6D6](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=2A6D6)	unicode ext-b 

歸納目前所寫的 js 程式檔如下:

1. gen_u2b_b2u.js 用以從 Unihan_OtherMappings.txt 產生 u2b.js 及 b2u.js 

2. gen_kangxi_finalpart1.js + kangxi_finalpart.js (原字頭分析表) + u2b.js (unicode 轉 big5)
    用以產生 kangxi_finalpart1.js (保留big5常用字)

3. gen_kangxi_finalpart2.js + kangxi_finalpart1.js (big5常用字) + u2b.js (unicode 轉 big5)
    用以產生 kangxi_finalpart2.csv (12531 字頭分析) + kangxi_part2.csv (431 常用字部件排序)

4. gen_kangxi_finalpart3.js + kangxi_finalpart.js (原字頭分析表) + u2b.js (unicode 轉 big5)
    用以產生 kangxi_finalpart3.csv (46844 字頭分析) + kangxi_part3.csv (631 常用字部件排序)