//Create Web Server
const router = require("./router.js");

const http = require("http");


http.createServer(function(request, response){
	router.css(request, response);
	router.home(request, response);
	router.user(request, response);
}).listen(3000);
console.log("Server running at localhost");

