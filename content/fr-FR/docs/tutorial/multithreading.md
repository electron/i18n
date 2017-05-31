# Multithreading

Avec [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), il est possible d’exécuter JavaScript dans les discussions au niveau du système d’exploitation.

## Node.js multi-thread

Il est possible d’utiliser des fonctionnalités de Node.js chez les travailleurs de Web de l’électron, pour ce faire, l’option `nodeIntegrationInWorker` doit être définie sur `true` en `webPreferences`.

```javascript
laisser gagner = new BrowserWindow ({webPreferences : {
    nodeIntegrationInWorker: true
  }})
```

Le `nodeIntegrationInWorker` peut être utilisé indépendamment de `nodeIntegration`, mais `sandbox` ne doit pas être défini à `true`.

## API disponibles

Tous les modules intégrés de Node.js sont pris en charge chez les travailleurs du Web, et `asar` archives peuvent encore être lues avec Node.js APIs. Toutefois, aucun des modules intégrés de l’électron peut être utilisé dans un environnement multithread.

## Modules natifs de Node.js

N’importe quel module de Node.js natif peut être chargé directement dans Web Workers, mais il est fortement recommandé de ne pas faire. La plupart des modules natifs existants ont été écrit en supposant qu’environnement monothread, leur utilisation dans les Web Workers permettra d’accidents et corruptions de mémoire.

Notez que même si un module natif de Node.js est thread-safe, il n’est toujours pas sûr de le charger dans un travailleur du Web car la fonction `process.dlopen` n’est pas thread-safe.

La seule façon de charger un module natif en toute sécurité pour l’instant, est de s’assurer de l’application charges sans modules natifs après que les travailleurs Web commencer.

```javascript
Process.dlopen = () => {throw new Error ("charger le module natif n’est pas safe')} laisser travailleur = nouveau Worker('script.js')
```