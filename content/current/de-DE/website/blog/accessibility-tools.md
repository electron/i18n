---
title: Bedienungshilfen
author: jörn
date: '2016-08-23'
---

Das Erstellen von zugänglichen Anwendungen ist wichtig und wir freuen uns, neue Funktionen in [Devtron](https://electronjs.org/devtron) und [Spektron](https://electronjs.org/spectron) einzuführen, was Entwicklern die Möglichkeit gibt, ihre Apps für alle besser zu machen.

---

Accessibility Bedenken in Electron Anwendungen ähneln denen von Webseiten, weil sie beide letztendlich HTML sind. Mit Electron-Apps können Sie jedoch die Online-Ressourcen für Zugänglichkeitsprüfungen nicht verwenden, da Ihre App keine URL hat, auf die der Auditor hinweisen kann.

These new features bring those auditing tools to your Electron app. You can choose to add audits to your tests with Spectron or use them within DevTools with Devtron. Lesen Sie weiter für eine Zusammenfassung der Tools oder schauen Sie sich unsere [Barrierefreiheitsdokumentation](https://electronjs.org/docs/tutorial/accessibility/) für weitere Informationen an.

### Spectron

Im Test-Framework Spectron können Sie nun jedes Fenster prüfen und `<webview>` Tag in Ihrer Anwendung. Ein Beispiel:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Erfahren Sie mehr über dieses Feature in der [Spectron Dokumentation](https://github.com/electron/spectron#accessibility-testing).

### Devtron

In Devtron gibt es einen neuen Tab für Barrierefreiheit, der es Ihnen erlaubt, eine Seite in Ihrer App zu überprüfen, zu sortieren und zu filtern.

![Screenshot von Devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Beide Tools verwenden die [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) Bibliothek, die Google für Chrome erstellt hat. Sie können mehr über die Auditregeln erfahren, die diese Bibliothek im Wiki des [Projektarchivs verwendet.](https://github.com/GoogleChrome/accessibility-developer-tools/wiki/Audit-Rules).

Wenn Sie andere großartige Zugänglichkeitstools für Electron kennen, fügen Sie sie der [Barrierefreiheitsdokumentation](https://electronjs.org/docs/tutorial/accessibility/) mit einem Pull-Request hinzu.

