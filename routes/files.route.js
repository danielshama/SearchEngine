'use strict';
var bodyParser          = require('body-parser');
var jsonParser          = bodyParser.json();
var urlencodedParser    = bodyParser.urlencoded({ extended: false });
var utils               = require('../assets/utils.js');

var FilesController     = require('../controllers/files.ctrl.js');
var filesApi            = new FilesController();

module.exports = function(app){

    app.get('/parse', jsonParser, function(req, res){
        if (!req.body) return res.sendStatus(400);
        filesApi.parseFile('public/work.txt', function(err, data){
            if(err) return res.sendStatus(403); //need to send the real error
            res.send(data);
            res.end();
        });
    });

    // app.post('/addMeal', jsonParser, function(req, res){
    //     if (!req.body) return res.sendStatus(400);
    //     mealsApi.addMeal(req.body, function(err, data){
    //         if(err) return res.sendStatus(403); //need to send the real error
    //         res.send(data);
    //         res.end();
    //     });
    // });
    
    // app.get('/getMealsByTags/:tag', function(req, res){
    //     mealsApi.getMealsByTags(req.params.tag, function(err,data){
    //         if(err) return res.sendStatus(400);
    //         res.send(data);
    //         res.end();
    //     });
    // });

    // app.put('/reviewMeal', jsonParser, function(req, res){
    //     mealsApi.reviewMeal(req.body, function(err,data){
    //         if(err) return res.sendStatus(400);
    //         console.log('body - '+req.body);
    //         res.send(data);
    //         res.end();
    //     });
    // });  
}