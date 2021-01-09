---
title: "Aankondiging van TypeScript in Electron"
author: zeke
date: '2017-06-01'
---

Het `elektron` npm pakket bevat nu een TypeScript definitie bestand dat gedetailleerde aantekeningen van de gehele Electron API bevat. Deze aantekeningen kunnen de ontwikkeling van Electron ervaring **verbeteren, zelfs als je vanilla JavaScript** schrijft. U kunt `npm installeren electron` om de nieuwste Electron types in uw project te krijgen.

---

TypeScript is een open-source programmeertaal gemaakt door Microsoft. Het is een superset of JavaScript dat de taal uitbreidt door ondersteuning toe te voegen voor statische types. De TypeScript community is de afgelopen jaren snel gegroeid en TypeScript werd gerangschikt onder de [meest geliefde programmeertalen](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) in een recent onderzoek van Stack Overflow ontwikkelaar.  TypeScript is described as "JavaScript that scales", and teams at [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), and [Microsoft](https://github.com/Microsoft/vscode) are all using it to write scalable Electron apps that are used by millions of people.

TypeScript ondersteunt veel van de nieuwere taalfuncties in JavaScript zoals -klassen, objectontstructurering en async/await, maar de echte differentiërende functie is **type aantekeningen**. Verklaren van de input en uitvoer datatypes verwacht door je programma kan [bugs verminderen](https://slack.engineering/typescript-at-slack-a81307fa288d) met helpt u om fouten te vinden op compilatietijd. en de aantekeningen kunnen ook dienen als een formele verklaring van [hoe je programma werkt](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Wanneer bibliotheken in vanilla Javascript worden geschreven, worden de types vaak vagelijk gedefinieerd als een nagedachte bij het schrijven van documentatie. Functies kunnen vaak meer types accepteren dan wat is gedocumenteerd, of een functie kan onzichtbare kaders bevatten die niet gedocumenteerd zijn, wat kan leiden tot runtime fouten.

TypeScript lost dit probleem op met **definitie bestanden**. Een TypeScript definitiebestand beschrijft alle functies van een bibliotheek en de verwachte invoer- en uitvoertypes. Wanneer bibliotheekauteurs een TypeScript definitiebestand met hun gepubliceerde bibliotheek bundelen, Gebruikers van die bibliotheek kunnen [de API direct in hun editor](https://code.visualstudio.com/docs/editor/intellisense) verkennen en direct beginnen met het gebruiken ervan vaak zonder de documentatie van de bibliotheek te hoeven raadplegen.

Veel populaire projecten zoals [hoekje](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (en nu Electron! compileer hun eigen definitiebestand en bundelt het met hun gepubliceerde npm pakket. Voor projecten die hun eigen definitiebestand niet bundelen, is er [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), een ecosysteem van door de gemeenschap onderhouden definitiebestanden.

## Installatie

Vanaf versie 1.6.10 bevat elke release van Electron zijn eigen TypeScript definitie bestand. Wanneer je het `elektron` pakket vanaf npm installeert, het `electron.d.ts` bestand wordt automatisch gebundeld met het geinstalleerde pakket.

De [veiligste manier](https://electronjs.org/docs/tutorial/electron-versioning/) om Electron te installeren gebruikt een exact versienummer:

```sh
npm installeer electron --save-dev --save-exact
```

Of als je [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison) gebruikt:

```sh
yarn add electron --dev --exact
```

Als u al gebruik maakte van derde-partijdefinities zoals `@types/electron` en `@types/node`, je moet ze verwijderen uit je Electron project om botsingen te voorkomen.

Het definitiebestand is afgeleid van onze [gestructureerde API documentatie](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), Dus het zal altijd consistent zijn met [API-documentatie van Electron](https://electronjs.org/docs/api/). Installeer gewoon `electron` en je krijgt altijd TypeScript-definities die up-to-date zijn met de versie van Electron die je gebruikt.

## Gebruik

Voor een samenvatting van hoe Electron's nieuwe TypeScript aantekeningen te installeren en te gebruiken, bekijk deze korte demo screencast: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

Als je [Visual Studio Code](https://code.visualstudio.com/)gebruikt, heb je al TypeScript ondersteuning ingebouwd. Er zijn ook door de gemeenschap onderhouden plugins voor [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), en [andere editors](https://www.typescriptlang.org/index.html#download-links).

Zodra uw editor is geconfigureerd voor TypeScript, zie je meer context-bewust gedrag zoals autocomplete suggesties, inline methode referentie, argument controle en meer.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Methode automatisch aanvullen">
  <figcaption>Methode autcompletion</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Methode referentie">
  <figcaption>Inline methode referentie</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Argument controle">
  <figcaption>Argument controle</figcaption>
</figure>

## Aan de slag met TypeScript

Als je nieuw bent bij TypeScript en meer wilt weten, deze [inleidende video van Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) biedt een mooi overzicht van waarom de taal is gemaakt hoe het werkt, hoe het te gebruiken is en waar het naar boven komt.

Er is ook een [handboek](https://www.typescriptlang.org/docs/handbook/basic-types.html) en een [speelveld](https://www.typescriptlang.org/play/index.html) op de officiële TypeScript website.

Omdat TypeScript een superset of JavaScript is, is uw bestaande JavaScript-code al geldig. Dit betekent dat u geleidelijk een bestaand JavaScript-project naar TypeScript kunt overzetten, en indien nodig nieuwe taalfuncties kunt gebruiken.

## Bedankt

This project would not have been possible without the help of Electron's community of open-source maintainers. Dankzij [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birunthan Mohanathas](https://github.com/poiru), [Milan Burda](https://github.com/miniak), [Brendan Forster](https://github.com/shiftkey), en nog veel meer voor hun bug fixes, verbeteringen in documentatie, en technische begeleiding.

## Support

Als u problemen ondervindt met behulp van de nieuwe TypeScript definitiebestanden, gelieve een probleem op te lossen op de [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues) repository.

Happy TypeScript!
