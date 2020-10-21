---
title: 'Electron Internals&#58; Knooppunt als een bibliotheek gebruiken'
author: zcbenz
date: '2016-08-08'
---

Dit is de tweede post in een lopende serie waarin de internals van Electron wordt uitgelegd. Bekijk het [eerste bericht](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) over integratie in event loop als je dat nog niet gedaan hebt.

De meeste mensen gebruiken [Node](https://nodejs.org) voor server-side applicaties, maar door de rijke API set en de bloeiende gemeenschap van Node is het ook een geweldige mogelijkheid voor een ingebedde bibliotheek. Dit bericht legt uit hoe node wordt gebruikt als bibliotheek van Electron.

---

## Systeem bouwen

Zowel Node als Electron gebruiken [`GYP`](https://gyp.gsrc.io) als hun build-systemen. Als u Node wilt embedden in de app, moet u het ook gebruiken als uw build systeem.

Nieuw bij `GYP`? Lees [deze handleiding](https://gyp.gsrc.io/docs/UserDocumentation.md) voordat je verder gaat in deze post.

## Nodes vlaggen

Het [`knooppunt. yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) bestand in Nodes broncode directory beschrijft hoe Node wordt gebouwd, samen met veel [`GYP`](https://gyp.gsrc.io) variabelen die bepalen welke delen van Node zijn ingeschakeld en of om bepaalde configuraties te openen.

Om de buildvlaggen te veranderen, moet je de variabelen instellen in het `.gypi` bestand van je project. Het `configureren` script in Node kan gemeenschappelijke configuraties voor u genereren, bijvoorbeeld het draaien van `. configureer --shared` zal een `config.gypi` genereren met variabelen die instructing Node moet worden gebouwd als een gedeelde bibliotheek.

Electron gebruikt het `configure` script niet, omdat het zijn eigen build scripts heeft. De configuraties voor Node zijn gedefinieerd in de [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) bestand in de root source map van Electron.

## Link node met Electron

In Electron, Node wordt gekoppeld als een gedeelde bibliotheek door de `GYP` variabele `node_shared` op `true`in te stellen, dus Node's build type zal worden gewijzigd van `uitvoerbaar 
` naar `Shared_library`, en de broncode die de Nodes `hoofd` invoerpunt bevat zal niet worden gecompileerd.

Omdat Electron gebruik maakt van de V8 bibliotheek verzonden met Chromium, wordt de V8 bibliotheek opgenomen in Nodes broncode niet gebruikt. Dit wordt gedaan door het instellen van zowel `node_use_v8_platform` en `node_use_bundled_v8` op `false`.

## Gedeelde bibliotheek of statische bibliotheek

Bij het koppelen met knooppunt zijn er twee opties: u kunt knooppunt als een statische bibliotheek bouwen en opnemen in het laatste uitvoerbare bestand. of u kunt het bouwen als een gedeelde bibliotheek en het verzenden naast het laatste uitvoerbare bestand.

In Electroon is node lange tijd als statische bibliotheek gebouwd. Dit maakte de build eenvoudig, activeerde de beste compiler optimalisaties en stond Electron toe om te verspreiden zonder een extra `node.dll` bestand.

Dit is echter gewijzigd nadat Chrome is overgeschakeld naar [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL is een fork van [OpenSSL](https://www.openssl.org) die verschillende ongebruikte API's verwijdert en veel bestaande interfaces wijzigt. Omdat Node nog steeds OpenSSL gebruikt, zou de compiler talloze linkfouten genereren door conflicterende symbolen als ze aan elkaar gekoppeld zijn.

Electron kon BoringSSL in node niet gebruiken, of OpenSSL gebruiken in Chromium, dus de enige optie was om over te schakelen naar build-node als gedeelde bibliotheek, en [verberg de BoringSSL en OpenSSL symbolen](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) in de componenten van elk van hen.

Deze verandering heeft Electron een aantal positieve bijwerkingen opgeleverd. Voordat deze verandert, u kunt het uitvoerbare bestand van Electron op Windows niet hernoemen als u inheemse modules gebruikt omdat de naam van het uitvoerbare bestand moeilijk gecodeerd was in de import bibliotheek. Nadat node is gebouwd als een gedeelde bibliotheek, is deze beperking weggegaan omdat alle oorspronkelijke modules gekoppeld waren aan `node. tot`, waarvan de naam niet veranderd hoefde te worden.

## Steun native modules

[Inheemse modules](https://nodejs.org/api/addons.html) in node werken door een item functie te definiëren voor node om te laden, en doorzoek vervolgens de symbolen van V8 en libuv van Node. Dit is een beetje problemen voor embedders omdat standaard de symbolen van V8 en libuv verborgen zijn wanneer het bouwen van node als bibliotheek en native modules niet zal lukken omdat ze de symbolen niet kunnen vinden.

Dus om inheemse modules te laten werken, werden de V8 en libuv symbolen getoond in Electron. Voor V8 wordt dit gedaan door [alle symbolen in Chromium configuratiebestand te dwingen om te worden blootgesteld](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). Voor libuv wordt deze bereikt door [de `BUILDING_UV_SHARED=1` definitie](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228) in te stellen.

## Knooppunt in uw app starten

Na al het werk om te bouwen en te koppelen met Node, is de laatste stap om Node in de app te draaien.

Node bevat niet veel openbare API's voor het embedden van zichzelf in andere apps. Normaal gesproken kunt u [`node::Start` en `node::Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) bellen om een nieuw exemplaar van node te starten. Echter, als u een complexe app bouwt op basis van Node, je moet API's gebruiken zoals `node::CreateEnvironment` om elke stap precies te regelen.

In Electron is Node gestart in twee modi: de standalone modus die draait in het hoofdproces, die vergelijkbaar is met de officiële Node binaries en de ingesloten modus die Node API's in de webpagina's invoegt. De details hiervan worden uitgelegd in een toekomstige post.

