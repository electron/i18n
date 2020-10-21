---
title: WebPreferences Risoluzione Vulnerabilità
author: ckerr
date: '2018-08-22'
---

È stata scoperta una vulnerabilità nell'esecuzione di codice remoto che colpisce le applicazioni con la possibilità di aprire finestre figlie nidificate sulle versioni di Electron (3. .0-beta.6, 2.0.7, 1.8.7 e 1.7.15). A questa vulnerabilità è stato assegnato l'identificatore CVE [CVE-2018-15685](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-15685).

---

## Piattaforme Interessate

Sei colpito se:

1. Hai incorporato _qualsiasi_ contenuto utente remoto, anche in una sandbox
2. Accetti l'input utente con qualsiasi vulnerabilità XSS

_Dettagli_

Sei colpito se un codice utente viene eseguito all'interno di un `iframe` / può creare un `iframe`. Data la possibilità di una vulnerabilità XSS si può presumere che la maggior parte delle applicazioni sono vulnerabili a questo caso.

Sei anche colpito se apri una delle tue finestre con l'opzione `nativeWindowOpen: true` or `sandbox: true`.  Anche se questa vulnerabilità richiede anche una vulnerabilità XSS per esistere nella tua app, si dovrebbe ancora applicare una delle mitigazioni qui sotto se si utilizza una di queste opzioni.

## Mitigazione

Abbiamo pubblicato nuove versioni di Electron che includono correzioni per questa vulnerabilità: [`. .0-beta.7`](https://github.com/electron/electron/releases/tag/v3.0.0-beta.7), [`2. .8`](https://github.com/electron/electron/releases/tag/v2.0.8), [`1.8.8`](https://github.com/electron/electron/releases/tag/v1.8.8)e [` 1.7.16`](https://github.com/electron/electron/releases/tag/v1.7.16). Invitiamo tutti gli sviluppatori di Electron ad aggiornare immediatamente le loro app all'ultima versione stabile.

If for some reason you are unable to upgrade your Electron version, you can protect your app by blanket-calling `event.preventDefault()` on the `new-window` event for all  `webContents`'. Se non si utilizza `window.open` o qualsiasi finestra figlia, allora questa è anche una mitigazione valida per la tua app.

```javascript
mainWindow.webContents.on('new-window', e => e.preventDefault())
```

Se fai affidamento sulla capacità delle finestre dei tuoi figli di fare le finestre dei nipoti, poi una terza strategia di mitigazione è quella di utilizzare il seguente codice nella finestra di livello superiore:

```javascript
const enforceInheritance = (topWebContents) => {
  const handle = (webContents) => {
    webContents. n('new-window', (event, url, frameName, disposition, options) => {
      if (!options. ebPreferences) {
        opzioni. ebPreferences = {}
      }
      Object. ssign(options.webPreferences, topWebContents.getLastWebPreferences())
      if (options.webContents) {
        handle(options. ebContents)
      }
    })
  }
  handle(topWebContents)
}

enforceInheritance(mainWindow. ebContents)
```

Questo codice applicherà manualmente che le finestre di primo livello `webPreferenze` vengano applicate manualmente a tutte le finestre figlie infinitamente profonde.

## Ulteriori Informazioni

Questa vulnerabilità è stata trovata e segnalata responsabilmente al progetto Electron da [Matt Austin](https://twitter.com/mattaustin) di [Contrast Security](https://www.contrastsecurity.com/security-influencers/cve-2018-15685).

Per saperne di più sulle migliori pratiche per mantenere al sicuro le tue app Electron, consulta il nostro [tutorial per la sicurezza](https://electronjs.org/docs/tutorial/security).

Se si desidera segnalare una vulnerabilità in Electron, e-mail security@electronjs.org.
