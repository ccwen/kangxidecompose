var fs=require("fs");
var tokenize=require("./tokenize");
var chise_ids=require("./chise_ids");
var kangxi_wordhead=require("./kangxi_wordhead");
var out=[];

var getparts=function(wh) {
	var ids=chise_ids[wh];
	if (!ids) return;
	parts=ids.replace(/[\u2ff0-\u2fff]/g,""); //remove idc
	var parts=tokenize(parts).tokens;
	return parts;
}
var findids=function(wh) {
	var parts=getparts(wh);
	if (!parts) return;
	var finalparts=[];
	while (parts.length) {
		var part=parts.shift();
		var childparts=getparts(part);
		if (!childparts||childparts.length==1) {
			finalparts.push(part);
		} else {
			parts=parts.concat(childparts);
		}
	}
	out.push('"'+wh+'":'+JSON.stringify(finalparts));
}
kangxi_wordhead.forEach(findids);
fs.writeFileSync("kangxi_finalpart.js","module.exports={"+out.join(",\n")+"}","utf8");