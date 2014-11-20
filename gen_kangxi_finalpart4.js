// 讀取 字頭拆解分析表 kangxi_finalpart3.csv 及 末級部件排序表 kangxi_part3.csv
// 產生 字頭拆解分析頁 kangxi_finalpart3.htm 及 末級部件排序頁 kangxi_part3.htm
function csv2trs(csv){
	return csv.map(function(rec){
		var tr
			='<tr>'
			+rec.split(',').map(function(fld){
				var th
					='<th>'
					+fld
					+'</th>'
				return th;
			}).join('')
			+'</tr>\r\n'
		return tr;
	}).join('');
}
var fs=require("fs");
var csv1=fs.readFileSync("kangxi_finalpart3.csv",'utf8').split('\n');
var n=csv1.length;
console.log("kangxi_finalpart3.csv",n);
console.log(0,csv1[0]);
console.log(n-1,csv1[n-1]);
var htm1
	='<meta charset="utf-8">康熙字典 字頭拆分 依 u碼 排序<table border=1>\r\n'
	+'<tr><th>字頭</th><th>u碼</th><th>b碼</th>'
	+'<th>字根</th><th>u碼</th><th>字根</th><th>u碼</th></tr>\r\n'
	+csv2trs(csv1)
	+'</table>'
;
fs.writeFileSync("kangxi_finalpart3.htm",htm1,'utf8');
var csv2=fs.readFileSync("kangxi_part3.csv",'utf8').split('\n');
var n=csv2.length;
console.log("kangxi_part3.csv",n);
console.log(0,csv2[0]);
console.log(n-1,csv2[n-1]);
var htm2
	='<meta charset="utf-8">字根依 u碼 排序<table border=1>\r\n'
	+'<tr><th>u碼</th><th>字根</th></tr>\r\n'
	+csv2trs(csv2)
	+'</table>'
;
fs.writeFileSync("kangxi_part3.htm",htm2,'utf8');