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


### web app的性能

#### 关键瓶颈
带宽对于视频、音频等大块流量获取非常关键，却不是web app的瓶颈，web app通常涉及到多个小资源文件的获取。针对此特点，带宽（4-5MBs以上）并非主要限制因素，latency（时延）是限制web app访问瓶颈的主要因素

原理：http请求是基于tcp请求的，tcp的三次握手、流量控制、网络堵塞控制等核心针对的都是大文件、长期保持连接的请求

#### 测量
针对web app性能的测量还是要基于用户场景，所幸，浏览器为web app的提供了一组api用来观测用户性能，被称为`Navigation Timing API`

如图所示：
![image.png](https://i.loli.net/2021/09/17/pL4k13DNsX2cIuy.png)

### 浏览器优化
浏览器针对用户体验的优化取决于厂商实现，但是浏览器的优化主要分为以下两个方面
- 基于Document的优化
  - 请求与css、doc、js整合，parse doc，确定resource的priority，lookahead parsing等
- 基于用户浏览习惯的优化
  - 学习用户习惯，pre-fetch DNS、hostname等

#### 针对性策略
- critical css、js应该在document中被及早发现
- css应该被及早发现，防止阻塞js的执行
- 非关键性js应该被deffer，防止阻塞DOM和CSSOM的构建
- The HTML document is parsed incrementally by the parser; hence the document should be periodically flushed for best performance（暂时不明白）.

#### Resource Hints

```html
<link rel="dns-prefetch" href="//hostname_to_resolve.com">
<!-- 预解析dns地址 -->
<link rel="subresource" href="/javascript/myapp.js">
<!-- 预加载其他地方可能要用到的critical资源 -->
<link rel="prefetch" href="/images/big.jpeg">
<!-- 预加载该资源（for this navigation or next） -->
<link rel="prerender" href="//example.org/next_page.html">
<!-- 预渲染下一次访问的资源 -->
```
这些resource hints资源的支持情况需要看浏览器厂商支持

