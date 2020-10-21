# Windows taakbalk

Electron heeft API's om het app pictogram in de Windows taakbalk te configureren. Ondersteunde zijn de [creatie van een `JumpList`](#jumplist), [aangepaste miniaturen en werkbalken](#thumbnail-toolbars), [iconen overlappen](#icon-overlays-in-taskbar), en het zogenaamde ["Flash Frame" effect](#flash-frame), maar Electron gebruikt ook het dock pictogram van de app om cross-platform functies te implementeren van [recente documenten](./recent-documents.md) en [applicatievoortgang](./progress-bar.md).

## JumpLijst

Windows stelt apps in staat een aangepast contextmenu te definiëren dat wordt weergegeven wanneer gebruikers met de rechtermuisknop op het app-pictogram in de taakbalk klikken. Dat contextmenu wordt `JumpList` genoemd. Je specificeert aangepaste acties in de `Taken` categorie van JumpList, zoals geciteerd van MSDN:

> Toepassingen definiëren taken gebaseerd op zowel de functies van het programma als de sleutel dingen die een gebruiker moet doen met hen. Taken moeten contextvrij zijn, in dat de applicatie niet hoeft te worden uitgevoerd om ze te laten werken. Ze moeten ook de statistisch meest voorkomende acties zijn die een normale gebruiker zou uitvoeren in een applicatie, zoals het opstellen van een e-mail bericht of het openen van de kalender in een e-mail programma, een nieuw document maken in een woord processor, start een applicatie in een bepaalde modus, of start een van zijn subopdrachten. Een app zou het menu niet moeten plakken met geavanceerde functies die standaard gebruikers niet nodig hebben of eenmalige acties zoals registratie. Gebruik geen taken voor promotie-items zoals upgrades of speciale aanbiedingen.
> 
> Het is sterk aan te bevelen dat de takenlijst statisch is. Het moet gelijk blijven aan ongeacht de status of status van de aanvraag. Hoewel het mogelijk is om de lijst dynamisch te variëren, je zou moeten overwegen dat dit de gebruiker kan verwarren die niet verwacht dat deel van de doellijst verandert.

__Taken van Internet Explorer:__

![IJs](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

In tegenstelling tot het dock menu in macOS is dit een echt menu, taken in Windows werken zoals applicatie snelkoppelingen die de gebruiker op een taak klikt een programma zal worden uitgevoerd met de opgegeven argumenten.

Om gebruikerstaken voor uw applicatie in te stellen, kunt u [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) API gebruiken:

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    programma: process. xecPath,
    argumenten: '--new-window',
    iconPath: proces. xecPath,
    iconIndex: 0,
    titel: 'Nieuw venster',
    beschrijving: 'Maak een nieuw venster'
  }
])
```

Om uw takenlijst op te schonen, bel `app.setUserTasks` met een lege array:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

De taken van de gebruiker zullen nog steeds getoond worden, zelfs nadat uw applicatie is gesloten, dus het pictogram en het programmapad dat is opgegeven voor een taak moeten bestaan totdat uw applicatie gedeïnstalleerd is.


## Thumbnail Toolbars

In Windows kunt u een miniatuur werkbalk met opgegeven knoppen in een taakbalk lay-out van een programmavenster toevoegen. Het biedt gebruikers een manier om toegang te krijgen tot een venster zonder het venster te herstellen of te activeren.

Van MSDN, wordt geïllustreerd:

> Deze toolbar is de bekende standaard standaard werkbalk. Het heeft een maximaal zeven knoppen. ID, afbeelding, tooltip en staat van elke knop worden gedefinieerd in een structuur, die vervolgens wordt doorgegeven aan de taakbalk. De applicatie kan knoppen tonen, uitschakelen of verbergen van de thumbnail werkbalk zoals vereist door de huidige status.
> 
> Windows Media Player kan bijvoorbeeld standaard media transport bediening aanbieden zoals afspelen, pauzeren, dempen en stoppen.

__Thumbnail werkbalk van Windows Media Player:__

![speler](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

U kunt [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) gebruiken om thumbnail werkbalk in uw applicatie in te stellen:

```javascript
const { BrowserWindow } = require('electron')
const pad = require('pad')

const win = new BrowserWindow()

win. etThumbarKnoppen ([
  {
    tooltip: 'button1',
    pictogram: pad. oin(__dirname, 'button1.png'),
    klik () { console. og('button1 aangeklikt') }
  }, {
    tooltip: 'button2',
    pictogram: path.join(__dirname, 'button2. ng'),
    markeringen: ['ingeschakeld', 'dismissonclick'],
    klik () { console. og('button2 aangeklikt.') }
  }
])
```

Om miniatuur werkbalkknoppen schoon te maken, roep gewoon `BrowserWindow.setThumbarknoppen` op met een lege array:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```


## Pictogram Overlays in de taakbalk

In Windows kan een taakbalkknop een kleine overlay gebruiken om de applicatie status weer te geven, zoals geciteerd uit MSDN:

> Pictogram overlays dienen als een contextuele melding van status, en zijn bedoeld om de noodzaak te ontzeggen van een apart statuspictogram voor meldingengebied om die informatie aan de gebruiker te communiceren. Bijvoorbeeld, de nieuwe mailstatus in Microsoft Outlook, momenteel weergegeven in het notificatiegebied, kan nu worden aangegeven via een overlay op de taakbalk. Nogmaals, je moet tijdens de ontwikkelcyclus beslissen welke methode het beste is voor je toepassing. Overlay pictogrammen zijn bedoeld om belangrijke, oude status of meldingen zoals netwerkstatus, berichtgever status of nieuwe mail te leveren. De gebruiker moet niet worden gepresenteerd met voortdurend veranderende overlays of animaties.

__Overlay op taakbalk knop:__

![Overlay op taakbalk knop](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

Om het overlay pictogram voor een venster in te stellen, kunt u de [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API gebruiken:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Beschrijving voor overlay')
```


## Flash Frame

Op Windows kunt u de taakbalkknop markeren om de aandacht van de gebruiker te krijgen. Dit is vergelijkbaar met het uitklappen van het dock-pictogram op macOS. Van de MSDN-referentie documentatie:

> Meestal wordt een venster geflasht om de gebruiker te informeren dat het venster aandacht vereist, maar dat het momenteel niet het toetsenbord focus heeft.

Om de BrowserWindow taskbar knop te flashen, kun je de [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API gebruiken:

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Vergeet niet om de `flashFrame` methode met `false` aan te roepen om het flash uit te schakelen. In het bovenstaande voorbeeld, wordt het aangeroepen wanneer het venster in focus komt, maar je kan een time-out of een andere event gebruiken om het uit te schakelen.
