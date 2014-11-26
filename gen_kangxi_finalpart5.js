// 讀取 字頭拆分依u碼排序表 kangxi_finalpart3.csv 及 字根依u碼排序表 kangxi_part3.csv
// 產生 字頭拆分依u碼排序01000.htm 及 末級部件排序頁 kangxi_part3.htm
var fs
	= require("fs");
var csv1
	= fs.readFileSync('kangxi_finalpart3.csv','utf8').split('\n');
var csv2
	= fs.readFileSync("kangxi_part3.csv",'utf8').split('\n');
var part={};
	csv2.forEach(function(t,i){
		var p=t.split(',')[0]
		part[p]=i+1;
	})
//////////////////////////////////////////////////////////////////////////////
var d6
	= function(i){
		i=i.toString(); return '00'.substr(0,6-i.length)+i;
	}
var csv2htm
	= function (file,header,csv,tailer){
		var htm=header;
		for(var i=0;i<csv.length;i++){
			if(i&&i%1000===0){
				fs.writeFileSync(file+d6(i)+'.htm',htm+tailer,'utf8');
				htm=header;
			}
			var tr
				='<tr><th>'+(i+1)+'</th>'
				+csv[i].split(',').map(function(fld,j){
					var th='';
					if(j>3&&1-j%2){
						var x=part[fld]
						th+='<th>'+x+'</th>';
					}
					th+='<th>'+fld+'</th>';
				//	console.log(th)
					return th;
				}).join('')
				+'</tr>\r\n';
			htm+=tr;
		};
		fs.writeFileSync(file+d6(i)+'.htm',htm+tailer,'utf8');
	}
//////////////////////////////////////////////////////////////////////////////
var file1
	='字頭拆分依u碼排序';
var header1
	='<meta charset="utf-8">康熙字典 字頭拆分 依 u碼 排序<table border=1>\r\n'
	+'<tr><th>字頭序</th><th>字頭</th><th>u碼</th><th>b碼</th>'
	+'<th>字根</th><th>字根序</th><th>u碼</th><th>字根</th><th>字根序</th><th>u碼</th></tr>\r\n';
var tailer1
	='</table>';
csv2htm(file1,header1,csv1,tailer1);
//////////////////////////////////////////////////////////////////////////////
var file2
	='字根依u碼排序';
var header2
	='<meta charset="utf-8">字根依 u碼 排序<table border=1>\r\n'
	+'<tr><th>字根序</th><th>u碼</th><th>字根</th></tr>\r\n';
var tailer2
	='</table>';
csv2htm(file2,header2,csv2,tailer2);