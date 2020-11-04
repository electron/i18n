---
title: Correzione Di Vulnerabilità Del Gestore Protocollo
author: zeke
date: '2018-01-22'
---

È stata scoperta una vulnerabilità nell'esecuzione di codice remoto che colpisce le applicazioni Electron che utilizzano i gestori di protocollo personalizzati. A questa vulnerabilità è stato assegnato l'identificatore CVE [CVE-2018-1000006](https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2018-1000006).

---

## Piattaforme Interessate

Le app Electron progettate per funzionare su Windows che si registrano come gestore predefinito per un protocollo, come `myapp://`, sono vulnerabili.

Tali applicazioni possono essere influenzate indipendentemente da come il protocollo è registrato, ad es. utilizzando il codice nativo, il registro di Windows o l'app [di Electron.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) API.

macOS e Linux non sono **vulnerabili** a questo problema.

## Mitigazione

Abbiamo pubblicato nuove versioni di Electron che includono correzioni per questa vulnerabilità: [`1.8.2-beta.`](https://github.com/electron/electron/releases/tag/v1.8.2-beta.5), [`1.7. 2`](https://github.com/electron/electron/releases/tag/v1.7.12), e [`1.6.17`](https://github.com/electron/electron/releases/tag/v2.6.17). Esortiamo tutti gli sviluppatori di Electron ad aggiornare immediatamente le loro app all'ultima versione stabile.

Se per qualche motivo non sei in grado di aggiornare la versione di Electron, puoi aggiungere `--` come ultimo argomento quando chiami l'app [. etAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows), che impedisce al cromo di analizzare ulteriori opzioni. Il doppio trattino `--` indica la fine delle opzioni di comando, dopo di che sono accettati solo i parametri di posizione.

```js
app.setAsDefaultProtocolClient(protocol, process.execPath, [
  '--your-switches-here',
  '--'
])
```

Vedi l'API [app.setAsDefaultProtocolClient](https://electronjs.org/docs/api/app#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) per maggiori dettagli.

Per saperne di più sulle migliori pratiche per mantenere al sicuro le tue app Electron, consulta il nostro [tutorial per la sicurezza](https://electronjs.org/docs/tutorial/security).

Se si desidera segnalare una vulnerabilità in Electron, e-mail security@electronjs.org.
