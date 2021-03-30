---
title: 'Electron Internals: Weak References'
author: zcbenz
date: '2016-09-20'
---

作为垃圾收集的语言，JavaScript可以让用户手动管理 资源。 But because Electron hosts this environment, it has to be very careful avoiding both memory and resources leaks.

这个帖子引入了虚弱的引用概念以及如何在 Electron 中使用 来管理资源。

---

## 参考资料不足

在 JavaScript 中，每当您将一个对象分配给一个变量时，您都会添加一个 引用到对象中。 As long as there is a reference to the object, it will always be kept in memory. 一旦不存在对对象的所有引用，即： 那里 不再是存储该对象的变量。JavaScript 引擎将在下次垃圾收集中恢复 的内存。

一个虚弱的引用是一个可以让你获得对象 而不影响是否收集到垃圾的对象。 当物品被收集时，你也会收到 个通知。 然后， 就可以用 JavaScript 管理资源。

在 Electron 中使用 `NativeImage` 类作为示例，每次调用 `本地图像。 reate()` API，一个 `NativeImage` 实例已返回，它是 正在C++中存储图像数据。 完成实例后， JavaScript 引擎(V8) 就收集了物品， C++中的代码将调用 来释放内存中的图像数据，所以用户不需要手动管理

另一个例子是 [窗口消失问题][window-disappearing]，它 直观地显示窗口是如何收集垃圾时，所有引用它 不见了。

## 在 Electron 中测试较弱的引用

无法直接测试原始JavaScript中的软弱引用，因为 语言没有办法分配软弱引用。 JavaScript 中唯一与弱引用相关的 API 是 [弱图][WeakMap]，但由于它只 创建弱参考键，因此无法知道对象何时被 垃圾收集。

在 v0.37.8 之前的 Electron 版本中，您可以使用内部的 `v8Util。 etDestructor` API 来测试薄弱的引用， 它给传递的对象添加了一个虚弱的引用 并在收集到的对象垃圾时调用回调：

```javascript
以下代码只能在电子 < v0.37.8 上运行。
var v8Uil=过程。原子绑定（'v8_util'）

变种对象={}
v8Util.集破坏者（对象、功能（）{
  控制台.log（"对象是收集的垃圾"）
}）

//删除对对象的所有引用。
对象=未定义的
//手动启动GC。
gc（）
//控制台打印"对象是垃圾收集"。
```

请注意，您必须使用 `--js-flags="--expose_gc"` 命令 开启Electron 才能暴露内部的 `gc` 函数。

API 已被删除，因为V8实际上不允许在销毁器中运行 JavaScript 代码，并且在以后的版本中这样做会导致 随机崩溃。

## `远程` 模块中的参考信息不足

除了使用 C++ 管理本机资源外，Electron 也需要 微弱引用来管理JavaScript 资源。 例如，Electron 的 `remote` 模块是一个 [远程程序呼叫][remote-procedure-call] （RPC） 模块， 允许在渲染器流程的主要过程中使用对象。

`远程` 模块的一个关键挑战是避免内存泄漏。 When users acquire a remote object in the renderer process, the `remote` module must guarantee the object continues to live in the main process until the references in the renderer process are gone. 此外， 它还必须确保在 渲染过程中不再有任何引用时， 对象可能会被收集到垃圾。

例如，如果没有正确的实现程序，下列代码会导致内存 迅速泄漏：

```javascript
const {remote} = require('electron')

for (flet i = 0; i < 10000; ++i) 2002,
  remote.nativeImage.createEmpty()
}
```

`远程` 模块中的资源管理很简单。 每当一个对象被请求 消息已发送到主流程，Electron将把对象 存储在地图上，并为其分配ID。 然后将 ID 发送回 渲染过程。 在渲染过程中， `远程` 模块将收到 ID并将其与代理对象包装起来，当代理对象是垃圾时 收集， 一个消息将被发送到主进程以释放对象。

Using `remote.require` API as an example, a simplified implementation looks like this:

```javascript
remote.request = function (name) }
  // 告诉返回模块元数据的主要进程。
  const meta = ipcRender.sendSync('REQUIRE', name)
  // 创建代理对象。
  const object = metaToValue(meta)
  // 告诉当代理对象是垃圾时释放对象
//
  v8Util.setDestructort(object, function () }
    ipcRender.send('FREE', meta.id)
  })
  返回对象
}
```

在主进程：

```javascript
const map = {}
const id = 0

ipcMain. n('REQUIRE', function (formatter, name),
  const object = require(name)
  // 添加对对象的引用。
  map[++id] = 对象
  // 将对象转换为元数据。
  return Value = valueToMeta(id, object)
})

ipcMain.on('FREE', function (formatter, id) }
  delete map[id]
})
```

## 有弱值的地图

使用以前简单的实现方式， `远程` 模块中的每次调用都会 从主流程返回一个新的远程对象。 和每个远程对象 代表了在主进程中对对象的引用。

设计本身是正确的，但问题是当有多次通话到 接收同一个对象时， 将创建多个代理对象， 复杂对象可以给内存使用和垃圾 收藏增加巨大压力。

例如，下列代码：

```javascript
const {remote} = require('electron')

for (flet i = 0; i < 10000; ++i) 2002,
  remote.getCurrentWindow()
}
```

它首先使用大量内存创建代理对象，然后使用 中央处理股来收集垃圾并发送 IPC 信息。

明显优化是缓存远程对象：当已经有 个具有相同ID的远程对象， 先前的远程对象将返回 ，而不是创建一个新的对象。

使用 JavaScript 核心的 API 无法做到这一点。 使用 的正常映射来缓存对象将阻止 V8 收集对象的垃圾，而 [弱映射][WeakMap] 类只能将对象用作弱键。

为了解决这个问题，添加了一个具有虚弱引用值的地图类型，这个类型是 完美的缓存对象的 ID 。 现在 `remote.requires` 看起来像 这样：

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.requires = 函数 (name) }
  // 告诉返回模块元数据的主要进程。
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

请注意， `遥控对象缓存` 将对象存储为虚弱的引用， 所以，在收集垃圾物件时， 不需要删除密钥。

## 原生代码

对于对 Electron 的 C++ 微弱引用代码感兴趣的人来说，它可以在 以下文件中找到：

`破坏器` API：

* [`object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`对象生命显示器.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

`createIDWeakMap` API：

* [`key_fine_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_web map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

[window-disappearing]: https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes
[WeakMap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[WeakMap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[remote-procedure-call]: https://en.wikipedia.org/wiki/Remote_procedure_call

