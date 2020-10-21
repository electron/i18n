---
title: Zrušení podpory pro 32bitový Linux
author: felixrieseberg
date: '2019-03-04'
---

Tým Electronu zruší podporu pro 32bitový Linux (ia32 / i386) počínaje Electron v4.0. Poslední verze Electronu, která podporuje 32bitovou instalaci Linuxu, je Electron v3.1, která bude dostávat podporu až do vydání Electronu v6. Podpora pro 64 bitový Linux a `armv7l` bude pokračovat beze změny.

---

## Co přesně již Electron nepodporuje?

Možná jste viděli popis "64-bit" a "32bit" jako nálepky na vašem počítači nebo jako možnosti stahování softwaru. Termín se používá k popisu konkrétní počítačové architektury. Většina počítačů vyrobených v devadesátých letech a počátkem tisíciletí byla vyrobena s procesory, které byly založeny na 32bitové architektuře. zatímco většina počítačů později byla založena na novější a výkonnější 64bitové architektuře. Nintendo 64 (získat? a PlayStation 2 byly první široce dostupné spotřební zařízení s novou architekturou, počítače prodávané po roce 2010 obsahovaly téměř výhradně 64bitové procesory. V důsledku toho se podpora snižuje: Google přestal v březnu 2016 vydávat Chrome pro 32-bitový Linux, Canonical přestal poskytovat 32bitové desktopové obrázky v roce 2017 a upustil podporu 32bitové verze spolu s Ubuntu 18.10. Arch Linux, elementární OS a další prominentní Linuxové distribuce již přestaly podporovat architekturu stárnutí.

Electron doposud poskytoval a podporoval stavby, které běží na starší 32bitové architektuře. Od vydání v4.0 již nebude tým Electron schopen poskytovat binární soubory nebo podporu pro 32bitový Linux.

Electron byl vždy živý open source projekt a my nadále podporujeme a povzbuzujeme vývojáře, kteří mají zájem o budování Electronu pro exotické architektury.

## Co to znamená pro vývojáře?

Pokud v současné době neposkytujete 32bitové distribuce vaší aplikace pro Linux, není vyžadována žádná akce.

Projekty, které dodávají 32bitové Linux Electron aplikace, se budou muset rozhodnout, jak postupovat. 32-bit Linux bude podporován na Electron 3 [do](https://electronjs.org/docs/tutorial/support#supported-versions) vydání Electron 6, což dává čas na přijímání rozhodnutí a plánů.

## Co to pro uživatele znamená?

Pokud jste uživatel Linuxu a nejste si jisti, zda používáte 64bitový systém, či nikoli, pravděpodobně běžíte na 64bitové architektuře. Abyste se ujistili, že můžete spustit příkazy `lscpu` nebo `uname -m` v terminálu. Buď vytiskne vaši aktuální architekturu.

Pokud používáte Linux na 32bitovém procesoru, pravděpodobně jste se setkali s potížemi při hledání nedávno spuštěného softwaru pro váš operační systém. Tým Electron se připojuje k dalším významným členům v linuxové komunitě tím, že doporučuje, abyste aktualizovali na 64bitovou architekturu.
