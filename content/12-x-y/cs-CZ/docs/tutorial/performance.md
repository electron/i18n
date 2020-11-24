# Výkon

Vývojáři se často ptají na strategie optimalizace výkonu Electron aplikací. Softwaroví inženýři, spotřebitelé a vývojáři rámců se ne vždy shodují na jediné definici toho, co znamená "výkon". Tento dokument nastiňuje některé z oblíbených způsobů, jak snížit množství paměti, CPU, a na disku se používají zdroje a současně zajišťují, že vaše aplikace reaguje na vstup uživatele a provádí operace co nejrychleji . Kromě toho chceme, aby všechny výkonové strategie udržovaly vysoký standard pro bezpečnost vaší aplikace.

Pohodlí a informace o tom, jak vytvářet výkonné webové stránky s JavaScriptem obecně platí i pro Electron aplikace. Zdroje do jisté míry diskutují o tom, jak vybudovat výkonný uzel. s aplikace se také použijí, ale buďte opatrní, abyste pochopili, že termín "výkon" znamená různé věci pro uzel. s backend než pro aplikaci běžící na klientovi.

This list is provided for your convenience – and is, much like our [security checklist][security] – not meant to exhaustive. It is probably possible to build a slow Electron app that follows all the steps outlined below. Electron je výkonná vývojářská platforma, která vám umožňuje dělat více nebo méně co chcete. Všechno, co tato svoboda znamená, že výkon je z velké části vaší odpovědností.

## Opatření, opatření

Níže uvedený seznam obsahuje řadu kroků, které jsou dosti přímočaré a snadno proveditelné. Vytváření nejvýkonnější verze vaší aplikace však bude vyžadovat, abyste překročili počet kroků. Místo toho budete muset pečlivě prozkoumat všechny kódy, které běží ve vaší aplikaci, a to pomocí pečlivého profilování a měření. Kde jsou překážky? Když uživatel klikne na tlačítko, co operace zabere tíhu času? Zatímco aplikace jednoduše farmí, které objektů zabere nejvíce paměti?

Znovu a znovu jsme viděli, že nejúspěšnější strategií budování výkonné aplikace Electron je profilovat běžící kód, najít nejvíc na zdrojích a optimalizovat jej. Opakování tohoto zdánlivě náročného procesu znovu a znovu dramaticky zvýší výkon vaší aplikace . Zkušenosti z práce s hlavními aplikacemi, jako je Visual Studio Code nebo Slack ukázaly, že tato praxe je zdaleka nejspolehlivější strategií pro zlepšení výkonu.

Chcete-li se dozvědět více o profilování vašeho kódu aplikace, seznámte se s nástroji vývojáře prohlížeče Chrome. Pro pokročilou analýzu zaměřenou na více procesů, najednou, zvažte nástroj [pro sledování prohlížeče Chrome](https://www.chromium.org/developers/how-tos/trace-event-profiling-tool).

### Doporučené čtení

* [Začněte s analýzou výkonu Runtime][chrome-devtools-tutorial]
* [Talk: "Visual Studio Code - první sekunda"][vscode-first-second]

## Checklist

Šance je, že vaše aplikace může být o něco levnější, rychlejší a obecně méně hladová po zdrojích, pokud se pokusíte o tyto kroky.

1. [Bezprostředně včetně modulů](#1-carelessly-including-modules)
2. [Načítání a běh kódu příliš brzy](#2-loading-and-running-code-too-soon)
3. [Blokování hlavního procesu](#3-blocking-the-main-process)
4. [Blokování procesu vykreslování](#4-blocking-the-renderer-process)
5. [Nepotřebné polyplnění](#5-unnecessary-polyfills)
6. [Nepotřebný nebo blokování síťových požadavků](#6-unnecessary-or-blocking-network-requests)
7. [Bundle váš kód](#7-bundle-your-code)

## 1) Bezprostředně včetně modulů

Před přidáním modulu Node.js do vaší aplikace se podívejte na uvedený modul. How many dependencies does that module include? Jaký druh zdrojů musí být jednoduše volán v prohlášení `vyžad()`? Můžete se dozvědět , že modul s nejvíce stahovanými v registru NPM balíčků nebo s nejvíce hvězdami na GitHub není ve skutečnosti nejlevnější nebo nejmenší.

### Proč?

Odůvodnění tohoto doporučení nejlépe ilustruje příklad reálného světa . V raných dnech používání Electronu se jednalo o problém spolehlivé detekce připojení k síti , z toho vyplývá, že mnoho aplikací používá modul, který odhalil jednoduchou `isOnline()` metodu.

Tento modul zjistil vaše připojení k síti tím, že se pokusil oslovit známých koncových bodů. Pro seznam těchto sledovaných vlastností závisel na jiném modulu , který rovněž obsahoval seznam známých přístavů. Tato závislost závisela na modulu obsahujícím informace o portech, který přišel ve formě souboru JSON s více než 100 000 řádky obsahu. Kdykoli byl modul načten (obvykle v `vyžadovaném prohlášení ('module')` ), by načetl všechny své závislosti a nakonec si přečetl a analyzoval tento soubor JSON . Parsování mnoha tisíců řádků JSON je velmi drahá operace. Na pomalý stroj může trvat celé sekundy.

V mnoha kontextech serveru je spouštěcí čas prakticky irelevantní. Uzel. s server , který vyžaduje informace o všech portech, je pravděpodobně "více výkonu" , pokud načítá všechny požadované informace do paměti vždy, když server na spustí rychlejší obsluhu požadavků. Modul diskutovaný v tomto příkladu není "špatný" modul. Elektronické aplikace by však neměly být načítány, analyzovány a ukládány do informací o paměti, které ve skutečnosti nepotřebují.

Stručně řečeno, zdánlivě vynikající modul určený především pro Node.js servery běžící na Linuxu může být špatnou zprávou pro výkon vaší aplikace. V tomto konkrétním případě bylo správným řešením nepoužít žádný modul, a místo toho použít kontroly připojení zahrnuté v pozdějších verzích Chromium.

### Jak?

Při zvažování modulu doporučujeme zkontrolovat:

1. the size of dependencies included
2. the resources required to load (`require()`) it
3. zdroje potřebné k provedení akce, o kterou máte zájem

Generování profilu CPU a heap paměťového profilu pro načítání modulu lze provést jedním příkazem na příkazové řádce. V příkladu níže se podíváme na populární modul `požadavek`.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

Provedení tohoto příkazu vyústí v soubor `.cpuprofile` a soubor `.heapprofile` v adresáři, ve kterém jste ho provedli. Oba soubory lze analyzovat pomocí nástrojů pro vývojáře Chrome pomocí `Performance` a `Memory` .

![performance-cpu-prof][]

![performance-heap-prof][]

In this example, on the author's machine, we saw that loading `request` took almost half a second, whereas `node-fetch` took dramatically less memory and less than 50ms.

## 2) Načítání a běh kódu příliš brzy

Pokud máte drahé instalační operace, zvažte jejich odložení. Prozkoumejte všechny práce prováděné ihned po spuštění aplikace. Namísto okamžitého vypálení všech operací zvažte jejich rozmělnění v posloupnosti více v souladu s uživatelskou cestou.

V tradičním vývoji Node.js jsme zvyklí umístit všechny naše `vyžad()` příkazy nahoře. Pokud právě píšete svou Electron aplikaci používající stejnou strategii _a_ používají veliké moduly, které nepotřebujete okamžitě, použít stejnou strategii a odložit načítání na více vhodnou dobu.

### Proč?

Načítání modulů je překvapivě drahá operace, zejména na Windows. Při spuštění aplikace by uživatelé neměli čekat na operace, které nejsou v současné době nutné.

To by se mohlo zdát zjevné, ale mnoho aplikací má tendenci vykonat velké množství práce ihned po spuštění aplikace - jako je kontrola aktualizací, stahuje obsah použitý v pozdějším průtoku nebo provádí operace I/O na těžkém disku.

Podívejme se na kód Visual Studio jako příklad. Když otevřete soubor, okamžitě vám zobrazí soubor bez zvýraznění kódu, upřednostňuji vaši schopnost komunikovat s textem. Jakmile to udělá, se posune ke zvýraznění kódu.

### Jak?

Vezměme si příklad a předpokládejme, že vaše aplikace analyzuje soubory ve fiktivním formátu `.foo`. Za tímto účelem se spoléhá na stejně fiktivní `modul foo-parser`. V tradičním vývoji Node.js můžete napsat kód, který dychtivě načte závislosti:

```js
const fs = require('fs')
const fooParser = require('foo-parser')

class Parser {
  constructor () {
    this.files = fs.readdirSync('.')
  }

  getParsedFiles () {
    return fooParser.parse(this.files)
  }
}

const parser = new Parser()

module.exports = { parser }
```

Ve výše uvedeném příkladu děláme spoustu práce, která je spuštěna hned po načtení souboru. Potřebujeme, aby byly okamžitě analyzovány soubory? Mohli bychom to udělat o něco později, když je `getParsedFiles()` ve skutečnosti voláno?

```js
// "fs" je pravděpodobně již načteno, so `require()` call is cheap
const fs = require('fs')

class Parser {
  async getFiles () {
    // Touch the disk ihned po zavolání `getFiles` ne dříve.
    // Také se ujistěte, že neblokujeme jiné operace pomocí
    // asynchronní verze.
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
    // Protože `require()` pochází z mezipaměti modulů, volání `require()`
    // bude drahé pouze jednou - následné volání `getParsedFiles()`
    // bude rychlejší.
    const fooParser = require('foo-parser')
    const files = await this.getFiles()

    return fooParser. arse(files)
  }
}

// Tato operace je nyní mnohem levnější než v našem předchozím příkladu
const parser = nový Parser()

modul. xporty = { parser }
```

Stručně řečeno, přidělte zdroje "právě včas" namísto jejich alokace do všech při spuštění aplikace.

## 3) Blokování hlavního procesu

Hlavní proces Electronu (někdy nazývaný "prohlížeč proces") je zvláštní: je to výchozí proces pro ostatní procesy vaší aplikace a primární proces , se kterým operační systém spolupracuje. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

Za žádných okolností byste neměli blokovat tento proces a vlákno uživatelského rozhraní s dlouhodobými operacemi. Blokování uživatelského rozhraní znamená, že celá vaše aplikace zmrazí, dokud nebude hlavní proces připraven k dalšímu zpracování.

### Proč?

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. Pokud vaše okno vykresluje buttery-hladkou animaci, bude muset komunikovat s GPU procesem o tom – opět prochází hlavním procesem.

Elektron a chrom jsou opatrní na vložení těžkého disku I/O a procesu vázaného na CPU do nových vláken, aby se zabránilo blokování vlákna uživatelského rozhraní. Měli byste udělat totéž.

### Jak?

Výkonná víceprocesorová architektura Electronu je připravena vám pomoci s vašimi dlouhodobými úkoly, ale také obsahuje malý počet pamětí.

1) For long running CPU-heavy tasks, make use of [worker threads][worker-threads], consider moving them to the BrowserWindow, or (as a last resort) spawn a dedicated process.

2) Vyhněte se co nejvíce používání synchronního IPC a modulu `vzdáleného`. I když existují oprávněné případy, je příliš snadné nevědomě blokovat vlákno uživatelského rozhraní pomocí `vzdáleného` modulu.

3) Vyhněte se blokování I/O operací v hlavním procesu. Stručně řečeno, kdykoliv jádro uzlu. s moduly (jako `fs` nebo `child_process`) nabízejí synchronní nebo asynchronní verzi, měli byste preferovat asynchronní i neblokující variantu .

## 4) Blokování procesu vykreslování

Od Electron lodí s aktuální verzí Chrome, můžete využít nejnovějších a největších funkcí, které webová platforma nabízí k odložení nebo odpojení těžkých operací tak, aby vaše aplikace byla hladká a reagovala.

### Proč?

Vaše aplikace má pravděpodobně spoustu JavaScriptu ke spuštění v procesu vykreslování. trikem je provést operace co nejrychleji, aniž by sebral zdroje potřebné k hladkému posouvání, reagovat na vstup uživatele nebo animace při 60fps.

Orchestrální hodnocení toku operací v kódu vašeho rendereru je zvláště užitečné, pokud si uživatelé stěžují na vaši aplikaci někdy "sestřihování".

### Jak?

Obecně řečeno, všechna doporučení pro vytváření výkonných webových aplikací pro moderní prohlížeče se vztahují také na vykreslování Electronu. Dva primární nástroje, které máte k dispozici jsou v současné době `requestIdleCallback()` pro malé operace a `Web Workers` pro dlouhotrvající operace.

*`requestIdleCallback()`* umožňuje vývojářům přidat do fronty funkci k spuštěné, jakmile proces vstoupí do období nečinnosti. Umožňuje vám provádět práci s nízkou prioritou nebo na pozadí, aniž by to mělo dopad na uživatelský zážitek. For more information about how to use it, [check out its documentation on MDN][request-idle-callback].

*Web Workers* je výkonný nástroj pro spuštění kódu na samostatném vlákně. There are some caveats to consider – consult Electron's [multithreading documentation][multithreading] and the [MDN documentation for Web Workers][web-workers]. Jsou ideálním řešením pro každou operaci, která vyžaduje hodně výkonu procesoru po delší dobu .

## 5) Nepotřebné polyplnění

Jedním z skvělých přínosů Electronu je, že přesně víte, který engine bude analyzovat váš JavaScript, HTML, a CSS. Pokud používáte kód, který byl napsán pro web na velkém, ujistěte se, že jste nenaplňovali funkce zahrnuté v Electron.

### Proč?

Při vytváření webové aplikace pro dnešní internet diktují nejstarší prostředí jaké funkce můžete a nemůžete použít. I když Electron podporuje dobře fungující CSS filtry a animace, starý prohlížeč možná ne. Kde můžete používat WebGL, vaši vývojáři možná vybrali více řešení na podporu starších telefonů.

Pokud jde o JavaScript, možná jste přidali knihovny nástrojů jako jQuery pro selektory DOM nebo polyplnění jako `regenerátor -runtime` pro podporu `async/await`.

Je vzácné, že polyplnění založené na JavaScriptu bude rychlejší než původní funkce v Electronu. Nezpomalujte vaši Electron aplikaci odesláním své vlastní verze standardních funkcí webové platformy.

### Jak?

Pracují za předpokladu, že v současných verzích Electronu není nutné polyplnění provádět. Pokud máte pochybnosti, zkontrolujte [kanius. om](https://caniuse.com/) a zkontrolujte, zda [verze Chromia používaná ve vaší Electronové verzi](../api/process.md#processversionschrome-readonly) podporuje funkci, kterou si přejete.

Kromě toho pečlivě prozkoumejte knihovny, které používáte. Jsou skutečně nezbytné? `jQuery`, for example, was such a success that many of its features are now part of the [standard JavaScript feature set available][jquery-need].

Pokud používáte transpil/kompilátor jako TypeScript, prozkoumejte jeho konfiguraci a ujistěte se, že cílíte nejnovější verzi ECMAScript podporovanou Electronem.

## 6) Nezbytné nebo blokující síťové požadavky

Vyhněte se načítání jen zřídka měnících zdroje z internetu, pokud by mohly být snadno propojeny s vaší aplikací.

### Proč?

Mnoho uživatelů Electron začíná s zcela webovou aplikací, kterou mění na desktopovou aplikaci. Jako weboví vývojáři používáme načítání zdrojů z různých sítí pro doručování obsahu. Nyní, když jste odeslali správnou aplikaci pro stolní počítače, pokusit se tam, kde je to možné, "zkrátit šňůru" a vyhnout se tomu, aby vaši uživatelé čekali na zdroje, které se nikdy nezmění a by mohly být snadno zahrnuty do vaší aplikace.

Typickým příkladem jsou písma Google. Mnoho vývojářů využívá působivé sbírky písem zdarma, které přichází s doručením obsahu sítí. Rozteč je přímočarý: Zahrnout několik řádků CSS a Google se postará o ostatní.

Při vytváření Electron aplikace jsou vaši uživatelé lépe obsluhováni, pokud si stáhnete písma a zahrnete je do balíčku vaší aplikace.

### Jak?

V ideálním světě by vaše aplikace nepotřebovala síť pro fungování . Chcete-li se tam dostat, musíte pochopit, jaké zdroje se aplikace stahuje \- a jak velké tyto zdroje jsou.

Chcete-li tak učinit, otevřete nástroje vývojáře. Přejděte na kartu `Síť` a zkontrolujte možnost `Zakázat cache`. Pak znovu načtěte váš renderer. Pokud vaše aplikace nezakazuje takové načtení, obvykle můžete spustit znovunačtení zásahem `Cmd + R` nebo `Ctrl + R` pomocí nástrojů vývojáře v zákulisí.

Nástroje budou nyní pečlivě zaznamenávat všechny síťové požadavky. Nejprve si vyberou všechny stažené zdroje, které se zaměřují na větší soubory . Jsou některé z nich obrázky, písma nebo mediální soubory, které se nemění, a mohou být součástí vašeho balíčku? Pokud ano, přiložte je.

Jako další krok povolte `Network Throttling`. Najděte rozbalovací seznam, který v současné době čte `Online` a vyberte pomalejší rychlost jako `Rychlá 3G`. Znovu načtěte váš renderer a zjistěte, zda jsou nějaké zdroje, které vaše aplikace zbytečně čeká. V mnoha případech bude aplikace čekat na dokončení síťového požadavku i přesto, že skutečně nepotřebuje příslušný zdroj.

Jako tip, načítání zdrojů z internetu, které byste mohli chtít změnit , bez doručení aktualizace aplikace je výkonná strategie. For advanced control over how resources are being loaded, consider investing in [Service Workers][service-workers].

## 7) Balíček vašeho kódu

Jak již bylo uvedeno v "[Načítání a běh kódu příliš brzy](#2-loading-and-running-code-too-soon)", volání `vyžaduje()` je nákladná operace. Pokud jste schopni to udělat, rozdělte kód vaší aplikace do jednoho souboru.

### Proč?

Moderní vývoj JavaScriptu obvykle zahrnuje mnoho souborů a modulů. While that's perfectly fine for developing with Electron, we heavily recommend that you bundle all your code into one single file to ensure that the overhead included in calling `require()` is only paid once when your application loads.

### Jak?

Existuje mnoho JavaScriptových bundleru a víme lépe než rozhořčení komunity doporučením jednoho nástroje po druhém. Nicméně doporučujeme, abyste použili balík, který dokáže zvládnout jedinečné prostředí Electronu, které musí zvládnout oba uzly. s a prostředí prohlížeče.

As of writing this article, the popular choices include [Webpack][webpack], [Parcel][parcel], and [rollup.js][rollup].

[security]: ./security.md
[performance-cpu-prof]: ../images/performance-cpu-prof.png
[performance-heap-prof]: ../images/performance-heap-prof.png
[chrome-devtools-tutorial]: https://developers.google.com/web/tools/chrome-devtools/evaluate-performance/
[worker-threads]: https://nodejs.org/api/worker_threads.html
[web-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
[request-idle-callback]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[multithreading]: ./multithreading.md
[jquery-need]: http://youmightnotneedjquery.com/
[service-workers]: https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API
[webpack]: https://webpack.js.org/
[parcel]: https://parceljs.org/
[rollup]: https://rollupjs.org/
[vscode-first-second]: https://www.youtube.com/watch?v=r0OeHRUCCb4
