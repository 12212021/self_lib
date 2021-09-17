## TCP blocks

### 定义
TCP是基于IP（不稳定传输协议）上的一层协议，采用了一些关键的机制来确保数据能够稳定传输

### Three Way handShake

#### TCP的建立为什么需要三次握手

tcp的三次握手机制并不是特有的，本质上是`two general problem`，在一个`不可靠的信道`建立`可靠的双向传输`，最少需要三次信息交流。任何想要达成这个目的的协议，均需要三次握手，此问题并非TCP独有

细节：
A -> B (A发送SYN信号到B，等待B的ACK信息，若一定时间内未收到改信息，则超时重发ACK)

B -> A (B收到ACK后，发送自己的SYN和ACK信号，SYN和ACK合并发送，节省了一次传输)

A -> B (A收到B的ACK信号后，可以认为A->B的传输通道已经建立，可以发送DATA到B。因为双向连接，A还需要针对B的SYN信号做出回应，需发送ACK信号来告诉B，可以建立B->A的传输通道。一些场景，A的ACK确认信号可以同DATA一起发送，这叫做TCP first Open)

#### 详细
![image.png](https://i.loli.net/2021/08/30/YfO6cXtCRKhpmEZ.png)

SYN:Client picks a random sequence number x and sends a SYN packet, which may also include additional TCP flags and options.

SYN+ACK:Server increments x by one, picks own random sequence number y, appends its own set of flags and options, and dispatches the response.

ACK:Client increments both x and y by one and completes the handshake by dispatching the last ACK packet in the handshake.


### 流控制（Flow control）
流控制主要是为了防止sender发送数据过快过多，receiver来不及处理这些数据

#### receive window size(rwnd)
接收方在传递ACK信号的同时，会向发送方传递一个receive window size来告知sender自己能接受的数据大小，sender依赖这个值来调整传输数据的量。操作系统会有一个rwnd的`最大建议值(65535 bytes)`

#### Window scale
tcp最大的传输受限于min(rwnd, cwnd)，随着网络质量的提高，过小的rwnd会限制tcp的输出速率。

现在的操作系统允许扩大rwnd的最大值，从65535 bytes到1GB。能有效地利用网络带宽

### Slow-start and Congestion Avoidance
慢启动和阻塞控制算法是为了解决端到端经历的网络速率不足的问题。

#### Congestion window size(cwnd)
cwnd不是一个固定值，它是为了估计网络速率而存在的，**网络速率是动态变化的，所以cwnd也是动态变化的**

cwnd是对sender的限制，在接收到receiver的ACK信号前，sender发送数据的大小不能超过cwnd限制大小

cwnd采用的策略是**指数增长**，当sender正常收到receiver的ACK信号之后，sender会将自身的cwnd * 2，指导遇到packet loss，这个时候congestion avoidance算法开始介入

#### Congestion Avoidance
如何判断网络是否是堵塞的：当packet loss的时候，可以认定网络发生了堵塞

AIMD算法：当网络发生堵塞的时候，将cwnd减半，然后每轮roundtrip通过一个线性增长因子来扩大cwnd。这个算法比较保守。

PRR算法：比AIMD算法激进一些，减少3–10%的平均时延（Latency）


### Bandwidth-Delay
BDP = roundtrip Latency * link capacity (暂时不太理解)

假设tcp的window size(min(cwnd, rwnd)) 为16KB roundtrip Latency = 100ms，那么数据的传输速率为

16KB = (16 * 1024 * 8) = 131072 bits

传输速率 = 131072 bits / 0.1s = 1.31Mbps.

也就是说无论网络的带宽是多少，传输速率被限制在1.31Mbps


### Head-of-Line Blocking

![image.png](https://i.loli.net/2021/08/30/WcDRorMiBgJZ4nd.png)

TCP会将数据分成好些segment进行发送，tcp协议保证了数据的准确性、顺序性。对于上层应用而言，只要从socket读取数据即可。但是从socket读取数据读取的是由**tcp**合并好的数据，可能会包含多个segment。如上图，当p3、p2到达，而p1未到达的时候，上层应用是无法读取到数据的。只有等待p1 segment到达之后，才可以，这种现象被称为头部阻塞。


### tcp优化
tcp配置项和算法复杂多样，难以有通用的优化算法，但是不同版本的tcp协议都遵循了以下几个原则

- tcp建立的三次握手
- tcp的慢启动机制
- tcp的流量控制（Flow control）和阻塞控制（congestion control）
- tcp的速率由当前的window size来决定

#### server端优化
对于server端而言，最简单的优化方式是更新服务器OS的版本

以下是几个优化case
- Increasing TCP’s Initial Congestion Window
- Slow-Start Restart： 当tcp长连接的时候，禁用slow-start能提高tcp的性能
- Window Scaling (RFC 1323)
- TCP Fast Open

#### 对于client端的优化
- tcp连接的reuse，类比（connection: keep-alive）
- 少请求一些不必要的数据
- 物理上离服务器近一些（如cdn服务）
