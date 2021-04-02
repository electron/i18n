# 开发工具扩展程序

电子支持 [铬DevTools扩展][devtools-extension]，它可以 用于扩展Chrome的开发人员工具调试 流行的网络框架的能力。

## 用模齿加载 DevTool 扩展

加载 DevTools 扩展的最简单方法是使用第三方样式为您自动化 过程。 [电子开发-安装器][electron-devtools-installer] 是一个流行的 NPM包，正是这样做。

## 手动加载开发图扩展

如果您不想使用手提方法，您也可以手动执行所有必要的 操作。 要在 Electron 中加载扩展，您需要通过 Chrome 下载它， 定位其文件系统路径，然后通过调用 [`ses.loadExtension`] API 将其加载到您的 [会话][session] 中。

以 [反应开发人员工具][react-devtools] 为例：

1. 在谷歌浏览器中安装扩展。
1. 打开`chrome://extensions`，找到扩展程序的ID，形如`fmkadmapgofadopljbjfkapdkoienihi`的hash字符串。
1. 了解 Chrome 用于存储扩展的文件系统位置：
   * 在Ｗindows 下为 `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * 在 Linux下为：
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * 在 macOS下为`~/Library/Application Support/Google/Chrome/Default/Extensions`。
1. 将扩展位置传递给 [`ses.loadExtension`][load-extension] API。 对于反应开发人员工具 `v4.9.0`，它看起来像：

   ```javascript
    const { app, session } = 需要 （"电子"）
    路由 = 要求 （'路径'）
    const os = 要求 （'os'）

    // 在 macOS
    const 反应功能路径 = 路径
      
      。 s/fmkadmapgadopljbjfkapdkoienihi/4.9.0_0'
    ）

    应用程序
    
      > 。
   ```

**注意：**

* `loadExtension` 返回一个承诺与 [扩展对象][extension-structure]， 其中包含有关加载的扩展元数据。 此承诺需要在加载页面之前 解决（例如， `await` 表达式）。 否则， 扩展将无法保证加载。
* `loadExtension` 不能在发出 `app` 模块 `ready` 事件之前调用，也不能在内存（非持久性）会话中调用。
* 如果您希望加载 扩展，则必须在应用的每个启动上调用`loadExtension` 。

### 删除开发图扩展

您可以将扩展的 ID 传递到 [`ses.removeExtension`][remove-extension] API，以便 将其从会话中删除。 加载的扩展不会在应用发布 之间保持。

## 开发图扩展支持

电子只支持 [有限的一组 `chrome.*` API][supported-extension-apis]， 因此在引擎盖下使用不受支持的 `chrome.*` API的扩展可能不起作用。

以下 Devtools 扩展已测试在电子中工作：

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### 如果DevTools扩展不起作用，该怎么办？

首先，请确保扩展仍在维护中，并且 与最新版本的 Google Chrome 兼容。 我们不能为 不受支持的扩展提供额外支持。

如果扩展在 Chrome 上工作，但在 Electron 上不起作用，请在 Electron 的 [问题跟踪器中提交错误][issue-tracker] 并描述扩展 的哪个部分不能按预期工作。

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[session]: ../api/session.md
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[load-extension]: ../api/session.md#sesloadextensionpath-options
[extension-structure]: ../api/structures/extension.md
[remove-extension]: ../api/session.md#sesremoveextensionextensionid
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[supported-extension-apis]: ../api/extensions.md
[issue-tracker]: https://github.com/electron/electron/issues
