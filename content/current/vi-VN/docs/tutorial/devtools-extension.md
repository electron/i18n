# Phần mở rộng DevTools

Electron hỗ trợ [Chrome DevTools Extension](https://developer.chrome.com/extensions/devtools), có thể được sử dụng để nâng khả năng của các công cụ phát triển, giúp debug các framework web thông dụng.

## Làm thế nào để tải một phần mở rộng DevTools

Tài liệu này mô tả quá trình nạp một phần mở rộng (extension) một cách thủ công. Bạn cũng có thể thử [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), một công cụ của bên thứ 3 giúp tải các phần mở rộng trực tiếp từ Chrome WebStore.

Để nạp một phần mở rộng trong Electron, bạn cần tải nó bằng Chrome, xác định đường dẫn file, và sau đó nạp bằng cách gọi API `BrowserWindow.addDevToolsExtension(extension)`.

Ví dụ như [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi):

1. Cài đặt nó trên trình duyệt Chrome.
1. Điều hướng đến `chrome://extensions`, và tìm thấy ID của phần mở rộng đó, là một chuỗi băm giống như `fmkadmapgofadopljbjfkapdkoienihi`.
1. Tìm đường dẫn file được Chrome sử dụng để lưu các phần mở rộng:
   * trên Windows nó là `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * trên Linux nó sẽ là:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * trên macOS thì nó là `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
   )
   ```

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

The extension will be remembered so you only need to call this API once per extension. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

### How to remove a DevTools Extension

You can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to remove it. The name of the extension is returned by `BrowserWindow.addDevToolsExtension` and you can get the names of all installed DevTools Extensions using the `BrowserWindow.getDevToolsExtensions` API.

## Các DevTools Extension được hỗ trợ

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Tôi có thể làm gì nếu một phần mở rộng DevTools không làm việc?

Trước tiên hãy chắc chắn rằng phần mở rộng vẫn được cập nhật, một số tiện ích mở rộng có thể không thậm chí làm việc cho các phiên bản gần đây của trình duyệt Chrome, và chúng tôi không thể làm bất cứ điều gì cho nó.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.
