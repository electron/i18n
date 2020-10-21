---
title: Změny API přicházejí v Electronu 1.0
author: zcbenz
date: '2015-11-17'
---

Od začátku elektronu se startovací cesta zpět, když se nazývala Atom-Shell, experimentujeme s tím, že poskytujeme pěkné JavaScript API pro modul obsahu Chromia a nativní komponenty GUI. API začaly velmi ekologicky a v průběhu času jsme udělali několik změn, abychom zlepšili původní návrhy.

---

Nyní s Electron vytahováním na verzi 1.0, rádi bychom využili příležitosti ke změně tím, že se zabýváme posledními sklepujícími údaji API. Níže popsané změny jsou zahrnuty v **0,35.**, se starými API oznamují výstrahy zastaralého používání, abyste mohli být aktuální pro budoucí vydání 1.0. Electron 1.0 nebude po dobu několika měsíců ven, takže máte nějaký čas, než se tyto změny rozpadnou.

## Zastaralé výstrahy

Ve výchozím nastavení se zobrazí varování, pokud používáte zastaralé API. Chcete-li je vypnout, můžete nastavit `process.noDeprecation` na `true`. Chcete-li sledovat zdroje zastaralého používání API, můžete nastavit `proces. hrowDeprecation` - `true` pro shození výjimek místo tisku výstrah, nebo nastavit `proces. závodníDeprecation` až `true` k vytisknutí stopy deprese

## Nový způsob používání vestavěných modulů

Integrované moduly jsou nyní seskupeny do jednoho modulu, místo aby byly rozděleny do nezávislých modulů, takže je můžete použít [bez konfliktů s ostatními moduly](https://github.com/electron/electron/issues/387):

```javascript
var app = vyžadováno ('electron').app
var BrowserWindow = vyžadováno ('electron').BrowserWindow
```

Starý způsob `vyžadovaný ('app')` je stále podporován pro zpětnou kompatibilitu, ale můžete také vypnout:

```javascript
require('electron').hideInternalModules()
require('app') // hodí chybu.
```

## Snadnější způsob, jak použít `vzdálený` modul

Vzhledem k tomu, jak se změnilo používání vestavěných modulů, usnadnili jsme používání modulů hlavního procesu v procesu zobrazování. Nyní můžete přistupovat k atributům `vzdáleného`pro jejich použití:

```javascript
// Nová cesta.
var app = vyžadováno ('electron').remote.app
var BrowserWindow = vyžadováno ('electron').remote.BrowserWindow
```

Namísto dlouhého používání vyžaduje řetěz:

```javascript
// Stará cesta.
var app = require('electron').remote.require('app')
var BrowserWindow = require('electron').remote.require('BrowserWindow')
```

## Rozdělení `ipc` modulu

Modul `ipc` existoval jak v hlavním procesu, tak v procesu vykreslování a API se lišilo na každé straně, což je pro nové uživatele celkem matoucí. Modul jsme přejmenovali na `ipcMain` v hlavním procesu a `ipcRenderer` v procesu vykreslování, abychom se vyhnuli nejasnostem:

```javascript
// In main process.
var ipcMain = vyžadovat('electron').ipcMain
```

```javascript
// V procesu vykreslování.
var ipcRenderer = require('electron').ipcRenderer
```

A pro `ipcRenderer` modul byl při přijímání zpráv přidán extra `objekt` , aby odpovídal způsobu zpracování zpráv v modulech `ipcMain`:

```javascript
ipcRender.on('message', funkce (event) {
  console.log(event)
})
```

## Standardizuji možnosti `BrowserWindow`

Možnosti `BrowserWindow` mají různé styly na základě možností jiných API, a bylo těžké použít v JavaScriptu kvůli názvu `-`. Nyní jsou standardizovány podle tradičních názvů JavaScriptu:

```javascript
nový prohlížeč Window({ minWidth: 800, minHeight: 600 })
```

## Podle pravidel DOM pro API názvy

Názvy API v Electronu preferovaly camelCase pro všechna API jména, jako `Url` na `URL`, ale DOM má své vlastní zvyklosti, a dávají přednost `URL adrese` před `Url`, při použití `Id` místo `ID`. Provedli jsme následující API přejmenování, aby odpovídalo stylům DOM:

* `Url` je přejmenován na `URL`
* `Csp` je přejmenován na `CSP`

V důsledku těchto změn si všimnete spousty deprese při používání Electron v0.35.0 pro vaši aplikaci. Jednoduchý způsob, jak je opravit, je nahradit všechny instance `Url` `URL`.

## Změny názvů událostí `v systémové liště`

Styl názvů událostí `Tray` byl trochu odlišný od ostatních modulů, takže bylo provedeno přejmenování, aby odpovídalo ostatním.

* `kliknuto` je přejmenováno na `klikni`
* `dvojitým kliknutím` je přejmenován na `dvojklikem`
* `kliknutí pravým tlačítkem myši` je přejmenováno na `kliknutím pravým tlačítkem`

