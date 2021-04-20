# Aislamiento del contexto

## ¿Qué es?

El aislamiento contextual es una característica que asegura que tanto los scripts `pre-cargar` como la lógica interna de Electron se ejecuten en un contexto separado al sitio web que carga en [`webContents`](../api/web-contents.md).  Esto es importante para propósitos de seguridad, ya que ayuda a evitar que el sitio web acceda a los internos de Electron o a las poderosas APIs a las que su script de precarga tiene acceso.

Esto significa que el objeto `ventana` al que tiene acceso el script de precarga es en realidad un objeto **diferente** al que tendría acceso el sitio web.  Por ejemplo, si establece `window.hello = 'wave'` en su script de precarga y aislamiento de contexto está habilitado `ventana. ello` no se definirá si el sitio web intenta acceder a él.

Cada aplicación debe tener activado el aislamiento contextual y desde Electron 12 se habilitará por defecto.

## ¿Cómo puedo activarlo?

De Electron 12, se habilitará por defecto. Para versiones inferiores es una opción en la opción `webPreferences` al construir `new BrowserWindow`'s.

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## Migración

> Usaba para proporcionar APIs de mi pre-carga script usando `window.X = apiObject` ahora ¿qué?

Exponer APIs de su script de precarga al sitio web cargado es una usecase común y hay un módulo dedicado en Electron para ayudarle a hacerlo de una manera indolora.

**Before: Con aislamiento contextual desactivado**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**Después: Con aislamiento contextual activado**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

El módulo [`contextBridge`](../api/context-bridge.md) puede utilizarse para **exponer de forma segura** APIs del contexto aislado en el que se ejecuta el script de precarga en el contexto en el que se está ejecutando el sitio web. La API también será accesible desde el sitio web en `window.myAPI` como antes.

Debería leer la documentación de `contextBridge` enlazada arriba para entender completamente sus limitaciones.  Por ejemplo, no puede enviar prototipos o símbolos personalizados sobre el puente.

## Consideraciones de seguridad

Solo activar `contextIsolation` y usar `contextBridge` no significa automáticamente que todo lo que haga sea seguro.  Por ejemplo, este código es **inseguro**.

```javascript
// ❌ Bad code
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Expone directamente una poderosa API sin ningún tipo de filtrado de argumentos. Esto permitiría a cualquier sitio web enviar mensajes IPC arbitrarios que no desea ser posible. La forma correcta de exponer las APIs basadas en IPC sería proporcionar un método por mensaje IPPC.

```javascript
// ✅ Good code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```
