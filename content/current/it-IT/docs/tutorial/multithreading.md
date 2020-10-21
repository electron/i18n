# Multithreading

Con [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers)è possibile eseguire JavaScript nelle discussioni di livello OS- .

## Node.js Multi-Filettati

È possibile usare Node. s caratteristiche negli Operatori Web di Electron, per fare così l'opzione `nodeIntegrationInWorker` dovrebbe essere impostata su `true` in `webPreferences`.

```javascript
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

The `nodeIntegrationInWorker` can be used independent of `nodeIntegration`, ma `sandbox` non deve essere impostato su `true`.

## API disponibili

Tutti i moduli integrati di Node.js sono supportati in Web Workers e gli archivi `asar` possono ancora essere letti con le API Node.js. Tuttavia nessuno dei moduli integrati di Electron's può essere utilizzato in un ambiente multi-filettato.

## Moduli nativi Node.js

Qualsiasi modulo nativo Node.js può essere caricato direttamente nei Lavoratori Web, ma è fortemente raccomandato di non farlo. La maggior parte dei moduli nativi esistenti sono stati scritti supponendo un ambiente a filettatura singola, usandoli in Web Workers condurranno a crash e danneggiamenti della memoria.

Si noti che anche se un nodo nativo. s module is thread-safe is still not safe to load it in a Web Worker because the `process. lopen` function is not thread safe.

L'unico modo per caricare un modulo nativo in modo sicuro per ora, è quello di assicurarsi che l'applicazione carica nessun modulo nativo dopo che i Lavoratori Web vengono avviati.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
const worker = new Worker('script.js')
```
