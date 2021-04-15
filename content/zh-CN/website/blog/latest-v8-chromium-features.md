---
title: 在 Electron 中使用 V8 和 Chromium 功能
author: 吉尔福德
date: '2016-01-07'
---

构建一个 Electron 应用程序意味着您只需要为一个浏览器创建一个代码库和设计，这很方便。 但因为Electron使用 [节点保持最新状态。 s](http://nodejs.org) and [Chromium](https://www.chromium.org) 当他们发布时，你也可以利用他们所运送的伟大功能。 在某些情况下，这会消除您以前可能需要在 web 应用程序中包含的依赖关系。

---

有许多功能，我们会在这里作为示例来涵盖一些功能， 但如果您有兴趣了解所有功能，您可以关注 [Google Chromium 博客](http://blog.chromium.org) 和 [节点。 s 更新日志](https://nodejs.org/en/download/releases) 您可以在 [electronjs.org/#electron-version](https://electronjs.org/#electron-versions) 查看什么版本的 Node.js, Chromium 和 V8 Electron 。

## ES6 通过 V8 支持

Electron 将 Chromium 的渲染库与 Node.js 结合起来。 这两个人共享相同的 JavaScript 引擎， [V8](https://developers.google.com/v8)。 许多ECMAScript 2015 (ES-6)功能已经被编译成V8，这意味着您可以在您的 Electron 应用程序中使用它们，而没有任何编译器。

下面是几个示例，但你也可以获得类(严格模式)、块范围、 许诺、键入数组等等。 查看 [这个邮件列表](https://nodejs.org/en/docs/es6/) 以获取V8中ES6功能的更多信息。

**箭头函数**

```js
findTime () => P
  console.log(new Date())
}
```
**字符串内插值**

```js
var octocat = "Mona Lisa";
console.log(`octocat的名称是 ${octocat}`);
```

**New Target**

```js
Octocat() => {
  if (!new.target) throw "Not new";
  console.log("New Octocat");
}

// Throws
Octocat();
// Logs
new Octocat();
```

**数组包含**

```js
 // 返回
[1, 2]。包括(2)；
```

**调用参数**

```js
// 将无限期的参数数表示为数组
(a, c, ...args) => @un.org
  console.log(args.length)
}
```

## 铬功能

感谢谷歌和贡献者为Chromium付出的艰苦努力， 当你构建Electron应用程序时，你也可以使用像(但不限于):

- [MouseEvent.getModifierState()](https://googlechrome.github.io/samples/mouseevent-get-modifier-state/index.html)
- [CSS.escape()](https://googlechrome.github.io/samples/css-escape/index.html)
- [获取 API 流](https://googlechrome.github.io/samples/fetch-api/fetch-response-stream.html)

和 [Google Chromium 博客](http://blog.chromium.org) 一起学习作为新版本船的功能。 您可以查看Electron在这里使用的 Chromium 版本 [](https://electronjs.org/#electron-versions)

## 您感到兴奋的是什么？

向我们推荐 [@ElectronJS](https://twitter.com/electronjs) 你最喜欢的功能已经被植入V8 或 Chromium。

