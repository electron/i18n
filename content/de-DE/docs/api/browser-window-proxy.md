## Klasse: BrowserWindow

> Bearbeiten des untergeordneten Browserfensters

Prozess: [Renderer](../glossary.md#renderer-process)

Das `BrowserWindowProxy` Objekt wird von `window.open` zurückgegeben und bietet eingeschränkte Funktionalität im untergeordneten Fenster.

### Instanz Methoden

Das `BrowserWindowProxy` -Objekt verfügt über die folgenden Instanzmethoden:

#### `win.blur()`

Entfernt den Fokus aus dem untergeordneten Fenster.

#### `win.close()`

Schließt das untergeordnete Fenster gewaltsam, ohne das Entladeereignis aufzurufen.

#### `win.eval(code)`

* `code` String

Wertet den Code im untergeordneten Fenster aus.

#### `win.focus()`

Fokussiert das untergeordnete Fenster (bringt das Fenster nach vorne).

#### `win.print()`

Ruft das Druckdialogfeld im untergeordneten Fenster auf.

#### `win.postMessage(message, targetOrigin)`

* `message`
* `targetOrigin` String

Sendet eine Nachricht an das untergeordnete Fenster mit dem angegebenen Ursprung oder `*` ohne Ursprungspräferenz.

Zusätzlich zu diesen Methoden implementiert das untergeordnete Fenster `window.opener` Objekt ohne Eigenschaften und eine einzelne Methode.

### Instanz Eigenschaften

Das `BrowserWindowProxy` -Objekt verfügt über die folgenden Instanzeigenschaften:

#### `win.closed`

Eine `Boolean` , die auf true festgelegt ist, nachdem das untergeordnete Fenster geschlossen wurde.
