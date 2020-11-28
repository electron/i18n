---
title: 'Electron Internals: Message Loop Integration'
author: zcbenz
date: '2016-07-28'
---

To je první příspěvek série, která vysvětluje interakce Electronu. Tento příspěvek představuje, jak je Událost Nodeho integrována s Chromiem v Electronu.

---

Došlo k mnoha pokusům o použití uzlu pro programování GUI, jako [node-gui](https://github.com/zcbenz/node-gui) u vazeb GTK+ a [node-qt](https://github.com/arturadib/node-qt) u vazeb QT. Ale žádný z nich nepracuje ve výrobě, protože soubory nástrojů GUI mají své vlastní zprávy cykly, zatímco uzel používá libuv pro vlastní smyčku událostí, a hlavní vlákno může současně spustit pouze jednu smyčku. Běžným trikem spouštět smyčku GUI zpráv v Node je napumpovat smyčku zprávy časovačem s velmi malým intervalem, což zpomaluje odezvu rozhraní GUI a využívá spoustu zdrojů CPU.

Během vývoje Electronu jsme se setkali se stejným problémem, ačkoliv opačným způsobem: museli jsme integrovat smyčku události Node do zprávy Chromia smyčky.

## Hlavní proces a proces zpracování

Než se ponoříme do podrobností o smyčce zprávy, nejprve vysvětlím multiprocesovou architekturu Chromium.

V Electronu existují dva typy procesů: hlavní proces a proces zpracování údajů (toto je ve skutečnosti mimořádně zjednodušené, pro kompletní zobrazení navštivte [Multi-process Architecture](http://dev.chromium.org/developers/design-documents/multi-process-architecture)). Hlavní proces je zodpovědný za vytváření uživatelského rozhraní, jako je vytváření oken, zatímco proces vykreslování řeší pouze běžící a vykreslující webové stránky.

Electron umožňuje ovládat jak hlavní proces, tak proces rendereru , což znamená, že musíme do obou procesů integrovat uzel.

## Nahrazení smyčky Chromia libuv

Můj první pokus se snažil znovu implementovat Chromium zprávu s libuvem.

Pro proces rendereru to bylo snadné, protože jeho smyčka zpráv poslouchala pouze deskriptory souborů a časovače, a potřebuji pouze pro implementaci rozhraní s libuv.

Pro hlavní proces to však bylo podstatně obtížnější. Každá platforma má svůj vlastní typ zpráv GUI. macOS Chromium používá `NSRunLoop`, zatímco Linux používá glib. Pokusil jsem se spoustu hacků pro extrahování základních deskriptorů souborů z nativního GUI zpráv, a pak je krmit do libuv pro iteraci, ale stále jsem se setkal s případy hrany, které nefungují.

Nakonec jsem přidal časovač do ankety zprávy GUI v malém intervalu. V důsledku proces trval na konstantním využití procesoru a některé operace měly dlouhá zpoždění.

## Událostová smyčka uzlu v samostatném vlákně

Po zralosti libuv pak bylo možné zaujmout jiný přístup.

Koncept backend fd byl vložen do libuv, což je deskriptor souboru (nebo ruka), který libuv ankety pro smyčku událostí. So by polling the backend fd it is possible to get notified when there is a new event in libuv.

Takže v Electronu jsem vytvořil samostatné vlákno pro anketu backend fd, a vzhledem k tomu, že jsem použil systémové volání do hlasování namísto libuv API, bylo to vlákno bezpečné. A kdykoli by došlo k nové události ve smyčce událostí libuvu, byla by do smyčky zpráv společnosti Chromium odeslána zpráva , a události libuv by pak byly zpracovány v hlavním vlákně.

Tímto způsobem jsem se vyhnul patchování Chromia a Node, a stejný kód byl použit v hlavních i asanačních procesech.

## Kód

Zavedení smyčky zprávy naleznete v `node_bindings` souborech pod [`electron/atom/common/`](https://github.com/electron/electron/tree/master/atom/common). Může být snadno znovu použita pro projekty, které chtějí integrovat Node.

