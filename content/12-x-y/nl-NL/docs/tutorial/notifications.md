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

* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Dit kan worden overkill tijdens de ontwikkeling, dus het toevoegen van `node_modules\electron\dist\electron.exe` aan uw startmenu doet ook de truc. Navigeer naar het bestand in Verkenner met de rechtermuisknop en 'Pin om Menu te starten'. Daarna moet u de regel `app.setAppUserModelId(process.execPath)` toevoegen aan uw hoofdproces om meldingen te zien.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Opmerking: deze hoeft niet aan het startscherm te worden vastgezet.
* Op Windows 7 werken meldingen via een aangepaste implementatie die visueel op de oorspronkelijke systemen lijkt.

Electron probeert het werk rond het Application User Model ID te automatiseren. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Bovendien, Electron detecteert dat Squirrel werd gebruikt en zal `app.setAppUserModelId()` automatisch bellen met de juiste waarde. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Bovendien is de maximale lengte in Windows 8 voor het lichaam van meldingen 250 tekens, met het Windows-team dat aanbeveelt dat meldingen tot 200 tekens moeten worden gehouden. Dat gezegd hebbende, die beperking is verwijderd in Windows 10, met het Windows-team dat ontwikkelaars vraagt redelijk te zijn. Poging gigantische hoeveelheden tekst te verzenden naar de API (duizenden tekens) kan leiden tot instabiliteit.

#### Geavanceerde Notificaties

Later versies van Windows staan geavanceerde meldingen toe, met aangepaste sjablonen, afbeeldingen en andere flexibele elementen. Voor het verzenden van deze meldingen (van het hoofdproces of het proces van de renderer), gebruik je de gebruikerslandmodule [electron-windows-notificaties](https://github.com/felixrieseberg/electron-windows-notifications), die gebruik maakt van native Node addons om `ToastNotification` en `TileNotification` objecten te verzenden.

Tijdens meldingen inclusief knoppen werken met `electron-windows-meldingen`, het afhandelen van antwoorden vereist het gebruik van [`e-mail-interactive-meldingen`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), die helpt met het registreren van de vereiste COM componenten en met het bellen van je Electron app met de ingevoerde gebruikersgegevens.

#### Stille uren / Presentatiemodus

Om te bepalen of je wel of niet toestemming hebt om een melding te verzenden, gebruik de gebruikersland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Dit stelt u in staat om vooraf te bepalen of Windows al dan niet de melding stilletjes weg zal gooien.

### macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications][apple-notification-guidelines].

Merk op dat meldingen beperkt zijn tot 256 bytes in grootte en worden ingekort als je die limiet overschrijdt.

#### Geavanceerde Notificaties

Later versies van macOS toestaan voor meldingen met een invoerveld, waardoor de gebruiker snel kan reageren op een melding. In order to send notifications with an input field, use the userland module [node-mac-notifier][node-mac-notifier].

#### Niet storen / sessie status

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state][electron-notification-state].

Dit geeft je de mogelijkheid om vooraf te detecteren of de notificatie al dan niet wordt weergegeven.

### Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[apple-notification-guidelines]: https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/

[node-mac-notifier]: https://github.com/CharlieHess/node-mac-notifier

[electron-notification-state]: https://github.com/felixrieseberg/electron-notification-state

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
