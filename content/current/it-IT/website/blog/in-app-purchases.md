---
title: "Novità in Electron 2: Acquisti in-app"
author: zeke
date: '2018-04-04'
---
  
La nuova linea di rilascio Electron 2.0 è [confezionata](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) con nuove funzionalità e correzioni. Uno dei punti salienti di questa nuova versione principale è un nuovo [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) per Apple [Mac App Store](https://support.apple.com/en-us/HT202023).

---

Gli acquisti in-app consentono di acquistare direttamente contenuti o abbonamenti dall'interno delle app. Questo dà agli sviluppatori un modo semplice per abbracciare il [modello di business freemium](https://developer.apple.com/app-store/freemium-business-model/), in cui gli utenti non pagano nulla per scaricare un'app e sono offerti opzionali acquisti in-app per funzioni premium, contenuti aggiuntivi o abbonamenti.

La nuova API è stata aggiunta a Electron dal collaboratore [Adrien Fery](https://github.com/AdrienFery) per abilitare gli acquisti in-app in [Amanote](https://amanote.com/), un'app Electron per lezioni e conferenze . Amanote è libero di scaricare e permette di aggiungere note chiare e strutturate ai PDF, con caratteristiche come formule matematiche, disegni, registrazione audio e altro ancora.

Da quando si è aggiunto il supporto per l'acquisto in-app alla versione Mac di Amanote, Adrien ha notato un **aumento del 40% delle vendite**!

## Per Iniziare

La nuova API [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) è già arrivata nell'ultima beta di Electron:

```sh
npm i -D electron@beta
```

I documenti per l'API possono essere [trovati su GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), e Adrien è stato abbastanza gentile da scrivere un tutorial su come utilizzare l'API. Per iniziare ad aggiungere acquisti in-app alla tua app, [vedi il tutorial](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

Ulteriori [miglioramenti all'API](https://github.com/electron/electron/pull/12464) sono nelle opere, e presto arriveranno in una prossima release di Electron beta.

## Windows Potrebbe Essere Successivo

In seguito, Adrien spera di aprire un nuovo canale di entrate per Amanote aggiungendo il supporto per gli acquisti in-app di Microsoft Store in Electron. Rimani sintonizzato per sviluppi su questo!