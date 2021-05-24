# 开发者工具扩展

Electron supports [Chrome DevTools extensions][devtools-extension], which can be used to extend the ability of Chrome's developer tools for debugging popular web frameworks.

## 使用工具加载 DevTools 扩展

加载 DevTools 扩展的最简单方法是使用第三方工具，来为您实现自动化过程。 [electron-devtools-installer][electron-devtools-installer] 是一个受欢迎的 NPM 包。

## 手动加载 DevTools 扩展

如果你不想使用工具加载，你也可以手动完成所有必需的操作。 要在 Electron 中加载扩展，您需要在 Chrome 下载它，找到其文件系统路径，然后通过调用[`ses.loadExtension`] API 将其加载到您的 [Session][session] 中。

下面以[React Developer Tools][react-devtools]为例：

1. 在 Google Chrome 中安装扩展。
1. 打开`chrome://extensions`，找到扩展程序的ID，像 `fmkadmapgofadopljbjfkapdkoienihi` 一样的 hash 字符串。
1. 找到 Chrome 扩展程序的存放目录：
   * 在Ｗindows 下为 `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * 在 Linux下为：
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * 在 macOS下为`~/Library/Application Support/Google/Chrome/Default/Extensions`。
1. 将扩展的位置传递给 [`ses.loadExtension`][load-extension] API。 对于 React Developer Tools `v4.9.0`, 它看起来像：

   ```javascript
    const { app, session } = require('electron')
    const path = require('path')
    const os = require('os')

    // on macOS
    const reactDevToolsPath = path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.9.0_0'
    )

    app.whenReady().then(async () => {
      await session.defaultSession.loadExtension(reactDevToolsPath)
    })
   ```

**说明：**

* `loadExtension` 返回一个包含 [扩展对象][extension-structure] 的 Promise，其中包含加载的扩展有关的元数据。 在加载页面前，此 Promise 需要被 resolve（例如使用 ` await ` 表达式）。 否则将无法保证扩展被加载。
* `loadExtension` 无法在 `app` 模块 `ready` 之前调用，也不能被内存(非持久) 会话调用。
* 如果您希望加载扩展，则必须在应用的每次启动时调用`loadExtension` 。

### 删除 DevTools 扩展

您可以将扩展的 ID 传递给 [`ses.removeExtension`][remove-extension] API，以将其从您的 Session 中删除。 每次应用重新启动，扩展不会持续。

## DevTools 扩展支持

Electron 仅支持 [有限的 `chrome.*` APIs ][supported-extension-apis]，所以使用不支持的 `chrome.*` 扩展的 APIs 可能无法工作。

以下 DevTools 扩展程序已经通过测试，可以在 Electron 中正常工作：

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### 如果 DevTools 扩展不工作，我该怎么办？

首先，请确保扩展仍在维护中，并与最新版本的 Google Chrome 兼容。 我们不能为不受支持的扩展提供额外支持。

如果扩展可以在 Chrome 上运行，但不能在 Electron 上运行， 在 Electron 的 [issue Tracker][issue-tracker] 中提交一个错误，并描述扩展的哪个部分不能按预期工作。

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[session]: ../api/session.md
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[load-extension]: ../api/session.md#sesloadextensionpath-options
[extension-structure]: ../api/structures/extension.md
[remove-extension]: ../api/session.md#sesremoveextensionextensionid
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[supported-extension-apis]: ../api/extensions.md
[issue-tracker]: https://github.com/electron/electron/issues
