# Multithreading

Con los [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), es posible ejecutar JavaScript en *threads* a nivel de Sistema Operativo.

## *Multi-threaded* Node.js

It is possible to use Node.js features in Electron's Web Workers, to do so the `nodeIntegrationInWorker` option should be set to `true` in `webPreferences`.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

The `nodeIntegrationInWorker` can be used independent of `nodeIntegration`, but `sandbox` must not be set to `true`.

## APIs disponibles

All built-in modules of Node.js are supported in Web Workers, and `asar` archives can still be read with Node.js APIs. Sin embargo, ninguno de los módulos incorporados de Electron puede utilizarse en un entorno multiproceso.

## Módulos nativos de Node.js

Any native Node.js module can be loaded directly in Web Workers, but it is strongly recommended not to do so. Most existing native modules have been written assuming single-threaded environment, using them in Web Workers will lead to crashes and memory corruptions.

Note that even if a native Node.js module is thread-safe it's still not safe to load it in a Web Worker because the `process.dlopen` function is not thread safe.

The only way to load a native module safely for now, is to make sure the app loads no native modules after the Web Workers get started.

```javascript
process.dlopen = () => {
  throw new Error('La carga del módulo nativo no es segura')
}
let worker = new Worker('script.js')
```