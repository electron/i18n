---
title: 'Electron Internals: Weak References'
author: zcbenz
date: '2016-09-20'
---

Als taal met garbagecollectie zorgt JavaScript ervoor dat gebruikers ervan worden weerhouden bronnen handmatig te beheren. Maar omdat Electron deze omgeving organiseert moet het zeer voorzichtig zijn om zowel geheugen als grondstoffen te vermijden.

Dit bericht introduceert het concept van zwakke referenties en hoe ze worden gebruikt om bronnen in Electron te beheren.

---

## Zwakke referenties

Als je een object aan een variabele toewijst, voeg je een referentie toe aan het object. Zolang er een verwijzing is naar het object, zal het altijd in het geheugen worden gehouden. Zodra alle verwijzingen naar het object weg zijn, d.w.z. er zijn geen variabelen meer die het object opslaan, de JavaScript engine zal het geheugen op de volgende garbagecollectie ophalen.

Een zwakke referentie is een verwijzing naar een object dat je in staat stelt om het object te krijgen zonder te beïnvloeden of het zal worden verzameld of niet. Je krijgt ook een melding van wanneer het object op garbage is verzameld. Het wordt dan mogelijk om bronnen te beheren met JavaScript.

Gebruik de `NativeImage` klasse in Electron als voorbeeld, elke keer dat je de `nativeImage belt. reate()` API, een `NativeImage` instantie wordt geretourneerd en het bewaart de afbeeldingsgegevens in C++. Once you are done with the instance and the JavaScript engine (V8) has garbage collected the object, code in C++ will be called to free the image data in memory, so there is no need for users manage this manually.

Een ander voorbeeld is [het venster verdwijnt probleem](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes), welke visueel laat zien hoe het venster wordt verzameld op garbage wanneer alle verwijzingen erheen zijn verdwenen.

## Zwakke verwijzingen in Electron testen

Er is geen manier om zwakke referenties in onbewerkte JavaScript rechtstreeks te testen, aangezien de taal van geen manier heeft om zwakke referenties toe te wijzen. De enige API in JavaScript met betrekking tot zwakke referenties is [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), maar omdat het slechts zwakke referentiesleutels creëert, is het onmogelijk te weten wanneer een object garbage is verzameld.

In versies van Electron vóór v0.37.8 kunt u de interne `v8Util gebruiken. etDestructor` API om zwakke referenties te testen, die een zwakke referentie aan het doorgegeven object toevoegt en de callback aanroept wanneer het object op garbage wordt verzameld:

```javascript
// Code hieronder kan alleen worden uitgevoerd op Electron < v0.37.8.
var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util. etDestructor(object, function () {
  console.log('Het object is garbage collected')
})

// Verwijder alle verwijzingen naar het object.
object = ongedefinieerd
// Handmatig start een GC.
gc()
// Console drukt "Het object is garbage collected" af.
```

Merk op dat je Electron moet starten met de `--js-flags="--expose_gc"` command switch om de interne `gc` functie bloot te stellen.

De API is in latere versies verwijderd omdat V8 het uitvoeren van JavaScript-code niet toestaat in de destructor en in latere versies zou dit willekeurige crashes veroorzaken.

## Zwakke verwijzingen in de `externe` module

Behalve het beheren van inheemse bronnen met C++, heeft Electron ook zwakke verwijzingen nodig om JavaScript-bronnen te beheren. Een voorbeeld is de `externe` module van Electron, wat een [extern Procedure Call](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) module is die het mogelijk maakt om objecten te gebruiken in het hoofdproces van renderer-processen.

Een belangrijke uitdaging met de `externe` module is het voorkomen van geheugenlekken. Wanneer gebruikers een extern object aanschaffen in het proces van de speler. de `externe` module moet garanderen dat het object blijft leven in het hoofdproces totdat de referenties in het rendererproces zijn verdwenen. Bovendien, het moet er ook voor zorgen dat het object kan worden opgeslagen wanneer er geen verwijzing meer naar is in renderer processen.

Bijvoorbeeld, zonder juiste uitvoering zou het volgen van code het geheugen lekken snel veroorzaken:

```javascript
const {remote} = require('electron')

voor (let i = 0; i < 10000; +i) {
  remote.nativeImage.createEmpty()
}
```

Het beheer van de bronnen in de `externe` module is eenvoudig. Wanneer een object is aangevraagd, een bericht wordt verzonden naar het hoofdproces en Electron zal het object opslaan op de kaart en er een ID voor toewijzen Stuur vervolgens het ID terug naar het renderer proces. In het renderer-proces, de `externe` module ontvangt de ID en sluit deze af met een proxy-object en wanneer het proxyobject op garbage staat verzameld, een bericht wordt verzonden naar het hoofdproces om het object vrij te maken.

Door `remote.require` API als voorbeeld te gebruiken, ziet een vereenvoudigde implementatie er zo uit:

```javascript
remote.require = functie (naam) {
  // Vertel het hoofd proces om de metadata van de module terug te geven.
  const meta = ipcRenderer.sendSync('REQUIRE', naam)
  // Creëer een proxyobject.
  const object = metaToValue(meta)
  // Vertel het hoofd proces om het object vrij te maken wanneer het proxyobject garbage
  // verzameld is.
  v8Util.setDestructor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  retourneer object
}
```

In het main proces:

```javascript
const kaart = {}
const id = 0

ipcMain. n('REQUIRE', functie (event, naam) {
  const object = require(name)
  // Een referentie aan het object toevoegen.
  map[++id] = object
  // Converteer het object naar metadata.
  event.returnValue = valueToMeta(id, object)
})

ipcMain.on('FREE', functie (event, id) {
  verwijder kaart[id]
})
```

## Kaarten met zwakke waarden

Met de vorige eenvoudige implementatie elk gesprek in de `externe` module geeft een nieuw extern object terug uit het hoofdproces. en elk extern object vertegenwoordigt een referentie naar het object in het hoofdproces.

Het ontwerp zelf is goed, maar het probleem is dat er meerdere oproepen zijn om hetzelfde object te ontvangen, Meerdere proxy-objecten zullen worden gemaakt en voor ingewikkelde objecten kan dit enorme druk op geheugengebruik en garbage collectie toevoegen.

Bijvoorbeeld, de volgende code:

```javascript
const {remote} = require('electron')

voor (let i = 0; i < 10000; +i) {
  remote.getCurrentWindow()
}
```

Het gebruikt eerst veel geheugen dat proxyobjecten maakt en gebruikt vervolgens de CPU (centrale verwerkingseenheid) om ze te verzamelen en IPC berichten te sturen.

Een voor de hand liggende optimalisatie is om de externe objecten te cachen: wanneer er al een extern object met dezelfde ID is, het vorige externe object wordt geretourneerd in plaats van een nieuwe te maken.

Dit is niet mogelijk met de API in JavaScript-core. Met behulp van de normale kaart om objecten te cachen verhindert het verzamelen van de objecten door V8, terwijl de [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) klasse alleen objecten als zwakke sleutels kan gebruiken.

Om dit op te lossen, een kaarttype met waarden als zwakke referenties wordt toegevoegd, wat perfect is voor het cachen van objecten met ID's. Nu ziet de `remote.require` eruit als dit:

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (naam) {
  // Vertel het hoofdproces om de meta data van de module terug te geven.
  ...
  if (remoteObjectCache.has(meta.id))
    return remoteObjectCache.get(meta.id)
  // Create a proxy object.
  ...
  remoteObjectCache.set(meta.id, object)
  return object
}
```

Merk op dat de `remoteObjectCache` objecten opslaat als zwakke referenties, dus is er geen noodzaak om de sleutel te verwijderen wanneer het object op garbage is verzameld.

## Oorspronkelijke code

Voor mensen die geïnteresseerd zijn in de C++-code van zwakke referenties in Electron, kan deze worden gevonden in de volgende bestanden:

De `setDefector` API:

* [`object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`object_life_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

De `createIDWeakMap` API:

* [`sleutel_zwakk_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_zwak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

