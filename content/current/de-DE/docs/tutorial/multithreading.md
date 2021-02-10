# Multithreading

Mit [Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers) ist es möglich, JavaScript in OS-Level Threads auszuführen.

## Multithreaded Node.js

Es ist möglich `Node.js features` in `Electrons Webworkers` zu verwenden. Dazu muss die Option `nodeIntegrationInWorker` in den <0>WebPreferences</0> auf <0>true</0> gesetzt werden.

```javascript
const gewinnen = new BrowserWindow({
  webEinstellungen: {
    nodeIntegrationInWorker: true
  }
})
```

Der `nodeIntegrationInWorker` kann unabhängig von `Knotenintegration`verwendet werden aber `Sandbox` darf nicht auf `true` gesetzt werden.

## Verfügbare APIs

Alle eingebauten Module von Node.js werden von Webworkern unterstützt, und `asar` Archive können weiterhin mit Node.js API gelesen werden. Jedoch kann keines der integrierten Module von Electronic in einer Multi-Thread-Umgebung verwendet werden.

## Native Node.js Module

Any native Node.js module can be loaded directly in Web Workers, but it is strongly recommended not to do so. Die meisten existierenden nativen Module wurden geschrieben, wobei davon ausgegangen wird, dass die Verwendung in Webworkers zu Abstürzen und Speicherfehlern führt.

Note that even if a native Node.js module is thread-safe it's still not safe to load it in a Web Worker because the `process.dlopen` function is not thread safe.

Die einzige Möglichkeit, ein natives Modul für jetzt sicher zu laden stellt sicher, dass die App nach dem Start der Webworkers keine nativen Module lädt.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
const worker = new Worker('script.js')
```
