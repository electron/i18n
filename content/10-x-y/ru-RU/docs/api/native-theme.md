# nativeTheme (Родная тема)

> Читайте и реагируйте на изменения в родной цветовой теме Chromium.

Процесс: [Главный](../glossary.md#main-process)

## События

Объект `nativeTheme` имеет следующие события:

### Событие: 'updated'

Возникает, когда в основной NativeTheme что-то изменилось. Это обычно означает, что значение `shouldUseDarkColors` (использовать темные цвета), `shouldUseHighContrastColors` (использовать высококонтрастные цвета) или `shouldUseInvertedColorScheme` (использовать инвертированную цветовую гамму) - изменилось. Вам придется проверить их для того, чтобы определить, какие из них были изменены.

## Свойства

Объект `nativeTheme` имеет следующие свойства:

### `nativeTheme.shouldUseDarkColors` _Только чтение_

`Boolean` - в данный момент для текущей OS / Chromium включен темный режим или дается указание отображать пользовательский интерфейс в темном режиме.  Если вы хотите изменить это значение, вы должны использовать `themeSource` ниже.

### `nativeTheme.themeSource`

Свойство `String` может быть `system`, `light` или `dark`.  It is used to override and supersede the value that Chromium has chosen to use internally.

Установка этого свойства на `system` удалит переопределение и все будет сброшено на установленное ОС по умолчанию.  По умолчанию `themeSource` является `system`.

Параметры свойства `dark` имеют следующие эффекты:
* `nativeTheme.shouldUseDarkColors` при обращении будет `true`
* Any UI Electron renders on Linux and Windows including context menus, devtools, etc. will use the dark UI.
* Any UI the OS renders on macOS including menus, window frames, etc. will use the dark UI.
* Запрос [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS будет соответствовать режиму `dark`.
* Возникнет событие `updated`

Параметры свойства `light` имеют следующие эффекты:
* `nativeTheme.shouldUseDarkColors` при обращении будет `false`
* Any UI Electron renders on Linux and Windows including context menus, devtools, etc. will use the light UI.
* Any UI the OS renders on macOS including menus, window frames, etc. will use the light UI.
* Запрос [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS будет соответствовать режиму `light`.
* Возникнет событие `updated`

Использование этого свойства должно совпадать с классическим "темным режимом" машины в вашем приложении, где у пользователя есть три варианта.
* `Follow OS` --> `themeSource = 'system'`
* `Dark Mode` --> `themeSource = 'dark'`
* `Light Mode` --> `themeSource = 'light'`

В этом случае ваше приложение должно всегда использовать `shouldUseDarkColors`, чтобы определить, какой CSS будет применяться.

### `nativeTheme.shouldUseHighContrastColors` _macOS_ _Windows_ _Только чтение_

`Boolean` - в данный момент для текущей OS / Chromium включен режим отбражения с высокой контрастностью или дается указание отображать пользовательский интерфейс с высокой контрастностью.

### `nativeTheme.shouldUseInvertedColorScheme` _macOS_ _Windows_ _Только чтение_

`Boolean` - в данный момент для текущей OS / Chromium включен режим инвертирования цветовой схемы или дается указание отображать пользовательский интерфейс с инвертированной цветовой схемой.
