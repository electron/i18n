# DevTools Ekstensiyon

Sumusuporta ang Elektron [DevTools Ekstensiyon ng Chrome](https://developer.chrome.com/extensions/devtools), na kung saan ay maaaring gamitin upang palawakin ang mga kakayahan ng devtools sa pagdedebug ng kilalang balangkas sa web.

## Paano i-load ang isang Ekstensiyon ng DevTools

Dokumentong ito ay naglalahad ng proseso para sa mano-manong pagloading ng ekstensiyon. Pwede mo ring subukan [elektron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), isang third party tool na nag-dadownload ng ekstensiyon na direkta mula sa Chrome WebStore.

Sa pag-load ng ekstensiyon sa elektron, kailangan mong i-download ito sa Chrome browser, hanapin itong filesystem path, at i-load ang mga ito sa pagtawag sa `BrowserWindow.addDevToolsExtension(ekstensiyon)` API.

Gamit ang [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) bilang halimbawa:

1. I-install ito sa browser ng Chrome.
1. Mag-navigate sa `chrome://ekstensiyon`, at mahanap ito ang ekstensiyon ng ID, kung saan ang hash string tulad ng `fmkadmapgofadopljbjfkapdkoienihi`.
1. Alamin ang lokasyon ng filesystem lokasyon gamit ang Chrome para sa pag-iimbak ng mga ekstensiyon:
   * sa Windows ito ang `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * sa Linux ito ay maaaring:
     * `~/.config/Google-Chrome/default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * sa macOS ito ay `~/Library/Application Support/Google/Chrome/Default/Extension`.
1. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0')
   )
   ```

**Paunawa:** Ang `BrowserWindow.addDevToolsExtension` API huwag tawagan bago mahanda ang pangyayari sa app ng modyul sa paglabas.

Ang mga pangalan ng ekstensiyon ay ibinalik ng `BrowserWindow.addDevToolsExtension`, at ikaw ang magpapasa ng pangalan ng ekstensiyon sa `BrowserWindow.removeDevToolsExtension` API ialis ito.

## Suportado ng DevTools Ekstensiyon

Elektron lamang ang sumusuporta sa isang limitadong set ng.*`chrome.*` APIs, kaya mayroong ekstensiyon gamit ang hindi suportadong `chrome.*` APIs para sa chrome ekstensiyon na tampok pwedeng hindi gumana. Sumusunod na Devtools Extensions ay sinubukan at garantisadong magbubunga sa Elektron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.Js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/debugger.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Ano ang dapat kong gawin kung hindi gumagana ang DevTools Ekstensiyon?

Una sa lahat mangyaring siguraduhin na ang ekstensiyon ay palaging pangalagaan, ang ilang ekstensiyon ay hindi gumagana kahit bago ang bersyon ng browser ng Chrome, at kami ay walang magawa sa anumang bagay para sa kanila.

Saka mag-file ng bug at listahan ng mga isyu ng mga elektron, at ilarawan kung aling bahagi ng ekstensiyon ay hindi gumagana tulad ng inaasahan.
