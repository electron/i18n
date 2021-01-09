# Meervoudig

With [Web Workers][web-workers], it is possible to run JavaScript in OS-level threads.

## Multi-threaded Node.js

Het is mogelijk om Knooppunt te gebruiken. s functies in Electron's Web Workers, om te doen, dus de `nodeIntegrationInWorker` optie moet worden ingesteld op `true` in `webvoorkeuren`.

```javascript
let win = nieuwe BrowserWindow({
  webVoorkeuren: {
    nodeIntegrationInWorker: true
  }
})
```

De `nodeIntegrationInWorker` kan worden gebruikt onafhankelijk van `nodeIntegration`, maar `sandbox` moet niet op `ware`.

## Beschikbare API's

Alle ingebouwde Node.js modules worden ondersteund in Web Workers en `asar` archieven kunnen nog steeds worden gelezen met Node.js APIs. Echter, geen van de ingebouwde e-commerce-modules kan worden gebruikt in een multi-threaded omgeving.

## Inheemse Node.js modules

Elke native Node.js module kan direct in Web Workers geladen worden, maar het is sterk aanbevolen om dit niet te doen. De meeste bestaande inheemse modules zijn geschreven uitgaande eenmalige omgeving, het gebruik ervan in de Web Workers zal leiden tot crashes en geheugen corrupties.

Merk op dat zelfs als een moederlijke Node. s module is thread-veilig het nog steeds niet veilig om te laden in een Web Worker want het `proces. de functie` is niet draad veilig.

De enige manier om veilig een native module te laden is om ervoor te zorgen dat de app geen native modules laadt nadat de Web Workers is gestart.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```

[web-workers]: https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers
