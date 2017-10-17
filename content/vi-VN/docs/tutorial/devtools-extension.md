# Phần mở rộng DevTools

Electron supports the [Chrome DevTools Extension](https://developer.chrome.com/extensions/devtools), which can be used to extend the ability of devtools for debugging popular web frameworks.

## Làm thế nào để tải một phần mở rộng DevTools

This document outlines the process for manually loading an extension. You may also try [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), a third-party tool that downloads extensions directly from the Chrome WebStore.

To load an extension in Electron, you need to download it in Chrome browser, locate its filesystem path, and then load it by calling the `BrowserWindow.addDevToolsExtension(extension)` API.

Ví dụ như [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi):

1. Cài đặt nó trên trình duyệt Chrome.
2. Điều hướng đến `chrome://extensions`, và tìm thấy ID của phần mở rộng đó, là một chuỗi băm giống như `fmkadmapgofadopljbjfkapdkoienihi`.
3. Find out filesystem location used by Chrome for storing extensions: 
    * trên Windows nó là `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    * trên Linux nó sẽ là: 
        * `~/.config/google-chrome/Default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/`
        * `~/.config/chromium/Default/Extensions/`
    * trên macOS thì nó là `~/Library/Application Support/Google/Chrome/Default/Extensions`.
4. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like: `~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

The name of the extension is returned by `BrowserWindow.addDevToolsExtension`, and you can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to unload it.

## Các DevTools Extension được hỗ trợ

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](http://www.cerebraljs.com/documentation/the_debugger)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### Tôi có thể làm gì nếu một phần mở rộng DevTools không làm việc?

Trước tiên hãy chắc chắn rằng phần mở rộng vẫn được cập nhật, một số tiện ích mở rộng có thể không thậm chí làm việc cho các phiên bản gần đây của trình duyệt Chrome, và chúng tôi không thể làm bất cứ điều gì cho nó.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.