var removeRoute = require('express-remove-route');
var express = require('express');
var redirect = require("express-redirect");
var router = express.Router();
var bodyParser = require('body-parser');
const uuidv1 = require('uuid/v1');
var path = require('path');
var app = express();
redirect(app);
// var mysql = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : 'root',
//   database : 'qa_hiring'
// });
var countries = require ('country-city').getCountries(); // Returns an array of country names.
// var cities = require ('country-city').getCities(country_name); // Returns an array of city names of the particualr country.
// connection.connect();
// connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
//   if (err) throw err
//   console.log('The solution is: ', rows[0].solution)
// });
function twoDigits(d) {
    if(0 <= d && d < 10) return "0" + d.toString();
    if(-10 < d && d < 0) return "-0" + (-1*d).toString();
    return d.toString();
}

Date.prototype.toMysqlFormat = function() {
    return this.getUTCFullYear() + "-" + twoDigits(1 + this.getUTCMonth()) + "-" + twoDigits(this.getUTCDate()) + " " + twoDigits(this.getHours()) + ":" + twoDigits(this.getUTCMinutes()) + ":" + twoDigits(this.getUTCSeconds());
};

var currentdate = new Date();
var expirydate = new Date(new Date(currentdate).getTime() + 60 * 60 * 24 * 1000);
var new_token = uuidv1();
// connection.query(
//   'INSERT into token_lifecycle (token,created_date,expiry_date) VALUES ("'+new_token+'","'+currentdate.toMysqlFormat()+'","'+expirydate.toMysqlFormat()+'")',
//   function (err, rows, fields) {
//     if (err) {
//       throw err;
//     }
//     console.log('The solution is: ', rows);
//   }
// );

var logger = function (req, res, next) {
  console.log('Logging...');
  next();
}

app.use(express.static(__dirname + '/public'));

app.use(logger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.set('view engine', 'ejs');
// Render Views
// router.get('/xebia-qa-hiring/', function(req, res) {
//   res.render('welcome',{
//     'title' : 'Xebia QA Hiring App'
//   })
// });
// router.get('/xebia-qa-hiring/:id', function(req,res,next){
//   if(req.params.id){
//     next();
//   }
//   else{
//     next(new Error('cannot find user ' + req.params.id));
//   }
// })
// app.get('/', function(req, res) {
//   res.render('index');
// })
app.redirect("/", "/xebia-qa-hiring/");
app.get('/xebia-qa-hiring/', function (req, res) {
  // debugger;
  // console.log(req.headers["host"]);
  // if(req.headers["X_USER"] == '1'){
  //   console.log('Entered');
  //   res.render('basic_form',{
  //     'title' : 'Xebia QA Hiring'
  //   });
  // }
  // else{
  // console.log('Exited');
    res.render('welcome',{
      'title' : 'Xebia QA Hiring App'
    });
  // }

});
app.get('/xebia-qa-hiring/1', function (req, res) {
  var buttonEnable = false;
  res.render('basic_form',{
    'title' : 'Xebia QA Hiring'
  });
});
app.get('/xebia-qa-hiring/2', function (req, res) {
  var buttonEnable = false;
   res.render('delayed_button',{
     'title' : 'Xebia QA Hiring',
     'buttonEnable' : buttonEnable
   });
});
app.get('/xebia-qa-hiring/3', function (req, res) {
   res.render('cookie_test',{
     'title' : 'Xebia QA Hiring'
   });
});
app.get('/xebia-qa-hiring/4', function (req, res) {
   res.render('lazyload',{
     'title' : 'Xebia QA Hiring',
     'countries' : countries
   });
});
app.get('/xebia-qa-hiring/5', function (req, res) {
   res.render('coding_logic_1',{
     'title' : 'Xebia QA Hiring'
   });
});
app.get('/xebia-qa-hiring/6', function (req, res) {
   res.render('coding_logic_2',{
     'title' : 'Xebia QA Hiring'
   });
});
app.get('/xebia-qa-hiring/7', function (req, res) {
   res.render('thank_you',{
     'title' : 'Xebia QA Hiring'
   });
});
// Render Views

// APIs
app.get('/getcities',function(req, res){
  var country_name = req.query.country;
  var cities = require ('country-city').getCities(country_name); // Returns an array of city names of the particualr country.
  res.send(cities);
})
// APIs

app.listen(3000,"192.168.3.100", function () {
  console.log('Server started on http://192.168.3.100:3000/xebia-qa-hiring/')
})

// connection.end();
