# Isolamento Del Contesto

## Che cos'è?

Context Isolation è una funzionalità che assicura che sia il tuo `precarico` script e la logica interna di Electron's eseguano in un contesto separato al sito web che carichi in un [`contenuto web`](../api/web-contents.md).  Questo è importante per scopi di sicurezza, in quanto aiuta a impedire al sito web di accedere a Electron internals o alle potenti API a cui il tuo script di preload ha accesso.

Ciò significa che l'oggetto `window` a cui il tuo script di precaricamento ha accesso è in realtà un **diverso** oggetto a cui il sito avrebbe accesso.  Ad esempio, se hai impostato `window.hello = 'wave'` nel tuo script preload e l'isolamento del contesto è abilitato `finestra. ello` non sarà definito se il sito cerca di accedervi.

Ogni singola applicazione dovrebbe avere l'isolamento del contesto abilitato e da Electron 12 sarà abilitata per impostazione predefinita.

## Come posso abilitarlo?

Da Electron 12, sarà attivato per impostazione predefinita. Per le versioni inferiori è un'opzione nell'opzione `webPreferences` quando si costruisce `nuova BrowserWindow`'s.

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## Migrazione

> Ho usato per fornire API dal mio script di precaricamento utilizzando `window.X = apiObject` ora che cosa?

Esporre le API dal tuo script di precaricamento al sito web caricato è un usecase comune e c'è un modulo dedicato in Electron per aiutarti a farlo in modo indolore.

**Prima: Con isolamento del contesto disabilitato**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**Dopo: Con isolamento del contesto abilitato**

```javascript
const { contextBridge } = require('electron')

contextBridge.exposeInMainWorld('myAPI', {
  doAThing: () => {}
})
```

Il modulo [`contextBridge`](../api/context-bridge.md) può essere utilizzato per **in modo sicuro** esporre le API dal contesto isolato in cui lo script di preload viene eseguito nel contesto in cui il sito web è in esecuzione. L'API sarà accessibile anche dal sito web su `window.myAPI` proprio come prima.

Dovresti leggere la documentazione `contextBridge` collegata sopra per comprendere appieno le sue limitazioni.  Per esempio non è possibile inviare prototipi o simboli personalizzati sul bridge.

## Considerazioni Sulla Sicurezza

Abilitare `contextIsolation` e usare `contextBridge` non significa automaticamente che tutto ciò che fai è sicuro.  Per esempio questo codice è **non sicuro**.

```javascript
// ❌ codice errato
contextBridge.exposeInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Espone direttamente una potente API senza alcun tipo di filtraggio degli argomenti. Questo permetterebbe a qualsiasi sito web di inviare messaggi IPC arbitrari che non si desidera essere possibili. Il modo corretto di esporre le API basate su IPC sarebbe invece quello di fornire un metodo per ogni messaggio IPC.

```javascript
// ✅ Good code
contextBridge.exposeInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```
