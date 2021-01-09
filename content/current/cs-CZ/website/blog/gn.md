---
title: "Použití GN k sestavení Electronu"
author: nornagon
date: '2018-09-05'
---

Electron nyní používá GN k postavení. Zde je diskuse o proč.

---

# GYP a GN

Když byl Electron poprvé vydán v roce 2013, byla sestavená konfigurace Chromia napsána s [GYP](https://gyp.gsrc.io/), krátkou pro "Generovat své projekty".

V roce 2014 Projekt Chromium zavedl nový konfigurační nástroj s názvem [GN](https://gn.googlesource.com/gn/) (zkrácený pro "Generate [Ninja](https://ninja-build.org/)) byly sestavené soubory Chromia přesunuty na GN a GYP byly odstraněny ze zdrojového kódu.

Electron historicky udržoval oddělení hlavního [Electronu kódu](https://github.com/electron/electron) a [libchromium obsahu](https://github.com/electron/libchromiumcontent), část Electronu, která obalí podmodul "obsah" Chromia. Electron pokračoval v používání GYP, zatímco obsah libchromu - jako podmnožina chromu - se přepnul na GN, když to dělal.

Stejně jako rychlostní zařízení, která nejsou zcela rozbitá, existovalo tření mezi použitím dvou stavebních systémů. Udržování kompatibility bylo chybové, z kompilátoru vlajek a `#defines` , které bylo třeba pečlivě synchronizovat mezi Chromium, Node, V8 a Electron.

Abychom to vyřešili, tým Electronu pracuje na přesunutí všeho na GN. Dnes [commit](https://github.com/electron/electron/pull/14097) odstranit poslední GYP kód z Electronu byl přistán v mistrovství.

# Co to pro vás znamená

Pokud přispíváte k Electronu samému, proces kontroly a budování Electronu od `master` nebo 4. .0 je velmi odlišná než v 3.0.0 a dříve. Podrobnosti naleznete v [pokynech pro sestavení GN](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md).

Pokud vyvíjíte aplikaci s Electronem, je zde několik drobných změn, které si můžete všimnout v novém Electronu 4. .0 nocleh; ale s větší pravděpodobností bude změna ve stavebním systému pro vás zcela transparentní.

# Co to znamená pro Electron

GN je [rychlejší](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) než GYP a jeho soubory jsou čitelnější a udržovatelnější. Navíc doufáme, že používání jediného konfiguračního systému sníží práci potřebnou k modernizaci Electronu na nové verze Chromium.

 * Na Electronu 4.0.0 už to výrazně pomohlo vývoji, protože Chromium 67 odstranilo podporu MSVC a přešlo na stavbu s Clang na Windows. Díky sestavení GN zdědíme všechny příkazy kompilátoru přímo z Chromiu, takže jsme měli stavět Clang na Windows zdarma!

 * Pro Electron je také snazší používat [BoringSSL](https://boringssl.googlesource.com/boringssl/) ve sjednocené sestavě napříč Electronem, Chromium a uzel -- něco, co bylo [problematické před](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
