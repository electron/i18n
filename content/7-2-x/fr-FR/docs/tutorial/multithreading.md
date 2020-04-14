# Multithreading

С помощью [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), есть возможность запускать JavaScript в потоках на уровне операционной системы.

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

N’importe quel module de Node.js natif peut être chargé directement dans Web Workers, mais il est fortement recommandé de ne pas le faire. La plupart des modules natifs existants ont été écrit en supposant un environnement mono-thread, leur utilisation dans les Web Workers peut entrainer des crash et corruptions de mémoire.

Notez que même si un module natif de Node.js est thread-safe, il n’est toujours pas sûr de le charger dans un Web Worker car la fonction `process.dlopen` n’est pas thread-safe.

La seule façon de charger un module natif en toute sécurité pour l’instant, est de s’assurer de l’application ne charge aucun modules natifs après que les Web Workers aient démarrés.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```
