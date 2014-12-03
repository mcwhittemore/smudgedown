var html = "";

process.stdin.on("data", function(data){
	html += data.toString();
});

process.stdin.on("end", function(data){
	var startString = "<-- SMUDGEDOWN-START\n";
	var start = html.indexOf(startString);
	var end = html.indexOf("\nSMUDGEDOWN-END -->");

	var base64 = html.substr(start+startString.length,end-start-startString.length);
	
	var buff = new Buffer(base64, "base64");
	var encoded = buff.toString();
	var content = decodeURIComponent(encoded);
	console.log(content);
});