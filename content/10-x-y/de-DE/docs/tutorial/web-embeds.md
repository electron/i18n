# Einbindung von Webseiten in Electron

Um ein Web-Inhalt (eigenen oder den von Dritt-Anbieter) in ein Electron `BrowserWindow` einzubinden, gibt es insgesamt drei Optionen: `<iframe>` Tag, `<webview>` Tag, und `BrowserViews`. Jeder dieser Optionen haben leicht verschiedene Funktionen und sind nützlich in verschiedenen Situationen. Um bei der Auswahl der geeigneten Funktion zu helfen, erklärt diese Anleitung die Unterschiede und Fähigkeiten der einzelnen Optionen.

## Iframes

Iframes haben die selben Eigenschaften in Electron wie in normalen Browsern. Ein `<iframe>` Element kann den Inhalt einer externen Webseite in deiner Electron-App anzeigen, sofern dies die sogenannte [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP) der jeweiligen Webseite erlaubt. Um die Anzahl der Funktionen einer mit einem `<iframe>` Tag eingebunden Seite zu begrenzen wird empfohlen, das [`sandbox` Attribut](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe#attr-sandbox) zu benutzen und nur die Funktionen zu erlauben, die Sie unterstützen möchten.

## WebViews

[WebViews](../api/webview-tag.md) basieren auf WebViews von Chromium und werden nicht explizit von Electron unterstützt. Wir garantieren nicht, dass die WebView API auch in neuen Versionen der Electron-Plattform unterstützt werden. Dies ist der Grund, warum bei der Benutzung von `<webview>` Tags, die Option `webviewTag` in den Einstellungen, unter `webPreferences` des `BrowserWindow` auf `true` gesetzt werden muss.

WebViews sind ein benutzerdefiniertes Element (`<webview>`) von Electron und werden deswegen nur in Electron funktionieren. Sie sind als ein "außerhalb-des-Prozesses iframe" implementiert. Das bedeutet, dass die Kommunikation mit dem `<webview>` Tag asynchron über IPC erfolgt. Das `<webview>` Element hat viele eigene Funktionen und Event, welche sehr ähnlich wie bei `webContents` sind, welche eine viel größere Kontrolle über den Inhalt des Tags erlauben.

Wenn man ein `<iframe>` Element mit einem `<webview>` Element vergleicht, sieht man, dass das letzte öfters ein wenig langsamer ist, aber eine viel bessere Kontrolle beim Laden und Kommunizieren mit dem Inhalt der eingebunden Seite hat. Ein weiterer Vorteil ist, dass das es ermöglicht, viele Events zu verarbeiten.

## BrowserViews

[BrowserViews](../api/browser-view.md) sind nicht Teil des DOMs, sondern werden im Hauptprozess (main process) von Electron erstellt und kontrolliert. Sie sind einfach eine weitere Ebene von Inhalten auf einem bestehenden Fenster. Das bedeutet, dass sie komplett von dem `BrowserWindow` getrennt sind und deswegen deren Position nicht von dem DOM oder CSS kontrolliert werden kann. Die einzige Möglichkeit, dies zu tuen ist über das Setzen von Positionsangaben im Hauptprozess.

BrowserViews gewähren die Beste Kontrolle über ihren Inhalt, weil ihr `webContents` sehr ähnlich zu einem `BrowserWindow` implementiert ist. Sie sind jedoch nicht Teil des DOMs, sondern können überlagert werden, was bedeutet, dass ihre Position manuell verwalten werden muss.
