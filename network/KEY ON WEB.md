### web performance
web performance运行在n层协议上，收到的限制颇多，主要因素包含以下几个方面
- 带宽和时延的影响
- tcp协议的影响
- http协议本身的影响
- web app的发展趋势和要求
- 浏览器的限制和优化

### web应用的发展
web应用经历了如下的发展
1. Hypertext document
    - 初始的文档，定义了web app的骨架
2. Web page
    - 增加了audio、img等多种类型的富文本对象
    - 缺少交互，看起来像printed page
3. web app
    - 随着ajax、js的加入，web页面就像运行在浏览器的app一样

### web app的架构
现在阶段，web app往往从多个站点加载多个资源，涉及到包大小通常有几M之多。而人的感知如下：
- 0-100ms 一瞬间
- 100 - 300ms 感觉略微有些延迟
- 300 - 1000ms 机器正在working
- 1000ms+ 头脑不自觉地转移注意力
- 10000ms+ 任务失败了

对于web获取一个资源而言，通常会经历如下阶段
1. DNS查询
2. tcp三次握手
3. TLS协商（如果需要的话）
4. HTTP请求发送
5. load相关资源，浏览器进行渲染

浏览器的渲染流程主要如下
![image.png](https://i.loli.net/2021/09/14/y6u4HPmdeElADKj.png)

浏览器生成DOM树虽然耗时，但是web app更多的瓶颈在于network层面，针对network的分析，可以通过`webPage Test`网站,`network waterfall`等工具来判断页面的瓶颈。进行针对性解决。



