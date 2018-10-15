# React-3G —— 基于React开发的基本组件库

* 组件说明

### Button组件
>字段：type / icon / size / onClick

>Ps: 这里的 icon 参数是用于 Button 中嵌套 icon 所用，在按钮中嵌套使用时会根据 Button 的size去改变icon的默认大小，可强制手写调整大小（不建议）。

使用说明
```javascript
    import { Button, Icon } from 'react-3g' // Icon 按需引用即可
    import 'react-3g/build/css/index.css'; // 组件全局 Css，建议项目使用中全局引用一次即可

    // 组件使用
    <Button size="" type="" icon="" onclick={ this.handlerEvent }>点击</Button>
```

* **type**
```javascript
    {
        success: '按钮状态默认值，success 状态下的按钮样式'
        danger: '警告状态'
        disabled：'不可点击状态'
    }

```

* **icon**
```javascript
    {
        user, close
        loading: '加载 / 提交 状态icon，此 icon 下，按钮 type 应为 disabled 状态'
    }
```

* **size**
```javascript
    {
        small： 'size 为最小标准状态'
        mid: 'Button 的默认size，size 中间值状态'
        large：'size 最大标准尺寸'
    }
```


### Icon组件
> Icon组件目前在项目开发期间，下载少量 aliIcon 文件做开发，没有引用线上CDN，后期做替换即可

使用说明
```javascript
    import { Icon } from 'react-3g'
    import 'react-3g/build/css/index.css'; // 组件全局 Css，建议项目使用中全局引用一次即可

    // 组件使用
    <Icon icon=""/>
```
Icon 类别支持
```javascript
    {
        close
        user
        loading: '支持旋转CSS3动画'
    }
```

### Input组件
> Input组件支持前缀默认值，内嵌 Icon，placeholder设置，以及默认的 onChange 和 onBlur 事件。

使用说明
```javascript
    import { Input } from 'react-3g'
    import 'react-3g/build/css/index.css'; // 组件全局 Css，建议项目使用中全局引用一次即可

    // 组件使用
    <Input type="" prefix="" placeholder="" addonPre="" onChange="" onBlur=""/>
```

* **Input组件字段说明**
```javascript
    {
        type: "Input组件真实DOM 的type，默认为 type=”text“ ",
        prefix: "Input内嵌Icon，字段支持传入设置与 Icon 一致",
        placeholder："Input组件设置默认 tips，与 input 中的 placeholder 一致",
        addonPre："Input 输入框前缀默认值设置",
        onChange："Input change事件监听设置",
        onBlur: "Input 失去焦点事件监听设置"
    }
```

----
组件完善请同步说明文档