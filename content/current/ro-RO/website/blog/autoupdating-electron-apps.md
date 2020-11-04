---
title: Autoactualizare mai ușoară pentru aplicațiile Open-Source
author: zeke
date: '2018-05-01'
---

Astăzi lansăm o sursă deschisă, gratuită; a găzduit [actualizări webservice](https://github.com/electron/update.electronjs.org) și companion [npm pachet](https://github.com/electron/update-electron-app) pentru a activa actualizări automate ușoare pentru aplicațiile Electron open-source. Acesta este un pas către responsabilizarea dezvoltatorilor de aplicații pentru a se gândi mai puțin la implementare și mai multe despre dezvoltarea de experiențe de înaltă calitate pentru utilizatorii lor.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Captură ecran actualizator">
    <figcaption>Noul modul de actualizare în acțiune</figcaption>
  </a>
</figure>

## Facilitarea vieții

Electron are un [autoUpdater](https://electronjs.org/docs/tutorial/updates) API care oferă aplicațiilor posibilitatea de a consuma metadate de la distanță pentru a verifica dacă există actualizări, descărcați-le în fundal și instalați-le automat.

Activarea acestor actualizări a fost un pas greoi în procesul de implementare pentru mai mulți dezvoltatori de aplicații Electron deoarece necesită un server web să fie implementat și întreținut doar pentru a servi metadatele istoricului versiunilor aplicației.

Astăzi anunțăm o nouă soluție de abandonare pentru actualizările automate ale aplicațiilor. Dacă aplicația dvs. Electron este într-un depozit public GitHub și utilizați Lansări GitHub pentru a publica versuri, puteți utiliza acest serviciu pentru a livra actualizări continue ale aplicațiilor către utilizatori.

## Utilizarea noului modul

Pentru a minimiza configurația din partea ta, am creat [update-electron-app](https://github.com/electron/update-electron-app), un modul npm care se integrează cu noul [update.electronjs.org](https://github.com/electron/update.electronjs.org) webservice.

Instaleaza modulul:

```sh
npm instalați update-electron-app
```

Sună-l de oriunde în procesul [principal al aplicației tale](https://electronjs.org/docs/glossary#main-process):

```js
require('update-electron-app')()
```

Asta e tot! Modulul va verifica actualizările la pornirea aplicației, apoi la fiecare zece minute. Atunci când se găseşte o actualizare, aceasta se va descărca automat în fundal şi un dialog va fi afişat atunci când actualizarea este gata.

## Migrarea aplicațiilor existente

Aplicațiile care folosesc deja API-ul autoUpdater al Electron pot folosi și acest serviciu. Pentru a face acest lucru, puteți [personaliza `actualizarea-electron-app`](https://github.com/electron/update-electron-app) modulul sau [integra direct cu update.electronjs.org](https://github.com/electron/update.electronjs.org).

## Alternative

Dacă folosiți [electron-builder](https://github.com/electron-userland/electron-builder) pentru a vă ambala aplicația, puteți folosi actualizatorul încorporat. Pentru detalii, a se vedea [electron.build/auto-update](https://www.electron.build/auto-update).

Dacă aplicația ta este privată, ar putea fi nevoie să rulezi propriul server de actualizare. Există o serie de instrumente open-source pentru asta, inclusiv Zeit [Hazel](https://github.com/zeit/hazel) şi Atlassian [Nucleus](https://github.com/atlassian/nucleus). Vezi tutorialul [Deploying an Update Server](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) pentru mai multe informații.

## Mulțumim

Mulțumită [Julian Gruber](http://juliangruber.com/) pentru că a ajutat la proiectare și a construit acest serviciu web simplu și scalabil. Mulțumesc oamenilor de la [Zeit](https://zeit.co) pentru serviciul lor open-source [Hazel](https://github.com/zeit/hazel) , din care am desenat inspirația de proiectare. Mulțumită [Samuel Attard](https://www.samuelattard.com/) pentru evaluările codului. Mulțumită comunității Electron pentru că a ajutat la testarea acestui serviciu

🌲 Iată un viitor verde pentru aplicațiile Electron!