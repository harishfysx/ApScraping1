var express = require('express');
var a = require("array-tools");
var S = require('string');
var xhr = require('node-xhr');
var mongoose = require('mongoose');
var News = require('./dbSchema');
var bodyParser = require('body-parser');
var request = require("request"),
    cheerio = require("cheerio"),
    url = "http://www.ap7am.com/telugu-videos-1-all-videos.html";
var router = express.Router();
router.get('/', function(req, res, next) {
    request(url, function(error, response, body) {
        if (!error) {
            var $ = cheerio.load(body),
                videos = [];
            imgs = $('img').toArray();
            imgs.forEach(function(img) {
                var img_url = img.attribs.src
                var exper = S(img_url).between('http://i1.ytimg.com/vi/', '/mqdefault.jpg').s
                if (exper && exper.length > 0) {
                    News.findOne({
                        youid: exper
                    }, function(err, news) {
                        if (err) {
                            console.log(err)
                        }
                        if (!news) {
                            console.log('starting saving ' + exper);
                            var chron = new News({
                                youid: exper,
                                title: 'test title',
                                thumbnail: 'default url',
                                tags: ['james', 'bond', 'tst']
                            });
                            chron.save(function(err) {
                                if (err) {
                                    console.log(err)
                                } else {
                                    console.log(exper + ' saved successfully!');
                                }
                            });
                        }
                        if (news) {
                            console.log('not saved ' + news.youid + ' record already exists ');
                        }
                    });
                    videos.push(exper);
                }
            })
            res.render('index', {
                title: 'Express',
                videos: videos
            });
        } else {
            console.log("We’ve encountered an error: " + error);
        }
    });
});
module.exports = router;