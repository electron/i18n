---
title: 'Project van de week: Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

Deze week hebben we de maker van [Jasper](https://jasperapp.io)geïnterviewd, een op Electron gebaseerde tool voor beheren van GitHub notificaties.

---

## Hallo! Wie ben je?

Ik ben [Ryo Maruyama](https://github.com/h13i32maru), een softwareontwikkelaar in Japan. Ik ben [Jasper](https://jasperapp.io) en [ESDoc](https://esdoc.org) aan het ontwikkelen.

## Wat is Jasper?

[Jasper](https://jasperapp.io) is een flexibele en krachtige issue reader voor GitHub. Het ondersteunt problemen en pull requests op github.com en GitHub Enterprise.

[![Jasper app schermafbeelding](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## Waarom heb je het gemaakt?

Wanneer mensen GitHub gebruiken in hun werk of OSS-activiteiten, ontvangen ze meestal dagelijks vele meldingen. Als een manier om je te abonneren op de meldingen, verstrekt GitHub e-mail en [webmeldingen](https://github.com/notifications). Ik heb ze een paar jaar gebruikt, maar ik kreeg de volgende problemen:

- Het is makkelijk om kwesties over het hoofd te zien waar ik werd genoemd, gefeliciteerd, of ik ben aan het kijken.
- Ik heb later een paar zaken in een hoekje laten nagaan, maar ik vergeet ze soms.
- Om problemen niet te vergeten, houd ik veel tabbladen open in mijn browser.
- Het is moeilijk om alle issues te controleren die aan mij gerelateerd zijn.
- Het is moeilijk om al mijn team's activiteiten te begrijpen.

Ik heb veel tijd en energie besteed aan het voorkomen van deze problemen. dus heb ik besloten om een issue reader voor GitHub te maken om deze problemen efficiënt op te lossen en Jasper te ontwikkelen.

## Wie gebruikt Jasper?

Jasper wordt gebruikt door ontwikkelaars, ontwerpers en beheerders in verschillende bedrijven die GitHub gebruiken. Natuurlijk maken ook sommige OSS-ontwikkelaars er gebruik van. En het wordt ook door sommige mensen op GitHub gebruikt!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Hoe werkt Jasper?

Zodra Jasper is geconfigureerd, wordt het volgende scherm weergegeven. Van links naar rechts kun je "streams list", "issues list" en "issue body" zien.

[![Jasper startscherm](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

Deze "stream" is de kern van Jasper. Als je bijvoorbeeld "issues die zijn toegewezen aan @zeke in de electron/electron repository" wilt zien, maak je de volgende stream aan:

```
repo:electron/electron taakontvanger:zeke is:issue
```

[![Jasper Startscherm 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

Na het creëren van de stream en wachten voor een paar seconden, kunt u de issues zien die aan de voorwaarden voldoen.

[![Jasper Startscherm 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## Wat kunnen we doen met stromen?

Ik zal u vertellen welke voorwaarden er voor de stroom gebruikt kunnen worden.

### Gebruikers en teams

| Stroom                                        | Problemen                                                         |
| --------------------------------------------- | ----------------------------------------------------------------- |
| `vermeldingen:kattenvermeldingen:hond`        | Issues die gebruiker `cat` of `hond` vermelden                    |
| `auteur:cat auteur:hond`                      | Problemen gemaakt door gebruiker `cat` of `hond`                  |
| `taakontvanger:cat taakontvanger:hond`        | Issues toegewezen aan `cat` of `hond`                             |
| `commentaar:cat commentaar:hond`              | Issues waarop `cat` of `hond` commentaar gaf                      |
| `in:kat inzit:hond`                           | Issues die "betrokken" `kat` of `bob`                             |
| `team:animal/white-cat team:animal/black-dog` | Issues dat `dier/white-cat` of `dier/black-dog` worden genoemd in |

`omvat` betekent `vermelding`, `auteur`, `toegewezen behandelaar` of `commentaar`

### repositories en organisaties

| Stroom                                      | Problemen                             |
| ------------------------------------------- | ------------------------------------- |
| `repo:cat/jump repo:dog/run`                | Issues in `cat/spring` of `dog/run`   |
| `org:electron gebruiker:cat gebruiker:hond` | Issues in `electron`, `kat` of `hond` |

`org` is hetzelfde als `gebruiker`

### Kenmerken

| Stroom                                           | Problemen                                                            |
| ------------------------------------------------ | -------------------------------------------------------------------- |
| `repo:cat/jump mijlpaal:v1.0.0 milestone:v1.0.1` | Issues die zijn gekoppeld aan `v1.0.0` of `v1.0.1` in `cat/jump`     |
| `repo:cat/jump label:bug label:blocker`          | Problemen die worden toegevoegd `bug` **en** `blocker` in `cat/jump` |
| `electron of atoomshell`                         | Issues bevatten `elektron` of `atoomshell`                           |

### Review Status

| Stroom                         | Problemen                                                                                  |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| `is:pr beoordeling:verplicht`  | Issues die moeten worden beoordeeld in `cat/spring`                                        |
| `is:pr review-aangevraagd:kat` | Kwesties die worden gevraagd door `kat`. <br/> Maar deze worden nog niet beoordeeld. |
| `is:pr beoordeeld door:kat`    | Issues die worden beoordeeld door `kat`                                                    |

<br/>

Zoals u wellicht hebt opgemerkt door hiernaar te kijken, kunnen streams de zoekopdrachten van GitHub gebruiken. Voor details over het gebruik van streams en zoekopdrachten, zie de volgende URL's.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/artikelen/zoekproblemen](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper heeft ook functies voor ongelezen probleembeheer, ongelezen commentaarbeheer, het markeren van sterren, bijwerken van berichten, het filteren van problemen, sneltoetsen enz.

## Is Jasper een betaald product? Hoeveel kost het?

Jasper is $12. U kunt de [gratis proefversie](https://jasperapp.io/) voor 30 dagen gebruiken.

## Waarom heb je Jasper op Electron?

Ik hou van de volgende aspecten van Electron:

- Apps kunnen worden ontwikkeld met JavaScript/CSS/HTML.
- Apps kunnen worden gebouwd voor Windows, Mac en Linux platformen.
- Electron is actief ontwikkeld en heeft een grote gemeenschap.

Deze functies maken snelle en eenvoudige desktop applicatie ontwikkeling mogelijk. Het is geweldig! Als je een product idee hebt, moet je op alle manieren Electron gebruiken.

## Wat zijn enkele uitdagingen waarmee je wordt geconfronteerd bij het ontwikkelen van Jasper?

Het heeft mij moeite gekost om het begrip "stroom" uit te werken. Eerst dacht ik aan het gebruik van GitHub's [Notificatie API](https://developer.github.com/v3/activity/notifications/). Ik heb echter gemerkt dat zij bepaalde gevallen van gebruik niet steunt. Daarna dacht ik aan het gebruik van de [Issues API](https://developer.github.com/v3/issues/) en [Pull Requests API](https://developer.github.com/v3/pulls/), naast de Notificatie API. Maar het werd nooit wat ik wilde. Toen heb ik tijdens het nadenken over verschillende methoden begrepen dat de enquête van GitHub's [zoekAPI](https://developer.github.com/v3/search/) de meest flexibiliteit zou bieden. Het duurde ongeveer een maand van experimenten om op dit punt te geraken. vervolgens heb ik binnen twee dagen een prototype Jasper ingevoerd met het streamconcept.

Opmerking: de opiniepeilingen worden hooguit om de 10 seconden tot één keer beperkt. Dit is acceptabel genoeg voor de beperking van de GitHub API.

## Wat komt er volgende?

Ik heb een plan om de volgende kenmerken te ontwikkelen:

- **Een gefilterde stream**: Een stream heeft een aantal gefilterde stream die problemen in de stream filtert. Het is net als SQL.
- **Meerdere accounts**: je kunt zowel github.com als GHE gebruiken
- **Verbetert de prestaties**: het laden van een issue in WebView is momenteel lage snelheid dan de normale browser.

Volg [@jasperappio](https://twitter.com/jasperappio) op Twitter voor updates.

