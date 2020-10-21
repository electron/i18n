# Context isolatie

## Wat is het?

Context Isolatie is een functie die ervoor zorgt dat zowel uw `preload` scripts als de interne logica van Electron, in een aparte context op de website die u in een [`webcontent`](../api/web-contents.md) laadt.  Dit is belangrijk voor veiligheidsdoeleinden, omdat het helpt voorkomen dat de website toegang krijgt tot Electron internals of de krachtige API's waar uw voorlaad script toegang toe heeft.

Dit betekent dat het `venster` object waar je preload script toegang toe heeft, een **ander** object is dan de website zou hebben.  Bijvoorbeeld, als je `window.hello = 'golve'` in je preload script zet en context isolatie aan `venster. ello` zal worden ongedefinieerd als de website deze probeert te openen.

Elke toepassing moet context isolatie hebben en van Electron 12 wordt standaard ingeschakeld.

## Hoe kan ik het inschakelen?

Van Electron 12, wordt het standaard ingeschakeld. Voor lagere versies is dit een optie in de `webPreferences` optie bij het bouwen van `nieuw Browservenster`.

```javascript
const mainwindow = new BrowserWindow({
  webVoorkeuren: {
    contextIsolation: true
  }
})
```

## Migratie

> Ik heb API's verstrekt vanuit mijn voorlaadscript met behulp van `-venster.X = apiObject` wat nu?

Het blootstellen van API's uit je preload script aan de geladen website is een veel voorkomende usecase en er is een speciale module in Electron om je te helpen dit op een pijnloze manier te doen.

**Voorheen: Met context isolatie uitgeschakeld**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**Achteraf: Met context isolatie ingeschakeld**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

De [`contextBridge`](../api/context-bridge.md) module kan worden gebruikt om **veilig** API's te tonen vanuit de geïsoleerde context waarin uw voorlaad script wordt uitgevoerd in de context waarin de website wordt uitgevoerd. De API is ook toegankelijk vanaf de website op `window.myAPI` zoals het eerder was.

Je moet de `contextBridge` documentatie hierboven lezen om de beperkingen ervan volledig te begrijpen.  U kunt bijvoorbeeld geen aangepaste prototypes of symbolen verzenden over de bridge.

## Veiligheidsaspecten

Het inschakelen van `contextIsolatie` en het gebruik van `contextBridge` betekent niet automatisch dat alles wat je doet veilig is.  Deze code is bijvoorbeeld **onveilig**.

```javascript
// ❌ Slechte code
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Het stelt een krachtige API direct bloot zonder enige vorm van argumenten. Hierdoor kan elke website willekeurige IPC-berichten versturen die u niet wilt mogelijk maken. De juiste manier om IPC-gebaseerde API's bloot te stellen is door één methode per IPC-bericht op te geven.

```javascript
// ✅ Goede code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

