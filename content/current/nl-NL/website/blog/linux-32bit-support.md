---
title: Onderhoud ondersteuning voor 32-bit Linux
author: felixrieberg
date: '2019-03-04'
---

Het Electron team zal de ondersteuning voor 32-bit Linux (ia32 / i386) starten met Electron v4.0. De laatste versie van Electron die 32-bit gebaseerde installaties van Linux ondersteunt is Electron v3.1, die ondersteuning ontvangt tot Electron v6 is vrijgegeven. Ondersteuning voor 64-bit gebaseerde Linux en `armv7l` zal ongewijzigd blijven.

---

## Wat steunt Electron eigenlijk niet meer?

U kunt de beschrijving "64-bit" en "32-bit" hebben gezien als stickers op uw computer of als opties voor het downloaden van software. De term wordt gebruikt om een specifieke computerarchitectuur te beschrijven. De meeste computers die in de jaren negentig en het begin van de jaren 2000 zijn gemaakt, zijn gemaakt met CPU's die waren gebaseerd op de 32-bits architectuur. terwijl de meeste computers die later werden gemaakt gebaseerd waren op de nieuwere en krachtigere architectuur van de 64-bits. De Nintendo 64 (pak ze? en de PlayStation 2 waren de eerste op grote schaal beschikbare consumentenapparaten met de nieuwe architectuur, waren er bijna uitsluitend 64-bits verwerkers verkocht na 2010. Als gevolg daarvan is de ondersteuning aan het krimpen: Google is gestopt met het uitbrengen van Chrome voor 32 bit Linux in maart 2016, Canonical heeft in 2017 geen 32-bits bureaublad meer aangeleverd en heeft ondersteuning voor 32 bit samen met Ubuntu 18.10 laten vallen. Arch Linux, elementaire OS en andere prominente Linux-distributies hebben de ondersteuning voor de aging processor architectuur al laten vallen.

Tot nu toe heeft Electron bouwwerken geleverd en ondersteund die op de oudere 32-bits architectuur draaien. Vanaf release v4.0 zal het Electron team niet langer in staat zijn om binaries of ondersteuning voor 32-bit Linux aan te bieden.

Electron is altijd een levendig open source project geweest en we blijven ontwikkelaars steunen en aanmoedigen die geïnteresseerd zijn in het bouwen van Electron voor exotische architecturen.

## Wat betekent dat voor ontwikkelaars?

Als je momenteel geen 32-bit distributies van je app voor Linux aanbiedt, is er geen actie vereist.

Projecten die verzenden van 32-bit Linux Electron applicaties zullen moeten beslissen hoe ze verder moeten. 32-bits Linux zal worden ondersteund op Electron 3 [tot](https://electronjs.org/docs/tutorial/support#supported-versions) de vrijlating van Electron 6, wat enige tijd geeft om besluiten en plannen te maken.

## Wat betekent dat voor de gebruikers?

Als u een Linux-gebruiker bent en niet zeker of u een 64-bit gebaseerd systeem gebruikt, je zult waarschijnlijk rennen op een 64-bits gebaseerde architectuur. Om zeker te zijn, kun je de `lscpu` of `naam -m` commando's in je terminal uitvoeren. Ofwel wordt je huidige architectuur afgedrukt.

Als je Linux gebruikt op een 32-bits processor, heb je waarschijnlijk al problemen ondervonden bij het vinden van recent vrijgegeven software voor je besturingssysteem. Het Electron team sluit zich aan bij andere prominente leden van de Linux gemeenschap door aan te raden om te upgraden naar een 64-bit gebaseerde architectuur.
