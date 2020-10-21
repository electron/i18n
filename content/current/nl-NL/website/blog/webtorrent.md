---
title: 'Project van de week: WebTorrent'
author:
  - feross
  - zeke
date: '2017-03-14'
---

Deze week hebben we [@feross](https://github.com/feross) en [@dcposch](https://github.com/dcposch) opgepakt om over WebTorrent te praten, de torrent-client die gebruikers verbindt om een gedistribueerd, gedecentraliseerd browser-naar-browsernetwerk te vormen.

---

## Wat is WebTorrent?

[WebTorrent](https://webtorrent.io) is de eerste torrent client die in de browser werkt. Het is volledig geschreven in JavaScript en het kan WebRTC gebruiken voor peer-to-peer transport. Geen browser plugin, extensie of installatie is vereist.

Met behulp van open webnormen, WebTorrent verbindt website gebruikers samen om een gedistribueerd, gedecentraliseerd browser-naar-browser netwerk te vormen voor efficiënte bestandsoverdracht.

Je kunt hier een demo van WebTorrent zien: [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="webtorrent homepage" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## Waarom is dit cool?

Stel je een videosite voor zoals YouTube, maar waar bezoekers helpen om de inhoud van de site te hosten. Hoe meer mensen een WebTorrent-aangedreven website gebruiken, hoe sneller en veerkrachtiger deze wordt.

Met browser-to-browser knipt de communicatie de middenstand uit en laat mensen communiceren op hun eigen voorwaarden. Geen client/server meer – alleen een netwerk van peers, allemaal gelijk. WebTorrent is de eerste stap in de reis om het web te decentraliseren.

## Waar komt Electron op de foto terecht?

Ongeveer een jaar geleden hebben we besloten om [WebTorrent Desktop](https://webtorrent.io/desktop/)te bouwen, een versie van WebTorrent die wordt uitgevoerd als een desktop app.

[![WebTorrent Desktop speler venster](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

We hebben een WebTorrent Desktop gemaakt om drie redenen:

1. We willen een schoone, lichtgewicht en advertentieve, open source torrent-app
2. We wilden een torrent app met goede streaming ondersteuning
3. We hebben een "hybride client" nodig die de BitTorrent en WebTorrent netwerken verbindt

## Als we al torrents in mijn webbrowser kunnen downloaden, waarom een desktopapplicatie?

Ten eerste een beetje achtergrond op het ontwerp van WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="webtorrent desktop logo" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

In de begindagen gebruikte BitTorrent TCP als zijn transportprotocol. Later kwam uTP met beloften voor betere prestaties en extra voordelen ten opzichte van TCP. Elke mainstream torrent client heeft uiteindelijk uTP aangenomen, en vandaag kun je BitTorrent over een van beide protocollen gebruiken. Het WebRTC-protocol is de volgende logische stap. Het brengt de belofte van interoperabiliteit met webbrowsers – een gigant P2P-netwerk bestaande uit alle desktop BitTorrent-clients en miljoenen webbrowsers.

"Web peers" (torrent peers die in een webbrowser draaien) maakt het BitTorrent-netwerk sterker door het toevoegen van miljoenen nieuwe peers, en verspreiding van BitTorrent naar tientallen nieuwe gebruiksgevallen. WebTorrent volgt de BitTorrent spec zo nauw mogelijk, om het voor bestaande BitTorrent clients gemakkelijk te maken om ondersteuning toe te voegen voor WebTorrent.

Sommige torrent apps zoals [Vuze](https://www.vuze.com/) ondersteunen web-peers, maar we wilden niet wachten tot de rest ondersteuning toevoegde. **In principe was het WebTorrent Desktop onze manier om de aanneming van het WebTorrent-protocol te versnellen.** Door een geweldige torrent app te maken die mensen echt willen gebruiken we verhogen het aantal peers in het netwerk dat torrents kan delen met webpeers (i. . gebruikers op websites).

## Wat zijn interessante gebruiksgevallen voor torrents boven wat mensen al weten dat ze kunnen doen?

Een van de meest opwindende toepassingen voor WebTorrent is de levering met peer-ondersteuning. Niet-winstgevende projecten zoals [Wikipedia](https://www.wikipedia.org/) en het [Internet Archive](https://archive.org/) kunnen bandbreedte en hosting kosten verminderen door bezoekers in te laten bijspringen. Populaire inhoud kan snel en goedkoop worden gediend met browser. Zeldzame geopende inhoud kan betrouwbaar via HTTP vanuit de oorsprongserver worden geserveerd.

Het internet archief heeft zijn torrent bestanden al bijgewerkt zodat ze geweldig werken met WebTorrent. Dus als u inhoud van het internet archiveer wilt insluiten op uw site je kunt dit doen op een manier die de hosting kosten voor het archief verlaagt, laat ze meer geld besteden aan het archiveren van het web!

Er zijn ook spannende zakelijke gebruikszaken, van CDNs tot app levering via P2P.

## Wat zijn sommige van uw favoriete projecten die WebTorrent gebruiken?

![schermafbeelding van gaia app](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

Het coolste ding dat met WebTorrent, handen omlaag, is waarschijnlijk [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). Het is een vlotte 3D-interactieve simulatie van de Melkweg. De data wordt geladen van een torrent, rechts in uw browser. Het is adembenemend om door ons sterrensysteem te vliegen en zich te realiseren hoe weinig wij mensen zijn vergeleken met de enorme omvang van ons universum.

U kunt lezen hoe dit is gemaakt in [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), een blog post waar de auteur, Charlie Hoey, uitlegt hoe hij de ster kaart heeft gebouwd met WebGL en WebTorrent.

<a href="https://brave.com/">
  <img alt="Duurzaam logo" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

We zijn ook grote fans van [dappere](https://brave.com/). Dappere is een browser die automatisch advertenties en trackers blokkeert om het web sneller en veiliger te maken. Dappere onlangs toegevoegde torrent-ondersteuning, zodat u [traditionele torrents kunt bekijken zonder een aparte app](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/) te gebruiken. Die functie wordt aangedreven door WebTorrent.

Dus, net zoals hoe de meeste browsers PDF-bestanden kunnen renderen, kan Brave magnet links en torrent bestanden renderen. Het gaat gewoon om een ander type inhoud die de browser ondersteunt.

Een van de medeoprichters van Brave is eigenlijk Brendan Eich, de maker van JavaScript, de taal die we WebTorrent hebben geschreven, zodat we denken dat het vrij cool is dat Brave ervoor heeft gekozen om WebTorrent te integreren.

## Waarom heb je ervoor gekozen om WebTorrent Desktop op Electron te bouwen?

<a href="https://webtorrent.io/desktop/">
  <img alt="Hoofdvenster van WebTorrent Desktop" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Er is een meme dat Electron apps "opgeblazen" zijn omdat ze de gehele Chrome content module in elke app bevatten. In sommige gevallen is dit gedeeltelijk waar (een Electron app installateur is meestal ~40MB, waar een OS-specifieke app installer meestal ~20MB is).

In het geval van de WebTorrent Desktop gebruiken we echter bijna elke Electron functie en vele tientallen Chrome functies in de normale werking. Als we deze functies willen implementeren vanaf nul voor elk platform, het zou maanden of jaren langer hebben geduurd om onze app te bouwen, of we zouden maar één platform hebben kunnen vrijgeven.

Om een idee te krijgen, gebruiken we de [dock integratie van Electron](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (om de download voortgang weer te geven), [menubalk integratie](https://electronjs.org/docs/api/menu) (uitvoeren op de achtergrond), [protocol handler registratie](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (om magneetlinks te openen), [energiebesparing blocker](https://electronjs.org/docs/api/power-save-blocker/) (om slaapstand te voorkomen tijdens het afspelen van de video), en [automatische updater](https://electronjs.org/docs/api/auto-updater). Voor Chrome functies gebruiken we meer: de `<video>` tag (om veel verschillende video formaten af te spelen), de `<track>` tag (voor ondersteuning van gesloten bijnamen), ondersteuning voor slepen en neerzetten, en WebRTC (wat niet triviaal is om te gebruiken in een native app).

Niet te vermelden: onze torrent engine is geschreven in JavaScript en gaat ervan uit dat er veel Node API's bestaan, maar vooral `require('net')` en `require('dgram')` voor TCP en UDP socket ondersteuning.

Electron is in principe precies wat we nodig hadden en had de precieze set van functies die we nodig hadden om een solide, gepolijste app te verzenden in recordtijd.

## Wat zijn jouw lievelingsdingen over Electron?

De WebTorrent-bibliotheek is al twee jaar in ontwikkeling als open source side project. **In vier weken hebben we WebTorrent Desktop gemaakt.** Electron is de voornaamste reden dat we onze app zo snel konden bouwen en verzenden.

Net zo nee. s made server programming toegankelijk voor een generatie jQuery-using front-end programmeurs, Electron maakt native app ontwikkeling toegankelijk voor iedereen die vertrouwd is met Web of Node. s ontwikkeling. Electron is extreem empowerment.

## Delen de website en de desktop-client code?

Ja, het [`webtorrent` npm package](https://npmjs.com/package/webtorrent) werkt in Node.js, in de browser en in Electron. Dezelfde code kan in alle omgevingen worden uitgevoerd - dit is de schoonheid van JavaScript. Het is vandaag de universele runtime Java Applets beloofde "Write Once, Run Anywhere" apps, maar die visie is nooit echt gematerialiseerd om een aantal redenen. Electron, meer dan elk ander platform, komt in de buurt van dat ideaal.

## Wat zijn enkele uitdagingen waarmee je wordt geconfronteerd bij het bouwen van WebTorrent?

In vroege versies van de app hebben we de gebruikersinterface moeilijk gemaakt. We zetten de torrent engine in hetzelfde renderer proces dat het belangrijkste app venster tekent, wat voorspelbaar is. leidt tot traagheid op elk moment dat er intense CPU activiteit is van de torrent engine (zoals verifiëren van de torrent stuks ontvangen van peers).

We hebben dit opgelost door de torrent engine te verplaatsen naar een seconde, onzichtbare renderer proces waarmee we communiceren met [IPC](https://electronjs.org/docs/api/ipc-main/). Op deze manier, als dat proces kort gebruik maakt van een heleboel CPU, zal de UI-thread niet worden beïnvloed. Vlinderen-vloeiend scrollen en animaties zijn zo bevredigend.

Opmerking: we moesten de torrent engine in een renderer proces zetten, in plaats van een "main" proces. omdat we toegang nodig hebben tot WebRTC (die alleen beschikbaar is in de renderer.)

## Op welke gebieden moet Electron worden verbeterd?

Een ding dat we graag zouden willen zien is een betere documentatie over het bouwen en verzenden van productie-gerichte apps, vooral rond lastige onderwerpen zoals code-ondertekening en auto-updating. We moesten leren over beste praktijken door in broncode te graven en om je heen te vragen op Twitter!

## Is het WebTorrent Desktop gedaan? Zo niet, wat komt er dan na?

Wij vinden de huidige versie van WebTorrent Desktop uitstekend, maar er is altijd ruimte voor verbetering. We werken momenteel aan het verbeteren van de ondersteuning, post, prestaties, ondertiteling en video codec ondersteuning.

Als je geïnteresseerd bent in betrokkenheid bij het project, bekijk dan [onze GitHub pagina](https://github.com/feross/webtorrent-desktop)!

## Heb je Electron ontwikkelings tips die nuttig kunnen zijn voor andere ontwikkelaars?

[Feross](http://feross.org/), een van de WebTorrent Desktop bijdragers, Onlangs gaf een gesprek *"Echte wereld Electron: Bouw Cross-platform desktop apps met JavaScript"* in NodeConf Argentinië, dat nuttige tips bevat voor het publiceren van een gepolijste Electron app. Het praten is vooral handig als u zich in het stadium bevindt waarin u een basiswerk-app heeft en u probeert deze naar het volgende niveau van poëzie en professionaliteit te brengen.

[Kijk hier](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[slides hier](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), een andere WebTorrent bijdrager, schreef [een checklist van dingen die u kunt doen](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) om uw app zich gepolijst en kinderbaar te laten voelen. Het komt met code voorbeelden en dekt zaken zoals macOS dock-integratie, sleen-drop, desktopmeldingen en zorg ervoor dat uw app snel laadt.

