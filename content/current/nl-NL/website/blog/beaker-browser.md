---
title: 'Project van de Wek: Beaker Browser'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

Deze week hebben we [Paul Frazee](http://pfrazee.github.io/), maker van [Beaker Browser](https://beakerbrowser.com/). Baker is een experimentele peer-to-peer web browser die het Dat protocol gebruikt om sites van gebruikers apparaten te hosten.

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## Wat is Beaker en waarom heb je het gemaakt?

Beaker is een participerende browser. Het is een browser voor indie hackers.

Het web is gesloten bron. Als je wilt beïnvloeden hoe sociale media werken, moet je werken op Facebook of Twitter. Voor zoeken, Google. Controle is in handen van bedrijven en niet van de gebruikers zelf.

Met Beaker hebben we een nieuw webprotocol: The [Decentralized Archive Transport](https://datprotocol.com). "Datum." Het maakt gratis sites op op vraag aan en deelt deze vervolgens vanaf het apparaat. Geen servers vereist. Dat is onze innovatie.

![Beakers Protocollen](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Wanneer u een Die site in Beaker bezoekt, download u de bestanden. De site is voor altijd van u. U kunt het opslaan, het wijzigen en uw nieuwe versie gratis delen. Het is allemaal open-source.

Dus dat is waar het om gaat: we maken een browser voor open-source Websites. We willen dat het een toolkit wordt voor sociale hacking.

## Wie moet Beaker gebruiken?

Hackers. Modders. Creatieve types. Mensen die graag knutselen.

## Hoe maak ik een nieuw project aan dat data gebruikt?

We hebben [een command-line tool genaamd bkr](https://github.com/beakerbrowser/bkr) dat soort git + npm is. Hier is een site aan het maken:

```bash
$ cd ~/my-site
$ bkr init
$ echo "Hallo, world!" > index.html
$ bkr publiceren
```

En hier is een site vormen:

```bash
$ bkr fork dat://0ff7d4c7644d019914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "Mijn fork heeft geen respect voor de vorige index. tml!" > index.html
$ bkr publiceren
```

Deze sites worden vervolgens vanuit je browser gehost. Het lijkt een beetje op BitTorrent; je deelt de sites in een P2P-maak.

Als je een GUI wilt, hebben we enkele basisgereedschappen ingebouwd in de browser, maar we duwen deze gereedschappen naar gebruikerland. Het zal allemaal modable gebruikers-apps zijn.

## Waarom heb je Beaker op Electron?

Dat was duidelijk voor dit project. Als ik zelf Chrome verval, zou ik nu C++ schrijven! Niemand wil dat doen. Ik ken de webstack, en ik kan er snel mee werken. Het is een no-brainer.

De waarheid is dat ik er niet zeker van ben dat ik er iets van kan doen zonder Electron. Het is een geweldig stuk software.

## Wat zijn enkele uitdagingen waarmee je wordt geconfronteerd tijdens het bouwen van Beaker?

De helft daarvan is aan het gereedschap te twijfelen en erachter te komen hoeveel ik eruit kan komen.

De browser zelf maken was vrij makkelijk. Electron is praktisch een toolkit voor het maken van browsers. ...behalve voor de browser-tabbladen; dat kostte me voor altijd om het goed te doen. Uiteindelijk ben ik kapot gegaan en heb ik geleerd om SVG's te doen. Het ziet er veel beter uit, maar er waren 3 of 4 herhalingen nodig voordat ik dat juist deed.

## Op welke gebieden moet Electron worden verbeterd?

Het zou erg geweldig zijn als ik de gouden gereedschappen in een webweergave zou kunnen vastmaken.

## Wat komt er volgende in Beaker?

Beveilig DNS namen voor data-sites. Een sociaal configureerbare URL schema, genaamd ["app schema."](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) Meer Dat APIs.

## Voor mensen die misschien geïnteresseerd zijn in het leveren van een bijdrage aan het project, op welke gebieden heeft Beaker hulp nodig?

We hebben veel open vragen. Wees niet bang om me te pingen. #beakerbrowser op freenode. We houden een [pagina voor bijdragers](https://beakerbrowser.com/docs/team.html) en we voegen je toe. En als je Austin bezoekt, zal ik een biertje voor je kopen.

## Heb je Electron tips die nuttig kunnen zijn voor andere ontwikkelaars?

1. Gebruik de build tooling die daar ligt. Je wilt niet worstelen met je eigen oplossingen, vertrouwen me op. Gebruik elektron-bouwer. Gebruik een boilerplate repo.
2. Als je een issue wilt openen in de Electron repo, ga dan naar de extra mijl om het gemakkelijk te maken om te reproduceren. Je krijgt veel sneller een reactie, en het team zal het waarderen. Nog beter, probeer het zelf te repareren. Het is eigenlijk interessant om de binnenste te zien.
3. Lees alle handleidingen en geavanceerde documenten ten minste één keer.
4. Geen browser bouwen, het is een verzadigde markt.

