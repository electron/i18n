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

Свойство `String` может быть `system`, `light` или `dark`.  Используется для переопределения и замены значения, которое Chromium выбрал для внутреннего использования.

Установка этого свойства на `system` удалит переопределение и все будет сброшено на установленное ОС по умолчанию.  По умолчанию `themeSource` является `system`.

Параметры свойства `dark` имеют следующие эффекты:
* `nativeTheme.shouldUseDarkColors` при обращении будет `true`
* Любой интерфейс Electron, отображаемый в Linux и Windows, включая контекстные меню, devtools, и т. д. будет иметь темный интерфейс.
* Любой интерфейс, который ОС отображает на macOS с меню, оконными рамками и т. д. будет иметь темный интерфейс.
* The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS query will match `dark` mode.
* The `updated` event will be emitted

Settings this property to `light` will have the following effects:
* `nativeTheme.shouldUseDarkColors` will be `false` when accessed
* Любой интерфейс Electron, отображаемый в Linux и Windows, включая контекстные меню, devtools, и т. д. will use the light UI.
* Любой интерфейс, который ОС отображает на macOS с меню, оконными рамками и т. д. will use the light UI.
* The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS query will match `light` mode.
* The `updated` event will be emitted

The usage of this property should align with a classic "dark mode" state machine in your application where the user has three options.
* `Follow OS` --> `themeSource = 'system'`
* `Dark Mode` --> `themeSource = 'dark'`
* `Light Mode` --> `themeSource = 'light'`

Your application should then always use `shouldUseDarkColors` to determine what CSS to apply.

### `nativeTheme.shouldUseHighContrastColors` _macOS_ _Windows_ _Readonly_

A `Boolean` for if the OS / Chromium currently has high-contrast mode enabled or is being instructed to show a high-constrast UI.

### `nativeTheme.shouldUseInvertedColorScheme` _macOS_ _Windows_ _Readonly_

A `Boolean` for if the OS / Chromium currently has an inverted color scheme or is being instructed to use an inverted color scheme.
