var fs=require("fs");
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