# Multithreading

Con los [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), es posible ejecutar JavaScript en *threads* a nivel de Sistema Operativo.

## *Multi-threaded* Node.js

Es posible utilizar las características de Node.js en Electron's Web Workers. Para hacerlo, la opción `nodeIntegrationInWorker` debe configurarse a `true` en `webPreferences`.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

El `nodeIntegrationInWorker` puede ser utilizado independientemente de `nodeIntegration`, pero `sandbox` no debe ser configurado a `true`.

## APIs disponibles

Todos los módulos incorporados de Node.js son compatibles con Web Workers, y los archivos `asar` aún se pueden leer con la API de Node.js. Sin embargo, ninguno de los módulos incorporados de Electron puede utilizarse en un entorno multiproceso.

## Módulos nativos de Node.js

Cualquier módulo nativo Node.js se puede cargar directamente en Web Workers, pero se recomienda encarecidamente no hacerlo. La mayoría de los módulos nativos existentes se han escrito suponiendo un entorno de subproceso único, su uso en Web Workers dará lugar a bloqueos y daños en la memoria.

Tenga en cuenta que incluso si un módulo nativo de Node.js es un subproceso seguro, aún asi todavia no es seguro cargarlo en una Web Worker porque la función `process.dlopen` no es un subproceso seguro.

La única forma de cargar un módulo nativo de forma segura por ahora es asegurarse de que la aplicación no carga módulos nativos después de que Web Workers se inicie.

```javascript
process.dlopen = () => {
  throw new Error('La carga del módulo nativo no es segura')
}
let worker = new Worker('script.js')
```
