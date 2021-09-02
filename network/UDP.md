## UDP blocks

### 前置

packet：格式化好的数据包

diagram：建立在packet上，包含路由信息，通常指运行在不稳定的链路上，对数据的完整性、可靠性都没有保障


### 定义
UDP协议是建立在IP协议上的，IP协议提供了host到host的通信方式，UDP在IP协议上，增加了端到端的通信方式

IP报文 header
![image.png](https://i.loli.net/2021/09/02/3fbjQVXn8OLsE6B.png)

UDP header
![image.png](https://i.loli.net/2021/09/02/yWu7hTQwgFrfc89.png)

从上面可以看出UDP报文仅仅在IP报文的基础上，新加了source port和destination port，因为IP层有checkSum，应用层可以选择不使用UDP协议的checkSum

UDP报文有如下特点：
- 不保证报文能稳定传输
- 不保证报文传输的顺序
- 没有网路拥塞控制
- 不追踪网络的连接状态
