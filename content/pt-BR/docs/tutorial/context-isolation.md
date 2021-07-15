# Context Isolation

## What is it?

Isolamento de Contexto é um recurso que garante que tanto os seus `scripts do preload` quanto a lógica interna do Electron sejam executados em um contexto separado para a pagina que você carregar em um [`webContent`](../api/web-contents.md).  Isso é importante por questões de segurança, pois ajuda a impedir que a pagina web acesse os módulos internos do Electron ou aos privelégios de APIs que seu script de preload tem acesso.

Isto significa que o objeto `window` ao qual seu script de preload tem acesso seja realmente um objeto **diferente** do qual a sua pagina web teria acesso.  Por exemplo, se você definir `window.hello = 'wave'` em seu script de preload e o contextIsolation esteja habilitado na janela `window.hello` será undefined se a pagina web tentar acessa-la.

Cada aplicação deve ter o contextIsolation habilitado a partir da versão 12 do Electron, esse parâmetro estará habilitado por padrão.

## How do I enable it?

From Electron 12, it will be enabled by default. For lower versions it is an option in the `webPreferences` option when constructing `new BrowserWindow`'s.

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## Migração

> I used to provide APIs from my preload script using `window.X = apiObject` now what?

Exposing APIs from your preload script to the loaded website is a common usecase and there is a dedicated module in Electron to help you do this in a painless way.

**Before: With context isolation disabled**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**After: With context isolation enabled**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

The [`contextBridge`](../api/context-bridge.md) module can be used to **safely** expose APIs from the isolated context your preload script runs in to the context the website is running in. The API will also be accessible from the website on `window.myAPI` just like it was before.

You should read the `contextBridge` documentation linked above to fully understand its limitations.  For instance you can't send custom prototypes or symbols over the bridge.

## Security Considerations

Just enabling `contextIsolation` and using `contextBridge` does not automatically mean that everything you do is safe.  For instance this code is **unsafe**.

```javascript
// ❌ Bad code
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

It directly exposes a powerful API without any kind of argument filtering. This would allow any website to send arbitrary IPC messages which you do not want to be possible. The correct way to expose IPC-based APIs would instead be to provide one method per IPC message.

```javascript
// ✅ Good code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```
