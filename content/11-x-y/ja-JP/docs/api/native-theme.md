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

`String` 型のプロパティです。`system`、`light` か `dark` にできます。  It is used to override and supersede the value that Chromium has chosen to use internally.

このプロパティを `system` に設定するとオーバーライドが削除され、すべてが OS のデフォルトにリセットされます。  既定の `themeSource` は `system` です。

このプロパティを `dark` に設定すると、以下の効果があります。
* `nativeTheme.shouldUseDarkColors` はアクセス時に `true` になります
* 右クリックメニューやデベロッパー ツールなど、Linux や Windows 上で Electron がレンダリングするすべての UI は、ダーク UI を使用します。
* メニューやウィンドウフレームなどの OS が macOS 上でレンダリングする UI は、すべてダーク UI を使用します。
* [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS が `dark` モードに親和します。
* `updated` イベントが発生します。

このプロパティを `light` に設定すると、以下の効果があります。
* `nativeTheme.shouldUseDarkColors` はアクセス時に `false` になります
* 右クリックメニューやデベロッパー ツールなど、Linux や Windows 上で Electron がレンダリングするすべての UI は、ライト UI を使用します。
* メニューやウィンドウフレームなどの OS が macOS 上でレンダリングする UI は、すべてライト UI を使用します。
* [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS が `light` モードに親和します。
* `updated` イベントが発生します。

このプロパティを使用するにあたって、ユーザーに以下のような 3 つの選択肢がある、古典的なアプリケーションの "ダークモード" ステートマシンに合わせるべきです。
* `Follow OS` --> `themeSource = 'system'`
* `Dark Mode` --> `themeSource = 'dark'`
* `Light Mode` --> `themeSource = 'light'`

アプリケーションは、`shouldUseDarkColors` を使用して、適用する CSS を常に決定する必要があります。

### `nativeTheme.shouldUseHighContrastColors` _macOS_ _Windows_ _読み出し専用_

A `Boolean` for if the OS / Chromium currently has high-contrast mode enabled or is being instructed to show a high-contrast UI.

### `nativeTheme.shouldUseInvertedColorScheme` _macOS_ _Windows_ _読み出し専用_

OS / Chromium が現在反転カラースキームを持っている、または反転カラースキームを使用するように指示されているかどうかの `Boolean`。
