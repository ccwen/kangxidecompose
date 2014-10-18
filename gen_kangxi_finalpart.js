var fs=require("fs");
var tokenize=require("./tokenize");
var chise_ids=require("./chise_ids");
var kangxi_wordhead=require("./kangxi_wordhead");
var out=[];
var findids=function(wh) {
	var ids=chise_ids[wh];
	if (!ids) return;
	ids=ids.replace(/[\u2ff0-\u2fff]/g,""); //remove idc
	var tokens=tokenize(ids).tokens;
	out.push('"'+wh+'":'+JSON.stringify(tokens));
}
kangxi_wordhead.forEach(findids);
fs.writeFileSync("kangxi_finalpart.js","module.exports={"+out.join(",\n")+"}","utf8");