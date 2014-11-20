kangxidecompose
===============


前置處理
-------

dev2014>git clone https://github.com/yapcheahshen/kangxidecompose

dev2014>git clone https://github.com/ksanaforge/kangxizidian

dev2014/kangxizidian>npm install request

dev2014/kangxizidian>node download\_chise.js

dev2014>git clone https://github.com/ksanaforge/kangxizidian

dev2014/kangxizidian>node gen\_kangxi\_wordhead.js

dev2014/kangxizidian>node gen\_chise\_ids.js

dev2014/kangxizidian>node gen\_kangxi\_finalpart.js

後續處理
-------

dev2014/kangxizidian>node gen\_u2b\_b2u.js

	generate u2b.s and b2u.js

dev2014/kangxizidian>node gen\_kangxi\_finalpart1.js (常用字)

	generate kangxi_finalpart1.js

dev2014/kangxizidian>node gen\_kangxi\_finalpart2.js (常用字)

	產生 kangxi_finalpart2.csv (12531 詞頭拆分)
	產生 kangxi_part2.csv (431 部件排序)

dev2014/kangxizidian>node gen\_kangxi\_finalpart3.js (完整)

	產生 kangxi_finalpart3.csv (46844 詞頭拆分)
	產生 kangxi_part3.csv (1892 部件排序)
	產生 kangxi_unknownFreq3.csv (1260 無碼部件分析)
	
dev2014/kangxizidian>gulp qunit --js=gen\_kangxi\_finalpart3.js

	除錯追蹤 環境起動

相當處理包括資訊
--------------

CJK Radicals Supplement ([⺀](http://www.unicode.org/charts/PDF/U2E80.pdf) ~ [⻳](http://www.unicode.org/charts/PDF/U2E80.pdf))

	U+2E80 ~ U+2EF3

unicodeExt-a ([㐀](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=3400) ~ [䶵](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=4DB5))

	U+3400 ~ U+4DB5	

unicode CJK 中日韓漢字內碼 ([一](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=4E00) ~ [龥](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=9FA5))

	U+4E00 ~ U+9FA5	

unicode ext-b ([𠀀](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=20000) ~ [𪛖](http://www.unicode.org/cgi-bin/GetUnihanData.pl?codepoint=2A6D6))

	U+20000 ~ U+2A6D6	 

Variation Selectors Supplement

	U+E0100 ~ U+E01EF 

歸納目前所寫的 js 程式檔
----------------------

1. gen\_u2b\_b2u.js 用以從 Unihan_OtherMappings.txt 產生 u2b.js 及 b2u.js 

2. gen\_kangxi\_finalpart1.js + kangxi\_finalpart.js (原字頭拆分表) + u2b.js (unicode 轉 big5)
    用以產生 kangxi_finalpart1.js (保留big5常用字)

3. gen\_kangxi\_finalpart2.js + kangxi\_finalpart1.js (big5常用字) + u2b.js (unicode 轉 big5)
    用以產生 kangxi_finalpart2.csv (12531 字頭拆分) + kangxi_part2.csv (431 部件排序)

4. gen\_kangxi\_finalpart3.js + kangxi\_finalpart.js (原字頭拆分表) + u2b.js (unicode 轉 big5)
    用以產生 kangxi_finalpart3.csv (46844 字頭拆分) + kangxi_part3.csv (1892 部件排序) + kangxi_partFreq3.csv (1260 部件排序) 

5. gen\_kangxi\_finalpart4.js + kangxi_finalpart3.csv (46844 字頭拆分表去引號) + kangxi_part3.csv (1260 部件排序表保留兩欄並去引號)
    用以產生 (46844 字頭拆分頁) kangxi_finalpart3.htm 及 kangxi_part3.htm (1260 部件排序頁)