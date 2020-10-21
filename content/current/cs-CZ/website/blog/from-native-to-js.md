---
title: Od nativního do JavaScriptu v Electronu
author: codebytere
date: '2019-03-19'
---

Jak se funkce Electronu napsané v C++ nebo Objective-C dostanou k JavaScriptu tak, aby byly dostupné konečnému uživateli?

---

## Pozadí

[Electron](https://electronjs.org) je JavaScriptová platforma, jejímž hlavním účelem je snížit vstupní bariéru pro vývojáře při vytváření robustních desktopových aplikací bez obav o implementace specifické pro platformu. Ve svém jádru však Electron stále potřebuje funkci specifickou pro platformu, která bude psána v daném systémovém jazyce.

Electron pro vás ve skutečnosti zpracovává nativní kód, takže se můžete soustředit na jedno JavaScript API.

Jak to však funguje? Jak se funkce Electronu napsané v C++ nebo Objective-C dostanou k JavaScriptu tak, aby byly dostupné konečnému uživateli?

Chcete-li vysledovat tuto cestu, začněme s [`aplikací` modulem](https://electronjs.org/docs/api/app).

Otevřením souboru [`app.ts`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/lib/browser/api/app.ts) uvnitř našeho adresáře `lib/` najdete následující řádek kódu směrem nahoru:

```js
const vazba = proces.electronBinding('app')
```

Tento řádek ukazuje přímo na mechanismus Electronu pro vazbu modulů C+/Objective-C na JavaScript pro použití vývojáři. Tato funkce je vytvořena záhlavím a [implementačním souborem](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/common/api/electron_bindings.cc) pro třídu `ElectronBindings`.

## `Proces.electronVazba`

Tyto soubory přidávají `proces.electronBinding` funkci, která se chová jako Node.js’ `proces.závazné`. `proces.závazné` je nižší implementace Node. s [`vyžadována metoda ()`](https://nodejs.org/api/modules.html#modules_require_id) , kromě toho, že umožňuje uživatelům `vyžadovat` původní kód namísto jiného kódu napsaného v JS. Tato funkce `proces.electronBinding` dává možnost načíst nativní kód z Electronu.

Když top-level JavaScript modul (např. `app`) vyžaduje tento nativní kód, jak je určen a nastaven stav tohoto nativního kódu? Kde jsou metody vystaveny JavaScriptu? A co vlastnosti?

## `nativní_mate`

V současné době odpovědi na tuto otázku naleznete v `native_mate`: fork of Chromium's [`gin` library](https://chromium.googlesource.com/chromium/src.git/+/lkgr/gin/) , která usnadňuje marshal typy mezi C++ a JavaScript.

uvnitř `native_mate/native_mate` je záhlaví a implementační soubor pro `object_template_builder`. To nám umožňuje vytvářet moduly v nativním kódu, jehož tvar je v souladu s tím, co by očekávali vývojáři JavaScriptu.

### `partner::Šablona objektů`

Pokud se podíváme na každý Electron modul jako `objekt`, je snazší zjistit, proč bychom k jejich výstavbě chtěli použít `object_template_builder`. Tato třída je postavena nad třídou vystavenou V8, což je open source vysoce výkonný JavaScript a WebAssembly engine, napsaný v C++. V8 implementuje JavaScript (ECMAScript) specifikaci, takže jeho původní implementace funkce mohou být přímo korelovány s implementacemi v JavaScript. Například, [`v8::ObjectTemplate`](https://v8docs.nodesource.com/node-0.8/db/d5f/classv8_1_1_object_template.html) nám dává JavaScriptové objekty bez specializované stavební funkce a prototypu. Používá `Objekt[.prototype]`a v JavaScriptu by se rovnal [`Object.create()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create).

Chcete-li toto vidět v akci, podívejte se na implementační soubor modulu aplikace, [`atom_api_app.cc`](https://github.com/electron/electron/blob/0431997c8d64c9ed437b293e8fa15a96fc73a2a7/atom/browser/api/atom_api_app.cc). V dolní části je toto:

```cpp
mate::ObjectTemplateBuilder(izolate, prototype->PrototypeTemplate())
    .SetMethod("getGPUInfo", &App::GetGPUInfo)
```

Ve výše uvedené řádce se `.SetMethod` nazývá `matou:::ObjectTemplateBuilder`. `. etMethod` může být volána na libovolné instanci třídy `ObjectTemplateBuilder` pro nastavení metod na prototypu objektu [](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype) v JavaScriptu, s touto syntaxí:

```cpp
.SetMethod("method_name", &function_to_bind)
```

Toto je JavaScript ekvivalent:

```js
funkce App{}
App.prototype.getGPUInfo = funkce () {
  // implementace zde
}
```

Tato třída obsahuje také funkce pro nastavení vlastností modulu:

```cpp
.SetProperty("property_name", &getter_function_to_bind)
```

or

```cpp
.SetProperty("property_name", &getter_function_to_bind, &setter_function_to_bind)
```

Toto by zase byly implementace JavaScriptu z [Object.defineProperty](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty):

```js
funkce App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
})
```

a

```js
funkce App {}
Object.defineProperty(App.prototype, 'myProperty', {
  get() {
    return _myProperty
  }
  set(newPropertyValue) {
    _myProperty = newPropertyValue
  }
})
```

Je možné vytvořit JavaScript objekty vytvořené s prototypy a vlastnostmi, jak je vývojáři očekávají, a jasněji důvod pro funkce a vlastnosti implementované na této nižší systémové úrovni!

Rozhodnutí, kde zavést některou z metod modulu, je samo o sobě složité, často nedeterministické, které budeme pokrývat v budoucnu.
