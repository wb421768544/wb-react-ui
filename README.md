# 简介
一款基于`react`的组件库，其`UI`采用`element-ui`，功能自我实现。将本人比较常用的组件自我实现一边，已检测自己能否造出轮子，从而检测自己的学习成果。本项目仅用于学习交流、联系，不可用于商业用途。本项目已经发布于`npm`,可以直接下载使用。

# 安装、使用
## 安装
推荐(只能)使用 `npm` 的方式安装，它能更好地和`webpack`打包工具配合使用。

```shell
npm install wb-react-ui --save
```
主题
开始前, 你还需要一个主题包, 这里我们推荐使用...好像没写主题包，你就引默认的`css`吧。

`import 'wb-react-ui/build/css/index.css';`

##使用

```jsx
          import React from 'react';
          import ReactDOM from 'react-dom';
          import { Button } from 'wb-react-ui';
      
          import 'wb-react-ui/build/css/index.css';
      
          ReactDOM.render(<Button type="primary">Hello</Button>, document.getElementById('app'));
```        

# 展示页
本项目的展示页地址：[http://wangbing520.club/wb-ui]()
预览效果：

![](https://user-gold-cdn.xitu.io/2019/2/4/168b74adf4368737?w=2124&h=1470&f=png&s=250211)


![](https://user-gold-cdn.xitu.io/2019/2/4/168b74b47e275772?w=1700&h=1530&f=png&s=241482)


![](https://user-gold-cdn.xitu.io/2019/2/4/168b74bcc7b7594d?w=2574&h=1472&f=png&s=276203)

![](https://user-gold-cdn.xitu.io/2019/2/4/168b74c56e38825c?w=1408&h=1530&f=png&s=163579)

> 展示页git地址：[https://github.com/wb421768544/component-show]()
