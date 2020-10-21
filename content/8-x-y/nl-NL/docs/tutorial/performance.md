# Prestaties

Ontwikkelaars vragen vaak over strategieën om de prestaties van Electron applicaties te optimaliseren. Software engineers, consumenten en framework ontwikkelaars zijn het niet altijd eens over één enkele definitie van wat "performance" betekent. Dit document schetst een aantal van de Electron onderhouden favoriete manieren om de hoeveelheid geheugen, CPU, te verminderen en schijf bronnen die worden gebruikt om ervoor te zorgen dat uw app reageert op gebruikerinvoer en operaties zo snel mogelijk uitvoert als mogelijk. Bovendien willen we dat alle prestatiestrategieën een hoge standaard voor de veiligheid van je app aanhouden.

Wisdom en informatie over het bouwen van performant websites met JavaScript geldt meestal ook voor Electron apps. Tot op zekere hoogte, middelen bespreken hoe een performant Node te bouwen. s applicaties zijn ook van toepassing, maar wees voorzichtig om te begrijpen dat de term "performance" verschillende dingen betekent voor een Node. s backend dan het voor een applicatie die op een client wordt uitgevoerd.

This list is provided for your convenience – and is, much like our [security checklist][security] – not meant to exhaustive. Het is waarschijnlijk mogelijk om een langzame Electron app te bouwen die alle hieronder geschetste stappen volgt. Electron is een krachtig ontwikkelplatform waarmee je als ontwikkelaar meer kunt doen of minder wat je maar wilt. Al die vrijheid betekent dat prestaties grotendeels uw verantwoordelijkheid zijn.

## Meet, meten, meten

De onderstaande lijst bevat een aantal stappen die vrij eenvoudig zijn en eenvoudig te implementeren. Het bouwen van de meest performante versie van uw app vereist echter dat u verder gaat dan een aantal stappen. In plaats daarvan moet je nauwkeurig kijken naar alle code die in je app wordt uitgevoerd door zorgvuldig te profileren en meten. Waar zijn de knelpunten? Wanneer de gebruiker op een knop klikt, wat operaties nemen dan de puntjes op de i plaats? Terwijl de app gewoon aan het farmen is, welke objecten nemen het meest geheugen op?

Keer op keer hebben we gezien dat de meest succesvolle strategie om een performant Electron app te bouwen het profiel van de lopende code is. vind het meest grondstoffen hongerende stuk ervan, en om het te optimaliseren. Herhalen van dit schijnbaar moeizame proces zal de prestaties van je app drastisch verhogen. De ervaring met het werken met belangrijke apps zoals Visual Studio Code of Slack heeft aangetoond dat deze praktijk verreweg de meest betrouwbare strategie is om prestaties te verbeteren.

Voor meer informatie over hoe je de code van je app kunt profiteren, ken je de Chrome Developer Tools. Voor geavanceerde analyse die naar meerdere processen kijkt tegelijk, overweeg dan de [Chrome Tracing] tool.

### Aanbevolen Lezing

 * [Beginnen met het analyseren van Runtime Prestaties][chrome-devtools-tutorial]
 * [Praatje: "Visual Studio Code - The First Second"][vscode-first-second]

## Checklist

Mogelijkheden zijn dat jouw app een beetje slanker en sneller kan zijn grondstof hongerig als je deze stappen probeert.

1. [Onophoudelijk inclusief modules](#1-carelessly-including-modules)
2. [Code laden en uitvoeren te snel](#2-loading-and-running-code-too-soon)
3. [Blokkeren van het hoofdproces](#3-blocking-the-main-process)
4. [Blokkeren van het renderer-proces](#4-blocking-the-renderer-process)
5. [Onnoodzakelijke polyfillen](#5-unnecessary-polyfills)
6. [Niet nodig of blokkeer netwerkverzoeken](#6-unnecessary-or-blocking-network-requests)
7. [Bundel je code](#7-bundle-your-code)

## 1) Onophoudelijk inclusief modules

Voor het toevoegen van een Node.js module aan uw applicatie, onderzoekt u de genoemde module. Hoe veel afhankelijkheden bevat die module? Wat voor soort middelen moet het gewoon worden aangeroepen in een `vereiste ()` statement? Je vindt dat de module met de meeste downloads op het NPM pakket register of de meeste sterren op GitHub eigenlijk niet de laagste of kleinste is.

### Waarom?

De redenering achter deze aanbeveling is het beste geïllustreerd met een echt voorbeeld. Tijdens de eerste dagen van Electron, was een betrouwbare detectie van netwerk connectiviteit een probleem. resulteert in veel apps om een module te gebruiken die een simpele `isOnline()` methode heeft gelekt.

Die module heeft uw netwerkverbinding gedetecteerd door te proberen de bekende eindpunten te bereiken. Voor de lijst van deze eindpunten is het afhankelijk van een andere module, die ook een lijst van bekende havens bevat. Deze afhankelijkheid vertrouwde op een module met informatie over havens welke in de vorm van een JSON-bestand met meer dan 100.000 regels inhoud kwam. Wanneer de module werd geladen (meestal in een `required ('module')` statement), het zou al zijn afhankelijkheden laden en uiteindelijk dit JSON bestand lezen en parsen. Het parseren van vele duizenden lijnen JSON is een zeer dure operatie. Op een langzame machine kan het hele seconden tijd in beslag nemen.

In veel server contexten is de opstarttijd vrijwel irrelevant. Een Node. s server die informatie over alle poorten nodig heeft is waarschijnlijk "meer performant" als het alle vereiste informatie in het geheugen laadt wanneer de server opstart op om het voordeel van het sneller indienen van aanvragen te hebben. De module die in dit voorbeeld wordt besproken is geen "slecht" module. Electron apps mogen echter niet laden, parsing en opslaan van informatie in het geheugen die het eigenlijk niet nodig heeft.

Kortom, een schijnbaar uitstekende module die voornamelijk geschreven is voor de Node.js servers die Linux draaien kan slecht nieuws zijn voor de prestaties van uw app. In dit specifieke voorbeeld was de juiste oplossing om helemaal geen module te gebruiken. en in plaats daarvan verbindingscontroles te gebruiken die zijn opgenomen in latere versies van Chromium.

### Hoe?

Bij het overwegen van een module, raden we u aan te controleren:

1. de grootte van de afhankelijkheden inclusief 2) de middelen benodigd om te laden (`require()`) het
3. de bronnen die nodig zijn om de actie uit te voeren waarin je geïnteresseerd bent

Het genereren van een CPU-profiel en een geheugenprofiel voor het laden van een module kan gedaan worden met een enkel commando op de opdrachtregel. In het onderstaande voorbeeld kijken we naar de populaire module `request`.

```sh
node --cpu-prof --heap-prof -e "require('request')"
```

Het uitvoeren van deze opdracht resulteert in een `.cpuprofile` bestand en een `.heapprofile` bestand in de map waarin u het uitvoerde. Both files can be analyzed using the Chrome Developer Tools, using the `Performance` and `Memory` tabs respectively.

![performance-cpu-prof][]

![performance-heap-prof][]

In dit voorbeeld, op de machine van de auteur zagen we dat het laden van `verzoek` bijna een halve seconde kostte, terwijl `node-fetch` op dramatische wijze minder geheugen had en minder dan 50 ms.

## 2) Code laden en uitvoeren te snel

Als je dure installatiewerkzaamheden hebt, overweeg deze uit te stellen. Inspecteer alle het werk dat direct wordt uitgevoerd na het starten van de applicatie. In plaats van direct alle operaties af te schieten, kun je overwegen om ze in een rij meer van dichtbij te laten lopen met de reis van de gebruiker.

In de traditionele Node.js ontwikkeling worden we gewend om al onze `require()` statements aan de bovenkant te plaatsen. Als u momenteel uw Electron applicatie schrijft met behulp van dezelfde strategie _en_ gebruikt sizable modules die u niet direct nodig heeft dezelfde strategie toepassen en laden uitstellen naar een meer opportune tijd.

### Waarom?

Het laden van modules is een verrassend dure operatie, vooral op Windows. Wanneer uw app start, mag het gebruikers niet laten wachten op bewerkingen die momenteel niet nodig zijn.

Dit lijkt voor de hand te liggen. maar veel applicaties hebben de neiging om een grote hoeveelheid werk direct te doen nadat de app is gestart - zoals controleren op updates, inhoud downloaden die gebruikt wordt in een later proces, of zware schijf I/O operaties uitvoeren.

Laten we Visual Studio Code als voorbeeld nemen. Wanneer u een bestand opent, wordt het direct het bestand weergegeven zonder dat er een code wordt gemarkeerd, prioriteren van je mogelijkheid om met de tekst te communiceren. Zodra het dat werk heeft voltooid, zal het klikken op code markeren.

### Hoe?

Laten we een voorbeeld nemen en aannemen dat uw aanvraag bestanden in het fictieve `.foo` formaat parst. Om dat te doen is het afhankelijk van de even fictief `foo-parser` module. In de traditionele ontwikkeling van Node.js, kunt u code schrijven die graag afhankelijkheden laden:

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

In het bovenstaande voorbeeld doen we veel werk dat wordt uitgevoerd zodra het bestand wordt geladen. Moeten we snel afgeleide bestanden krijgen? Kunnen we dit werk even later doen als `getParsedFiles()` daadwerkelijk wordt genoemd?

```js
// "fs" wordt waarschijnlijk al geladen, dus de `require()` call is goedkoop
const fs = require('fs')

class Parser {
  async getFiles () {
    // Raak de schijf aan zodra `getFiles` wordt aangeroepen, niet eerder.
    // Verzeker er ook van dat we andere operaties niet blokkeren door
    // de asynchrone versie te gebruiken.
    this.files = this.files || await fs.readdir('.')

    return this.files
  }

  async getParsedFiles () {
    // Our fictitious foo-parser is a big and expensive module to load, so
    // defer that work until we actually need to parse files.
    // Sinds `require()` komt met een module cache, de `require()` oproep
    // zal slechts eens duur zijn - volgende oproepen van `getParsedFiles()`
    // zullen sneller zijn.
    const fooParser = require('foo-parser')
    const files = wacht op deze.getFiles()

    return fooParser. arse(files)
  }
}

// Deze bewerking is nu veel goedkoper dan in ons vorige voorbeeld
const parser = new Parser()

module. xports = { parser }
```

Kortom: "gewoon op tijd" toewijzen in plaats van ze allemaal wanneer de app opstart.

## 3) Het hoofdproces wordt geblokkeerd

Het hoofdproces van Electron (soms "browserproces") is speciaal: het is het bovenliggende proces van al je apps en het primaire proces van de interactie tussen het besturingssysteem. It handles windows, interactions, and the communication between various components inside your app. It also houses the UI thread.

Onder geen enkele omstandigheid mag je dit proces en de UI thread blokkeren met langlopende operaties. Blokkeren van de UI thread betekent dat je hele app bevriest totdat het hoofdproces klaar is om door te gaan.

### Waarom?

The main process and its UI thread are essentially the control tower for major operations inside your app. When the operating system tells your app about a mouse click, it'll go through the main process before it reaches your window. Als je raam een vlinder-vloeiende animatie weergeeft, het zal moeten praten met het GPU-proces hierover – opnieuw doorlopen van het hoofdproces.

Electron en Chromium zorgen ervoor dat zware schijf I/O en CPU-gebonden bewerkingen in nieuwe threads worden geplaatst om te voorkomen dat de UI thread wordt geblokkeerd. Je moet hetzelfde doen.

### Hoe?

Elektronische krachtige multi-proces-architectuur staat klaar om u te helpen met uw langlopende taken, maar bevat ook een klein aantal performance-vallen.

1) For long running CPU-heavy tasks, make use of [worker threads][worker-threads], consider moving them to the BrowserWindow, or (as a last resort) spawn a dedicated process.

2) Vermijd zoveel mogelijk gebruik van de synchrone IPC en de `externe` module. Hoewel er legitieme gebruik van gevallen zijn, is het veel te gemakkelijk om onbewust de UI thread te blokkeren met behulp van de `externe` module.

3) Vermijd het blokkeren van I/O operaties in het hoofdproces. Kortom: altijd kern node. s modules (zoals `fs` of `child_process`) bieden een synchroon of een asynchrone versie, u geeft de voorkeur aan de asynchrone en niet-blokkerende variant.


## 4) Het renderer proces blokkeren

Sinds Electron verzendt met een huidige versie van Chrome, je kunt gebruik maken van de nieuwste en beste functies van het webplatform van om zware operaties uit te stellen of uit te laden, op een manier die je app soepel en responsief houdt.

### Waarom?

Je app heeft waarschijnlijk veel JavaScript in het rendererproces. De truc is om de operaties zo snel mogelijk uit te voeren zonder middelen weg te nemen die nodig zijn om het scrollen soepel te laten verlopen. reageren op gebruikersinvoer of animaties bij 60fps.

Orchestring van de stroom van bewerkingen in de code van je speler is vooral handig als gebruikers klagen over je app soms "stotteren".

### Hoe?

Over het algemeen zijn alle adviezen voor het bouwen van performant web apps voor moderne browsers ook van toepassing op Electron's renderers. De twee primaire hulpmiddelen die u ter beschikking hebt zijn momenteel `requestIdleCallback()` voor kleine bewerkingen en `Web Workers` voor langdurige bewerkingen.

*`requestIdleCallback()`* stelt ontwikkelaars in staat om een functie op te nemen die wordt uitgevoerd zodra het proces een inactieve periode is ingevoerd. Het stelt u in staat laag prioritair of achtergrondwerk uit te voeren zonder de gebruikerservaring te beïnvloeden. For more information about how to use it, [check out its documentation on MDN][request-idle-callback].

*Web Workers* zijn een krachtig hulpmiddel om code op een aparte thread uit te voeren. There are some caveats to consider – consult Electron's [multithreading documentation][multithreading] and the [MDN documentation for Web Workers][web-workers]. Ze zijn een ideale oplossing voor elke bewerking die voor een langere periode van tijd veel CPU-vermogen vereist.


## 5) Onnodige polyfillen

Een van de geweldige voordelen van Electron is dat u precies weet welke motor uw JavaScript, HTML en CSS zal verwerken. Als je de code die voor het internet op grote schaal schreef, moet je ervoor zorgen dat je geen veelvuldige functies toevoegt aan Electron.

### Waarom?

Bij het bouwen van een webtoepassing voor het internet van vandaag, bepalen de oudste omgevingen welke functies u wel en niet kunt gebruiken. Hoewel Electron goed presterende CSS-filters en animaties ondersteunt, is een oudere browser dat wellicht niet. Waar je WebGL kunt gebruiken, hebben je ontwikkelaars mogelijk een meer resource-hongerige -oplossing gekozen voor oudere telefoons.

Als het om JavaScript gaat, u kunt toolkit bibliotheken hebben inbegrepen zoals jQuery voor DOM-selectors of polyfills zoals `regenerator-runtime` om `async/wacht`.

Het komt zelden voor dat een op JavaScript gebaseerde polyfill sneller is dan de equivalent oorspronkelijke functie in Electron. Vertraag je Electron app niet door je eigen versie van standaard web platform functies te verzenden.

### Hoe?

Voer de veronderstelling uit dat polyvillen in de huidige versies van Electron niet nodig zijn. If you have doubts, check \[caniuse.com\]\[https://caniuse.com/\] and check if the [version of Chromium used in your Electron version](../api/process.md#processversionschrome-readonly) supports the feature you desire.

Daarnaast onderzoeken we zorgvuldig de bibliotheken die u gebruikt. Zijn ze echt nodig? `jQuery`, for example, was such a success that many of its features are now part of the [standard JavaScript feature set available][jquery-need].

Als je een transpiler/compiler zoals TypeScript gebruikt, bekijk dan de configuratie en zorg ervoor dat je de nieuwste ECMAScript versie nastreeft, die door Electron wordt ondersteund.


## 6) netwerkverzoeken niet nodig of blokkeren

Vermijd het zelden wisselen van bronnen van het internet als ze gemakkelijk kunnen worden gebundeld met je aanvraag.

### Waarom?

Veel gebruikers van Electron starten met een webgebaseerde app die ze omzetten in een desktopapplicatie. Als webontwikkelaars worden we gebruikt om bronnen te laden vanuit verschillende uitleveringsnetwerken voor inhoud. Nu dat u een goede desktop applicatie verzendt, probeert u waar mogelijk het cord te knippen
 - en vermijd gebruikers te laten wachten op bronnen die nooit veranderen en kan gemakkelijk worden opgenomen in de app.

Een typisch voorbeeld is Google Fonts. Veel ontwikkelaars maken gebruik van Google's indrukwekkende collectie gratis lettertypen, die wordt geleverd met een netwerk voor levering van inhoud . De toonhoogte is eenvoudig: enkele regels van CSS bevatten en Google zorgen voor de rest.

Bij het bouwen van een Electron app worden je gebruikers beter gediend als je het lettertype downloadt en ze in de bundel van je app opneemt.

### Hoe?

In een ideale wereld zou je applicatie het netwerk niet nodig hebben om te werken. Om daar te komen, moet u begrijpen welke bronnen uw app \- en hoe groot deze bronnen zijn.

Om dit te doen, moet u de ontwikkelaarshulpmiddelen openen. Navigeer naar het tabblad `Netwerk` en controleer de optie `Cache` uitschakelen. Herlaad vervolgens je speler. Tenzij uw app dergelijke herladen verbiedt, je kunt meestal herladen door `Cmd + R` of `Ctrl + R` te raken met de ontwikkelaarshulpmiddelen in focus.

De instrumenten zullen nu alle netwerkverzoeken nauwkeurig registreren. In een eerste pas, zet de voorraad op van alle bronnen die worden gedownload, gericht op de grotere bestanden eerst. Zijn een van hen afbeeldingen, lettertypen of mediabestanden die niet wijzigen en kunnen worden opgenomen in je bundel? Als dat zo is, moet u ze opnemen.

Schakel `Netwerk Throttling` in. Zoek de vervolgkeuzelijst die momenteel lees `Online` en selecteer een langzamere snelheid zoals `Fast 3G`. Herlaad je speler en kijk of er bronnen zijn waar je app onnodig op wacht. In veel gevallen zal een app wachten op een netwerkverzoek om te voltooien, ondanks het feit dat de betrokken bron niet nodig is.

Als een tip is het laden van bronnen op internet die u mogelijk wilt wijzigen zonder verzending, is een krachtige strategie. For advanced control over how resources are being loaded, consider investing in [Service Workers][service-workers].

## 7) Bundel je code

Zoals al in "[het laden en uitvoeren van code te snel](#2-loading-and-running-code-too-soon)", oproepen `require()` is een dure operatie. Als je dat kunt doen, bundelt de code van je applicatie in een enkel bestand.

### Waarom?

Moderne JavaScript-ontwikkeling omvat meestal veel bestanden en modules. Terwijl prima is om te ontwikkelen met Electron, We raden sterk aan dat je al je code in één enkel bestand bundelt om ervoor te zorgen dat de overhead meegeleverd in een oproep `require()` maar eenmaal betaald wordt als je applicatie laadt.

### Hoe?

Er zijn talloze JavaScript-bundlers daarbuiten en we weten beter dan om de gemeenschap te boosten door het aanbevelen van één gereedschap over een ander. Wij adviseren u echter om een bundler te gebruiken die de unieke omgeving van Electronen kan verwerken die beide Node moet verwerken. s en browser omgevingen.

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
