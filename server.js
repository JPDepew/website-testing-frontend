// server.js
var express = require('express');
var app = express();
var url  = require('url');
const mysql = require('mysql');

// set the view engine to ejs
app.set('view engine', 'ejs');

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

app.get('/server', function(req, res, next){
    var parts = url.parse(req.url, true);
    var firstname = parts.query.firstname;
    var lastname = parts.query.lastname;
    var email = parts.query.email;
    var phone = parts.query.phone;
    var subject = parts.query.subject;
    var body = parts.query.body;
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

app.listen(3001);
console.log('Listening on port 3001');