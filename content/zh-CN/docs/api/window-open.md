# 从渲染器打开窗口

有几种方法可以控制如何从渲染器中受信任或 不受信任的内容创建窗口。 从渲染器中可以通过两种方式创建窗口：

- 单击链接或提交带有 `target=_blank`的表格
- 爪哇脚本呼叫 `window.open()`

在非沙盒渲染器中，或当 `nativeWindowOpen` 是假的（默认值）时，这会导致创建一个 [`BrowserWindowProxy`](browser-window-proxy.md)，一个围绕 `BrowserWindow`的轻包装。

但是，当设置 `sandbox` （或直接、 `nativeWindowOpen`）选项时，将创建一个 `Window` 实例，正如您在浏览器中所期望的那样。 对于同源 内容，新窗口在同一过程中创建，使家长 能够直接访问儿童窗口。 对于将 为首选项面板或类似功能的应用子窗口，这非常有用，因为父可以直接呈现给子窗口 ，就好像它是父中的 `div` 一样。

电子配对本机铬 `Window` 与浏览器窗口下罩。 您可以利用在主过程中创建 浏览器窗口时提供的所有自定义，使用 `webContents.setWindowOpenHandler()` 进行渲染器创建的窗口。

浏览器窗口构造器选项由 从父继承的选项、从 `window.open()``features` 字符串中 解析的选项、从父继承 的安全相关 WebPrefers 以及 [`webContents.setWindowOpenHandler`](web-contents.md#contentssetwindowopenhandlerhandler)给出的选项来设置。 请注意， `webContents.setWindowOpenHandler` 拥有最终决定权和充分的特权 ，因为它在主要过程中被引用。

### `window.open(url[, frameName][, features])`

* `url` String
* `frameName` String（可选）
* `features` String（可选）

返回 [`BrowserWindowProxy`](browser-window-proxy.md) | [`Window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)

`features` 是一个逗号分离的键值列表，遵循 浏览器的标准格式。 为了方便起见，Electron 将尽可能从此 列表中解析 `BrowserWindowConstructorOptions` 。 为了完全控制和更好的人体工程学， 考虑使用 `webContents.setWindowOpenHandler` 来定制 浏览器窗口创建。

`WebPreferences` 子集可以直接设置， 无名，从功能字符串： `zoomFactor`， `nodeIntegration`， `preload`， `javascript`， `contextIsolation`，和 `webviewTag`。

例如：

```js
窗口。打开（"#/github.com"，"_blank"，"顶部=500，左=200，帧=错误，节点整合=否"）
```

**注意：**

* 如果在父窗口中禁用了 Node integration, 则在打开的 `window ` 中将始终被禁用。
* 如果在父窗口中启用了上下文隔离, 则在打开的 ` window ` 中将始终被启用。
* 父窗口禁用 Javascript，打开的 `window` 中将被始终禁用
* `features` 中给出的非标准功能（不由铬或电子处理）将传递给 `additionalFeatures` 参数中任何注册 `webContents` `did-create-window` 事件处理程序。

要自定义或取消窗口的创建，您可以从主 过程中可选地设置具有 `webContents.setWindowOpenHandler()` 的 覆盖处理程序。 返回 `false` 取消窗口，同时返回对象集 创建窗口时使用的 `BrowserWindowConstructorOptions` 。 请注意， 这比通过功能字符串传递选项更强大，因为 渲染器在决定安全偏好方面比 主过程拥有更有限的权限。

### `BrowserWindowProxy` 个例子

```javascript

主.js
主窗口=新浏览器窗口（）

主窗口。web控制器.设置窗口开启手勒（（{ url }）=> {
  如果（url.开始与（.com [
    返回 { action: 'allow' }
  ]
  返回 { action: 'deny' }
[）

主窗口. web 康滕茨. on （'创建窗口'， （儿童窗口）=> {
  //例如。。。
  儿童窗口。网络控制（'将导航'，（e）=> {
    e.预防过失（）
  }）
}）
```

```javascript
渲染器.js
通窗proxy = 窗口. 打开 （'https：// github.com/'， 空， '最小化=错误'）
窗口Proxy. 后信息 （'嗨'， '*'）
```

### 原生 `Window` 例子

```javascript
主.js
主窗口=新的浏览器窗口（+
  网络预设： {
    nativeWindowOpen: true
  }
}）

//在此示例中，将创建只有带有"关于：空白"url的窗口。
所有其他网址将被阻止。
主窗口. web 康滕茨. 设置窗口打开汉德勒 （（{ url }） => {
  如果 （url = = '关于： 空白'） {
    返回 {
      帧： 假，
      全屏：虚假的，
      背景颜色："黑色"，
      网络前言： {
        preload: 'my-child-window-preload-script.js'
      }
    =
  =
  返回虚假
}）
```

```javascript
渲染器过程（主窗口）
锥子窗口=窗口。打开（'，'模态'）
儿童窗口。文档。写（'<h1>你好</h1>'）
```
