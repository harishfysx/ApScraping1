var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var newsSchema = new Schema({
  youid: String,
  title: String,
  thumbnail:String,
  tags:Array
});




// the schema is useless so far
// we need to create a model using it
var News = mongoose.model('News', newsSchema);

newsSchema.pre('save', function (next) {
    var self = this;
    News.find({youid : self.youid}, function (err, docs) {
        if (!docs.length){
            next();
        }else{                
            console.log('youid exists: ',self.youid);
            next(new Error("YouID exists!"));
        }
    });
}) ;

// make this available to our users in our Node applications
module.exports = News;