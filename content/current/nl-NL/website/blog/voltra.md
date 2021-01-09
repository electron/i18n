---
title: 'Project van de week: Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '2017-03-07'
---

Deze week hebben we elkaar ontmoet met [Aprile Elcich](https://twitter.com/aprileelcich) en [Paolo Fragomeni](https://twitter.com/0x00A) om te praten over Voltra, een Electron-powered muziekspeler.

---

## Wat is Voltra?

[Voltra](https://voltra.co/) is een muziekspeler voor mensen die hun muziek willen bezitten. Het is ook een winkel waar je nieuwe muziek kunt ontdekken en kopen op basis van wat je al bezit. Het is advertentievrij, cross-platform voor desktop en mobiel. Het bespioneert je ook niet.

[![voltra-artiesten](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## Voor wie is het Voltra?

Iedereen die naar muziek luistert.

## Wat motiveerde je om Voltra te maken?

Radio heeft altijd een groot deel van luisteraars gehad. Het gaat van de luchtgolven af en op het internet. Nu kun je muziek op aanvraag huren - het is een radio-reactief! Er zijn veel nieuwe producten en diensten ontstaan als gevolg hiervan. maar streamen van radio laat nog steeds iemand anders de controle over jouw muziek en hoe je het ervaart.

We wilden een product dat volledig gericht was op muziek die je bezit. Iets dat het makkelijk maakte om nieuwe muziek rechtstreeks van artiesten of labels te ontdekken en te kopen.

## Is er een vrije versie?

De desktopspeler is volledig gratis. [Muziek verkopen is ook gratis!](https://voltra.co/artists) Wij worden niet ondersteund.

Aangezien de app gratis is, kunnen we deze later opstarten. Op dit moment hebben we geen bandbreedte om dat te beheren. We hebben ook zeer specifieke ideeën over kenmerken en de richting die we willen inslaan. We hebben een actieve bètagemeenschap en nemen onze feedback ter harte.

## Hoe verdien je geld?

We hebben premium functionaliteiten!

Ons [Voltra Audioarchief](https://voltra.co/premium/) is een cloud-back-upservice speciaal ontworpen voor muziek. Gegevensblokken worden niet gecomprimeerd of gedeeld. Je muziekcollectie is fysiek geback-upt.

Voor kunstenaars en labels biedt onze [Pro-lidmaatschap](https://voltra.co/artists/pro) tools aan om ze te helpen relevantere doelgroepen te bereiken, zoals analytics en professionele artiest webpagina's.

## Wat maakt Voltra anders?

Ontwerp en bruikbaarheid zijn ongelooflijk belangrijk voor ons. We willen luisteraars een afleidingsloze luisterervaring geven! Er zijn een aantal interessante muziekspelers en -winkels. Maar velen van hen zijn gevorderde en moeilijker te gebruiken dan hun scheppers beseffen. We willen Voltra toegankelijk maken voor zoveel mogelijk mensen.

We nemen ook geen snijpunt van de kunstenaar of het etiket. Dat is een belangrijke differentiator voor ons. Het is echt belangrijk omdat het de hindernis voor kunstenaars vermindert om hun muziek op de markt te brengen.

## Wat zijn design & technische besluiten die je hebt gemaakt?

Tijdens het ontwerpen van Voltra, hebben we interface-conventies van inheemse apps en het internet overwogen, we hebben ook veel nagedacht over wat we konden verwijderen. We hebben een actieve particuliere bètagroep die ons de afgelopen maanden kritisch heeft onthaald.

We vonden dat Albumhoes en fotografie echt belangrijk zijn voor mensen. Veel spelers zijn slechts lijsten met bestanden. Een van de leuke dingen over het bezit van fysieke albums is de albumhoek, en we wilden dit benadrukken in de Voltra desktop app.

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

We hebben er ook voor gezorgd dat mensen niet in de problemen geraken. We gebruiken bestanden om te kijken zodat je bestanden kunt plaatsen waar je maar wilt, en we hernoemen ze niet en verplaatsen ze niet voor jou. We hebben een ingesloten database om de status van de bekeken mappen te volgen, zodat we kunnen volgen wat er nieuw is zelfs wanneer het proces niet wordt uitgevoerd.

## Wat zijn enkele uitdagingen waarmee je wordt geconfronteerd bij het bouwen van Voltra?

We besteden veel tijd aan prestaties. We zijn begonnen met frameworks maar verplaatst naar vanilla Javascript. Uit ervaring weten we dat de algemene abstracties die zij bieden zwaarder wegen dan de prestatiestraffen en -ceremonie die zij introduceren.

We behandelen op dit moment zeer grote inzamelingen. Grote collecties betekenen mogelijk tienduizenden afbeeldingen! Knooppunt hebben. De bestandssysteemmodule direct beschikbaar vanuit het render proces heeft het erg makkelijk gemaakt om veel afbeeldingen te laden en te lossen, zeer snel gebaseerd op DOM-gebeurtenissen.

In het algemeen *[setOnmiddellijk](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)* en *[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)* zijn super belangrijke hulpmiddelen voor het uitvoeren van veel verwerkingen terwijl de gebruikersinterface responsief blijft. Het verdelen van CPU-gebonden taken in afzonderlijke processen draagt er echt toe bij dat de gebruikersinterface responsief blijft. We hebben bijvoorbeeld de audio-context in een apart proces verplaatst, communiceert er mee via [IPC](https://electronjs.org/docs/glossary/#ipc) om mogelijke onderbrekingen van een drukke gebruikersinterface te voorkomen.

## Waarom heb je gekozen om Voltra op Electron?

De browsersandbox is te beperkt voor onze app. Maar we ontwikkelen ook een webspeler. Het is dus een grote overwinning dat we bijna 100% van de code kunnen delen tussen de twee implementaties.

We zijn zelfs begonnen met het bouwen van een native app met Swift. Het grootste probleem dat we ontdekten was dat we een heleboel dingen opnieuw uitvinden. Het web heeft 's werelds grootste open source ecosysteem. We zijn dus snel naar Electron overgegaan.

En het belangrijkste is dat Electron je één keer ontwikkelt en het alleen WorkTM op alle belangrijke platforms. Het is niet gegarandeerd, maar de coderingskosten voor elk platform wegen zeker zwaarder dan alle andere kosten die elektron introduceert.

## Wat zijn jouw lievelingsdingen over Electron?

**GTD!**: het samen verpakt hebben van de netwerkstack en Chromium’s presentatielaag van Node.js is een recept om dingen gedaan te krijgen.

**Competentie**: Het is alleen de webstack, dus letterlijk is ons hele team betrokken bij het bouwen van het product.

**Community**: Er is een zeer georganiseerde gemeenschap die weet hoe ze echt goed moet communiceren! Wij hebben het gevoel dat wij ons zo goed kunnen ontwikkelen.

## Op welke gebieden zou Electron kunnen worden verbeterd?

We zouden graag zien dat Electron één verpakker ondersteunt. De packager is net zo belangrijk voor Electron wat de pakketbeheerder is om op te treden. Er zijn meerdere verpakkers in gebruiker-land, elk met interessante functies maar elk met bugs. Consensus van de gemeenschap zou helpen om de energie die door de bijdragers wordt uitgegeven te sturen.

## Wat komt er volgende?

We zijn momenteel een mobiele app aan het ontwikkelen en werken met artiesten en labels om hun muziek toe te voegen aan de Voltra shop. Hé! Als je een artiest of label bent, [meld je nu aan](https://admin.voltra.co/signup)! We zijn van plan om de winkel te openen wanneer we ons doel van tien miljoen sporen bereiken.

