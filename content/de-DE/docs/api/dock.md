## Class: Dock

> Steuern Sie Ihre App im MacOS-Dock

Prozess: [Main](../glossary.md#main-process)

Das folgende Beispiel zeigt, wie Sie Ihr Icon auf dem Dock springen lassen.

```javascript
const { app } = require('electron')
app.dock.bounce()
```

### Instanz Methoden

#### `dock.bounce([type])` _macOS_

* `type` String (optional) - Kann `critical` oder `informational` sein. Standard ist `informational`

Returns `Integer` - Eine ID welche den Request repräsentiert.

Wenn `critical` übergeben wird, springt das Dock-Symbol so lange ab, bis entweder die Anwendung aktiv wird oder die Anforderung abgebrochen wird.

Wenn `informational` übergeben wird, springt das Dock-Symbol eine Sekunde lang. Die Anforderung bleibt jedoch aktiv, bis entweder die Anwendung aktiv wird oder die Anforderung abgebrochen wird.

**Nota Bene:** Diese Methode kann nur verwendet werden, während die App nicht fokussiert ist; Wenn die App fokussiert ist, wird sie -1 zurückgegeben.

#### `dock.cancelBounce(id)` _macOS_

* `id` Integer

Abbrechen des Absprungs von `id`.

#### `dock.downloadFinished(filePath)` _macOS_

* `filePath` String

Springt den Downloads-Stack auf, wenn sich der filePath im Ordner Downloads befindet.

#### `dock.setBadge(text)` _macOS_

* `text` String

Legt fest, dass die Zeichenfolge im Badging-Bereich des Docks angezeigt wird.

#### `dock.getBadge()` _macOS_

Gibt `String` zurück - Die Badge-Zeichenfolge des Docks.

#### `dock.hide()` _macOS_

Versteckt das dock icon.

#### `dock.show()` _macOS_

Gibt `Promise<void>` zurück - Wird aufgelöst, wenn das Dock-Symbol angezeigt wird.

#### `dock.isVisible()` _macOS_

Gibt `Boolean` zurück : Gibt an, ob das Docksymbol sichtbar ist.

#### `dock.setMenu(menu)` _macOS_

* `menu` [Menu](menu.md)

Legt das [Dockmenü] der Anwendung[dock-menu]fest.

#### `dock.getMenu()` _macOS_

Gibt `Menu | null` zurück - Das [Dockmenü] der Anwendung[dock-menu].

#### `dock.setIcon(image)` _macOS_

* `image` ([NativeImage](native-image.md) | String)

Setzt das `image` welches als Dock Icon verwendet werden soll.
