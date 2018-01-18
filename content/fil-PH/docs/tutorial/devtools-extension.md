# DevTools Ekstensiyon

Sumusuporta ang Elektron [DevTools Ekstensiyon ng Chrome](https://developer.chrome.com/extensions/devtools), na kung saan ay maaaring gamitin upang palawakin ang mga kakayahan ng devtools sa pagdedebug ng kilalang balangkas sa web.

## Paano i-load ang isang Ekstensiyon ng DevTools

Dokumentong ito ay naglalahad ng proseso para sa mano-manong pagloading ng ekstensiyon. Pwede mo ring subukan [elektron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), isang third party tool na nag-dadownload ng ekstensiyon na direkta mula sa Chrome WebStore.

Sa pag-load ng ekstensiyon sa elektron, kailangan mong i-download ito sa Chrome browser, hanapin itong filesystem path, at i-load ang mga ito sa pagtawag sa `BrowserWindow.addDevToolsExtension(ekstensiyon)` API.

Gamit ang [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) bilang halimbawa:

1. I-install ito sa browser ng Chrome.
2. Mag-navigate sa `chrome://ekstensiyon`, at mahanap ito ang ekstensiyon ng ID, kung saan ang hash string tulad ng `fmkadmapgofadopljbjfkapdkoienihi`.
3. Alamin ang lokasyon ng filesystem lokasyon gamit ang Chrome para sa pag-iimbak ng mga ekstensiyon: 
    * sa Windows ito ang `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    * sa Linux ito ay maaaring: 
        * `~/.config/Google-Chrome/default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/`
        * `~/.config/chromium/Default/Extensions/`
    * sa macOS ito ay `~/Library/Application Support/Google/Chrome/Default/Extension`.
4. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like: `~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

The name of the extension is returned by `BrowserWindow.addDevToolsExtension`, and you can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to unload it.

## Supported DevTools Extensions

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/debugger.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### What should I do if a DevTools Extension is not working?

First please make sure the extension is still being maintained, some extensions can not even work for recent versions of Chrome browser, and we are not able to do anything for them.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.