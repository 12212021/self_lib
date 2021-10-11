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


### HTTP 1.1
http 1.1的主要目标就是为了提高协议的性能而提出的，主要包括了
- tcp的长连接
- chunked transfer来使得response可以stream
- 请求pipeline来并行request
- 缓存机制
- Byte serve来允许range-based resource requests

针对常见网络请求：优化速度的方面主要集中在两方面
- 减少请求的字节数
- 减少不必要的请求时延（Latency）

针对HTTP，有如下的策略可以提高网络的性能
- 减少DNS Lookup
- 发送更少的http请求
- 启用CDN，物理位置更近，可以有效减少分发资源的latency
- 增加Expires、Etag等header来有效地利用http的缓存机制
- text-based的内容可以通过Gzip进行压缩，能有效压缩60~80%的文件大小
- 避免redirect，尤其是redirect到不同的hostname，这样会引发新一轮的DNS Lookup、TCP shake hands等

#### tcp的长连接
tcp的长连接可以有效地减少tcp shake hands的roundtrip时间，示意图如下，假设请求一个html文件和一个css文件

不启用长连接的情况下
![image.png](https://i.loli.net/2021/09/22/gD7BQWSFi1VE8u3.png)

在启用tcp长连接的情况下
![image.png](https://i.loli.net/2021/09/22/Omwt2xHfgcVGNAd.png)

可以从上面两幅图的对比中看出：`tcp长连接能有效减少shake hands的roundtrip时间，且随着请求文件个数的增加，减少的latency越发可观`。针对N个请求，长连接可减少的时间为`(N-1) x RTT`

#### HTTP pipelining
HTTP的pipelining技术要求http请求维护一个`FIFO（先进先出）`的队列，针对`单个TCP`连接而言，其示意图如下
![image.png](https://i.loli.net/2021/09/22/DsTAgOtfioVK2UM.png)
pipelining技术能有效地减少roundtrip时间，但是并不是没有代价，其带来的问题和挑战有
- 要求服务端能够通过多线程来处理资源的分发请求，对服务端的代码实现是挑战
- 为了维护FIFO，服务端必须顺序分发资源，`若队列中某个资源处理时间过长，则阻塞后续全部资源的分发`
- 如果某个资源发生错误，服务端需要抛弃其后所有资源，迫使http client重新请求资源
- 检测中间代理服务器是否支持http pipelining也是技术挑战

结论：HTTP pipelining技术看起来比较美好，但是在实际的体验上，并不能令人满意。


#### 多个tcp连接并行
现代浏览器为了提高网络请求速度，通常会`针对一个hostname开启多个tcp连接`，目前主流的做法是针对一个hostname开发最多6个tcp连接

开启多个tcp连接的好处
- client可以并行地发送最多6个请求
- server端可以并行处理6个请求
- tcp first roundtrip（TCP cwnd）可传输的数据量提升6倍

但是多个tcp连接也存在代价，其代价如下所示
- 在client端和server端，包括中间代理的服务器，都会消耗额外的socket资源
- 多个tcp请求会竞争bandwidth
- 收集socket的数据的实现会更加复杂
- 多个tcp请求对于app而言，是一个受限的并发方式

多个tcp请求并发，主要是为了解决http协议和tcp协议存在的一些局限性。


浏览器限制每个host的tcp连接数量可以有效避免对服务的DoS攻击，但是却反过来对浏览器的攻击。如果一个浏览器对某个站点下载6份文件（占据了6个tcp连接），那么再访问该网站，因为tcp连接数量已经耗尽，浏览器无法找到新的socket资源来访问该网站。

像web-socket、Server Sent Events、挂起来的XHR请求，都会占据tcp资源，即使当前没有数据传输，所以在占据tcp资源的时候需要谨慎，防止自我DoS攻击。


#### Domain sharing技术
浏览器针对一个hostname最多并发6个tcp连接，针对次特点，可以将web网站的资源部署到多个站点上（不同hostname），来促使浏览器实现更多并发。

Domain Sharing技术并非免费午餐，client、server包括中间代理，需要消耗更多的socket资源；同时引入的新的DNS Lookup、tcp shake hands等消耗。

#### 控制HTTP请求头的大小
http 1.0引入了header的概念，这带来了另外的一个问题，很多请求，body很小，但是http headers的size很大，可能会占据请求60%+的数据量，更不用说http为了状态，在请求发送的时候会携带相当数量的cookie。所以精简不必要的请求头，能有效提高网络性能


#### 文件合并和雪碧图
concatenation: 将多个js文件或者css文件合并为一个文件

Spriting：多个小图片被合成为一个大的图片，通过css位置来引用

这两种技术的好处是显而易见的：
1. 能有效减少协议的消耗（如tcp的握手、http的header等消耗）
2. 文件合并和雪碧图是application-layer的pipelining，它的效果和http的pipelining是一样的

文件合并、雪碧图，包括下面的resource inline都可以通过构建工具（webpack等）来实现


这两种方式在使用不当的情况下会损害性能，比如
- 同类型的resource会通过一个URL获取（缓存）
- 有可能会请求到当前页面暂时不需要的资源
- 单个小文件的更新，会促使整个文件进行更新，消耗额外的带宽
- js、css文件不是增量执行的，必须要下载完成才能执行，理论上会迟缓app的运行速度
  - 在实践中，压缩后的文件大小保持在60KB左右能取得`执行速度`和`网络延迟`的平衡

这对这两种优化策略，有以下问题可以问：
- app经常被小的resource blocked？
- app可以从合并一些http请求中获利吗？
- 丢失cache granularity（颗粒性）是不是可以忍受的？
- 将多个imge合并成一个，是否造成了app使用的内存问题？
- 首屏渲染是否是至关重要？


#### Resource inline
图片可以通过base64的方式内嵌如html；js可以通过script标签的方式内嵌；css可以通过style的方式内嵌入，总之内联可以减少roundtrip

图片转base64通常会增大体积，所以针对1~2KB的图片可以转base64。

question list：
- 如果文件很小而且属于特定的页面，inline
- 如果小文件经常被reuse，考虑bundle
- 如果小文件被经常更新，考虑bundle
- 可以减少不必要的http header和cookie来减少http协议的overhead


### HTTP 2.0

#### HTTP 2.0设计目标
- request、response的多路复用以减少时延
- 压缩http headers，以减少开销
- 增加请求优先级
- 支持服务端推送

#### Binary Framing Layer
http 2.0引入了`二进制分帧层`，其示意图如下
![image.png](https://i.loli.net/2021/10/11/Hc1vnE6i79BlwW4.png)

##### Stream
建立在tcp连接上的双向字节数据流，可以携带一个或者多个message

##### Message
完成的frame序列，在逻辑上代表了一个request请求或者response返回，可以携带一个或者多个frame

##### Frames
tcp上信息交流的最小单元，每个frame必须包含一个frame header，它指示了自己属于哪个Stream

特点
- 数据的传递是基于单个tcp
- 每个stream有唯一标识符，可选标识自己的优先级
- frame是最小的communication单元，携带了http headers、message payload等信息

#### 请求多路复用
![image.png](https://i.loli.net/2021/10/11/qe63gwVMA5aKOsB.png)

http 1.1版本下，multiplexing是通过建立多个tcp链接来达到的。http 2.0版本中，由于增加了frame的序列号，天然带有多路复用。http2服务下，像雪碧图、文件合并、域名sharing都不再是合适的优化策略。


http 2.0的多路复用特定也很好的解决了`http 1.1队头阻塞`的问题

#### 请求的优先级
http 2.0提供了优先级的接口供用户使用，但是并非强迫性的，也就说：即使client端提供了优先级，server端也可以不按照该优先级来处理请求，毕竟htt2的主要目标是`提高性能`，而多路复用是非常重要的一方面，如果提供优先级限制，则优先级高的资源会阻塞优先级低的资源，从某种意义来讲：形成了另一种`http 队头阻塞`


#### Flow Control
http2提供了流控制接口，但是没有提供流控制的默认实现，Flow Control的主要目的是：防止server端被client端发送的信息淹没


Flow Control主要有以下特点：
- 单向，服务端来控制流量窗口的大小
- 基于credit（信用），服务端发送窗口大小的时候，client端要主动进行调节，但是没有强制性
- Flow Control不能被禁用
- Flow Control是hop-by-hop的，不是end-to-end，中间服务器也能调节流量


#### 头部压缩
http1.1中，header是基于text的，占据了流量的很大一部分。http2通过HPACK的方式来压缩http的头部。HPACK能高效压缩主要基于以下两个方面
- 通过静态的Huffman进行编码，降低传输的大小
- client端和server端维护一个头部列表（动态更新），当某个header被二次发送的时候，直接发送头部列表对应的编码数字，能大大减小传输数据


进一步优化：

双方维护一个静态header table（包含了常见的http headers），动态header table，双方进行信息交互的时候，如果是未见过的header，动态添加到dynamic header table，方便二次发送。
