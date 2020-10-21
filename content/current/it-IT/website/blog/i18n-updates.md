---
title: "Aggiornamenti Internazionalizzazione"
author: vanessayuenn
date: '2018-06-20'
---

Fin dal [lancio](https://electronjs.org/blog/new-website) del nuovo sito web di Electron internazionalizzato, abbiamo lavorato sodo per rendere l'esperienza di sviluppo di Electron ancora più accessibile agli sviluppatori fuori dal mondo di lingua inglese.

Così qui siamo con alcuni eccitanti aggiornamenti i18n!

---

## 🌐 Lingua Attiva/Disattiva

Lo sapevate che molte persone che leggono la documentazione tradotta spesso fanno riferimento alla documentazione originale inglese? Fanno questo per familiarizzarsi con i documenti inglesi, e per evitare traduzioni obsolete o imprecise, che è un avvertimento di documentazioni internazionalizzate.

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/35578586-cae629e2-05e4-11e8-9431-0278f8c2b39f.gif" alt="Lingua attiva/disattiva la documentazione di Electron">
</figure>

Per rendere più facile il riferimento incrociato ai docs inglesi, abbiamo recentemente spedito una funzione che consente di attivare o disattivare senza soluzione di continuità una sezione della documentazione Electron tra l'inglese e qualsiasi lingua tu stia visualizzando il sito web. Il toggle della lingua verrà visualizzato fino a quando si dispone di un locale non inglese selezionato sul sito.

## ⚡ Accesso rapido alla pagina di traduzione

<figure>
  <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/36511386-c32e31fc-1766-11e8-8484-7466be6a5eb0.png" alt="Nuovo footer di documentazione Electron in Giapponese">
  <figcaption>Il piè di pagina della documentazione di Electron in giapponese</figcaption>
</figure>

Notare un errore di battitura o una traduzione errata mentre stai leggendo la documentazione? Non è più necessario accedere a Crowdin, scegliere il locale, trovare il file che si desidera la correzione, ecc ecc. Invece, puoi semplicemente scorrere verso il basso del documento detto e fare clic su "Traduci questo documento" (o l'equivalente nella tua lingua). Voila! Sei portato direttamente alla pagina di traduzione di Crowdin. Ora applica la tua magia di traduzione!

## 📈 Alcune Statistiche

Da quando abbiamo pubblicizzato lo sforzo di documentazione di Electron i18n, abbiamo visto _una crescita enorme_ dei contributi alla traduzione da parte di membri della comunità di Electron provenienti da tutto il mondo. Ad oggi, abbiamo **1.719.029 stringhe tradotte, da 1.066 traduttori della comunità, e in 25 lingue**.

<figure>
  <a href="https://crowdin.com/project/electron/">
    <img class="screenshot" src="https://user-images.githubusercontent.com/6842965/41649826-ca26037c-747c-11e8-9594-5ce12d2978e2.png" alt="Previsioni di traduzione fornite da Crowdin">
    <figcaption>Previsioni di traduzione fornite da Crowdin</figcaption>
  </a>
</figure>

Ecco un divertente grafico che mostra la quantità approssimativa di tempo necessario per tradurre il progetto in ogni lingua se viene conservato il tempo esistente (basato sull'attività del progetto negli ultimi 14 giorni al momento della scrittura).

## 📃 Sondaggio Traduttori

Vorremmo dare un enorme ❤️ grazie ❤️ a tutti coloro che hanno contribuito a migliorare Electron! Al fine di riconoscere correttamente il duro lavoro della nostra comunità di traduttori, abbiamo creato un sondaggio per raccogliere alcune informazioni (vale a dire la mappatura tra i loro nomi utente Crowdin e Github) sui nostri traduttori.

Se sei uno dei nostri incredibili traduttori, ti preghiamo di prendere qualche minuto per riempire questo out: https://goo.gl/forms/b46sjdcHmlpV0GKT2.

## 🙌 Sforzo Di Internazionalizzazione Di Node

A causa del successo dell'iniziativa i18n di Electron, Node.js ha deciso di modellare [il loro rinnovato sforzo i18n](https://github.com/nodejs/i18n) dopo il modello che usiamo pure! 🎉 Il [Node. s iniziativa i18n](https://github.com/nodejs/i18n) è stata lanciata e ha guadagnato grande slancio, ma si può stil leggere circa la proposta iniziale e ragionare dietro di esso [qui](https://medium.com/the-node-js-collection/internationalizing-node-js-fe7761798b0a).

## 🔦 Guida Di Contributing

Se siete interessati a unirvi al nostro sforzo per rendere Electron più internazionale amichevole, abbiamo una mano-dandy [guida per contribuire](https://github.com/electron/i18n/blob/master/contributing.md) per aiutarti a iniziare. Buona internazionalizzazione! 📚
