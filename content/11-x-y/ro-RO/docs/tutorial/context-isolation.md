# Izolare contextuală

## Ce este?

Izolarea contextului este o caracteristică care asigură că atât script-urile tale `preîncarcă` cât și logica internă a Electron rulează într-un context separat față de site-ul web încarci [`conținut web`](../api/web-contents.md).  Acest lucru este important în scopuri de securitate, deoarece ajută ca site-ul web să aibă acces la Electron intern sau la API-urile puternice la care aveți acces scriptul de pre-încărcare.

Acest lucru înseamnă că obiectul `fereastra` la care are acces scriptul de preîncărcare este de fapt un **diferit** de cel la care ar avea acces site-ul.  De exemplu, dacă setați `window.hello = 'wave'` în scriptul de preîncărcare și izolarea contextului este activată `fereastră. ello` va fi nedefinit dacă site-ul încearcă să îl acceseze.

Fiecare aplicație ar trebui să aibă activată izolarea contextului, iar de Electron 12 va fi activată în mod implicit.

## Cum o activez?

De la Electron 12, acesta va fi activat în mod implicit. Pentru versiunile inferioare este o opţiune în opţiunea `webPreferences` atunci când se construieşte `o fereastră nouă de browser`'s.

```javascript
const mainWindow = new BrowserWindow({
  webPreferences: {
    contextIsolation: true
  }
})
```

## Migrare

> Obişnuiam să furnizez API-uri din scriptul meu de preîncărcare folosind `window.X = apiObject` acum ce?

Expunerea de API-uri din scriptul de pre-încărcare la site-ul încărcat este o usecază comună și există un modul dedicat în Electron pentru a vă ajuta să faceți acest lucru într-un mod nedureros.

**Înainte: Cu izolarea contextului dezactivată**

```javascript
window.myAPI = {
  doAThing: () => {}
}
```

**După: Cu izolarea contextului activată**

```javascript
const { contextBridge } = require('electron')

contextBridge.ExpseInMainWorld('myAPI', {
  doAThing: () => {}
})
```

Modulul [`contextBridge`](../api/context-bridge.md) poate fi utilizat pentru **în condiții de siguranță** a expune API-urile din contextul izolat în care rulează scriptul de preîncărcare în contextul în care se află site-ul web. API va fi, de asemenea, accesibil de pe site-ul `window.myAPI` la fel cum a fost înainte.

Ar trebui să citiţi documentaţia `contextBridge` conectată mai sus pentru a înţelege complet limitările sale.  De exemplu, nu poți trimite prototipuri sau simboluri personalizate peste punte.

## Considerații de securitate

Doar activând contextIsolation `` şi utilizând `contextBridge` nu înseamnă automat că tot ce faci este în siguranţă.  De exemplu, acest cod este **nesigur**.

```javascript
// ❌ Cod greșit
contextBridge.exhibition seInMainWorld('myAPI', {
  send: ipcRenderer.send
})
```

Expune direct un API puternic fără niciun fel de filtru de argumente. Acest lucru ar permite oricărui site web să trimită mesaje IPC arbitrare pe care nu doriți să le permiteți. Modul corect de a expune API-urile bazate pe IPC ar fi, în schimb, să se furnizeze o metodă pentru fiecare mesaj IPC.

```javascript
// ✅ Cod bun
contextBridge.ExpseInMainWorld('myAPI', {
  loadPreferences: () => ipcRenderer.invoke('load-prefs')
})
```

