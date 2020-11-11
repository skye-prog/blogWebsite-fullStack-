//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose=require("mongoose");

mongoose.connect("mongodb+srv://admin-hussain:Kol12345@cluster0.xqekq.mongodb.net/blogDB",{useNewUrlParser:true,useUnifiedTopology: true});
const homeStartingContent ="I am Computer Science Student and Vice precident of HunarKeNawab💗.I start learning coding few months ago and that interest keep me pushing everyday and presently i am working on web-development.I love to code in java.i thought whatever becomes perfect only when you faithfully give your dedicated time.";


const postSchema=new mongoose.Schema({
    title:String,
    content:String,
})

/*creating model/collection*/

const Post=mongoose.model("Post",postSchema);

/*creating document*/

// const home=new Blog({
//   name:"Center",
//   content: "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing."
// });

// home.save();

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", function(req, res){

  Post.find(function(err,posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
      });
  })

});

app.get("/about", function(req, res){
  res.redirect("https://hussain2510.github.io/MywebSite/");
});

app.get("/contact", function(req, res){
  res.render("contact",);
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){

  const post=new Post({
    title:req.body.postTitle,
    content:req.body.postBody
  })
  post.save(function(err){

   if (!err){

     res.redirect("/");

   }

 });

});

app.get("/posts/:postId",function(req, res){
  const requestedPostId = req.params.postId;
  Post.find(function(err,posts)
  {
  posts.forEach(function(post){
    const postId =post._id;
    if(postId == requestedPostId) {
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });
});
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
