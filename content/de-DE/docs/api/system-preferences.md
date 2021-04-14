# systemPreferences

> Systemeinstellungen anschauen.

Prozess: [Main](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## Ereignisse

Das `systemPreferences` -Objekt gibt die folgenden Ereignisse aus:

### Event: 'accent-color-changed' _Windows_

Rückgabewert:

* `event` Event
* `newColor` String - Die neue RGBA-Farbe, die der Benutzer als System Akzentfarbe zugewiesen hat.

### Event: 'color-changed' _Windows_

Rückgabewert:

* `event` Event

### Ereignis: 'inverted-color-scheme-changed' _Windows_ _veraltete_

Rückgabewert:

* `event` Event
* `invertedColorScheme` boolesch - `true` , wenn ein invertiertes Farbschema (ein kontrastreiches Farbschema mit hellem Text und dunklen Hintergründen) verwendet wird, `false` andernfalls.

**veraltet:** sollte das neue [`updated`](native-theme.md#event-updated) -Ereignis auf dem `nativeTheme` -Modul verwenden.

### Ereignis: 'High-Contrast-Color-Schema-changed' _Windows_ _veraltete_

Rückgabewert:

* `event` Event
* `highContrastColorScheme` boolesch - `true` wenn ein Kontrastthema verwendet wird, `false` sonst.

**veraltet:** sollte das neue [`updated`](native-theme.md#event-updated) -Ereignis auf dem `nativeTheme` -Modul verwenden.

## Methoden

### macOS</em> _windows_ _veraltete_`systemPreferences.isDarkMode()` _</h3>

Gibt `Boolean` zurück - Gibt an, ob sich das System im dunklen Modus befindet.

**veraltet:** sollten die neue [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) -API verwenden.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_

Gibt `Boolean` zurück - Gibt an, ob die Einstellung Wischen zwischen Seiten eingeschaltet ist.

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` _macOS-_

* `event` String
* `userInfo` -Rekord<String, any>
* `deliverImmediately` boolesch (optional) - `true` , Benachrichtigungen sofort zu posten, auch wenn die abonnierende App inaktiv ist.

Beiträge `event` als native Benachrichtigungen von macOS. Bei `userInfo` handelt es sich um ein Objekt das das zusammen mit der Benachrichtigung gesendete Benutzerinformationswörterbuch enthält.

### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` -Rekord<String, any>

Beiträge `event` als native Benachrichtigungen von macOS. Bei `userInfo` handelt es sich um ein Objekt das das zusammen mit der Benachrichtigung gesendete Benutzerinformationswörterbuch enthält.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` -Rekord<String, any>

Beiträge `event` als native Benachrichtigungen von macOS. Bei `userInfo` handelt es sich um ein Objekt das das zusammen mit der Benachrichtigung gesendete Benutzerinformationswörterbuch enthält.

### `systemPreferences.subscribeNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` -Rekord<String, unknown>
  * `object` String

Gibt `Number` zurück - Die ID dieses Abonnements

Abonniert native Benachrichtigungen von macOS, `callback` werden mit `callback(event, userInfo)` aufgerufen, wenn die entsprechende `event` passiert. Bei `userInfo` handelt es sich um ein Objekt, das das zusammen mit der Benachrichtigung gesendete Benutzerinformationswörterbuch enthält. Die `object` ist der Absender der Benachrichtigung, und unterstützt vorerst nur `NSString` Werte.

Die `id` des Abonnenten wird zurückgegeben, die zum Abbestellen der `event`verwendet werden können.

Unter der Haube abonniert diese API `NSDistributedNotificationCenter`, Beispielwerte von `event` sind:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` -Rekord<String, unknown>
  * `object` String

Gibt `Number` zurück - Die ID dieses Abonnements

Wie `subscribeNotification`verwendet  jedoch `NSNotificationCenter` für lokale Standardwerte. Dies ist für Ereignisse wie `NSUserDefaultsDidChangeNotification`erforderlich.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` -Rekord<String, unknown>
  * `object` String

Gibt `Number` zurück - Die ID dieses Abonnements

Same as `subscribeNotification`, but uses `NSWorkspace.sharedWorkspace.notificationCenter`. This is necessary for events such as `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` _macOS_

* `id` Integer

Removes the subscriber with `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` _macOS_

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_

* `id` Integer

Same as `unsubscribeNotification`, but removes the subscriber from `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` _macOS_

* `defaults` Record<String, String | Boolean | Number> - ein Wörterbuch von (`key: value`) Benutzerstandards

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` _macOS_

* `key` String
* `type` String - Kann `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` oder `dictionary`sein.

Returns `any` - The value of `key` in `NSUserDefaults`.

Some popular `key` and `type`s are:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` _macOS_

* `key` String
* `type` String - Kann `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` oder `dictionary`sein.
* `value` String

Set the value of `key` in `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Some popular `key` and `type`s are:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` _Windows_

Returns `Boolean` - `true` if [DWM composition][dwm-composition] (Aero Glass) is enabled, and `false` otherwise.

An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):

```javascript
const { BrowserWindow, systemPreferences } = require('electron')
const browserOptions = { width: 1000, height: 800 }

/ / Machen Sie das Fenster nur dann transparent, wenn die Plattform es unterstützt.
if (process.platform !== 'win32' || systemPreferences.isAeroGlassEnabled()) '
  browserOptions.transparent = true
  browserOptions.frame = false
'

/ Create the window.
const win = neue BrowserWindow(browserOptions)

/ Navigieren.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // No transparency, so we load a fallback that uses basic styles.
  win.loadURL(`file://${__dirname}/fallback.html`)
}
```

### `systemPreferences.getAccentColor()` _windows_ _macOS-_

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

This API is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.getColor(color)` _windows_ _macOS-_

* `color` String - Einer der folgenden Werte:
  * Unter **Windows-**:
    * `3d-dark-shadow` - Dunkler Schatten für dreidimensionale Anzeigeelemente.
    * `3d-face` - Flächenfarbe für dreidimensionale Anzeigeelemente und für Dialog -Feldhintergründe.
    * `3d-highlight` - Hervorhebungsfarbe für dreidimensionale Anzeigeelemente.
    * `3d-light` - Lichtfarbe für dreidimensionale Anzeigeelemente.
    * `3d-shadow` - Schattenfarbe für dreidimensionale Anzeigeelemente.
    * `active-border` - Aktiver Fensterrahmen.
    * `active-caption` - Aktive Fenstertitelleiste. Gibt die linke Seitenfarbe in farblichen Farbverlauf sdera eines aktiven Fensters an, wenn der Farbverlaufseffekt aktiviert ist .
    * `active-caption-gradient` - Rechte Seitenfarbe im Farbverlauf einer der Titelleiste eines aktiven Fensters.
    * `app-workspace` - Hintergrundfarbe von MDI -Anwendungen (Multiple Document Interface) Anwendungen.
    * `button-text` - Text auf Drucktasten.
    * `caption-text` - Text in Beschriftung, Größenfeld und Bildlaufleistenpfeilfeld.
    * `desktop` - Desktop-Hintergrundfarbe.
    * `disabled-text` - Grauer (deaktivierter) Text.
    * `highlight` - Artikel, die in einem Steuerelement ausgewählt sind.
    * `highlight-text` - Text von In einem Steuerelement ausgewählten Element(en).
    * `hotlight` - Farbe für einen Hyperlink oder ein Hot-Track-Element.
    * `inactive-border` - Inaktiver Fensterrahmen.
    * `inactive-caption` - Inaktive Fensterbeschriftung. Gibt die linke Seitenfarbe im Farbverlauf der Titelleiste eines inaktiven Fensters an, wenn der Farbverlauf Effekt aktiviert ist.
    * `inactive-caption-gradient` - Rechte Seitenfarbe im Farbverlauf einer inaktiven Fensters Titelleiste.
    * `inactive-caption-text` - Farbe des Textes in einer inaktiven Beschriftung.
    * `info-background` - Hintergrundfarbe für QuickInfo-Steuerelemente.
    * `info-text` - Textfarbe für QuickInfo-Steuerelemente.
    * `menu` - Menühintergrund.
    * `menu-highlight` - Die Farbe, die zum Hervorheben von Menüelementen verwendet wird, wenn das Menü als flaches Menü angezeigt wird.
    * `menubar` - Die Hintergrundfarbe für die Menüleiste, wenn Menüs als flache Menüs angezeigt werden.
    * `menu-text` - Text in Menüs.
    * `scrollbar` - Grauer Bereich der Bildlaufleiste.
    * `window` - Fensterhintergrund.
    * `window-frame` - Fensterrahmen.
    * `window-text` - Text in Fenstern.
  * Auf **macOS-**
    * `alternate-selected-control-text` - Der Text auf einer ausgewählten Fläche in einer Liste oder Tabelle. _veraltete_
    * `control-background` - Der Hintergrund eines großen Schnittstellenelements, z. B. eines Browsers oder einer Tabelle.
    * `control` - Die Oberfläche eines Steuerelements.
    * `control-text` -Der Text eines Steuerelements, das nicht deaktiviert ist.
    * `disabled-control-text` - Der Text eines deaktivierten Steuerelements.
    * `find-highlight` - Die Farbe eines Fundindikators.
    * `grid` - Die Gitternetzlinien eines Schnittstellenelements wie einer Tabelle.
    * `header-text` - Der Text einer Kopfzeile in einer Tabelle.
    * `highlight` - Die virtuelle Lichtquelle auf dem Bildschirm.
    * `keyboard-focus-indicator` - Der Ring, der um das aktuell fokussierte Steuerelement angezeigt wird, wenn die Tastatur für die Schnittstellennavigation verwendet wird.
    * `label` - Der Text einer Beschriftung, die den primären Inhalt enthält.
    * `link` - Ein Link zu anderen Inhalten.
    * `placeholder-text` - Eine Platzhalterzeichenfolge in einer Steuerelement- oder Textansicht.
    * `quaternary-label` - Der Text eines Etiketts von geringerer Bedeutung als ein tertiäres Etikett wie Wasserzeichentext.
    * `scrubber-textured-background` - Der Hintergrund eines Wäschers in der Touch Bar.
    * `secondary-label` - Der Text eines Etiketts von geringerer Bedeutung als ein normales Etikett, z. B. ein Etikett, das zur Darstellung einer Unterposition verwendet wird, oder zusätzliche Informationen.
    * `selected-content-background` - Der Hintergrund für ausgewählte Inhalte in einem Schlüsselfenster oder einer Ansicht.
    * `selected-control` - Die Oberfläche eines ausgewählten Steuerelements.
    * `selected-control-text` - Der Text eines ausgewählten Steuerelements.
    * `selected-menu-item-text` - Der Text eines ausgewählten Menüs.
    * `selected-text-background` - Der Hintergrund des markierten Textes.
    * `selected-text` - Ausgewählter Text.
    * `separator` - Ein Trennzeichen zwischen verschiedenen Inhaltsabschnitten.
    * `shadow` - Der virtuelle Schatten, der von einem erhöhten Objekt auf dem Bildschirm geworfen wird.
    * `tertiary-label` - Der Text einer Beschriftung von geringerer Bedeutung als eine sekundäre Bezeichnung, z. B. eine Bezeichnung, die zur Darstellung deaktivierten Textes verwendet wird.
    * `text-background` - Texthintergrund.
    * `text` - Der Text in einem Dokument.
    * `under-page-background` - Der Hintergrund hinter dem Inhalt eines Dokuments.
    * `unemphasized-selected-content-background` - Der ausgewählte Inhalt in einem Nicht-Schlüsselfenster oder in einer Ansicht.
    * `unemphasized-selected-text-background` - Ein Hintergrund für markierten Text in einem Nicht-Schlüsselfenster oder einer Ansicht.
    * `unemphasized-selected-text` - Ausgewählter Text in einem Nicht-Schlüsselfenster oder in einer Ansicht.
    * `window-background` - Der Hintergrund eines Fensters.
    * `window-frame-text` - Der Text im Titelleistenbereich des Fensters.

Returns `String` - The system color setting in RGB hexadecimal form (`#ABCDEF`). See the [Windows docs][windows-colors] and the [macOS docs][macos-colors] for more details.

The following colors are only available on macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, and `unemphasized-selected-text`.

### `systemPreferences.getSystemColor(color)` _macOS-_

* `color` String - Einer der folgenden Werte:
  * `Blau`
  * `Braun`
  * `Grau`
  * `Grün`
  * `Orange`
  * `Rosa`
  * `Lila`
  * `Rot`
  * `Gelb`

Returns `String` - The standard system color formatted as `#RRGGBBAA`.

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) for  more details.

### `systemPreferences.isInvertedColorScheme()` _Windows_ _veraltete_

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### macOS</em> _windows_ _veraltete_`systemPreferences.isHighContrastColorScheme()` _</h3>

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` _macOS_

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

### `systemPreferences.getAppLevelAppearance()` _macOS_ _veraltete_

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _veraltete_

* `appearance` String | null - Kann `dark` oder `light`werden

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

### `systemPreferences.canPromptTouchID()` _macOS-_

Returns `Boolean` - whether or not this device has the ability to use Touch ID.

**NOTE:** This API will return `false` on macOS systems older than Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` _macOS-_

* `reason` String - Der Grund, warum Sie die Touch ID-Authentifizierung anfordern

Returns `Promise<void>` - resolves if the user has successfully authenticated with Touch ID.

```javascript
const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('Um die Zustimmung für ein Security-Gated Thing') zu erhalten.dann(erfolg =>
  Konsole.log('Sie haben sich erfolgreich mit Touch ID authentifiziert!')
.catch(err =>
  Konsole.log(err)
)
```

This API itself will not protect your user data; rather, it is a mechanism to allow you to do so. Native apps will need to set [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) like [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) on their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. This could be done with [`node-keytar`](https://github.com/atom/node-keytar), such that one would store an encryption key with `node-keytar` and only fetch it if `promptTouchID()` resolves.

**NOTE:** This API will return a rejected Promise on macOS systems older than Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` boolesch - ob der Benutzer per Eingabeaufforderung informiert wird, wenn der aktuelle Prozess nicht vertrauenswürdig ist.

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### `systemPreferences.getMediaAccessStatus(mediaType)` _windows_ _macOS-_

* `mediaType` String - Kann `microphone`, `camera` oder `screen`sein.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required on macOS 10.13 High Sierra or lower so this method will always return `granted`. macOS 10.14 Mojave or higher requires consent for `microphone` and `camera` access. macOS 10.15 Catalina or higher requires consent for `screen` access.

Windows 10 has a global setting controlling `microphone` and `camera` access for all win32 applications. It will always return `granted` for `screen` and for all media types on older versions of Windows.

### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - der Typ des angeforderten Mediums; kann `microphone`sein , `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it _must_ be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.getAnimationSettings()`

Gibt das `Object` zurück:

* `shouldRenderRichAnimation` Boolean - Gibt true zurück, wenn rich animationen gerendert werden sollen. Betrachtet sitzungstyp (z. B. Remotedesktop) und Eingabehilfen, um Anleitungen für schwere Animationen zu geben.
* `scrollAnimationsEnabledBySystem` Boolean - Legt plattformspezifisch fest, ob Bildlaufanimationen (z. B. durch Home/End-Taste) aktiviert werden sollen.
* `prefersReducedMotion` Boolean - Bestimmt, ob der Benutzer basierend auf Plattform-APIs eine reduzierte Bewegung wünscht.

Returns an object with system animation settings.

## Eigenschaften

### `systemPreferences.appLevelAppearance` _macOS-_

A `String` property that can be `dark`, `light` or `unknown`. It determines the macOS appearance setting for your application. This maps to values in: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Setting this will override the system default as well as the value of `getEffectiveAppearance`.

Possible values that can be set are `dark` and `light`, and possible return values are `dark`, `light`, and `unknown`.

This property is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.effectiveAppearance` _macOS_ _Readonly_

A `String` property that can be `dark`, `light` or `unknown`.

Returns the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
