---
title: Electron 0.37的新功能
author: zeke
date: '2016-03-25'
---

Electron `0.37` was recently [released](https://github.com/electron/electron/releases) and included a major upgrade from Chrome 47 to Chrome 49 and also several new core APIs. 这个最新版本带来了所有在 [Chrome 48](http://blog.chromium.org/2015/12/chrome-48-beta-present-to-cast-devices_91.html) and [Chrome 49](http://blog.chromium.org/2016/02/chrome-49-beta-css-custom-properties.html) 中发运的新功能。 这包括CSS 自定义属性，增加 [ES6](http://www.ecma-international.org/ecma-262/6.0/) 支持， `键盘事件` 改进。 `承诺` 改进以及您的 Electron 应用程序现在可以使用的许多其他新功能。

---

## 新功能

### CSS Custom Properties

如果您使用了诸如Sass和Less等预处理语言，您可能很熟悉 *个变量*， 允许您定义可重复使用的颜色方案和布局等值。 变量有助于保持样式表DRY 和更易维护。

CSS 自定义属性类似于预处理的变量，因为它们是可重复使用的。 但他们也有一个独特的品质，使他们更强大和更灵活： **他们可以被JavaScript** 所操纵。 这个微妙但强大的功能允许在仍然从 [CSS 的硬件加速度](https://developer.mozilla.org/en-US/Apps/Fundamentals/Performance/Performance_fundamentals#Use_CSS_animations_and_transitions)中获益的同时对视觉接口进行动态更改， 并减少你的前端代码和样式表之间的代码重复。

关于CSS 自定义属性的更多信息，请参阅 [MDN 文章](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_variables) and [Google Chrome 演示](https://googlechrome.github.io/samples/css-custom-properties/)。

#### 动作中的 CSS 变量

让我们走过一个简单的变量示例，这个示例可以在你的应用中进行调整。

```css
:root 然后
  --awesome-color: #A5ECFA;
}

body v.
  background-color: var(--awesome-color);
}
```

可直接在 JavaScript 中检索和更改变量值：

```js
// 获取变量值 ' #A5ECFA'
let color = window.getComputedStyle(document.body).getPropertyValue('--awesome-color')

// 将变量值设置为“orange”
document.body.style.setProperty('--awesome-color', 'orange')
```

变量值也可以从开发工具的 **样式** 部分进行快速反馈和调整：

![样式选项卡中的 CSS 属性](https://cloud.githubusercontent.com/assets/671378/13991612/1d10eb9c-f0d6-11e5-877b-c4dbc59f1209.gif){: .screenshot }

### `键盘事件代码` 属性

Chrome 48 添加了新的 `代码` 属性在 `键盘事件` 的事件，这些事件将是独立于操作系统键盘布局的物理键盘按下。

这将使您的 Electron 应用程序中的自定义键盘快捷键更加准确和更加一致。

```js
window.addEventListener('keydown', function(event) {
  console.log(`${event.code} was pressed.`)
})
```

查看 [这个示例](https://googlechrome.github.io/samples/keyboardevent-code-attribute/) 来看到它正在操作。

### 承诺拒绝事件

Chrome 49 添加了两个新的 `窗口` 事件允许您在被拒绝 [承诺](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) 未处理时收到通知。

```js
window.addEventListener('unhandledrejection', function (event) {
  console.log('A rejected promise was unhandled', event.promise, event.reason)
})

window.addEventListener('rejectionhandled', function (event) {
  console.log('A rejected promise was handled', event.promise, event.reason)
})
```

查看 [这个示例](https://googlechrome.github.io/samples/promise-rejection-events/index.html) 来看到它正在操作。

### V8 的 ES2015 更新

Electron 现在的 V8 版本包含了 [91% 的 ES2015](https://kangax.github.io/compat-table/es6/#chrome49)。 这里是一些有趣的添加，您可以在框外使用 — 无标志或预编译器：

#### 默认参数

```js
函数乘法 (x, y = 1)
  返回 x * y


乘法 (5) // 5
```

#### 解构赋值

Chrome 49 添加 [销毁作业](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) 以使分配变量和函数参数变得更加容易。

这使Electron需要更干净和更紧凑的方式来分配：

##### 需要浏览器进程

```js
const {app, BrowserWindow, Menu} = require('electron')
```

##### 需要渲染流程

```js
const {dialog, Tray} = require('electron').远程
```

##### 其他例子

```js
// Destructuring an array and skipping the second element
const [first, , last] = findAll()

// Destructuring function parameters
function whois({displayName: displayName, fullName: {firstName: name}}){
  console.log(`${displayName} is ${name}`)
}

let user = {
  displayName: "jdoe",
  fullName: {
      firstName: "John",
      lastName: "Doe"
  }
}
whois(user) // "jdoe is John"

// Destructuring an object
let {name, avatar} = getUser()
```

## 新 Electron APIs

新的 Electron API下面，你可以在 [Electron 版本](https://github.com/electron/electron/releases) 的发布说明中看到每个新的 API。

#### `显示` and `隐藏` 事件在 `浏览器窗口`

当窗口显示或隐藏时，这些事件会被发出。

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
窗口 n('show', function () por console.log('Window was shown') })
wind.on('hide', function ()
```

#### `平台主题更改` on `application` for `OS X`

当切换系统的 [暗色模式](https://discussions.apple.com/thread/6661740) 主题时，此事件将被发出。

```js
const {app} = require('electron')

app.on('platform-theme-changed', function () {
  console.log(`Platform theme changed. 在暗色模式下？ ${app.isDarkMode()}`)
})
```

#### `app.isDarkMode()` for `OS X`

This method returns `true` if the system is in Dark Mode, and `false` otherwise.

#### `滚动触摸开头` and `滚动触摸端` 事件到 BrowserWindow for `OS X`

滚轮活动阶段已经开始或已经结束，这些活动将在滚轮活动阶段后发出。

```js
const {BrowserWindow} = require('electron')

let window = new BrowserWindow({width: 500, height: 500})
window.on('scrolling touch-begin', function () () og('Scroll touch started') })
wind.on('scroll-touch-end', func()
```

