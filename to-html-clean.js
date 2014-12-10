var markdown = require("markdown").markdown;
var fs = require("fs");

var template = "<div class='smudgedown' />";
var templatePath = "None Used"
var templateFinder = /\<div[\s]+class[ ]*=[\s]*["']smudgedown["'][\s]*\/[\s]*>/;

var md = "";

if(fs.existsSync(process.argv[2])){
	var bits = process.argv[2].split("/");
	bits[bits.length-1] = ".template",-1
	var templatePath = bits.join("/");
	if(fs.existsSync(templatePath)){
		template = fs.readFileSync(templatePath).toString();
	}
}

process.stdin.on("data", function(data){
	md+=data.toString();
});

process.stdin.on("end", function(data){
	//var html = markdown.toHTML(md);
	//console.log(html);
	var baseBuffer = new Buffer(encodeURIComponent(md));
	var comment = "<!-- SMUDGEDOWN-START\n"+baseBuffer.toString('base64')+"\nSMUDGEDOWN-END -->";
	
	var html = markdown.toHTML(md);
	var content = html+"\n"+comment;

	var out = template.replace(templateFinder, content);
	if(out==template){
		console.error("Invalid Template", templatePath);
		console.log(content);
	}
	else{
		console.log(out);
	}


});
