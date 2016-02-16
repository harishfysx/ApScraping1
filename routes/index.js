var express = require('express');
var bodyParser = require('body-parser');
var request = require("request"),
  cheerio = require("cheerio"),
  url = "http://www.ap7am.com/telugu-videos-1-all-videos.html";

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	request(url, function (error, response, body) {
  if (!error) {
    var $ = cheerio.load(body),
    	videos=[];
    	
    	  $('a[class=titleread]').each(function() {
    var link = $(this);
    var text = link.text();
    
    videos.push(text);
    console.log(text + " -> " + link);
  });
    
//=> Apple
      //res.json(videos)
       res.render('index', { title: 'Express' ,videos:videos});
      //res.render('index', { title: temperature });
    //console.log("It’s " + temperature + " degrees Fahrenheit.");
  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
 // res.render('index', { title: 'Express' });
});

module.exports = router;
