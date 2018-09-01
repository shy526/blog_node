const fs = require('fs');
const path = require('path');
/**
 * 创建 多层目录
 * @param dirpath
 * @param callback
 */
function mkdirs(dirpath, callback) {
    //创建当前目录
    fs.mkdir(dirpath,(err)=>{
        if (err){
            //创建父目录
            mkdirs(path.dirname(dirpath),(err)=>{
                fs.mkdir(dirpath,()=>{
                    callback(err)
                });
            })
        }else {
            console.log(dirpath)
            callback(err)
        }
    })
};


/**
 * 缓冲检查
 * @param s
 * @param path
 * @param callback
 * @returns {null}
 */
function checkCache(path,s,callback){
    try {
        let str = fs.readFileSync(path).toString("utf8");
        let parseJSON = JSON.parse(str);
        if (Date.now()-parseJSON.createTime>s){
            fs.unlink(path,(err)=>{
                if (err) console.log(err)
            })
            return null;
        } else {
            callback(parseJSON)
            return true;
        }
    }catch (e) {
       return null;
    }

}



/**
 * 创建缓冲
 * 并自动写入创建时间
 * @param path
 * @param obj
 */
function createCache(objPath,obj){
    obj.createTime=Date.now();
    fs.writeFile(objPath,JSON.stringify(obj),(err)=>{
        if (err){
            mkdirs(path.dirname(objPath),(err)=>{
                if (err) throw err
                fs.writeFile(objPath,JSON.stringify(obj),(err)=>{
                    if (err) throw err
                    console.log("create:"+obj)
                })
            })
        }
    })
}

module.exports ={
    createCache:createCache,
    checkCache:checkCache
}

