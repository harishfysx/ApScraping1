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


  exports.updateDB = function(){
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



                                //xhr get start
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
                                                    var fltDat=[]

                                                //if total results start
                                                if(resp.body.pageInfo.totalResults==1){
                                               fltDat=a.pick(resp.body.items, ["id","snippet.title","snippet.thumbnails.default.url","snippet.tags"])     
                                               var ayouid=a.pluck(fltDat, "id");
                                               var atitle=a.pluck(fltDat, "title");
                                               var athumbnail=a.pluck(fltDat, "thumbnail");
                                               var atags=a.pluck(fltDat, "tags");
                                               //console.log(gid[0])
                                           
                                                console.log('starting saving ' + exper);

                                            var chron = new News({
                                            youid: ayouid[0],
                                            title: atitle[0],
                                            thumbnail: athumbnail[0],
                                            tags: atags
                                            });


                                            chron.save(function(err) {
                                                    if (err) {
                                                         console.log(err)
                                                    } else {
                                                        console.log(exper + ' saved successfully!');
                                                        }
                                             });

                                            }//if total results end
        
                                     });

                                //xhr get end
                            

                            

                        }
                        if (news) {
                            console.log('not saved ' + news.youid + ' record already exists ');
                        }
                    });
                    
                }
            })
          
        } 
    });
}