---
title: 'Projekt týdne: WebTorrent'
author:
  - feross
  - zeke
date: '2017-03-14'
---

Tento týden jsme dohnali [@feross](https://github.com/feross) a [@dcposch](https://github.com/dcposch) a mluvili jsme o WebTorrent, webovým torrentovým klientem, který spojuje uživatele a vytváří distribuční, decentralizovanou síť prohlížeče.

---

## Co je to WebTorrent?

[WebTorrent](https://webtorrent.io) je první torrent klient, který funguje v prohlížeči. Je napsáno zcela v JavaScriptu a může používat WebRTC pro peer-to-peer transport . Není vyžadován žádný zásuvný modul, rozšíření ani instalace.

Používá otevřené webové standardy, WebTorrent spojuje uživatele webových stránek společně, aby vytvořil distribuovanou decentralizovanou síť prohlížeče pro efektivní přenos souborů.

Ukázka WebTorrentu můžete vidět zde: [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="webtorrent domovská stránka" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## Proč je tato chladná?

Představte si video stránky, jako je YouTube, ale kde návštěvníci pomáhají hostit obsah webu. Čím více lidí používá webovou stránku na WebTorrentu, tím rychleji a pružněji.

Komunikace mezi prohlížeči snižuje středního člověka a umožňuje lidem komunikovat za vlastních podmínek. Už žádný klient/server – jen síť partnerů, to vše je rovné. WebTorrent je prvním krokem na cestě k redecentralizaci webu.

## Kde do obrázku přichází Electron?

Asi před rokem jsme se rozhodli vytvořit [WebTorrent Desktop](https://webtorrent.io/desktop/), verzi WebTorrentu, která běží jako desktopová aplikace.

[![Okno přehrávače WebTorrent](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

Vytvořili jsme WebTorrent Desktop ze tří důvodů:

1. Chtěli jsme čistou, lehkou a bez reklam, open source torrent aplikaci
2. Chtěli jsme torrent aplikace s dobrou podporou streamování
3. Potřebujeme "hybridního klienta", který propojí sítě BitTorrent a WebTorrent

## Pokud již můžeme stáhnout torrenty v mém webovém prohlížeči, proč je to desktopová aplikace?

Za prvé, trochu pozadí na designu WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="logo plochy webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

BitTorrent použil v prvních dnech TCP jako přepravní protokol. Později uTP přinesl slibný lepší výkon a další výhody oproti TCP. Každý hlavní torrent klient nakonec přijal uTP a dnes můžete použít BitTorrent nad kterýmkoliv protokolem. Dalším logickým krokem je WebRTC protokol. Přináší příslib interoperability s webovými prohlížeči – jedna obrovská síť P2P tvořená všemi desktopovými klienty BitTorrent a miliony webových prohlížečů.

„Weboví klienti“ (torrentoví klienti, kteří provozují webový prohlížeč) posilují síť BitTorrent přidáním milionů nových klientů, a rozšíření BitTorrent na desítky nových případů použití. WebTorrent sleduje co nejblíže spec BitTorrentu a usnadňuje stávajícím BitTorrent přidávání podpory pro WebTorrent.

Některé torrent aplikace jako [Vuze](https://www.vuze.com/) již podporují webové klienty, ale nechtěli jsme čekat na zbytek a podporu přidat. **Takže WebTorrent Desktop byl naší cestou, jak urychlit přijetí protokolu WebTorrent.** Vytvořením úžasné torrentové aplikace, kterou lidé opravdu chtějí používat, zvyšujeme počet klientů v síti, kteří mohou sdílet torrenty s webovými klienty (tj. . uživatelé na webových stránkách).

## Jaké jsou zajímavé případy použití torrentů nad rámec toho, co už lidé vědí, že mohou dělat?

Jedním z nejzajímavějších způsobů využití WebTorrentu je peer-aided. Neziskové projekty jako [Wikipedia](https://www.wikipedia.org/) a [internetový archiv](https://archive.org/) by mohly snížit náklady na připojení a hostování tím, že by se návštěvníkům nechaly čip. Oblíbený obsah může být podáván v prohlížeči do prohlížeče, rychle a levně. Naprosto přístupný obsah lze spolehlivě obsluhovat přes HTTP ze serveru původu.

Internetový archiv již aktualizoval své torrent soubory, takže s WebTorrent fungují skvěle. Takže pokud chcete vložit internetový archiv na vaše stránky, můžete to udělat způsobem, který sníží náklady na hostování archivu, umožňují jim vynakládat více peněz na skutečnou archivaci webu!

Existují také vzrušující případy používání podniků, od CDN po doručení aplikace přes P2P.

## Jaké jsou některé z vašich oblíbených projektů, které používají WebTorrent?

![screenshot aplikace gaia](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

Nejúžasnější věc postavená s WebTorrent, ruce dolů, je pravděpodobně [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). Je to úchvatná 3D interaktivní simulace Mléčné cesty. Data se načítají z torrentu, přímo ve vašem prohlížeči. Je inspirativní létat skrze náš hvězdný systém a uvědomit si, jak málo jsme my lidé porovnáni s obrovským množstvím našeho vesmíru.

Přečtěte si, jak to bylo provedeno v [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), blogový příspěvek, kde autor, Charlie Hoey, vysvětluje, jak postavil hvězdnou mapu s WebGL a WebTorrent.

<a href="https://brave.com/">
  <img alt="statkové logo" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

Jsme také velcí fanoušci [Brave](https://brave.com/). Hroba je prohlížeč, který automaticky blokuje reklamy a sledovače, aby byl web rychlejší a bezpečnější. Hrave nedávno přidala podporu torrentu, takže můžete [zobrazit tradiční torrenty bez použití samostatné aplikace](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). Tato funkce je poháněna WebTorrent.

Takže, stejně jako většina prohlížečů může vykreslit PDF soubory, Brave může vykreslit odkazy magnetu a torrent souborů. Jsou jen dalším druhem obsahu, který prohlížeč nativně podporuje.

Jedním ze zakladatelů Brave je ve skutečnosti Brendan Eich, tvůrce JavaScript, jazyk, ve kterém jsme napsali WebTorrent, takže si myslíme, že je docela skvělé, že Brave se rozhodl integrovat WebTorrent.

## Proč jste se rozhodli vytvořit WebTorrent Desktop na Electronu?

<a href="https://webtorrent.io/desktop/">
  <img alt="Okno plochy WebTorrent" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Existuje meme že Electron aplikace jsou "bloated", protože obsahují celý modul obsahu Chrome v každé aplikaci. V některých případech to platí částečně (instalační program Electron je obvykle ~40 MB, kde instalátor pro konkrétní operační systém je obvykle ~20 MB).

Nicméně v případě WebTorrent Desktopu používáme téměř každou funkci Electron a mnoho desítek funkcí Chrome v průběhu běžného provozu. Pokud jsme chtěli tyto funkce implementovat od nuly pro každou platformu, Vytváření naší aplikace by trvalo měsíce nebo roky déle, nebo bychom mohli uvolnit pouze pro jedinou platformu.

Pro získání nápadu použijeme [integraci doku Electronu](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (abychom ukázali průběh stahování), [integrace panelu nabídek](https://electronjs.org/docs/api/menu) (pro běh na pozadí), [registrace zpracovatele protokolu](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (pro otevření magnetických vazeb), [vypínat blokátor ušetříte](https://electronjs.org/docs/api/power-save-blocker/) (aby se zabránilo spánku při přehrávání videa) a [automatický aktualizátor](https://electronjs.org/docs/api/auto-updater). Pokud jde o funkce Chrome, používáme hoj: značku `<video>` (pro přehrávání mnoha různých formátů videa), značka `<track>` (pro podporu uzavřených titulků), Přetáhněte podporu a WebRTC (která není triviální k použití v nativní aplikaci).

Ne zmínit: náš torrent engine je napsán v JavaScriptu a předpokládá existenci spousty Node API, ale zejména `vyžadujte ('net')` a `vyžadováno ('dgram')` pro podporu TCP a UDP socketu.

Electron je v podstatě to, co jsme potřebovali, a měl přesnou sadu funkcí, které jsme potřebovali k odeslání pevné a leštěné aplikace v rekordním čase.

## Co jsou vaše oblíbené věci o Electronu?

Knihovna WebTorrent je ve vývoji jako open source projekt po dobu dvou let. **Vytvořili jsme WebTorrent plochu za čtyři týdny.** Electron je hlavním důvodem, proč jsme byli schopni vybudovat a odeslat naši aplikaci tak rychle.

Stejně jako Node. s zpřístupnil programování serveru generaci front-endových programátorů, kteří používají jQuery, Electron zpřístupňuje vývoj nativní aplikace komukoliv, kdo je obeznámen s webem nebo Nodem. s vývoj. Elektron je extrémně posilující.

## Chcete sdílet webové stránky a kód pro desktopový klient?

Ano, [`webtorrent` npm balíček](https://npmjs.com/package/webtorrent) funguje v Node.js, v prohlížeči a v Electron. Přesně stejný kód může běžet ve všech prostředích - to je krása JavaScript. Je to dnešní univerzální runtime. Java Applets přislíbil aplikace "Write Once, Run anywhere", ale tato vize se nikdy z mnoha důvodů neuskutečnila. Elektron, více než kterákoliv jiná platforma, se ve skutečnosti docela temný blíží tomuto ideálu.

## Jaké jsou některé výzvy, kterým jste čelili při budování WebTorrentu?

V raných verzích aplikace jsme se snažili učinit UI představitelem. Vložili jsme torrent do stejného renderovacího procesu, který vykresluje hlavní okno aplikace, které, jak se dá předvídat, vedlo k pomalosti vždy, když došlo k intenzivní aktivitě CPU z torrentového motoru (jako je ověření kousků torrentu obdržených od klientů).

Opravili jsme to přesunutím torrentu do druhého, neviditelného procesu renderu, který komunikujeme s více než [IPC](https://electronjs.org/docs/api/ipc-main/). Tímto způsobem, pokud tento proces krátce používá spoustu procesoru, bude uživatelské rozhraní nedotčeno. Máslo hladké rolování a animace jsou tak uspokojivé.

Poznámka: museli jsme vložit torrentový engine do procesu renderer místo "hlavního" procesu, protože potřebujeme přístup k WebRTC (který je k dispozici pouze v renderru)

## V jakých oblastech by měl být Electron vylepšen?

Jedna věc, kterou bychom rádi viděli, je lepší dokumentace o tom, jak stavět a dodávat aplikace, které jsou připraveny na výrobu, zejména kolem složitých předmětů, jako je podepisování kódu a automatická aktualizace. Museli jsme se dozvědět o osvědčených postupech tím, že jsme se vrhli do zdrojového kódu a ptali se na Twitteru!

## Je WebTorrent hotov? Pokud ne, co přijde dál?

Myslíme si, že aktuální verze WebTorrent Desktop je vynikající, ale vždy je prostor pro zlepšení. V současné době pracujeme na vylepšení podpory leštění, výkonu, podtitulků a video kodeku.

Pokud máte zájem zapojit se do projektu, podívejte se na [naši GitHub stránku](https://github.com/feross/webtorrent-desktop)!

## Jakékoliv tipy pro vývoj Electronu, které by mohly být užitečné pro ostatní vývojáře?

[Feross](http://feross.org/), jeden z přispěvatelů WebTorrent Desktop nedávno přednesl hovor *"Real world Electron: Building Cross-platform-desktop apps with JavaScript"* at NodeConf Argentina, který obsahuje užitečné tipy pro vydání leštěné Electron aplikace. Hovořit je zvláště užitečné, pokud jste ve stadiu, kde máte základní pracovní aplikaci a snažíte se ji přesunout na další úroveň leštění a profesionality.

[Sledujte zde](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Slides zde](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), další přispěvatel WebTorrentu napsal [kontrolní seznam věcí, které můžete udělat](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) pro to, aby se vaše aplikace cítila leštěná a domorodá. Obsahuje příklady kódů a pokrývá věci, jako je integrace macOS doků, přetažení a shození, stolní oznámení a zkontrolujte, zda se aplikace rychle načítá.

