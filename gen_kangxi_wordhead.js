var fs=require("fs");
var filelist=fs.readFileSync("../kangxizidian/xml/kangxizidian.lst","utf8")
              .replace(/\r?\n/,"\n").split("\n");
console.log('filelist.length',filelist.length);
var count=0;
var pat=/<wh .*?>(.*)<\/wh>/;
var out=[];
var processline=function(line) {
	var m=line.match(pat);
	if (m) {
		var wh=m[1];
		if (wh.indexOf("<")>-1) {
			console.warn("error wordhead",wh);
			wh=wh.substr(0,wh.indexOf("<"));
		}
		if (wh[0]!='&') out.push(wh);
		count++;
	}
}
var processfile=function(fn) {
	console.log("processing"+fn);
	var content=fs.readFileSync("../kangxizidian/xml/"+fn,"utf8")
              .replace(/\r?\n/,"\n").split("\n");
	content.map(processline);             
}
filelist.map(processfile);
fs.writeFileSync("kangxi_wordhead.js",
	'module.exports=["'+out.join('","')+'"]',"utf8");
console.log("wordhead count"+count);