---
title: 'Electron Internals&#58; Referințe slabe'
author: zcbenz
date: '2016-09-20'
---

Ca limbă cu colecție de gunoi, JavaScript eliberează utilizatorii de la gestionarea manuală a resurselor . Dar pentru că Electron găzduiește acest mediu, trebuie să fie foarte atent, evitând atât memoria, cât și resursele.

Această postare introduce conceptul de referințe slabe și modul în care acestea sunt folosite pentru gestionarea resurselor în Electron.

---

## Referințe slabe

În JavaScript, de fiecare dată când atribui un obiect unei variabile, adaugi o referință la obiect. Atâta timp cât există o referinţă la obiect, acesta va fi întotdeauna păstrat în memorie. Odată ce toate referințele la obiect au dispărut, adică acolo nu mai sunt variabile care stochează obiectul, motorul JavaScript va recupera memoria la următoarea colecție de gunoi.

O referință slabă este o referință la un obiect care vă permite să obțineți obiectul fără să efectuați dacă va fi colectat sau nu gunoi. Vei primi, de asemenea, notificări atunci când obiectul este colectat. Apoi devine posibilă gestionarea resurselor cu JavaScript.

Folosind clasa `NativeImage` din Electron ca exemplu, de fiecare dată când apelezi la `imaginea nativă. reate()` API, o instanță `NativeImage` a fost returnată și stochează datele imaginii în C++. Odată ce ai terminat cu instanța și cu motorul JavaScript (V8) a colectat obiectul, codul din C++ va fi apelat pentru a elibera datele imaginii din memorie, astfel încât utilizatorii nu trebuie să gestioneze manual.

Un alt exemplu este [fereastra care dispare problema](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes), care arată vizual modul în care fereastra este colectată atunci când toate referinţele la ea au dispărut.

## Testarea referințelor slabe în Electron

Nu există nicio modalitate de a testa direct referințele slabe în JavaScript brut, deoarece limba nu are un mod de a atribui referințe slabe. Singurul API din JavaScript legat de referințe slabe este [SeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), dar din moment ce doar creează chei de referință slabe, este imposibil de știut când un obiect a fost gunoi colectat.

În versiunile Electron înainte de v0.37.8, poți folosi versiunea internă `v8Util. etDestructor` API pentru a testa referințele slabe, care adaugă o referință slabă la obiectul pasat și apelează callback-ul atunci când obiectul este colectat:

```javascript
// Codul de mai jos poate rula numai pe Electron < v0.37.8.
var var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util. etDestructor(obiect, function () {
  console.log('Obiectul este gunoiul colectat')
})

// Eliminați toate referințele obiectului.
obiect = nedefinit
// Porniți manual un GC.
gc()
// Console prints "Obiectul este gunoiul colectat".
```

Țineți cont că trebuie să începeți Electron cu comanda `--js-flags="--exse_gc"` pentru a expune funcția `gc` internă.

API-ul a fost eliminat în versiunile ulterioare deoarece V8 nu permite de fapt rularea codului JavaScript în distructiv, iar versiunile ulterioare făcând acest lucru ar cauza accidente aleatorii.

## Referințe slabe în modulul `la distanță`

În afară de gestionarea resurselor native cu C++, Electron are nevoie și de referințe slabe pentru a gestiona resursele JavaScript. Un exemplu este modulul `la distanță` al Electron, care este un [modul de apel de procedură la distanță](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) ce permite utilizarea obiectelor în procesul principal de redare.

O provocare cheie cu modulul `la distanță` este evitarea scurgerilor de memorie. Când utilizatorii achiziționează un obiect extern în procesul de redare, `modulul de la distanţă` trebuie să garanteze că obiectul continuă să trăiască în procesul principal până când referinţele din procesul de redare au dispărut. Suplimentar, trebuie de asemenea să se asigure că obiectul poate fi gunoi colectat atunci când nu mai există nicio referire la el în procese de redare.

De exemplu, fără implementarea corectă, următorul cod ar cauza memorie scurgeri rapide:

```javascript
const {remote} = require('electron')

pentru (let i = 0; i < 10000; ++i) {
  remote.nativeImage.createEmpty()
}
```

Gestionarea resurselor în modulul `la distanță` este simplă. Ori de câte ori un obiect este solicitat, un mesaj este trimis la procesul principal și Electron va stoca obiectul pe hartă și va atribui un ID pentru el, apoi trimite ID-ul înapoi la procesul de redare. În procesul de redare, modulul `remote` va primi ID-ul și îl va completa cu un obiect proxy și atunci când obiectul proxy este colectat , un mesaj va fi trimis la procesul principal pentru a elibera obiectul.

Using `remote.require` API as an example, a simplified implementation looks like this:

```javascript
remote.require = function (name) {
  // Spuneți procesul principal pentru a returna metadatele modulului.
  const meta = ipcRenderer.sendSync('REQUIRE', nume)
  // Creați un obiect proxy.
  const object = metaToValue(meta)
  // Spuneți procesului principal pentru a elibera obiectul atunci când obiectul proxy este gunoi
  // colectat.
  v8Util.setDestructor(obiect, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  return object
}
```

În procesul principal-main:

```javascript
const map = {}
const id id = 0

ipcMain. n('REQUIRE', function (event, name) {
  const object = require(name)
  // Adăugați o referință la obiect.
  map[++id] = obiectul
  // Convertește obiectul în metadate.
  event.returnValue = valueToMeta(id, obiect)
})

ipcMain.on('FREE', function (event, id) {
  șterge harta[id]
})
```

## Hărți cu valori slabe

Cu simpla punere în aplicare precedentă, fiecare apel din modulul `la distanță` va returna un nou obiect de la distanță din procesul principal, si fiecare obiect distant reprezinta o referinta la obiectul in procesul principal.

Design-ul în sine este bine, dar problema este atunci când există mai multe apeluri pentru a primi același obiect, mai multe obiecte proxy vor fi create și pentru obiecte complicate acest lucru poate adăuga o presiune uriașă asupra utilizării memoriei și colectării de gunoi .

De exemplu, următorul cod:

```javascript
const {remote} = require('electron')

pentru (let i = 0; i < 10000; ++i) {
  remote.getCurrent Window()
}
```

Mai întâi folosește o mulțime de memorie care creează obiecte proxy și ocupă CPU (Unitatea de procesare centrală) pentru a le colecta și trimite mesaje IPC .

O optimizare evidentă este pentru a face cache la obiectele de la distanță: atunci când există deja un obiect de la distanță cu același ID, obiectul de la distanţă anterior va fi returnat în loc să creeze unul nou.

Acest lucru nu este posibil cu API în codul JavaScript. Folosind harta normala pentru a depozita obiecte va împiedica V8 sa colecteze obiectele, în timp ce clasa [Sărbători](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) poate folosi doar obiecte ca chei slabe.

Pentru a rezolva acest lucru, un tip de hartă cu valori pe cât sunt adăugate referinţe slabe, care este perfect pentru cache-ul obiectelor cu ID-uri. Acum `telecomanda.require` arată ca :

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // Spuneți procesul principal pentru a returna meta datele modulului.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

Note that the `remoteObjectCache` stores objects as weak references, so there is no need to delete the key when the object is garbage collected.

## Cod nativ

Pentru persoanele interesate de codul C++ al referințelor slabe din Electron, acesta poate fi găsit în următoarele fișiere:

`SetDestructor` API:

* [`object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`object_life_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

`CreateIDWeakMap` API:

* [`tastă_slab_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

