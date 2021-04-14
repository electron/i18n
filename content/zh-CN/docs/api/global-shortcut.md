# 系统快捷键

> 在应用程序没有键盘焦点时，监听键盘事件。

进程：[主进程](../glossary.md#main-process)

` globalShortcut ` 模块可以在操作系统中注册/注销全局快捷键, 以便可以为操作定制各种快捷键。

** 注意: **快捷方式是全局的; 即使应用程序没有键盘焦点, 它也仍然在持续监听键盘事件。 在发出应用模块的 `ready` 事件之前，无法使用此模块。

```javascript
康斯特 { app, globalShortcut } =需要（"电子"）

应用程序。当准备好时，然后=> {
  //注册一个"指挥官控制+X"快捷方式侦听器。
  const ret = globalShortcut.register('CommandOrControl+X', () => {
    console.log('CommandOrControl+X is pressed')
  })

  if (!ret) {
    console.log('registration failed')
  }

  // 检查快捷键是否注册成功
  console.log(globalShortcut.isRegistered('CommandOrControl+X'))
})

app.on('will-quit', () => {
  // 注销快捷键
  globalShortcut.unregister('CommandOrControl+X')

  // 注销所有快捷键
  globalShortcut.unregisterAll()
})
```

## 方法

` globalShortcut ` 模块具有以下方法:

### `globalShortcut.register(accelerator, callback)`

* `accelerator` [Accelerator](accelerator.md)
* `callback` Function

返回`Boolean` - 快捷键注册是否成功

注册 `accelerator` 的全局快捷键。 当用户按下注册快捷键时， `callback` 会被调用。

如果指定的快捷键已经被其他应用程序注册掉, 调用会默默失败。 该特性由操作系统定义，因为操作系统不希望多个程序的全局快捷键互相冲突。

在 macOS 10.14 Mojave 下面，如果 app 没有被授权为[可信任使用的客户端](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)，那么下列快捷键会注册失败：

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.registerAll(accelerators, callback)`

* `accelerators` String[] - an array of [Accelerator](accelerator.md)s.
* `callback` Function

在 `accelerators`中注册所有 `accelerator` 项目的全球快捷方式。 当用户按下任何注册快捷方式时，将调用 `callback` 。

如果定义的快捷键已经被其他应用占有，这个调用会故障沉默。 该特性由操作系统定义，因为操作系统不希望多个程序的全局快捷键互相冲突。

在 macOS 10.14 Mojave 下面，如果 app 没有被授权为[可信任使用的客户端](https://developer.apple.com/library/archive/documentation/Accessibility/Conceptual/AccessibilityMacOSX/OSXAXTestingApps.html)，那么下列快捷键会注册失败：

* "Media Play/Pause"
* "Media Next Track"
* "Media Previous Track"
* "Media Stop"

### `globalShortcut.isRegistered(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

Returns `Boolean` - 表示 `accelerator` 全局快捷键是否注册成功

当快捷键已经被其他应用程序注册时, 此调用将返回 ` false `。 该特性由操作系统定义，因为操作系统不希望多个程序的全局快捷键互相冲突。

### `globalShortcut.unregister(accelerator)`

* `accelerator` [Accelerator](accelerator.md)

注销 `accelerator` 的全局快捷键。

### `globalShortcut.unregisterAll()`

注销所有的全局快捷键（清空该应用程序的全局快捷键）。
