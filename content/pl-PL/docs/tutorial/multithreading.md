# Wielowątkowość

Z [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers) możliwe jest uruchamianie JavaScript w wątkach na poziomie systemu operacyjnego.

## Wielowątkowy Node.js

Możliwe jest korzystanie z funkcji Node.js w Web Workers Electron'a, w tym celu opcja `nodeIntegrationInWorker` powinna być ustawiona na `true` w `webPreferences`.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

`nodeIntegrationInWorker` może być używany niezależnie od `nodeIntegration`, ale `piaskownica` nie może być ustawiona na `true`.

## Dostępne API

Wszystkie wbudowane moduły Node.js są obsługiwane przez Web Workers, a archiwa `asar` nadal można odczytać za pomocą interfejsów API Node.js. However none of Electron's built-in modules can be used in a multi-threaded environment.

## Natywne moduły Node.js

Any native Node.js module can be loaded directly in Web Workers, but it is strongly recommended not to do so. Most existing native modules have been written assuming single-threaded environment, using them in Web Workers will lead to crashes and memory corruptions.

Zauważ, że nawet jeśli natywny moduł Node.js jest bezpieczny dla wątków, nadal nie jest bezpieczne ładowanie go w module Web Worker, ponieważ funkcja `process.dlopen` nie jest bezpieczna dla wątków.

Jedynym sposobem bezpiecznego załadowania natywnego modułu na teraz jest upewnienie się, że aplikacja nie ładuje żadnych rodzimych modułów po uruchomieniu Web Workers.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```