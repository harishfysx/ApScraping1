var express = require('express');
var a = require("array-tools");
var S = require('string');
var xhr = require('node-xhr');
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
        
        var exper= S(img_url).between('http://i1.ytimg.com/vi/', '/mqdefault.jpg').s
        
        if(exper && exper.length>0){

          xhr.get({
        url: 'https://www.googleapis.com/youtube/v3/videos?',
        headers: {
            'Content-Type': 'application/json'
            
        },
        params: {
            part: 'snippet',
            id: exper,
            key: 'AIzaSyDiShhFUcCs8zdaoyxAWblffHbBMOnmAQE'
      
        },
    }, function(err, resp) {
        if (err) {
            console.log(err.message);
            return;
        }
      console.log(resp)
    
    });

          console.log(exper)
          videos.push(exper);
        }
        
      })
   
    // filtVideos= a.where(videos, /i1.ytimg.com/);




    res.render('index', { title: 'Express' ,videos:videos});  
       

  } else {
    console.log("We’ve encountered an error: " + error);
  }
});
 // res.render('index', { title: 'Express' });
});

module.exports = router;
