'use strict';
var mongoose        = require('mongoose');
var fs              = require('fs');

var Word            = require('../models/word.js');

class Words{
    constructor(){}

    findWordInFile(files, currentFileName){
        var index = -1;
        files.forEach(function(element,i){
            if(element.fileName == currentFileName){
                index = i;
                return true;
            }
        });

        return index;
    }

    parseFile(fileName, callback){
        console.log('>>parseFile');
        var content, index = 0, firstCharIndex = 0, contextLen, wordsMap = {}, _this = this;
        fs.readFile(fileName, 'utf8', function(err, contents) {
            if(!contents){
                callback(err, contents);
            }
            content = contents.split('');
            contextLen = content.length;
            for( ; index < contextLen ; index++){
                var chr = content[index];
                if( chr == ' ' || chr == ',' || chr == '.' || chr == ';' || 
                    chr == '(' || chr == ')' || chr == '[' || chr == ']' || 
                    chr == ':' || chr == '\"' || chr == '?' || chr == '\n' || 
                    chr == '-' || chr == '\r' || chr == '!'){

                        var word = content.slice(firstCharIndex, index);
                        word = word.join('');
                        word = word.toLowerCase();

                        if(word !== ''){
                            if(wordsMap[word] === undefined){
                                wordsMap[word] = new Word({
                                    word: word,
                                    length: word.length,
                                    files: [
                                        {
                                            fileName: fileName,
                                            placeInFile: [firstCharIndex],
                                            appearsNumber: 1
                                        }
                                    ]
                                });
                            } else {
                                var fileIndex = _this.findWordInFile(wordsMap[word].files, fileName);
                                
                                if(fileIndex < 0){
                                    wordsMap[word].files.push({
                                        fileName: fileName,
                                        placeInFile: [firstCharIndex],
                                        appearsNumber: 1
                                    });
                                } else {
                                    wordsMap[word].files[fileIndex].appearsNumber += 1;
                                    wordsMap[word].files[fileIndex].placeInFile.push(firstCharIndex);
                                }
                            }

                            
                        }
                        firstCharIndex = index + 1;

                }

            }

            // console.log(wordsMap);
            
            callback(null, wordsMap);
            console.log('<<parseFile');
        });
    }

    saveWords(wordsMap){

    }
    
    addWord(mealDetails, callback){
        console.log('>>addMeal');
        
        var newMeal = new Meal({
            name: mealDetails.name,
            description: mealDetails.description,
            img: mealDetails.img,
            price: mealDetails.price,
            owner: mealDetails.owner,
            tags: mealDetails.tags
        });
        
        newMeal.save(function(err, meal){
            if(err) {
                console.log(err);
                return callback(err, null);
            }
            console.log('success!');
            callback(null, meal);
            console.log('<<addMeal');
        });
    }
    
    // getAllMeals(callback){
    //     console.log('>>getAllMeals');
        
    //     Meal.find({},function(err,meals){
    //         if(err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         console.log('got data!');
    //         callback(null,meals);
    //         console.log('<<getAllMeals');
    //     });
    // }
    
    // getMealbyID(mid,callback){
    //     console.log('>>getMealbyID');
        
    //     Meal.findOne({_id: mongoose.Types.ObjectId(mid)},function(err,meal){
    //         if(err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         console.log('got data!');
    //         callback(null,meal);
    //         console.log('<<getMealbyID');
    //     });
    // }

}

module.exports = Words;