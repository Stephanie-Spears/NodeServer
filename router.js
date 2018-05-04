const Profile = require("./profile.js");


//Handle HTTP route GET/ POST/
function home(request, response){
	if(request.url === '/'){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('Header\n');
		response.write('Search\n');
		response.end('Footer\n');
	}
}


//Handle HTTP route GET/:username
function user(request, response){
	const username = request.url.replace('/', '');
	if(username.length > 0){
		response.writeHead(200, {'Content-Type': 'text/plain'});
		response.write('Header\n');

		//get json from Treehouse
		const studentProfile = new Profile(username);
		//on end
		studentProfile.on("end", function(profileJSON){
			//store JSON values we need
			const values = {
				avatarURL: profileJSON.gravatar_url,
				username: profileJSON.profile_name,
				badges: profileJSON.badges.length,
				javascriptPoints: profileJSON.points.JavaScript
			}
			//simple response + end response
			response.write(values.username + ' has ' + values.badges + '\n');
			response.end('Footer\n');

		});

		//on error
		studentProfile.on("error", function(error){
			response.write(error.message + '\n');
			response.end('Footer\n');

		});

	}
}

module.exports.home = home;
module.exports.user = user;
