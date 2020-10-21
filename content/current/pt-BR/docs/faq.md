# Perguntas Frequentes no Electron

## Por que estou tendo problemas para instalar o Electron?

Ao executar o `npm install electron`, alguns usuários encontram erros de instalação.

Em quase todos os casos, esses problemas são resultado de problemas de rede e não de problemas reais com o pacote npm `electron`. Erros como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, e `ETIMEDOUT` são resultados da falta de internet. A melhor solução é tentar trocar de rede, ou aguardar um pouco e tentar instalar novamente.

Se a instalação via `npm` falhar, você também pode tentar baixar o Electron diretamente do código fonte em [electron/electron/releases](https://github.com/electron/electron/releases).

## Quando o Electron será atualizado para a versão mais recente do Chrome?

A versão do Chrome usada no Electron é geralmente disponibilizada dentro de uma ou duas semanas depois que uma versão estável do Chrome é liberada. Esta estimativa não é garantida, depende da quantidade de trabalho envolvido na atualização.

Somente a versão estável do Chrome é usada. Se uma correção importante estiver em um canal beta ou de desenvolvimento , retornaremos a porta.

Para mais informações, consulte a [introdução de segurança](tutorial/security.md).

## Quando o Electron será atualizado para a versão mais recente do Node.js?

Quando uma nova versão do Node.js é lançada, geralmente esperamos por cerca de um mês antes de atualizar a do Electron. Assim, podemos evitar sermos afetados por erros introduzidos na nova versão do Node.js, o que acontece muito frequentemente.

Novos recursos do Node.js geralmente são trazidos por atualização da V8, desde que o Electron usa o V8 enviado pelo navegador Chrome. Os novos recursos brilhante do JavaScript de uma nova versão Node.js esta geralmente no Electron.

## Como compartilhar dados entre página da web?

Para compartilhar dados entre páginas web (os processos de renderização) a maneira mais simples é usar as APIs do HTML5 que já estão disponíveis nos navegadores. Bons candidatos são [Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), [`localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`sessionStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) e [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API).

Como alternativa, você pode usar os primitivos IPC que são fornecidos pelo Electron. Para compartilhar dados entre os processos principal e de renderização, você pode usar os módulos [`ipcMain`](api/ipc-main.md) e [`ipcRenderer`](api/ipc-renderer.md). Para comunicar diretamente entre páginas da web, você pode enviar uma [`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) de uma para a outra possivelmente através do processo principal usando [`ipcRenderer. ostMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). A comunicação subsequente sobre as portas da mensagem é direta e não destaca o processo principal.

## A minha bandeja de aplicativo desapareceu depois de alguns minutos.

Isto acontece quando a variável que é usada para armazenar a bandeja é coletada pelo garbage collector.

Se você encontrar esse problema, esses artigos podem ser úteis:

* [Gerenciamento de Memória](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [Escopo de Variável](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

Se você quer uma solução rápida, você pode fazer as variáveis globais, alterando seu código:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() =>{
 const tray = new Tray('/path/to/icon.png')
 tray.setTitle('hello world')
})
```

para isto:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## Eu não posso usar jQuery/RequireJS/Meteor/AngularJS em Electron.

Devido à integração de Node.js do Electron, existem alguns símbolos extras inseridos o DOM como `module`, `exports` e `require`. Isso causa problemas por causa de algumas bibliotecas que querem inserir os símbolos com os mesmos nomes.

Para resolver isso, você pode desativar a integração com node no Electron:

```javascript
// No processo main.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
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

Quando usar o módulo built-in do Electron você pode encontrar um erro como este:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

É bem provável que você esteja utilizando o módulo no processo errado. Por exemplo, `electron.app` pode apenas ser usado pelo processo principal, enquanto `electron.webFrame` está apenas disponível no processo de renderização.

## A fonte parece borrada, o que é isso e o que eu posso fazer?

Se [a anti-aliasing de sub-pixel](http://alienryderflex.com/sub_pixel/) estiver desativada, então as fontes nas telas LCD podem parecer borradas. Exemplo:

![Exemplo de renderização do subpixel](images/subpixel-rendering-screenshot.gif)

A anti-aliasing de sub-pixel precisa de um fundo não transparente na camada que contem os glyphs de texto. (Veja [esta publicação](https://github.com/electron/electron/issues/6344#issuecomment-420371918) para mais informações).

Para alcançar este objetivo, defina o plano de fundo do construtor para [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

O efeito é visível apenas em (algumas?) telas LCD. Mesmo se você não ver uma diferença, alguns de seus usuários podem fazê-lo. É melhor definir sempre os antecedentes desta forma, a menos que tenham razões para não o fazer.

Aviso que apenas definir o background no CSS não tem o mesmo efeito desejado.
