---
title: Instrumente de accesibilitate
author: Jlord
date: '2016-08-23'
---

Crearea de aplicații accesibile este importantă și suntem bucuroși să introducem funcționalități noi pentru [Devtron](https://electronjs.org/devtron) și [Spectron](https://electronjs.org/spectron) care oferă dezvoltatorilor oportunitatea de a-și îmbunătăți aplicațiile pentru toată lumea.

---

Problemele legate de accesibilitate în aplicațiile Electron sunt similare cu cele ale website-urilor pentru că ambele sunt în cele din urmă HTML. Cu aplicațiile Electron nu poți folosi resursele online pentru audituri de accesibilitate deoarece aplicația ta nu are un URL pentru a indica auditorul.

Aceste caracteristici noi aduc aceste instrumente de audit în aplicația ta Electron. Poți alege să adaugi audituri la testele tale cu Spectron sau să le folosești în DevTools cu Devtron. Citește pentru un rezumat al instrumentelor sau finalizează [documentația noastră de accesibilitate](https://electronjs.org/docs/tutorial/accessibility/) pentru mai multe informații.

### Spectron

În test-framework Spectron, poți audita acum fiecare fereastră și `<webview>` eticheta din aplicația ta. De exemplu:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Poți citi mai multe despre această caracteristică în [documentația spectrului](https://github.com/electron/spectron#accessibility-testing).

### Devtron

În Devtron există o nouă filă de accesibilitate care vă va permite să auditați o pagină din aplicația dvs., sortați și filtrați rezultatele.

![captură ecran devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Ambele instrumente folosesc librăria [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) construită de Google pentru Chrome. Poți afla mai multe despre regulile de audit în materie de accesibilitate pe care le folosește această bibliotecă pe [wiki al repo-ului](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Dacă știi de alte instrumente de accesibilitate pentru Electron, adaugă-le la documentația de accesibilitate [](https://electronjs.org/docs/tutorial/accessibility/) cu o cerere de tragere.

