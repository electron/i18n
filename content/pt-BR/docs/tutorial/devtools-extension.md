# Extensão de DevTools

A Electron suporta [extensões do Chrome DevTools][devtools-extension], que podem ser usadas para estender a capacidade das ferramentas de desenvolvedor do Chrome para depuração estruturas da Web populares.

## Carregando uma extensão DevTools com ferramentas

A maneira mais fácil de carregar uma extensão do DevTools é usar ferramentas de terceiros para automatizar o processo de para você. [][electron-devtools-installer] instalador de  de devtools eletrônicos é um pacote de NPM popular que faz exatamente isso.

## Carregando manualmente uma extensão DevTools

Se você não quiser usar a abordagem de ferramenta, você também pode fazer todas as operações de necessárias manualmente. Para carregar uma extensão no Electron, você precisa baixá-la via Chrome, localizar seu caminho do sistema de arquivos e, em seguida, carregá-lo em sua</a> de sessão

, chamando a API [`ses.loadExtension`].</p> 

Using the [React Developer Tools][react-devtools] as an example:

1. Install the extension in Google Chrome.
1. Navegue até `chrome://extensions`e encontre sua extensão ID, que é uma hash string como `fmkadmapgofadopljbjfkapdkoienihi`.

1. Find out the filesystem location used by Chrome for storing extensions:
   
      * no Windows, é `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * no Linux, pode ser: 
          * `~/.config/google-chrome/Padrão/Extensões/`
     * `~/.config/google-chrome-beta/Default/Extensões/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Padrão/Extensões/`
   * no macOS, ele é `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Pass the location of the extension to the [`ses.loadExtension`][load-extension] API. For React Developer Tools `v4.9.0`, it looks something like: 
   

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

* `loadExtension` returns a Promise with an [Extension object][extension-structure], which contains metadata about the extension that was loaded. This promise needs to resolve (e.g. with an `await` expression) before loading a page. Otherwise, the extension won't be guaranteed to load.

* `loadExtension` cannot be called before the `ready` event of the `app` module is emitted, nor can it be called on in-memory (non-persistent) sessions.

* `loadExtension` must be called on every boot of your app if you want the extension to be loaded.



### Removing a DevTools extension

You can pass the extension's ID to the [`ses.removeExtension`][remove-extension] API to remove it from your Session. Loaded extensions are not persisted between app launches.



## DevTools extension support

Electron only supports [a limited set of `chrome.*` APIs][supported-extension-apis], so extensions using unsupported `chrome.*` APIs under the hood may not work.

The following Devtools extensions have been tested to work in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Ferramentas de Desenvolvedor React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Depurador de Backbone](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [Depurador do jQuery](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Depurador Cerebral](https://cerebraljs.com/docs/introduction/devtools.html)
* [Extensão Redux do DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Ferramentas do Desenvolvedor MobX](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)



### What should I do if a DevTools extension is not working?

First, please make sure the extension is still being maintained and is compatible with the latest version of Google Chrome. We cannot provide additional support for unsupported extensions.

If the extension works on Chrome but not on Electron, file a bug in Electron's [issue tracker][issue-tracker] and describe which part of the extension is not working as expected.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[load-extension]: ../api/session.md#sesloadextensionpath-options
[extension-structure]: ../api/structures/extension.md
[remove-extension]: ../api/session.md#sesremoveextensionextensionid
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[supported-extension-apis]: ../api/extensions.md
[issue-tracker]: https://github.com/electron/electron/issues
