const mongoose = require("mongoose");
const Dishes = require("./models/dishes");

const url = "mongodb://localhost:27017/conFusion";
const connect = mongoose.connect(url);

connect.then((db) => {
   console.log("Connected successfully to the server");

// WITHOUT CREATE METHOD
//    var newDish = Dishes({
//        name: "Uthapizza",
//        description: "test"
//    });

//   newDish.save()
//   .then((dish) => {
//     console.log("Inserted successfully to the Dishes schema");
//     console.log("New record inserted");
//     console.log(dish);

//     return Dishes.find({});
//   })
//   .then((dishes) => {
//       console.log("Found dishes in the Dishes Schema");
//       console.log(dishes);

//       return Dishes.remove({});
//   })
//   .then(() => {
//       console.log("Connection to be terminated");

//       return mongoose.connection.close();
//   })
//   .catch((err) => {
//       console.log(err);
//   });


// WITH CREATE METHOD
    Dishes.create({
        name: "Uthapizza",
        description: "Test"
    }).then((dish) => {
       console.log("Dish inserted successfully");
       console.log(dish);
     
       return Dishes.findByIdAndUpdate(dish._id,{
           $set :{
               description: "Updated test sucessfully"
           }
       },{new: true}).exec();
    })
    .then((dish) => {
        console.log("Dish's description modified");
        dish.comments.push({
            rating: 4,
            comment: "This is really a wonderful dish, I had in my life",
            author: "Aravind Kumaresan"
        });

        return dish.save();
    })
    .then((dish) => {
        console.log("Added comment to the dish");
        console.log("Only dishes author data: "+dish.comments[0].author);
        console.log(dish);

        return Dishes.remove({});
    })
    .then(() => {
        console.log("Connection to the Database terminating");

        return mongoose.connection.close(); 
    })
    .catch((err) =>{
      console.log(err);
    });

});