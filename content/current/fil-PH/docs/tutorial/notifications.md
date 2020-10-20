# Mga Abiso (Windows, Linux, macOS)

## Overview

All three operating systems provide means for applications to send notifications to the user. The technique of showing notifications is different for the Main and Renderer processes.

For the Renderer process, Electron conveniently allows developers to send notifications with the [HTML5 Notification API](https://notifications.spec.whatwg.org/), using the currently running operating system's native notification APIs to display it.

To show notifications in the Main process, you need to use the [Notification](../api/notification.md) module.

## Mga halimbawa

### Show notifications in the Renderer process

Assuming you have a working Electron application from the [Quick Start Guide](quick-start.md), add the following line to the `index.html` file before the closing `</body>` tag:

```html
<script src="renderer.js"></script>
```

and add the `renderer.js` file:

```js
const myNotification = new Notification('Title', {
  body: 'Notification from the Renderer process'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

After launching the Electron application, you should see the notification:

![Notification in the Renderer process](../images/notification-renderer.png)

If you open the Console and then click the notification, you will see the message that was generated after triggering the `onclick` event:

![Onclick message for the notification](../images/message-notification-renderer.png)

### Show notifications in the Main process

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

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

After launching the Electron application, you should see the notification:

![Notification in the Main process](../images/notification-main.png)

## Additional information

Bagama 't magkatulad ang code at gumagamit ng mga karanasan sa iba 't ibang mga operating system, doon ay may mga bahagyang pagkakaiba.

### Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu. This can be overkill during development, so adding `node_modules\electron\dist\electron.exe` to your Start Menu also does the trick. Navigate to the file in Explorer, right-click and 'Pin to Start Menu'. You will then need to add the line `app.setAppUserModelId(process.execPath)` to your main process to see notifications.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. Paalala, Bagamat, ito ay hindi kailangan naka pin para magsimula ang screen.
* Sa Windows 7, ang notipikasyon trabaho sa via pasadya at implementadong biswal ay kahawig noong luma sa panibagong sistema.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`](../api/app.md#appsetappusermodelidid-windows) yourself.

At saka, Windows 8, ang maximum na haba para sa notipikasyon ng katawan ay 250 characters, sa koponan ng Windows na nagrerekomenda na ang mga notipikasyon ay dapat manatilisa 200 mga characters. Na sinabi, na ang limitasyon ay inalis sa Windows 10, dahil ang koponan ng Windows na nagtatanong sa mga developer na maging makatwiran. Pagsubok na magpadala ng napakalaking halaga ng teksto sa API (libu-libong mga characters) ay maaaring magresulta sa kawalang-tatag.

#### Mga Advanced na abiso

Ang susunod na mga bersyon ng Windows ay nagbibigay-daan para sa mga advanced na abiso, na may custom na mga template, mga imahe, at iba pang mga nabagong elemento. Para ipadala ang mga abiso (mula sa alinman sa pangunahing proseso o proseso ng renderer), gamitin ang module ng userland [ mga electron-windows-notification ](https://github.com/felixrieseberg/electron-windows-notifications), na gumagamit ng mga katutubong Node na addons upang magpadala ng mga bagay na `Toast na abiso` at ` Tile na abiso `.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

#### Mga Oras ng Tahimikan / Pagtatanghal

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

### macOS

Ang mga abiso ay tuwid-patuloy sa macOS, ngunit dapat mong malaman [Mga alituntunin ng Apple's Human Interface tungkol sa mga notipikasyon](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Tandaan na ang mga notipikasyon ay limitado sa 256 bytes na laki at itoy mapuputol kung lalampas ka na sa limitasyon.

#### Mga Advanced na abiso

Ang mga sumusunod na bersyon ng macOS ay nagbibigay-daan para sa mga abiso sa isang input field, na nagpapahintulot sa gumagamit upang mabilis na tumugon sa isang abiso. Upang magpadala ng mga abiso sa isang input field, gamitin ang userland modyul [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

#### Huwag abalahin / Estado ng Sesyon

Upang matukoy kung pinapayagan kang magpadala ng isang abiso, gamitin ang module ng userland [ elektron-abiso-estado](https://github.com/felixrieseberg/electron-notification-state).

Ito ang magbibigay-daan sa iyo upang tuklasin nang maaga kung ipapakita o hindi ipapakita ang notipikasyon.

### Linux

Ipinapadala ang mga notipikasyon gamit ang `libnotify` na maaaring magpakita ng mga abiso sa anumang kapaligiran sa desktop na sumusunod sa [Pagtutukoy sa mga Notipikasyon ng Desktop](https://developer.gnome.org/notification-spec/), kabilang ang Cinnamon, Paliwanag, Pagkakaisa, GNOME, KDE.
