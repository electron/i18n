# Segurança, Capacidades Nativas e Suas Responsabilidades

Como desenvolvedores web, nós geralmente usufruímos da forte segurança de rede disponibilizada pelos navegadores - os riscos associados com códigos que escrevemos são relativamente baixos. Nossos sites tem poderes limitados em uma caixa de areia e confiamos que nossos usuários desfrutam de num navegador construído por uma grande equipe de engenheiros os quais são capazes de responder rapidamente às ameaças de segurança recém-descobertas.

Ao trabalhar com Electron, é importante entender que Electron não é um navegador web. Isto permite que você construa aplicações desktop ricas com tecnologias web familiar, mas seu código exerce um poder muito maior. JavaScript pode acessar o sistema de arquivos, o shell do usuário e muito mais. Isto permite que você crie aplicativos nativos de alta qualidade, mas os riscos de segurança inerentes escalam com os poderes adicionais concedidos ao seu código.

Com isso em mente, esteja ciente de que exibir conteúdo arbitrário de fontes não confiáveis representa um grave risco de segurança que o Electron não pretende manipular. Na verdade, os mais populares aplicativos do Electron (Atom, Slack, Visual Studio Code, etc) exibem principalmente conteúdo local (ou confiáveis, conteúdo remoto seguro, sem a integração com Node) - se sua aplicação executa código de uma fonte online, é sua responsabilidade que o código não seja malicioso.

## Reportando problemas de Segurança

Para obter informações sobre como divulgar adequadamente uma vulnerabilidade do Electron, consulte [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Upgrades e Problemas de Segurança do Chromium

O Electron se mantém atualizado com versões do Chromium alternativas. Para obter mais informações, consulte a postagem no blog de Cadência da [Electron Release](https://electronjs.org/blog/12-week-cadence).

## Segurança é responsabilidade de todos

É importante lembrar que a segurança de sua aplicação Electron é resultado da segurança geral da fundação de frame (*Chromium*, *nó. s*), Electron em si, todas as dependências NPM e seu código. Como tal, é sua responsabilidade seguir algumas boas práticas importantes:

* **Mantenha sua aplicação atualizada com a última versão do framework Electron.** Ao lançar seu produto, você também está enviando um pacote composto pelo Electron, Biblioteca Compartilhada do Chromium e Node.js. Vulnerabilidades afetando estes componentes podem afetar a segurança do seu aplicativo. Ao atualizar o Electron para a versão mais recente, você garante que as vulnerabilidades críticas (como *nodeIntegration bypasses*) já estão corrigidas e não podem ser exploradas em seu aplicativo. For more information, see "[Use a current version of Electron](#15-use-a-current-version-of-electron)".

* **Avalie suas dependências.** O NPM fornece meio milhão de pacotes reutilizáveis, mas é sua responsabilidade escolher bibliotecas de terceiros confiáveis. Se você usar bibliotecas desatualizadas afetadas por vulnerabilidades conhecidas ou se depender de código mal mantido, a segurança do aplicativo pode estar comprometida.

* **Adote práticas seguras de codificação.** A primeira linha de defesa para seu aplicativo é seu próprio código. vulnerabilidades comuns da web, tais como cross-Site Scripting (XSS), tem um maior impacto de segurança nos aplicativos Electron, portanto, é altamente recomendável adotar melhores práticas de desenvolvimento de software seguro e executar testes de segurança.

## Isolamento para conteúdo não confiável

Há um problema de segurança sempre que você receber código de uma fonte não confiável (por exemplo, um servidor remoto) e executá-lo localmente. As an example, consider a remote website being displayed inside a default [`BrowserWindow`][browser-window]. Se um invasor de alguma forma consegue mudar o conteúdo mencionado (ou atacando a fonte diretamente, ou sentado entre seu aplicativo e o destino atual), eles poderão executar o código nativo na máquina do usuário.

> :warning: Em nenhuma circunstância você deve carregar e executar o código remoto com a integração de Node.js habilitada. Em vez disso, use apenas arquivos locais (empacotado juntos com seu aplicativo) para executar o código do Node.js. To display remote content, use the [`<webview>`][webview-tag] tag or [`BrowserView`][browser-view], make sure to disable the `nodeIntegration` and enable `contextIsolation`.

## Aviso de Segurança do Electron

A partir do Electron 2.0, os desenvolvedores verão avisos e recomendações impressos no console do desenvolvedor. Eles só aparecem quando o nome do binário é Electron, indicando que um desenvolvedor está atualmente olhando para o console.

You can force-enable or force-disable these warnings by setting `ELECTRON_ENABLE_SECURITY_WARNINGS` or `ELECTRON_DISABLE_SECURITY_WARNINGS` on either `process.env` or the `window` object.

## Checklist: Recomendações de Segurança

Você deve pelo menos seguir estas etapas para melhorar a segurança do seu aplicativo:

1. [Apenas carregar conteúdo seguro](#1-only-load-secure-content)
2. [Desativar a integração do Node.js em todos os renderizadores que exibem conteúdo remoto](#2-do-not-enable-nodejs-integration-for-remote-content)
3. [Permitir isolamento contextual em todos os renderizadores que exibem conteúdo remoto](#3-enable-context-isolation-for-remote-content)
4. [Use `ses.setPermissionRequestHandler()` em todas as sessões que carregam conteúdo remoto](#4-handle-session-permission-requests-from-remote-content)
5. [Não desative o `webSecurity`](#5-do-not-disable-websecurity)
6. [Definir uma `Content-Security-Policy`](#6-define-a-content-security-policy) e usar regras restritivas (ou seja, `script-src 'self'`)
7. [Não defina `allowRunningInsecureContent` como `true`](#7-do-not-set-allowrunninginsecurecontent-to-true)
8. [Não ativar recursos experimentais](#8-do-not-enable-experimental-features)
9. [Não use `enableBlinkFuncs`](#9-do-not-use-enableblinkfeatures)
10. [`<webview>`: Não use `allowpopups`](#10-do-not-use-allowpopups)
11. [`<webview>`: Verifique as opções e parâmetros](#11-verify-webview-options-before-creation)
12. [Desativar ou limitar a navegação](#12-disable-or-limit-navigation)
13. [Desativar ou limitar a criação de novas janelas](#13-disable-or-limit-creation-of-new-windows)
14. [Não use `openExternal` com conteúdo não confiável](#14-do-not-use-openexternal-with-untrusted-content)
15. [Use a versão atual do Electron](#15-use-a-current-version-of-electron)

Para automatizar a detecção de configurações incorretas e padrões inseguros, é possível usar [eletronegatividade](https://github.com/doyensec/electronegativity). Para detalhes adicionais sobre potenciais fraquezas e bugs de implementação quando desenvolver aplicativos usando o Electron, consulte este [guia para desenvolvedores e auditores](https://doyensec.com/resources/us-17-Carettoni-Electronegativity-A-Study-Of-Electron-Security-wp.pdf)

## 1) Carregar apenas conteúdo seguro

Todos os recursos não incluídos com sua aplicação devem ser carregados usando um protocolo seguro como o `HTTPS`. Em outras palavras, não use protocolos inseguros como `HTTP`. Da mesma forma, recomendamos o uso de `WSS` sobre `WS`, `FTPS` sobre `FTP`, e assim por diante.

### Por que?

`HTTPS` apresenta três benefícios principais:

1) Ele autentica o servidor remoto, garantindo que seu aplicativo se conecte ao host correto em vez de um representante. 2) Garante a integridade dos dados, afirmando que os dados não foram modificados enquanto estiver no trânsito entre o seu aplicativo e o host. 3) Ele criptografa o tráfego entre o usuário e o host do destino, tornando mais difícil de espionar as informações enviadas entre o seu aplicativo e o host.

### Como?

```js
//
browserWindow.loadURL('http://example.com')

// Bom
browserWindow.loadURL('https://example.com')
```

```html
<!-- Mau -->
<script crossorigin src="http://example.com/react.js"></script>
<link rel="stylesheet" href="http://example.com/style.css">

<!-- Bom -->
<script crossorigin src="https://example.com/react.js"></script>
<link rel="stylesheet" href="https://example.com/style.css">
```

## 2) Não ativar a integração do Node.js para o Conteúdo Remoto

_Esta recomendação é o comportamento padrão no Electron desde a 5.0.0._

It is paramount that you do not enable Node.js integration in any renderer ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) that loads remote content. O objetivo é limitar as potencialidades que você concede ao conteúdo remoto Assim, tornando dramaticamente mais difícil para um atacante prejudicar seus usuários se eles ganharem a capacidade de executar JavaScript no seu site.

Depois disso, você pode conceder permissões adicionais para hosts específicos. Por exemplo, se você estiver abrindo um BrowserWindow apontado para `https://exemplo. om/`, você pode dar a esse site exatamente as habilidades de que ele precisa, mas não mais.

### Por que?

Um ataque cross-site-scripting (XSS) é mais perigoso se um invasor pode pular do processo de renderização e executar o código no computador do usuário. Ataques cruzados são bastante comuns - e enquanto uma questão, seu poder de normalmente se limita a enviar mensagens com o site no qual eles são executados. Desabilitar a integração do Node.js ajuda a impedir que um XSS seja escalonado em um chamado ataque "Execução de Código Remoto" (RCE).

### Como?

```js
// Ruim
const mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    nodeIntegrationInWorker: true
  }
})

mainWindow.loadURL('https://example.com')
```

```js
// Bom
const mainWindow = new BrowserWindow({
  webPreferences: {
    preload: path.join(app.getAppPath(), 'preload.js')
  }
})

mainWindow.loadURL('https://example.com')
```

```html
<!-- Mau -->
<webview nodeIntegration src="page.html"></webview>

<!-- Bom -->
<webview src="page.html"></webview>
```

Ao desativar a integração do Node.js, você ainda pode expor APIs ao seu site que consome módulos ou recursos do Node.js. Pré-carregar scripts continuam a ter acesso para `exigir` e outro nó. s recursos, permitindo que os desenvolvedores exponham uma API personalizada para um conteúdo carregado remotamente.

No exemplo a seguir de script de pré-carregamento, o site mais tarde carregado terá acesso a um método `window.readConfig()` , mas sem recursos de Node.js.

```js
const { readFileSync } = require('fs')

window.readConfig = function () {
  const data = readFileSync('./config.json')
  return data
}
```

## 3) Ativar o isolamento de contexto para conteúdo remoto

Isolamento de contexto é um recurso Electron que permite que desenvolvedores executem o código em scripts de pré-carregamento e APIs Electron em um contexto JavaScript dedicado. Na prática , isso significa que objetos globais como `Array.prototype. ush` ou `JSON.parse` não pode ser modificado por scripts em execução no processo de renderização.

Electron usa a mesma tecnologia dos [Scripts de conteúdo](https://developer.chrome.com/extensions/content_scripts#execution-environment)do Chromium para habilitar este comportamento.

Even when `nodeIntegration: false` is used, to truly enforce strong isolation and prevent the use of Node primitives `contextIsolation` **must** also be used.

### Porquê & Como?

Para obter mais informações sobre o que é `contextIsolação` e como ativá-lo, por favor consulte o nosso [Documento dedicado ao isolamento de contexto](context-isolation.md).

## 4) Manipular as solicitações de permissão de sessão de conteúdo remoto

Você pode ter visto solicitações de permissão ao usar o Chrome: elas aparecem sempre que o site tenta usar um recurso que o usuário tem que aprovar manualmente ( como notificações).

A API é baseada na [API de permissões do Chromium](https://developer.chrome.com/extensions/permissions) e implementa os mesmos tipos de permissões.

### Por que?

Por padrão, o Electron aprovará automaticamente todas as solicitações de permissão, a menos que o desenvolvedor tenha configurado manualmente um manipulador personalizado. Enquanto um padrão sólido, desenvolvedores conscientes da segurança podem querer assumir o oposto.

### Como?

```js
const { session } = require('electron')

session
  .fromPartition('some-partition')
  . etPermissionRequestHandler((webContents, permissão, callback) => {
    const url = webContents. etURL()

    se (permissão === 'notifications') {
      // Aprova o pedido de permissões
      callback(true)
    }

    // Verificar URL
    se (! rl. tartsWith('https://example om/')) {
      // Nega a solicitação de permissões
      return callback(false)
    }
})
```

## 5) Não Desabilitar WebSecurity

_Recomendação é o padrão do Electron's_

You may have already guessed that disabling the `webSecurity` property on a renderer process ([`BrowserWindow`][browser-window], [`BrowserView`][browser-view], or [`<webview>`][webview-tag]) disables crucial security features.

Não desative o `webSecurity` em aplicações de produção.

### Por que?

A desativação de `webSecurity` desativará a mesma política de origem e definirá a `allowRunningInsecureContent` propriedade `true`. Em outras palavras, permite a execução de código inseguro de diferentes domínios.

### Como?

```js
// Ruim
const mainWindow = new BrowserWindow({
  webPreferences: {
    webSecurity: false
  }
})
```

```js
// Boa
const mainWindow = new BrowserWindow()
```

```html
<!-- Mau -->
<webview disablewebsecurity src="page.html"></webview>

<!-- Bom -->
<webview src="page.html"></webview>
```

## 6) Defina uma política de segurança de conteúdo

Uma Política de Segurança de Conteúdo (CSP) é uma camada adicional de proteção contra ataques cross-site-scripting e ataques de injeção de dados. Recomendamos que eles sejam ativados por qualquer site que você carregar dentro do Electron.

### Por que?

CSP permite que o servidor que serve conteúdo restrinja e controle os recursos Electron pode carregar para aquela determinada página da web. `https://example.com` deve ser permitido carregar scripts das origens definidas enquanto scripts de `https://evil. ttacker.com` não deve ser autorizado a executar. Definir um CSP é uma maneira fácil de melhorar a segurança do seu aplicativo.

O CSP a seguir permitirá que o Electron execute scripts do site atual e de `apis.example.com`.

```plaintext
// Ruim
Content-Security-Policy: '*'

// Bom
Content-Security-Policy: script-src 'self' https://apis.example.com
```

### Cabeçalho HTTP CSP

Electron respeita o [`Content-Security-Policy` header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy) que pode ser definido usando o do Electron's[`webRequest.onHeadersRecebeu`](../api/web-request.md#webrequestonheadersreceivedfilter-listener) handler:

```javascript
const { session } = require('electron')

session.defaultSession.webRequest. nHeadersRecebido((detalhes, callback) => {
  callback({
    responseHeaders: {
      . .details.responseHeaders,
      'Content-Security-Policy': ['default-src \'none\'']
    }
  })
})
```

### CSP Meta Tag

O mecanismo de entrega preferido do CSP é um cabeçalho HTTP, no entanto não é possível usar esse método ao carregar um recurso usando o protocolo `file://`. Pode ser útil em alguns casos, como usar o protocolo `file://` , para definir uma política em uma página diretamente na marcação usando uma tag `<meta>`:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'none'">
```

## 7) Não defina `allowRunningInsecureContent` como `true`

_Recomendação é o padrão do Electron's_

Por padrão, o Electron não permitirá que sites carregados através de `HTTPS` carreguem e execute scripts, CSS, ou plugins de fontes inseguras (`HTTP`). Definindo a propriedade `allowRunningInsecureContent` como `verdadeiro` desabilita essa proteção.

Carregar o HTML inicial de um site por `HTTPS` e tentar carregar recursos subsequentes via `HTTP` também é conhecido como "conteúdo misto".

### Por que?

Carregar conteúdo através de `HTTPS` garante a autenticidade e integridade dos recursos carregados ao criptografar o próprio tráfego. Veja a seção em [exibindo somente conteúdo seguro](#1-only-load-secure-content) para mais detalhes.

### Como?

```js
// Ruim
const mainWindow = new BrowserWindow({
  webPreferences: {
    allowRunningInsecureContent: true
  }
})
```

```js
// Boa
const mainWindow = new BrowserWindow({})
```

## 8) Não Ativar recursos experimentais

_Recomendação é o padrão do Electron's_

Usuários avançados do Electron podem ativar recursos experimentais do Chromium usando a propriedade `experimentalCaracterísticas`.

### Por que?

As funcionalidades experimentais são, como o nome sugere, experimentais e não foram habilitadas para todos os usuários do Chromium. Além disso, seu impacto no Electron como um todo provavelmente não foi testado.

Há casos de uso legítimo, mas a menos que você saiba o que está fazendo, você não deve habilitar essa propriedade.

### Como?

```js
// Ruim
const mainWindow = new BrowserWindow({
  webPreferences: {
    experimentalFeatures: true
  }
})
```

```js
// Boa
const mainWindow = new BrowserWindow({})
```

## 9) Não use `enableBlinkCaracterísticas`

_Recomendação é o padrão do Electron's_

Piscar é o nome do motor de renderização por trás do Chromium. As with `experimentalFeatures`, the `enableBlinkFeatures` property allows developers to enable features that have been disabled by default.

### Por que?

Em geral, existem provavelmente boas razões para que um recurso não tenha sido ativado por padrão. Há casos de uso legítimo para habilitar características específicas. Como um desenvolvedor, você deve saber exatamente por que precisa ativar um recurso, o que são as ramificações e como elas impacta a segurança de seu aplicativo. Em nenhuma circunstância você deve habilitar recursos especulativamente.

### Como?

```js
// Ruim
const mainWindow = new BrowserWindow({
  webPreferences: {
    enableBlinkFeatures: 'ExecCommandInJavaScript'
  }
})
```

```js
// Boa
const mainWindow = new BrowserWindow()
```

## 10) Não Use `allowpopups`

_Recomendação é o padrão do Electron's_

If you are using [`<webview>`][webview-tag], you might need the pages and scripts loaded in your `<webview>` tag to open new windows. The `allowpopups` attribute enables them to create new [`BrowserWindows`][browser-window] using the `window.open()` method. `<webview>` tags não estão autorizadas a criar novas janelas.

### Por que?

If you do not need popups, you are better off not allowing the creation of new [`BrowserWindows`][browser-window] by default. Isto segue o princípio de acesso mínimo necessário: Não deixe um site criar novos pop-ups a menos que você saiba que ele precisa desse recurso.

### Como?

```html
<!-- Mau -->
<webview allowpopups src="page.html"></webview>

<!-- Bom -->
<webview src="page.html"></webview>
```

## 11) Verifique as opções do WebView antes da criação

Um WebView criado em um processo de renderização que não possui integração de Node.js habilitada não será capaz de habilitar a integração em si. However, a WebView will always create an independent renderer process with its own `webPreferences`.

It is a good idea to control the creation of new [`<webview>`][webview-tag] tags from the main process and to verify that their webPreferences do not disable security features.

### Por que?

Desde `<webview>` vive no DOM, eles podem ser criados por um script rodando no seu site mesmo que o nó. A integração está desabilitada.

Electron permite que desenvolvedores desative vários recursos de segurança que controlam um processo de renderização. In most cases, developers do not need to disable any of those features - and you should therefore not allow different configurations for newly created [`<webview>`][webview-tag] tags.

### Como?

Before a [`<webview>`][webview-tag] tag is attached, Electron will fire the `will-attach-webview` event on the hosting `webContents`. Use the event to prevent the creation of `webViews` with possibly insecure options.

```js
app.on('web-contents-created', (evento, contents) => {
  contents. n('will-attach-webview', (evento, webPreferations, params) => {
    // Retirar scripts de pré-carregamento se não forem usados ou verificar sua localização é legítimo
    apagar webPreferences. recarregar
    apagar webPreferences. reloadURL

    // Desativa a integração do Node.js
    webPreferences. odeIntegration = false

    // Verifique se a URL está carregada
    se (!params. rc.startsWith('https://example.com/')) {
      event.preventDefault()
    }
  })
})
```

Mais uma vez, esta lista apenas minimiza o risco, não o elimina. Se seu objetivo é exibir um site, um navegador será uma opção mais segura.

## 12) Desativar ou limitar a navegação

Se seu aplicativo não precisa navegar ou só precisa navegar para páginas conhecidas, é uma boa idéia limitar a navegação diretamente para o âmbito conhecido, impedindo quaisquer outros tipos de navegação.

### Por que?

A navegação é um vetor de ataque comum. Se um invasor pode convencer seu aplicativo para navegar para longe da página atual, eles podem forçar seu aplicativo a abrir sites na Internet. Mesmo que seu `conteúdo web` esteja configurado para ser mais seguro (como ter a `nodeintegração` desabilitada ou `contextIsolação` ativada), conseguir que o seu aplicativo abra um site aleatório tornará muito mais fácil o trabalho de explorar o seu aplicativo .

Um padrão de ataque comum é que o atacante convence os usuários do seu aplicativo a interagir com o aplicativo de tal forma que ele navegue até uma das páginas de atacantes. Isso geralmente é feito através de links, plugins ou outro conteúdo gerado pelo usuário.

### Como?

If your app has no need for navigation, you can call `event.preventDefault()` in a [`will-navigate`][will-navigate] handler. Se você sabe para quais páginas seu aplicativo pode navegar, marque a URL no manipulador de eventos e deixe apenas a navegação ocorrer se corresponder aos links que você espera.

Recomendamos que você use o analisador do Node para URLs. Comparações simples de strings podem às vezes ser enganadas - um teste de `startsWith('https://example.com')` permitiria que `https://example.com.attacker.com` passasse adiante.

```js
const URL = require('url').URL

app.on('web-contents-created', (evento, contents) => {
  conteúdos. n('will-navigate', (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl)

    if (parsedUrl. rigin !== 'https://example.com') {
      event.preventDefault()
    }
  })
})
```

## 13) Desativar ou limitar a criação de novas janelas

Se você tem um conjunto de janelas conhecido, é uma boa ideia limitar a criação de janelas adicionais em seu aplicativo.

### Por que?

Muito parecido com a navegação, a criação de um novo `webContents` é um vetor comum . Ataques tentam convencer seu aplicativo a criar novas janelas, frames, ou outros processos de renderização com mais privilégios do que eles tinham anterior; ou com páginas abertas que não podiam abrir antes.

Se você não tiver necessidade de criar janelas, além das que você sabe que vai precisar criar, desabilitar a criação compra um pouco de segurança adicional sem custo algum. Esse é comumente o caso para aplicativos que abrem uma `BrowserWindow` e não precisam abrir um número arbitrário de janelas adicionais em tempo de execução.

### Como?

[`webContents`][web-contents] will delegate to its [window open handler][window-open-handler] before creating new windows. The handler will receive, amongst other parameters, the `url` the window was requested to open and the options used to create it. We recommend that you register a handler to monitor the creation of windows, and deny any unexpected window creation.

```js
const { shell } = require('electron')

app.on('web-contents-created', (event, contents) => {
  contents.setWindowOpenHandler(({ url }) => {
    // In this example, we'll ask the operating system
    // to open this event's url in the default browser.
    //
    // See the following item for considerations regarding what
    // URLs should be allowed through to shell.openExternal.
    if (isSafeForExternalOpen(url)) {
      setImmediate(() => {
        shell.openExternal(url)
      })
    }

    return { action: 'deny' }
  })
})
```

## 14) Não use `openExternal` com conteúdo não confiável

Shell's [`openExternal`][open-external] allows opening a given protocol URI with the desktop's native utilities. On macOS, for instance, this function is similar to the `open` terminal command utility and will open the specific application based on the URI and filetype association.

### Por que?

Improper use of [`openExternal`][open-external] can be leveraged to compromise the user's host. Quando o openExternal é usado com conteúdo não confiável, ele pode ser aproveitado para executar comandos arbitrários.

### Como?

```js
// Ruim
const { shell } = require('electron')
shell.openExternal(USER_CONTROLED_DATA_HERE)
```

```js
// Bom
const { shell } = require('electron')
shell.openExternal('https://example.com/index.html')
```

## 15) Use a current version of Electron

Você deve se esforçar por sempre usar a última versão disponível do Electron. Sempre que uma nova versão principal for lançada, você deve tentar atualizar seu aplicativo o mais rápido possível.

### Por que?

Uma aplicação construída com uma versão mais antiga do Electron, Chromium e Node. s é um alvo mais fácil do que um aplicativo que está usando versões mais recentes de esses componentes. De um modo geral, problemas de segurança e exploits para versões mais antigas do Chromium e do Node.js estão mais disponíveis.

Tanto Chromium como Node.js são impressionantes feitos de engenharia construídos por milhares de desenvolvedores talentosos. Dada sua popularidade, sua segurança é testada cuidadosamente e analisada por pesquisadores de segurança igualmente qualificados. Many of those researchers [disclose vulnerabilities responsibly][responsible-disclosure], which generally means that researchers will give Chromium and Node.js some time to fix issues before publishing them. Seu aplicativo será mais seguro se estiver executando uma versão recente do Electron (e assim, Chromium e Node. ) para que potenciais problemas de segurança não são tão amplamente conhecidos.

[browser-window]: ../api/browser-window.md

[browser-window]: ../api/browser-window.md
[browser-view]: ../api/browser-view.md
[webview-tag]: ../api/webview-tag.md
[web-contents]: ../api/web-contents.md
[window-open-handler]: ../api/web-contents.md#contentssetwindowopenhandlerhandler
[will-navigate]: ../api/web-contents.md#event-will-navigate
[open-external]: ../api/shell.md#shellopenexternalurl-options
[responsible-disclosure]: https://en.wikipedia.org/wiki/Responsible_disclosure
