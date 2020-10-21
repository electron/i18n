# Notificaties (Windows, Linux, macOS)

## Overview

Alle drie besturingssystemen bieden middelen om applicaties meldingen naar de gebruiker te sturen. De techniek om meldingen te tonen is anders voor de processen van Main en Renderer.

Voor het Renderer-proces, stelt Electron ontwikkelaars eenvoudig in staat om meldingen te verzenden met de [HTML5 Notificatie API](https://notifications.spec.whatwg.org/), met behulp van de huidige operating system native notification API's om het weer te geven.

Om meldingen in het hoofdproces te tonen, moet u de [Notificatie](../api/notification.md) module gebruiken.

## Voorbeeld

### Toon meldingen in het Renderer-proces

Ervan uitgaande dat je een werkende Electron applicatie hebt van de [Quick Start Guide](quick-start.md), voeg de volgende regel toe aan de `index. tml` bestand voor sluiten `</body>` tag:

```html
<script src="renderer.js"></script>
```

en voeg het bestand `renderer.js` toe:

```js
const myNotification = new Notification('Titel', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notificatie aangeklikt')
}
```

Na het starten van de Electron applicatie, zie je de melding:

![Notificatie in het Renderer-proces](../images/notification-renderer.png)

Als u de console opent en vervolgens op de melding klikt, je ziet het bericht dat werd gegenereerd na het activeren van de `onclick` gebeurtenis:

![Onklik bericht voor de melding](../images/message-notification-renderer.png)

### Toon meldingen in het hoofdproces

Vanaf een werkende toepassing uit de [Snelstartgids](quick-start.md), update het `main.js` bestand met de volgende regels:

```js
const { Notification } = require('electron')

function showNotification () {
  const notification = {
    title: 'Basic Notification',
    body: 'Notification from the Main process'
  }
  new Notification(notification).show()
}

app.whenReady().then(createWindow).then(showNotification)
```

Na het starten van de Electron applicatie, zie je de melding:

![Melding in het hoofdproces](../images/notification-main.png)

## Extra informatie

Hoewel code en ervaring van gebruikers met verschillende besturingssystemen overeenkomen, zijn er subtiele verschillen.

### Windows

* Op Windows 10 moet een snelkoppeling naar de app met een [Applicatie-gebruikers-ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) worden geïnstalleerd in het Start Menu. Dit kan worden overkill tijdens de ontwikkeling, dus het toevoegen van `node_modules\electron\dist\electron.exe` aan uw startmenu doet ook de truc. Navigeer naar het bestand in Verkenner met de rechtermuisknop en 'Pin om Menu te starten'. Daarna moet u de regel `app.setAppUserModelId(process.execPath)` toevoegen aan uw hoofdproces om meldingen te zien.
* Op Windows 8. en Windows 8, een snelkoppeling naar je app met een [Applicatie gebruiker Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) moet worden geïnstalleerd op het startscherm. Opmerking: deze hoeft niet aan het startscherm te worden vastgezet.
* Op Windows 7 werken meldingen via een aangepaste implementatie die visueel op de oorspronkelijke systemen lijkt.

Electron probeert het werk rond het Application User Model ID te automatiseren. Wanneer Electron wordt gebruikt samen met de installatie en update framework Squirrel, [snelkoppelingen zullen automatisch correct worden ingesteld](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Bovendien, Electron detecteert dat Squirrel werd gebruikt en zal `app.setAppUserModelId()` automatisch bellen met de juiste waarde. Tijdens de ontwikkeling kunt u zelf [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) moeten bellen.

Bovendien is de maximale lengte in Windows 8 voor het lichaam van meldingen 250 tekens, met het Windows-team dat aanbeveelt dat meldingen tot 200 tekens moeten worden gehouden. Dat gezegd hebbende, die beperking is verwijderd in Windows 10, met het Windows-team dat ontwikkelaars vraagt redelijk te zijn. Poging gigantische hoeveelheden tekst te verzenden naar de API (duizenden tekens) kan leiden tot instabiliteit.

#### Geavanceerde Notificaties

Later versies van Windows staan geavanceerde meldingen toe, met aangepaste sjablonen, afbeeldingen en andere flexibele elementen. Voor het verzenden van deze meldingen (van het hoofdproces of het proces van de renderer), gebruik je de gebruikerslandmodule [electron-windows-notificaties](https://github.com/felixrieseberg/electron-windows-notifications), die gebruik maakt van native Node addons om `ToastNotification` en `TileNotification` objecten te verzenden.

Tijdens meldingen inclusief knoppen werken met `electron-windows-meldingen`, het afhandelen van antwoorden vereist het gebruik van [`e-mail-interactive-meldingen`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), die helpt met het registreren van de vereiste COM componenten en met het bellen van je Electron app met de ingevoerde gebruikersgegevens.

#### Stille uren / Presentatiemodus

Om te bepalen of je wel of niet toestemming hebt om een melding te verzenden, gebruik de gebruikersland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Dit stelt u in staat om vooraf te bepalen of Windows al dan niet de melding stilletjes weg zal gooien.

### macOS

Notificaties zijn recht op macOS, maar u moet op de hoogte zijn van [Apple's Human Interface guidelines voor meldingen](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Merk op dat meldingen beperkt zijn tot 256 bytes in grootte en worden ingekort als je die limiet overschrijdt.

#### Geavanceerde Notificaties

Later versies van macOS toestaan voor meldingen met een invoerveld, waardoor de gebruiker snel kan reageren op een melding. Om meldingen met een invoerveld te verzenden, gebruik de userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

#### Niet storen / sessie status

Om te bepalen of je wel of niet toestemming hebt om een melding te versturen, gebruik je de gebruikerslandmodule [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Dit geeft je de mogelijkheid om vooraf te detecteren of de notificatie al dan niet wordt weergegeven.

### Linux

Notificaties worden verzonden met behulp van `libnotify` die meldingen kunnen weergeven op desktop omgeving die [Desktop Meldingen Specificatie](https://developer.gnome.org/notification-spec/), inclusief Cinnamon, Verlichting, eenheid, GNOME, KDE.
