const Profile = require("./profile.js");
const renderer = require("./renderer.js");


//Handle HTTP route GET/ POST/
function home(request, response){
	if(request.url === "/"){
		response.writeHead(200, {"Content-Type": "text/plain"});
		renderer.view("header", {}, response);
		renderer.view("search", {}, response);
		renderer.view("footer", {}, response);
		response.end();
	}
}


//Handle HTTP route GET/:username
function user(request, response){
	const username = request.url.replace("/", "");
	if(username.length > 0){
		response.writeHead(200, {"Content-Type": "text/plain"});
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
			}
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

module.exports.home = home;
module.exports.user = user;
