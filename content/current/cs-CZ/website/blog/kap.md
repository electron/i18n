---
title: 'Projekt týdne: Kap'
author:
  - skllcrn
  - sindresorhus
  - zeke
date: '2017-01-31'
---

Electron komunita rychle roste a lidé vytvářejí výkonné nové aplikace a nástroje ohromujícím tempem. Oslavit tuto kreativní dynamiku a informovat komunitu o některých těchto nových projektech, Rozhodli jsme se zahájit týdenní blog sérii s pozoruhodnými projekty souvisejícími s Electrony.

---

Tento příspěvek je první v řadě, a funkce [Kap](https://getkap.co/), open source aplikace pro nahrávání obrazovky vytvořená [Wulkano](https://wulkano.com/), geodistributovaný tým freelance designérů a vývojářů.

[![Kap Screencast](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## Co je to Kap?

[Kap je open-source záznam](https://getkap.co) vytvořený primárně pro návrháře a vývojáře, aby snadno zachytil svou práci. Lidé ji používají ke sdílení animovaných prototypů, chyb dokumentů, k vytváření pošetilých GIFů a všeho mezi nimi.

Viděli jsme lidi všech věkových a pozadí, kteří je využívají ve vzdělávacích nastaveních, obrazovkách, výukových programech... seznam pokračuje. Dokonce k vytvoření výrobních aktiv! Jsme zcela vyhodeni z toho, jak dobře jsme obdrželi náš malý vedlejší projekt.

## Proč jste to postavili?

To je velmi dobrá otázka, není to jako nedostatek obrazovkových nahrávačů! Cítili jsme, že alternativy jsou buď příliš složité, příliš drahé, nebo příliš omezené. Nic se necítil *právě správně* pro naše každodenní potřeby. Také si myslíme, že je skvělé, když nástroje, které používáme k vykonávání naší práce, jsou open-source, že tak může každý pomoci utvářet je. [Budování Kap skončilo stejně jako to, co jsme nedělali](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38). Je to vše v detailech, nahromadění malých vylepšení, které se stalo obrysem nástroje, který jsme chtěli použít.

Avšak a možná nejdůležitější je, Kap se pro nás stal místem, kde necháme své obavy u dveří a bavíme se tím, že budujeme něco pro nás a pro nás i pro lidi, jako jsme my. Je tak důležité vytvořit prostředí, ve kterém se dostanete do odvětrávání, vyzkoušet nové myšlenky a vychutnat si své řemeslo. Žádné požadavky, žádný tlak, žádná očekávání. Měl by designéři a vývojáři doprovázet projekt? Proč. Ano, měli.

## Proč jste se rozhodli stavět Kap na Electronu?

Existovala řada důvodů:

* Webová technologie
* Většina týmu jsou weboví vývojáři
* Investujeme do JavaScriptu
* Otevírá dveře pro to, aby přispělo více lidí
* Samotný Electron je open-source
* Energie a snadno udržitelná modulárnost `node_modules`
* Možnosti křížové platformy

Myslíme si, že budoucnost aplikací je v prohlížeči, ale ještě tam nejsou. Electron je důležitým krokem na cestě k této budoucnosti. Nejenže to dělá aplikace přístupnější samy, ale také kód, se kterým jsou sestaveny. Zajímavá myšlenka představí budoucnost, kde je OS prohlížeč, a panely jsou v podstatě Electron aplikace.

Kromě toho jsme především webovými vývojáři, jsme velkými fanoušci izoforfologické povahy JavaScriptu můžete spustit JS na klientovi, serveru a nyní na počítači. S webovou technologií (HTML, CSS a JS), je mnoho věcí mnohem jednodušší než nativní: rychlejší prototypizace, méně kód, flexbox > auto-layout (macOS/iOS).

## Jaké jsou některé výzvy, kterým jste čelili při budování Kap?

Pomocí zdrojů, které Electron má k dispozici pro nahrávání obrazovky byla největší výzva. Prostě nebyly dostatečně výkonné, aby splnily naše požadavky, a v našich očích by projekt selhal. I když na vlastní vině Electronu není žádná mezera mezi vývojem a stavbou desktopových aplikací pomocí webové technologie.

Strávili jsme spoustu času pokusem pracovat kolem špatného výkonu API `getUserMedia` , což je problém pocházející z Chromium. Jedním z našich hlavních cílů, když jsme si vytvořili Kap, bylo vytvořit celou aplikaci pomocí webové technologie. Po vyzkoušení všeho jsme mohli začít pracovat (minimální požadavek je 30 FPS na obrazovce Retina), Nakonec jsme museli najít jiné řešení.

## Vidím nějaký kód Swift v repozitáři. O čem to jde?

Protože jsme byli nuceni hledat alternativy k `getUserMedia`, začali jsme experimentovat s `ffmpeg`. Kromě toho, že je jedním z nejlepších nástrojů pro konverzi zvuku a videa, má funkčnost nahrávání obrazovky téměř ve všech OS, a my jsme byli schopni zaznamenat krizové video splňující naše minimální požadavky 30 FPS na obrazovce Retina. Problém? Výkonnost byla ":weary:", využití procesoru se odehrávalo po drátu. Takže jsme se vrátili k rýsovacímu prknu, diskutovali jsme o našich možnostech a uvědomili si, že musíme učinit kompromis. To vedlo k [Aperture](https://github.com/wulkano/aperture), naší vlastní knihovně pro nahrávání obrazovky pro macOS napsané ve Swiftu.

## V jakých oblastech by měl být Electron vylepšen?

Všichni víme, že Electron aplikace mohou mít něco pro používání RAM, ale opět to je opravdu věc chromu. Je to součást toho, jak to funguje, a opravdu to závisí na tom, co běžíte, Například Kap a Hyper obvykle používají méně než 100 MB paměti.

Jednou z největších oblastí zlepšení, které vidíme, je užitečnost, zejména to, jak Electron distribuuje Chromium. Jednou z myšlenek by bylo mít sdílené Electron jádro a instalační aplikace by měly zkontrolovat, zda je již v systému přítomna.

Vytváření různých platforem Electron aplikací může být lepším zážitkem. Právě teď existuje příliš mnoho nesrovnalostí, API specifických pro platformu a chybějících funkcí mezi platformami, což způsobuje, že vaše kódování je napácháno prohlášeními if-else . Například vibrancy je podporována pouze na macOS, auto-updater funguje jinak na macOS a Windows, a není podporována ani na Linuxu. Transparentnost je kliknutím nebo chybou na Linuxu, obvykle chybí.

Rovněž by mělo být snazší nazývat API pro původní systémy. Electron přichází s velmi dobrou sadou API, ale někdy potřebujete funkci, kterou neposkytuje. Vytvoření doplňku nativní Node.js je volba, ale je to bolestivé pracovat. V ideálním případě by Electron loď s dobrým [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) API, jako je [`rychlý hovor`](https://github.com/cmake-js/fastcall). To by nám umožnilo napsat část Swift do JavaScriptu.

## Co jsou vaše oblíbené věci o Electronu?

Naše oblíbená věc je snadná skutečnost, že každý, kdo má znalosti o vytváření pro web, může vytvářet a přispívat k víceplatformním nativním zážitkům. Nemluvě o snadnosti a radosti z jejího rozvíjení, vynikající dokumentaci a prosperujícím ekosystému.

Z pohledu front-end sestavení Kap necítil nic jiného než vytvořit jednoduchou webovou stránku používající prohlížeč API. Electron dělá opravdu skvělou práci a dělá vývoj aplikací podobný (v podstatě identickému) vývoji webu. Jednoduše tedy neexistovala potřeba rámců ani podobně, které by nám pomohly čistit a modulární JS a CSS.

Jsme také velkými fanoušci týmu, kteří jej budují, jejich obětavost a podporu a aktivní a přátelské společenství, které udržují. Hráči pro vás všechny!

## Co bude příští v Kapu?

Dalším krokem pro nás je zkontrolovat aplikaci v přípravě na naše 2.0. milestone včetně přepisu React kromě podpory pluginů, což vývojářům umožňuje rozšířit funkčnost Kap! Vyzýváme všechny, aby sledovali projekt a přispěli do našeho [GitHub repozitáře](https://github.com/wulkano/kap). Posloucháme a chceme od vás slyšet co nejvíce, [dejte nám vědět, jak můžeme udělat Kap nejlepší možný nástroj, který může být pro tebe](https://wulkano.typeform.com/to/BIvJKz)!

## Co je Wulkano?

[Wulkano](https://wulkano.com) je designový studio a digitální kolektiv, tým vzdálených techniků, kteří rádi spolupracují na klientských gigantech i na našich vlastních projektech. Jsme distribuovaní, ale napjatá skupina lidí z různých míst a prostředí, sdílíme znalosti, nápady, zkušenosti, ale co je nejdůležitější, pošetile GIFy a vzpomínky, v naší virtuální kanceláři (která je založena na Electronu Slack!).

## Jakékoliv tipy Electronu, které by mohly být užitečné pro ostatní vývojáře?

Využijte a zapojte se do fantastické [komunity](https://discuss.atom.io/c/electron), podívejte se na [Awesome Electron](https://github.com/sindresorhus/awesome-electron), Podívejte se na [příklady](https://github.com/electron/electron-api-demos) a využijte skvělé [dokumentace](https://electronjs.org/docs/)!

