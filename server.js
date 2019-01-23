var express = require("express");
var app = express();

app.listen("7649",function(){
    console.log("sever is running");
});

var bodyParser = require("body-parser");
var multer = require("multer");

var upload = multer();
//parse applicatio/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
//parse application/json
app.use(bodyParser.json());
app.use(upload.array());

app.use(express.static('Do-an-ki-1'));

//lets require/import the mongodb native drivers.
var mongodb = require('mongodb');

//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://DBroot:thang123@ds032340.mlab.com:32340/assignmentterm1';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connected...');

    // do some work here with the database.
    var collection = db.db();
    var menu_services = collection.collection("Menu_services");
    var services = collection.collection("services");


    app.get("/list_service", function (req, res) {
        menu_services.find({}).toArray(function (err, result) {
            var json = {
                status: 0,
                message: "Fail",
                data: []
            };
            
            if (err) {
                console.log(err);
            } else {
                json.status = 1;
                json.message = "Suceed";
                json.data = result;
            }

         res.send(json);
        });
    });
    //Close connection
    //db.close();
    }
});