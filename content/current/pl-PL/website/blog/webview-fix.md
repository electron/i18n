---
title: Korekta wrażliwości widoku internetowego
author: ckerr
date: '2018-03-21'
---

Odkryto lukę, która pozwala na ponowne włączenie integracji Node.js w niektórych aplikacjach Electron, które ją wyłączają. Ta podatność została przypisana identyfikatorowi CVE [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Dotyczy aplikacji

Aplikacja jest zmieniona, jeśli *wszystkie* z poniższych są prawdziwe:

 1. Uruchamia Electron 1.7, 1.8, lub 2.0.0-beta
 2. Umożliwia wykonywanie arbitralnego zdalnego kodu
 3. Wyłącza integrację Node.js
 4. Nie ogłasza wyraźnie `webviewTag: false` w swoich ustawieniach sieciowych
 5. Nie włącza opcji `nativeWindowOption`
 6. Nie przechwyca `nowych okien` zdarzeń i ręcznie nadpisuje `event.newGest` bez użycia tagu dostarczonych opcji

Chociaż wydaje się, że jest to mniejszość aplikacji Electron, zachęcamy do aktualizacji wszystkich aplikacji jako środków ostrożności.

## Łagodzenie skutków

Ta wrażliwość została naprawiona w dzisiejszych wydaniach [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)i [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5).

Deweloperzy, którzy nie są w stanie zaktualizować wersji Electrona swojej aplikacji, mogą zmniejszyć podatność na zagrożenia za pomocą następującego kodu:

```js
app.on('web-contents-created', (event, win) => {
  wygrywa. n('new-window', (zdarzenie, newURL, frameName, disposition,
                        opcje; additionalFeatures) => {
    if (! pacji. ebPreferences) options.webPreferences = {};
    options.webPreferences. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    opcje. ebPreferences.webviewTag = fałsz;
    usuń opcje.webPreferences. reload;
  })
})

// i *IF* w ogóle nie używasz WebViews
// możesz również chcieć aplikacji
. n('web-contents-created', (event, win) => {
  wygrywa. n('will-attach-webview', (zdarzenie, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Inne informacje

Ta wrażliwość została znaleziona i zgłoszona odpowiedzialnie do projektu Electron przez Brendana Scarvell of [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Aby dowiedzieć się więcej o najlepszych praktykach, aby zachować bezpieczeństwo aplikacji Electron, zobacz nasz [samouczek dotyczący bezpieczeństwa](https://electronjs.org/docs/tutorial/security).

Aby zgłosić lukę w Electronie, prosimy o e-mail security@electronjs.org.

Dołącz do naszej [listy e-mail](https://groups.google.com/forum/#!forum/electronjs) aby otrzymywać aktualizacje o wydaniach i aktualizacjach dotyczących bezpieczeństwa.

