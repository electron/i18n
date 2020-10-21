---
title: 'Proiectul săptămânii: Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

În această săptămână am intervievat creatorul [Jasper](https://jasperapp.io), un instrument pe bază de Electron pentru gestionarea notificărilor GitHub.

---

## Salut! Cine ești?

Sunt [Ryo Maruyama](https://github.com/h13i32maru), un dezvoltator de software în Japonia. Eu dezvolt [Jasper](https://jasperapp.io) şi [ESDoc](https://esdoc.org).

## Ce este Jasper?

[Jasper](https://jasperapp.io) este un cititor de probleme flexibil și puternic pentru GitHub. Acceptă probleme și pull requests pe github.com și GitHub Enterprise.

[![Screenshot aplicaţie Jasper](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## De ce ai făcut-o?

Când oamenii folosesc GitHub în activitățile lor de angajare sau OSS, aceștia tind să primească zilnic multe notificări. Ca un mod de a se abona la notificări, GitHub oferă e-mailuri și [notificări web](https://github.com/notifications). Am folosit aceste lucruri timp de câţiva ani, dar m-am confruntat cu următoarele probleme:

- Este ușor să trecem cu vederea problemele pe care le-am menționat, am comentat sau mă uit.
- Am pus niște probleme într-un colț al capului meu să le verific mai târziu, dar uneori uit de ele.
- Pentru a nu uita problemele, păstrez multe file deschise în browser-ul meu.
- Este greu să verifici toate problemele care sunt legate de mine.
- E greu să înțelegi toată activitatea echipei mele.

Petreceam mult timp şi energie încercând să previn aceste probleme, așa că am decis să fac un cititor de probleme pentru ca GitHub să rezolve aceste probleme în mod eficient, și am început să dezvolt Jasper.

## Cine îl folosește pe Jasper?

Jasper este utilizat de dezvoltatori, designeri și manageri din mai multe companii care folosesc GitHub. Bineînţeles, şi unii dezvoltatori OSS o folosesc. Și este folosit și de unele persoane de pe GitHub!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Cum acționează Jasper?

După configurarea Jasper, apare următorul ecran. De la stânga la dreapta, puteți vedea "lista de fluxuri", "lista de probleme" și "organismul de emisiuni".

[![Pornire Jasper Ecran](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

Acest "stream" este caracteristica centrală a Jasper. De exemplu, dacă doriți să vedeți "probleme care sunt atribuite @zeke în depozitul electron/electron", creați următorul stream:

```
repo:electron/electron cesionar:zeke este:issue
```

[![Pornire Jasper Ecran 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

După crearea fluxului și așteptarea câtorva secunde, puteți vedea problemele care îndeplinesc condițiile.

[![Pornire Jasper Ecran 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## Ce putem face cu fluxurile?

Voi introduce ce fel de condiții pot fi folosite pentru stream.

### Utilizatori și echipe

| Flux                                                 | Issues                                                                                  |
| ---------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `Menţionează: pisica menţionează: câine`             | Probleme care menţionează utilizatorul `pisica` sau `câine`                             |
| `autor:cat autor:dog`                                | Probleme create de utilizatorul `pisica` sau `câine`                                    |
| `cesionar:cat cesionar:dog`                          | Probleme atribuite `pisica` sau `câine`                                                 |
| `commenter:cat commenter:dog`                        | Probleme la care `pisica` sau `câinele` a comentat                                      |
| `implică: pisica implică: câine`                     | Probleme care "implică" `pisica` sau `bob`                                              |
| `echipa:animal/echipa alb-pisica:animal/caine-negru` | Probleme în care `animalul/pisica albă` sau `animalul/câinele negru` sunt menționate în |

`implică` înseamnă `menționează`, `autorul`, `cesionar` sau `commenter`

### Repertorii și organizații

| Flux                             | Issues                                         |
| -------------------------------- | ---------------------------------------------- |
| `repo:cat/sări repo:dog/run`     | Probleme în `pisica/sări` sau `dog/run`        |
| `org:electron user:cat user:dog` | Probleme în `electronul`, `pisica` sau `câine` |

`org` este identic cu `utilizator`

### Atribute

| Flux                                            | Issues                                                               |
| ----------------------------------------------- | -------------------------------------------------------------------- |
| `repo:cat/salt jalon:v1.0.0 reper`              | Probleme care sunt atașate la `v1.0.0` sau `v1.0.1` în `pisică/salt` |
| `repo:cat/sărire etichetă:bug etichetă:blocker` | Probleme care sunt atașate `bug` **și** `blocker` în `cat/salt`      |
| `atomshell electron OR`                         | Probleme care includ `electronul` sau `atomshell`                    |

### Statusul Revizuirii

| Flux                           | Issues                                                                                     |
| ------------------------------ | ------------------------------------------------------------------------------------------ |
| `este:pr recenzie :required`   | Probleme care sunt necesare în `pisici/salt`                                               |
| `este:pr review-requested:cat` | Probleme care sunt solicitate de `pisica`. <br/> Dar acestea nu sunt încă revizuite. |
| `este:pr reviewed-by:cat`      | Probleme care sunt revizuite de `pisica`                                                   |

<br/>

După cum poate ați observat uitându-vă la acestea, fluxurile pot utiliza căutările GitHub de căutare. Pentru detalii despre modul de utilizare a stream-urilor și a interogărilor de căutare, vedeți următoarele URL-uri.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [Help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper are, de asemenea, caracteristici pentru gestionarea problemelor necitite, gestionarea comentariilor necitite, stele de marcare, actualizarea notificărilor, probleme de filtrare, scurtături ale tastaturii etc.

## Este Jasper un produs plătit? Cât costă?

Jasper are 12 dolari. Cu toate acestea, puteți utiliza [ediția de trial gratuit](https://jasperapp.io/) pentru 30 de zile.

## De ce ai ales să construiești Jasper pe Electron?

Îmi plac următoarele aspecte ale Electron:

- Aplicațiile pot fi dezvoltate cu JavaScript/CSS/HTML.
- Aplicațiile pot fi construite pentru platformele Windows, Mac și Linux.
- Electron este dezvoltat activ și are o comunitate mare.

Aceste caracteristici permit dezvoltarea rapidă și simplă a aplicațiilor desktop. Este minunat! Dacă ai vreo idee de produs, ar trebui să iei în considerare folosirea Electron cu orice mijloc.

## Care sunt unele provocări cu care vă confruntaţi în timp ce dezvoltaţi Jasper?

Am avut dificultăţi în a înţelege conceptul de "stream". La prima dată m-am gândit să folosesc [Notifications API GitHub](https://developer.github.com/v3/activity/notifications/). Cu toate acestea, am observat că acesta nu sprijină anumite cazuri de utilizare. După aceea am luat în considerare utilizarea [Issues API](https://developer.github.com/v3/issues/) and [Pull Requests API](https://developer.github.com/v3/pulls/), în plus față de API-ul notificărilor. Dar nu a devenit niciodată ceea ce doream. Apoi în timp ce mă gândesc la diferite metode, mi-am dat seama că sondarea [Search API de la GitHub](https://developer.github.com/v3/search/) ar oferi cea mai mare flexibilitate. A fost nevoie de aproximativ o lună de experimente pentru a ajunge în acest punct, apoi am implementat în două zile un prototip de Jasper cu conceptul de flux continuu.

Notă: Sondajul este limitat la cel mult 10 secunde. Acest lucru este acceptabil pentru restricționarea GitHub API.

## Ce urmează?

Am un plan de dezvoltare a următoarelor caracteristici:

- **Un flux filtrat**: un flux are un flux filtrat care filtrează problemele din stream. Este ca şi cum ai vedea SQL.
- **Conturi multiple**: veți putea folosi atât github.com cât și GHE
- **Îmbunătățește performanța**: Deocamdată, încărcarea unei probleme în WebView are viteză mică decât browser-ul normal.

Urmăriți [@jasperappio](https://twitter.com/jasperappio) pe Twitter pentru noutăți.

