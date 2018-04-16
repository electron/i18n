# 开发工具扩展程序

Electron支持[Chrome 开发工具扩展程序](https://developer.chrome.com/extensions/devtools)，可增强开发工具调试流行web框架的能力

## 如何加载一个开发工具扩展程序

本文简要描述了手动加载一个扩展程序的过程 你也可以尝试一下[electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer)，这个第三方工具可以直接从Chrome的WebStore下载扩展程序

为了在Electron中加载一个扩展程序，你需要在Chrome浏览器中下载它，找到它在系统目录中位置，然后调用`BrowserWindow.addDevToolsExtension(extension)`API 加载它

下面以[React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)为例：

1. 在 Chrome 中安装React Developer Tools 。
2. 打开`chrome://extensions`，找到扩展程序的ID，形如`fmkadmapgofadopljbjfkapdkoienihi`的hash字符串。
3. 找到Chrome 扩展程序 的存放目录： 
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

Electron 只支持有限的`chrome.*`API，所以使用了一些不支持的`chrome.*`API的扩展可能无法正常工作。 以下的开发者工具扩展已经通过测试保证可以工作：

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/debugger.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### 如果 DevTools 扩展不工作, 我该怎么办？

首先请确保扩展仍在维护中, 有些扩展甚至不支持 Chrome 浏览器的最新版本, 对此我们也无能为力。

然后在Electron的问题列表中提交一个 bug, 并描述扩展的哪个部分没有按预期的方式工作。