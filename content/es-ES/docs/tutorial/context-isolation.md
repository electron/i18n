# Aislamiento del contexto

## ¿Qué es?

Context Isolation is a feature that ensures that both your `preload` scripts and Electron's internal logic run in a separate context to the website you load in a [`webContents`](../api/web-contents.md).  This is important for security purposes as it helps prevent the website from accessing Electron internals or the powerful APIs your preload script has access to.

This means that the `window` object that your preload script has access to is actually a **different** object than the website would have access to.  Por ejemplo, is establece en su script de precarga `window.hello = 'wave'` y el aislamiento de contexto está habilitado, `window.hello` será undefined si el sitio web trata de acceder a él.

El aislamiento del contexto ha sido habilitado por defecto desde Electron 12, y es una configuración de seguridad recomendada para _todas las aplicaciones_.

## Migración

> Sin aislamiento de contexto, solía proporcionar API desde mi script de precarga utilizando `window.X = apiObject`. ¿Y ahora qué?

### Before: aislamiento de contexto desactivado

Exponer APIs desde su script de precarga a un sitio web cargado en el proceso de renderizado es un caso de uso común. Con el aislamiento contextual deshabilitado, su script de precarga compartiría un objeto global `window` común con el renderizador. A continuación, puedes adjuntar propiedades arbitrarias a un script de precarga:

```javascript title='preload.js'
// precargar con contextIsolation deshabilitado
window.myAPI = {
  doAThing: () => {}
}
```

La función `doAThing()` podría luego ser usada directamente en el proceso renderizador:

```javascript title='renderer.js'
// use la API expuesta en el renderer
window.myAPI.doAThing()
```

### Después: aislamiento de contexto activado

Hay un módulo dedicado en Electron para ayudarle a hacer esto de una manera indolora. El módulo [`contextBridge`](../api/context-bridge.md) puede utilizarse para exponer APIs **de forma segura** desde tu script de precarga en el contexto aislado al contexto en el que se está ejecutando el sitio web. The API will also be accessible from the website on `window.myAPI` just like it was before.

```javascript title='preload.js'
// precarga con contextIsolation habilitado
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

```javascript title='renderer.js'
// use la API expuesta en el renderer
window.myAPI.doAThing()
```

Por favor lea la documentación de `contextBridge` enlazado arriba para entender completamente sus limitaciones. Por ejemplo, no puede enviar prototipos personalizados o símbolos sobre el puente.

## Consideraciones de Seguridad

Just enabling `contextIsolation` and using `contextBridge` does not automatically mean that everything you do is safe. Por ejemplo, este código es **inseguro**.

```javascript title='preload.js'
// ❌ Bad code
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

It directly exposes a powerful API without any kind of argument filtering. Esto permitiría a cualquier sitio web enviar mensajes IPC arbitrarios, lo cual no deseas que sea posible. The correct way to expose IPC-based APIs would instead be to provide one method per IPC message.

```javascript title='preload.js'
// ✅ Good code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

## Uso con TypeScript

SI está construyendo su aplicación Electron con TypeScript, querrá añadir tipos a sus APIs expuestas sobre el puente del contexto. El objeto `window` del renderizador no tendrá los tipos correctos a menos que extienda los tipos con un [declaration file][].

Por ejemplo, dado este script `preload.ts`:

```typescript title='preload.ts'
contextBridge.exposeInMainWorld('electronAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

Puede crear un archivo de declaración `renderer.d.ts` y aumentar globalmente la interfaz `Window`:

```typescript title='renderer.d.ts'
export interface IElectronAPI {
  loadPreferences: () => Promise<void>,
}

declare global {
  interface Window {
    electronAPI: IElectronAPI
  }
}
```

Al hacerlo se asegurará que el compilador de TypeScript sepa sobre la propiedad `electronAPI` en su objeto global `window` al escribir scripts en su proceso renderizador:

```typescript title='renderer.ts'
window.electronAPI.loadPreferences()
```

[declaration file]: https://www.typescriptlang.org/docs/handbook/declaration-files/introduction.html
