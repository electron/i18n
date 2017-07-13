# Multithreading

Avec [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), il est possible d'exécuter du code JavaScript au niveau du système d'exploitation.

## Multi-threaded Node.js

Il est possible d’utiliser des fonctionnalités de Node.js dans les Web Workers d'Electron, pour ce faire, l’option `nodeIntegrationInWorker` doit être définie à `true` dans `webPreferences`.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

Le `nodeIntegrationInWorker` peut être utilisé indépendamment de `nodeIntegration`, mais le `sandbox` ne doit pas être défini sur `true`.

## API disponibles

Tous les modules intégrés de Node.js sont pris en charge dans les Web Workers, et les archives `asar` peuvent encore être lues avec les API de Node.js. Toutefois, aucun des modules intégrés d'Electron peut être utilisé dans un environnement multithread.

## Modules natifs de Node.js

N’importe quel module de Node.js natif peut être chargé directement dans Web Workers, mais il est fortement recommandé de ne pas le faire. Most existing native modules have been written assuming single-threaded environment, using them in Web Workers will lead to crashes and memory corruptions.

Note that even if a native Node.js module is thread-safe it's still not safe to load it in a Web Worker because the `process.dlopen` function is not thread safe.

The only way to load a native module safely for now, is to make sure the app loads no native modules after the Web Workers get started.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```