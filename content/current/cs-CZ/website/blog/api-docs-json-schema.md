---
title: API dokumentace Electronu jako strukturovaná data
author: zeke
date: '2016-09-27'
---

Dnes oznamujeme některá vylepšení v dokumentaci Electronu. Každá nová verze nyní obsahuje [soubor JSON](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) , který podrobně popisuje všechny veřejné API Electronu. Vytvořili jsme tento soubor pro umožňující vývojářům používat dokumentaci Electronu API zajímavými novými způsoby.

---

## Přehled schémat

Každé API je objekt s vlastnostmi, jako je název, popis, typ, atd. Třídy jako `BrowserWindow` a `Menu` mají další vlastnosti popisující jejich metody, vlastnosti instance, události atd.

Zde je výpis z schématu popisující třídu `BrowserWindow`:

```js
{
  name: 'BrowserWindow',
  description: 'Create and control browser windows. ,
  proces: {
    main: true,
    renderer: false
  },
  typ: 'Class',
  instanceName: 'win',
  slug: 'browser-window',
  webová stránkaUrl: 'https://electronjs. rg/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window. d',
  staticMetody: [...],
  instanceMetody: [...],
  instanceProperties: [...],
  instanceEvents: [...]
}
```

And here's an example of a method description, in this case the `apis.BrowserWindow.instanceMethods.setMaximumSize` instance method:

```js
{
  název: 'setMaximumSize',
  podpis: '(šířka, výška)',
  popis: 'Nastaví maximální velikost okna na šířku a výšku. ,
  parametry: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Použití nových dat

Aby bylo pro vývojáře snadné používat tato strukturovaná data ve svých projektech, jsme vytvořili [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), malý npm balík, který je automaticky publikován vždy, když je vydána nová verze Electron .

```sh
npm install electron-api-docs --save
```

Pro okamžité uspokojení, vyzkoušejte modul ve vašem Node.js REPL:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Jak jsou údaje shromažďovány

Dokumentace API Electronu je v souladu s [Electron Coding Style](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) a [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), takže jeho obsah může být programově analyzován.

[electron-docs-linter](https://github.com/electron/electron-docs-linter) je nová vývojová závislost `elektronického/elektroronu` repozitáře. Je to nástroj příkazové řádky, který spojuje všechny soubory markdown a vynucuje pravidla stylu. Pokud jsou nalezeny chyby, jsou uvedeny a proces vydání je zastaven. Pokud jsou dokumenty API platné, `elektron-json. pi` soubor je vytvořen a [nahrán do GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) jako součást vydání Electronu.

## Standardní Javascript a standardní Markdown

Počátkem letošního roku byla Electronova codebase aktualizována tak, aby používala [`standard`](http://standardjs.com/) linter pro všechny JavaScript. Standardní README shrnuje odůvodnění této volby:

> Přijmout standardní styl znamená seřadit význam srozumitelnosti kódu a konvencí komunit vyšších než osobní styl. To nemusí mít smysl pro 100% projektů a rozvojových kultur, třebaže otevřený zdroj může být nepřátelským místem pro nováčky. Zavedení jasných a automatických očekávání přispěvatelů činí projekt zdravějším.

Nedávno jsme také vytvořili [standardní markdown](https://github.com/zeke/standard-markdown) pro ověření, že všechny JavaScript snippety kódu v naší dokumentaci jsou platné a konzistentní se stylem v kódové databázi samotné.

Together these tools help us use continuous integration (CI) to automatically find errors in pull requests. To snižuje zátěž, kterou lidé kladou na kodexy a dává nám větší důvěru v přesnost naší dokumentace.

### Komunitní úsilí

Dokumentace Electronu se neustále zlepšuje a my za ni máme naši úžasnou open-source komunitu. Od tohoto psaní přispělo k dokumentům téměř 300 lidí .

Jsme rádi, že vidíme, co lidé s těmito novými strukturovanými daty dělají. Možná použití zahrnují:

- Zlepšení na [https://electronjs.org/docs/](https://electronjs.org/docs/)
- [Soubor definice TypeScriptu](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) pro efektivnější vývoj Electronu v projektech pomocí TypeScriptu.
- Vyhledávání offline dokumentace pro nástroje jako [Dash.app](https://kapeli.com/dash) a [devdocs.io](http://devdocs.io/)

