var fs=require("fs");
var kangxi_wordhead=require("./kangxi_wordhead");
console.log('kangxi_wordhead',kangxi_wordhead.length-3,'wordheads');
var u2b=require("./u2b.js");
console.log('u2b',Object.keys(u2b).length,'characters');
var kangxi_finalpart=require("./kangxi_finalpart.js");
console.log('kangxi_finalpart',Object.keys(kangxi_finalpart).length,'wordheads');
var maxNumParts=0;
var out=[];
var big5_wordhead=kangxi_wordhead.slice(3)
.filter(function(c){return u2b[c.charCodeAt(0)];});
console.log('big5_wordhead',big5_wordhead.length,'wordheads');
big5_wordhead.forEach(function(c){
	var parts=kangxi_finalpart[c], n=parts.length;
	if(n>maxNumParts)maxNumParts=n;
	out.push('"'+c+'":['+parts.map(function(p){return '"'+p.replace(/&.+?;/,'?')+'"'})+']');
});
console.log('maxNumParts',maxNumParts);
console.log('kangxi_finalpart1',out.length,'wordheads');
fs.writeFileSync("kangxi_finalpart1.js","module.exports={"+out.join(",\n")+"}","utf8");