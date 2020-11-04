---
title: Più facile aggiornamento automatico per applicazioni Open-Source
author: zeke
date: '2018-05-01'
---

Oggi pubblichiamo un open source gratuito, hosted [aggiorna il servizio webservice](https://github.com/electron/update.electronjs.org) e compagno [npm pacchetto](https://github.com/electron/update-electron-app) per abilitare gli aggiornamenti automatici facili per le app Electron open-source. Questo è un passo verso l'abilitazione degli sviluppatori di app a pensare meno alla distribuzione e più allo sviluppo di esperienze di alta qualità per i loro utenti.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Screenshot Updater">
    <figcaption>Il nuovo modulo di aggiornamento in azione</figcaption>
  </a>
</figure>

## Facilitare la vita

Electron ha un'API [autoUpdater](https://electronjs.org/docs/tutorial/updates) che dà alle app la possibilità di consumare metadati da un endpoint remoto per controllare la presenza di aggiornamenti, scaricarli in background, e installarli automaticamente.

Abilitare questi aggiornamenti è stato un passo ingombrante nel processo di distribuzione per molti sviluppatori di app Electron perché richiede che un server web sia distribuito e mantenuto solo per servire i metadati della cronologia delle versioni.

Oggi annunciamo una nuova soluzione drop-in per gli aggiornamenti automatici delle app. Se la tua app Electron è in un repository GitHub pubblico e stai utilizzando GitHub rilasci per pubblicare le builds, puoi utilizzare questo servizio per fornire aggiornamenti continui delle app ai tuoi utenti.

## Usare il nuovo modulo

Per minimizzare la configurazione da parte tua, abbiamo creato [update-electron-app](https://github.com/electron/update-electron-app), un modulo npm che si integra con il nuovo [update.electronjs.org](https://github.com/electron/update.electronjs.org) webservice.

Installa il modulo:

```sh
npm install update-electron-app
```

Chiamalo da qualsiasi parte del processo [principale della tua app](https://electronjs.org/docs/glossary#main-process):

```js
richiedi('aggiorna-electron-app')()
```

È tutto! Il modulo controllerà gli aggiornamenti all'avvio dell'app, poi ogni dieci minuti. Quando viene trovato un aggiornamento, verrà scaricato automaticamente in background, e verrà visualizzata una finestra di dialogo quando l'aggiornamento è pronto.

## Migrazione delle applicazioni esistenti

Anche le app che utilizzano già l'API autoUpdater di Elettronica possono utilizzare questo servizio. Per farlo, puoi [personalizzare il modulo `update-electron-app`](https://github.com/electron/update-electron-app) o [integrarlo direttamente con update.electronjs.org](https://github.com/electron/update.electronjs.org).

## Alternative

Se stai usando [electron-builder](https://github.com/electron-userland/electron-builder) per il pacchetto della tua app, puoi utilizzare il suo built-in updater. Per i dettagli, vedere [electron.build/auto-update](https://www.electron.build/auto-update).

Se la tua app è privata, potresti aver bisogno di eseguire il tuo server di aggiornamento. Ci sono una serie di strumenti open-source per questo, tra cui Zeit [Hazel](https://github.com/zeit/hazel) e Atlassian [Nucleo](https://github.com/atlassian/nucleus). Vedi il tutorial [Distribuire un server di aggiornamento](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) per ulteriori informazioni.

## Grazie

Grazie a [Julian Gruber](http://juliangruber.com/) per aver aiutato a progettare e costruire questo semplice e scalabile servizio web. Grazie alle persone di [Zeit](https://zeit.co) per il loro servizio open-source [Hazel](https://github.com/zeit/hazel) , dal quale abbiamo tratto ispirazione dal design. Grazie a [Samuel Attard](https://www.samuelattard.com/) per le recensioni di codice. Grazie alla comunità Electron per aver aiutato a testare questo servizio .

🌲 Ecco un futuro sempre verde per le app Electron!