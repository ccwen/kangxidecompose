var fs=require("fs"); // 產生 康熙字典 末級部件表 及 常用字拆解分析表
	
function decodeUnicode(str) { // handling ext-b surrogate pairs as well
    var r = [], i = 0;
    while(i < str.length) {
        var chr = str.charCodeAt(i++);
        if(chr >= 0xD800 && chr <= 0xDBFF) {
            // surrogate pair
            var low = str.charCodeAt(i++);
            r.push(0x10000 + ((chr - 0xD800) << 10) | (low - 0xDC00));
        } else {
            // ordinary character
            r.push(chr);
        }
    }
    return r;
}
var kangxi_finalpart1=require("./kangxi_finalpart1.js");
//console.log(kangxi_finalpart1["併"]);
//exit;
var u2b=require("./u2b.js");
console.log('kangxi_finalpart1',Object.keys(kangxi_finalpart1).length,'wordheads');
var out=[],P={},K=Object.keys(kangxi_finalpart1);
var err=0;
for(var i=0; i<K.length; i++){ var k=K[i];
	if(i===5906||i===6735||i===7086){
		kangxi_finalpart1[k]=kangxi_finalpart1[k][0].split('');
		console.log(err++,i,'字 =',k,'部 =',kangxi_finalpart1[k]);
	}
	var o=[k,decodeUnicode(k).map(function(c){
		if(i===5906||i===6735||i===7086){
			console.log(err++,i,'字 =',k,'字碼= U+'+c.toString(16));
			console.log(err++,i,'字 =',k,'部碼= ',
				kangxi_finalpart1[k].map(function(p){
					return 'U+'+decodeUnicode(p)[0].toString(16);
				})
			);
		}
	//	if(err<300&&c<0x3400) console.log(err++,i,'字 =',k,'字碼= U+',c.toString(16),'<0x3400');
		return 'U+'+c.toString(16);
	}).join(',')];
	kangxi_finalpart1[k].forEach(function(p){
		if(p!=='?'){
			P[p]=P[p]||0, P[p]++;
			u=decodeUnicode(p).map(function(c){
			//	if(err<300&&c<0x3400) console.log(err++,i,'部 =',p,'部碼= U+',c.toString(16),'<0x3400');
				return 'U+'+c.toString(16);
			}).join(',')
		} else u='';
		o.push(p),o.push(u);
	});
	out.push(o.map(function(p){return '"'+p+'"'}).join(','));
};
console.log('kangxi_finalpart2.csv',out.length,'wordheads');
fs.writeFileSync("kangxi_finalpart2.csv",out.join(",\n"),'utf8');
var p=Object.keys(P);
out=p.map(function(c,j){
	return [c,decodeUnicode(c)[0]];
}).sort(function(a,b){return a[1]-b[1];}).map(function(a){
	return '"'+a[0]+'","U+'+a[1].toString(16)+'"'
});
console.log('末級部件總數',out.length);
fs.writeFileSync("kangxi_part2.csv",out.join(",\n"),'utf8');