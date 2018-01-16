# Extensión de herramientas de desarrollo

Electron soporta [Chrome DevTools Extension](https://developer.chrome.com/extensions/devtools), que puede ser usado para extender la capacidad de devtools para depurar web frameworks populares.

## Como cargar una extensión DevTools

Este documento describe el proceso cargar manualmente una extensión. Puedes probar también [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), una herramienta de terceros que se baja las extensiones directamente de la WebStore de Chrome.

Para cargar una extensión en electron, necesitas descargarla en el navegador Chrome, encontrar su ruta en el sistema de archivos y a continuación cargarla llamando la API `BrowserWindow.addDevToolsExtension(extension)`.

Usando [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) como ejemplo:

1. Instalarlo en el navegador Chrome.
2. Acceder a `chrome://extensions`, e identificar el ID de la extensión, que es una cadena de texto como `fmkadmapgofadopljbjfkapdkoienihi`.
3. Encontrar su ruta en el sistema de archivos donde Chrome almacena las extensiones: 
    * en Windows es `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    * en Linux pueden ser: 
        * `~/.config/google-chrome/Default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/`
        * `~/.config/chromium/Default/Extensions/`
    * en macOS es `~/Library/Application Support/Google/Chrome/Default/Extensions`.
4. Indicar la ruta de la extensión a la API `BrowserWindow.addDevToolsExtension`, para React Developer Tools, es algo como: `~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**Nota:** La API `BrowserWindow.addDevToolsExtension` no puede ser llamada antes de que el módulo app emita el evento ready.

El nombre de la extensión es devuelta por `BrowserWindow.addDevToolsExtension`, y puedes trasladar el nombre de la extensión a la API `BrowserWindow.removeDevToolsExtension` para removerla.

## Extensiones DevTools soportadas

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