---
title: 'Electron Interns: Chromium bouwen als een bibliotheek'
author: zcbenz
date: '2017-03-03'
---

Electron is gebaseerd op Google's open-source Chromium, een project dat niet noodzakelijk ontworpen is om te worden gebruikt door andere projecten. Dit bericht introduceert hoe Chromium is gebouwd als een bibliotheek voor het gebruik van Electron, en hoe het build systeem door de jaren heen is geëvolueerd.

---

## CEF gebruiken

Het Chromium ingesloten framework (CEF) is een project dat Chromium in een bibliotheek van verandert, en stabiele API's op basis van Chromium codebase. Zeer vroege versies van Atom editor en NW.js gebruikt CEF.

Om een stabiele API te behouden, verbergt CEF alle details van Chromium en wraps Chromium's API's met zijn eigen interface. Dus toen we toegang nodig hadden tot onderliggende Chromium APIs, zoals het integreren van Node.js in webpagina's, werden de voordelen van CEF blockers.

Dus uiteindelijk zijn zowel Electron als NW.js direct overgeschakeld naar het gebruik van Chromium's API's .

## Bouwen als onderdeel van Chromium

Hoewel Chromium geen officieel externe projecten ondersteunt, de codebase is modulair en het is makkelijk om een minimale browser te bouwen gebaseerd op Chromium. De core module die de browserinterface biedt, heet Content Module.

Om een project met contentmodule te ontwikkelen, is de eenvoudigste manier om het project te bouwen als onderdeel van Chromium. Dit kan worden gedaan door eerst de broncode van Chromium te bekijken, en vervolgens het project toe te voegen aan Chromium `DEPS` bestand.

NW.js en zeer vroege versies van Electron gebruiken deze manier om te bouwen.

De keerzijde is, Chromium is een zeer grote codebase en vereist zeer krachtige machines om te bouwen. Voor normale laptops kan dat meer dan 5 uur duren. Dus dit heeft een grote impact op het aantal ontwikkelaars dat kan bijdragen aan het project, en het maakt ontwikkeling ook langzamer.

## Chromium bouwen als één gedeelde bibliotheek

As a user of Content Module, Electron does not need to modify Chromium's code under most cases, so an obvious way to improve the building of Electron is to build Chromium as a shared library, and then link with it in Electron. Op deze manier hoeven ontwikkelaars niet langer alle Chromium te bouwen om bij te dragen aan Electron.

Het [libchromiumcontent](https://github.com/electron/libchromiumcontent) project is gemaakt door [@aroben](https://github.com/aroben) voor dit doel. Het bouwt de Content Module van Chromium als een gedeelde bibliotheek, en biedt vervolgens Chromium's headers en vooraf gebouwde binaries om te downloaden. De code van de eerste versie van libchromiumcontent is te vinden [in deze link](https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c).

Het [heldertray](https://github.com/electron/brightray) project is ook geboren als onderdeel van libchromiumcontent, dat een dunne laag biedt rond de Content Module.

Door libchromiumcontent en helder samen te gebruiken, kunnen ontwikkelaars snel een browser bouwen zonder in de details van Chromium te komen. En het schrapt de eis van een snel netwerk en krachtige machine om het project te bouwen.

Behalve Electron waren er ook andere Chromiumgebaseerde projecten gebouwd op deze manier, zoals de [Breach browser](https://www.quora.com/Is-Breach-Browser-still-in-development).

## Geëxporteerde symbolen filteren

Op Windows is er een beperking van hoeveel symbolen een gedeelde bibliotheek kan exporteren. Naarmate de codebase van Chromium groeide, overschreed het aantal geëxporteerde symbolen in libchromiumcontent de limiet snel.

De oplossing was het uitfilteren van niet-benodigde symbolen bij het genereren van het DLL-bestand. Het werkte door [een `. ef` bestand naar de linker](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b), en vervolgens een script gebruiken om [te beoordelen of symbolen onder een naamruimte geëxporteerd moeten worden](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd).

Door deze aanpak bleef Chromium echter nieuwe geëxporteerde symbolen toevoegen, libchromiumcontent kan nog steeds gedeelde bibliotheekbestanden genereren door meer symbolen te verwijderen.

## Component bouwen

Voordat u over de volgende stappen in libchromiumcontent praat, is het belangrijk om eerst het concept van componentbouw in Chromium te introduceren.

Als enorm project duurt de koppelingsstap zeer lang in Chromium wanneer hij bouwt. Normaal gesproken wanneer een ontwikkelaar een kleine verandering aanbrengt, kan het 10 minuten duren om de uitkomsten te zien. Om dit op te lossen introduceert Chromium component build, welke elke module in Chromium als gescheiden gedeelde bibliotheken bouwt, zodat de tijd die doorgebracht wordt in de laatste linkstap onmerkbaar wordt.

## Verzend ruwe binaries

Met Chromium blijft groeien, er waren zo veel geëxporteerde symbolen in Chromium dat zelfs de symbolen van Content Module en Webkit meer waren dan de limitatie. Het was onmogelijk om een bruikbare gedeelde bibliotheek te genereren door simpelweg ontkoppelende symbolen.

Uiteindelijk moesten we [de ruwe binaries van Chromium](https://github.com/electron/libchromiumcontent/pull/98) verzenden in plaats van een enkele gedeelde bibliotheek te genereren.

Zoals eerder geïntroduceerd zijn er twee bouwmodi in Chromium. Als gevolg van onbewerkte binars moeten we twee verschillende distributies van binaries verzenden in libchromiumcontent. Een wordt `static_library` build, die alle statische bibliotheken bevat van elke module gegenereerd door de normale versie van Chromium. De andere is `shared_library`, die alle gedeelde bibliotheken van elke module bevat die gegenereerd zijn door de component build.

In Electron is de Debug versie gekoppeld aan de `shared_library` versie van libchromiumcontent omdat het klein is om te downloaden en weinig tijd in beslag te nemen bij het linken van het uitvoerbare eindbestand. En de releasase versie van Electron is gekoppeld aan de `static_library` versie van libchromiumcontent, zodat de compiler volledige symbolen kan genereren die belangrijk zijn voor foutopsporing, en de linker kan veel betere optimalisatie doen, omdat het weet welke objectbestanden nodig zijn en welke niet.

Dus voor normale ontwikkeling hoeven ontwikkelaars alleen de Debug versie te bouwen, waarvoor geen goed netwerk of krachtige machine nodig is. Hoewel de Release versie dan veel betere hardware nodig heeft om te bouwen, kan het betere geoptimaliseerde binaries genereren.

## De `gn` update

Als een van de grootste projecten ter wereld zijn de meeste normale systemen niet geschikt voor het bouwen van Chromium, en het Chromium team ontwikkelt hun eigen build hulpmiddelen.

Eerdere versies van Chromium gebruikten `gyp` als een build-systeem, maar het lijdt aan langzaamheid, en het configuratiebestand wordt moeilijk te begrijpen voor complexe projecten. Na jaren ontwikkeling is Chromium overgestapt op `gn` als een bouwsysteem, dat veel sneller is en een duidelijke architectuur heeft.

Een van de verbeteringen van `gn` is om `source_set`in te voeren, die een groep objectbestanden vertegenwoordigt. In `gyp`werd elke module vertegenwoordigd door `static_library` of `shared_library`, en voor de normale build van Chromium, elke module genereerde een statische bibliotheek en ze werden aan elkaar gekoppeld in het finale uitvoerbaar. Door `gn`te gebruiken, genereert elke module nu alleen nog een aantal objectbestanden, en het laatste uitvoerbare bestand koppelt gewoon alle objectbestanden samen, dus de tussenliggende bibliotheekbestanden worden niet langer gegenereerd.

Deze verbetering maakte echter grote moeite met libchromiumcontent omdat de tussenliggende bestanden van de bibliotheek nodig waren door libchromiumcontent.

De eerste poging om dit op te lossen was met [patch `gn` voor het genereren van statische bibliotheek bestanden](https://github.com/electron/libchromiumcontent/pull/239), die het probleem heeft opgelost, maar die was verre van een fatsoenlijke oplossing.

De tweede poging is gemaakt door [@alespergl](https://github.com/alespergl) tot [aangepaste statische bibliotheken uit de lijst van objectbestanden](https://github.com/electron/libchromiumcontent/pull/249). Het gebruikte een truc om eerst een dummy gebouw uit te voeren om een lijst van gegenereerde objectbestanden, te verzamelen en bouw vervolgens de statische bibliotheken door `gn` te voeden met de lijst. Het heeft slechts minimale wijzigingen aangebracht in Chromium's broncode en hield de bouw architectuur van Electronus nog steeds.

## Summary

Zoals u kunt zien, vergeleken met het bouwen van Electron als onderdeel van Chromium, het bouwen van Chromium als bibliotheek kost meer inspanningen en vereist continu onderhoud. De laatste verwijdert echter de vereiste van krachtige hardware om Electroon te bouwen dus een veel groter bereik van ontwikkelaars in staat te stellen om te bouwen en om bij te dragen aan Electron. Het is de moeite absoluut waard.

