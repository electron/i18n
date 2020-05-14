# Extensión de Chrome DevTools

Electron soporta [Extensiones de Chrome DevTools](https://developer.chrome.com/extensions/devtools), que puede ser usadas para extender la capacidad de devtools para depurar web frameworks populares.

## Como cargar una extensión DevTools

Este documento describe el proceso cargar manualmente una extensión. Puedes probar también [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), una herramienta de terceros que se baja las extensiones directamente de la WebStore de Chrome.

Para cargar una extensión en electron, necesitas descargarla en el navegador Chrome, encontrar su ruta en el sistema de archivos y a continuación cargarla llamando la API `BrowserWindow.addDevToolsExtension(extension)`.

Usando [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) como ejemplo:

1. Instalarlo en el navegador Chrome.
1. Acceder a `chrome://extensions`, e identificar el ID de la extensión, que es una cadena de texto como `fmkadmapgofadopljbjfkapdkoienihi`.
1. Encontrar su ruta en el sistema de archivos donde Chrome almacena las extensiones:
   * en Windows es `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * en Linux pueden ser:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * en macOS es `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
   )
   ```

**Nota:** La API `BrowserWindow.addDevToolsExtension` no puede ser llamada antes de que el módulo app emita el evento ready.

La extensión será recordada, por lo tanto sólo necesitará llamar a la API una única vez. Si intentas agregar una extensión que ya ha sido cargada, este metodo no retornara nada y en su lugar aparecerá una advertencia en la consola.

### Cómo eliminar una extensión DevTools

Puede pasar el nombre de la extensión a la API `BrowserWindow.removeDevToolsExtension` para eliminarla. El nombre de la extensión es retornada por `BrowserWindow.addDevToolsExtension` y puedes obtener el nombre de todas las extensiones instaladas usando la API `BrowserWindow.getDeveToolsExtensions`.

## Extensiones DevTools soportadas

Electron solo soporta un conjunto limitado de APIs `chrome.*`, por lo que algunas extensiones usando APIs `chrome.*` no soportadas pueden que no funcionen. Las extensiones Devtools siguientes están testadas y garantizadas que funcionan en Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### ¿Que puedo hacer si una extensión DevTools no está funcionando?

Lo primero, por favor, asegúrese que la extensión aún está mantenida, algunas extensiones incluso no pueden funcionar en versiones recientes del navegador Chrome, y no podemos hace nada por remediarlo.

Entonces, informe del problema en la lista de problemas de Electron, y describa que parte de la extensión no esta funcionando.
