---
title: Campioni Semplici Di Electron
author: zeke
date: '2017-01-19'
---

Recentemente abbiamo ospitato un hackathon di Electron al quartier generale di GitHub per i membri di [Hackbright Academy](https://hackbrightacademy.com), una scuola di programmazione per le donne fondata a San Francisco. Per aiutare i partecipanti ad avviare i loro progetti, la nostra [Kevin Sawicki](https://github.com/kevinsawicki) ha creato alcune applicazioni Electron di esempio.

---

Se sei nuovo per lo sviluppo di Electron o non hai ancora provato, queste applicazioni di esempio sono un ottimo punto di partenza. Sono piccoli, facili da leggere, e il codice è fortemente commentato per spiegare come funziona tutto.

Per iniziare, clonare questo repository:

```sh
git clone https://github.com/electron/simple-samples
```

Per eseguire una qualsiasi delle app sottostanti, cambia nella directory dell'app, installa le dipendenze, quindi avvia:

```sh
cd activity-monitor
npm install
npm start
```

## Monitoraggio Attività

Mostra un grafico a ciambella del sistema CPU, utente e tempo di attività inattivo.

[![Screenshot](https://cloud.githubusercontent.com/assets/671378/20894933/3882a328-bacc-11e6-865b-4bc1c5ac7ec7.png)](https://github.com/kevinsawicki/electron-samples/tree/master/activity-monitor)

## Hash

Mostra i valori di hash del testo inserito utilizzando diversi algoritmi.

[![screenshot](https://cloud.githubusercontent.com/assets/671378/21204178/de96fa12-c20a-11e6-8e94-f5b16e676eee.png)](https://github.com/kevinsawicki/electron-samples/tree/master/hash)

## Specchio

Riproduce un video della fotocamera del computer ad una dimensione massimizzata come guardare in uno specchio. Include un effetto filtro arcobaleno opzionale che utilizza animazioni CSS.

## Prezzi

Mostra il prezzo corrente di olio, oro e argento utilizzando l'API Finanza Yahoo.

[![screenshot](https://cloud.githubusercontent.com/assets/671378/21198004/6e7a3798-c1f2-11e6-8228-495de90b7797.png)](https://github.com/kevinsawicki/electron-samples/tree/master/prices)

## URL

Carica un URL passato sulla riga di comando in una finestra.

## Altre Risorse

Speriamo che queste applicazioni ti aiutino a iniziare a utilizzare Electron. Ecco una manciata di altre risorse per imparare di più:

- [electron-quick-start](https://github.com/electron/electron-quick-start): Una piastra di caldaia di applicazione Electron minima.
- [Electron API Demos](https://github.com/electron/electron-api-demos): un'app interattiva che mostra le caratteristiche principali dell'API Electron
- [electronjs.org/docs/all](https://electronjs.org/docs/all/): Tutta la documentazione di Electron insieme su una singola pagina ricercabile.
- [hokein/electron-sample-apps](https://github.com/hokein/electron-sample-apps): Un'altra raccolta di applicazioni di esempio per Electron, compilata dal manutentore di Electron [Haojian Wu](https://github.com/hokein).
- [awesome-electron](https://github.com/sindresorhus/awesome-electron) - Un repository GitHub che raccoglie i più recenti e più grandi tutorial, libri, video, ecc.