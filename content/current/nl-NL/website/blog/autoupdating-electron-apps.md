---
title: Makkelijker AutoUpdaten voor Open-Source Apps
author: zeke
date: '2018-05-01'
---

Vandaag brengen we een gratis open-source vrij, [update webservice](https://github.com/electron/update.electronjs.org) en kameraad [npm package](https://github.com/electron/update-electron-app) om eenvoudige automatische updates voor open-source Electron apps mogelijk te maken. Dit is een stap in de richting van het empowereren van app-ontwikkelaars om minder na te denken over implementatie en meer over het ontwikkelen van hoogwaardige ervaringen voor hun gebruikers.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Schermafbeelding Updater">
    <figcaption>De nieuwe updater module in actie</figcaption>
  </a>
</figure>

## Maak het leven gemakkelijker

Electron heeft een [autoUpdater](https://electronjs.org/docs/tutorial/updates) API die apps de mogelijkheid geeft om metadata te gebruiken van een extern eindpunt om te controleren op updates, download ze op de achtergrond en installeer ze automatisch.

Het inschakelen van deze updates is voor veel Electron app-ontwikkelaars een omslachtige stap geweest in het implementatieproces omdat het een webserver vereist en alleen maar om app version history metadata te serveren.

Vandaag kondigen we een nieuwe drop-in oplossing aan voor automatische app updates. Als je Electron app zich in een openbare GitHub repository bevindt en je gebruik maakt van GitHub Releases om versies te publiceren, u kunt deze service gebruiken om continue app updates te leveren aan uw gebruikers.

## De nieuwe module gebruiken

Om de configuratie te minimaliseren, hebben we [de e-electron-app](https://github.com/electron/update-electron-app)gecreëerd, een npm module die integreert met de nieuwe [update.electronjs.org](https://github.com/electron/update.electronjs.org) webservice.

Installeer de module:

```sh
npm installatie update-electron-app
```

Bel van overal in het hoofdproces van uw app [](https://electronjs.org/docs/glossary#main-process):

```js
require('update-electron-app')()
```

Dat is het! Deze module zal controleren op updates bij het opstarten van de app, vervolgens elke tien minuten. Wanneer een update is gevonden, wordt het automatisch gedownload op de achtergrond en wordt een dialoogvenster weergegeven wanneer de update klaar is.

## Bestaande apps migreren

Apps die al gebruik maken van de autoUpdater API van Electron, kunnen ook deze service gebruiken. Om dit te doen, kunt u [aanpassen aan `de update-electron-app`](https://github.com/electron/update-electron-app) module of [direct integreren met de update.electronjs.org](https://github.com/electron/update.electronjs.org).

## Alternatieven

Als je [electron-builder](https://github.com/electron-userland/electron-builder) gebruikt om je app te verpakken, kun je de ingebouwde update gebruiken. Voor details, zie [electron.build/auto-update](https://www.electron.build/auto-update).

Als uw app privé is, moet u mogelijk uw eigen updateserver uitvoeren. Er zijn een aantal open-source gereedschappen hiervoor, waaronder Zeit [Hazel](https://github.com/zeit/hazel) en Atlassian [Nucleus](https://github.com/atlassian/nucleus). Zie de [Een Update Server](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) handleiding implementeren voor meer informatie.

## Bedankt

Dankzij [Julian Gruber](http://juliangruber.com/) voor het helpen ontwerpen en bouwen van deze eenvoudige en schaalbare webservice. Dankzij de mensen van [Zeit](https://zeit.co) voor hun open-source [Hazel](https://github.com/zeit/hazel) service, waaruit we ontwerpinspiratie ontvingen. Dankzij [Samuel Attard](https://www.samuelattard.com/) voor de code beoordelingen. Dank aan de Electron community voor het helpen testen van deze service.

:evergreen_tree Hier is een evergroene toekomst voor Electron apps!