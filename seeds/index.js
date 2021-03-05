//database seeding
const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');


mongoose.connect("mongodb://localhost:27017/yelpCampDB",{useCreateIndex:true, useUnifiedTopology: true,useNewUrlParser: true });

//-------------------------------
 function sample(array) {return array[Math.floor(Math.random() * array.length)];
 }

 function makeSeedDB() {
   
  Campground.deleteMany({},function(err){console.log();});
  for (let i = 0; i < 10; i++) {
    const random1000 = Math.floor(Math.random() * 1000);

    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image:"https://source.unsplash.com/collection/483251",
      description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent in arcu eget eros aliquam maximus ultrices at mi. Vivamus sit amet eros nec eros interdum malesuada.",
      price:50
    })

    camp.save();

  }

  }
    
      makeSeedDB();