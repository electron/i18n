# Web-Einbettungen

## Übersicht

Wenn Sie Webinhalte (von Drittanbietern) in ein Electron `BrowserWindow`einbetten möchten, stehen Ihnen drei Optionen zur Verfügung: `<iframe>` Tags, `<webview>` Tags, und `BrowserViews`. Jedes bietet etwas andere Funktionen und ist in verschiedenen Situationen nützlich. Um Ihnen bei der Auswahl zu helfen, erläutert dieser Leitfaden die Unterschiede und Fähigkeiten der einzelnen Optionen.

### Iframes

Iframes haben die selben Eigenschaften in Electron wie in normalen Browsern. Ein `<iframe>` Element auf Ihrer Seite kann externe Webseiten anzeigen, vorausgesetzt, dass die [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) dies zulässt. Um die Anzahl der Funktionen einer Site in einem `<iframe>` -Tag einzuschränken, wird empfohlen, es wird empfohlen, das [`sandbox` -Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) zu verwenden und nur die Funktionen zuzulassen, die Sie unterstützen möchten.

### WebViews

> Wichtiger Hinweis: [wir Ihnen nicht empfehlen, WebViews](../api/webview-tag.md#warning)zu verwenden, da dieses Tag dramatische architekturische Änderungen durchläuft, die sich auf die Stabilität Ihrer Anwendung auswirken können. Erwägen Sie, zu Alternativen wie `iframe` und Electrones `BrowserView`zu wechseln, oder zu einer Architektur, die eingebettete Inhalte durch Design vermeidet.

[WebViews](../api/webview-tag.md) basieren auf den WebViews von Chromium und werden nicht explizit von Electron unterstützt. Wir garantieren nicht, dass die WebView-API in zukünftigen Versionen von Electron verfügbar bleibt. Um `<webview>` Tags verwenden zu können, müssen Sie `webviewTag` im `webPreferences` Ihrer `BrowserWindow`auf `true` festlegen.

WebView ist ein benutzerdefiniertes Element (`<webview>`), das nur innerhalb von Electron funktioniert. Sie sind als ein "außerhalb-des-Prozesses iframe" implementiert. Dies bedeutet, dass alle Kommunikation mit dem `<webview>` asynchron mit IPC erfolgt. Das `<webview>` -Element verfügt über viele benutzerdefinierte Methoden und Ereignisse, ähnlich `webContents`, die Ihnen eine bessere Kontrolle über den Inhalt bieten.

Im Vergleich zu einem `<iframe>`ist `<webview>` tendenziell etwas langsamer, bietet aber viel mehr Kontrolle beim Laden und Kommunizieren mit Inhalten von Drittanbietern und beim Umgang mit verschiedenen Ereignissen.

### BrowserViews

[BrowserViews](../api/browser-view.md) sind nicht Teil des DOMs, sondern sie in Ihrem Hauptprozess erstellt und gesteuert werden. Sie werden einfach einer weiteren Ebene von Webinhalten über Ihrem vorhandenen Fenster. Dies bedeutet, , dass sie vollständig von Ihren eigenen `BrowserWindow` Inhalten getrennt sind und ihre Position nicht vom DOM oder CSS gesteuert wird. Stattdessen wird gesteuert, indem die Grenzen im Hauptprozess gesetzt werden.

`BrowserViews` die größte Kontrolle über ihre Inhalte bieten, da sie die `webContents` ähnlich wie die `BrowserWindow` implementieren. Da `BrowserViews` jedoch nicht Teil Ihres DOMs sind, sondern eher überlagert sind darüber, müssen Sie ihre Position manuell verwalten.
