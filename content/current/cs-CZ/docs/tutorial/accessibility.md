# Přístupnost

Vytvoření přístupných aplikací je důležité a rádi poskytneme funkci [Devtron](https://electronjs.org/devtron) a [Spectron](https://electronjs.org/spectron) , která dává vývojářům možnost vylepšit jejich aplikace pro všechny.

---

Obavy o přístupnost v Electron aplikacích se podobají problémům webových stránek, protože oba jsou v konečném důsledku HTML. S Electron aplikacemi však nemůžete použít online zdroje pro audity přístupnosti, protože vaše aplikace nemá adresu URL, na kterou by měl auditor odkazovat.

Tyto funkce přinášejí tyto auditorské nástroje do vaší aplikace Electron. Můžete přidat audity do svých testů pomocí Spectronu nebo je použít v rámci DevTools s Devtronem. Přečtěte si přehled nástrojů.

## Spectron

V testovacím frameworku můžete nyní provést audit každého okna a značky `<webview>` ve vaší aplikaci. Například:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Více o této funkci si můžete přečíst v [Dokumentaci Spectronu](https://github.com/electron/spectron#accessibility-testing).

## Devtron

V Devtron je záložka přístupnosti, která vám umožní provést audit stránky ve vaší aplikaci, seřadit a filtrovat výsledky.

![snímek obrazovky devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Oba tyto nástroje používají [Nástroje vývojáře přístupnosti](https://github.com/GoogleChrome/accessibility-developer-tools) knihovnu vytvořenou společností Google pro Chrome. Více se dozvíte o pravidlech auditu přístupnosti , která tato knihovna používá, [wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules) tohoto repositáře .

Pokud znáte další skvělé nástroje přístupnosti pro Electron, přidejte je do dokumentace přístupnosti pomocí požadavku na natažení.

## Ruční zapnutí funkcí usnadnění přístupu

Elektronické aplikace automaticky zapnou funkce usnadnění přístupu v přítomnosti asistenční technologie (např. . [JAWS](https://www.freedomscientific.com/products/software/jaws/) na Windows nebo [VoiceOver](https://help.apple.com/voiceover/mac/10.15/) na macOS). Další informace naleznete v [dokumentaci o přístupnosti](https://www.chromium.org/developers/design-documents/accessibility#TOC-How-Chrome-detects-the-presence-of-Assistive-Technology).

Tyto funkce můžete také ručně přepnout buď v aplikaci Electron , nebo nastavením příznaků v nativním softwaru třetích stran.

### Použití Electron's API

Používáním [`app.setAccessibilitySupportEenabled(enabled)`](../api/app.md#appsetaccessibilitysupportenabledenabled-macos-windows) API, můžete ručně vystavit strom přístupnosti Chromu uživatelům v nastavení aplikace. Všimněte si, že systémové asistenční služby uživatele mají přednost před tímto nastavením a jej nahradí.

### V rámci softwaru třetích stran

#### macOS

Na macOS může asistenční technologie třetích stran přepínat funkce přístupnosti uvnitř Electron aplikací nastavením `AXManualAccessibility` atributu programmaticky:

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
