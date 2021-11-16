//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(express.static("public"));
app.use(express.urlencoded({
    extended: true
}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.get("/blog.html", function(req, res){
 res.sendFile(__dirname + "/blog.html");
});

app.get("/contact.html", function(req, res){
    res.sendFile(__dirname + "/contact.html");
});

app.listen(process.env.PORT || 3000, function(req, res) {
    console.log("Server is running on port 3000");
});