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
* Запрос [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS будет соответствовать режиму `dark`.
* Возникнет событие `updated`

Параметры свойства `light` имеют следующие эффекты:
* `nativeTheme.shouldUseDarkColors` при обращении будет `false`
* Любой интерфейс Electron, отображаемый в Linux и Windows, включая контекстные меню, devtools, и т. д. будет иметь светлый интерфейс.
* Любой интерфейс, который ОС отображает на macOS с меню, оконными рамками и т. д. будет иметь светлый интерфейс.
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

A `Boolean` for if the OS / Chromium currently has an inverted color scheme or is being instructed to use an inverted color scheme.
