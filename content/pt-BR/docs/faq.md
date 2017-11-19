# Electron FAQ

## Por que estou tendo problemas para instalar o Electron?

Ao executar o `npm install electron`, alguns usuários encontram erros de instalação.

Geralmente esses erros são resultados de problemas com a falta de conexão de internet e não é relacionado ao pacote npm do `Electron`. Erros como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, e `ETIMEDOUT` são resultados da falta de internet. A melhor solução é tenta troca de rede, ou esperar um pouco e tenta instalar novamente o pacote.

Você também pode tentar baixa o Electron diretamente do [electron/electron/releases](https://github.com/electron/electron/releases). se a instalação via `npm` falha.

## Quando o Electron será atualizado para a versão mais recente do Chrome?

A versão do Chrome usada no Electron é geralmente disponibilizada dentro de uma ou duas semanas depois que uma versão estável do Chrome é liberada. Esta estimativa não é garantida, depende da quantidade de trabalho envolvido na atualização.

Apenas a versão estável do Chrome é usado. Se uma correção importante estiver disponível na versão Beta ou Dev, vamos portá-la.

Para mais informações, consulte a [introdução de segurança](tutorial/security.md).

## Quando o Electron será atualizado para a versão mais recente do Node.js?

Quando uma nova versão do Node.js é lançada, geralmente esperamos por cerca de um mês antes de atualizar a do Electron. Assim, podemos evitar sermos afetados por erros introduzidos na nova versão do Node.js, o que acontece muito frequentemente.

Novos recursos do Node.js geralmente são trazidos por atualização da V8, desde que o Electron usa o V8 enviado pelo navegador Chrome. Os novos recursos brilhante do JavaScript de uma nova versão Node.js esta geralmente no Electron.

## Como compartilhar dados entre página da web?

Para compartilhar dados entre páginas web (os processos de renderização) a maneira mais simples é usar as APIs do HTML5 que já estão disponíveis nos navegadores. Bons candidatos são [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) e [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Ou você pode usar o sistema IPC, que é específico para o Electron, para armazenar objetos no processo principal como uma variável global e depois acessar os representantes através da propriedade `remote` do módulo do `electron`:

```javascript
// No processo principal.
global.sharedObject = {
  someProperty: 'default value'
}
```

```javascript
// Na página 1.
require('electron').remote.getGlobal('sharedObject').someProperty = 'new value'
```

```javascript
// Na página 2.
console.log(require('electron').remote.getGlobal('sharedObject').someProperty)
```

## Janela do meu app desapareceu depois de alguns minutos.

Isto acontece quando a variável que é usada para armazenar a janela fica com resto coletado.

Se você encontrar esse problema, veja os artigos útil:

* [Gerenciamento de Memória](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Escopo de variável](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Se você quer uma solução rápida, você pode fazer as variáveis globais, alterando seu código:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

para isto:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Eu não posso usar jQuery/RequireJS/Meteor/AngularJS em Electron.

Devido à integração de Node. js do Electron, existem alguns símbolos extras inseridos o DOM como `module`, `exports`, `require`. Isso causa problemas por causa de algumas bibliotecas que querem inserir os símbolos com os mesmos nomes.

Para resolver isso, você pode desativar a integração com node no Electron:

```javascript
// No processo principal
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

Mas se você quer manter as habilidades de usar Node.JS e Electron APIs, você tem que renomear os símbolos na página, antes de incluir outras bibliotecas:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` é indefinido.

When using Electron's built-in module you might encounter an error like this:

    > require('electron').webFrame.setZoomFactor(1.0)
    Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
    

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

    "/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
    

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```bash
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.