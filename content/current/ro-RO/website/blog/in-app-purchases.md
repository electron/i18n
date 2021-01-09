---
title: "Nou în Electron 2: Achiziții în aplicație"
author: zeke
date: '2018-04-04'
---
  
Noua linie de lansare Electron 2.0 este [împachetată](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) cu funcții noi și reparații. Unul dintre punctele cheie ale acestei noi versiuni majore este noul [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) pentru Apple [Mac App Store](https://support.apple.com/en-us/HT202023).

---

Achizițiile în aplicație permit achiziționarea directă a conținutului sau a abonamentelor de la din aplicații. Acest lucru oferă dezvoltatorilor o modalitate ușoară de a îmbrățișa [modelul freemium business](https://developer.apple.com/app-store/freemium-business-model/), unde, utilizatorii nu plătesc nimic pentru a descărca o aplicație și li se oferă opțional achiziții în aplicație pentru caracteristici premium, conținut suplimentar sau abonamente.

Noul API a fost adăugat la Electron de către contribuitorul comunității [Adrien Fery](https://github.com/AdrienFery) pentru a activa achizițiile în aplicație în [Amanote](https://amanote.com/), o aplicație Electron care ia notiță pentru conferințe și conferințe. Amanote este gratuit de descărcat și permite adăugarea de note clare și structurate la PDF-uri, cu caracteristici precum formule matematice, desene, înregistrări audio și multe altele.

De la adăugarea suportului pentru cumpărături în aplicație la versiunea Mac a Amanote, Adrien a remarcat o creștere de **40% a vânzărilor**!

## Noțiuni de bază

Noul [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API a aterizat deja în ultima versiune Electron beta:

```sh
npm i -D electron@beta
```

Documentele pentru API pot fi [găsite pe GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), și Adrien au fost destul de amabile pentru a scrie un tutorial despre cum să folosești API. Pentru a începe să adaugi în aplicație achiziții în aplicație, [vezi tutorialul](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

Mai multe [îmbunătățiri la API](https://github.com/electron/electron/pull/12464) sunt în lucru, și în curând vor ajunge la o versiune Electron beta.

## Windows ar putea fi următorul

În continuare, Adrien speră să deschidă un nou canal de venit pentru Amanote adăugând suport pentru cumpărăturile in-app Microsoft Store în Electron. Rămâneți la curent cu dezvoltări pe asta!