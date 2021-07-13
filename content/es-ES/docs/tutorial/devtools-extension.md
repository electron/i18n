# Extensión de Chrome DevTools

Electron soporta [Chrome DevTools extensions][devtools-extension], el cual puede ser usado para extender la habilidad de las herramientas de desarrollo de Chrome para depurar web frameworks populares.

## Cargando una extensión DevTools con herramientas

La forma más fácil de cargar una extensión DevTools es utilizar herramientas de terceros para automatizar el proceso por usted. [electron-devtools-installer][electron-devtools-installer] es un popular paquete NPM que hace justamente eso.

## Cargando una extensión DevTools manualmente

Si no quiere usar el enfoque de herramientas, también puede hacer todas las operaciones necesarias a mano. Para cargar una extensión en Electron, necesitas descargarlo a través Chrome, localiza la ruta de su sistema de archivo y luego cárgalo dentro de tu [Session][session] llamando a la API [`ses.loadExtension`].

Usando el [React Developer Tools][react-devtools] como un ejemplo:

1. Instala la extensión en Google Chrome.
1. Acceder a `chrome://extensions`, e identificar el ID de la extensión, que es una cadena de texto como `fmkadmapgofadopljbjfkapdkoienihi`.
1. Encuentra la ubicación del sistema de archivo usado por Chrome para alamacenar las extensiones:
   * en Windows es `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * en Linux pueden ser:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * en macOS es `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Pasa la ubicación de la extensión a la API [`ses.loadExtension`][load-extension]. Para React Developer Tools `v4.9.0`, se ve algo como:

   ```javascript
    const { app, session } = require('electron')
    const path = require('path')
    const os = require('os')

    // on macOS
    const reactDevToolsPath = path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.9.0_0'
    )

    app.whenReady().then(async () => {
      await session.defaultSession.loadExtension(reactDevToolsPath)
    })
   ```

**Notas:**

* `loadExtension` devuelve una Promise con un [Extension object][extension-structure], que contiene metadatos sobre la extensión que fue cargada. Esta promise necesita resolver (p. ej. con una expresión `await`) antes de cargar una página. De lo contrario, no estará garantizada la carga de la extensión.
* `loadExtension` no puede ser llamada antes de que el evento `ready` del módulo `app`sea emitido, ni puede ser llamado en sesiones en memoria (no persistente).
* `loadExtension` debe ser llamado en cada arranque de tu aplicación si quieres que la extensión sea cargada.

### Eliminando una extensión DevTools

Puedes pasar la ID de la extensión a la API [`ses.removeExtension`][remove-extension] para eliminarla de tu Session. Las extensiones cargadas no son persistidas entre los lanzamientos de la aplicación.

## Soporte de extensión DevTools

Electron sólo soporta [un limitado conjunto de APIs de `chrome.*`][supported-extension-apis], así que las extensiones usando APIs de `chrome.*` no soportadas bajo el capo puede que no funcione.

Las siguientes extensiones Devtools han siso probadas para funcionar en Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### ¿Qué debería hacer si una extensión DevTools no está funcionando?

Primero, por favor asegúrese que la extensión todavía sigue siendo mantenida y es compatible con la última versión de Google Chrome. No podemos proveer soporte adicional para extensiones no soportadas.

Si la extensión funciona en Chrome pero no en Electron, registra el error en el [issue tracker][issue-tracker] de Electron y describe que parte de la extensión no esta funcionando como se espera.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[session]: ../api/session.md
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[load-extension]: ../api/session.md#sesloadextensionpath-options
[extension-structure]: ../api/structures/extension.md
[remove-extension]: ../api/session.md#sesremoveextensionextensionid
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[supported-extension-apis]: ../api/extensions.md
[issue-tracker]: https://github.com/electron/electron/issues
