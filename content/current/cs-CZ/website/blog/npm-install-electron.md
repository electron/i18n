---
title: npm install electron
author: zeke
date: '2016-08-16'
---

Pokud jde o Electron verze 1.3.1, můžete `npm nainstalovat elektroron --save-dev` do nainstalovat nejnovější předkompilovanou verzi Electronu ve vaší aplikaci.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## Předpostavený binární Electron

Pokud jste již někdy pracovali na Electronu aplikaci, pravděpodobně jste narazili na `elektronicky předsestavený` npm. Tento balíček je nepostradatelnou součástí téměř každého projektu Electron. Při instalaci detekuje váš operační systém a stáhne předkompilovaný binární soubor, který bude fungovat na architektuře .

## Nový název

Proces instalace Electronu byl často úrazovým blokem pro nové vývojáře. Mnoho statečných lidí se snažilo začít vyvíjet Electron podle aplikace spuštěním `npm nainstalovat elektroron` místo `npm instaluje elektron-prebuilt`, pouze pro zjištění (často po mnoha zmatcích), že to nebyl `elektroron` , který hledal.

Důvodem bylo to, že na npm existoval projekt `elektroron` , vytvořený před tím, než GitHubův projekt Electron existoval. Pro usnadnění a intuitivnosti vývoje Electronu pro nové vývojáře, oslovili jsme vlastníka existujícího npm balíčku `electron` , abychom se zeptali, zda bychom byli ochotni použít jméno. Naštěstí byl fanouškem našeho projektu a souhlasil s tím, že nám pomůže přetvořit název .

## Předpostavené životy na

Od verze 1.3.1 jsme začali publikovat [`electron`](https://www.npmjs.com/package/electron) a `elektron-prebuilt` balíky do npm v tandem. Oba balíčky jsou totožné. Rozhodli jsme se na chvíli pokračovat ve zveřejňování balíčku pod oběma jmény, aby se neobtěžovalo tisíce vývojářů, kteří v současné době používají `elektron-prebuilt` ve svých projektech. We recommend updating your `package.json` files to use the  new `electron` dependency, but we will continue releasing new versions of `electron-prebuilt` until the end of 2016.

[elektron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) repozitář zůstane kanonickým domovem balíčku `elektronů` npm.

## Velký dík

Dlužíme zvláštní poděkování [@mafintosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), a mnoho dalších [přispěvatelů](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) na vytvoření a udržování `elektron-prebuilt`, a pro jejich neúnavnou službu pro JavaScript, Node. , a Electron komunity.

A díky [@logicalparadox](https://github.com/logicalparadox) za to, že nám dovolil převzít balíček `elektronron` na npm.

## Aktualizace vašich projektů

Spolupracovali jsme s komunitou na aktualizaci populárních balíků, které jsou touto změnou ovlivněny, . Balíčky jako [elektronický balík](https://github.com/electron-userland/electron-packager), [elektron-rebuild](https://github.com/electron/electron-rebuild), a [elektronický stavitel](https://github.com/electron-userland/electron-builder) již byl aktualizován, aby fungoval s novým názvem, zatímco nadále podporuje staré jméno.

If you encounter any problems installing this new package, please let us know by opening an issue on the [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt/issues) repository.

Pro jakékoli další problémy s Electronem, použijte repozitář [elektron/elektroron](https://github.com/electron/electron/issues) .

