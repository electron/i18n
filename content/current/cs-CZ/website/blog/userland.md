---
title: Electron uživatelské území
author: zeke
date: '2016-12-20'
---

Přidali jsme novou [uživatelskou sekci](https://electronjs.org/userland) k Electronové stránce, která pomůže uživatelům objevit lidi, balíčky a aplikace, které tvoří náš prosperující ekosystém s otevřeným zdrojovým kódem.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Původ

Uživatelské území je místo, kde se lidé v softwarových komunitách setkávají a sdílejí nástroje a nápady. Termín pochází z komunity Unix, kde odkazoval na jakýkoli program, který běží mimo jádro, ale dnes to znamená něco dalšího. Když lidé v dnešní Javascriptové komunitě odkazují na uživatelskou zemi, obvykle mluví o [npm registru balíčků](http://npm.im). V tomto ohledu dochází k většině pokusů a inovacím, zatímco uzel a jazyk JavaScriptu (jako je jádro Unix) zachovává poměrně malou a stabilní sadu základních funkcí.

## Uzel a Electron

Stejně jako Node, Electron má malou sadu základních API. Ty poskytují základní funkce potřebné pro vývoj víceplatformních desktopových aplikací. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used.

Uživatelské území je protějškem "jádra" umožňující uživatelům vytvářet a sdílet nástroje, které rozšiřují funkčnost Electronu.

## Shromažďování údajů

Abychom lépe pochopili trendy v našem ekosystému, jsme analyzovali metadata z 15, 00 veřejných GitHub repozitářů , které jsou závislé na `elektroronu` nebo `elektronicky předsestavených`

Použili jsme [GitHub API](https://developer.github.com/v3/), knihovny [. o API](https://libraries.io/api), a npm registr shromažďují informace o závislostech, závislosti na vývoji, závislí, autoři balíčků, přispěvatelé repo, počty stahování, počty forků, stargazer atd.

Poté jsme tyto údaje použili pro generování následujících zpráv:

- [Závislosti rozvoje aplikací](https://electronjs.org/userland/dev_dependencies): Balíčky nejčastěji uvedeny jako `devDependencies` v Electronových aplikacích.
- [Přispěvatelé GitHub](https://electronjs.org/userland/github_contributors): Uživatelé GitHub, kteří přispěli do mnoha GitHub repositářů.
- [Závislosti balíčků](https://electronjs.org/userland/package_dependencies): Elektronické npm balíčky, které jsou často závislé na jiných balíčcích npm.
- [S hvězdičkou](https://electronjs.org/userland/starred_apps): Electron aplikace (které nejsou balíčky npm) s mnoha stargazery.
- [Nejvíce stažených balíčků](https://electronjs.org/userland/most_downloaded_packages): Balíky související s Electronmem, které jsou hodně staženy.
- [Závislosti aplikací](https://electronjs.org/userland/dependencies): Balíčky nejčastěji uvedeny jako `závislosti` v aplikacích.
- [Autoři balíčků](https://electronjs.org/userland/package_authors): Nejrozšířenější autoři elektronických npm balíčků.

## Filtrování výsledků

Reporty jako [závislosti aplikací](https://electronjs.org/userland/dependencies) a [s hvězdičkou](https://electronjs.org/userland/starred_apps) , které zobrazují balíčky, aplikace a repozitáře mají textový vstup, který lze použít k filtrování výsledků.

Když napíšete tento vstup, URL stránky je aktualizována dynamicky. Toto umožňuje zkopírovat URL adresu představující konkrétní část uživatelských dat a pak ji sdílet s ostatními.

[![babička](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Další příchod

Tento první soubor zpráv je jen začátek. Budeme nadále shromažďovat data o tom, jak komunita buduje Electron, a přidáme nové zprávy na web.

Všechny nástroje používané pro sběr a zobrazení těchto dat jsou otevřeným zdrojem:

- [elektronick/elektronjs.org](https://github.com/electron/electron.atom): Webová stránka Electronu.
- [electron/electron-userland-reports](https://github.com/electron/electron-userland-reports): Slices of data about packages, repo and users in Electron userland.
- [elektronick/repos-using-elektronron](https://github.com/electron/repos-using-electron): Všechny veřejné repositáře na GitHubu, které závisejí na `elektroronu` nebo `elektronicky předkompilovaném`
- [electron/electron-npm-packages](https://github.com/zeke/electron-npm-packages): Všechny npm balíčky, které zmiňují `elektroron` ve svém souboru `package.json`.

Máte-li nápady, jak tyto zprávy zlepšit, dejte nám prosím vědět [o otevření problému v úložišti webových stránek](https://github.com/electron/electronjs.org/issues/new) nebo v některém z výše uvedených repo obchodů.

Díky Vám, Electronové komunitě za to, že jste vytvořili uživatelskou zemi to, co je dnes!

