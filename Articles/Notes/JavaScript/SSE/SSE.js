//客户端中，SSE借由EventSource对象实现。EventSource包含五个外部属性：onerror, onmessage, onopen, readyState、url，以及两个内部属性：“reconnection time”与“last event ID string”。在onerror属性中我们可以对错误捕获和处理，而onmessage则对应着服务器事件的接收和处理。另外也可以使用addEventListener方法来监听服务器发送事件，根据event字段区分处理。
var eventSource = new EventSource("/path/to/server");
eventSource.onmessage = function (e) {
    console.log(e.event, e.data);
}
// 或者
eventSource.addEventListener("ping", function(e) {
    console.log(e.event, e.data);
}, false);
//author: zhangruipeng
