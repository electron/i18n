# Acessibilidade

Tornar acessíveis os aplicativos é algo importante, e nós estamos felizes em apresentar novas funcionalidades no [Devtron][devtron] e no[Spectron][spectron] que oferecem aos desenvolvedores a oportunidade de melhorar seus aplicativos para todos.

---

As questões de acessibilidade em aplicativos Electron são semelhantes às de sites na Web, já que ambos fazem uso do HTML. No entanto, com apps Electron, você não pode usar ferramentas online para auditorias de acessibilidade, pois seu aplicativo não tem uma URL para o auditor poder acessá-lo.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Confira a seguir um resumo das ferramentas.

## Spectron

In the testing framework Spectron, you can now audit each window and `<webview>` tag in your application. Como por exemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Você pode ler mais sobre esse recurso na [documentação do Spectron][spectron-a11y].

## Devtron

O Devtron fornece uma nova guia de acessibilidade, onde você pode auditar uma página de seu aplicativo, classificar e filtrar os resultados.

![captura de tela do devtron][4]

Ambas essas ferramentas usam a biblioteca de [ferramentas de acessibilidade para desenvolvedores][a11y-devtools] feita para o Google Chrome. Você pode aprender mais sobre as regras de auditoria de acessibilidade que essa biblioteca usa no [wiki do repositório][a11y-devtools-wiki].

Se você souber de outra fantástica ferramenta de acessibilidade para o Electron, adicione-a na documentação de acessibilidade com um pull request.

## Permitindo Acessibilidade

Aplicativos em Electron têm seus recursos de acessibilidade desativados por padrão em razão do desempenho, mas existem várias maneiras de ativá-los.

### Dentro do Aplicativo

Usando [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled], você pode permitir que usuários ativem/desativem a acessibilidade através das configurações do aplicativo. Ferramentas assistivas presentes no sistema do usuário têm prioridade sobre esta configuração e irão deixá-la ativada.

### Tecnologias Assistivas

Aplicativos Electron ativarão a acessibilidade automaticamente quando for detectado o uso de tecnologias assistivas (Windows) ou do VoiceOver (macOS). Confira a [documentação de acessibilidade][a11y-docs] do Chrome para mais detalhes.

No macOS, tecnologias assistivas de terceiros podem ativar/desativar a acessibilidade dentro de aplicativos Electron ao configurar o atributo `AXManualAccessibility` programaticamente:

```objc
CFStringRef kAXManualAccessibility = CFSTR("AXManualAccessibility");

+ (void)enableAccessibility:(BOOL)enable inElectronApplication:(NSRunningApplication *)app
{
    AXUIElementRef appRef = AXUIElementCreateApplication(app.processIdentifier);
    if (appRef == nil)
        return;

    CFBooleanRef value = enable ? kCFBooleanTrue : kCFBooleanFalse;
    AXUIElementSetAttributeValue(appRef, kAXManualAccessibility, value);
    CFRelease(appRef);
}
```

[4]: https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png

[devtron]: https://electronjs.org/devtron
[spectron]: https://electronjs.org/spectron
[spectron-a11y]: https://github.com/electron/spectron#accessibility-testing
[a11y-docs]: https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology
[a11y-devtools]: https://github.com/GoogleChrome/accessibility-developer-tools
[a11y-devtools-wiki]: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
