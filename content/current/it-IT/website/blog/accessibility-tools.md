---
title: Strumenti Di Accessibilità
author: jlord
date: '2016-08-23'
---

Rendere le applicazioni accessibili è importante e siamo felici di introdurre nuove funzionalità per [Devtron](https://electronjs.org/devtron) e [Spectron](https://electronjs.org/spectron) che offre agli sviluppatori l'opportunità di migliorare le loro applicazioni per tutti.

---

I problemi di accessibilità nelle applicazioni Electron sono simili a quelli dei siti web perché sono entrambi in ultima analisi HTML. Con le app Electron, tuttavia, non è possibile utilizzare le risorse online per le verifiche di accessibilità perché la tua app non dispone di un URL a cui puntare l'auditor.

Queste nuove funzionalità portano questi strumenti di controllo alla tua app Electron. Puoi scegliere di aggiungere audit ai tuoi test con Spectron o usarli all'interno di DevTools con Devtron. Continua a leggere per un riassunto degli strumenti o controlla la nostra [documentazione di accessibilità](https://electronjs.org/docs/tutorial/accessibility/) per ulteriori informazioni.

### Spectron

Nel framework di test Spectron, ora puoi controllare ogni finestra e `<webview>` tag nella tua applicazione. Ad esempio:

```javascript
app.client.auditAccessibility().then(function (audit) {
  if (audit.failed) {
    console.error(audit.message)
  }
})
```

Puoi leggere ulteriori informazioni su questa funzione nella [documentazione di Spectron](https://github.com/electron/spectron#accessibility-testing).

### Devtron

In Devtron c'è una nuova scheda di accessibilità che ti permetterà di controllare una pagina nella tua app, ordinare e filtrare i risultati.

![screenshot di devtron](https://cloud.githubusercontent.com/assets/1305617/17156618/9f9bcd72-533f-11e6-880d-389115f40a2a.png)

Entrambi questi strumenti utilizzano la libreria [Accessibility Developer Tools](https://github.com/GoogleChrome/accessibility-developer-tools) costruita da Google per Chrome. Puoi saperne di più sulle regole di controllo dell'accessibilità che questa libreria utilizza su quella wiki</a> del repository di

.</p> 

Se conosci altri ottimi strumenti di accessibilità per Electron, aggiungili alla [documentazione di accessibilità](https://electronjs.org/docs/tutorial/accessibility/) con una pull request.

