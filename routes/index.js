var express = require('express');
var a = require("array-tools");
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
      /*
      $('img').each(function (img) {
        img_url = img.attribs.src
        console.log(img_url)
        videos.push(img_url);

      }
    */
      
      //videos=imgs;
    	imgs = $('img').toArray();

      

      imgs.forEach(function (img) {
        var img_url = img.attribs.src
        console.log(img);
        videos.push(img_url);
      })
   
     filtVideos= a.where(videos, /i1.ytimg.com/);

    res.render('index', { title: 'Express' ,videos:filtVideos});  
       

  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
 // res.render('index', { title: 'Express' });
});

module.exports = router;
