const githubClient = require("../util/githubhttpClient")
const cache = require("../util/cache")
var async = require("async");
const path = require('path');
const file = "file";
const dir = "dir"

/**
 * 枚举目录
 * @param githubName
 * @param repos
 */
function directory(githubName, repos,callback) {
    let cachePath = path.join(path.dirname(path.dirname(__dirname)),"cache",githubName,repos,"directory.json");
    if (!cache.checkCache(cachePath,60*1000*60,callback)){
        githubClient.getUserRepostContent(githubName, repos, (res) => {
            let obj = {
                themes: [],
                describe: ""
            };
            let htemes=[];
            let readmeUrl = {};
            res = JSON.parse(res);
            if (res.message){
                throw new Error("gtihub api overload")
            }
            for (let i = 0; i < res.length; i++) {
                let val = res[i];
                if (val.type == file) {
                    if (val.name == "README.md") {
                        htemes.push(val.path);
                        readmeUrl[val.path] =getFunc(githubName,repos);
                    }
                } else if (val.type == dir) {
                    htemes.push(val.path);
                    readmeUrl[val.path] = getFunc(githubName,repos,"/"+val.path + "/README.md");
                }

            }
            async.series(readmeUrl, function (err, results) {
                if (err){
                } else {
                    for (let i=0;i<htemes.length;i++){
                        let result = results[ htemes[i]];
                        if (htemes[i]=="README.md") {
                            obj.describe=result
                        }else {
                            obj.themes.push({
                                readme:result,
                                name:htemes[i]
                            })
                        }
                    }
                    callback(obj)
                    cache.createCache(cachePath,obj);

                }
            });

        })
    }

}

/**
 * 顺序执行 asyn 用函数
 * @param githubName
 * @param repos
 * @param path
 * @returns {Function}
 */
function getFunc(githubName,repos,path){
    path=path||"/README.md"
    return function (callbaack) {
        githubClient.getUserRepostContent(githubName, repos, function (res) {
            res = JSON.parse(res);
            let s =""
            if (!res.message)
                s=new Buffer(res.content, res.encoding).toString('utf8');
            callbaack(null, s);
        }, path);
    }
}



module.exports ={
    githubDir:directory
}
/*
directory("sunjiaqing", "testNote",function (res) {
    console.log(res)
})
*/
