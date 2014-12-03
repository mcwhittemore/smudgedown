var markdown = require("markdown").markdown;

var md = "";

process.stdin.on("data", function(data){
	md+=data.toString();
});

process.stdin.on("end", function(data){
	//var html = markdown.toHTML(md);
	//console.log(html);
	var baseBuffer = new Buffer(encodeURIComponent(md));
	var comment = "<-- SMUDGEDOWN-START\n"+baseBuffer.toString('base64')+"\nSMUDGEDOWN-END -->";
	
	var html = markdown.toHTML(md);
	var content = html+"\n"+comment;
	console.log(content);
})