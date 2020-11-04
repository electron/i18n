---
title: "Usare GN per costruire Electron"
author: nornagon
date: '2018-09-05'
---

Electron ora utilizza GN per costruire se stesso. Ecco una discussione del perché.

---

# GYP e GN

Quando Electron è stato rilasciato per la prima volta nel 2013, la configurazione di costruzione di Chromium è stata scritta con [GYP](https://gyp.gsrc.io/), breve per "Genera i tuoi progetti".

Nel 2014, il progetto Chromium ha introdotto un nuovo strumento di configurazione di build chiamato [GN](https://gn.googlesource.com/gn/) (breve per "Genera [Ninja](https://ninja-build.org/)") I file di build di Chromium sono stati migrati a GN e GYP è stato rimosso dal codice sorgente.

Electron ha storicamente mantenuto una separazione tra il principale [codice Electron](https://github.com/electron/electron) e [libchromiumcontent](https://github.com/electron/libchromiumcontent), la parte di Electron che avvolge il sottomodulo 'content' di Chromium. Electron ha continuato usando GYP, mentre libchromiumcontent -- come un sottoinsieme di cromo -- è passato a GN quando Cromo ha fatto.

Come gli ingranaggi che non abbastanza maglia, c'era attrito tra l'uso dei due sistemi di costruzione. Mantenere la compatibilità era a rischio di errori, dai flag del compilatore e `#definisce` che doveva essere mantenuta meticolosamente sincronizzata tra Chromium, Node, V8 ed Electron.

Per affrontare questo problema, il team Electron ha lavorato per spostare tutto in GN. Oggi, il [commit](https://github.com/electron/electron/pull/14097) per rimuovere l'ultimo codice GYP da Electron è stato atterrato nel master.

# Che cosa significa per te

Se stai contribuendo a Electron stesso, il processo di verifica e costruzione di Electron da `master` o 4. .0 è molto diverso da quello che era in 3.0.0 e prima. Vedi le istruzioni [GN build](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) per i dettagli.

Se stai sviluppando un'app con Electron, ci sono alcune modifiche minori che potresti notare nel nuovo Electron 4. .0-notte; ma più che probabilmente, il cambiamento di Electron's nel sistema di costruzione sarà totalmente trasparente per voi.

# Che cosa significa per Electron

GN è [più veloce](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) di GYP e i suoi file sono più leggibili e mantenibili. Inoltre, speriamo che l'utilizzo di un singolo sistema di configurazione di build riduca il lavoro necessario per aggiornare Electron alle nuove versioni di Chromium.

 * E 'già aiutato lo sviluppo su Electron 4.0.0 sostanzialmente perché Chromium 67 ha rimosso il supporto per MSVC e commutato a costruire con Clang su Windows. Con il GN build, ereditiamo tutti i comandi compilatore da Chromium direttamente, così abbiamo ottenuto Clang build su Windows gratis!

 * È stato anche reso più facile per Electron utilizzare [BoringSSL](https://boringssl.googlesource.com/boringssl/) in una build unificata su Electron, Cromo, e Nodo -- qualcosa che era [problematico prima](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
