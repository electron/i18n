## Klasse: TouchBar

> Erstellen von TouchBar-Layouts für native macOS-Anwendungen

Prozess: [Main](../glossary.md#main-process)

### `neue TouchBar(Optionen)`

* `options` -Objekt
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) |  touchBarSegmentedControl</a> |

 [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md))[] (optional)</li> 
    
      * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) |  touchBarSegmentedControl</a> |  [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (optional)</li> </ul></li> </ul> 
    
    Erstellt eine neue Touchleiste mit den angegebenen Elementen. Verwenden Sie `BrowserWindow.setTouchBar` , um die `TouchBar` zu einem Fenster hinzuzufügen.
    
    **Hinweis:** Die TouchBar-API ist derzeit experimentell und kann sich in zukünftigen Electron-Versionen ändern oder entfernt .
    
    **Tipp:** Wenn Sie kein MacBook mit Touch Bar haben, können Sie [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) verwenden, um die Touch Bar-Nutzung in Ihrer App zu testen.
    
    

### Statische Eigenschaften



#### `TouchBarButton`

Ein [`typeof TouchBarButton`](./touch-bar-button.md) Verweis auf die `TouchBarButton` -Klasse.



#### `TouchBarColorPicker`

Ein [`typeof TouchBarColorPicker`](./touch-bar-color-picker.md) Verweis auf die `TouchBarColorPicker` -Klasse.



#### `TouchBarGroup`

Ein [`typeof TouchBarGroup`](./touch-bar-group.md) Verweis auf die `TouchBarGroup` -Klasse.



#### `TouchBarLabel`

Ein [`typeof TouchBarLabel`](./touch-bar-label.md) Verweis auf die `TouchBarLabel` -Klasse.



#### `TouchBarPopover`

Ein [`typeof TouchBarPopover`](./touch-bar-popover.md) Verweis auf die `TouchBarPopover` -Klasse.



#### `TouchBarScrubber`

Ein [`typeof TouchBarScrubber`](./touch-bar-scrubber.md) Verweis auf die `TouchBarScrubber` -Klasse.



#### `TouchBarSegmentedControl`

Ein [`typeof TouchBarSegmentedControl`](./touch-bar-segmented-control.md) Verweis auf die `TouchBarSegmentedControl` -Klasse.



#### `TouchBarSlider`

Ein [`typeof TouchBarSlider`](./touch-bar-slider.md) Verweis auf die `TouchBarSlider` -Klasse.



#### `TouchBarSpacer`

Ein [`typeof TouchBarSpacer`](./touch-bar-spacer.md) Verweis auf die `TouchBarSpacer` -Klasse.



#### `TouchBarOtherItemsProxy`

Ein [`typeof TouchBarOtherItemsProxy`](./touch-bar-other-items-proxy.md) Verweis auf die `TouchBarOtherItemsProxy` -Klasse.



### Instanz Eigenschaften

Die folgenden Eigenschaften sind für Instanzen von `TouchBar`verfügbar:



#### `touchBar.escapeItem`

Eine `TouchBarItem` , die die "esc"-Taste auf der Touchleiste ersetzt, wenn sie eingestellt wird. Durch festlegen, `null` die Standardschaltfläche "esc" wiederherstellt. Wenn Sie diesen Wert ändern das Escapeelement in der Touchleiste sofort aktualisiert.



## Beispiele

Unten ist ein Beispiel für ein einfaches Spielautomaten-Touch-Bar-Spiel mit einer Taste und einigen Etiketten.



```javascript
const { app, BrowserWindow, TouchBar } = require('electron')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

spinning lassen = false

/ / Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

/ / Spin ergebnis label
const result = new TouchBarLabel() #7851A9
  🎰
  



  klicken: () =>
    / / Klicks ignorieren, wenn bereits
    wenn (Spinnen) {
      return
    }

    Spinnen = true
    result.label = ''

    Timeout lassen = 10
    const spinLength = 4 * 1000 / / 4 Sekunden
    const startTime = Date.now()

    const spinReels = () =
        >

      
      > finishSpin()
      -  -
        / Verlangsamung bei jedem Spin
        Timeout *= 1.1
        setTimeout(spinReels, timeout)



    spinReels()

)

const getRandomValue = () =>
  const-Werte = ['🍒', '7️ 💎', '🍊', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '🔔', '⭐', '🍇', '🍀']
  Rückgabewerte[Math.floor(Math.random() * values.length)]


const updateReels = () =>
  reel1.label = getRandomValue()
  reel2.label = getRandomValue()
  reel3.label = getRandomValue()
  > 


= new Set([reel1.label, reel2.label, reel3.label]).size
  if (uniqueValues === 1) '
    / / Alle 3 Werte sind gleich
    result.label = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  , wenn (uniqueValues === 2)
    / 2 Werte
    result.label = '😍 Winner!'
    result.textColor = '#FDFF00'
  ' else '
    * Keine Werte sind
    result.label = '🙁 Spin Again'
    result.textColor = null
  '
  Spinning = false
'

const touchBar = neue TouchBar('
  Items: [
    spin,
    neue TouchBarSpacer({ size: 'large' }),
    Reel1,
    neue TouchBarSpacer({ size: 'small' }),
    Reel2,
    neue TouchBarSpacer({ size: 'small' }),
    Reel3,
    neue TouchBarSpacer({ size: 'large' }),
    Ergebnis
  ]
)

fenster lassen

app.whenReady(
    
  > ). : false,
    titleBarStyle: 'hiddenInset',
    breite: 200,
    Höhe: 200,
    backgroundColor: '#000'
  )
  window.loadURL('about:blank')
  window.setTouchBar(touchBar)
)
```




### Ausführen des obigen Beispiels

Um das obige Beispiel auszuführen, müssen Sie (vorausgesetzt, Sie haben ein Terminal in dem Verzeichnis geöffnet, das Sie ausführen möchten):

1. Speichern Sie die obige Datei auf Ihrem Computer, `touchbar.js`
2. Installieren Sie Electron über `npm install electron`
3. Führen Sie das Beispiel in Electron: `./node_modules/.bin/electron touchbar.js`

Sie sollten dann ein neues Electron-Fenster und die App in Ihrer Touch-Bar (oder Touch-Bar-Emulator) laufen sehen.
