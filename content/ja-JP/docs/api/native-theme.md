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

`String` 型のプロパティです。`system`、`light` か `dark` にできます。  Chromium が内部で使用することを選択した値をオーバーライドして置き換えるために使用されます。

このプロパティを `system` に設定するとオーバーライドが削除され、すべてが OS のデフォルトにリセットされます。  既定の `themeSource` は `system` です。

このプロパティを `dark` に設定すると、以下の効果があります。
* `nativeTheme.shouldUseDarkColors` はアクセス時に `true` になります
* Linux および Windows でのコンテキストメニュー、デベロッパーツールなどを含む UI Electron の描画は、 ダーク UI を使用します。
* OS がメニュー、ウィンドウフレームなどを含む macOS 上でレンダリングする UI は、すべて ダーク UI を使用します。
* [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS が `dark` モードに親和します。
* `updated` イベントが発生します。

このプロパティを `light` に設定すると、以下の効果があります。
* `nativeTheme.shouldUseDarkColors` はアクセス時に `false` になります
* Linux および Windows でのコンテキストメニュー、デベロッパーツールなどを含む UI Electron の描画は、 ライト UI を使用します。
* OS がメニュー、ウィンドウフレームなどを含む macOS 上でレンダリングする UI は、すべて ライト UI を使用します。
* [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS が `light` モードに親和します。
* `updated` イベントが発生します。

The usage of this property should align with a classic "dark mode" state machine in your application where the user has three options.
* `Follow OS` --> `themeSource = 'system'`
* `Dark Mode` --> `themeSource = 'dark'`
* `Light Mode` --> `themeSource = 'light'`

Your application should then always use `shouldUseDarkColors` to determine what CSS to apply.

### `nativeTheme.shouldUseHighContrastColors` _macOS_ _Windows_ _Readonly_

A `Boolean` for if the OS / Chromium currently has high-contrast mode enabled or is being instructed to show a high-constrast UI.

### `nativeTheme.shouldUseInvertedColorScheme` _macOS_ _Windows_ _Readonly_

A `Boolean` for if the OS / Chromium currently has an inverted color scheme or is being instructed to use an inverted color scheme.
