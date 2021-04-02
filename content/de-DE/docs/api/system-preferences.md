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

Wie `subscribeNotification`verwendet  jedoch `NSWorkspace.sharedWorkspace.notificationCenter`. Dies ist für Ereignisse wie `NSWorkspaceDidActivateApplicationNotification`erforderlich.

### `systemPreferences.unsubscribeNotification(id)` _macOS_

* `id` Integer

Entfernt den Abonnenten mit `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` _macOS_

* `id` Integer

Wie `unsubscribeNotification`, entfernt aber den Abonnenten aus `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_

* `id` Integer

Wie `unsubscribeNotification`, entfernt aber den Abonnenten aus `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` _macOS_

* `defaults` Record<String, String | Boolean | Number> - ein Wörterbuch von (`key: value`) Benutzerstandards

Fügen Sie die angegebenen Standardwerte zum `NSUserDefaults`Ihrer Anwendung hinzu.

### `systemPreferences.getUserDefault(key, type)` _macOS_

* `key` String
* `type` String - Kann `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` oder `dictionary`sein.

Gibt `any` zurück - Der Wert von `key` in `NSUserDefaults`.

Einige beliebte `key` und `type`sind:

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

Legen Sie den Wert von `key` in `NSUserDefaults`fest.

Beachten Sie, dass `type` dem tatsächlichen Typ der `value`entsprechen sollte. Eine Ausnahme wird ausgelöst wenn sie dies nicht tun.

Einige beliebte `key` und `type`sind:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

Entfernt die `key` in `NSUserDefaults`. Dies kann verwendet werden, um den Standardwert oder globalen Wert eines `key` wiederherzustellen, der zuvor mit `setUserDefault`festgelegt wurde.

### `systemPreferences.isAeroGlassEnabled()` _Windows_

Gibt `Boolean` zurück - `true` , wenn [DWM-Zusammensetzung][dwm-composition] (Aero Glass) aktiviert ist und andernfalls `false` .

Ein Beispiel für die Verwendung, um zu bestimmen, ob Sie ein transparentes Fenster erstellen sollen oder nicht (transparente Fenster funktionieren nicht ordnungsgemäß, wenn die DWM-Komposition deaktiviert ist):

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

Gibt `String` zurück - Die aktuelle Farbeinstellung des Systems mit breitem Akzent in RGBA- hexadezimaler Form.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"`
const red = color.substr(0, 2) // "aa"
const green = color.substr(2, 2) // "bb"
const blue = color.substr(4, 2) // "cc"
const alpha = color.substr(6, 2) // "dd"
```

Diese API ist nur unter macOS 10.14 Mojave oder neuer verfügbar.

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

Gibt `String` zurück - Die Systemfarbeinstellung in RGB-Hexadezimalform (`#ABCDEF`). Weitere Informationen finden Sie in den [Windows-Dokumenten][windows-colors] und den</a>

macOS-Dokumenten.</p> 

Die folgenden Farben sind nur unter macOS 10.14 verfügbar: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`und `unemphasized-selected-text`.



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

Gibt `String` zurück - Die Standardsystemfarbe, die als `#RRGGBBAA`formatiert ist.

Gibt eine von mehreren Standard-Systemfarben zurück, die sich automatisch an die Lebendigkeit anpassen und Änderungen in den Eingabehilfeneinstellungen wie "Kontrast erhöhen" und "Transparenz reduzieren" ändern. Weitere Informationen finden Sie unter [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) .



### `systemPreferences.isInvertedColorScheme()` _Windows_ _veraltete_

Gibt `Boolean` zurück - `true` wenn ein invertiertes Farbschema (ein Farbschema mit hohem Kontrast mit hellem Text und dunklem Hintergrund) aktiv ist, `false` andernfalls.

**veraltet:** sollten die neue [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) -API verwenden.



### macOS</em> _windows_ _veraltete_`systemPreferences.isHighContrastColorScheme()` _</h3> 

Gibt `Boolean` zurück - `true` , wenn ein Design mit hohem Kontrast aktiv ist, `false` andernfalls.

**veraltet:** sollten die neue [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) -API verwenden.



### `systemPreferences.getEffectiveAppearance()` _macOS_

Gibt `String` zurück - Kann `dark`, `light` oder `unknown`sein.

Ruft die macOS-Darstellungseinstellung ab, die derzeit auf Ihre Anwendung angewendet wird, [NSApplication zuordnet](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc).



### `systemPreferences.getAppLevelAppearance()` _macOS_ _veraltete_

Rücksendungen `String` | `null` - Kann `dark`, `light` oder `unknown`sein.

Ruft die macOS-Darstellungseinstellung ab, die Sie für Ihrer Anwendung deklariert haben, und [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc)zugeordnet. Sie können die `setAppLevelAppearance` -API verwenden, um diesen Wert festzulegen.



### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _veraltete_

* `appearance` String | null - Kann `dark` oder `light`werden

Legt die Darstellungseinstellung für Ihre Anwendung fest, sollte dies den Systemstandard überschreiben und den Wert von `getEffectiveAppearance`überschreiben.



### `systemPreferences.canPromptTouchID()` _macOS-_

Gibt `Boolean` zurück - unabhängig davon, ob dieses Gerät Touch ID verwenden kann oder nicht.

**HINWEIS:** Diese API gibt `false` auf macOS-Systemen zurück, die älter als Sierra 10.12.2 sind.



### `systemPreferences.promptTouchID(reason)` _macOS-_

* `reason` String - Der Grund, warum Sie die Touch ID-Authentifizierung anfordern

Gibt `Promise<void>` zurück - löst auf, wenn der Benutzer sich erfolgreich mit Touch ID authentifiziert hat.



```javascript
const { systemPreferences } = require('electron')

systemPreferences.promptTouchID('Um die Zustimmung für ein Security-Gated Thing') zu erhalten.dann(erfolg =>
  Konsole.log('Sie haben sich erfolgreich mit Touch ID authentifiziert!')
.catch(err =>
  Konsole.log(err)
)
```


Diese API selbst schützt Ihre Benutzerdaten nicht. vielmehr ist es ein Mechanismus, um Ihnen dies zu ermöglichen. Native Apps müssen [Zugriffssteuerungskonstanten festlegen, die](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) wie [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) für ihren Schlüsselbundeintrag verwenden, sodass das Lesen automatisch zur biometrischen Zustimmung von Touch ID aufgefordert würde. Dies könnte mit [`node-keytar`](https://github.com/atom/node-keytar)erfolgen, so dass man einen Verschlüsselungsschlüssel mit `node-keytar` speichern und nur abrufen würde, wenn `promptTouchID()` auflöst.

**HINWEIS:** Diese API gibt ein abgelehntes Versprechen auf macOS-Systemen zurück, die älter als Sierra 10.12.2 sind.



### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` boolesch - ob der Benutzer per Eingabeaufforderung informiert wird, wenn der aktuelle Prozess nicht vertrauenswürdig ist.

Gibt `Boolean` zurück : `true` , wenn es sich bei dem aktuellen Prozess um einen vertrauenswürdigen Zugriffsclient handelt und `false` , wenn dies nicht der Fall ist.



### `systemPreferences.getMediaAccessStatus(mediaType)` _windows_ _macOS-_

* `mediaType` String - Kann `microphone`, `camera` oder `screen`sein.

Gibt `String` zurück : `not-determined`, `granted`, `denied`, `restricted` oder `unknown`.

Diese Benutzerzustimmung war unter macOS 10.13 High Sierra oder niedriger nicht erforderlich, sodass diese Methode immer `granted`zurückgibt. macOS 10.14 Mojave oder höher erfordert die Zustimmung für `microphone` und `camera` Zugriff. macOS 10.15 Catalina oder höher erfordert die Zustimmung für `screen` Zugriff.

Windows 10 verfügt über eine globale Einstellung, die `microphone` und `camera` Zugriff für alle win32-Anwendungen steuert. Es wird immer `granted` für `screen` und für alle Medientypen auf älteren Versionen von Windows zurückgegeben.



### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - der Typ des angeforderten Mediums; kann `microphone`sein , `camera`.

Gibt `Promise<Boolean>` zurück - Ein Versprechen, das mit `true` löst, wenn die Zustimmung erteilt wurde, und `false` , wenn es verweigert wurde. Wenn ein ungültiges `mediaType` bestanden wird, wird das Versprechen abgelehnt. Wenn eine Zugriffsanforderung abgelehnt wurde und später über den Bereich Systemeinstellungen geändert wird, ist ein Neustart der App erforderlich, damit die neuen Berechtigungen wirksam werden. Wenn der Zugriff bereits angefordert und verweigert wurde, muss _über den Voreinstellungsbereich_ geändert werden. Eine Warnung wird nicht angezeigt, und das Versprechen wird mit dem vorhandenen Zugriffsstatus aufgelöst.

**Wichtig:** Um diese API richtig nutzen zu können, müssen Sie [](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) die `NSMicrophoneUsageDescription` - und `NSCameraUsageDescription` Zeichenfolgen in der `Info.plist` -Datei Ihrer App festlegen. Die Werte für diese Schlüssel werden verwendet, um die Berechtigungsdialogfelder aufzufüllen, sodass der Benutzer ordnungsgemäß über den Zweck der Berechtigungsanforderung informiert wird. Weitere Informationen zum Festlegen dieser Anwendungen im Kontext von Electron finden Sie in [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) .

Diese Benutzerzustimmung war bis macOS 10.14 Mojave nicht erforderlich, daher gibt diese Methode immer `true` zurück, wenn Ihr System 10.13 High Sierra oder niedriger läuft.



### `systemPreferences.getAnimationSettings()`

Gibt das `Object` zurück:

* `shouldRenderRichAnimation` Boolean - Gibt true zurück, wenn rich animationen gerendert werden sollen. Betrachtet sitzungstyp (z. B. Remotedesktop) und Eingabehilfen, um Anleitungen für schwere Animationen zu geben.
* `scrollAnimationsEnabledBySystem` Boolean - Legt plattformspezifisch fest, ob Bildlaufanimationen (z. B. durch Home/End-Taste) aktiviert werden sollen.
* `prefersReducedMotion` Boolean - Bestimmt, ob der Benutzer basierend auf Plattform-APIs eine reduzierte Bewegung wünscht.

Gibt ein Objekt mit Systemanimationseinstellungen zurück.



## Eigenschaften



### `systemPreferences.appLevelAppearance` _macOS-_

Eine `String` Eigenschaft, die `dark`, `light` oder `unknown`sein kann. Es bestimmt die macOS-Darstellungseinstellung für Ihrer Anwendung. Dies wird Werten in: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc)zugeordnet. Wenn Sie dies festlegen, werden die Systemstandard sowie der Wert von `getEffectiveAppearance`überschrieben.

Mögliche Werte, die festgelegt werden können, sind `dark` und `light`, und mögliche Rückgabewerte sind `dark`, `light`und `unknown`.

Diese Eigenschaft ist nur für macOS 10.14 Mojave oder neuer verfügbar.



### `systemPreferences.effectiveAppearance` _macOS_ _Readonly_

Eine `String` Eigenschaft, die `dark`, `light` oder `unknown`sein kann.

Gibt die macOS-Darstellungseinstellung zurück, die derzeit auf Ihre Anwendung angewendet wird, [NSApplication zuordnet](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc).

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
