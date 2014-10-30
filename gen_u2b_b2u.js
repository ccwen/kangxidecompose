var fs=require("fs");
var lines=fs.readFileSync('u2b.txt','utf8').split(/\r\n/);
console.log('u2b.txt',lines.length,'lines');
var u2b={}, b2u={};
lines.forEach(function(line){
	var m=line.match(/U\+([0-9A-F]+)\s([0-9A-F]+)/)
	if(m){
	//	console.log(m[1],m[2]);
		u=parseInt(m[1],16),b=parseInt(m[2],16);
		u2b[u]=b, b2u[b]=u;
	}
});
fs.writeFileSync('u2b.js','module.exports='+JSON.stringify(u2b,null,' '),'utf8');
fs.writeFileSync('b2u.js','module.exports='+JSON.stringify(b2u,null,' '),'utf8');
/*
var filelist=["IDS-UCS-Basic.txt",
"IDS-UCS-Compat-Supplement.txt","IDS-UCS-Compat.txt",
"IDS-UCS-Ext-A.txt",
"IDS-UCS-Ext-B-1.txt","IDS-UCS-Ext-B-2.txt","IDS-UCS-Ext-B-3.txt","IDS-UCS-Ext-B-4.txt","IDS-UCS-Ext-B-5.txt","IDS-UCS-Ext-B-6.txt",
"IDS-UCS-Ext-C.txt",
"IDS-UCS-Ext-D.txt",
"IDS-UCS-Ext-E.txt"];
var count=0;
var pat=/<wh .*?>(.*)<\/wh>/;
var out=[];

var processline=function(line) {
	if (line[0]!="U") return;
	var fields=line.split("\t");
	out.push('"'+fields[1]+'":"'+fields[2]+'"');
	count++;
}
var processfile=function(fn) {
	var content=fs.readFileSync("chise/raw/"+fn,"utf8")
              .replace(/\r?\n/,"\n").split("\n");
	content.map(processline);             
}
filelist.map(processfile);
fs.writeFileSync("chise_ids.js",
	'module.exports={'+out.join(",\n")+'}',"utf8");
console.log("wordhead count"+count);
*/