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

Так же, как `subscribeNotification`, но использует `NSWorkspace.sharedWorkspace.notificationCenter`. Это необходимо для таких событий, как `NSWorkspaceDidActivateApplicationNotification`.

### `systemPreferences.unsubscribeNotification(id)` _macOS_

* `id` Integer

Удаляет абонента с `id`.

### `systemPreferences.unsubscribeLocalNotification(id)` _macOS_

* `id` Integer

Так же, `unsubscribeNotification`, но удаляет абонента из `NSNotificationCenter`.

### `systemPreferences.unsubscribeWorkspaceNotification(id)` _macOS_

* `id` Integer

Так же, `unsubscribeNotification`, но удаляет абонента из `NSWorkspace.sharedWorkspace.notificationCenter`.

### `systemPreferences.registerDefaults(defaults)` _macOS_

* `defaults` запись<String, String | Boolean | Number> - словарь (`key: value`) пользовательских по умолчанию

Добавьте указанные значения по умолчанию в `NSUserDefaults`.

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

Обратите внимание, `type` должны соответствовать фактическому типу `value`. Исключение брошено в если они этого не делают.

Самые популярные `key` и `type`:

* `ApplePressAndHoldEnabled`: `boolean`

### `systemPreferences.removeUserDefault(key)` _macOS_

* `key` String

Удаляет `key` в `NSUserDefaults`. Это может быть использовано для восстановления или глобального значения `key` , установленного с `setUserDefault`.

### `systemPreferences.isAeroGlassEnabled()` _Windows_

Возвращает `Boolean` - `true` если [состав DWM][dwm-composition] (Aero Glass) включен, и `false` иначе.

Пример использования его для определения, следует ли создавать прозрачное окно или нет (прозрачные окна не будут работать правильно, когда состав DWM отключен):

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

Возвращает `String` - Пользователи текущей системы широкий акцент цвет предпочтения в RGBA шестисемейной форме.

```js
const color = systemPreferences.getAccentColor() // `"aabbccdd"` 
const red = color.substr(0, 2) // "aa" 
const green = color.substr(2, 2) // "bb" 
const blue = color.substr(4, 2) // "cc" 
const alpha = color.substr(6, 2) // "dd"
```

Этот API доступен только на macOS 10.14 Mojave или новее.

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

Возвращает `String` - Настройка цвета системы в шестисемейной форме RGB (`#ABCDEF`). Более подробную информацию [можно][windows-colors] документах Windows [документах macOS][macos-colors] подробную информацию.

Следующие цвета доступны только на macOS 10.14: `find-highlight`, `selected-content-background`, `separator`, `unemphasized-selected-content-background`, `unemphasized-selected-text-background`и `unemphasized-selected-text`.

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

Возвращает `String` - Стандартный цвет системы отформатирован как `#RRGGBBAA`.

Возвращает один из нескольких стандартных системных цветов, которые автоматически адаптируются к вибрации и изменениям в настройках доступности, таких как "Увеличить контрастность" и "Уменьшить прозрачность". Более подробную [смотрите](https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#system-colors) документации Apple.

### `systemPreferences.isInvertedColorScheme()` _Windows_ _deprecated_

Возвращает `Boolean` - `true` если перевернутая цветовая гамма (высоко контрастная цветовая гамма со светлым текстом и темным фоном) активна, `false` иначе.

**:** должны использовать новый [`nativeTheme.shouldUseInvertedColorScheme`](native-theme.md#nativethemeshoulduseinvertedcolorscheme-macos-windows-readonly) API.

### `systemPreferences.isHighContrastColorScheme()` _macOS_ _Windows_ _Deprecated_

Возвращает `Boolean` - `true` если тема высокого контраста активна, то `false` иначе.

**:** должны использовать новый [`nativeTheme.shouldUseHighContrastColors`](native-theme.md#nativethemeshouldusehighcontrastcolors-macos-windows-readonly) API.

### `systemPreferences.getEffectiveAppearance()` _macOS_

Возвращает `String` - может быть `dark`, `light` или `unknown`.

Получает настройки внешнего вида macOS, которые в настоящее время применяются к вашему приложению, карты [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

### `systemPreferences.getAppLevelAppearance()` _macOS_ _Deprecated_

Возвращает `String` | `null` - может быть `dark`, `light` или `unknown`.

Получает настройки внешнего вида macOS, которые вы объявили, что хотите для приложения, карты для [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Вы можете использовать `setAppLevelAppearance` API для настройки этого значения.

### `systemPreferences.setAppLevelAppearance(appearance)` _macOS_ _Deprecated_

* `appearance` струнные | null - может быть `dark` или `light`

Устанавливает настройки внешнего вида для приложения, это должно переопределить по умолчанию и переопределить значение `getEffectiveAppearance`.

### `systemPreferences.canPromptTouchID()` _macOS_

Возвращает `Boolean` - имеет ли это устройство возможность использовать Touch ID.

**ПРИМЕЧАНИЕ:** этот API вернется `false` на системах macOS старше Сьерра 10.12.2.

### `systemPreferences.promptTouchID(reason)` _macOS_

* `reason` строка - Причина, по которой вы просите проверку подлинности Touch ID

Возвращает `Promise<void>` - решает, если пользователь успешно аутентичен с Touch ID.

```javascript
const { systemPreferences } - требуют ('электрон')

systemPreferences.promptTouchID ('Чтобы получить согласие на безопасность-Gated Thing'.log
  > ).
В).поймать (ошибка>
  консоли.log (ошибка)
)
```

Этот API сам по себе не будет защищать ваши пользовательские данные; скорее, это механизм, позволяющий вам сделать это. Родные приложения должны будут установить [управления доступом константы](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags?language=objc) как [`kSecAccessControlUserPresence`](https://developer.apple.com/documentation/security/secaccesscontrolcreateflags/ksecaccesscontroluserpresence?language=objc) на их брелок вступления так, что чтение было бы автоматически подсказать для Touch ID биометрического согласия. Это может быть сделано с [`node-keytar`](https://github.com/atom/node-keytar), таким образом, что можно было бы хранить ключ шифрования с `node-keytar` и только принести его, `promptTouchID()` решает.

**ПРИМЕЧАНИЕ:** этот API вернет отвергнутое Обещание на системах macOS старше Сьерра 10.12.2.

### `systemPreferences.isTrustedAccessibilityClient(prompt)` _macOS_

* `prompt` Boolean - будет ли пользователь проинформирован через подсказку, если текущий процесс не соответствует действительности.

Возвращает `Boolean` - `true` , если текущий процесс является надежным клиентом доступности и `false` если это не так.

### `systemPreferences.getMediaAccessStatus(mediaType)` _Windows_ _macOS_

* `mediaType` - может быть `microphone`, `camera` или `screen`.

Возвращает `String` - может быть `not-determined`, `granted`, `denied`, `restricted` или `unknown`.

Это согласие пользователя не требуется на macOS 10.13 High Sierra или ниже, так что этот метод всегда будет `granted`. macOS 10.14 Мохаве или выше требует согласия на `microphone` и `camera` доступ. macOS 10.15 Каталина или выше требует согласия на `screen` доступ.

Windows 10 имеет глобальную настройку, контролируя `microphone` и `camera` для всех приложений win32. Он всегда будет `granted` для `screen` и для всех типов мультимедиа на старых версиях Windows.

### `systemPreferences.askForMediaAccess(mediaType)` _macOS_

* `mediaType` String - тип запрашиваемых средств массовой информации; может быть `microphone`, `camera`.

Возвращает `Promise<Boolean>` - Обещание, которое решает с `true` если согласие было предоставлено и `false` если ему было отказано. Если недействительная `mediaType` будет принята, обещание будет отклонено. Если запрос на доступ был отклонен, а затем изменен через панели системных предпочтений, для в силу новых разрешений потребуется перезагрузка приложения. Если доступ уже запрошен и отказано, он _должен_ быть изменен с помощью панели предпочтений; оповещение не всплывает, и обещание разрешится с существующим статусом доступа.

**:** Для правильного использования этого API вы должны установить [строки](https://developer.apple.com/documentation/avfoundation/cameras_and_media_capture/requesting_authorization_for_media_capture_on_macos?language=objc) `NSMicrophoneUsageDescription` и `NSCameraUsageDescription` в файле приложения `Info.plist` . Значения этих ключей будут использоваться для заполнения диалогов разрешений, чтобы пользователь был должным образом проинформирован о цели запроса разрешения. Подробнее [том, как установить их в контексте Electron](https://electronjs.org/docs/tutorial/application-distribution#macos) можно найти в программе Electron Application Distribution.

Это согласие пользователя не требовалось до macOS 10.14 Mojave, поэтому этот метод всегда будет возвращаться `true` если ваша система работает 10.13 High Sierra или ниже.

### `systemPreferences.getAnimationSettings()`

Возвращает `Object`:

* `shouldRenderRichAnimation` Boolean - Возвращает верно, если богатые анимации должны быть предоставлены. Просмотр типа сеанса (например, удаленного рабочего стола) и параметров доступности для получения рекомендаций для тяжелой анимации.
* `scrollAnimationsEnabledBySystem` Boolean - определяет на основе платформы, следует ли включены анимации прокрутки (например, произведенные ключом дома/конца).
* `prefersReducedMotion` Boolean - Определяет, желает ли пользователь уменьшить движение на основе API-платформы.

Возвращает объект с настройками системной анимации.

## Свойства

### `systemPreferences.appLevelAppearance` _macOS_

Не `String` , которое может быть `dark`, `light` или `unknown`. Он определяет настройку внешнего вида macOS для вашего приложения. Это карты значения в: [NSApplication.appearance](https://developer.apple.com/documentation/appkit/nsapplication/2967170-appearance?language=objc). Установка этого позволит переопределить по умолчанию, а также значение `getEffectiveAppearance`.

Возможные значения, которые могут быть установлены, `dark` и `light`, и возможные значения возврата `dark`, `light`, и `unknown`.

Это свойство доступно только на macOS 10.14 Mojave или более новый.

### `systemPreferences.effectiveAppearance` _macOS_ _Readonly_

Не `String` , которое может быть `dark`, `light` или `unknown`.

Возвращает настройки внешнего вида macOS, которые в настоящее время применяются к вашему приложению, карты [NSApplication.effectiveAppearance](https://developer.apple.com/documentation/appkit/nsapplication/2967171-effectiveappearance?language=objc)

[dwm-composition]: https://msdn.microsoft.com/en-us/library/windows/desktop/aa969540.aspx

[windows-colors]: https://msdn.microsoft.com/en-us/library/windows/desktop/ms724371(v=vs.85).aspx
[macos-colors]: https://developer.apple.com/design/human-interface-guidelines/macos/visual-design/color#dynamic-system-colors
