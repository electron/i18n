---
title: 在 Electron 中从本地到JavaScript
author: codebytere
date: '2019-03-19'
---

C++或Objective-C写的Electron的功能如何会被访问JavaScript，以便最终用户可以使用？

---

## 二. 背景

[Electron](https://electronjs.org) 是一个JavaScript 平台，其主要目的是降低屏障，让开发人员能够构建强大的桌面应用，而不必担心平台的实现情况。 然而，在其核心上，Electron本身仍然需要特定平台的功能以特定的系统语言写入。

在现实中，Electron为您处理本机代码，以便您能够专注于单个的 JavaScript API。

尽管如此，这种做法是如何运作的？ C++或Objective-C写的Electron的功能如何会被访问JavaScript，以便最终用户可以使用？

为了追踪这条路径，让我们以 [`应用程序` 模块](https://electronjs.org/docs/api/app) 开始。

打开 [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) 文件在我们的 `lib/` 目录中，你会找到下面的代码行到顶部：

```js
const binding = process.electronic Binding('app')
```

此行直接指向Electron的机制，将其C++/Objective-C 模块绑定到 JavaScript 供开发者使用。 此函数是由 `ElectronBindings` 类的 [实现文件](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) 创建的。

## `电子绑定`

这些文件添加 `process.electronic Binding` 函数，它像Node.js `process.binding`。 `process.binding` 是一个较低级别的节点实现。 ss [`require()`](https://nodejs.org/api/modules.html#modules_require_id) 方法 除非允许用户 `需要` 本机代码而不是 JS中的其他代码。 这个自定义 `process.electron.bind` 函数赋予了从 Electron 加载本地代码的能力。

当一个顶级的 JavaScript 模块 (如 `app`) 需要这个本地代码时，该本地代码的状态是如何确定和设置的？ 在 JavaScript 中暴露在哪里？ 属性是什么？

## `原生模式`

目前， 这个问题的答案可以在 `原生_mate`中找到：Chromium 的 [`gin` 库](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) 可以更容易在 C++ 和 JavaScript 之间混合类型。

在 `内, 本地的 mate/native_mate/native_mate` 有一个 `object_template_builder 的标题和实现文件` 这是让我们能够在本地代码中形成模块，其形状符合JavaScript开发者的期望。

### `mate::ObjectTemplateBuilder`

如果我们把每一个 Electron 模块看作一个 `对象`, 更容易理解我们为什么要使用 `object_template_builder` 来构造它们。 这个类是建立在V8所暴露的一个类之上的，它是谷歌的开放源代码高性能JavaScript和WebAssembly引擎，用C++写成。 V8 实现了JavaScript (ECMAscript) 规格，因此其本机功能实现可以直接关联到 JavaScript中的实现。 例如， [`v8:::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) 给了我们一个没有专门的构造函数和原型的 JavaScript 对象。 它使用 `对象[.prototype]`, 并且在 JavaScript 中相当于 [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

若要看到此操作，请查看应用模块的实现文件， [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc)。 底部如下：

```cpp
mate::ObjectTemplateBuilder(隔离, 原型->原型模板())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

在上述行中， `.SetMethod` 被调用在 `Mate::ObjectTemplateBuilder`. `. etMethods` 可以调用 `ObjectTemplateBuilder 的任何实例` 类来在 JavaScript 中设置方法 [对象原型](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) 使用以下语法：

```cpp
.SetMethod("method_name", &function_to_bind)
```

此 JavaScript 对应于：

```js
function App{}
App.prototype.getGPUInfo = function () {
  // implementation here
}
```

此类也包含在模块上设置属性的函数：

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

或

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

这些反过来将是 [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) 的 JavaScript 实现：

```js
函数App {}
Object.defineProperty(App.protype, 'myProperty', format@@
  get() {
    return _myProperty
  }
})
```

和

```js
函数App {}
Object.defineProperty(App.protype, 'myProperty', format@@
  get() {
    return _myProperty
  }
  set(newPropertyValue)
    _myProperty = newPropertyValue

})
```

可以按照开发者的期望，创建由原型和属性组成的 JavaScript 对象。 并且更清楚地说明在这个较低的系统级别上执行的功能和属性！

关于在哪里执行任何特定模块方法的决定本身是一种复杂和常常不具有决定性的方法，我们将在今后的职位中涵盖这个问题。
