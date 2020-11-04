---
title: 'Project van de week: Kap'
author:
  - skllcrn
  - sindresorhus
  - zeke
date: '2017-01-31'
---

De Electron gemeenschap groeit snel, en mensen maken krachtige nieuwe apps en gereedschappen op een verbazingwekkend tempo. Om dit creatieve momentum te vieren en de gemeenschap op de hoogte te houden van sommige van deze nieuwe projecten we hebben besloten om een wekelijkse blog serie te starten met opmerkelijke Electron-gerelateerde projecten.

---

Dit bericht is de eerste in de serie en functies [Kap](https://getkap.co/), een open-source schermopname app gemaakt door [Wulkano](https://wulkano.com/), een gedistribueerd team van freelance ontwerpers en ontwikkelaars.

[![Kap Schermopname](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## Wat is Kap?

[Kap is een open-source schermrecorder](https://getkap.co) gebouwd voor ontwerpers en ontwikkelaars om hun werk gemakkelijk vast te leggen. Mensen gebruiken het om geanimeerde prototypes, documentbugs te delen, maak gek GIF's en alles ertussenin.

We hebben mensen van alle leeftijden en achtergronden gezien die het gebruiken in onderwijsinstellingen, screencasts, tutorials... De lijst gaat verder. Zelfs om productiefaciliteiten te creëren! We zijn helemaal weggeblazen door hoe goed ons kleine nevenproject is ontvangen.

## Waarom heb je het gebouwd?

Dat is een heel goede vraag, het lijkt er niet op dat er een gebrek aan schermopnames is! Wij vonden dat de alternatieven ofwel te ingewikkeld, te duur of te beperkt waren. Niets voelde *net goed* voor onze dagelijkse behoeften. We vinden het ook geweldig wanneer de hulpmiddelen die we gebruiken om ons werk te doen open source zijn, die manier kan iedereen helpen ze vorm te geven. [Bouw Kap kwam uiteindelijk net zoveel te staan over wat we niet hebben gedaan](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38). Het is allemaal in de details, een opeenstapeling van kleine verbeteringen die de contouren werden van een instrument dat we wilden gebruiken.

Echter en misschien wel het belangrijkste, Kap is voor ons een plek geworden om onze zorgen aan de deur te laten staan en alleen maar plezier te hebben met het bouwen van iets voor onszelf en mensen zoals wij. Het is zo belangrijk om een omgeving te creëren waar je net een spil kunt vinden, nieuwe duimen kunt genieten van je vliegtuig. Geen vereisten, geen druk, geen verwachtingen. Moeten ontwerpers en ontwikkelaars naast project werken? Waarom, ja. Ja, dat zou moeten.

## Waarom heb je ervoor gekozen om Kap op Electrono te bouwen?

Er waren een aantal redenen:

* Web tech
* De meeste van het team zijn webontwikkelaars
* We hebben in JavaScript geïnvesteerd
* Het opent de deur voor meer mensen om bij te dragen
* Electron is zelf open-source
* De kracht en makkelijk te behouden modulariteit van `node_modules`
* Multiplatform mogelijkheden

We denken dat de toekomst van apps in de browser is, maar we zijn er nog niet helemaal. Electron is een belangrijke stap op weg naar die toekomst. Het maakt niet alleen de apps zelf toegankelijker, maar ook de code waarmee ze zijn opgebouwd. Een interessant idee is een toekomst voor te stellen waar het OS een browser is, en de tabbladen zijn voornamelijk Electron apps.

Bovendien, omdat we voornamelijk webontwikkelaars zijn, zijn we grote fans van de isomorfe aard van JavaScript, in dat u JS kunt uitvoeren op de cliënt, server en nu het bureaublad. Met web tech (HTML, CSS en JS), zijn veel dingen veel eenvoudiger dan niets: Sneller prototypen, minder code, flexbox > auto-lay-out (macOS/iOS).

## Wat zijn enkele uitdagingen waarmee je wordt geconfronteerd tijdens het bouwen van Kap?

Het gebruik van de middelen die Electron beschikbaar heeft om het scherm op te nemen was de grootste uitdaging. Ze waren gewoon onvoldoende prematuur om aan onze eisen te voldoen en zouden het project in onze ogen een mislukking maken. Hoewel Electron zelf geen schuld heeft, is er nog steeds een kloof tussen inheemse ontwikkeling en het bouwen van desktopapps met web tech.

We hebben veel tijd besteed aan het proberen te werken rond de slechte prestaties van de `getUserMedia` API, een probleem dat afkomstig is uit Chromium. Een van onze belangrijkste doelen toen we Kap wilden maken, was het bouwen van de hele app met web technologie. Na het proberen van alles wat we konden doen om het te laten werken (de minimum vereiste is 30 FPS op een Retina scherm) Uiteindelijk moesten we een andere oplossing vinden.

## Ik zie wat Swift code in de repo. Waar gaat het om?

Omdat we gedwongen zijn om alternatieven te zoeken voor `getUserMedia`, beginnen we te experimenteren met `ffmpeg`. Naast het feit dat het een van de beste tools is voor audio- en videoconversie heeft het de functionaliteit om het scherm op te nemen in bijna alle OS, en we hebben op een Retina-scherm aan onze minimumeisen van 30 FPS kunnen voldoen. Probleem? De prestatie was ":weary:", het CPU-gebruik ging naar haywire. We gingen dus terug naar de tekentafel, discussieerden over onze opties en beseften dat we een compromis moesten sluiten. Dat resulteerde in [Aperture](https://github.com/wulkano/aperture), onze eigen schermopnamebibliotheek voor macOS geschreven in Swift.

## Op welke gebieden moet Electron worden verbeterd?

We weten allemaal dat Electron apps iets kunnen hebben om RAM, maar nogmaals, dat is echt een Chromium ding. Het is onderdeel van hoe het werkt en het hangt echt af van wat je runt. bijvoorbeeld Kap en Hyper gebruiken meestal minder dan 100 MB geheugen.

Een van de grootste verbeteringsgebieden die we zien is de betaling, met name hoe Electron Chromium distribueert. Een idee zou zijn om een gedeelde Electron core te hebben en app installateurs te laten controleren of deze al aanwezig is op het systeem.

Het maken van cross-platform Electron apps zou een betere ervaring kunnen zijn. Op dit moment zijn er te veel inconsistenties, platform-specifieke API's en ontbrekende functies tussen platforms, waardoor je codebase bezaaid is met als-anders-verklaringen. Bijvoorbeeld, vibrancy wordt alleen ondersteund op macOS, de auto-updater werkt anders op macOS en Windows, en wordt niet eens ondersteund op Linux. Transparantie is een hit of mis op Linux, meestal niet.

Het moet ook gemakkelijker zijn om native system API's te noemen. Electron komt met een zeer goede set API's, maar soms heb je functionaliteit niet nodig. Het creëren van een native Node.js addon is een optie, maar het is pijnlijk om mee te werken. Electron zou het liefst met een goede [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) API, zoals [`fastcall`](https://github.com/cmake-js/fastcall). Dit zou ons in staat hebben gesteld om in plaats daarvan het Swift-deel in JavaScript te schrijven.

## Wat zijn jouw lievelingsdingen over Electron?

Ons lievelingsvermogen is het feit dat iedereen met kennis van het maken voor het web kan bouwen en bijdragen aan multi-platform native ervaringen. En dan heb ik het nog niet eens over het gemak en de vreugde van de ontwikkeling ervan, de uitstekende documentatie en het bloeiende ecosysteem.

Vanuit een front-end perspectief, voelde het bouwen van Kap niet anders dan het bouwen van een eenvoudige website met behulp van browserAPI's. Electron doet er echt goed aan om app ontwikkeling vergelijkbaar te maken met web ontwikkeling. Zo simpel was het zelfs dat er geen behoefte was aan kaders of iets dergelijks om ons te helpen, alleen maar schoon en modulair JS en CSS.

Wij zijn ook grote fans van het team dat het bouwt, hun toewijding en hun steun, en de actieve en vriendelijke gemeenschap die zij onderhouden. Knuffelt je allemaal!

## Wat komt er volgende in Kap?

De volgende stap voor ons is het beoordelen van de app in voorbereiding op onze 2.0. mijlpaal, die een React herschrijf bevat als aanvulling op het ondersteunen van plugins, waardoor ontwikkelaars de functionaliteit van Kap! We nodigen iedereen uit om te volgen voor het project en bij te dragen aan onze [GitHub repository](https://github.com/wulkano/kap). We luisteren en willen zo veel mogelijk van u horen. [Laat ons weten hoe we Kap het best mogelijke hulpmiddel voor jou kunnen maken](https://wulkano.typeform.com/to/BIvJKz)!

## Wat is Wulkano?

[Wulkano](https://wulkano.com) is een studio en digitale collectief, een team van remote wetenschappers die graag samenwerken aan zowel onze client gigs als onze eigen projecten. We zijn een verspreide maar strakke groep van mensen van verschillende plekken en achtergronden, het delen van kennis, ideeën, ervaringen, maar het allerbelangrijkst zijn domme GIF's en memes, in onze virtuele kantoor (het op Electron gebaseerde Slack!).

## Heb je Electron tips die nuttig kunnen zijn voor andere ontwikkelaars?

Profiteer van en doe mee in de fantastische [gemeenschap](https://discuss.atom.io/c/electron), bekijk [Geweldige Electron](https://github.com/sindresorhus/awesome-electron), bekijk [voorbeelden](https://github.com/electron/electron-api-demos) en maak gebruik van de geweldige [docs](https://electronjs.org/docs/)!

