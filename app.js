//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const ejs = require("ejs");
const https = require("https");
const _ = require("lodash");
const { emitKeypressEvents } = require("readline");


// const homeStartingContent = "Why and how developers have a massive impact on our communities today. And why this is important to learn in any aspect fo today's life. On this site, were going to analyze the shallow and more profound Developer Thought." + ' '+"When developers make things that help imporve life quickly or solve the problem to make things done. As a result, we can save energy and money. Imagine you walk to the supermarket to go shopping, take a lot of stuff you need in your shopping list, and suddenly when you're standing at the counter to pay your bill then you notice your wallet wasn't in your purse. The Developer came to the rescue. They build mobile apps; like Apple pay, Google Pay, Paypal, and etc, providing contactless payments. Now you can shop easily using your mobile apps but make sure there's enough money in your bank.😂😂";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";


const app = express();

app.set('view engine', 'ejs');
app.use(express.static("public"));
app.use(express.urlencoded({
  extended: true
}));

let posts = [];

app.get("/", function (req, res) {
  res.render("home", {
    // startingContent: homeStartingContent,
    posts: posts
  });
});

app.get('/news', (req, res) => {
  res.render("news")
})
app.get('/about', (req, res) => {
  res.render('about')
})

app.get('/compose', (req, res) => {
  res.render("compose")
});

app.post('/compose', function (req, res) {
  const post = {
    title: req.body.postTitle,
    slug: _.kebabCase(req.body.postTitle), //this slug means take out the % in url (localhost:3000/posts/day%1) to localhost:3000/posts/day1. 
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:postName", function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle =_.lowerCase(post.title);

    if (storedTitle === requestedTitle){
      res.render("post", { 
        title: post.title,
        content: post.content
    });
  }
  });
});


app.get("/contact", function (req, res) {
  res.render('contact');
});

app.listen(process.env.PORT || 3000, function (req, res) {
  console.log("Server is running on port 3000");
});