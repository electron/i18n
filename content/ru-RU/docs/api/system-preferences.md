# системные настройки

> Получение системных параметров.

Процесс: [Основной](../glossary.md#main-process)

```javascript
const { systemPreferences } = require('electron')
console.log(systemPreferences.isDarkMode())
```

## События

Объект `systemPreferences` включает следующие события:

### Событие: 'accent-color-changed' _Windows_

Возвращает:

* `event` Event
* `newColor` Строка - новый цвет RGBA, назначенный пользователем в качестве акцентного цвета.

### Событие: 'color-changed' _Windows_

Возвращает:

* `event` Event

### Событие: "перевернутый цвет-схема изменена" _Windows_ _Deprecated_

Возвращает:

* `event` Event
* `invertedColorScheme` Boolean - `true` если используется перевернутая цветовая гамма (высоко контрастная цветовая гамма со светлым текстом и темным фоном), `false` иначе.

**Deprecated:** должны использовать [`updated`](native-theme.md#event-updated) событие на `nativeTheme` модуле.

### Событие: "высококонтрастная цветовая схема-изменена" _Windows_ _Deprecated_

Возвращает:

* `event` Event
* `highContrastColorScheme` Boolean - `true` , если используется тема высокого контраста, `false` иначе.

**Deprecated:** должны использовать [`updated`](native-theme.md#event-updated) событие на `nativeTheme` модуле.

## Методы

### `systemPreferences.isDarkMode()` _macOS_ _Windows_ _Deprecated_

Возвращает `Boolean` - если система в Ночном режиме.

**:** должны использовать новый [`nativeTheme.shouldUseDarkColors`](native-theme.md#nativethemeshouldusedarkcolors-readonly) API.

### `systemPreferences.isSwipeTrackingFromScrollEventsEnabled()` _macOS_

Возвращает `Boolean` - Ли Проведите между страницами настройки на.

### `systemPreferences.postNotification(event, userInfo[, deliverImmediately])` _macOS_

* `event` String
* `userInfo` рекорд<String, any>
* `deliverImmediately` Boolean (по желанию) - `true` размещать уведомления немедленно, даже если приложение для подписки неактивно.

Сообщения `event` как родные уведомления macOS. Веб `userInfo` является объектом который содержит словарь пользовательской информации, отправленный вместе с уведомлением.

### `systemPreferences.postLocalNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` рекорд<String, any>

Сообщения `event` как родные уведомления macOS. Веб `userInfo` является объектом который содержит словарь пользовательской информации, отправленный вместе с уведомлением.

### `systemPreferences.postWorkspaceNotification(event, userInfo)` _macOS_

* `event` String
* `userInfo` рекорд<String, any>

Сообщения `event` как родные уведомления macOS. Веб `userInfo` является объектом который содержит словарь пользовательской информации, отправленный вместе с уведомлением.

### `systemPreferences.subscribeNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` рекорд<String, unknown>
  * `object` Струна

Возвращает `Number` - Идентификатор этой подписки

Подписываемся на родные уведомления macOS, `callback` будут вызваны с `callback(event, userInfo)` когда произойдет `event` информация. " `userInfo` " - это объект, содержащий словарь пользовательской информации, вместе с уведомлением. Данный `object` отправителем уведомления, а не поддерживает только `NSString` значения на данный момент.

Возвращается `id` абонента, который может быть использован для отписки `event`.

Под капотом этого API подписывается на `NSDistributedNotificationCenter`, пример значения `event` являются:

* `AppleInterfaceThemeChangedNotification`
* `AppleAquaColorVariantChanged`
* `AppleColorPreferencesChangedNotification`
* `AppleShowScrollBarsSettingChanged`

### `systemPreferences.subscribeLocalNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` рекорд<String, unknown>
  * `object` Струна

Возвращает `Number` - Идентификатор этой подписки

То же `subscribeNotification`, но использует `NSNotificationCenter` для локальных дефолтов. Это необходимо для таких событий, как `NSUserDefaultsDidChangeNotification`.

### `systemPreferences.subscribeWorkspaceNotification(event, callback)` _macOS_

* `event` String
* `callback` Function
  * `event` String
  * `userInfo` рекорд<String, unknown>
  * `object` Струна

Возвращает `Number` - Идентификатор этой подписки

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

* `defaults` запись<String, String | Boolean | Number> - словарь (`key: value`) пользовательских по умолчанию

Add the specified defaults to your application's `NSUserDefaults`.

### `systemPreferences.getUserDefault(key, type)` _macOS_

* `key` String
* `type` - может быть `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` или `dictionary`.

Возвращает `any` - Значение `key` в `NSUserDefaults`.

Самые популярные `key` и `type`:

* `AppleInterfaceStyle`: `string`
* `AppleAquaColorVariant`: `integer`
* `AppleHighlightColor`: `string`
* `AppleShowScrollBars`: `string`
* `NSNavRecentPlaces`: `array`
* `NSPreferredWebServices`: `dictionary`
* `NSUserDictionaryReplacementItems`: `array`

### `systemPreferences.setUserDefault(key, type, value)` _macOS_

* `key` String
* `type` - может быть `string`, `boolean`, `integer`, `float`, `double`, `url`, `array` или `dictionary`.
* `value` String

Устанавливает значение `key` в `NSUserDefaults`.

Note that `type` should match actual type of `value`. An exception is thrown if they don't.

Самые популярные `key` и `type`:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

Removes the `key` in `NSUserDefaults`. This can be used to restore the default or global value of a `key` previously set with `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` _Windows_

Returns `Boolean` - `true` if [DWM composition][dwm-composition] (Aero Glass) is enabled, and `false` otherwise.

An example of using it to determine if you should create a transparent window or not (transparent windows won't work correctly when DWM composition is disabled):

```javascript
const { BrowserWindow, systemPreferences } требуют ('электрон')
const browserOptions { width: 1000, height: 800 }

// Сделайте окно прозрачным только в том случае, если платформа поддерживает его.
если (process.platform! ) ' win32' || systemPreferences.isAeroGlassEnabled ()) -
  browserOptions.transparent - true
  browserOptions.frame - ложный


// Создайте окно.
const win - новый BrowserWindow (browserOptions)

// Навигация.
if (browserOptions.transparent) {
  win.loadURL(`file://${__dirname}/index.html`)
} else {
  // Без прозрачности, значит мы загружаем резерв, использующий базовые стили.
  win.loadURL(`file://${__dirname}/fallback.html`) 
}
```

### `systemPreferences.getAccentColor()` _Windows_ _macOS_

Returns `String` - The users current system wide accent color preference in RGBA hexadecimal form.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"` 
const red = color.substr(0, 2) // "aa" 
const green = color.substr(2, 2) // "bb" 
const blue = color.substr(4, 2) // "cc" 
const alpha = color.substr(6, 2) // "dd"
```

This API is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.getColor(color)` _Windows_ _macOS_

* `color` String - одно из следующих значений:
  * На **Windows**:
    * `3d-dark-shadow` - Темная тень для трехмерных элементов дисплея.
    * `3d-face` - Цвет лица для трехмерных элементов дисплея и для диалоговых фонов.
    * `3d-highlight` - Выделите цвет для трехмерных элементов дисплея.
    * `3d-light` - Светлый цвет для трехмерных элементов дисплея.
    * `3d-shadow` - Теневой цвет для трехмерных элементов дисплея.
    * `active-border` - Активная оконная граница.
    * `active-caption` - Активный бар заголовка окна. Определяет левый боковой цвет цветовом градиенте заголовка активного окна, если эффект градиента включен.
    * `active-caption-gradient` - Правый боковой цвет в цветовом градиенте в титульном баре активного окна.
    * `app-workspace` - Фоновый цвет нескольких интерфейсов документов (MDI) приложений.
    * `button-text` - Текст на кнопках нажатия.
    * `caption-text` - Текст в подписи, размер коробки, и прокрутки бар стрелка окно.
    * `desktop` - цвет фона рабочего стола.
    * `disabled-text` - Серый (отключенный) текст.
    * `highlight` - Пункт (ы) выбран в элементе управления.
    * `highlight-text` - Текст элемента (ы), выбранного в элементе управления.
    * `hotlight` - Цвет для гиперссылки или горячего отслеживания пункта.
    * `inactive-border` - Неактивная граница окна.
    * `inactive-caption` - Неактивная подпись к окну. Определяет цвет левой стороны в цветовом градиенте заголовка неактивного окна, если эффект включен.
    * `inactive-caption-gradient` - Правый боковой цвет в цветовом градиенте неактивной стороне титульного бара окна.
    * `inactive-caption-text` - Цвет текста в неактивной подписи.
    * `info-background` - Фоновый цвет для элементов управления инструментом.
    * `info-text` - Текстовый цвет для элементов управления инструментом.
    * `menu` - Фон меню.
    * `menu-highlight` - Цвет, используемый для выделения пунктов меню, когда выглядит как плоское меню.
    * `menubar` - Фоновый цвет для бара меню, когда меню отображаются как плоские меню.
    * `menu-text` - Текст в меню.
    * `scrollbar` - Прокрутите бар серой области.
    * `window` - Фон окна.
    * `window-frame` - Оконная рама.
    * `window-text` - Текст в окнах.
  * На **macOS**
    * `alternate-selected-control-text` - Текст на выбранной поверхности в списке или таблице. _депрекированная_
    * `control-background` - фон большого элемента интерфейса, например браузера или таблицы.
    * `control` - Поверхность управления.
    * `control-text` -Текст управления, который не отключен.
    * `disabled-control-text` - Текст управления, который отключен.
    * `find-highlight` - Цвет индикатора найдите.
    * `grid` - сетки элемента интерфейса, такие как таблица.
    * `header-text` - Текст заголовка ячейки в таблице.
    * `highlight` - Виртуальный источник света на экране.
    * `keyboard-focus-indicator` - Кольцо, которое появляется вокруг в настоящее время сосредоточены управления при использовании клавиатуры для навигации интерфейса.
    * `label` - Текст этикетки, содержащей первичное содержание.
    * `link` - Ссылка на другой контент.
    * `placeholder-text` - строка заполнителя в представлении управления или текста.
    * `quaternary-label` - Текст этикетки меньшей важности, чем третичный ярлык, такой как текст водяного знака.
    * `scrubber-textured-background` - Фон скруббера в сенсорном баре.
    * `secondary-label` - Текст этикетки меньшей важности, чем обычный ярлык, такой как метка, используемая для представления подзаголовка или дополнительной информации.
    * `selected-content-background` - Фон для выбранного содержимого в окне ключа или представлении.
    * `selected-control` - Поверхность выбранного управления.
    * `selected-control-text` - Текст выбранного управления.
    * `selected-menu-item-text` - Текст выбранного меню.
    * `selected-text-background` - Фон выбранного текста.
    * `selected-text` - Выбранный текст.
    * `separator` - сепаратор между различными разделами контента.
    * `shadow` - Виртуальная тень, отбрасываемая поднятым объектом на экране.
    * `tertiary-label` - Текст этикетки меньшей важности, чем второстепенный ярлык, такой как метка, используемая для представления отключенного текста.
    * `text-background` - Текстовый фон.
    * `text` - Текст в документе.
    * `under-page-background` - Фон содержания документа.
    * `unemphasized-selected-content-background` - Выбранное содержимое в окне или представлении без ключей.
    * `unemphasized-selected-text-background` - Фон для выбранного текста в окне или представлении без ключей.
    * `unemphasized-selected-text` - Выбранный текст в окне или представлении без ключей.
    * `window-background` - Фон окна.
    * `window-frame-text` - Текст в титульной панели окна области.

Returns `String` - The system color setting in RGB hexadecimal form (`#ABCDEF`). See the [Windows docs][windows-colors] and the [macOS docs][macos-colors] for more details.

The following colors are only available on macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`, and `unemphasized-selected-text`.

### `systemPreferences.getSystemColor(color)` _macOS_

* `color` String - одно из следующих значений:
  * `Синий`
  * `Коричневый`
  * `Серый`
  * `Зеленый`
  * `Оранжевый`
  * `Розовый`
  * `Фиолетовый`
  * `Красного`
  * `Желтый`

Returns `String` - The standard system color formatted as `#RRGGBBAA`.

Returns one of several standard system colors that automatically adapt to vibrancy and changes in accessibility settings like 'Increase contrast' and 'Reduce transparency'. See [Apple Documentation](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) for  more details.

### `systemPreferences.isInvertedColorScheme()` _Windows_ _deprecated_

Returns `Boolean` - `true` if an inverted color scheme (a high contrast color scheme with light text and dark backgrounds) is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### `systemPreferences.isHighContrastColorScheme()` _macOS_ _Windows_ _Deprecated_

Returns `Boolean` - `true` if a high contrast theme is active, `false` otherwise.

**Deprecated:** Should use the new [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` _macOS_

Returns `String` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

### `systemPreferences.getAppLevelAppearance()` _macOS_ _Deprecated_

Returns `String` | `null` - Can be `dark`, `light` or `unknown`.

Gets the macOS appearance setting that you have declared you want for your application, maps to [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). You can use the `setAppLevelAppearance` API to set this value.

### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _Deprecated_

* `appearance` струнные | null - может быть `dark` или `light`

Sets the appearance setting for your application, this should override the system default and override the value of `getEffectiveAppearance`.

### `systemPreferences.canPromptTouchID()` _macOS_

Returns `Boolean` - whether or not this device has the ability to use Touch ID.

**NOTE:** This API will return `false` on macOS systems older than Sierra 10.12.2.

### `systemPreferences.promptTouchID(reason)` _macOS_

* `reason` строка - Причина, по которой вы просите проверку подлинности Touch ID

Returns `Promise<void>` - resolves if the user has successfully authenticated with Touch ID.

```javascript
const { systemPreferences } - требуют ('электрон')

systemPreferences.promptTouchID ('Чтобы получить согласие на безопасность-Gated Thing'.log
  > ).
В).поймать (ошибка>
  консоли.log (ошибка)
)
```

This API itself will not protect your user data; rather, it is a mechanism to allow you to do so. Native apps will need to set [Access Control Constants](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) like [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) on their keychain entry so that reading it would auto-prompt for Touch ID biometric consent. This could be done with [`node-keytar`](https://github.com/atom/node-keytar), such that one would store an encryption key with `node-keytar` and only fetch it if `promptTouchID()` resolves.

**NOTE:** This API will return a rejected Promise on macOS systems older than Sierra 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` Boolean - будет ли пользователь проинформирован через подсказку, если текущий процесс не соответствует действительности.

Returns `Boolean` - `true` if the current process is a trusted accessibility client and `false` if it is not.

### `systemPreferences.getMediaAccessStatus(mediaType)` _Windows_ _macOS_

* `mediaType` - может быть `microphone`, `camera` или `screen`.

Returns `String` - Can be `not-determined`, `granted`, `denied`, `restricted` or `unknown`.

This user consent was not required on macOS 10.13 High Sierra or lower so this method will always return `granted`. macOS 10.14 Mojave or higher requires consent for `microphone` and `camera` access. macOS 10.15 Catalina or higher requires consent for `screen` access.

Windows 10 has a global setting controlling `microphone` and `camera` access for all win32 applications. It will always return `granted` for `screen` and for all media types on older versions of Windows.

### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - тип запрашиваемых средств массовой информации; может быть `microphone`, `camera`.

Returns `Promise<Boolean>` - A promise that resolves with `true` if consent was granted and `false` if it was denied. If an invalid `mediaType` is passed, the promise will be rejected. If an access request was denied and later is changed through the System Preferences pane, a restart of the app will be required for the new permissions to take effect. If access has already been requested and denied, it _must_ be changed through the preference pane; an alert will not pop up and the promise will resolve with the existing access status.

**Important:** In order to properly leverage this API, you [must set](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) the `NSMicrophoneUsageDescription` and `NSCameraUsageDescription` strings in your app's `Info.plist` file. The values for these keys will be used to populate the permission dialogs so that the user will be properly informed as to the purpose of the permission request. See [Electron Application Distribution](https://electronjs.org/docs/tutorial/application-distribution#macos) for more information about how to set these in the context of Electron.

This user consent was not required until macOS 10.14 Mojave, so this method will always return `true` if your system is running 10.13 High Sierra or lower.

### `systemPreferences.getAnimationSettings()`

Возвращает `Object`:

* `shouldRenderRichAnimation` Boolean - Возвращает верно, если богатые анимации должны быть предоставлены. Просмотр типа сеанса (например, удаленного рабочего стола) и параметров доступности для получения рекомендаций для тяжелой анимации.
* `scrollAnimationsEnabledBySystem` Boolean - определяет на основе платформы, следует ли включены анимации прокрутки (например, произведенные ключом дома/конца).
* `prefersReducedMotion` Boolean - Определяет, желает ли пользователь уменьшить движение на основе API-платформы.

Returns an object with system animation settings.

## Свойства

### `systemPreferences.appLevelAppearance` _macOS_

A `String` property that can be `dark`, `light` or `unknown`. It determines the macOS appearance setting for your application. This maps to values in: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Setting this will override the system default as well as the value of `getEffectiveAppearance`.

Possible values that can be set are `dark` and `light`, and possible return values are `dark`, `light`, and `unknown`.

This property is only available on macOS 10.14 Mojave or newer.

### `systemPreferences.effectiveAppearance` _macOS_ _Readonly_

A `String` property that can be `dark`, `light` or `unknown`.

Returns the macOS appearance setting that is currently applied to your application, maps to [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
