---
layout: post
title:  "Multi-Process NodeJS"
categories: Linux
description: 多进程 Node 服务器
---

多核服务器可以采用多进程处理增加性能. NodeJs 提供 cluster 模块来实现这功能, 感觉它的 API 和 C 语言还是比较像的.

```js
var cluster = require('cluster');
var http = require('http');
var numCPUs = require('os').cpus().length; // 获取CPU的个数
 
if (cluster.isMaster) {
    for (var i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
 
    cluster.on('exit', function(worker, code, signal) {
        console.log('worker ' + worker.process.pid + ' died');
    });
} else {
    http.createServer(function(req, res) {
        res.writeHead(200);
        res.end("hello world\n");
    }).listen(8000);
}
```

可以简单转译为 C 语言代码

```c
int numCPUS = //num CPUS
for (int i = 0; i < numCPUs; i++) {
    if(fork()==0){
        // createServer
    }
}
```