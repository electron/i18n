# nativeTheme

> Chromium のネイティブカラーテーマの変更を読み取って対応します。

プロセス: [Main](../glossary.md#main-process)

## イベント

`nativeTheme` モジュールには以下のイベントがあります。

### イベント: 'updated'

基になる NativeTheme の何かが変更されたときに発行されます。 これは通常、`shouldUseDarkColors`、`shouldUseHighContrastColors` または `shouldUseInvertedColorScheme` のいずれかの値が変更されたことを意味します。 それらを確認して、どれが変更されたかを判断する必要があります。

## プロパティ

`nativeTheme` モジュールには以下のプロパティがあります。

### `nativeTheme.shouldUseDarkColors` _読み出し専用_

OS / Chromium で現在ダークモードが有効になっている、またはダークスタイルの UI を表示するように指示されているかどうかの `Boolean`。  この値を変更する場合は、以下の `themeSource` を使用する必要があります。

### `nativeTheme.themeSource`

`String` 型のプロパティです。`system`、`light` か `dark` にできます。  It is used to override and supercede the value that Chromium has chosen to use internally.

Setting this property to `system` will remove the override and everything will be reset to the OS default.  By default `themeSource` is `system`.

Settings this property to `dark` will have the following effects:
* `nativeTheme.shouldUseDarkColors` will be `true` when accessed
* Any UI Electron renders on Linux and Windows including context menus, devtools, etc. will use the dark UI.
* Any UI the OS renders on macOS including menus, window frames, etc. will use the dark UI.
* The [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS query will match `dark` mode.
* The `updated` event will be emitted

Settings this property to `light` will have the following effects:
* `nativeTheme.shouldUseDarkColors` will be `false` when accessed
* Any UI Electron renders on Linux and Windows including context menus, devtools, etc. will use the light UI.
* Any UI the OS renders on macOS including menus, window frames, etc. will use the light UI.
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
