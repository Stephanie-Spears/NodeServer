// Problem: Need a simple way to view user's badge count and JS points
// Solution: Use Node.js to perform the profile look ups and serve our template via HTTP
//
// 1. create web server
// 2. handle HTTP route GET/ and POST/ (ie. Home)
// 3. handle HTTP route GET/:username (ie. /stephaniespears1)
// 4. function that handles reading of files and merge into value
// 5.

//Create Web Server
const router = require('./router.js');

const http = require('http');


http.createServer(function(request, response){
	router.home(request, response);
	router.user(request, response);
}).listen(3000);
console.log('Server running at http://origin-url/');

