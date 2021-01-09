---
title: 'Electron Internals: Weak References'
author: zcbenz
date: '2016-09-20'
---

Jako język z kolekcją śmieci, JavaScript umożliwia użytkownikom zarządzanie zasobami ręcznie. Ale ponieważ Electron jest gospodarzem tego środowiska, musi być bardzo ostrożny i unikać wycieków zarówno pamięci, jak i zasobów.

Ten post wprowadza pojęcie słabych odniesień i sposób, w jaki są one używane do zarządzania zasobami w Electron.

---

## Słabe punkty odniesienia

W JavaScript, za każdym razem, gdy przypiszesz obiekt do zmiennej, dodajesz odniesienie do obiektu. As long as there is a reference to the object, it will always be kept in memory. Gdy wszystkie odniesienia do obiektu znikną, tj. nie ma już zmiennych przechowujących obiekt, silnik JavaScript odzyska pamięć na następnej kolekcji śmieci.

Słabe odniesienie jest odniesieniem do obiektu, który pozwala Ci uzyskać obiekt bez wpływu na to, czy będzie to śmieci zebrane, czy nie. Otrzymasz również powiadomień, gdy obiekt zostanie zebrany. Następnie można zarządzać zasobami za pomocą JavaScript.

Używając klasy `NativeImage` w Electron jako przykładu, za każdym razem, gdy wywołujesz `nativeImage. reate()` API, instancja `NativeImage` jest zwracana i zapisuje dane obrazu w C++. Gdy skończysz z instancją i silnik JavaScript (V8) zbiera przedmiot, kod w C++ zostanie wywołany aby zwolnić dane obrazu w pamięci, więc nie ma potrzeby zarządzania tym ręcznie.

Innym przykładem jest [problem znikania okna](https://electronjs.org/docs/faq/#my-apps-windowtray-disappeared-after-a-few-minutes), który wizualnie pokazuje jak okno jest śmiecią, gdy wszystkie odniesienia do niego znikną.

## Testowanie słabych odniesień w Electronie

Nie ma możliwości bezpośredniego przetestowania słabych odwołań w nieprzetworzonym języku JavaScript, ponieważ język nie ma sposobu na przypisanie słabych odwołań. Jedynym API w JavaScript związanym z słabymi referencjami jest [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap), ale ponieważ tylko tworzy słabe klucze referencyjne, nie można wiedzieć, kiedy obiekt został zebrany.

W wersjach Electron przed v0.37.8 możesz użyć wewnętrznego `v8Util. etDestructor` API aby przetestować słabe referencje, który dodaje słabe odniesienie do przekazanego obiektu i wywołuje wywołanie zwrotne, gdy obiekt jest śmiecią:

```javascript
// Kod poniżej może działać tylko Electron < v0.37.8.
var v8Util = process.atomBinding('v8_util')

var object = {}
v8Util. etDestructor(object, function () {
  console.log('Obiekt jest śmiecią')
})

// Usuń wszystkie odniesienia do obiektu.
obiekt = niezdefiniowany
// Ręcznie uruchamia GC.
gc()
// Konsola wydrukuje "obiekt jest śmiecią".
```

Pamiętaj, że musisz uruchomić Electron z przełącznikiem polecenia `--js-flags="--expose_gc"` , aby wyświetlić wewnętrzną funkcję `gc`.

API zostało usunięte w późniejszych wersjach, ponieważ V8 w rzeczywistości nie zezwala na uruchamianie kodu JavaScript w deinstruktorze i w późniejszych wersjach spowoduje to przypadkowe awarie.

## Słabe odwołania w module `zdalne`

Oprócz zarządzania zasobami natywnymi z C++, Electron potrzebuje również słabych odniesień do zarządzania zasobami JavaScript. Przykładem jest `zdalny moduł` Electrona, który jest [Modułem procedury zdalnej](https://en.wikipedia.org/wiki/Remote_procedure_call) (RPC) , który pozwala na korzystanie z obiektów w głównym procesie z procesów renderowania.

Jednym z kluczowych wyzwań za pomocą modułu `zdalne` jest uniknięcie wycieków pamięci. Gdy użytkownicy uzyskają zdalny obiekt w procesie renderowania, moduł `zdalny` musi gwarantować, że obiekt będzie nadal mieszkał w głównym procesie, dopóki odnośniki w procesie renderowania nie zostaną usunięte. Dodatkowo, musi również upewnić się, że obiekt może być zbierany gdy nie ma już żadnego odniesienia do niego w procesach renderowania.

Na przykład, bez prawidłowego wdrożenia, następujący kod spowodowałby szybkie wycieki pamięci :

```javascript
const {remote} = require('electron')

dla (let i = 0; i < 10000; ++i) {
  remote.nativeImage.createEmpty()
}
```

Zarządzanie zasobami w `zdalnym` jest proste. Za każdym razem, gdy obiekt jest wymagany, wiadomość jest wysyłana do głównego procesu, a Electron zapisze obiekt na mapie i przypisze dla niego identyfikator, następnie wyślij ID z powrotem do procesu renderowania . W procesie renderowania, `zdalny` moduł otrzyma identyfikator i zawija go z obiektem proxy oraz gdy obiekt proxy jest śmiecią wiadomość zostanie wysłana do głównego procesu, aby zwolnić obiekt.

Używanie `remote.require` API jako przykładu, uproszczona implementacja wygląda tak:

```javascript
remote.require = function (name) {
  // Opowiedz głównemu procesowi, aby zwrócić metadane modułu.
  const meta = ipcRenderer.sendSync('WYMAGAN', nazwa)
  // Utwórz obiekt proxy.
  obiekt const = metaToValue(meta)
  // Opowiedz głównemu procesowi, aby uwolnić obiekt gdy obiekt proxy jest śmiecią
  // zebrany.
  v8Util.setDestructor(object, function () {
    ipcRenderer.send('FREE', meta.id)
  })
  zwraca obiekt
}
```

W procesie głównym:

```javascript
mapa konst = {}
const id = 0

ipcMain. n('WYMAGANE', funkcja (zdarzenie, nazwa) {
  const object = require(name)
  // Dodaj odniesienie do obiektu.
  mapa [++id] = obiekt
  // Konwertuj obiekt na metadane.
  event.returnValue = valueToMeta(id, obiekt)
})

ipcMain.on('ZA DARMO', funkcja (zdarzenie, id) {
  usuń mapę[id]
})
```

## Mapy o słabych wartościach

Wraz z poprzednim prostym wdrożeniem, każde połączenie w `zdalnym` module zwróci nowy obiekt zdalny z głównego procesu, i każdy obiekt zdalny reprezentuje odniesienie do obiektu w głównym procesie.

Sama konstrukcja jest w porządku, ale problem polega na tym, że jest wiele połączeń do odbieranych przez ten sam obiekt, wiele obiektów proxy zostanie utworzonych, a dla skomplikowanych obiektów może to spowodować ogromną presję na wykorzystanie pamięci i zbieranie pamięci.

Na przykład następujący kod:

```javascript
const {remote} = require('electron')

dla (let i = 0; i < 10000; ++i) {
  remote.getCurrentWindow()
}
```

It first uses a lot of memory creating proxy objects and then occupies the CPU (Central Processing Unit) for garbage collecting them and sending IPC messages.

Oczywista optymalizacja polega na pamięci podręcznej obiektów zdalnych: gdy istnieje już zdalnego obiektu o tym samym identyfikatorze, poprzedni obiekt zdalny zostanie zwrócony zamiast tworzyć nowy.

To nie jest możliwe z API w rdzeniu JavaScript. Używanie normalnej mapy do pamięci podręcznej obiektów zapobiegnie zbieraniu przedmiotów przez V8, podczas gdy klasa [WeakMap](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap) może używać tylko obiektów jako słabych klawiszy.

Aby rozwiązać ten problem, dodano typ mapy z wartościami jako słabymi referencjami, który jest idealny do buforowania obiektów z ID. Teraz `pilot.require` wygląda na tak:

```javascript
const remoteObjectCache = v8Util.createIDWeakMap()

remote.require = function (name) {
  // Opowiedz głównemu procesowi, aby zwrócić metadane modułu.
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

## Kod natywny

Dla osób zainteresowanych kodem C++ słabych referencji w Electronie, można znaleźć w następujących plikach:

`destructor` API:

* [`object_life_monitor.cc`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.cc)
* [`object_life_monitor.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/object_life_monitor.h)

`createIDWeakMap` API:

* [`key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/key_weak_map.h)
* [`atom_api_key_weak_map.h`](https://github.com/electron/electron/blob/v1.3.4/atom/common/api/atom_api_key_weak_map.h)

