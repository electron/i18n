# Acessibilidade

Tornar acessíveis os aplicativos é algo importante, e nós estamos felizes em apresentar novas funcionalidades no [Devtron](https://electronjs.org/devtron) e no[Spectron](https://electronjs.org/spectron) que oferece aos desenvolvedores a oportunidade de melhorar seus aplicativos para todos.

* * *

As questões de acessibilidade em aplicativos Electron são semelhantes às de sites na Web, já que ambos fazem uso do HTML. No entanto, com apps Electron, você não pode usar ferramentas online para auditorias de acessibilidade, pois seu aplicativo não tem uma URL para o auditor poder acessá-lo.

Esses novos recursos trazem ferramentas de auditoria para seu app Electron. Você pode escolher adicionar análises aos seus testes com o Spectron ou usá-las dentro da DevTools com o Devtron. Continue lendo para ver um resumo das ferramentas.

## Spectron

No framework de testes Spectron, você agora pode auditar cada janela e tag `<webview>` em seu aplicativo. Por exemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Você pode ler mais sobre esse recurso na [documentação do Spectron](https://github.com/electron/spectron#accessibility-testing).

## Devtron

O Devtron fornece uma nova guia de acessibilidade, onde você pode auditar uma página de seu aplicativo, classificar e filtrar os resultados.

![captura de tela do devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ambas essas ferramentas são usadas na [Acessibilidade Ferramentas para Desenvolvedores](https://github.com/GoogleChrome/accessibility-developer-tools) construída para o Google Chrome. Você pode aprender mais sobre as regras de auditoria de acessibilidade que essa biblioteca usa no [wiki do repositório](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Se você souber de outra fantástica ferramenta de acessibilidade para Electron, adicione na documentação de acessibilidade com um pull request.

## Permitindo Acessibilidade

Aplicativos em Electron devem mantém acessibilidade desabilitada por padrão, em razão do desempenho, mas existem várias maneiras para habilita.

### Dentro do Aplicativo

Usando [`app.setAccessibilitySupportEnabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows), a acessibilidade pode ser mostrada para usuários nas configuração da aplicação. User's system assistive utilities have priority over this setting and will override it.

### Assistive Technology

Electron application will enable accessibility automatically when it detects assistive technology (Windows) or VoiceOver (macOS). See Chrome's [accessibility documentation](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology) for more details.

On macOS, third-party assistive technology can switch accessibility inside Electron applications by setting the attribute `AXManualAccessibility` programmatically:

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