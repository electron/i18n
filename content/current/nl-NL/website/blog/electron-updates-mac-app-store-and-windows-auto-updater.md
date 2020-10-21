---
title: Mac App Store en Windows Auto Updater op Electron
author: jlord
date: '2015-11-05'
---

Electron heeft onlangs twee leuke functies toegevoegd: een compatibele Mac App Store en een ingebouwde Windows automatische updater.

---

## Mac App Store ondersteuning

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

Vanaf `v0.34.0` bevat elke Electron release een build die compatibel is met de Mac App Store. Eerder zou een op Electron gebouwde applicatie niet voldoen aan de vereisten van Apple voor de Mac App Store. De meeste van deze vereisten zijn gerelateerd aan het gebruik van particuliere API's. Om Electron zo te sandboxen dat het voldoet aan de vereisten moet er twee modules worden verwijderd:

- `crash-reporter`
- `auto-update`

Daarnaast zijn sommige gedragingen veranderd met betrekking tot het detecteren van DNS-wijzigingen, video-opname en toegankelijkheidsfuncties. U kunt meer lezen over de wijzigingen en [uw app verzenden in de Mac App store](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) in de documentatie. De distributies zijn te vinden op de [Electron releases pagina](https://github.com/electron/electron/releases), voorafgegaan door `mas-`.

Gerelateerde Pull Requests: [electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Windows Auto Updater

In Electron `v0.34.1` is de `auto-updater` module verbeterd om met [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows) te werken. Dit betekent dat Electron met eenvoudige manieren om uw app automatisch bij te werken op zowel OS X als Windows. U kunt meer lezen op [instelling van uw app voor automatisch bijwerken op Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) in de documentatie.

Gerelateerde Pull Request: [electron#1984](https://github.com/electron/electron/pull/1984)

