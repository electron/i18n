## Klasse: MenuItem

> Hinzufügen von Elementen zu systemeigenen Anwendungsmenüs und Kontextmenüs.

Prozess: [Main](../glossary.md#main-process)

Beispiele finden Sie in [`Menu`](menu.md) .

### `neue MenuItem(Optionen)`

* `options` -Objekt
  * `click` Funktion (optional) - Wird mit `click(menuItem, browserWindow, event)` aufgerufen, wenn auf das Menüelement geklickt wird.
    * `menuItem` MenuItem
    * browserWindow-</a> | `browserWindow`

undefiniert - Dies wird nicht definiert, wenn kein Fenster geöffnet ist.</li> 
      
          * `event` [KeyboardEvent](structures/keyboard-event.md)</ul></li> 

  * `role` String (optional) - Kann `undo`, `redo`, `cut` `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `selectPreviousTab``selectNextTab``toggleTabBar``recentDocuments``shareMenu``viewMenu``editMenu``fileMenu``appMenu``front``zoom``stopSpeaking`,  ,  ,  , , `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` oder `windowMenu` - Definieren Sie die Aktion des Menüelements, wenn die `click` -Eigenschaft angegeben wird. Siehe [Rollen](#roles).
  * `type` String (optional) - Kann `normal`, `separator`, `submenu`, `checkbox` oder `radio`sein.
  * `label` String (optional)
  * `sublabel` String (optional)
  * `toolTip` String (optional) _macOS_ - Hover-Text für diesen Nenüpunkt.
  * `accelerator` [Accelerator](accelerator.md) (optional)
  * `icon` ([NativeImage](native-image.md) | String) (optional)
  * `enabled` Boolean (optional) - Wenn false, wird der Menüpunkt ausgegraut und nicht anklickbar.
  * `acceleratorWorksWhenHidden` Boolean (optional) _macOS_ - Standard ist `true`, und wenn`false` wird es den Accelerator vom Ausführen hindern, sofern der Menüpunkt nicht sichtbar ist.
  * `visible` Boolean (optional) - Wenn false, wird das Menüelement vollständig ausgeblendet.
  * `checked` Boolean (optional) - Sollte nur für `checkbox` oder `radio` Typ Menüelemente angegeben werden.
  * `registerAccelerator` Boolean (optional) _Linux_ _Windows_ - Sofern false wird der Accelerator nicht im System registriert, aber weiterhin angezeigt. Standard ist true.
  * `sharingItem` SharingItem (optional) _macOS_ - Das Element, das geteilt werden soll, wenn der `role` `shareMenu`ist.
  * `submenu` (MenuItemConstructorOptions[] | [Menu](menu.md)) (optional) - Sollte für `submenu` Menüelemente angegeben werden. Wenn `submenu` angegeben ist, kann die `type: 'submenu'` weggelassen werden. Wenn der Wert kein [`Menu`](menu.md) dann wird er automatisch mit `Menu.buildFromTemplate`in einen Wert konvertiert.
  * `id` String (optional) - Einzigartig in einem einzigen Menü. Wenn diese definiert ist, kann sie als Verweis auf dieses Element durch das Positionsattribut verwendet werden.
  * `before` String[] (optional) - Fügt dieses Element vor dem Element mit der angegebenen Bezeichnung ein. Wenn das referenzierte Element nicht vorhanden ist, wird das Element am Ende des Menüs eingefügt. Bedeutet auch, dass , dass das betreffende Menüelement in derselben "Gruppe" wie das Element platziert werden soll.
  * `after` String[] (optional) - Fügt dieses Element nach dem Element mit der angegebenen Bezeichnung ein. Wenn das , auf das verwiesen wird, nicht vorhanden ist, wird das Element am Ende Menüs eingefügt.
  * `beforeGroupContaining` String[] (optional) - Bietet eine Möglichkeit für ein einzelnes Kontextmenü, platzierung der enthaltenden Gruppe zu deklarieren, bevor die enthaltende Gruppe des Elements mit der angegebenen Bezeichnung .
  * `afterGroupContaining` String[] (optional) - Bietet eine Möglichkeit für ein einzelnes Kontextmenü, platzierung der enthaltenden Gruppe zu deklarieren, nachdem die enthaltende Gruppe des Elements mit der angegebenen Bezeichnung .</ul></li> </ul> 

**Notiz:** `acceleratorWorksWhenHidden` ist als nur-macOS spezifiziert, day Acceleratoren auf Windows und Linux immer arbeiten wenn Einträge versteckt sind. Die Option ist für Benutzer verfügbar, um ihnen die Möglichkeit zu geben, sie auszuschalten, da dies in der nativen macOS-Entwicklung möglich ist. Diese Eigenschaft kann nur für macOS High Sierra 10.13 oder neuer verwendet werden.



### Rollen

Mit Rollen können Menüelemente vordefinierte Verhaltensweisen aufweisen.

Es ist am besten, `role` für jedes Menüelement anzugeben, das einer Standardrolle entspricht, , anstatt zu versuchen, das Verhalten manuell in einer `click` -Funktion zu implementieren. Das integrierte `role` -Verhalten wird die beste native Erfahrung bieten.

Die `label` - und `accelerator` Werte sind optional, wenn ein `role` verwendet wird, und standardmäßig die entsprechenden Werte für jede Plattform.

Jedes Menüelement muss entweder über eine `role`, `label`oder im Falle eines Trennzeichens einem `type`verfügen.

Die `role` Eigenschaft kann folgende Werte aufweisen:

* `hiermit machen Sie die Aktion rückgängig.`
* `about` - Auslösen eines systemeigenen Bedienfelds (benutzerdefiniertes Meldungsfeld im Fenster, das keine eigenen zur Verfügung stellt).
* `hiermit wiederholen Sie die Aktion.`
* `Schneiden`
* `copy`
* `Einfügen`
* `pasteAndMatchStyle`
* `Selectall`
* `delete`
* `minimize` - Minimieren Sie das aktuelle Fenster.
* `close` - Aktuelles Fenster schließen.
* `quit` - Beenden Sie die Anwendung.
* `reload` - Laden Sie das aktuelle Fenster neu.
* `forceReload` - Laden Sie das aktuelle Fenster neu und ignoriert den Cache.
* `toggleDevTools` - Umschalten von Entwicklertools im aktuellen Fenster.
* `togglefullscreen` - Schalten Sie den Vollbildmodus im aktuellen Fenster um.
* `resetZoom` - Setzen Sie die Zoomstufe der fokussierten Seite auf die ursprüngliche Größe zurück.
* `zoomIn` - Vergrößern Sie die fokussierte Seite um 10 %.
* `zoomOut` - Verkleinern Sie die fokussierte Seite um 10 %.
* `toggleSpellChecker` - Integrierte Rechtschreibprüfung aktivieren/deaktivieren.
* `fileMenu` - Gesamtes Standardmenü "Datei" (Schließen / Beenden)
* `editMenu` - Ganzer Standardmenü "Bearbeiten" (Rückgängig, Kopieren, etc.).
* `viewMenu` - Gesamtes Standardmenü "Ansicht" (Reload, Toggle Developer Tools, etc.)
* `windowMenu` - Ganzer Standardmenü "Fenster" (Minimieren, Zoomen, etc.).

Die folgenden zusätzlichen Rollen sind auf _macOS-_verfügbar:

* `appMenu` - Ganzes Standardmenü "App" (Über, Dienste, etc.)
* `hide` - Karte zur `hide` Aktion.
* `hideOthers` - Karte zur `hideOtherApplications` Aktion.
* `unhide` - Karte zur `unhideAllApplications` Aktion.
* `startSpeaking` - Karte zur `startSpeaking` Aktion.
* `stopSpeaking` - Karte zur `stopSpeaking` Aktion.
* `front` - Karte zur `arrangeInFront` Aktion.
* `zoom` - Karte zur `performZoom` Aktion.
* `toggleTabBar` - Karte zur `toggleTabBar` Aktion.
* `selectNextTab` - Karte zur `selectNextTab` Aktion.
* `selectPreviousTab` - Karte zur `selectPreviousTab` Aktion.
* `mergeAllWindows` - Karte zur `mergeAllWindows` Aktion.
* `moveTabToNewWindow` - Karte zur `moveTabToNewWindow` Aktion.
* `window` - Das Untermenü ist ein "Fenster"-Menü.
* `help` - Das Untermenü ist ein "Hilfe"-Menü.
* `services` - Das Untermenü ist ein [Menü "Dienste"](https://developer.apple.com/documentation/appkit/nsapplication/1428608-servicesmenu?language=objc) . Dies ist nur für die Verwendung im Anwendungsmenü vorgesehen und ist *nicht* dem Untermenü "Dienste", das in Kontextmenüs in macOS-Apps verwendet wird und nicht in Electron implementiert ist.
* `recentDocuments` - Das Untermenü ist ein Menü "Zuletzt öffnen".
* `clearRecentDocuments` - Karte zur `clearRecentDocuments` Aktion.
* `shareMenu` - Das Untermenü ist [Freigabemenü][ShareMenu]. Die `sharingItem` -Eigenschaft muss auch so festgelegt werden, dass das Element angezeigt wird, das gemeinsam vorhanden ist.

Wenn Sie eine `role` unter macOS angeben, sind `label` und `accelerator` die einzigen Optionen, die sich auf das Menüelement auswirken. Alle anderen Optionen werden ignoriert. Kleinbuchstaben `role`z.B. `toggledevtools`wird weiterhin unterstützt.

**Nota Bene:** Die `enabled` - und `visibility` -Eigenschaften sind für Menüpunkte der obersten Ebene im Tablett unter macOS nicht verfügbar.



### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `MenuItem`verfügbar:



#### `menuItem.id`

Ein `String` welcher die eindeutige Id anzeigt, diese Eigenschaft kann dynamisch geändert werden.



#### `menuItem.label`

Ein `String` , der die sichtbare Beschriftung des Elements angibt.



#### `menuItem.click`

Ein `Function` , der ausgelöst wird, wenn das MenuItem ein Click-Ereignis empfängt. Es kann mit `menuItem.click(event, focusedWindow, focusedWebContents)`aufgerufen werden.

* `event` [KeyboardEvent](structures/keyboard-event.md)
* `focusedWindow` [BrowserWindow](browser-window.md)
* `focusedWebContents` [WebContents](web-contents.md)



#### `menuItem.submenu`

Eine `Menu` (optional), die das Menü Untermenü des Elements enthält, falls vorhanden.



#### `menuItem.type`

Ein `String` , der den Typ des Elements angibt. Kann `normal`, `separator`, `submenu`, `checkbox` oder `radio`sein.



#### `menuItem.role`

Ein `String` (optional), der die Rolle des Elements angibt, sofern festgelegt. Can be `undo`, `redo`, `cut`, `copy`, `paste`, `pasteAndMatchStyle`, `delete`, `selectAll`, `reload`, `forceReload`, `toggleDevTools`, `resetZoom`, `zoomIn`, `zoomOut`, `togglefullscreen`, `window`, `minimize`, `close`, `help`, `about`, `services`, `hide`, `hideOthers`, `unhide`, `quit`, `startSpeaking`, `stopSpeaking`, `zoom`, `front`, `appMenu`, `fileMenu`, `editMenu`, `viewMenu`, `recentDocuments`, `toggleTabBar`, `selectNextTab`, `selectPreviousTab`, `mergeAllWindows`, `clearRecentDocuments`, `moveTabToNewWindow` or `windowMenu`



#### `menuItem.accelerator`

Eine `Accelerator` (optional), die den Beschleuniger des Elements angibt, sofern festgelegt.



#### `menuItem.icon`

Eine `NativeImage | String` (optional), die das Symbol des Elements angibt, sofern festgelegt.



#### `menuItem.sublabel`

Ein `String` , der die Unterbeschriftung des Elements angibt.



#### `menuItem.toolTip` _macOS-_

Eine `String` , die den Hovertext des Elements angibt.



#### `menuItem.enabled`

Eine `Boolean` , die angibt, ob das Element aktiviert ist, kann diese Eigenschaft dynamisch geändert werden.



#### `menuItem.visible`

Eine `Boolean` , die angibt, ob das Element sichtbar ist, kann diese Eigenschaft dynamisch geändert werden.



#### `menuItem.checked`

Ein `Boolean` , der angibt, ob das Element aktiviert ist, kann diese Eigenschaft dynamisch geändert werden.

Ein `checkbox` Menüelement schaltet die `checked` -Eigenschaft ein und aus, wenn ausgewählt.

Ein `radio` -Menüelement wird beim Klicken auf die `checked` -Eigenschaft aktivieren, und deaktiviert diese Eigenschaft für alle angrenzenden Elemente im gleichen Menü.

Sie können eine `click` Funktion für zusätzliches Verhalten hinzufügen.



#### `menuItem.registerBeschleuniger`

Ein `Boolean` an, der angibt, ob der Beschleuniger beim System registriert oder nur angezeigt werden soll.

Diese Eigenschaft kann dynamisch geändert werden.



#### `menuItem.sharingItem` _macOS-_

Ein `SharingItem` , der das Element angibt, das beim `role` `shareMenu`wird.

Diese Eigenschaft kann dynamisch geändert werden.



#### `menuItem.commandId`

Ein `Number` , der die sequenzielle eindeutige ID eines Elements angibt.



#### `menuItem.menu`

Eine `Menu` , zu der das Element gehört.

[ShareMenu]: https://developer.apple.com/design/human-interface-guidelines/macos/extensions/share-extensions/
