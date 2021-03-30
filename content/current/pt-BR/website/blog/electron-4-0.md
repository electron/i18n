---
title: Electron 4.0.0
author: BinaryMuse
date: '2018-12-20'
---

A equipe do Electron está animada em anunciar que a versão estável do Electron 4 está disponível! É possível instalá-lo a partir do [electronjs.org](https://electronjs.org/) ou do npm via `npm install electron@latest`. A versão está cheia de atualizações, correções e novos recursos, e mal podemos esperar para ver o que você constrói com elas. Leia mais detalhes sobre esta versão, e por favor compartilhe qualquer comentário que você tenha como explorar!

---

## Quais as novidades?

Uma grande parte das funcionalidades do Electron é fornecida pelo Chromium, Node.js e V8, os componentes principais que compõem o Electron. Como tal, um objetivo fundamental para a equipe do Electron é acompanhar as mudanças desses projetos o mais possível fornecendo aos desenvolvedores que criam aplicativos Electron acesso a novos recursos de web e JavaScript. Para esse fim, o Electron 4 apresenta explosões de versão principal para cada um desses componentes; o Electron v4.0.0 inclui o Chromium `69. .3497.106`, Node `10.11.0`, e V8 `6.9.427.24`.

Além disso, o Electron 4 inclui alterações nas APIs específicas da Electron. Você pode encontrar um resumo das principais mudanças no Electron 4 abaixo; para a lista completa das alterações, confira o [Electron v4. .0 notas de lançamento](https://github.com/electron/electron/releases/tag/v4.0.0).

### Desativando o módulo</code> remoto `</h3>

<p spaces-before="0">Agora você tem a habilidade de desativar o módulo remoto <code>` por razões de segurança. O módulo pode ser desativado para `BrowserWindow`s e tags `webview`:</p>

```javascript
// BrowserWindow
new BrowserWindow({
  webPreferences: {
    enableRemoteModule: false
  }
})

// webview tag
<webview src="http://www.google.com/" enableremotemodule="false"></webview>
```

Consulte a documentação [BrowserWindow](https://electronjs.org/docs/api/browser-window) e [`<webview>` Tag](https://electronjs.org/docs/api/webview-tag) para obter mais informações.

### Filtrando `remote.require()` / `remote.getGlobal()` Solicitações

Esse recurso é útil se você não quer desativar completamente o módulo</code> remoto `no seu processo de renderização ou <code>webview` mas gostaria de controle adicional sobre quais módulos podem ser necessários via `controle remoto. equiparação`.

Quando um módulo é necessário através do comando `equipare` em um processo de renderização, um evento remoto `requer` é criado no [`módulo` app](https://electronjs.org/docs/api/app). Você pode chamar `event.preventDefault()` no evento (o primeiro argumento) para impedir que o módulo seja carregado. A [`instância` do WebContents](https://electronjs.org/docs/api/web-contents) onde ocorreu a exigência é passada como o segundo argumento, e o nome do módulo é passado como terceiro argumento. O mesmo evento também é emitido na instância `WebContents` , mas neste caso os únicos argumentos são o evento e o nome do módulo. Em ambos os casos, você pode retornar um valor personalizado definindo o valor de `event.returnValue`.

```javascript
// Controle `remote.require` de todos os WebContents:
app.on('remote-require', function (event, webContents, requestedModuleName) {
  // ...
})

// Controle `remote.require` de uma instância específica do WebContents:
browserWin.webContents.on('remote-require', function (event, requestedModuleName) {
  // ...
})
```

De forma similar, quando o evento `remote.getGlobal(name)` é chamado, um evento `remote-get-global` é gerado. Isso funciona da mesma forma que o evento `remoto-requer` : chame `preventDefault()` para evitar que o global seja retornado, e defina o evento `. valor eturn` para retornar um valor personalizado.

```javascript
// Controle `remote.getGlobal` de todos os WebContents:
app.on('remote-get-global', function (event, webContents, requrestedGlobalName) {
  // ...
})

// Controle `remote.getGlobal` de uma instância específica de WebContents :
browserWin.webContents.on('remote-get-global', function (event, requestedGlobalName) {
  // ...
})
```

Para obter mais informações, consulte a seguinte documentação:

* [`remoto.necessário`](https://electronjs.org/docs/api/remote#remoterequiremodule)
* [`remote.getGlobal`](https://electronjs.org/docs/api/remote#remotegetglobalname)
* [`app`](https://electronjs.org/docs/api/app)
* [`WebConteúdos`](https://electronjs.org/docs/api/web-contents)

### Acesso JavaScript ao Painel Sobre

No macOS, agora você pode chamar o aplicativo `. howAboutPanel()` para mostrar programaticamente o painel Sobre , como clicar no item de menu criado via `{role: 'about'}`. Veja o [`showAboutPanel` documentação](https://electronjs.org/docs/api/app?query=show#appshowaboutpanel-macos) para obter mais informações

### Controlando `WebContents` Limite do Fundo

`instâncias do WebContents` agora têm um método `setBackgroundThrottling(permitido)` para ativar ou desativar a redução de temporizadores e animações quando a página está com back-ground.

```javascript
let win = novo BrowserWindow(...)
win.webContents.setBackgroundThrottling (habilitarBackgroundThrottling)
```

Consulte [a `setBackgroundThrottling` documentação](https://electronjs.org/docs/api/web-contents#contentssetbackgroundthrottlingallowed) para obter mais informações.

## Breaking Changes

### Não há mais suporte para macOS 10.9

Chromium não suporta mais o macOS 10.9 (OS X Mavericks), e como resultado [Electron 4.0 e além disso não suporta nem o](https://github.com/electron/electron/pull/15357).

### Bloqueio da Instância Única

Anteriormente, para fazer do seu app um Único Aplicativo de Instância (garantindo que apenas uma instância do seu aplicativo seja executada a qualquer momento), você pode usar o aplicativo `. método akeSingleInstance()`. Começando no Electron 4.0, você deve usar `app.requestSingleInstanceLock()`. O valor de retorno deste método indica se essa instância da sua aplicação obteve com sucesso o bloqueio. Se não conseguir obter o bloqueio, você pode assumir que outra instância do seu aplicativo já está rodando com o bloqueio e saída imediatamente.

Por exemplo de usar `requestSingleInstanceLock()` e informações sobre comportamento diferenciado em várias plataformas, [veja a documentação do aplicativo `. equestSingleInstanceLock()` e métodos relacionados](https://electronjs.org/docs/api/app#apprequestsingleinstancelock) e [o `segundo evento`](https://electronjs.org/docs/api/app#event-second-instance).

### `win_delay_load_hook`

Ao construir módulos nativos para janelas, a variável `win_delay_load_hook` no módulo `binding.gyp` deve ser verdadeira (que é o padrão). Se este hook não estiver presente, então o módulo nativo falhará em carregar no Windows com uma mensagem de erro como `Não foi possível encontrar o módulo`. [Veja o guia de módulos nativos](https://electronjs.org/docs/tutorial/using-native-node-modules#a-note-about-win_delay_load_hook) para mais informações.

## Depreciações

As seguintes alterações de quebra estão planejadas para Electron 5.0, portanto estão obsoletas no Electron 4.0.

### Integração de Node.js Desativada para `nativeWindowOpen`-ed Windows

Começando no Electron 5.0, janelas filhas abertas com a opção `nativeWindowOpen` sempre terá a integração do Node.js desativada.

### `webPreferences` Valores Padrão

Ao criar um novo `BrowserWindow` com as opções `webPreferences` definidas, as seguintes opções de `webPreferences` padrões estão obsoletas em favor de novos padrões listados abaixo:

<div class="table table-ruled table-full-width">

UkProperty 「Property Padrão deploated ├New Default ├
├---------------------------------├
├`contextIsolation` ├`false` alone. `true` ek 'true` ，
├`nodeIntegration` ├`true` ├`false` ├
├`webviewTag` ede valor de `nodeIntegration` se definido, caso contrário, `true` econtra-se `false` ├

</div>

Observe: atualmente há [um bug conhecido (#9736)](https://github.com/electron/electron/issues/9736) que impede que a tag `webview` funcione se `contextIsolação` estiver ligada. Fique de olho no problema do GitHub para informações atualizadas!

Saiba mais sobre o isolamento de contexto, integração do Node e a tag `da webview` no [documento de segurança do Electron](https://electronjs.org/docs/tutorial/security).

Electron 4.0 ainda usará os padrões atuais, mas se você não passar um valor explícito para eles, verá um aviso de depreciação. Para preparar seu aplicativo para Electron 5.0, use valores explícitos para essas opções. [Veja a documentação da `janela de navegador`](https://electronjs.org/docs/api/browser-window#new-browserwindowoptions) para detalhes sobre cada uma dessas opções.

### `webContents.findInPage(texto[, opções])`

As opções `medialCapitalAsWordStart` e `wordStart` foram descontinuadas pois foram removidas a montante.

## Programa de Feedback de Aplicativos

O [Programa de Feedback de Aplicativos](https://electronjs.org/blog/app-feedback-program) que instituímos durante o desenvolvimento do Electron 3. foi bem sucedido, então continuamos durante o desenvolvimento de 4.0 também. Gostaríamos de estender um enorme agradecimento a Atlassian, Discord, MS Teams, OpenFin, Slack, Symphony, WhatsApp e os outros membros do programa para seu envolvimento durante o 4. ciclo beta. Para saber mais sobre o Programa de Feedback do App e para participar de apostas futuras, [confira nosso blog sobre o programa](https://electronjs.org/blog/app-feedback-program).

## Próximos passos

No curto prazo você pode esperar que a equipe continue focando em acompanhar o desenvolvimento dos principais componentes que compõem o Electron, incluindo Chromium, Node e V8. Embora tenhamos o cuidado de não fazer promessas sobre datas de lançamento, nosso plano é lançar novas versões principais do Electron com novas versões desses componentes aproximadamente trimestralmente. [Veja nosso documento de versão](https://electronjs.org/docs/tutorial/electron-versioning) para informações mais detalhadas sobre versão no Electron.

Para informações sobre mudanças planejadas em futuras versões do Electron, [veja nosso Documento de Interrupção Planejada (Alterações de Abertura)](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
