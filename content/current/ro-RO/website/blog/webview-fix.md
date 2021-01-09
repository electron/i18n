---
title: Remediere vulnerabilitate Webview
author: ckerr
date: '2018-03-21'
---

A fost descoperită o vulnerabilitate care permite reactivarea integrării Node.js în unele aplicații Electron care o dezactivează. Această vulnerabilitate a fost atribuită identificatorului CVE [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Aplicații afectate

O aplicație este afectată dacă *toate* din următoarele sunt adevărate:

 1. Rulează pe Electron 1,7, 1,8 sau 2,0.0-beta
 2. Permite executarea codului la distanță arbitrar
 3. Dezactivează integrarea Node.js
 4. Nu declară explicit `webviewTag: fals` în web Preferences
 5. Nu activează opţiunea `nativeWindowWindow`
 6. Nu interceptează `noua fereastră` şi suprascrie manual `event.newGuest` fără a utiliza tag-ul de opţiuni furnizat

Deşi aceasta pare să fie o minoritate de aplicaţii Electron, încurajăm modernizarea tuturor aplicaţiilor ca măsură de precauţie.

## Atenuare

Această vulnerabilitate este fixată în [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13)astăzi, [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4), și [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5) versiuni.

Dezvoltatorii care nu pot actualiza versiunea Electron a aplicației lor pot atenua vulnerabilitatea cu următorul cod:

```js
app.on('web-contents-created', (eveniment, câștigă) => {
  a câștigat. n('new-window', (eveniment, newURL, cadru,prevedere,
                        opțiuni, adionalFeatures) => {
    dacă (! poti. ebPreferințe) opțiuni.webPreferences = {};
    options.webPreferences. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    opțiuni. ebPreferences.webviewTag = false;
    options.webPreferences. reîncărcă;
  })
})

// și *IF* nu utilizați deloc WebViews,
// ați putea dori și aplicația
. n('web-contents-created', (event, win) => {
  a câștigat. n('will-attach-webview', (eveniment, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Informații suplimentare

Această vulnerabilitate a fost găsită și raportată responsabil la proiectul Electron de Brendan Scarvell al [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Pentru a afla mai multe despre cele mai bune practici pentru a vă păstra aplicațiile Electron în siguranță, consultați tutorialul nostru de securitate [](https://electronjs.org/docs/tutorial/security).

Pentru a raporta o vulnerabilitate în Electron, vă rugăm să trimiteți un e-mail la security@electronjs.org.

Vă rugăm să vă alăturați [listei noastre de e-mail](https://groups.google.com/forum/#!forum/electronjs) pentru a primi actualizări despre versiuni și actualizări de securitate.

