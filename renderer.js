const fs = require("fs");

function mergeValues(values, content){
	//cycle over value keys and replace all from the values object
	for(let key in values){
		content = content.replace("{{" + key + "}}", values[key]);
	}
	// return merged content
	return content;
}


function view(templateName, values, response){
	//read from template files
	// doesn't need a callback, it's synchronous
	let fileContents = fs.readFileSync("./views/" + templateName + ".html", {encoding: "utf8"});
	//insert values into the content
	fileContents = mergeValues(values, fileContents);
	//write out to the response
	response.write(fileContents);

}


module.exports.view = view;