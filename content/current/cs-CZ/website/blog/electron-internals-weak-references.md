---
title: 'Electron Internals: Weak References'
author: zcbenz
date: '2016-09-20'
---

Jako jazyk s garbage collection, JavaScript osvobozuje uživatele od manuálního spravování zdrojů. Ale protože Electron hostí toto prostředí, musí být velmi opatrné, aby se zabránilo úniku paměti i zdrojů.

Tento příspěvek zavádí pojem slabých odkazů a způsob, jakým jsou využívány k správě zdrojů v Electronu.

---

## Slabé reference

V JavaScriptu vždy, když přiřadíte objekt k proměnné, přidáváte odkaz k objektu. Dokud existuje zmínka o předmětu, bude vždy v paměti. Jakmile jsou všechny odkazy na objekt pryč, tj. již nejsou proměnné ukládající objekt, JavaScript engine vrátí paměť na další garbage collection.

Slabý odkaz je odkazem na objekt, který umožňuje získat objekt , aniž by vyvolal, zda se jedná o sbírku odpadků nebo ne. Také dostanete upozornění, když je objekt sbírán. Pak je možné spravovat zdroje pomocí JavaScript.

Použití třídy `NativeImage` v Electronu jako příkladu, pokaždé, když zavoláte `nativeImage. Vytvořit()` API, instance `NativeImage` je vrácena a ukládá data o obrázku do C++. Jakmile jste hotovi s instancí a JavaScriptový engine (V8) má garbage shromážděn objekt, kód v C++ bude volán, aby byla data obrázku v paměti uvolněna, takže není potřeba, aby uživatelé spravovali to ručně.

Dalším příkladem je [vymizející problém s oknem](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes), které vizuálně zobrazuje, jak je okno sbíráno odpadky, když jsou všechny odkazy na něj pryč.

## Testování slabých referencí v Electronu

Není možné přímo testovat slabé odkazy v syrovém JavaScriptu, protože jazyk nemá způsob, jak přiřadit slabé odkazy. Jediné API v JavaScriptu vztahující se k slabým odkazům je [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), ale protože vytváří pouze slabé referenční klíče, není možné zjistit, kdy objekt byl odebrán .

Ve verzích Electronu před v0.37.8 můžete použít interní `v8Util. etDestructor` API pro testování slabých odkazů, který přidá slabý odkaz na předaný objekt a zavolá zpětné volání, když je objekt sbírán:

```javascript
// Kód níže může běžet pouze na Electron < v0.37.8.
var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util. etDestructor(object, funkce () {
  console.log('Objekt je garbage collected')
})

// Odstranit všechny odkazy na objekt.
objekt = nedefinovaný
// Ručně spouští GC.
gc()
// Konzole tiskne "Objekt je sbírán garbage".
```

Všimněte si, že Electron musíte začít s příkazem `--js-flags="--expose_gc"` přepnout pro odhalení interní funkce `gc`.

API bylo odstraněno v pozdějších verzích, protože V8 ve skutečnosti neumožňuje spuštění JavaScriptového kódu v destruktoru, a v pozdějších verzích by to způsobilo náhodné pády.

## Slabé odkazy v `vzdáleném` modulu

Kromě správy nativních zdrojů s C++, Electron také potřebuje slabé odkazy ke správě zdrojů JavaScriptu. Příkladem je `vzdálený modul Electronu` , což je modul [dálkový postup volání](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC), , který umožňuje používat objekty v hlavním procesu z procesu vykreslování.

Jednou z klíčových výzev pro `vzdálený` modul je zabránit úniku paměti. When users acquire a remote object in the renderer process, the `remote` module must guarantee the object continues to live in the main process until the references in the renderer process are gone. Kromě toho musí se také ujistit, že objekt může být sbírán, když již není v procesu renderer.

Například, bez správné implementace by následující kód způsobil rychlý únik paměti :

```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; ++i) {
  remote.nativeImage.createEmpty()
}
```

Správa zdrojů v modulu `vzdálený` je jednoduchá. Whenever an object is requested, a message is sent to the main process and Electron will store the object in a map and assign an ID for it, then send the ID back to the renderer process. V procesu vykreslování modul `vzdálený` obdrží ID a zabalí jej proxy-object a když je soubor proxy objektu garbage , zpráva bude odeslána do hlavního procesu za účelem uvolnění objektu.

Použití `na dálku.vyžadovat` API jako příklad, zjednodušená implementace vypadá takto:

```javascript
remote.require = funkce (jméno) {
  // Řekněte hlavnímu procesu, aby vrátil metadata modulu.
  const meta = ipcRender.sendSync('REQUIRE', jméno)
  // Vytvořit proxy objekt.
  const object = metaToValue(meta)
  // Řekněte hlavnímu procesu pro uvolnění objektu, když je proxy objekt garbage
  // collected.
  v8Util.setDestructor(object, funkce () {
    ipcRender.send('FREE', meta.id)
  })
  návratový objekt
}
```

V hlavním procesu:

```javascript
const map = {}
const id = 0

ipcMain. n('REQUIRE', funkce (případ, jméno) {
  const object = require(name)
  // Add reference to the object.
  map[++id] = objekt
  // Převést objekt na metadata.
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('FREE', funkce (událost, id) {
  smazat mapu[id]
})
```

## Mapy se slabými hodnotami

S předchozím jednoduchým provedením, každý hovor v modulu `vzdálený` vrátí nový vzdálený objekt z hlavního procesu, a každý vzdálený objekt představuje odkaz na objekt v hlavním procesu.

Samotný design je v pořádku, ale problém je v případě, že existuje více volání na přijmout stejný objekt, bude vytvořeno více proxy objektů a pro komplikované objekty, které mohou přispět k obrovskému tlaku na využití paměti a garbage kolekci.

Např. následující kód:

```javascript
const {remote} = require('electron')

for (let i = 0; i < 10000; ++i) {
  remote.getCurrentWindow()
}
```

Nejprve používá spoustu objektů vytvářejících proxy pro paměť a poté zabírá CPU (ústřední zpracovatelská jednotka) pro jejich sběr a odesílání zpráv IPC .

Zjevnou optimalizací je mezipaměť vzdálených objektů: pokud již existuje vzdálený objekt se stejným ID, předchozí vzdálený objekt bude vrácen místo vytvoření nového.

To není možné s API v jazyce JavaScriptu. Použití normální mapy pro objekty mezipaměti zabrání V8 sbírat objekty, zatímco třída [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) může používat objekty pouze jako slabé klíče.

Pro vyřešení tohoto problému je přidán typ mapy s hodnotami jako slabé odkazy, což je ideální pro ukládání objektů s ID. Nyní `vzdálené.require` vypadá jako takto:

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = funkce (jméno) {
  // Řekni hlavnímu procesu, aby vrátil meta data modulu.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

Všimněte si, že `RemmoteObjectCache` ukládá objekty jako slabé odkazy, takže není třeba odstraňovat klíč, když je objekt sbírán.

## Domácí kód

Pro lidi, kteří mají zájem o kód C++ slabých odkazů v Electronu, je možné najít v následujících souborech:

`setDestructor` API:

* [`objekt_život_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`objekt_život_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

`createIDWeakMap` API:

* [`vysunutí_mapa.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_klávesa_slabá_mapa.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

