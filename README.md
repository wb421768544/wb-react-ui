# React-3G —— 基于React开发的基本组件库
开发文档

### 项目目录结构
```javaScript
    React-3G
        build
        lib
            components
                ...
            styles
            index.js
```
* build：存储 lib 中编写好编译之后输出的代码
* lib：存储项目的原始源代码
    components：组件库的组件代码
    styles：公用的样式文件，每个组件对应的样式，写到 components 下各个组件对应的文件夹
    index.js：最终对外暴露的组件导出接口，不理解的，去看 export 什么意思。

------

### 本地开发NPM摘要
**开发前必须弄清楚以下再进行**
* 本地开发NPM包
>  了解package.json文件各个字段的意义，重点**版本号**、**Scripts**

* 项目本地运行
**当前是webpack编译，稍后会添加webpack 编译 watch**
```javaScript
    git clone git@github.com:ZJH9Rondo/React-3G.git

    cd React-3G

    npm install

    npm run build
```

> 这里还需要开启一个后台，这个后台是用于在本地测试NPM包的实际效果
```javaScript
    git clone git@github.com:alanbsmith/component-lib-playground.git

    cd component-lib-playground

    npm install

    npm run dev
```

**重点**
> 到这一步，你只是配置好了项目，本地测试关键的一点，需要给NPM包导出一条软链接到测试平台，也就是 clone 下来的 component-lib-playground
```javaScript
    cd component-lib-palyground

    // 请保证你当前所在的目录是 component-lib-playground
    npm i * // 这里 * 代表的就是你 clone 下来的 NPM 包所在的根目录
```

例子：
```javaScript
    test // 根目录
        npm
            lib
            index.js
        component-lib-playground
            src
            ... 

    这个时候 * 应该是 /user/zhongjiahao/.../test/npm/ ,也就是你设备上的绝对路径
```

关于软链接的设置不懂的看[这里](https://blog.ymfe.org/%E5%80%9F%E5%8A%A9%E8%BD%AF%E9%93%BE%E6%8E%A5%E6%9C%AC%E5%9C%B0%E5%BC%80%E5%8F%91npm%E6%A8%A1%E5%9D%97/)

* 可使用npm link命令[npm link](https://docs.npmjs.com/cli/link)

* 弄清楚组件怎么划分，react 怎么利用组件化的，不难，动起手来。

* 弄清楚 export import 以及常见的ES6知识

**开发事项**
> 组件可按需引用
> 需引用build目录下的css文件


### 组件
组件信息见[Introduction.md](https://github.com/ZJH9Rondo/React-3G/blob/master/Introduction.md)

### Class命名规则
* mb- 开头
* mb-[标签名]-[对应样式],如mb-btn-large
* 可添加默认相同属性,如所有按钮样式都有mb-btn这个className



