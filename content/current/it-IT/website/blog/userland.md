---
title: Electron Userland
author: zeke
date: '2016-12-20'
---

Abbiamo aggiunto una nuova sezione [userland](https://electronjs.org/userland) a il sito di Electron per aiutare gli utenti a scoprire le persone, pacchetti, e applicazioni che compongono il nostro fiorente ecosistema open-source.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Origini di Userland

Userland è dove le persone nelle comunità di software si riuniscono per condividere strumenti e idee. The term originated in the Unix community, where it referred to any program that ran outside of the kernel, but today it means something more. Quando le persone nella comunità di Javascript di oggi si riferiscono al userland, di solito parlano del registro dei pacchetti [npm](http://npm.im). È qui che avviene la maggior parte della sperimentazione e dell’innovazione , mentre il Nodo e il linguaggio JavaScript (come il kernel Unix) conservano un insieme relativamente piccolo e stabile di funzionalità di base.

## Nodo ed Electron

Come Node, Electron ha un piccolo set di API di base. Questi forniscono le caratteristiche di base necessarie per lo sviluppo di applicazioni desktop multi-piattaforma. Questa filosofia progettuale consente a Electron di rimanere uno strumento flessibile senza essere eccessivamente prescrittivo su come dovrebbe essere usato.

Userland è la controparte di "core", consentendo agli utenti di creare e condividere strumenti che estendono la funzionalità di Electron.

## Raccolta dati

Per comprendere meglio le tendenze del nostro ecosistema, abbiamo analizzato i metadati di 15, 00 repository pubblici GitHub che dipendono da `electron` o `electron-prebuilt`

Abbiamo utilizzato l'API [di GitHub](https://developer.github.com/v3/), le [librerie. o API](https://libraries.io/api), e il registro npm per raccogliere informazioni sulle dipendenze, dipendenze di sviluppo, dipendenti, autori dei pacchetti, contributori repo, conteggi download, conteggi fork, conteggio stargazer , ecc.

Abbiamo quindi utilizzato questi dati per generare i seguenti rapporti:

- [Dipendenze per lo sviluppo dell'app](https://electronjs.org/userland/dev_dependencies): I pacchetti più spesso elencati come `devDependencies` nelle app Electron.
- [Contributori GitHub](https://electronjs.org/userland/github_contributors): utenti GitHub che hanno contribuito a numerosi repository GitHub relativi a Electron.
- [Dipendenze del pacchetto](https://electronjs.org/userland/package_dependencies): Pacchetti npm correlati all'elettronica che dipendono spesso da altri pacchetti npm.
- [Starred Apps](https://electronjs.org/userland/starred_apps): App Electron (che non sono pacchetti npm) con numerosi stargazer.
- [Pacchetti più scaricati](https://electronjs.org/userland/most_downloaded_packages): Pacchetti npm elettronici che vengono scaricati molto.
- [Dipendenze App](https://electronjs.org/userland/dependencies): I pacchetti più spesso elencati come `dipendenze` nelle app Electron.
- [Autori Pacchetto](https://electronjs.org/userland/package_authors): Gli autori più prolifici dei pacchetti npm di Electron-correlati.

## Risultati Del Filtraggio

Rapporti come [dipendenze dell'app](https://electronjs.org/userland/dependencies) e [app stellate](https://electronjs.org/userland/starred_apps) che elencano i pacchetti, le app e i repos hanno un input di testo che può essere utilizzato per filtrare i risultati.

Come si digita in questo input, l'URL della pagina viene aggiornato dinamicamente. Questo ti permette di copiare un URL che rappresenta una particolare fetta di dati userland, poi condividerlo con altri.

[![babel](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Altro a venire

Questa prima serie di relazioni è solo l'inizio. Continueremo a raccogliere dati su come la comunità sta costruendo Electron, e aggiungeremo nuovi report al sito web.

Tutti gli strumenti utilizzati per raccogliere e visualizzare questi dati sono open-source:

- [electron/electronjs.org](https://github.com/electron/electron.atom): Il sito web di Electron.
- [electron/electron-userland-reports](https://github.com/electron/electron-userland-reports): Slices of data about packages, repos, and users in Electron userland.
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron): Tutti i repository pubblici su GitHub che dipendono da `electron` o `electron-prebuilt`
- [electron/electron-npm-packages](https://github.com/zeke/electron-npm-packages): Tutti i pacchetti npm che menzionano `electron` nel loro file `package.json`.

Se avete idee su come migliorare queste relazioni, faccelo sapere [aprendo un problema sul repository del sito](https://github.com/electron/electronjs.org/issues/new) o uno qualsiasi dei repos.

Grazie a voi, la comunità Electron, per aver reso userland quello che è oggi!

