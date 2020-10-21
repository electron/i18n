---
title: 'Project van de week: WordPress Desktop'
author:
  - mkaz
  - Johngodley
  - zeke
date: '2017-02-28'
---

Deze week hebben we ingehaald bij mensen van [Automattisch](https://automattic.com/) tot over [WordPress Desktop](https://apps.wordpress.com/desktop/), een open-source desktop client voor het beheren van WordPress-inhoud.

---

[![WordPress apps](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## Iedereen weet van WordPress, maar wat is WordPress Desktop?

De [WordPress. Met de desktop-app](https://apps.wordpress.com/desktop/) kunt u zich concentreren op uw inhoud en ontwerp zonder browsertabbladen om u af te leiden - of uw sites buiten de deur te houden, maar toegankelijk houden. In combinatie met onze browserondersteuning en mobiele app kunt u uw site overal bouwen, op welke manier dan ook om uw werk te doen.

## Waarom een Desktop app bouwen voor het beheren van WordPress-websites? Kon het niet allemaal webgebaseerd zijn?

Het gebruikt eigenlijk precies dezelfde technologie die u krijgt wanneer u [WordPress.com](https://wordpress.com) bezoekt in uw browser. Het is echter allemaal lokaal gehost, dus het heeft minimale laadtijden. Met het voordeel van inheemse functies zoals het zijn in je dock, meldingen, enz., kunt u zich echt concentreren op uw WordPress-sites en bloggen.

## Waarom heeft u ervoor gekozen om WordPress Desktop op Electrono te bouwen?

Eind 2015 hebben we veel WordPress.com opnieuw opgebouwd in de vorm van [Calypso](https://github.com/automattic/wp-calypso), een open source moderne JavaScript-app met React. We zijn begonnen te kijken naar Electron en met enkele wijzigingen in Calypso konden we het lokaal laten draaien. Het was een dwingende ervaring en we dachten dat het veel waarde had om deze verder te ontwikkelen.

We hadden verschillende teams die aan Calypso werkten. Om een volledige multi-platform GUI-client te maken die dit koppelt aan traditionele desktoptechnologieën, zou meer werk hebben verzet. Door Electron te gebruiken een klein team van 2-4 van ons was in staat om de inspanningen van het andere team te bundelen en de Desktop app te bouwen in een paar maanden.

## Wat zijn enkele uitdagingen waarmee u wordt geconfronteerd tijdens het bouwen van WordPress Desktop?

We hebben een eerste versie van de app zeer snel laten werken. maar het afstemmen ervan voor een optimaal gedrag als een desktopapp heeft veel meer tijd in beslag genomen. Een grote uitdaging met de app is dat je eigenlijk een kopie van Calypso op je eigen machine hebt - het is puur een door de API gedreven UI. Daarbij was veel overbruggingswerk gemoeid en er waren veranderingen aan Calypso zelf te wijten.

Daarnaast is er veel energie gestoken in de verpakking van de app voor verschillende platforms - we bieden Windows aan, macOS en Linux versies - en er zijn voldoende verschillen om dit lastig te maken.

Op dat moment was Electron relatief nieuw en hielden we ons bezig met kwesties die binnenkort (soms dezelfde dag!) waren opgelost.

## Op welke gebieden moet Electron worden verbeterd?

Electron biedt al het meeste van wat we nodig hebben voor de desktop-app, en het is snel gevorderd sinds we het begon te gebruiken. Dat gezegd hebbende, zijn er enkele gebieden die vanzelfsprekend zijn in een desktop app, zoals spellingscontrole en vinden/vervanging die moeilijker te repliceren zijn met Electron als-is.

We zouden ook graag enkele van de nieuwere Chrome technologieën zien filteren naar Electron. We zijn erg blij met WebVR te experimenteren.

## Wat zijn jouw lievelingsdingen over Electron?

De belangrijkste reden dat we Electron hebben gekozen, en het is de grootste kracht, is de zeer actieve en open gemeenschap. Automatisch heeft altijd geloofd in open source. Het is een van onze grondbeginselen en het Electron project en de gemeenschap volgen veel van de kernovertuigingen dat ze zeer open en positief zijn.

## Wat komt er hierna in WordPress Desktop?

Het mooie aan ons model is dat de Desktop app profiteert van elke nieuwe Calypso functie - er zijn constante verbeteringen. We hopen dat we extra functies aan de app kunnen toevoegen, zoals offline ondersteuning. die de app echt op zijn eigen grondgebied zou brengen, en betere systeemmeldingen.

## Zijn er teams in Automattic die aan andere Electron apps werken?

Ja, na onze inspanningen voor de desktop-app, het Simplenote team heeft besloten Electron te gebruiken om desktop apps voor Windows en Linux te bouwen (een native Mac client bestaat). De [Simplenote Electron app](https://github.com/Automattic/simplenote-electron) is ook open source en beschikbaar op Github.

We hebben ook een aankomende Raspberry Pi-integratie die Electron gebruikt.

Als een van dat interessant klinkt, zouden we [graag van je](https://automattic.com/work-with-us/) horen!

## Heb je Electron tips die nuttig kunnen zijn voor andere ontwikkelaars?

Het proces van de verzending met ondertekende desktop software is relatief nieuw voor ons, vooral voor Windows. We hebben een artikel geschreven voor [Code ondertekenen van een Windows App](https://mkaz.blog/code/code-signing-a-windows-application/) dat het proces en een paar van de obstakels bevat die we hebben doorlopen om het goed te doen.

