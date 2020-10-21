# Extensão de DevTools

O Electron suporta a [Extensão Chrome DevTools](https://developer.chrome.com/extensions/devtools), que pode ser usada para ampliar a capacidade de devtools para depurar frameworks populares.

## Como carregar uma extensão do DevTools

Este documento descreve o processo de carregamento manual de uma extensão. Você também pode tentar [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), uma ferramenta de terceiros que baixa extensões diretamente da Chrome WebStore.

Para carregar uma extensão no Electron, você precisa baixá-la no navegador Chrome, localize seu caminho do sistema de arquivos e então carregue-o chamando o `BrowserWindow. API ddDevToolsExtension(extensão)`.

Usando as [Ferramentas de Desenvolvedor de React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) como exemplo:

1. Instalá-lo no navegador Chrome.
1. Navegue até `chrome://extensions`e encontre sua extensão ID, que é uma hash string como `fmkadmapgofadopljbjfkapdkoienihi`.
1. Descubra a localização do sistema de arquivos usado pelo Chrome para armazenar extensões:
   * no Windows, é `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * no Linux, pode ser:
     * `~/.config/google-chrome/Padrão/Extensões/`
     * `~/.config/google-chrome-beta/Default/Extensões/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Padrão/Extensões/`
   * no macOS, ele é `~/Library/Application Support/Google/Chrome/Default/Extensions`.
1. Passe o local da extensão para `BrowserWindow.addDevToolsExtension` API, para as Ferramentas de Desenvolvedor do React, é algo como:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbkapdkoienihi/4.3.0_0')
)
   ```

**Nota:** O `BrowserWindow.addDevToolsExtension` API não pode ser chamado antes do evento pronto do módulo de aplicativo ser emitido.

A extensão será lembrada então você só precisa chamar essa API uma vez por extensão. Se você tentar adicionar uma extensão que já foi carregada, este método não retornará e, em vez disso, registrará um alerta para o console.

### Como remover uma extensão do DevTools

Você pode passar o nome da extensão para `BrowserWindow.removeDevToolsExtensões` para removê-la. O nome da extensão é retornado pelo `BrowserWindow. Extensão ddDevTools` e você pode obter nomes de todas as Extensões DevTools instaladas usando a API `BrowserWindow.getDevToolsExtensions`.

## Extensões DevTools Suportadas

O Electron suporta apenas um conjunto limitado de `chrome.*` APIs, então algumas extensões usando o Chrome `não suportado.` APIs para extensões do Chrome podem não funcionar. As seguintes extensões Devtools são testadas e garantidas para funcionar no Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [Ferramentas de Desenvolvedor React](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Depurador de Backbone](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [Depurador do jQuery](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Depurador Cerebral](https://cerebraljs.com/docs/introduction/devtools.html)
* [Extensão Redux do DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [Ferramentas do Desenvolvedor MobX](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### O que devo fazer se uma extensão DevTools não estiver funcionando?

Primeiro, por favor, certifique-se de que a extensão ainda está sendo mantida, algumas extensões não funcionam para versões mais recentes do navegador Chrome, e não podemos fazer nada por elas.

Em seguida, registre um bug na lista de problemas do Electron, e descreva qual parte da extensão não está funcionando como esperado.
