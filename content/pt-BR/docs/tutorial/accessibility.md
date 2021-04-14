# Acessibilidade

Fazer aplicativos acessíveis é importante e estamos felizes em fornecer funcionalidade para [][devtron] Devtron e [Spectron][spectron] que dá aos desenvolvedores a oportunidade de tornar seus aplicativos melhores para todos.

---

As questões de acessibilidade em aplicativos Electron são semelhantes às de sites na Web, já que ambos fazem uso do HTML. No entanto, com apps Electron, você não pode usar ferramentas online para auditorias de acessibilidade, pois seu aplicativo não tem uma URL para o auditor poder acessá-lo.

Esses recursos trazem essas ferramentas de auditoria para o seu aplicativo Electron. Você pode optar por adicionar auditorias aos seus testes com a Spectron ou usá-las dentro da DevTools com a Devtron. Confira a seguir um resumo das ferramentas.

## Spectron

No esquema de testes Spectron, agora você pode auditar, cada janela e `<webview>` em sua aplicação. Como por exemplo:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Você pode ler mais sobre esse recurso na [documentação do Spectron][spectron-a11y].

## Devtron

No Devtron, há uma guia de acessibilidade que permitirá que você auditoria uma página em seu aplicativo, classifique e filtre os resultados.

![captura de tela do devtron][5]

Ambas essas ferramentas usam a biblioteca de [ferramentas de acessibilidade para desenvolvedores][a11y-devtools] feita para o Google Chrome. Você pode aprender mais sobre as regras de auditoria de acessibilidade que essa biblioteca usa no [wiki do repositório][a11y-devtools-wiki].

Se você souber de outra fantástica ferramenta de acessibilidade para o Electron, adicione-a na documentação de acessibilidade com um pull request.

## Ativando manualmente recursos de acessibilidade

Aplicativos Electron ativarão automaticamente recursos de acessibilidade na presença de tecnologia assistiva (e. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) no Windows ou [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) no macOS). Consulte a documentação de acessibilidade [do Chrome][a11y-docs] para obter mais detalhes.

Você também pode alternar manualmente esses recursos em seu aplicativo Electron ou definindo bandeiras em softwares nativos de terceiros.

### Usando a API do Electron

Usando a API [`app.setAccessibilitySupportEnabled(enabled)`][setAccessibilitySupportEnabled] , você pode expor manualmente a árvore de acessibilidade do Chrome aos usuários nas preferências do aplicativo. Note que os utilitários assistivos do usuário têm prioridade sobre esta configuração e irá sobrescrevê-la.

### Dentro do software de terceiros

#### macOS

No macOS, a tecnologia assistiva de terceiros pode alternar os recursos de acessibilidade dentro de aplicativos Electron definindo o atributo `AXManualAccessibility` programaticamente :

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

[5]: https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png

[devtron]: https://electronjs.org/devtron

[devtron]: https://electronjs.org/devtron
[spectron]: https://electronjs.org/spectron
[spectron-a11y]: https://github.com/electron/spectron#accessibility-testing
[a11y-docs]: https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology
[a11y-devtools]: https://github.com/GoogleChrome/accessibility-developer-tools
[a11y-devtools-wiki]: https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules
[setAccessibilitySupportEnabled]: ../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows
