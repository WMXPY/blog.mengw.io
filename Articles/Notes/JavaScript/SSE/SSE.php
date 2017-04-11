<?php
    header("Content-Type: text/event-stream");
    header("Cache-Control: no-cache");
    // 每隔1秒发送一次服务器的当前时间
    while (1) {
        $time = date("r");
        echo "event: ping\n";
        echo "data: The server time is: {$time}\n\n";
        ob_flush();
        flush();
        sleep(1);
    }
?>
//author: zhangruipeng
//服务器发送事件（以下简称SSE）是HTML 5规范的一个组成部分，可以实现服务器到客户端的单向数据通信。通过SSE，客户端可以自动获取数据更新，而不用重复发送HTTP请求。一旦连接建立，“事件”便会自动被推送到客户端。服务器端SSE通过“事件流(Event Stream)”的格式产生并推送事件。事件流对应的MIME类型为“text/event-stream”，包含四个字段：event、data、id和retry。event表示事件类型，data表示消息内容，id用于设置客户端EventSource对象的“last event ID string”内部属性，retry指定了重新连接的时间。
