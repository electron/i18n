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

Qualquer módulo nativo do Node.js pode ser carregado diretamente em Web Workers, mas é altamente recomendável não fazer isso. A maioria dos módulos nativos existentes foram escritos para ambiente single-threaded (sem multitarefa), usá-los em Web Workers vai levar a falhas e corrupções de memória.

Observe que mesmo se um módulo nativo do Node.js é thread-safe (tarefa seguro) ele ainda assim não é seguro para carregá-lo em um Web Worker, porque a função `process.dlopen` não é thread-safe.

A única maneira de carregar um módulo nativo, com segurança, por enquanto, é certificar-se de que o aplicativo carrega os módulos nativos após começar o Web Workers.

```javascript
process.dlopen = () => {
  throw new Error('Módulo nativo não é seguro')
}
let worker = new Worker('script.js')
```
