---
title: 'Electron Internals&#58; Riferimenti deboli'
author: zcbenz
date: '2016-09-20'
---

As a language with garbage collection, JavaScript frees users from managing resources manually. Ma perché Electron ospita questo ambiente, deve essere molto attento evitare perdite di memoria e di risorse.

Questo post introduce il concetto di riferimenti deboli e come vengono utilizzati per gestire le risorse in Electron.

---

## Riferimenti deboli

In JavaScript, ogni volta che si assegna un oggetto a una variabile, si sta aggiungendo un riferimento all'oggetto. As long as there is a reference to the object, it will always be kept in memory. Once all references to the object are gone, i.e. there are no longer variables storing the object, the JavaScript engine will recoup the memory on next garbage collection.

Un riferimento debole è un riferimento a un oggetto che consente di ottenere l'oggetto senza effettuare se sarà spazzatura raccolta o meno. Riceverai anche una notifica quando l'oggetto è immondizia raccolta. Diventa quindi possibile gestire le risorse con JavaScript.

Utilizzando la classe `NativeImage` in Electron come esempio, ogni volta che chiami `nativeImage. reate()` API, un'istanza `NativeImage` viene restituita ed è memorizzare i dati dell'immagine in C++. Una volta che si è fatto con l'istanza e il motore JavaScript (V8) ha spazzatura raccolto l'oggetto, il codice in C++ sarà chiamato per liberare i dati dell'immagine in memoria, quindi non c'è bisogno per gli utenti di gestire questo manualmente.

Un altro esempio è [la finestra che sparisce il problema](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes), che mostra visivamente come viene raccolta la finestra quando tutti i riferimenti ad essa sono spariti.

## Testare i riferimenti deboli in Electron

Non c'è modo di testare direttamente i riferimenti deboli in raw JavaScript dal momento che la lingua non ha un modo per assegnare riferimenti deboli. L'unica API in JavaScript correlata a riferimenti deboli è [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), ma dal momento che solo crea chiavi di riferimento debole, è impossibile sapere quando un oggetto è stato spazzatura raccolta.

Nelle versioni di Electron prima di v0.37.8, è possibile utilizzare l'interno `v8Util. etDestructor` API per testare i riferimenti deboli, che aggiunge un riferimento debole all'oggetto passato e chiama il callback quando l'oggetto è spazzatura raccolta:

```javascript
// Il codice qui sotto può essere eseguito solo su Electron < v0.37.8.
var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util. etDestructor(object, function () {
  console.log('The object is garbage collected')
})

// Rimuovi tutti i riferimenti all'oggetto.
object = non definito
// Avvia manualmente un GC.
gc()
// Stampa della console "L'oggetto è spazzatura raccolta".
```

Nota che devi avviare Electron con il comando `--js-flags="--expose_gc"` per esporre la funzione interna `gc`.

L'API è stata rimossa nelle versioni successive perché V8 in realtà non consente di eseguire il codice JavaScript nel destructor e nelle versioni successive in questo modo causerebbe crash casuali.

## Riferimenti deboli nel modulo `remoto`

Oltre a gestire le risorse native con C++, Electron ha bisogno di riferimenti deboli per gestire le risorse JavaScript. Un esempio è il modulo `remoto` di Electron, che è un modulo [Remote Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) che consente di utilizzare oggetti nel processo principale dai processi di renderer.

Una delle sfide principali con il modulo `remoto` è evitare perdite di memoria. Quando gli utenti acquisiscono un oggetto remoto nel processo di renderer, il modulo `remoto` deve garantire che l'oggetto continui a vivere nel processo principale fino a quando i riferimenti nel processo di rendering non sono finiti. Inoltre, deve anche assicurarsi che l'oggetto possa essere immondizia raccolta quando non ci sono più riferimenti ad esso in processi di renderer.

Ad esempio, senza una corretta attuazione, il seguente codice causerebbe perdite di memoria rapidamente:

```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; ++i) {
  remote.nativeImage.createEmpty()
}
```

La gestione delle risorse nel modulo `remoto` è semplice. Ogni volta che un oggetto è richiesto, un messaggio viene inviato al processo principale e Electron memorizzerà l'oggetto in una mappa e assegnerà un ID per esso, poi rispedire l'ID al processo di rendering . Nel processo di renderer, il modulo `remoto` riceverà l'ID e lo avvolgerà con un oggetto proxy e quando l'oggetto proxy è spazzatura raccolto, un messaggio sarà inviato al processo principale per liberare l'oggetto.

Utilizzando `remote.require` API come esempio, un'implementazione semplificata sembra così:

```javascript
remote.require = function (name) {
  // Comunica al processo principale di restituire i metadati del modulo.
  const meta = ipcRenderer.sendSync('REQUIRE', nome)
  // Crea un oggetto proxy.
  const object = metaToValue(meta)
  // Dì al processo principale di liberare l'oggetto quando l'oggetto proxy è spazzatura
  // raccolto.
  v8Util.setDestructor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  return object
}
```

Nel processo principale:

```javascript
const map = {}
const id = 0

ipcMain. n('REQUIRE', function (event, name) {
  const object = require(name)
  // Aggiungi un riferimento all'oggetto.
  map[++id] = object
  // Converti l'oggetto in metadati.
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('FREE', function (event, id) {
  delete map[id]
})
```

## Mappe con valori deboli

With the previous simple implementation, every call in the `remote` module will return a new remote object from the main process, and each remote object represents a reference to the object in the main process.

Il design stesso va bene, ma il problema è quando ci sono più chiamate per ricevere lo stesso oggetto, verranno creati più oggetti proxy e per oggetti complicati questo può aggiungere una pressione enorme sull'utilizzo della memoria e la raccolta rifiuti .

Ad esempio, il seguente codice:

```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; ++i) {
  remote.getCurrentWindow()
}
```

Utilizza prima un sacco di memoria per creare oggetti proxy e quindi occupa la CPU (Unità di elaborazione centrale) per la raccolta dei rifiuti e l'invio di messaggi IPC .

Un'ovvia ottimizzazione è quella di nascondere gli oggetti remoti: quando c'è già un oggetto remoto con lo stesso ID, l'oggetto remoto precedente verrà restituito invece di crearne uno nuovo.

Questo non è possibile con l'API in JavaScript core. Usando la mappa normale per la cache degli oggetti impedirà a V8 di raccogliere gli oggetti, mentre la classe [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) può usare solo oggetti come chiavi deboli.

Per risolvere questo problema, viene aggiunto un tipo di mappa con valori come riferimenti deboli, che è perfetto per la cache di oggetti con ID. Ora il `remote.require` sembra questo:

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // Tell the main process to return the meta data of the module.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

Nota che la `remoteObjectCache` memorizza gli oggetti come riferimenti deboli, quindi non è necessario eliminare la chiave quando l'oggetto è spazzatura raccolta.

## Codice nativo

Per le persone interessate al codice C++ di riferimenti deboli in Electron, si può trovare nei seguenti file:

L'API `setDestructor`:

* [`object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`object_life_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

L'API `createIDWeakMap`:

* [`key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

