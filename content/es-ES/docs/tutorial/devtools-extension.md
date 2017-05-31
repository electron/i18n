# DevTools extensión

Electrónica compatible con la [Chrome DevTools Extension](https://developer.chrome.com/extensions/devtools), que puede utilizarse para ampliar la capacidad de devtools para la depuración de frameworks web popular.

## Cómo cargar una DevTools extensión

Este documento describe el proceso para cargar manualmente la extensión. También puede tratar devtools-[electron-installer](https://github.com/GPMDP/electron-devtools-installer), una herramienta de terceros que descarga extensiones directamente desde la Chrome WebStore.

Para cargar una extensión en electrón, necesita descargar en navegador Chrome, localizar su ruta de sistema de archivos y luego cargar llamando la</code> API de`BrowserWindow.addDevToolsExtension (extensión).</p>

<p>Usando el Tools</a> de desarrollador de <a href="https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi">React como ejemplo:</p>

<ol>
<li>Instalar en el navegador Chrome.</li>
<li>Vaya a <code> chrome://extensions` y encontrar su ID de la extensión, que es una cadena de hash como `fmkadmapgofadopljbjfkapdkoienihi`.</li> 

* Averiguar ubicación de sistema de archivos utilizado por cromo para almacenar las extensiones: 
    * en Windows es `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    * en Linux puede ser: 
        * `~/.config/Google-Chrome/default/Extensions/`
        * `~/.config/Google-Chrome-Beta/default/Extensions/`
        * `~/.config/Google-Chrome-Canary/default/Extensions/`
        * `~/.config/Chromium/default/Extensions/`
    * macOS es ` ~ / Library/Application apoyo/Google/Chrome/Default/Extensions`.
* Pasar la ubicación de la extensión a `BrowserWindow.addDevToolsExtension` API, para las herramientas de desarrollador de reaccionar, es algo así como: ` ~ / Library/Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0` aplicación</ol> 

**Note:** la `BrowserWindow.addDevToolsExtension` API no se puede llamar antes del evento ready del módulo de la aplicación se emite.

`BrowserWindow.addDevToolsExtension` devuelve el nombre de la extensión, y puede pasar el nombre de la extensión de la `BrowserWindow.removeDevToolsExtension` API para descargarlo.

## Extensiones compatibles DevTools

Electrón sólo admite un conjunto limitado de `chrome.*` APIs, para que no funcionen algunas extensiones con `chrome.*` sin soporte API para características de la extensión de chrome. Siguientes Devtools extensiones son probadas y garantizadas para trabajar en electrónica:

* [Inspector de Ember](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Herramientas para desarrolladores de reaccionar](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Depurador de la columna vertebral](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery depurador](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [Batman AngularJS](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Depurador de cerebral](http://www.cerebraljs.com/documentation/the_debugger)
* [Extensión de DevTools Redux](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)

### ¿Qué debo hacer si no funciona una DevTools extensión?

Primero por favor asegúrese de que la extensión se se mantiene, algunas extensiones no pueden trabajar incluso para las versiones recientes de navegador Chrome, y no somos capaces de hacer cualquier cosa por ellos.

Entonces un error de archivo en la lista de problemas del electrón y describir que parte de la extensión no funciona como se esperaba.