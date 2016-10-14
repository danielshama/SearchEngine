'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var files = new Schema({
    fileName: {type:String,required:true},
    placeInFile: [{type:Number}],
    appearsNumber: {type:Number,required:true}
});

module.exports = files;