var mongoose = require("mongoose"),
    Schema = mongoose.Schema,
    exports = module.exports;

var thisSchema = new Schema({
  _id : {type:String},
  url : {type:String},
  shortUrl : {type:Number}
})

exports.myModel = mongoose.model('urllists',thisSchema);
