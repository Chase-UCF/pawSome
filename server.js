var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var path = require("path");
var mysql = require('mysql');
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

var connection = mysql.createConnection(process.env.JAWSDB_URL || {
    port: 3306,
    host: "localhost",
    user: "root",
    //ENTER YOUR PASSWORD HERE
    password: "2gk58d70",
    database: "dogs_db"
});

connection.connect();


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + "/views/index.html"));
});

app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname + "/views/survey.html"));
});

app.post("/results", function(req, res) {

     petfinder.findPet(req.body.location, { 'count': 10, "animal": "dog", "sex": req.body.sex, "age": req.body.age, "size": req.body.amount, "breed": req.body.specific}, function(err, pets) {
        
        		if (err)
        		throw err  
    			console.log(pets);

        res.render("results", {pets: pets});
    });
});

app.get("/quotes", function(req, res) {
	 connection.query("SELECT * FROM dogs", function(err, data) {
        if (err) throw err;
        res.render("quotes", { dogs: data });
    });
});


app.post("/new", function(req, res) {
    connection.query("INSERT INTO dogs (dog_name) VALUES (?)", [req.body.dog], function(err, data) {
        res.redirect("/quotes");
    });
});


// petfinder.findPet('33073', { 'count': 2, "animal": "dog", "breed": "pug" }, function(err, pets) {

//    for (var i = 0; i < pets.length; i++) {
//    	console.log(pets);
//     var images = pets[i].media.photos[1].pn;
//     console.log(images);



//    }

// });




app.listen(PORT, function() {
    console.log("Listening on ", PORT);
});





