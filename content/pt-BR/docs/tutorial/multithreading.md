# Multitarefa

Com o [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), é possível executar JavaScript em nível de tarefas de um sistema operacional.

## Multi-tarefas com Node.js

É possível usar os recursos de Node.js em Electron Web Workers,para fazer issso use a opção `nodeIntegrationInWorker` deve ser definida como `true` em `webPreferences`.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

O `nodeIntegrationInWorker` pode ser usado independente do `nodeIntegration`, mas o `sandbox` não deve ser definido para `true`.

## APIs Disponíveis

Todos os módulos internos do Node.js são suportados em Web Workers e `asar`, arquivos ainda podem ser lidos com Node.js APIs. No entando, nenhum dos módulos internos do Electron pode ser usado em um ambiente multitarefa.

## Módulos nativos do Node.js

Any native Node.js module can be loaded directly in Web Workers, but it is strongly recommended not to do so. Most existing native modules have been written assuming single-threaded environment, using them in Web Workers will lead to crashes and memory corruptions.

Note that even if a native Node.js module is thread-safe it's still not safe to load it in a Web Worker because the `process.dlopen` function is not thread safe.

The only way to load a native module safely for now, is to make sure the app loads no native modules after the Web Workers get started.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```