var express = require('express');
var a = require("array-tools");
var S = require('string');
var xhr = require('node-xhr');
var mongoose = require('mongoose');
var News = require('./dbSchema');
var schedule = require('node-schedule');
var dbUpdate = require('./updateDB');
var bodyParser = require('body-parser');
var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.ap7am.com/telugu-videos-1-all-videos.html";
var router = express.Router();


var rule = new schedule.RecurrenceRule();
rule.minute = new schedule.Range(0, 59, 30);
 
 dbUpdate.updateDB();

schedule.scheduleJob(rule, function(){
  console.log('Updating DB for every 10 minute');
  dbUpdate.updateDB();
});





//Render Home Page Start
router.get('/', function(req, res, next) {

      News.find({}, function(err, news) {
           res.render('index', {title: 'Express',videos: news});
        });
});

//Render Home Page End


module.exports = router;