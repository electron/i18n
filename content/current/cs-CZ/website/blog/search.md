---
title: Hledat
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

Webová stránka Electron má nový vyhledávač, který přináší okamžité výsledky pro API dokumentů, tutoriálů, elektronických npm balíčků a dalších.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Electron vyhledávací snímek obrazovky">
  </a>
</figure>

---

Učení nové technologie nebo frameworku jako Electron může být zastrašující. Jakmile se dostanete do fáze [rychlého startu](https://github.com/electron/electron-quick-start) , může být obtížné naučit se nejlepší postupy, najděte správná API nebo objevte nástroje , které vám pomohou vytvořit aplikaci Vašich snů. Chceme, aby webové stránky Electronu byly lepším nástrojem pro nalezení zdrojů, které potřebujete k rychlejšímu vytváření aplikací, a snadněji.

Navštivte libovolnou stránku na [electronjs.org](https://electronjs.org) a najdete nový vyhledávací vstup v horní části stránky.

## Vyhledávač

Když jsme poprvé nastavili hledání na webovou stránku, získali jsme vlastní vyhledávač pomocí GraphQL jako backend. GraphQL byl zábavný pro práci s vyhledávačem a byl výkonný, ale rychle jsme si uvědomili, že vytvoření vyhledávače není triviální úkol. Věci jako hledání ve více slovech a detekce typo vyžadují spoustu práce, aby bylo možné správně dosáhnout. Místo opětovného objevování kola, jsme se rozhodli použít existující řešení vyhledávání: [Algolia](https://algolia.com).

Algolia je hostovaná vyhledávací služba, která se rychle stala vyhledávačem dle volby mezi populárními open source projekty, jako je React, Vue, Bootstrap, Yarn a [mnoho dalších](https://community.algolia.com/docsearch/).

Zde jsou některé z funkcí, které učinily Algolia dobrou hodnost pro Electronový projekt:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) poskytuje výsledky při psaní, obvykle v asi 1 ms.
- [Tolerance Typo](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) znamená, že dostanete výsledky, i když napíšete [`widnow`].
- [Pokročilá syntaxe dotazů](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) umožňuje `"přesné citované zápasy"` a `-exception`.
- [API klienti](https://www.algolia.com/doc/api-client/javascript/getting-started/) jsou open source a dobře zdokumentováni.
- [Analytics](https://www.algolia.com/doc/guides/analytics/analytics-overview/) nám řekne, co lidé hledají většinu a co hledají, ale ne hledají. To nám poskytne cenný přehled o tom, jak lze zlepšit dokumentaci Electronu.
- Algolia je [zdarma pro projekty open source](https://www.algolia.com/for-open-source).

## API Docs

Někdy víte *co* chcete udělat, ale nevíte přesně *jak to dělat*. Electron má více než 750 API metod, událostí a vlastností. Žádný člověk si je nemůže snadno pamatovat, ale počítače jsou v této věci dobré. Pomocí [JSON API dokumentace Electronu](https://electronjs.org/blog/api-docs-json-schema) jsme indexovali všechna tato data v Algolia, a nyní můžete snadno najít přesné API, které hledáte.

Pokoušíte se změnit velikost okna? Vyhledejte [`velikost`] a přejděte přímo na požadovanou metodu.

## Návody

Electron má neustále rostoucí kolekci výukových kurzů, které doplňují svou dokumentaci API . Nyní můžete snadněji najít výukové programy na daném tématu, přímo vedle související API dokumentace.

Hledáte osvědčené bezpečnostní postupy? Hledat [`security`].

## npm balíčky

V npm registru jsou nyní více než 700,000 balíčků a není to , co potřebujete. Pro snazší objevení těchto modulů jsme vytvořili [`elektronických npm-balíčků`], kolekce 3400+ modulů v rejstříku, který je postaven speciálně pro použití s Electronem.

Lidi na [knihovnách. o](https://libraries.io) vytvořili [SourceRank](https://docs.libraries.io/overview.html#sourcerank), systém pro bodování softwarových projektů založený na kombinaci metriky, jako je , kód, komunita, dokumentace a používání. Vytvořili jsme modul [`sourceranks`] , který obsahuje skóre každého modulu v registru npm, a my používáme toto skóre k řazení výsledků balíčku.

Chcete alternativy k vestavěným IPC modulům Electronu? Hledat [`is:package ipc`].

## Electron aplikace

Je [snadné indexovat data s Algolia](https://github.com/electron/algolia-indices), , takže jsme přidali stávající seznam aplikací z [elektroniky/aplikací](https://github.com/electron/apps).

Zkuste hledat [`hudbu`] nebo [`homebrew`].

## Filtrování výsledků

Pokud jste předtím použili vyhledávání kódu [GitHubu,](https://github.com/search) , pravděpodobně jste si vědomi dvojtečně oddělených filtrů s klíčovými hodnotami, jako je `rozšíření:js` nebo `user:defunkt`. Myslíme si, že tato filtrační technika je poměrně silná takže jsme přidali `je:` klíčové slovo k Electronovu vyhledávání, které vám umožní filtrovat výsledky pouze pro jeden typ:

- [`je:api náhled`]
- [`je:tutoriální bezpečnost`]
- [`is:package ipc`]
- [`is:app graphql`]

## Navigace klávesnice

Lidé milují klávesové zkratky! Nové hledání může být použito bez vyjmutí prstů z klávesnice:

- <kbd>/</kbd> zaostřuje vyhledávací vstup
- <kbd>esc</kbd> zaměří vyhledávání a vymaže ho
- <kbd>dolů</kbd> se přesune k dalšímu výsledku
- <kbd>nahoru</kbd> posune k předchozímu výsledku, nebo hledaný vstup
- <kbd>enter</kbd> otevře výsledek

Také jsme open-sourcovali [modul](https://github.com/electron/search-with-your-keyboard/) , který umožňuje interakci s klávesnicí. Je určen pro použití s Algolia InstantSearch, , ale je zobecněn pro povolení kompatibility s různými implementacemi vyhledávání.

## Chceme vaši zpětnou vazbu

Pokud narazíte na nějaké problémy s novým vyhledávacím nástrojem, chceme o tom slyšet!

Nejlepším způsobem, jak odeslat vaši zpětnou vazbu, je vyplnění problému na GitHub v příslušném úložišti :

- [electron/electronjs.org](https://github.com/electron/electronjs.org) je Electron webová stránka. Pokud nevíte, kde nahlásit problém, je to nejlepší sázka.
- [elektronické/algolia-indexy](https://github.com/electron/algolia-indices) je místo, kde se sestavují všechna data Electronu, která lze vyhledávat.
- [electron/search-with-your-klávesnice](https://github.com/electron/search-with-your-keyboard) umožňuje navigaci vyhledávacího rozhraní pomocí klávesnice.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) je klient na straně prohlížeče, který umožňuje vyhledávání typu hledání.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) je klient Node.js pro nahrávání dat na Algolia servery.

## Děkujeme

Zvláštní poděkování patří [Emily Jordan](https://github.com/echjordan) a [Vanessa Yuen](https://github.com/vanessayuenn) za vybudování těchto nových možností vyhledávání, až [knihovny. o](https://libraries.io) za poskytnutí [SourceRank](https://docs.libraries.io/overview.html#sourcerank) skóre a týmu v Algolii, který nám pomohl začít. 🍹