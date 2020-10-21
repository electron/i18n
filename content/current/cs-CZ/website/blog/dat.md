---
title: 'Projekt týdne: Dat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

Doporučený projekt z tohoto týdne je [Dat](https://datproject.org/)a [financovaný grantem](https://changelog.com/rfc/6), open source, decentralizovaný nástroj pro distribuci datových sad. Dat je postaven a udržován [geodistributovaným týmem](https://datproject.org/team), z nichž mnozí pomohli napsat tento příspěvek.

---

[![Snímek hlavního zobrazení datového stolu, zobrazující několik řádků sdílených
dat](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## Zaprvé co je datum?

Chtěli jsme do sdílení dat vložit ty nejlepší části kolegů a distribuovaných systémů. Začali jsme sdílením vědeckých dat a pak jsme se začali rozkládat do výzkumných institucí, vlády, veřejných služeb a také do týmů s otevřeným zdrojovým kódem.

Dalším způsobem, jak o tom přemýšlet, je synchronizace a nahrání aplikace jako Dropbox nebo BitTorrent Sync, kromě Dat je [open source](https://github.com/datproject). Naším cílem je být výkonným otevřeným zdrojovým kódem, neziskovým programem na sdílení dat pro velká, malá, střední, malá a velká dávková data.

Chcete-li použít nástroj `` CLI, stačí zadat:

```sh
Sdílení cesty/my/složky
```

A data vytvoří odkaz, který můžete použít k odeslání této složky někomu jinému – žádné centrální servery ani třetí strany nemají přístup k vašim datům. Na rozdíl od BitTorrentu není také možné, aby snift, kdo sdílel, co ([Podívejte se na koncept Dat Paper pro více detailů](https://github.com/datproject/docs/blob/master/papers/dat-paper.md)).

## Teď už víme, co je ďábel. Jak se Dat Desktop hodí do?

[Dat Desktop](https://github.com/datproject/dat-desktop) je způsob, jak zpřístupnit Dat lidem, kteří nemohou nebo nechtějí použít příkazový řádek. Můžete hostit více dat na vašem počítači a poskytovat data přes vaši síť.

## Můžete sdílet chladné případy?

### DataRefuge + Projekt Svalbard

Pracujeme na věci kodenamed [Project Svalbard](https://github.com/datproject/svalbard) , který souvisí s [DataRefuge](http://www.ppehlab.org/datarefuge), skupinu, která se snaží podpořit vládní klimatická data ohrožená zmizením. Svalbard je pojmenován podle Svalbard Global Seed Vault v Arktidě, která má velkou podzemní záložní knihovnu rostliny DNA. Naše verze je velkou verzí kontrolované sbírky veřejných vědeckých datových souborů. Jakmile známe a dokážeme důvěřovat metadatům, můžeme vybudovat další skvělé projekty, jako je [distribuovaná dobrovolná síť pro ukládání dat](https://github.com/datproject/datasilo/).

### Koalice civilních dat v Kalifornii

[CACivicData](http://www.californiacivicdata.org/) je open-source archiv sloužící k dennímu stahování z CAL-ACCESS, kalifornská databáze sledování peněz v politice. Udělají [denní vydání](http://calaccess.californiacivicdata.org/downloads/0), což znamená hostit spoustu duplicitních dat napříč zip soubory. Pracujeme na hostování jejich dat jako Dat repositáře, který sníží množství nepříjemností a šířky pásma, které je potřeba k odkazování na konkrétní verzi nebo k aktualizaci na novější verzi.

## Aktualizace Electronu

Tohle ještě není konkrétní, ale myslíme si, že případ použití zábavy by byl vložen do Dat repozitáře kompilované Electron, poté pomocí Dat klienta v Electronu k natažení nejnovějších deltas vytvořeného binárního souboru, pro úsporu času stahování, ale také pro snížení nákladů na připojení serveru.

## Kdo by měl používat Dat Desktop?

Každý, kdo chce sdílet a aktualizovat data přes p2p síť. Vědci o údajích, otevření hackeri, výzkumní pracovníci, vývojáři. Jsme super vnímaví na zpětnou vazbu, pokud má někdo chladný případ, o kterém jsme ještě nepřemýšleli. Můžete upustit od našeho [Gitter Chat](https://gitter.im/datproject/discussions) a zeptat se nás něco!

## Co přijde další v počítači Dat a Dat Desktop?

Uživatelské účty a publikování metadat. Pracujeme na webové aplikaci Dat Register, která má být nasazena na [datovém projektu. rg](https://datproject.org/) , což bude v podstatě 'NPM pro datové soubory', kromě toho, že budeme mít pouze adresář metadat a data mohou žít kdekoli online (na rozdíl od NPM nebo GitHub, kde jsou všechna data centrálně hostována, protože zdrojový kód je dostatečně malý, můžete jej vložit do jednoho systému). Vzhledem k tomu, že mnoho souborů dat je obrovských, potřebujeme federální registr (podobně jako BitTorrent trackers). Chceme lidem usnadnit vyhledání nebo publikování datových souborů s registrem z Dat Desktop, zajistit, aby proces sdílení dat byl beztrestný.

Další funkcí jsou složky pro více spisovatelů/spolupracovníků. Máme velké plány na spolupráci s pracovními toky, možná s větvemi, podobnými zábranám, s výjimkou koncipovaných kolem spolupráce v rámci datového souboru. Ale stále pracujeme na celkové stabilitě a normalizaci našich protokolů!

## Proč jste se rozhodli postavit Dat Desktop na Electronu?

Dat je postaven pomocí Node.js, takže to byla přirozená hodina pro naši integraci. Kromě toho používají naši uživatelé od vědců různé stroje , Výzkumní pracovníci a vládní úředníci mohou být nuceni používat určité nastavení pro své instituce - to znamená, že musíme být schopni se zaměřit na Windows a Linux i Mac. Dat Desktop nám to dává docela snadno.

## Jaké jsou některé výzvy, kterým jste čelili při stavění Dat a Dat Desktop?

Zjistěte, co lidé chtějí. Začali jsme tabulkovými datovými soubory, ale uvědomili jsme si, že řešení je poněkud složitý problém a že většina lidí nepoužívá databáze. Takže v polovině projektu jsme přepracovali vše od začátku, abychom použili souborový systém a neohlédli se zpět.

Také jsme narazili na některé obecné problémy s infrastrukturou Electronu, včetně:

- Telemetrie - jak získat anonymní statistiky používání
- Aktualizace - Je to druh kouzelného a kouzelného nastavení automatických aktualizací
- Vydání - XCode signalizace, stavební vydání na cestování, dělání beta builds, vše byly výzvy.

Také používáme Browserify a některé skvělé transformace Browserify na 'front end' kódu v Dat Desktop (což je podivné, protože stále svazujeme, i když máme nativní `vyžadováno` -- ale je to proto, že chceme Transformace). Pro lepší správu našich CSS jsme přepnuli ze Sass na použití [sheetify](https://github.com/stackcss/sheetify). Velmi nám to pomohlo modularizovat naše CSS a usnadnilo nám přesun našeho uživatelského rozhraní na architekturu orientovanou na komponenty se sdílenými závislostmi. Například [barvy dat](https://github.com/Kriesse/dat-colors) obsahují všechny naše barvy a jsou sdíleny mezi všemi našimi projekty.

Vždy jsme byli velkým fanouškem standardů a minimálních abstrakcí. Celé naše rozhraní je postaveno pomocí běžných DOM uzlů s několika pomocnými knihovnami. Začali jsme přesunout některé z těchto komponent do [základních prvků](https://base.choo.io), knihovny komponentů s nízkou úrovní opakovaného použití. Stejně jako u většiny našich technologií ji neustále opakujeme, dokud ji neuspějeme, ale jako tým máme pocit, že jdeme správným směrem.

## V jakých oblastech by měl být Electron vylepšen?

Myslíme si, že největší bolest je původní moduly. Musíš přebudovat moduly pro Electron s npm přidává složitost pracovního postupu. Náš tým vyvinul modul s názvem [`prebuild`](http://npmjs.org/prebuild) , který zpracovává předpřipravené binární soubory, které fungovalo dobře pro Node, ale Electron pracovní toky stále vyžadovaly vlastní krok po instalaci, obvykle `npm běh rebuild`. Bylo to nepříjemné. Pro řešení tohoto problému jsme nedávno přepnuli na strategii, kde spojujeme všechny kompilované binární verze všech platforem do npm tarbalu. To znamená, že tarbaly jsou větší (i když to lze optimalizovat pomocí `. o` soubory - sdílené knihovny), tento přístup se vyhýbá nutnosti spustit po instalaci skriptů a také zcela zabránit spuštění `npm rebuild`. To znamená, že `npm install` udělá správnou věc pro Electron poprvé.

## Co jsou vaše oblíbené věci o Electronu?

API se zdá docela dobře promyšlená, je poměrně stabilní, a to dělá docela dobrou práci při udržování aktuálního stavu s předcházejícími vydáními uzlů, ani mnoho jiného můžeme požádat!

## Jakékoliv tipy Electronu, které by mohly být užitečné pro ostatní vývojáře?

Pokud používáte nativní moduly, dejte [prebuild](https://www.npmjs.com/package/prebuild) výstřel!

## Jaký je nejlepší způsob, jak sledovat vývoj Dat?

Sledujte [@dat_project](https://twitter.com/dat_project) na Twitteru, nebo přihlaste se k odběru našich [e-mailových novinek](https://tinyletter.com/datdata).

