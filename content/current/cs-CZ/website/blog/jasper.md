---
title: 'Projekt týdne: Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

Tento týden jsme si vyslechli autora [Jasper](https://jasperapp.io), nástroje založené na Electronu pro správu GitHub oznámení.

---

## Ahoj! Kdo jsi?

Jsem [Ryo Maruyama](https://github.com/h13i32maru), vývojář softwaru v Japonsku. Vývoj [Jasper](https://jasperapp.io) a [ESDoc](https://esdoc.org).

## Co je to Jasper?

[Jasper](https://jasperapp.io) je flexibilní a výkonná čtečka úkolů pro GitHub. Podporuje problémy a tahání požadavků na github.com a GitHub Enterprise.

[![Snímek obrazovky aplikace Jasper](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## Proč jste to udělali?

Když lidé používají GitHub ve své práci nebo v činnosti OSS, obvykle dostávají denně mnoho oznámení. Jako způsob, jak se přihlásit k oznámením, poskytuje GitHub e-mail a [webová oznámení](https://github.com/notifications). Používala jsem je několik let, ale čelil jsem následujícím problémům:

- Je snadné přehlédnout problémy, o nichž jsem se zmínil, komentoval jsem, nebo se dívám.
- Vložil jsem některé problémy do kouta hlavy, abych se podíval později, ale někdy na ně zapomínám.
- Abych nezapomněl na problémy, nechávám mnoho karet otevřené ve svém prohlížeči.
- Je těžké zkontrolovat všechny problémy, které se ke mně vztahují.
- Je těžké pochopit veškerou aktivitu mého týmu.

Strávil jsem spoustu času a energie a snažil jsem se těmto problémům zabránit, Proto jsem se rozhodl udělat problém pro GitHub, aby tyto problémy vyřešil efektivně, a začal jsem vyvíjet Jasper.

## Kdo používá Jasper?

Jasper používá vývojáři, designéři a manažeři v několika společnostech, které používají GitHub. Samozřejmě ji používají i někteří vývojáři OSS. A je také používán některými lidmi v GitHubu!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Jak funguje Jasper?

Jakmile je Jasper nakonfigurován, objeví se následující obrazovka. Nalevo vpravo můžete vidět "seznam streamů", "seznam úkolů" a "útvar vydávání".

[![Začáteční obrazovka Jaspera](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

Tento "stream" je základním rysem Jasperu. Například, pokud chcete vidět "problémy, které jsou přiřazeny k @zeke v elektronickém/elektronickém repozitáři", vytvoříte následující stream:

```
repo:elektronika/elektronový přiřazovač:zeke je:úkol
```

[![Spustit obrazovku Jasperu 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

Po vytvoření proudu a čekání na několik vteřin, můžete vidět problémy, které splňují podmínky.

[![Spustit obrazovku Jasperu 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## Co můžeme dělat s vysíláním?

Zavedu se, jaké podmínky lze použít pro proud.

### Uživatelé a týmy

| Stream                                      | Issues                                                                  |
| ------------------------------------------- | ----------------------------------------------------------------------- |
| `zmínění:kočka:pes`                         | Problémy, které zmiňují uživatele `kočka` nebo `psa`                    |
| `autor:autor kočky:psí`                     | Problémy vytvořené uživatelem `kočka` nebo `psa`                        |
| `pověřenec:pověřená kočka:pes`              | Úkoly přiřazené `kočce` nebo `psu`                                      |
| `komentář:cat komentář:pg`                  | Problémy, které `kočka` nebo `psa` okomentovaly                         |
| `zahrnuje: kočičí zahrnuje:pes`             | Problémy, které "involve" `kočka` nebo `bob`                            |
| `týmu:zvíře/tým bílé kočky:zvíře/černý pes` | Problémy `zvířete/bílá kočka` nebo `zvířete/černého psa` jsou zmíněny v |

`zahrnuje` znamená `zmínit`, `autor`, `pověřená osoba` nebo `komentář`

### Repozitáře a organizace

| Stream                           | Issues                                        |
| -------------------------------- | --------------------------------------------- |
| `repo:kočka/skok repo:dog/run`   | Problémy v `kočkách/skoku` nebo `dog/run`     |
| `org:electron user:cat user:psg` | Problémy v `elektronronu`, `kočce` nebo `psa` |

`org` je stejný jako `uživatel`

### Atributy

| Stream                                            | Issues                                                                  |
| ------------------------------------------------- | ----------------------------------------------------------------------- |
| `repo:cat/skok milestone:v1.0.0 milestone:v1.0.1` | Problémy, které jsou připojeny k `v1.0.0` nebo `v1.0.1` v `kočka/skok`  |
| `repo:cat/skokový štítek:bug štítek:blocker`      | Problémy, které jsou připojeny `chybou` **a** `blokátor` v `kočka/skok` |
| `elektronová nebo atomová skořepina`              | Problémy, které zahrnují `elektroron` nebo `atomshell`                  |

### Stav recenze

| Stream                     | Issues                                                                                   |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `is:pr recenze:vyžadováno` | Problémy, které jsou vyžadovány recenze v `kočka/skok`                                   |
| `is:pr požadováno:cat`     | Problémy, které jsou požadovány po `kočce`. <br/> Ty ale ještě nejsou přezkoumány. |
| `is:pr zkontrolováno:cat`  | Problémy, které jsou přezkoumány `kočkou`                                                |

<br/>

Jak jste si možná všimli, streamy mohou používat vyhledávací dotazy GitHubu. Podrobnosti o používání streamů a vyhledávacích dotazů naleznete v následujících adresách URL.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/články/hledání úkolů](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper má také funkce pro nepřečtenou správu problémů, nepřečtenou správu komentářů, označování hvězdiček, aktualizace oznámení, filtrování problémů, klávesové zkratky atd.

## Je Jasper placený produkt? Kolik to stojí?

Jasper je 12 dolarů. Nicméně můžete používat [zkušební verzi](https://jasperapp.io/) po dobu 30 dní.

## Proč jste si vybrali stavbu Jaspera na Electron?

Líbí se mi tyto aspekty Electronu:

- Aplikace mohou být vyvinuty v JavaScript/CSS/HTML.
- Aplikace lze vytvořit pro platformy Windows, Mac a Linux.
- Electron je aktivně vyvíjen a má velkou komunitu.

Tyto funkce umožňují rychlý a jednoduchý vývoj desktopové aplikace. Je to úžasné! Máte-li nějaký produkt, měli byste zvážit použití Electronu všemi prostředky.

## Jaké jsou některé výzvy, kterým jste čelili při vývoji Jaspera?

Byl jsem těžko vymyslel koncepci "streamu". At first I considered using GitHub's [Notifications API](https://developer.github.com/v3/activity/notifications/). Všiml jsem si však, že nepodporuje některé případy použití. Poté, co jsem uvažoval o použití [Issues API](https://developer.github.com/v3/issues/) a [Pull Requests API](https://developer.github.com/v3/pulls/)kromě API pro oznámení. Ale nikdy se to nestalo, co jsem chtěl. Když jsem přemýšlel o různých metodách, uvědomil jsem si, že [Vyhledávací API GitHubu](https://developer.github.com/v3/search/) by nabídla největší flexibilitu. K tomuto bodu trvalo asi měsíc experimentů, pak jsem zavedl prototyp Jasperu s koncepcí proudu za dva dny.

Poznámka: Hlasování je omezeno nanejvýš jednou za 10 sekund. To je pro omezení GitHub API přijatelné.

## Co bude dál?

Mám plán na rozvoj následujících funkcí:

- **Filtrovaný stream**: stream má nějaký filtrovaný stream, který filtruje problémy v streamu. Je to jako pohled na SQL.
- **Více účtů**: budete moci používat jak github.com, tak GHE
- **Zlepšit výkon**: Načítání problému v WebView je nyní nízká rychlost než běžný prohlížeč.

Pro aktualizace sledujte [@jasperappio](https://twitter.com/jasperappio) na Twitteru.

