---
title: Elektronické jednoduché vzorky
author: zeke
date: '2017-01-19'
---

Nedávno jsme hostili hackaton Electronu na GitHubu pro členy [Hackbright Academy](https://hackbrightacademy.com), kódovací škola pro ženy založené v San Franciscu. Abychom pomohli účastníkům získat nástup na jejich projekty, naše [Kevin Sawicki](https://github.com/kevinsawicki) vytvořila několik ukázkových Electronových aplikací.

---

Pokud jste noví ve vývoji Electronu nebo jste to ještě nevyzkoušeli, jsou tyto ukázkové aplikace skvělým místem pro začátek. Jsou malé, snadno čitelné, a kód je silně komentován, aby vysvětlil, jak všechno funguje.

Chcete-li začít, klonovat tento repozitář:

```sh
git klonovat https://github.com/electron/simple-samples
```

Chcete-li spustit některou z níže uvedených aplikací, přejděte do adresáře aplikace, nainstalujte závislosti, pak spusťte:

```sh
cd aktivita-monitor
npm install
npm start
```

## Monitor aktivity

Zobrazí graf s kašlem CPU systému, uživatele a nečinnosti v nečinnosti.

[![Snímek obrazovky](https://cloud.githubusercontent.com/assets/671378/20894933/3882a328-bacc-11e6-865b-4bc1c5ac7ec7.png)](https://github.com/kevinsawicki/electron-samples/tree/master/activity-monitor)

## Hash

Zobrazí hash hodnoty zadaného textu pomocí různých algoritmů.

[![snímek obrazovky](https://cloud.githubusercontent.com/assets/671378/21204178/de96fa12-c20a-11e6-8e94-f5b16e676eee.png)](https://github.com/kevinsawicki/electron-samples/tree/master/hash)

## Zrcadlení

Přehraje video kamery počítače v maximální velikosti, jako je pohled na zrcadlo. Obsahuje volitelný efekt rainbow filtru, který používá CSS animace.

## Ceny

Zobrazuje aktuální cenu ropy, zlata a stříbra pomocí Yahoo Finance API.

[![snímek obrazovky](https://cloud.githubusercontent.com/assets/671378/21198004/6e7a3798-c1f2-11e6-8228-495de90b7797.png)](https://github.com/kevinsawicki/electron-samples/tree/master/prices)

## URL

Načte URL přenesenou na příkazový řádek v okně.

## Jiné zdroje

Doufáme, že tyto aplikace vám pomohou začít používat Electron. Zde je hrstka dalších zdrojů pro další učení:

- [elektronick-rychlý start](https://github.com/electron/electron-quick-start): Minimální elektronová aplikační kotle.
- [Electron API Demos](https://github.com/electron/electron-api-demos): interaktivní aplikace, která demonstruje základní funkce Electron API
- [electronjs.org/docs/all](https://electronjs.org/docs/all/): All of the Electron documentation together on the single searchable page.
- [hokein/electron-sample apps](https://github.com/hokein/electron-sample-apps): Další soubor ukázkových aplikací pro Electron, sestavený správcem Electronu [Haojian Wu](https://github.com/hokein).
- [awesome-electron](https://github.com/sindresorhus/awesome-electron) - GitHub repozitář, který sbírá nejnovější a největší elektronický návod, knihy, videa, atd.