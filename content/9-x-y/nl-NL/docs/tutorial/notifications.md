# Notificaties (Windows, Linux, macOS)

Alle drie besturingssystemen bieden middelen voor toepassingen om meldingen te verzenden naar de gebruiker. Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

**Note:** Since this is an HTML5 API it is only available in the renderer process. Als u notificaties wilt weergeven in het hoofdproces, bekijk dan de [Notificatie](../api/notification.md) module.

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

Hoewel code en ervaring van gebruikers met verschillende besturingssystemen overeenkomen, zijn er subtiele verschillen.

## Windows
* On Windows 10, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start Menu. Dit kan worden overkill tijdens de ontwikkeling, dus het toevoegen van `node_modules\electron\dist\electron.exe` aan uw startmenu doet ook de truc. Navigeer naar het bestand in Verkenner met de rechtermuisknop en 'Pin om Menu te starten'. Daarna moet u de regel `app.setAppUserModelId(process.execPath)` toevoegen aan uw hoofdproces om meldingen te zien.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID][app-user-model-id] must be installed to the Start screen. Opmerking: deze hoeft niet aan het startscherm te worden vastgezet.
* Op Windows 7 werken meldingen via een aangepaste implementatie die visueel op de oorspronkelijke systemen lijkt.

Electron probeert het werk rond het Application User Model ID te automatiseren. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly][squirrel-events]. Bovendien, Electron detecteert dat Squirrel werd gebruikt en zal `app.setAppUserModelId()` automatisch bellen met de juiste waarde. During development, you may have to call [`app.setAppUserModelId()`][set-app-user-model-id] yourself.

Bovendien is de maximale lengte in Windows 8 voor het lichaam van meldingen 250 tekens, met het Windows-team dat aanbeveelt dat meldingen tot 200 tekens moeten worden gehouden. Dat gezegd hebbende, die beperking is verwijderd in Windows 10, met het Windows-team dat ontwikkelaars vraagt redelijk te zijn. Poging gigantische hoeveelheden tekst te verzenden naar de API (duizenden tekens) kan leiden tot instabiliteit.

### Geavanceerde Notificaties

Later versies van Windows staan geavanceerde meldingen toe, met aangepaste sjablonen, afbeeldingen en andere flexibele elementen. Voor het verzenden van deze meldingen (van het hoofdproces of het proces van de renderer), gebruik je de gebruikerslandmodule [electron-windows-notificaties](https://github.com/felixrieseberg/electron-windows-notifications), die gebruik maakt van native Node addons om `ToastNotification` en `TileNotification` objecten te verzenden.

Tijdens meldingen inclusief knoppen werken met `electron-windows-meldingen`, het afhandelen van antwoorden vereist het gebruik van [`electron-windows-interactive-meldingen`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), die helpt met het registreren van de vereiste COM componenten en het bellen van je Electron app met de ingevoerde gebruikersgegevens.

### Stille uren / Presentatiemodus

Om te bepalen of je wel of niet toestemming hebt om een melding te versturen, gebruik je de gebruikerslandmodule [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Dit stelt u in staat om vooraf te bepalen of Windows de melding stilletjes weggooit.

## macOS

Notificaties zijn recht op macOS, maar u moet op de hoogte zijn van [Apple's Human Interface guidelines voor meldingen](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Merk op dat meldingen beperkt zijn tot 256 bytes in grootte en worden ingekort als je die limiet overschrijdt.

### Geavanceerde Notificaties

Later versies van macOS toestaan voor meldingen met een invoerveld, waardoor de gebruiker snel kan reageren op een melding. Om meldingen met een invoerveld te verzenden, gebruik de userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Niet storen / sessie status

Om te bepalen of je wel of niet toestemming hebt om een melding te versturen, gebruik je de gebruikerslandmodule [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

Dit geeft je de mogelijkheid om vooraf te detecteren of de notificatie al dan niet wordt weergegeven.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification][notification-spec], including Cinnamon, Enlightenment, Unity, GNOME, KDE.

[notification-spec]: https://developer.gnome.org/notification-spec/
[app-user-model-id]: https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx
[set-app-user-model-id]: ../api/app.md#appsetappusermodelidid-windows
[squirrel-events]: https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events
