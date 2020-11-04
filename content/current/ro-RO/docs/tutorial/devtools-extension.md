# Extensia DevTools

Electron suportă [Extensia Chrome DevTools](https://developer.chrome.com/extensions/devtools), care poate fi folosită pentru a extinde abilitatea devuneltelor pentru depanarea cadrelor web populare.

## Cum să încărcați o extensie DevTools

Acest document descrie procesul de încărcare manuală a unei prelungiri. Poți de asemenea să încerci [electron-devs-installer](https://github.com/GPMDP/electron-devtools-installer), o unealtă terță parte care descarcă extensii direct din Chrome WebStore.

Pentru a încărca o extensie în Electron, trebuie să o descărcați în browserul Chrome, localizați calea sistemului de fișiere și apoi încărcați-o apelând la `BrowserWindow. ddDevToolsExtension(extensie)` API.

Folosind [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) ca exemplu:

1. Instalați-l în browserul Chrome.
1. Navigați spre `chrome://extensions`, și găsiți ID-ul extensiei, care este un hash șir ca `fmkadmapgofadopljbjfkapdkoienihi`.
1. Aflați locația sistemului de fișiere folosită de Chrome pentru stocarea extensiilor:
   * pe Windows este `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * pe Linux ar putea fi:
     * `~/.config/google-chrome/Implicit/Extensii/`
     * `~/.config/google-chrome-beta/Implicit/Extensii/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Implicit/Extensii/`
   * pe macOS este `~/Librărie/Asistență aplicație/Google/Chrome/Default/Extensions`.
1. Transmite locația extensiei la `BrowserWindow.addDevToolsExtension` API, pentru React Developer Tools, este de genul:
   ```javascript
   calea const = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapfadopljbjfkapdkoienihi/4.3.0_0')
)
   ```

**Notă:** `BrowserWindow.addDevToolsExtension` API nu poate fi apelat înainte ca evenimentul pregătit al modulului aplicației să fie emis.

Extensia va fi amintită, așa că trebuie să apelați acest API o singură dată pentru fiecare extensie . Dacă încercați să adăugați o extensie care a fost deja încărcată, această metodă nu se va întoarce şi în schimb va semnala un avertisment către consolă.

### Cum să eliminați o extensie DevTools

Puteți transmite numele extensiei către `BrowserWindow.removeDevToolsExtension` API pentru a o elimina. Numele extensiei este returnat de `BrowserWindow. ddDevToolsExtensia` și puteți obține numele tuturor extensiilor DevTools folosind `API-ul BrowserWindow.getDevToolsExtensii`.

## Extensii DevTools acceptate

Electron suportă doar un set limitat de `chrome.*` API-uri, deci unele extensii folosind `chrome.` Este posibil ca API-urile pentru caracteristicile extensiei chrome să nu funcționeze. Extensiile dispozitivelor de mai jos sunt testate și garantate să funcționeze în Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Instrumente de dezvoltare React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Depanare Fundal](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [depanare jQuery](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Depanator Cerebral](https://cerebraljs.com/docs/introduction/devtools.html)
* [Extensia Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Instrumente de dezvoltare MobX](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### Ce ar trebui să fac dacă o extensie DevTools nu funcționează?

În primul rând, vă rugăm să vă asigurați că extensia este în continuare menținută, unele extensii nici măcar nu pot funcţiona pentru versiunile recente ale browserului Chrome, şi nu putem face nimic pentru ele.

Apoi arhivați o eroare la lista de probleme a Electron și descrieți ce parte a extensiei nu funcționează conform așteptărilor.
