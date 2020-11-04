# DevTools extensie

Electron supports the [Chrome DevTools Extension][devtools-extension], which can be used to extend the ability of devtools for debugging popular web frameworks.

## Hoe een DevTools extensie te laden

Dit document beschrijft het proces voor het handmatig laden van een extensie. Probeer ook [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), een tool van derden die extensies rechtstreeks vanuit de Chrome WebStore downloadt.

Om een extensie te laden in Electron, moet je deze downloaden in Chrome-browser, lokaliseer het bestandssysteem pad en laad het dan door het aanroepen van het `BrowserWindow. ddDevToolsExtension(extensie)` API.

Using the [React Developer Tools][react-devtools] as example:

1. Installeer het in Chrome-browser.
1. Navigeer naar `chrome://extensions`en vind de extensie ID, een hash string zoals `fmkadmapgofadopljbjfkapdkoienihi`.
1. Ontdek de bestandssysteemlocatie die Chrome gebruikt voor het opslaan van extensies:
   * op Windows is het `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * op Linux kan het zijn:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * op macOS is het `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Geef de locatie van de extensie aan `BrowserWindow.addDevToolsExtension` API, voor de React Developer Tools, ongeveer zoals:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0')
   )
   ```

**Opmerking:** De `BrowserWindow.addDevToolsExtension` API kan niet worden aangeroepen voordat de ready event van de app module wordt uitgezet.

De extensie wordt onthouden zodat je deze API alleen maar hoeft aan te roepen per extensie. Als u probeert een extensie toe te voegen die al geladen is, deze methode zal niet terugkeren en in plaats daarvan een waarschuwing opslaan op de console.

### Hoe een DevTools extensie te verwijderen

U kunt de naam van de extensie doorgeven aan de `BrowserWindow.removeDevToolsExtension` API om deze te verwijderen. De naam van de extensie wordt geretourneerd door `BrowserWindow. ddDevDevsExtension` en u kunt de namen krijgen van alle geïnstalleerde DevTools Extensions met behulp van de `BrowserWindow.getDevsExtensions` API.

## Ondersteunde DevTools extensies

Electron ondersteunt alleen een beperkte set van `chrome.*` APIs, dus sommige extensies met niet-ondersteunde `chrome.` API's voor chrome extensie-functies werken mogelijk niet. De volgende Devtools extensies zijn getest en werken gegarandeerd op Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/debugger.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Wat moet ik doen als een DevTools-extensie niet werkt?

Zorg ervoor dat de extensie nog steeds wordt onderhouden, sommige extensies kunnen niet eens werken voor recente versies van Chrome-browser, en we kunnen hier niets voor doen.

Dien vervolgens een bug op de lijst met problemen van Electron, en beschrijf welk deel van de extensie niet werkt zoals verwacht.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
