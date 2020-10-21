# Multi-citire

With [Web Workers][web-workers], it is possible to run JavaScript in OS-level threads.

## Node.js multi-filament

Este posibil să folosiți Nodul. caracteristicile lui Electron Web Workers, pentru a face astfel încât opţiunea `nodeIntegrationInWorker` ar trebui setată la `true` în `webPreferences`.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

`nodeIntegrationInWorker` poate fi folosit independent de `nodeIntegration`, `cutie de nisip` nu trebuie setată ca `adevărat`.

## API disponibile

Toate modulele încorporate din Node.js sunt acceptate în WebWorkers, iar `asar` arhive pot fi citite în continuare cu API-uri Node.js. Cu toate acestea, niciunul dintre modulele încorporate ale Electron nu poate fi folosit într-un mediu cu mai multe filete.

## Module native Node.js

Orice modul nativ Node.js poate fi încărcat direct în WebWorkers, dar este recomandat să nu se facă acest lucru. Majoritatea modulelor native existente au fost scrise presupunând un mediu cu un singur fir, folosirea lor în Web Workers va duce la prăbuşiri şi corupţii de memorie.

Țineți cont de asta chiar și în cazul unui nod nativ. s modulul este securizat pentru thread-safe tot nu este sigur să îl încarci într-un Web Worker deoarece procesul `. funcția` lopen nu este sigur.

Pentru moment, singura modalitate de a încărca un modul nativ în condiţii de siguranţă, este să te asiguri că aplicația nu încarcă module native după ce Web.

```javascript
process.dlopen = () => {
  aruncați o nouă Error('Încărcarea modulului nativ nu este sigură')
}
las pe lucrător = new Worker('script.js')
```

[web-workers]: https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers
