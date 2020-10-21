---
title: 'Electron Internals&#58; Message Loop Integratie'
author: zcbenz
date: '2016-07-28'
---

Dit is de eerste post van een serie met uitleg over de gebruikers van Electron. Dit bericht introduceert hoe Nodes event loop is geïntegreerd met Chromium in Electron.

---

Er zijn veel pogingen geweest om de node te gebruiken voor het programmeren van GUI, zoals [node-gui](https://github.com/zcbenz/node-gui) voor GTK+ bindings, en [node-qt](https://github.com/arturadib/node-qt) voor QT bindingen. Maar geen van hen werkt in de productie omdat GUI toolkits hun eigen bericht lussen hebben terwijl Node libuv voor zijn eigen event lus gebruikt, en de belangrijkste thread kan maar tegelijkertijd een lus uitvoeren. Dus de gebruikelijke truc om GUI berichtenloop uit te voeren in Node is om de berichtenloop in een tijdklok met zeer kleine interval, te pompen welke de GUI-interface reactie traag maakt en veel CPU-bronnen gebruikt.

Tijdens de ontwikkeling van Electron hebben we hetzelfde probleem ondervonden. maar op een omgekeerde manier: we moesten Nodes event loop integreren in Chromium's bericht lus.

## Het hoofdproces en het renderer proces

Voordat we in de details van de bericht-lusintegratie duiken, zal ik eerst de multiprocess-architectuur van Chromium uitleggen.

In Electron zijn er twee soorten processen: het hoofdproces en het renderer proces (dit is eigenlijk extreem vereenvoudigd. voor een volledige weergave kijk [multi-proces Architectuur](http://dev.chromium.org/developers/design-documents/multi-process-architecture)). Het hoofdproces is verantwoordelijk voor GUI werkt zoals het maken van vensters, terwijl het rendererproces alleen handelt met die draait en webpagina's weergeeft.

Electron staat het gebruik van JavaScript toe om zowel het hoofdproces als het renderer proces te besturen, wat betekent dat we node in beide processen moeten integreren.

## Het vervangen van Chromium's berichtenloop door libuv

Mijn eerste poging was de berichtenloop van Chromium opnieuw te implementeren met libuv.

Het was eenvoudig voor het renderer-proces, omdat de berichtenreeks alleen luisterde naar bestandsdescriptors en tijmers, en ik was alleen nodig om de interface met libuv te implementeren.

Het was echter beduidend moeilijker voor het hoofdproces. Elk platform heeft zijn eigen soort GUI berichtenlus. macOS Chromium gebruikt `NSRunLoop`, terwijl Linux gebruik maakt van glib. Ik heb veel hacks geprobeerd om de onderliggende bestandsbeschrijvingen uit de oorspronkelijke GUI berichtenloop te halen, en gaf ze vervolgens aan libuv voor herhalingen, maar ik ontmoette nog steeds koortsachtige gevallen die niet werkten.

Dus uiteindelijk heb ik een timer toegevoegd om de GUI berichtlus te onderzoeken in een kleine interval. As a result the process took a constant CPU usage, and certain operations had long delays.

## Polling Nodes event loop in een aparte thread

Toen libuv tot wasdom kwam, was het mogelijk om een andere aanpak te volgen.

Het concept van de backend fd fd is geïntroduceerd in libuv, een bestandsbeschrijving (of hand) die libuv polls voor de event loop heeft. Dus door de backend fd fd te polsen is mogelijk om een melding te krijgen wanneer er een nieuw evenement in libuv is.

Dus in Electron heb ik een aparte thread gemaakt om de backend fd te onderzoeken, en omdat ik de systeem oproepen voor polling in plaats van libuv API's gebruikte, was het draad veilig. En wanneer er een nieuwe gebeurtenis in de gebeurtenislus was, zou een bericht worden geplaatst in de berichtenloop van Chromium, en de gebeurtenissen van libuv zullen dan worden verwerkt in de hoofdthread.

Op deze manier heb ik het patchen van Chromium en Node voorkomen en dezelfde code werd gebruikt in zowel de hoofd- als renderer-processen.

## De code

Je vindt de implemention van de berichtenloop integratie in de `node_bindings` bestanden onder [`electron/atom/common/`](https://github.com/electron/electron/tree/master/atom/common). Het kan gemakkelijk worden hergebruikt voor projecten die Node willen integreren.

