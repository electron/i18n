# Subprocesamiento múltiple

Con [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), es posible ejecutar JavaScript en hilos de nivel de sistema operativo.

## Multi-threaded Node.js

Es posible utilizar Node.js características en trabajadores de la Web de electrónica, para ello debe establecerse la opción de `nodeIntegrationInWorker` en `true` en `webPreferences`.

```javascript
dejó de ganar = new BrowserWindow ({webPreferences: {
    nodeIntegrationInWorker: true
  }})
```

La `nodeIntegrationInWorker` puede ser utilizado independiente de `nodeIntegration`, pero `sandbox` debe establecerse no en `true`.

## APIs disponibles

Todos los módulos integrados de Node.js son compatibles con Web Workers y `asar` archivos se pueden leer todavía con Node.js APIs. Sin embargo ninguno de los módulos incorporados del electrón puede utilizarse en un entorno multiproceso.

## Módulos nativos de Node.js

Cualquier módulo de Node.js nativo puede ser cargado directamente en los trabajadores Web, pero se recomienda encarecidamente no hacerlo. Mayoría de los módulos nativa existente ha sido escrito asumiendo subprocesos ambiente, utilizando en los trabajadores Web llevará a choques y corrupciones de memoria.

Tenga en cuenta que aunque un módulo nativo de Node.js es seguro para subprocesos es todavía no segura para cargar en un trabajador de la Web porque la función de `process.dlopen` no es seguro para subprocesos.

La única manera de cargar un módulo nativo con seguridad por el momento, es para asegurarse de que la aplicación no carga módulos nativos después de empezar los trabajadores Web.

```javascript
Process.dlopen = () => {tira Error nuevo ('módulo nativo de carga no es seguro')} que trabajador = Worker('script.js') nuevo
```