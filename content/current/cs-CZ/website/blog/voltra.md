---
title: 'Projekt týdne: Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '2017-03-07'
---

Tento týden jsme se setkali s [Aprile Elcich](https://twitter.com/aprileelcich) a [Paolo Fragomeni](https://twitter.com/0x00A) pro diskusi o Voltrě, Electron-powered hudebním přehrávači.

---

## Co je to Voltra?

[Voltra](https://voltra.co/) je hudební přehrávač pro lidi, kteří chtějí vlastnit svou hudbu. Je to také obchod, kde můžete objevit a koupit si novou hudbu na základě toho, co již vlastníte. Je to bez reklam, na různých platformách pro stolní počítače a mobilní. Také vám to nešpehuje.

[![voltra-artistview](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## Pro koho je Voltra?

Každý, kdo poslouchá hudbu.

## Co vás motivovalo k vytvoření Voltra?

Rádio má vždy velký podíl posluchačů. Je to odklon od vzdušných vln a na internet. Nyní si můžete pronajmout hudbu na požádání — je to rozhlasové oživení! Z tohoto důvodu se objevilo mnoho nových produktů a služeb, ale streamování rádia stále ponechává někoho jiného, kdo ovládá vaši hudbu a jak ji zažíváte.

Chtěli jsme produkt, který byl zcela zaměřen na hudbu, kterou vlastníte. Něco usnadnilo objevování a koupení nové hudby přímo od umělců nebo štítků.

## Je zde bezplatná verze?

Přehrávač pro stolní počítače je zcela zdarma. [Prodej hudby je také zdarma!](https://voltra.co/artists) Nejsme podporováni reklamou.

Protože je aplikace zdarma, můžeme ji později otevřít. Právě teď nemáme šířku pásma, kterou bychom mohli zvládnout. Máme také velmi specifické nápady na funkce a směr, kterým se chceme ubírat. Máme aktivní beta komunitu a bereme si naši zpětnou vazbu k srdci.

## Jak vyděláte peníze?

Máme prémiové funkce!

Naše [Voltra Audio Archive](https://voltra.co/premium/) je záložní služba cloudu určená speciálně pro hudbu. Nekomprimujeme ani nesdílíme datové bloky. Vaše sbírka hudby je pro vás fyzicky zálohována.

Pro umělce a štítky nabízí naše [Pro členství](https://voltra.co/artists/pro) nástroje, které jim pomohou oslovit relevantnější publikum, jako jsou analytiky a webové stránky profesionálních umělců.

## Co dělá Voltra odlišným?

Konstrukce a použitelnost jsou pro nás neuvěřitelně důležité. Chceme dát posluchačům nerozptýlený zážitek z naslouchání! Tam jsou zajímaví hudební přehrávači a skladují se. Mnohé z nich jsou však vyspělejší a těžší používat, než si jejich tvůrci uvědomují. Chceme Voltra zpřístupnit co největšímu počtu lidí.

Také si nebereme kousek od umělce ani od štítku. To je pro nás klíčový diferenciátor. Je to opravdu důležité, protože snižuje překážku pro umělce, aby dostali svou hudbu na trh.

## Jaké jsou vaše návrhy & technická rozhodnutí?

Při navrhování Voltry, zvažovali jsme konvence uživatelských rozhraní z domácích aplikací a webu, také jsme přemýšleli hodně o tom, co bychom mohli odstranit. Máme aktivní soukromou beta skupinu, která nám v posledních několika měsících poskytla kritickou zpětnou vazbu.

Zjistili jsme, že obal alba a fotografie jsou pro lidi opravdu důležité. Mnoho hráčů je jen seznamy souborů. Jednou z skvělých věcí o vlastnictví fyzických alb je obal alba, a chtěli jsme na to klást důraz v aplikaci Voltra.

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

Také jsme se ujistili, že nebudeme nepořádat s lidskými soubory. Používáme sledování souborů, abyste mohli vkládat soubory kdekoliv chcete, a my je nepřejmenujeme ani nepřesouváme za vás. Máme vloženou databázi pro sledování stavu sledovaných adresářů, abychom mohli sledovat co je nové. i když proces není spuštěn.

## Jaké jsou některé výzvy, kterým jste čelili při budování Voltra?

Strávíme spoustu času zaměřeného na výkon. Začali jsme frameworky, ale přesunuli se do vanilla Javascript. Podle našich zkušeností generalizované abstrakce převažují nad pokuty za výkon a ceremoniálu, které zavádějí.

V této chvíli zacházíme s velmi velkými sbírkami. Velké sbírky znamenají možná desetitisíce obrázků! Nemám nic. Modul souborového systému přímo dostupný v procesu vykreslování, takže je opravdu snadné načíst a uvolnit mnoho obrázků super rychle na základě DOM událostí.

Obecně *[setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)* a *[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)* byly super důležité nástroje pro provádění spousty zpracování při zachování reakce uživatelského rozhraní. Přesněji řečeno, distribuce úloh vázaných na CPU do oddělených procesů skutečně pomáhá udržovat uživatelské rozhraní citlivé. Například jsme přesunuli skutečný zvukový kontext do samostatného procesu, komunikace s ním přes [IPC](https://electronjs.org/docs/glossary/#ipc) , aby se zabránilo možným přerušení z rušného uživatelského rozhraní.

## Proč jste se rozhodli stavět Voltra na Electronu?

Písnička prohlížeče je příliš omezená pro naši aplikaci. Ale vyvíjíme také webový přehrávač. Je tedy obrovským vítězstvím, že můžeme mezi oběma implementacemi sdílet téměř 100% kodexu.

Ve skutečnosti jsme začali budováním původní aplikace Swift. Hlavním problémem, který jsme zjistili, bylo, že jsme objevili mnoho věcí. Web má největší celosvětový open source ekosystém. Takže jsme velmi rychle přešli na Electron.

A co je nejdůležitější, s Electron se vyvíjejí jednou a mělo by to jen WorkTM na všech hlavních platformách. Není zaručena, ale náklady na domácí kódování pro každou platformu rozhodně převyšují veškeré další náklady, které elektronický systém představuje.

## Co jsou vaše oblíbené věci o Electronu?

**GTD!**: Mít Node.js’ síťový zásobník a prezentační vrstva Chromia společně je receptem pro získání práce.

**kompetence**: Je to jen webový stack, takže doslova celý náš tým se podílí na tvorbě produktu.

**Komunita**: Je zde vysoce organizovaná komunita, která ví, jak opravdu dobře komunikovat! S takovou podporou se cítíme velmi skvěle.

## V jakých oblastech by mohl být Electron vylepšen?

Chtěli bychom, aby Electron podpořil jeden balík. Balíček je pro Electron stejně důležitý jako pro Node. Na uživatelském území existuje více balíčků, z nichž každý má zajímavé vlastnosti, ale každý s chybami. Konsenzus ze strany společenství by pomohl řídit energii, kterou vynakládají přispěvatelé.

## Co bude dál?

V současné době vyvíjíme mobilní aplikaci a pracujeme s umělci a štítky, abychom přidali svou hudbu do obchodu Voltra. Hej! Pokud jste umělce nebo štítek, [zaregistrujte se nyní](https://admin.voltra.co/signup)! Plánujeme otevřít obchod, až dosáhneme svého cíle 10 milionů stop.

