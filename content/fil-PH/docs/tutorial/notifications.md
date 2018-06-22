# Mga Abiso (Windows, Linux, macOS)

Ang tatlong operating system ay nagbibigay ng paraan para sa mga aplikasyon na magpadala ng abiso sa mga gumagamit. Maginhawang nagbibigay-daan ang Elektron sa mga developer upang magpadala ng mga abiso kasama ang [HTML5 Abiso API](https://notifications.spec.whatwg.org/), gamit ang tumatakbong operating system sa native notification APIs upang ipakita ito.

**Tandaan:** Dahil ito ay isang HTML5 API magagamit lamang ito sa proseso ng tagasalin. Kung gusto mong makita ang mga abiso sa pangunahing proseso mangyaring tignan ang [Notification](../api/notification.md) modyul.

```javascript
hayaan myNotification = bagong Abiso ('Pamagat', {
 katawan: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () = & gt; {
  console.log ('Na-click ang abiso')
}
```

Bagama 't magkatulad ang code at gumagamit ng mga karanasan sa iba 't ibang mga operating system, doon ay may mga bahagyang pagkakaiba.

## Windows

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. Paalala, Bagamat, ito ay hindi kailangan naka pin para magsimula ang screen.
* Sa Windows 7, ang notipikasyon trabaho sa via pasadya at implementadong biswal ay kahawig noong luma sa panibagong sistema.

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][[set-app-user-model-id](../api/app.md#appsetappusermodelidid-windows)] yourself.

At saka, Windows 8, ang maximum na haba para sa notipikasyon ng katawan ay 250 characters, sa koponan ng Windows na nagrerekomenda na ang mga notipikasyon ay dapat manatilisa 200 mga characters. Na sinabi, na ang limitasyon ay inalis sa Windows 10, dahil ang koponan ng Windows na nagtatanong sa mga developer na maging makatwiran. Pagsubok na magpadala ng napakalaking halaga ng teksto sa API (libu-libong mga characters) ay maaaring magresulta sa kawalang-tatag.

### Mga Advanced na abiso

Ang susunod na mga bersyon ng Windows ay nagbibigay-daan para sa mga advanced na abiso, na may custom na mga template, mga imahe, at iba pang mga nabagong elemento. Para ipadala ang mga abiso (mula sa alinman sa pangunahing proseso o proseso ng renderer), gamitin ang module ng userland [ mga electron-windows-notification ](https://github.com/felixrieseberg/electron-windows-notifications), na gumagamit ng mga katutubong Node na addons upang magpadala ng mga bagay na `Toast na abiso` at ` Tile na abiso `.

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Mga Oras ng Tahimikan / Pagtatanghal

Upang matukoy kung pinapayagan kang magpadala ng isang abiso, gamitin ang module ng userland [ elektron-abiso-estado](https://github.com/felixrieseberg/electron-notification-state).

Ito ay nagbibigay-daan sa iyo upang matukoy sa tamang oras at panahon o hindi Windows ay tahimik na ihagis ang abiso palayo.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

Tandaan na ang mga notipikasyon ay limitado sa 256 bytes na laki at itoy mapuputol kung lalampas ka na sa limitasyon.

### Mga Advanced na abiso

Ang mga sumusunod na bersyon ng macOS ay nagbibigay-daan para sa mga abiso sa isang input field, na nagpapahintulot sa gumagamit upang mabilis na tumugon sa isang abiso. Upang magpadala ng mga abiso sa isang input field, gamitin ang userland modyul [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Huwag abalahin / Estado ng Sesyon

Upang matukoy kung pinapayagan kang magpadala ng isang abiso, gamitin ang module ng userland [ elektron-abiso-estado](https://github.com/felixrieseberg/electron-notification-state).

Ito ang magbibigay-daan sa iyo upang tuklasin nang maaga kung ipapakita o hindi ipapakita ang notipikasyon.

## Linux

Ipinapadala ang mga notipikasyon gamit ang `libnotify` na maaaring magpakita ng mga abiso sa anumang kapaligiran sa desktop na sumusunod sa [Pagtutukoy sa mga Notipikasyon ng Desktop](https://developer.gnome.org/notification-spec/), kabilang ang Cinnamon, Paliwanag, Pagkakaisa, GNOME, KDE.