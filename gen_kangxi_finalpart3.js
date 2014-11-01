debugger
var fs=require("fs");	// 產生 康熙字典 字頭拆解分析表 及 末級部件排序表
function hex(n,m){		// 將整數轉成 16 進制字串 (前置 0 補足 m 碼)
	if(!n) return '';
	m=m||5;									// 預設 n 為 整數 0, m 為 5
	if(typeof n!=='string')
		n=n.toString(16);					// 整數 n 轉成 16 進制字串 t
	return '0000'.substr(0,m-n.length)+n;	// 前置 0 補足 m 碼
}
function utf16Char(codeUnit){				// 將整數轉成 utf16 字符
	return String.fromCharCode(codeUnit);
}
function deUnicode(str) { // 將 utf16 字串 轉成 unicode 整數陣列
// extract unicodes (integer array) from given utf16 string
    var charCodes = [], i = 0;
    while(i < str.length) {
        var charCode = str.charCodeAt(i++);
        if(charCode<0xD800 || charCode>0xDBFF) // ordinary character or user defined
            charCodes.push(charCode);
        else // extract surrogate pair (get upper bits and additional lower 10 bits)
            charCodes.push(0x10000 + ((charCode-0xD800)<<10) | (str.charCodeAt(i++)-0xDC00));
    }
    return charCodes; // integer array (each value < 0x30000)
}
function enUnicode(unicodes){ // 將 unicode 整數陣列 轉成 utf16 字串
// encode utf16 string from given unicodes (integer array)
    var TEN_BITS = parseInt('1111111111', 2);
    return unicodes.map(function(codePoint){
	    if (codePoint<0x10000)	// ordinary (value<0xd800) or user defined (value>=0xe000)
	        return utf16Char(codePoint);
	    codePoint -= 0x10000;	// encodeing surrogate pair
	    return utf16Char(0xD800+(codePoint>>10)) + utf16Char(0xDC00+(codePoint&TEN_BITS));
    }).join('');
}
var P={};					// 部件引用頻次 資訊
function countPart(k,p){		// 部件引用頻次 累計
	var o=P[p];
	if(!o)
		P[p]=o=[];
//	if(o.indexOf(k)<0)
		o.push(k);
}
var kangxi_finalpart=require("./kangxi_finalpart.js");
console.log('載入 康熙詞頭拆分前置資訊 kangxi_finalpart.js',Object.keys(kangxi_finalpart).length);
var u2b=require("./u2b.js");
console.log('載入 unicode 轉 big5 資訊 u2b.js',Object.keys(u2b).length);
var K=Object.keys(kangxi_finalpart);		// 康熙詞頭陣列
var unknown={names:[''],code:[''],length:0};// 無對應 unicode 部件 資訊
var unknownInd;								// 無對應 unicode 部件 序號 與 名稱
var out=[];									// 輸出準備陣列
for(var i=0; i<K.length; i++){
	var k=K[i];								// 詞頭 字串
	var u=deUnicode(k)[0];					// 詞頭 unicode	整數值
	var b=u2b[u];							// 詞頭 big5	對應值
	u='u'+hex(u);							// 詞頭 unicode	碼
	b=b?('b'+hex(b)):'';					// 詞頭 big5	碼 若無對應 unicode 碼 就設為空字串
	var o=[k,u,b];							// 當前資料列 準備輸出 前三欄 詞頭,unicode碼,big5碼
	var parts=kangxi_finalpart[k];			// 部件字串 陣列
	var e;									// 部件字符 
	parts=parts.filter(function(p){
		return deUnicode(p)[0]<0x30000;		// 忽略 Variation Selectors U+E0100 ~ U+E01EF
	});
	parts.forEach(function(p){
		if(p=='?'||p.match(/&.+?;/)){		// 部件字串 若無對應 unicode 碼
			unknownInd=unknown[p];			// 取 無碼部件 序號
			if(!unknownInd){				// 序號為 0 表示 未處理過
				unknown[p]=unknownInd=++unknown.length; // 自動產生 無碼部件 序號
				unknown.names[unknownInd]='?'+unknownInd.toString(16);
				unknown.code [unknownInd]=p;
			}
			var q=unknown.names[unknownInd];	// 無碼部件 名稱     ?1 ~   ?4e9
			o.push(q), countPart(k,q);			// 無碼部件 頻次 累計
			o.push('q'+hex(unknownInd));		// 無碼部件 代碼 u00001 ~ u004e9
		} else {
			p=deUnicode(p);						// 部件字串 轉為 部件字符 unicode 整數陣列
			p.forEach(function(c){ 				// 部件字符 unicode 整數值 c
				e=enUnicode([c]);				// 部件字符 e
				o.push(e), countPart(k,e);		// 部件字符 頻次 累計
				o.push('u'+hex(c));			// 部件字符 代碼 U02e81 ~ U2f97a
			})
		}
	});
	out.push(o.map(function(x){
		return '"'+x+'"';
	}).join(','));
};
console.log('詞頭拆分總數',out.length);
fs.writeFileSync("kangxi_finalpart3.csv",out.join("\n"),'utf8');
out=Object.keys(P).map(function(e){var x;
	if(e.substr(0,1)==='?')
		c='q'+hex(parseInt(e.substr(1),16));
	else
		c='u'+hex(deUnicode(e)[0]);
	return '"'+c+'","'+e+'","'+P[e].join(',')+'"';
});
console.log('部件排序總數',out.length);
fs.writeFileSync("kangxi_part3.csv",out.sort().join("\n"),'utf8');
console.log('無碼部件總數',unknown.length);
function demo(h){
	return h+'='+kangxi_finalpart[h].join('').replace(/&.+?;|\?/g,function(m){return '(?'+unknown[m].toString(16)+')'})
}
out=unknown.names.slice(1).map(function(e,i){
	var o='0x'+hex(P[e].length,3)+',"'+e+'","'+unknown.code[i+1]+'","';
	if(P[e].length>1) o+=demo(P[e][0])+','+demo(P[e][1])+'","';
	return o+P[e].join(',')+'"';
}).sort();
fs.writeFileSync("kangxi_unknownFreq3.csv",out.join("\n"),'utf8');