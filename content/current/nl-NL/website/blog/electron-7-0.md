---
title: Electron 7.0.0
author:
  - sofianguy
  - ckerr
date: '2019-10-22'
---

Electron 7.0.0 is vrijgegeven! Het bevat upgrades naar Chromium 78, V8 7.8 en Node.js 12.8.1. We hebben een venster toegevoegd op Arm 64 release, snellere IPC methodes, een nieuw `nativeTheme` API, en nog veel meer!

---

Het Electron team is enthousiast over de release van Electron 7.0.0! Je kunt het installeren met npm via `npm install electron@latest` of via onze [releases website](https://electronjs.org/releases/stable). De versie wordt verpakt met upgrades, reparaties en nieuwe functies. We kunnen niet wachten om te zien wat je met hen bouwt! Ga door met het lezen van details over deze release en deel alle feedback die je hebt!

## Opmerkelijke wijzigingen
 * Stack upgrades:

   | Stapelen | Versie van Electron 6 | Versie in Electron 7 | Wat is nieuw                                                                                                                                                                                                                                                              |
   |:-------- |:--------------------- |:-------------------- |:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
   | Chromium | 76.0.3809.146         | **78.0.3905.1**      | [77](https://developers.google.com/web/updates/2019/09/nic77), [78](https://developers.google.com/web/updates/2019/10/nic78)                                                                                                                                              |
   | V8       | 7.6                   | **7.8**              | [7.7](https://v8.dev/blog/v8-release-77), [7.8](https://v8.dev/blog/v8-release-78)                                                                                                                                                                                        |
   | Node.js  | 12.4.0                | **12.8.1**           | [12.5](https://nodejs.org/en/blog/release/v12.5.0/), [12.6](https://nodejs.org/en/blog/release/v12.6.0/), [12.7](https://nodejs.org/en/blog/release/v12.7.0/), [12.8](https://nodejs.org/en/blog/release/v12.8.0/), [12.8.1](https://nodejs.org/en/blog/release/v12.8.1/) |
 * Windows toegevoegd op Arm (64 bit) release. [#18591](https://github.com/electron/electron/pull/18591), [#20112](https://github.com/electron/electron/pull/20112)
 * Toegevoegd `ipcRenderer.invoke()` en `ipcMain.handle()` voor asynchrone request/response-style IPC. Deze worden sterk aanbevolen via de `externe` module. Zie deze[De 'remote' module van Electron' voor meer informatie als schadelijk](https://medium.com/@nornagon/electrons-remote-module-considered-harmful-70d69500f31)" blogpost [#18449](https://github.com/electron/electron/pull/18449)
 * Toegevoegd `nativeTheme` API om wijzigingen in het thema en kleurenschema van het besturingssysteem te lezen en te beantwoorden. [#19758](https://github.com/electron/electron/pull/19758), [#20486](https://github.com/electron/electron/pull/20486)
 * Overgeschakeld naar een nieuwe TypeScript Definities [generator](https://github.com/electron/docs-parser). De resulterende definities zijn preciezer; dus als je TypeScript bouw mislukt, is dit waarschijnlijk de oorzaak. [#18103](https://github.com/electron/electron/pull/18103)

Zie de [7.0.0 release notes](https://github.com/electron/electron/releases/tag/v7.0.0) voor een langere lijst met wijzigingen.

## Breaking Changes

Meer informatie over deze en toekomstige wijzigingen is te vinden op de [geplande Breaking Changes](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md) pagina.

 * Verouderde API's verwijderd:
     * Ballback-gebaseerde versies van functies die nu beloftes gebruiken. [#17907](https://github.com/electron/electron/pull/17907)
     * `Tray.setHighlightMode()` (macOS). [#18981](https://github.com/electron/electron/pull/18981)
     * `app.enableMixedSandbox()` [#17894](https://github.com/electron/electron/pull/17894)
     * `app.getApplicationMenu()`,
     * `app.setApplicationMenu()`,
     * `powerMonitor.querySystemIdleState()`,
     * `powerMonitor.querySystemIdleTime()`,
     * `webFrame.setIsolatedWorldContentSecurityPolicy()`,
     * `webFrame.setIsolatedWorldHumanReadableName()`,
     * `webFrame.setIsolatedWorldSecurityOrigin()` [#18159](https://github.com/electron/electron/pull/18159)
 * `Session.clearAuthCache()` staat niet langer toe om de geledigde cache-vermeldingen te filteren. [#17970](https://github.com/electron/electron/pull/17970)
 * Oorspronkelijke interfaces op macOS (menus, dialogen, enz.) komen nu automatisch overeen met de donkere modus instelling op de machine van de gebruiker. [#19226](https://github.com/electron/electron/pull/19226)
 * Updated the `electron` module to use `@electron/get`.  De minimum ondersteunde node versie is nu Node 8. [#18413](https://github.com/electron/electron/pull/18413)
 * Het bestand `electron.asar` bestaat niet meer. Alle verpakkingsscripts die van het bestaan ervan afhankelijk zijn, moeten worden geactualiseerd. [#18577](https://github.com/electron/electron/pull/18577)

## Einde van de ondersteuning voor 4.x.y

Electron 4.x.y heeft eind van ondersteuning bereikt als volgens het ondersteuningsbeleid [van het project](https://electronjs.org/docs/tutorial/support#supported-versions). Ontwikkelaars en toepassingen worden aangemoedigd om te upgraden naar een nieuwere versie van Electron.

## App Feedback programma

We blijven ons [App Feedback Programma](https://electronjs.org/blog/app-feedback-program) gebruiken om te testen. Projecten die deelnemen aan dit programma test Electron betas op hun apps; en in ruil daarvoor krijgen de nieuwe bugs die ze vinden prioriteit voor de stabiele vrijlating. Als je deel wilt nemen of meer informatie wilt krijgen, [bekijk dan onze blog post over het programma](https://electronjs.org/blog/app-feedback-program).

## Wat is volgende

In de korte termijn. je kan verwachten dat het team zich blijft concentreren op het bijhouden van de ontwikkeling van de belangrijkste onderdelen die Electron vormen, inclusief Chromium, Node en V8. Hoewel we ons ervoor hoeden om geen beloften te doen over releasedatums, ons plan is nieuwe grote versies van Electron vrij te geven met nieuwe versies van deze componenten ongeveer kwartaal. De [tentatieve 8.0.0 schedule](https://electronjs.org/docs/tutorial/electron-timelines) kaarten de belangrijkste data in de ontwikkelingscyclus van Electron 8. Bekijk ook [ons versiedocument](https://electronjs.org/docs/tutorial/electron-versioning) voor meer gedetailleerde informatie over versiebeheer in Electron.

Voor informatie over geplande brekende wijzigingen in de aankomende versies van Electron, [zie onze geplande Breaking Changes doc](https://github.com/electron/electron/blob/master/docs/api/breaking-changes.md).
