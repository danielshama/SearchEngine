'use strict';
var mongoose = require('mongoose');
var files   = require('./files.js');
var Schema   = mongoose.Schema;

var customeSchema = new Schema({
    word: {type:String,required:true},
    length: {type:Number,required:true},
    files: [files]
}, {collection : 'Word'});

module.exports = mongoose.model('Word', customeSchema);