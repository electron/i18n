---
title: Oprava zranitelnosti Webview
author: ckerr
date: '2018-03-21'
---

Byla nalezena zranitelnost umožňující znovupovolit integraci Node.js v některých Electronových aplikacích, které ji zakázají. Tato zranitelnost byla přiřazena identifikátor CVE [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Postižené aplikace

Aplikace je ovlivněna, pokud je pravdivá *všechna* z následujících:

 1. Spustí na Electron 1.7, 1.8, nebo 2.0.0-beta
 2. Umožňuje provedení libovolného vzdáleného kódu
 3. Zakázat integraci Node.js
 4. Neuvádí výslovně `webviewTag: false` ve svých webových preferencích
 5. Nezapne možnost `nativeWindowOption`
 6. Nezasahuje `nové události` a ručně přepisuje `událost.newGuest` bez použití zadané volby tagu

I když se zdá, že se jedná o menšinu Electron aplikací, doporučujeme všechny aplikace, aby byly z bezpečnostních důvodů aktualizovány.

## Zmírnění

Tato zranitelnost je opravena v dnešním vydání [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)a [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5).

Vývojáři, kteří nejsou schopni aktualizovat verzi své aplikace Electron, mohou zmírnit zranitelnost pomocí následujícího kódu:

```js
app.on('web-contents-created', (event win) => {
  vyhraje. n('new-window', (událost, newURL, frameName, pojmenování,
                        možností, additionalFeatures) => {
    if (! možnosti. ebPreferences) options.webPreferences = {};
    options.webPreferences. odeIntegrace = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    možnosti. ebPreferences.webviewTag = false;
    odstraňte volby.webPreference. restartovat;
  })
})

// a *IF* nepoužíváte WebViews,
// můžete také chtít
aplikace. n('web-contents-created', (event win) => {
  vyhraje. n('will-attach-webview', (případ, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Další informace

Tato zranitelnost byla zjištěna a odpovědně oznámena projektu Electron Brendanem Scarvellem z [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Chcete-li se dozvědět více o osvědčených postupech pro zabezpečení Vašich Electron aplikací, podívejte se na náš [bezpečnostní návod](https://electronjs.org/docs/tutorial/security).

Chcete-li nahlásit zranitelnost v Electronu, napište prosím email security@electronjs.org.

Prosím, připojte se k našemu [e-mailovému seznamu](https://groups.google.com/forum/#!forum/electronjs) , abyste mohli dostávat informace o verzích a bezpečnostních aktualizacích.

