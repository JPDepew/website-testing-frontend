// server.js
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
//var url  = require('url');
const mysql = require('mysql');

// set the view engine to ejs
app.set('view engine', 'ejs');

// set up body parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
// var router = require('express').Router();

// mysql connection

// Credentials
var mysqlConnect = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "T3MPcms@",
    database: "mydb"
  });

// mysql connection
mysqlConnect.connect(function(err) {if (err) throw err;});

app.post('/server', function(req, res, next){
    //var parts = url.parse(req.url, true);
    console.log(req.body);
    var firstname = req.body.firstname;//parts.query.firstname;
    var lastname = req.body.lastname;
    var email = req.body.email;
    var phone = req.body.phone;
    var subject = req.body.subject;
    var body = req.body.messagebody;
    subject = subject.replace(/'/g,"''");
    body = body.replace(/'/g,"''");

    var query = "INSERT INTO contactus (firstname, lastname, email, phone, subject, body) VALUES ('" + firstname +  "', '" + lastname + "', '" + email + "', '" + phone + "', '" + subject + "', '" + body + "');";
        mysqlConnect.query(query, function (err, result, fields) {
          if (err) throw err;
          console.log(result);
        });
    res.render('pages/contactresponse');
});

// use res.render to load up an ejs view file

// index page 
app.get('/', function(req, res) {
    res.render('pages/index');
});

// about page 
app.get('/about', function(req, res) {
    res.render('pages/about');
});

// blog page 
app.get('/blog', function(req, res) {
    res.render('pages/blog');
});

// articles page 
app.get('/articles', function(req, res) {
    res.render('pages/articles');
});

// contact us page 
app.get('/contact', function(req, res) {
    res.render('pages/contact');
});

// temporary demo page 
app.get('/demo', function(req, res) {
    res.render('pages/demo');
});

app.listen(3001);
console.log('Listening on port 3001');