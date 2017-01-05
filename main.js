//Load core modules
const fs = require("fs");

//Create an Express application object and load serve-favicon module
const express = require("express");
const favicon = require("serve-favicon");
const app = express();

//Read the projects data
var projectData;
fs.readFile(__dirname + "/static/etc/projectdata.json", "utf8", function(err, projdata) {
    if(err) {
        throw err;
    }
    projectData = JSON.parse(projdata);
});

//Set the port value
//  Heroku dynamically assigns your app a port, so you can't set the port to a fixed number
//  Heroku adds the port to the env, so you can pull it from there, that way it will
//  still listen to port 5000 when you test locally, but it will also work on Heroku
portNumber = 5002
app.set("port", (process.env.PORT || portNumber));

//Serve static content for the app from the "static" directory in the application directory
app.use(express.static(__dirname + "/static"));
app.use(favicon(__dirname + "/static/images/favicon.ico"));

//Set the directory for all template files
app.set("views", __dirname + "/templates");
app.set("view engine", "ejs");

//Route HTTP GET requests to a callback function and render appropriate page
app.get("/", function(request, response) {
    response.render("index");
});
app.get("/experience", function(request, response) {
    response.render("experience");
});
app.get("/projects", function(request, response) {
    response.render("projects", { projectData: projectData, });
});
app.get("/resume", function(request, response) {
    response.download(__dirname + "/static/etc/Deepanshu_Resume_2017.pdf");
});
app.get("/cats", function(request, response) {
    response.render("cats");
});

//Bind and listen for connections on the specified host and port
app.listen(app.get("port"), function() {
    console.log("Node.js and Express.js app is running on port", app.get("port"));
});
