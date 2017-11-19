# 多线程

通过[Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers)，可以实现用操作系统级别的线程来跑JavaScript

## 多线程的Node.js

可以在Electron的Web Workers里使用Node.js的特性。要用的话，需把`webPreferences`中的`nodeIntegrationInWorker`选项设置为`true`

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

`nodeIntegrationInWorker` 可以独立于`nodeIntegration`使用，但`sandbox`必须不能设置为`true`

## 可用的API

Web Workers支持Node.js的所有内置模块，而且`asar`档案也仍通过Node.js的API来读取。 不过没有一个Electron的内置模块可以用在多线程环境中。

## 原生Node.js模块

在Web Workers里可以直接加载任何原生Node.js模块，但不推荐这样做。 大多数现存的原生模块是在假设单线程环境的情况下编写的，如果把它们用在Web Workers里会导致崩溃和内存损坏。

请注意, 即使原生Node.js模块如果考虑到了线程安全问题， 但在 Web Worker中加载它仍然不安全, 因为 ` process.dlopen ` 函数并没有考虑。

现在安全顺利地加载原生模块的唯一办法，就是确保在Web Workers启动后app不加载原生模块。

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```