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
    console.info("index")
    let dubboService = req.getDubboService("ThemeService");
    dubboService.thenmePage(1,100).then(data=>{
        console.log({themes:data.data})
        res.render('index',{themes:data.data});
    }).catch(err=>console.log(err));
});
//主题目录
router.get('/themes/:id', function(req, res, next) {
   console.log(req.params.id)
    let id =~~req.params.id
    let dubboService = req.getDubboService("MarkdownService");
    dubboService.getMarkdownPageBy(id).then(data=>{
        if (data.data.length<4){
            let length=4-data.data.length;
            for (let i=0;i<length;i++){
                data.data.push({name:'没有多余的数据了'})
            }
        }
     res.render('blog/index',{markdowns:data.data});
    }).catch(err=>console.log(err))


});
module.exports = router;