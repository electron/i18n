---
title: 'Electron Internals: Weak References'
author: zcbenz
date: '2016-09-20'
---

Als Sprache mit Müllsammlung befreit JavaScript Benutzer von der manuellen Verwaltung von Ressourcen. But because Electron hosts this environment, it has to be very careful avoiding both memory and resources leaks.

Dieser Beitrag führt das Konzept der schwachen Referenzen ein und wie sie verwendet werden, um Ressourcen in Electron zu verwalten.

---

## Schwachstellen Referenzen

In JavaScript, wenn Sie einer Variable ein Objekt zuweisen, fügen Sie dem Objekt eine Referenz hinzu. Solange es eine Referenz auf das Objekt gibt, wird es immer im Speicher behalten. Sobald alle Verweise auf das Objekt verschwunden sind, z. es keine Variablen mehr gibt, die das Objekt speichern, die JavaScript-Engine wird den Speicher bei der nächsten Müllsammlung wiederherstellen.

Eine schwache Referenz ist eine Referenz auf ein Objekt, das es Ihnen erlaubt, das Objekt zu erhalten, ohne zu bewirken, ob es Müll gesammelt wird oder nicht. Du wirst auch benachrichtigt, wenn das Objekt Müll gesammelt wird. Es wird dann möglich Ressourcen mit JavaScript zu verwalten.

Verwenden Sie die `NativeImage` Klasse in Electron als Beispiel, jedes Mal, wenn Sie das `nativeImage aufrufen. reate()` API, eine `NativeImage` Instanz wird zurückgegeben und speichert die Bilddaten in C++. Sobald du mit der Instanz fertig bist und die -JavaScript-Engine (V8) Müll das Objekt gesammelt hat, -Code in C++ wird aufgerufen, um die Bilddaten im Speicher freizugeben, so dass Benutzer dies nicht manuell verwalten müssen.

Another example is [the window disappearing problem][window-disappearing], which visually shows how the window is garbage collected when all the references to it are gone.

## Teste schwache Referenzen in Electron

Es gibt keine Möglichkeit, schwache Referenzen in rohem JavaScript direkt zu testen, da die Sprache keine Möglichkeit hat, schwache Referenzen zuzuweisen. The only API in JavaScript related to weak references is [WeakMap][WeakMap], but since it only creates weak-reference keys, it is impossible to know when an object has been garbage collected.

In Versionen von Electron vor v0.37.8 können Sie das interne `v8Util verwenden. etDestructor` API zum Testen schwacher Referenzen, die eine schwache Referenz zum übergebenen Objekt hinzufügt und den Rückruf aufruft, wenn das Objekt Müll sammelt:

```javascript
// Code below can only run on Electron < v0.37.8.
var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util.setDestructor(object, function () {
  console.log('The object is garbage collected')
})

// Remove all references to the object.
object = undefined
// Manually starts a GC.
gc()
// Console prints "The object is garbage collected".
```

Beachten Sie, dass Sie Electron mit dem `--js-flags="--expose_gc"` Befehl starten müssen, um die interne `gc` Funktion auszublenden.

Die API wurde in späteren Versionen entfernt, da V8 das Ausführen von JavaScript-Code im Destruktor nicht zulässt und dies in späteren Versionen zufällige Abstürze verursachen würde.

## Schwacher Referenzen im `Remote-` Modul

Neben der Verwaltung nativer Ressourcen mit C++ benötigt Electron auch schwache Referenzen, um JavaScript-Ressourcen zu verwalten. An example is Electron's `remote` module, which is a [Remote Procedure Call][remote-procedure-call] (RPC) module that allows using objects in the main process from renderer processes.

Eine Schlüsselherausforderung des `Remote-` Moduls besteht darin, Speicherlecks zu vermeiden. Wenn Benutzer ein entferntes Objekt im Renderer-Prozess erhalten das Modul `remote` muss garantieren, dass das Objekt weiterhin im Hauptprozess lebt, bis die Referenzen im Renderer-Prozess verschwunden sind. Zusätzlich es muss auch sicherstellen, dass das Objekt abgeholt werden kann, wenn es in Renderer-Prozessen keine Referenz mehr gibt.

Ohne eine ordnungsgemäße Implementierung würde der folgende Code zum Beispiel Speicherlecks schnell verursachen:

```javascript
const {remote} = require('electron')

für (let i = 0; i < 10000; ++i) {
  remote.nativeImage.createEmpty()
}
```

Die Ressourcenverwaltung im `Remote-` Modul ist einfach. Wann immer ein Objekt angefordert wird, eine Nachricht wird an den Hauptprozess gesendet und Electron speichert das Objekt in einer Karte und weist ihm eine ID zu. dann senden Sie die ID zurück an den Prozess Renderer. Im Renderer-Prozess das `Remote-` Modul erhält die ID und wickelt sie mit einem Proxy-Objekt und wenn das Proxy-Objekt Müll ist gesammelt, eine Nachricht wird an den Hauptprozess gesendet, um das Objekt freizugeben.

Unter Verwendung von `remote.require` API als Beispiel, sieht eine vereinfachte Implementierung wie folgt aus:

```javascript
remote.require = function (name) {
  // Der Hauptprozess soll die Metadaten des Moduls zurückgeben.
  const meta = ipcRenderer.sendSync('REQUIRE', name)
  // Proxy-Objekt erstellen.
  const object = metaToValue(meta)
  // Erzählen Sie dem Hauptprozess, um das Objekt zu befreien, wenn das Proxy-Objekt Müll ist
  // gesammelt.
  v8Util.setDestructor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  return object
}
```

Im Hauptprozess:

```javascript
const map = {}
const id = 0

ipcMain. n('REQUIRE', function (event name) {
  const object = require(name)
  // Fügen Sie eine Referenz zum Objekt hinzu.
  map[++id] = Objekt
  // Objekt in Metadaten konvertieren.
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('FREE', function (event, id) {
  delete map[id]
})
```

## Karten mit schwachen Werten

Mit der vorherigen einfachen Implementierung, jeder Aufruf im `Remote-` Modul wird ein neues entferntes Objekt vom Hauptprozess zurückgeben und jedes entfernte Objekt repräsentiert eine Referenz auf das Objekt im Hauptprozess.

Das Design selbst ist in Ordnung, aber das Problem ist, wenn es mehrere Anrufe an gibt, das gleiche Objekt zu erhalten, Es werden mehrere Proxy-Objekte erstellt und für komplizierte Objekte kann dies einen enormen Druck auf die Speicherauslastung und den Müll Sammlung verursachen.

Zum Beispiel den folgenden Code:

```javascript
const {remote} = require('electron')

für (let i = 0; i < 10000; ++i) {
  remote.getCurrentWindow()
}
```

Zuerst wird viel Speicher verwendet, um Proxy-Objekte zu erstellen und dann die CPU (Central Processing Unit) für das Sammeln und Senden von IPC- Nachrichten belegt.

Eine offensichtliche Optimierung ist es, die entfernten Objekte zu cachen: Wenn es bereits ein entferntes Objekt mit der gleichen ID gibt, das vorherige entfernte Objekt wird zurückgegeben, anstatt ein neues zu erstellen.

Dies ist mit der API im JavaScript-Kern nicht möglich. Using the normal map to cache objects will prevent V8 from garbage collecting the objects, while the [WeakMap][WeakMap] class can only use objects as weak keys.

Um dies zu beheben, wird ein Kartentyp mit Werten als schwache Referenzen hinzugefügt, der perfekt für das Caching von Objekten mit IDs ist. Jetzt sieht die `Fernbedienung` aus wie dies:

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // Den Hauptprozess anweisen, die Metadaten des Moduls zurückzugeben.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

Beachten Sie, dass der `remoteObjectCache` Objekte als schwache Referenzen speichert so dass es nicht nötig ist, den Schlüssel zu löschen, wenn das Objekt Müll gesammelt wird.

## Nativer Code

Für Interessenten, die am C++-Code von schwachen Referenzen in Electron interessiert sind, kann er in folgenden Dateien gefunden werden:

Die `setDestructor` API:

* [`object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`object_life_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

Die `createIDWeakMap` API:

* [`schlssel_schwach_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

[window-disappearing]: https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes
[WeakMap]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap
[remote-procedure-call]: https://en.wikipedia.org/wiki/Remote_procedure_call

