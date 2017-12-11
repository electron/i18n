# 开发者工具扩展

Electron支持[Chrome 开发者工具扩展](https://developer.chrome.com/extensions/devtools)，可增强开发者工具调试流行web框架的能力

## 如何加载一个开发者工具扩展

这个文档简要的描述了手动加载一个扩展的过程 你可以试一下[electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer)，一个可以直接从Chrome的WebStore下载扩展的第三方工具

为了在Electron中加载一个扩展，你需要在Chrome浏览器中下载它，找到它在系统目录中位置，然后调用`BrowserWindow.addDevToolsExtension(extension)`API 加载它

以[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)作为示例：

1. 在 Chrome 浏览器中安装。
2. 导航到`chrome://extensions`，找到扩展的ID号，形如`fmkadmapgofadopljbjfkapdkoienihi`的hash字符串。
3. 找到Chrome存储扩展的系统路径 
    * 在Ｗindows 下为 `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    * 在 Linux下为： 
        * `~/.config/google-chrome/Default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/`
        * `~/.config/chromium/Default/Extensions/`
    * 在 macOS下为`~/Library/Application Support/Google/Chrome/Default/Extensions`。
4. 将扩展的路径传给`BrowserWindow.addDevToolsExtension`，对于React Developer Tools 来说 应该为`~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**注意：**`BrowserWindow.addDevToolsExtension`API不可以在ready事件发出之前调用

`BrowserWindow.addDevToolsExtension`将会返回扩展的名字，你可以把这个名字传入`BrowserWindow.removeDevToolsExtension`API来卸载它。

## 支持的开发者工具扩展

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](http://www.cerebraljs.com/documentation/the_debugger)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### What should I do if a DevTools Extension is not working?

First please make sure the extension is still being maintained, some extensions can not even work for recent versions of Chrome browser, and we are not able to do anything for them.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.