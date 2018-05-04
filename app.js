// Problem: Need a simple way to view user's badge count and JS points
// Solution: Use Node.js to perform the profile look ups and server our template via HTTP
//
// 1. create web server
// 2. handle HTTP route GET/ and POST/ (ie. Home)
// 3. handle HTTP route GET/:username (ie. /stephaniespears1)
// 4. function that handles reading of files and merge into value
// 5.

//Create Web Server
const http = require('http');

http.createServer(function(request, response){
	response.writeHead(200, {'Content-Type': 'text/plain'});
	response.end('Hello World\n');
}).listen(3000, '127.0.0.1');
console.log('Server running at http://127.0.0.1:3000/');