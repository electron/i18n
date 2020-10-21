---
title: Risoluzione Vulnerabilità Webview
author: ckerr
date: '2018-03-21'
---

È stata scoperta una vulnerabilità che permette di riattivare l'integrazione di Node.js in alcune applicazioni Electron che lo disattivano. A questa vulnerabilità è stato assegnato l'identificatore CVE [CVE-2018-1000136](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000136).

---

## Applicazioni Interessate

Un'applicazione è influenzata se *tutti* dei seguenti sono veri:

 1. Esegue su Electron 1.7, 1.8, o 2.0.0-beta
 2. Consente l'esecuzione di codice remoto arbitrario
 3. Disabilita l'integrazione Node.js
 4. Non dichiara esplicitamente `webviewTag: false` nelle sue preferenze web
 5. Non abilita l'opzione `nativeWindowOption`
 6. Non intercetta `eventi new-window` e sovrascrivi manualmente `event.newGuest` senza utilizzare il tag opzioni fornito

Anche se questo sembra essere una minoranza di applicativi Electron, incoraggiamo tutte le applicazioni ad essere aggiornate come precauzione.

## Mitigazione

Questa vulnerabilità è risolta nelle versioni di oggi [1.7.13](https://github.com/electron/electron/releases/tag/v1.7.13), [1.8.4](https://github.com/electron/electron/releases/tag/v1.8.4)e [2.0.0-beta.5](https://github.com/electron/electron/releases/tag/v2.0.0-beta.5).

Gli sviluppatori che non sono in grado di aggiornare la versione Electron della loro applicazione possono mitigare la vulnerabilità con il seguente codice:

```js
app.on('web-contents-created', (event, win) => {
  win. n('new-window', (event, newURL, frameName, disposition,
                        opzioni, additionalFeatures) => {
    if (! opzioni. ebPreferences) options.webPreferences = {};
    options.webPreferences. odeIntegration = false;
    options.webPreferences.nodeIntegrationInWorker = false;
    opzioni. ebPreferences.webviewTag = false;
    delete options.webPreferences. reload;
  })
})

// e *IF* non usi WebViews affatto,
// potresti anche desiderare
app. n('web-contents-created', (event, win) => {
  win. n('will-attach-webview', (event, webPreferences, params) => {
    event.preventDefault();
  })
})
```

## Ulteriori Informazioni

Questa vulnerabilità è stata trovata e segnalata in modo responsabile al progetto Electron da Brendan Scarvell di [Trustwave SpiderLabs](https://www.trustwave.com/Company/SpiderLabs/).

Per saperne di più sulle migliori pratiche per mantenere al sicuro le tue app Electron, consulta il nostro [tutorial per la sicurezza](https://electronjs.org/docs/tutorial/security).

Per segnalare una vulnerabilità in Electron, scrivi a security@electronjs.org.

Per favore unisciti alla nostra [lista email](https://groups.google.com/forum/#!forum/electronjs) per ricevere aggiornamenti sulle versioni e gli aggiornamenti di sicurezza.

