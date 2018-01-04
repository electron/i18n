# DevTools Eklentisi

Electron supports the [Chrome DevTools Extension](https://developer.chrome.com/extensions/devtools), which can be used to extend the ability of devtools for debugging popular web frameworks.

## DevTools eklentileri nasıl yüklenir

This document outlines the process for manually loading an extension. You may also try [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), a third-party tool that downloads extensions directly from the Chrome WebStore.

Electron'da bir uzantı yüklemek için Chrome tarayıcısında indirmeniz, dosya sistemi yolunu bulmanız ve ardından `BrowserWindow.addDevToolsExtension (uzantı)` API'sını çağırarak yüklemeniz gerekir.

Using the [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) as example:

1. Chrome tarayıcısna yükle.
2. Navigate to `chrome://extensions`, and find its extension ID, which is a hash string like `fmkadmapgofadopljbjfkapdkoienihi`.
3. Uzantıları saklamak için Chrome tarafından kullanılan dosya sistemi konumunu öğrenin: 
    * Windows'ta şu şekildedir `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    * Linux'ta şu şekilde olabilir: 
        * `~/.config/google-chrome/Default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/
`
        * `~/.config/chromium/Default/Extensions/`
    * on macOS it is `~/Library/Application Support/Google/Chrome/Default/Extensions`.
4. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like: `~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

Uzantının adı `BrowserWindow.addDevToolsExtension` tarafından döndürüldü ve uzantının adını kaldırmak için `BrowserWindow.removeDevToolsExtension` API'sine geçirebilirsiniz.

## Desteklenen DevTools Eklentileri

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Devtools Uzantılarının Elektron'da çalışma durumu test edilip garanti edilmektedir:

* [Kahraman müfettiş](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Geliştirici araçları tepkisi](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Omurga hata ayıklayıcı](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery hata ayıklayıcısı](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Serebral hata ayıklayıcı](http://www.cerebraljs.com/documentation/the_debugger)
* [Redux DevTools Eklentisi](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX geliştirici araçları](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### DevTools Eklentisi çalışmıyorsa ne yap malıyım?

Öncelikle uzantının hala korunduğundan emin olun, hatta bazı uzantıların Chrome tarayıcısının son sürümlerinde bile çalışamaz ve biz onlar için hiçbir şey yapamıyoruz.

Daha sonra Elektronların sayı listesinde bir hata dosyası ve uzantısının hangi kısmının beklendiği gibi çalışmadığını belirtin.