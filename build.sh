#!/bin/sh
# jenkins 上 防止 进程kill
#BUILD_ID=DONTKILLME
APP_NAME="blog_node"
# 移动至目标目录
RUN_PATH="/home/project/node/blog/blog_node/"
RUN_PATH_PARENT="/home/project/node/blog/"

 log(){
    echo `date "+%Y-%m-%d %H:%M:%S  ----[$1]----$APP_NAME:$2"`
}
error_log(){
   log "ERROR" "$1"
}
info_log(){
   log "info" "$1"
}
warn_log(){
    log "warn" "$1"
}
kill_pid(){
    if [ ! -f "$1" ]; then
        warn_log "$1 inexistence"
    else
        pid=`cat "$1"`
       `kill -9 "$pid"`
    fi
}

assert(){
if [ $? -eq 0 ]
then
    info_log "$1:succeed"
else
    info_log "$1:failure"
    return 12
fi
}

info_log "$APP_NAME"

if [ ! $RUN_PATH ];then
  error_log "is null"
fi
# 没有该文件夹 旧重新拉取
if [ ! -d "$RUN_PATH" ];then
     info_log "克隆仓库"
    git clone https://github.com/sunjiaqing/blog_node.git "$RUN_PATH_PARENT"
fi


info_log "拉取新文件"
`GIT_DIR=/home/project/node/blog/blog_node/.git git pull`
info_log "下载mod"
npm install


info_log "杀死旧进程"
kill_pid "$RUN_PATH""blog-node.pid"


info_log "启动项目"
`nohup node "$RUN_PATH""bin/www" > "$RUN_PATH""logs/blog-node.out" 2>&1 & echo $! > "$RUN_PATH"blog-node.pid`
assert "blog-node"




