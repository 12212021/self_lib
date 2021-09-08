## HTTP协议

### HTTP历史

#### HTTP 0.9

http 0.9是一个单行的协议，请求只有一行（ASCII码），通过换行符来触发请求（CRLF）。服务端返回一个ASCII码 Stream，服务端返回的结果只能是HTML文档，每次请求完成后，都会断开connection

http 0.9有如下的特点
- client-server、request-response的协议
- 编码为ASCII码，运行在TCP协议上
- 设计出来是为了传输HTML超文本的
- 每次请求完成后，connection都会被断开

#### HTTP 1.0
http 0.9很快就不能满足网络迅速发展的要求，在此基础上，http 1.0出现了，http 1.0不能算是正式协议，是由各大厂商自由发展，攒出来的一个协议，主要包含了一下一些key

- 请求会标识HTTP的版本，同时跟随一些HTTP request headers
- 响应会标识状态码，同时跟随这HTTP response Headers
- 响应不会被局限为HTML超文本
- 每次请求结束后，connection断开连接

#### HTTP 1.1
HTTP 1.1是HTTP协议的一个正式版本。为了减少握手时间，HTTP引入了Connection: keep-alive来规范HTTP请求复用tcp链路，可以有效减少HandShake的时间，client或者server需要用**Connection: Close来明确标识（本次请求结束后关闭TCP连接）**

HTTP 1.1也引入其他的一些Header来控制诸如**缓存、分块传输、Cookie**等相关控制策略

#### HTTP 2.0
HTTP很快称为一个非常受欢迎的协议，很多应用都是构建在HTTP之下的，随着网络的不断发展，对实时、低延迟要求较高，HTTP 1.1不适合。为此，HTTP 2.0应时而生。HTTP 2.0针对应用层而言是无缝升级，但是通过**多路复用、Header压缩**等策略加速HTTP请求的速度。
