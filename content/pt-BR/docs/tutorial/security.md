# Segurança, Capacidades Nativas e Suas Responsabilidades

Como desenvolvedores web, nós geralmente usufruímos da forte segurança de rede disponibilizada pelos navegadores - os riscos associados com códigos que escrevemos são relativamente baixos. Nossos sites tem poderes limitados em uma caixa de areia e confiamos que nossos usuários desfrutam de num navegador construído por uma grande equipe de engenheiros os quais são capazes de responder rapidamente às ameaças de segurança recém-descobertas.

Ao trabalhar com Electron, é importante entender que Electron não é um navegador web. Isto permite que você construa aplicações desktop ricas com tecnologias web familiar, mas seu código exerce um poder muito maior. JavaScript pode acessar o sistema de arquivos, o shell do usuário e muito mais. Isto permite que você crie aplicativos nativos de alta qualidade, mas os riscos de segurança inerentes escalam com os poderes adicionais concedidos ao seu código.

Com isso em mente, esteja ciente de que exibir conteúdo arbitrário de fontes não confiáveis representa um grave risco de segurança que o Electron não pretende manipular. Na verdade, os mais populares aplicativos do Electron (Atom, Slack, Visual Studio Code, etc) exibem principalmente conteúdo local (ou confiáveis, conteúdo remoto seguro, sem a integração com Node) - se sua aplicação executa código de uma fonte online, é sua responsabilidade que o código não seja malicioso.

## Reportando problemas de Segurança

Para obter informações sobre como divulgar adequadamente uma vulnerabilidade do Electron, consulte [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium Security Issues and Upgrades

While Electron strives to support new versions of Chromium as soon as possible, developers should be aware that upgrading is a serious undertaking - involving hand-editing dozens or even hundreds of files. Given the resources and contributions available today, Electron will often not be on the very latest version of Chromium, lagging behind by either days or weeks.

We feel that our current system of updating the Chromium component strikes an appropriate balance between the resources we have available and the needs of the majority of applications built on top of the framework. We definitely are interested in hearing more about specific use cases from the people that build things on top of Electron. Pull requests and contributions supporting this effort are always very welcome.

## Ignoring Above Advice

A security issue exists whenever you receive code from a remote destination and execute it locally. As an example, consider a remote website being displayed inside a browser window. If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :warning: Under no circumstances should you load and execute remote code with Node integration enabled. Instead, use only local files (packaged together with your application) to execute Node code. To display remote content, use the `webview` tag and make sure to disable the `nodeIntegration`.

#### Checklist

This is not bulletproof, but at the least, you should attempt the following:

* Only display secure (https) content
* Disable the Node integration in all renderers that display remote content (setting `nodeIntegration` to `false` in `webPreferences`)
* Enable context isolation in all renderers that display remote content (setting `contextIsolation` to `true` in `webPreferences`)
* Use `ses.setPermissionRequestHandler()` in all sessions that load remote content
* Do not disable `webSecurity`. Disabling it will disable the same-origin policy.
* Define a [`Content-Security-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) , and use restrictive rules (i.e. `script-src 'self'`)
* [Override and disable `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8) , which allows strings to be executed as code.
* Do not set `allowRunningInsecureContent` to true.
* Do not enable `experimentalFeatures` or `experimentalCanvasFeatures` unless you know what you're doing.
* Do not use `blinkFeatures` unless you know what you're doing.
* WebViews: Do not add the `nodeintegration` attribute.
* WebViews: Do not use `disablewebsecurity`
* WebViews: Do not use `allowpopups`
* WebViews: Do not use `insertCSS` or `executeJavaScript` with remote CSS/JS.
* WebViews: Verify the options and params of all `<webview>` tags before they get attached using the `will-attach-webview` event:

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable node integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.