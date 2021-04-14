# Extensão de DevTools

A Electron suporta [extensões do Chrome DevTools][devtools-extension], que podem ser usadas para estender a capacidade das ferramentas de desenvolvedor do Chrome para depuração estruturas da Web populares.

## Carregando uma extensão DevTools com ferramentas

A maneira mais fácil de carregar uma extensão do DevTools é usar ferramentas de terceiros para automatizar o processo de para você. [][electron-devtools-installer] instalador de  de devtools eletrônicos é um pacote de NPM popular que faz exatamente isso.

## Carregando manualmente uma extensão DevTools

Se você não quiser usar a abordagem de ferramenta, você também pode fazer todas as operações de necessárias manualmente. Para carregar uma extensão no Electron, você precisa baixá-la via Chrome, localizar seu caminho do sistema de arquivos e, em seguida, carregá-lo em sua</a> de sessão

, chamando a API [`ses.loadExtension`].</p> 

Usar as ferramentas de desenvolvedor [React][react-devtools] como exemplo:

1. Instale a extensão no Google Chrome.
1. Navegue até `chrome://extensions`e encontre sua extensão ID, que é uma hash string como `fmkadmapgofadopljbjfkapdkoienihi`.

1. Descubra o local do sistema de arquivos usado pelo Chrome para armazenar extensões:
   
      * no Windows, é `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * no Linux, pode ser: 
          * `~/.config/google-chrome/Padrão/Extensões/`
     * `~/.config/google-chrome-beta/Default/Extensões/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Padrão/Extensões/`
   * no macOS, ele é `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Passe a localização da extensão para a API [`ses.loadExtension`][load-extension] . Para react developer tools `v4.9.0`, parece algo como: 
   

   ```javascript
    const { app, session } = require ('electron')
    caminho const = require('path')
    const os = require('os')

    // on macOS
    const reactDevToolsPath = path.join(
      os.homedir(),
      '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadoplofjbjfkapdkoienihi/4.9.0_0'
    )

    app.whenReady().then(async () => {
      aguardam session.defaultSession.loadExtension(reactDevToolsPath)
    })
   ```


**Notas:**

* `loadExtension` retorna uma Promessa com um objeto [Extensão][extension-structure], que contém metadados sobre a extensão que foi carregada. Essa promessa precisa resolver (por exemplo, com uma expressão `await` ) antes de carregar uma página. Caso contrário, a extensão não será garantida para carregar.

* `loadExtension` não pode ser chamado antes do `ready` evento do módulo `app` é emitido, nem pode ser chamado em sessões na memória (não persistente).

* `loadExtension` deve ser chamado em cada inicialização do seu aplicativo se você quiser que a extensão seja carregada.



### Removendo uma extensão do DevTools

Você pode passar o ID da extensão para a API [`ses.removeExtension`][remove-extension] para removê-la da sessão. As extensões carregadas não são persistência entre lançamentos de aplicativos.



## Suporte de extensão da DevTools

O elétron só suporta [um conjunto limitado de apis `chrome.*`][supported-extension-apis], para que extensões usando APIs `chrome.*` sem suporte sob o capô possam não funcionar.

As seguintes extensões de Devtools foram testadas para funcionar em Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Ferramentas de Desenvolvedor React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Depurador de Backbone](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [Depurador do jQuery](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Depurador Cerebral](https://cerebraljs.com/docs/introduction/devtools.html)
* [Extensão Redux do DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Ferramentas do Desenvolvedor MobX](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)



### O que devo fazer se uma extensão da DevTools não estiver funcionando?

Primeiro, certifique-se de que a extensão ainda está sendo mantida e é compatível com a versão mais recente do Google Chrome. Não podemos fornecer suporte adicional para extensões sem suporte.

Se a extensão funcionar no Chrome, mas não no Electron, arquive um bug no rastreador de problemas [da Electron][issue-tracker] e descreva qual parte da extensão não está funcionando como esperado.

[devtools-extension]: https://developer.chrome.com/extensions/devtools
[react-devtools]: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi
[load-extension]: ../api/session.md#sesloadextensionpath-options
[extension-structure]: ../api/structures/extension.md
[remove-extension]: ../api/session.md#sesremoveextensionextensionid
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[electron-devtools-installer]: https://github.com/MarshallOfSound/electron-devtools-installer
[supported-extension-apis]: ../api/extensions.md
[issue-tracker]: https://github.com/electron/electron/issues
