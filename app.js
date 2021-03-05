const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const Campground=require("./models/campground");
const campground = require("./models/campground");
const methodOverride= require("method-override");
const ejsMate=require("ejs-mate");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate);
app.listen(3000, function() {
  console.log("Server started on port 3000");
});

mongoose.connect("mongodb://localhost:27017/yelpCampDB",{useCreateIndex:true, useUnifiedTopology: true,useNewUrlParser: true });
//////////////////////////////////////////////////////////////////

app.get("/",function(req,res){
    res.render("home")
});

app.get("/campgrounds",function(req,res){

    Campground.find({},function(err,allItems){
    res.render("campgrounds/index",{list:allItems})

    });
});

app.get("/campgrounds/new",function(req,res){
  res.render("campgrounds/new");
});

// this ^ has to be before v cause otherwise it will conseder "new" to be id, and post that page list

app.get("/campgrounds/:id",function(req,res){

 Campground.findOne({_id:req.params.id},function(err,camp){
  res.render("campgrounds/show",{campground:camp});
 });
});

app.post("/campgrounds",function(req,res){
  
  const camp=new Campground(req.body.campground);
  camp.save();
 res.redirect("/campgrounds/"+camp._id)
});



app.get("/campgrounds/:id/edit",function(req,res){
  Campground.findOne({_id:req.params.id},function(err,c){
    res.render('campgrounds/edit',{campground:c});
  })
})

app.put('/campgrounds/:id',function(req,res){
  const {id}=req.params;
 Campground.updateOne({_id:id},{...req.body.campground},function(er){
   console.log("aaat");
 }) ;//to access the into in form . also we add to object and it gets overwritten
res.redirect("/campgrounds/"+req.params.id);
})

app.delete("/campgrounds/:id",function(req,res){
  const {id}=req.params;

  Campground.findByIdAndDelete(id,function(er){
    console.log(er);
  });
  res.redirect("/campgrounds")

})