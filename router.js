const Profile = require("./profile.js");
const renderer = require("./renderer.js");
const queryString = require("querystring");
const fs = require("fs");

const commonHeader = {"Content-Type": "text/html"};


//Handle HTTP route GET/ POST/
function home(request, response){
	if(request.url === "/"){
		if(request.method.toLowerCase() === "get"){
			//show search
			response.writeHead(200, commonHeader);
			renderer.view("header", {}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		}
		else{
			//get post data from body, extract username, redirect to /:username
			request.on("data", function(postBody){
				let query = queryString.parse(postBody.toString());
				response.writeHead(303, {"Location": "/" + query.username});
				response.end();
			});
		}
	}
}


//Handle HTTP route GET/:username
function user(request, response){
	const username = request.url.replace("/", "");
	if(username.length > 0 && request.url.indexOf(".css") === -1){
		response.writeHead(200, commonHeader);
		renderer.view("header", {}, response);

		//get json from Treehouse
		const studentProfile = new Profile(username);
		studentProfile.on("end", function(profileJSON){
			//store JSON values we need
			const values = {
				avatarUrl: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			};
			//simple response + end response
			renderer.view("profile", values, response);
			renderer.view("footer", {}, response);
			response.end();
		});

		//on error
		studentProfile.on("error", function(error){
			renderer.view("error", {errorMessage: error.message}, response);
			renderer.view("search", {}, response);
			renderer.view("footer", {}, response);
			response.end();
		});

	}
}

//deliver css
function css (request, response) {
	if (request.url.indexOf(".css") !== -1){
		const file = fs.readFileSync(`.${request.url}`, {"encoding" : "utf8"});
		response.writeHead(200, {"Content-Type" : "text/css"});
		response.write(file);
		response.end();
	}
}

module.exports.css = css;
module.exports.home = home;
module.exports.user = user;
