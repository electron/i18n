---
title: Mac App Store a Windows Auto aktualizace na Electronu
author: jlord
date: '2015-11-05'
---

Electron nedávno přidal dvě vzrušující funkce: kompatibilní sestavení Mac App Store a vestavěný Windows auto updater.

---

## Podpora Mac App Store

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

Počínaje `v0.34.0` každá verze Electronu obsahuje verzi kompatibilní s Mac App Store. Dříve by aplikace postavená na Electron nesplňovala požadavky společnosti Apple na Mac App Store. Většina těchto požadavků se týká používání soukromých API. Aby sandbox Electron splňoval požadavky, je třeba odstranit dva moduly:

- `Hlášení pádu`
- `automatický aktualizátor`

Kromě toho se některé chování změnily, pokud jde o detekci změn DNS, zachytávání videa a usnadnění přístupu. Více o změnách a [odevzdání aplikace do Mac App Store](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) si můžete přečíst v dokumentaci. Distribuce naleznete na [Electron releasases page](https://github.com/electron/electron/releases), s prefixem `mas-`.

Související Pull Requests: [elektron/electron#3108](https://github.com/electron/electron/pull/3108), [elektron/electron#2920](https://github.com/electron/electron/pull/2920)

## Automatická aktualizace systému Windows

V Electronu `v0.34.1` byl modul `auto-updater` vylepšen tak, aby fungoval s [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). To znamená, že Electron lodě s jednoduchými způsoby automatické aktualizace aplikace na OS X i Windows. Více si můžete přečíst při [nastavení aplikace pro automatickou aktualizaci na Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) v dokumentaci.

Související požadavek na natažení: [elektron/electron#1984](https://github.com/electron/electron/pull/1984)

