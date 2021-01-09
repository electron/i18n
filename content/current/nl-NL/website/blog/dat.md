---
title: 'Project van de week: Dat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

Het aanbevolen project van deze week is [Dat](https://datproject.org/), een [met subsidies](https://changelog.com/rfc/6), open source, gedecentraliseerde tool voor het verspreiden van gegevenssets. Dat is gebouwd en onderhouden door een [gedistribueerd team](https://datproject.org/team), van wie velen hebben geholpen dit bericht te schrijven.

---

[![Een schermafbeelding van de hoofdweergave van dat-desktop, die enkele rijen gedeelde
gegevens toont](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## Wat is dat?

We wilden de beste onderdelen van peer naar peer en gedistribueerde systemen brengen naar het delen van gegevens. We zijn begonnen met het delen van wetenschappelijke gegevens en vervolgens begonnen met het verhuizen naar onderzoeksinstellingen, overheid, openbare dienstverlening en open source-teams.

Een andere manier om erover na te denken is een sync en upload een app zoals Dropbox of BitTorrent Sync, behalve dat dit [opensource](https://github.com/datproject) is. Ons doel is om een krachtige, open source, non-profit data sharing software te zijn voor grote, kleine, middelgrote en kleine batch en grote gegevens.

Om de `dat` CLI tool te gebruiken, hoef je alleen maar te typen is:

```sh
dat deel pad/naar/mijn/map
```

En dat zal een link maken die je kunt gebruiken om die map naar iemand anders te sturen -- geen centrale servers of derden krijgen toegang tot je gegevens. In tegenstelling tot BitTorrent, is het ook onmogelijk om te sniff die delen wat ([zie het Dat Papieren concept voor meer details](https://github.com/datproject/docs/blob/master/papers/dat-paper.md)).

## Nu weten we wat dat is. Hoe past dat Desktop erin?

[Dat Desktop](https://github.com/datproject/dat-desktop) is een manier om dat toegankelijk te maken voor mensen die de opdrachtregel niet kunnen of niet willen gebruiken. U kunt meerdere gegevens hosten op uw machine en de gegevens bedienen via uw netwerk.

## Kun je wat coole gebruikskistjes delen?

### DataRefuge + Projectvalbard

We werken aan een ding gecodeerd [Project Svalbard](https://github.com/datproject/svalbard) dat gerelateerd is aan [DataRefuge](http://www.ppehlab.org/datarefuge), een groep die zich inzet voor het ondersteunen van klimaatgegevens van de overheid die het risico lopen te verdwijnen. Svalbard is vernoemd naar de Svalbard Global Seed Vault in de Arctische regio, die een grote ondergrondse reservekopie van plant DNAND heeft. Onze versie is een grote, gecontroleerde verzameling van publieke wetenschappelijke datasets. Zodra we de metagegevens kennen en kunnen vertrouwen, kunnen we andere coole projecten bouwen, zoals een [gedistribueerd vrijwilligers-gegevensopslagnetwerk](https://github.com/datproject/datasilo/).

### Californië Civiele Data Coalition

[CACivicData](http://www.californiacivicdata.org/) is een open-source archief dat dagelijks gebruikt wordt voor het downloaden van CAL-ACCESS, California's database die geld ophaalt in de politiek. Ze doen [dagelijkse releases](http://calaccess.californiacivicdata.org/downloads/0), wat betekent dat er veel dubbele data worden gehost in hun zip-bestanden. We werken aan het hosten van hun data als een Dat repository dat het aantal gedoe en bandbreedte vermindert dat nodig is om naar een specifieke versie te verwijzen of bij te werken naar een nieuwere versie.

## Elektron updates

Deze is nog niet concreet, maar we denken dat een leuke case zou zijn het plaatsen van een gecompileerde Electron app in een Die repository, dan een die client in Electron gebruiken om de nieuwste deltas van de gebouwde app binary te trekken om te besparen op downloadtijd, maar ook om de bandbreedtekosten voor de server te verminderen.

## Wie moet dit bureaublad gebruiken?

Iedereen die gegevens wil delen en bijwerken via een p2p-netwerk. Data wetenschappers, open data hackers, onderzoekers, ontwikkelaars. We zijn super ontvankelijk voor feedback als iemand een coole gebruikszaak heeft waar we nog niet aan hebben gedacht. Je kunt via onze [Gitter Chat](https://gitter.im/datproject/discussions) komen en ons iets vragen!

## Wat komt er hierna in data en dat Desktop?

Gebruikersaccounts en metagegevens publiceren. We werken aan een Dat register web app om te worden geïmplementeerd in [datum. rg](https://datproject.org/) dat in feite een 'NPM voor datasets' zal zijn behalve de caveat zijn we gewoon een metadata map en de gegevens kunnen overal online live gaan (in tegenstelling tot NPM of GitHub waar alle gegevens centraal worden hostd, Omdat de broncode klein genoeg is kan je alles in één systeem passen). Omdat veel datasets enorm zijn, hebben we een federated register nodig (vergelijkbaar met hoe BitTorrent trackers werken). Wij willen het gemakkelijk maken voor mensen om datasets te vinden of publiceren met het register van Dat Desktop, om het proces voor het delen van gegevens frictionloos te maken.

Een andere functie is multi-writer/samenwerkende mappen. We hebben grote plannen om gezamenlijke workflows te doen, misschien met filialen, vergelijkbaar met git, behalve ontworpen rond samenwerking op dataset. Maar we werken nog steeds aan algemene stabiliteit en standaardiseren onze protocollen nu!

## Waarom heb je ervoor gekozen om Dat Desktop op Electrono te bouwen?

Dat is gebouwd met behulp van Node.js, dus het was een natuurlijke geschiktheid voor onze integratie. Buiten dit gebruiken onze gebruikers verschillende machines sinds wetenschappers, Onderzoekers en overheidsambtenaren kunnen gedwongen worden bepaalde instellingen te gebruiken - dit betekent dat we zowel Windows en Linux als Mac moeten kunnen aanspreken. Het bureaublad geeft ons dat heel gemakkelijk.

## Wat zijn enkele uitdagingen waarmee je wordt geconfronteerd tijdens het bouwen van dat en dat Desktop?

Bewustzijn wat mensen willen. We begonnen met tabulaire datasets, maar we beseften dat het een beetje ingewikkeld was om op te lossen en dat de meeste mensen geen databank gebruiken. Dus halverwege het project hebben we alles van nul tot het gebruik van een bestandssysteem geherconstrueerd en niet achterom gekeken.

We stuitten ook op enkele algemene problemen met de infrastructuur van Electron, waaronder:

- Telemetrie - hoe maak je anonieme gebruiksstatistieken
- Updates - Het is soort stukmeel en magie om automatische updates op te zetten
- Releases - XCode ondertekening, bouw releases op Travis, do beta builds, allemaal waren uitdagingen.

We gebruiken ook Browserfor- en wat coole Browserfy Transformaties op de 'front end'-code in The Desktop (wat een soort rare is omdat we nog steeds bundelen ondanks dat we standaard `nodig` -- maar het is omdat we de Transforms willen). Om beter te helpen met het beheren van onze CSS hebben we van Sass naar [sheetify](https://github.com/stackcss/sheetify). Het heeft ons enorm geholpen onze CSS te moduleren en het makkelijker te maken om onze UI naar een component georiënteerde architectuur met gedeelde afhankelijkheden te verplaatsen. Bijvoorbeeld [dat-colors](https://github.com/Kriesse/dat-colors) bevat al onze kleuren en wordt gedeeld tussen al onze projecten.

We zijn altijd een grote fan geweest van normen en minimale abstracties. Onze hele interface is gebouwd met regelmatige DOM-knooppunten met slechts een paar helper bibliotheken. We zijn begonnen om enkele van deze componenten te verplaatsen naar [basiselementen](https://base.choo.io), een bibliotheek van laag herbruikbare componenten. Net als bij de meeste van onze technologie blijven we het herhalen, totdat we het goed aanpakken. maar als team hebben we het gevoel dat we hier de goede kant op gaan.

## Op welke gebieden moet Electron worden verbeterd?

Wij denken dat het grootste pijnpunt inheemse modules is. Het opnieuw opbouwen van uw modules voor Electron met npm voegt complexiteit toe aan de workflow. Ons team heeft een module ontwikkeld met de naam [`pre-build`](http://npmjs.org/prebuild) waarmee vooraf gebouwde binaries worden behandeld, die goed werkten voor Node, maar Electron workflows hebben nog steeds een aangepaste stap nodig na installatie, meestal `npm run rebuild`. Het was vervelend. Om dit aan te pakken zijn we onlangs overgestapt naar een strategie waarbij we alle gecompileerde binaire versies van alle platforms binnen het npm tarball bundelen. Dit betekent dat de tarballen groter worden (hoewel dit geoptimaliseerd kan worden met `. o` bestanden - gedeelde bibliotheken), deze benadering voorkomt dat post-install scripts moeten worden uitgevoerd en dat de `npm reorganiseert` patroon. Dit betekent dat `npm install` de eerste keer het juiste doet voor Electron.

## Wat zijn jouw lievelingsdingen over Electron?

De API's lijken redelijk goed doordacht, ze zijn relatief stabiel. en het doet vrij goed om op de hoogte te houden met de upstream Node releases, niet veel anders kunnen we vragen om!

## Heb je Electron tips die nuttig kunnen zijn voor andere ontwikkelaars?

Als je inheemse modules gebruikt, geef dan [voorbouw](https://www.npmjs.com/package/prebuild) een shot!

## Wat is de beste manier om data-ontwikkelingen te volgen?

Volg [@dat_project](https://twitter.com/dat_project) op Twitter of abonneer u op onze [e-mailnieuwsbrief](https://tinyletter.com/datdata).

