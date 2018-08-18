const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/blog_menu.html', function(req, res, next) {
    res.render('blog_menu',{theme:[
                            {name:1,sub:["a","b"]},
                            {name:2,sub:["a","b"]},
                            {name:3,sub:["a","b"]},
                            {name:3,sub:[]}
                            ]});

});
router.get('/', function(req, res, next) {
    res.render('index');

});
module.exports = router;