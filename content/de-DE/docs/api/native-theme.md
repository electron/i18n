# nativeThema

> Lesen und reagieren Sie auf Änderungen im nativen Farbdesign von Chromium.

Prozess: [Main](../glossary.md#main-process)

## Ereignisse

Das `nativeTheme` -Modul gibt die folgenden Ereignisse aus:

### Veranstaltung: 'aktualisiert'

Emittiert, wenn sich etwas im zugrunde liegenden NativeTheme geändert hat. Dies bedeutet normalerweise , dass sich entweder der Wert von `shouldUseDarkColors`, `shouldUseHighContrastColors` oder `shouldUseInvertedColorScheme` geändert hat. Sie müssen sie überprüfen, um festzustellen, welche geändert wurde.

## Eigenschaften

Das `nativeTheme` Modul verfügt über die folgenden Eigenschaften:

### `nativeTheme.shouldUseDarkColors` _Readonly_

Ein `Boolean` , ob das Betriebssystem / Chrom derzeit einen dunklen Modus aktiviert hat oder angewiesen wird, eine Benutzeroberfläche im dunklen Stil anzuzeigen.  Wenn Sie diesen Wert ändern möchten, sollten Sie `themeSource` unten verwenden.

### `nativeTheme.themeQuelle`

Eine `String` Eigenschaft, die `system`, `light` oder `dark`sein kann.  Es wird verwendet, um den Wert zu überschreiben und zu überlösen, den Chromium intern verwendet hat.

Wenn Sie diese Eigenschaft auf `system` festlegen, wird die Außerkraftsetzung entfernt, und alles auf den Betriebssystemstandard zurückgesetzt wird.  Standardmäßig ist `themeSource` `system`.

Die Einstellung dieser Eigenschaft auf `dark` hat folgende Auswirkungen:

* `nativeTheme.shouldUseDarkColors` wird `true` , wenn auf
* Alle UI-Elektronen-Renderings unter Linux und Windows, einschließlich Kontextmenüs, Devtools usw., verwenden die dunkle Benutzeroberfläche.
* Jede Benutzeroberfläche, die das Betriebssystem unter macOS rendert, einschließlich Menüs, Fensterrahmen usw., verwendet die dunkle Benutzeroberfläche.
* Die [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS-Abfrage stimmt mit `dark` Modus überein.
* Die `updated` Veranstaltung wird

Die Einstellung dieser Eigenschaft auf `light` hat folgende Auswirkungen:

* `nativeTheme.shouldUseDarkColors` wird `false` , wenn auf
* Alle UI-Elektronen-Renderings unter Linux und Windows, einschließlich Kontextmenüs, Devtools usw., verwenden die Licht-UI.
* Jede Benutzeroberfläche, die das Betriebssystem unter macOS rendert, einschließlich Menüs, Fensterrahmen usw., verwendet die Licht-UI.
* Die [`prefers-color-scheme`](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) CSS-Abfrage stimmt mit `light` Modus überein.
* Die `updated` Veranstaltung wird

Die Verwendung dieser Eigenschaft sollte an einem klassischen Statuscomputer für den "dunklen Modus" in Ihrer Anwendung ausgerichtet werden, wo der Benutzer drei Optionen hat.

* `Follow OS` --> `themeSource = 'system'`
* `Dark Mode` --> `themeSource = 'dark'`
* `Light Mode` --> `themeSource = 'light'`

Ihre Anwendung sollte dann immer `shouldUseDarkColors` verwenden, um zu bestimmen, welches CSS angewendet werden soll.

### `nativeTheme.shouldUseHighContrastColors` _macOS_ _Windows_ _Readonly_

Ein `Boolean` , wenn das Betriebssystem / Chrom derzeit den Modus mit hohem Kontrast aktiviert hat oder angewiesen wird, eine kontrastreiche Benutzeroberfläche anzuzeigen.

### `nativeTheme.shouldUseInvertedColorScheme` _macOS_ _Windows_ _Readonly_

Ein `Boolean` , wenn das Betriebssystem / Chrom derzeit ein invertiertes Farbschema hat oder angewiesen wird, ein invertiertes Farbschema zu verwenden.
