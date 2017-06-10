var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");
var petfinder = require('petfinder')('32d159038732c70bccb32993cdfa5310', '910284a21b02e219b31f9ccee800828c');


var PORT = process.env.PORT || 3000;
var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/media', express.static(path.join(__dirname + '/media')));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// override with POST having ?_method=DELETE
app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// var routes = require("./controllers/petsController.js");

// app.use("/", routes);
// app.use("/update", routes);
// app.use("/create", routes);

// Get list of breeds 
// petfinder.getRandomPet('dog', function(err, breeds) {
//   console.log(breeds)
// });

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname + "/views/survey.html"));
});

app.post("/results", function(req, res) {
    // 	 petfinder.findPet(req.body.location, { 'count': 9, "animal": "dog", "sex": req.body.sex, "age": req.body.age, "size": req.body.size }, function(err, pets) {
        
    //     		if (err)
    //     		throw err  
    // 			console.log(pets);

    //     res.render("results", {pets: pets, layout: false});

    // });

     petfinder.findPet(req.body.location, { 'count': 9, "animal": "dog", "sex": req.body.sex, "age": req.body.age, "size": req.body.amount, "breed": req.body.specific}, function(err, pets) {
        
        		if (err)
        		throw err  
    			console.log(pets);

        res.render("results", {pets: pets});

    });
});


app.listen(PORT, function() {
    console.log("Listening on ", PORT);
});

// var search = {
// 	location: "90210",
// 	age: "adult",
// 	sex: F,
// }




// petfinder.findPet('33308', { 'count': 2, "animal": "dog" }, function(err, pets) {
//     // console.log(pets);  

//    for (var i = 0; i < pets.length; i++) {

//        console.log("Photo:" + pets[i].media.photos);
//         console.log("Name:" + pets[i].name);
//         console.log("Age:" + pets[i].age);
//         console.log("Gender: " + pets[i].sex);
//         console.log("Size: " + pets[i].size);
//         console.log("Phone: " + pets[i].contact.phone);
//         console.log("Phone: " + pets[i].contact.email);
//         console.log("About: " + pets[i].description);

//    };

// });


// pet.getRandom({}, function(err, pet) {
//     console.log(pet);
// });

