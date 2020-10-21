---
title: Nástroje přístupnosti
author: jlord
date: '2016-08-23'
---

Vytvoření přístupných aplikací je důležité a rádi představíme nové funkce pro [Devtron](https://electronjs.org/devtron) a [Spectron](https://electronjs.org/spectron) , které vývojářům umožní vylepšit jejich aplikace pro všechny.

---

Obavy o přístupnost v Electron aplikacích se podobají webovým stránkám, protože jsou oba v konečném důsledku HTML. S aplikacemi Electron však nemůžete použít online zdroje pro audity přístupnosti, protože vaše aplikace nemá URL, na kterou by mohl auditor odkazovat.

Tyto nové funkce přinášejí tyto auditorské nástroje do vaší aplikace Electron. Můžete přidat audity do svých testů pomocí Spectronu nebo je použít v rámci DevTools s Devtronem. Přečtěte si přehled o nástrojích nebo si přečtěte naši [dokumentaci k usnadnění](https://electronjs.org/docs/tutorial/accessibility/) pro více informací.

### Spectron

V testovacím frameworku můžete nyní provést audit každého okna a značky `<webview>` ve vaší aplikaci. Například:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Více o této funkci si můžete přečíst v [Dokumentaci Spectronu](https://github.com/electron/spectron#accessibility-testing).

### Devtron

V Devtron je nová záložka přístupnosti, která vám umožní provést audit stránky ve vaší aplikaci, seřadit a filtrovat výsledky.

![snímek obrazovky devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Oba tyto nástroje používají knihovnu [Nástroje vývojáře přístupnosti](https://github.com/GoogleChrome/accessibility-developer-tools) vytvořenou společností Google pro Chrome. Více informací o pravidlech auditu přístupnosti se můžete dozvědět pomocí této knihovny na [wiki](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Pokud znáte další skvělé nástroje přístupnosti pro Electron, přidejte je do [dokumentace přístupnosti](https://electronjs.org/docs/tutorial/accessibility/) pomocí požadavku na natažení.

