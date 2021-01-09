---
title: "Nová mezinárodní webová stránka Electronu"
author: zeke
date: '2017-11-13'
---

Electron má nový web na [electronjs.org](https://electronjs.org)! Nahradili jsme naše statické stránky Jekyll uzlem. s webový server, který nám dává flexibilitu internacionalizovat stránky a vydláždit cestu pro více zajímavých funkcí.

---

## 🌍 Překlady

Zahájili jsme proces internacionalizace webové stránky s cílem zpřístupnit vývoj aplikace Electron globálnímu publiku vývojářů. Používáme lokalizační platformu s názvem [Crowdin](https://crowdin.com/project/electron) , která integruje s GitHubem, otevírání a aktualizace požadavků na natažení je automaticky přeloženo do různých jazyků.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav ve zjednodušené čínštině">
    <figcaption>Electronův Nav ve zjednodušené čínštině</figcaption>
  </a>
</figure>

I když jsme na tomto úsilí dosud pracovali v ticho; více než 75 členů Electronové komunity již projekt objevilo organicky a připojilo se k úsilí o internacionalizaci webových stránek a přeložit Electronovy dokumenty do více než 20 jazyků. Vidíme [denní příspěvky](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) od lidí po celém světě, s překlady pro jazyky, jako jsou francouzština, vietnamština, indonéština a čínština, které stojí v čele.

Chcete-li si vybrat jazyk a zobrazit průběh překladu, navštivte [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Aktuální cílové jazyky na Crowdin">
    <figcaption>Probíhají překlady na Crowdin</figcaption>
  </a>
</figure>

Pokud máte vícejazyčné a zajímavé pomoci s překladem elektronických dokumentů a webových stránek, navštivte [elektronick/elektron-i18n](https://github.com/electron/electron-i18n#readme) repo, nebo skočit přímo do překladu na [Crowdin](https://crowdin.com/project/electron), kde se můžete přihlásit pomocí svého GitHub účtu.

V současné době je v projektu Electron na Crowdinu povoleno 21 jazyků. Přidávání podpory pro další jazyky je snadné, takže pokud máte zájem o pomoc s překladem, ale nevidíte váš jazyk, [nám dejte vědět](https://github.com/electron/electronjs.org/issues/new) a budeme ho povolit.

## Syrové přeložené dokumenty

Pokud dáváte přednost čtení dokumentace v syrových markdown souborech, to můžete nyní udělat v libovolném jazyce:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Stránky aplikací

Počínaje dneškem může mít každá aplikace Electron snadno svou vlastní stránku na webu Electron . Pro několik příkladů se podívejte na [Etcher](https://electronjs.org/apps/etcher), [1Clipboard](https://electronjs.org/apps/1clipboard), nebo [GraphQL Playground](https://electronjs.org/apps/graphql-playground), zobrazeno zde na japonské verzi stránky:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="GraphQL hřiště">
  </a>
</figure>

Existují některé neuvěřitelné Electronové aplikace, ale nejsou vždy snadné najít a ne každý vývojář má čas nebo zdroje na vytvoření vhodné webové stránky pro uvedení na trh a distribuci své aplikace.

Použitím pouze [PNG ikony a malého množství metadat aplikace](https://github.com/electron/electron-apps/blob/master/contributing.md), jsme schopni shromáždit spoustu informací o dané aplikaci. Pomocí dat shromážděných z GitHubu mohou stránky aplikací nyní zobrazovat snímky obrazovky, odkazy ke stažení, verze, poznámky k vydání a ČÍTNUTÍ pro každou aplikaci, která má veřejný úložiště. Pomocí barevné palety extrahované z každé ikony aplikace, můžeme vyrobit [tučně a přístupné barvy](https://github.com/zeke/pick-a-good-color) , abychom jednotlivým aplikacím poskytli určitou vizuální odlišnost.

[aplikace index](https://electronjs.org/apps) má nyní také kategorie a filtr klíčových slov pro nalezení zajímavých aplikací, jako je [GraphQL GUI](https://electronjs.org/apps?q=graphql) a [nástrojů p2p](https://electronjs.org/apps?q=graphql).

Pokud máte Electron aplikaci, kterou byste rádi označili na stránce, otevřete požadavek na natažení na [elektronické/elektronické aplikace](https://github.com/electron/electron-apps) repozitáři.

## Jednořádková instalace s Homebrew

[Homebrew](https://brew.sh) správce balíčků pro macOS má podpříkaz s názvem [cask](https://caskroom.github.io) , který umožňuje snadnou instalaci desktopových aplikací pomocí jednoho příkazu ve vašem terminálu, jako `varovat v sudu atom`.

Začali jsme sbírat jména v kostkách Homebrew pro populární Electron aplikace a nyní zobrazují instalační příkaz (pro macOS návštěvníky) na každé stránce aplikace , která má susk:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Možnosti instalace na míru pro vaši platformu: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Chcete-li zobrazit všechny aplikace, které mají homebrew cask, navštivte [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Pokud znáte jiné aplikace s maskami, které ještě nebyly indexovány, [přidejte je!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Nová doména

Stránku jsme přesunuli z electron.atom.io do nové domény: [electronjs.org](https://electronjs.org).

Projekt Electron se narodil uvnitř [Atom](https://atom.io), GitHubův open-source textový editor postavený na webových technologiích. Electron byl původně nazýván `atom-shell`. Atom byla první aplikací, která ji použila, ale netrvalo dlouho, než si folks uvědomil, že tento kouzelný Chromium + uzel běh lze použít pro všechny druhy různých aplikací. Když společnosti jako Microsoft a Slack začaly používat `atom-shell`, vyšlo najevo, že projekt potřebuje nový název.

A tak se narodil "Electron". Na počátku roku 2016 GitHub sestavil nový tým, který se zaměří konkrétně na vývoj a údržbu Electronu, kromě společnosti Atom. V době od té doby byl Electron přijat tisíci vývojáři aplikací, a je nyní závislý na mnoha velkých společnostech, z nichž mnohé mají Electron týmy vlastní.

Podpora GitHubu Electronových projektů, jako je Atom a [GitHub Desktop](https://desktop.github.com) , je pro náš tým stále prioritou, ale tím, že přejdeme do nové domény, doufáme, že pomůže objasnit technické rozlišení mezi Atom a Electron.

## 🐢🚀 Node.js všude

Předchozí webové stránky Electronu byly vytvořeny s [Jekyll](https://jekyllrb.com), oblíbeným statickým generátorem webu založeným na pravidlech. Jekyll je skvělý nástroj pro vytváření statických webových stránek, ale webové stránky začaly tento nástroj překonávat. Chtěli jsme dynamičtější možnosti jako správné přesměrování a dynamické vykreslování obsahu, takže samozřejmou volbou byl server [Node.js](https://nodejs.org).

Electron ekosystém obsahuje projekty s komponenty napsanými v mnoha různých programovacích jazycích, od Pythonu po C++ až po Bash. Ale JavaScript je pro Electron základní, a je to nejpoužívanější jazyk v naší komunitě.

Migrováním webové stránky z Ruby na Node.js se snažíme snížit bariéru na vstup pro lidi, kteří chtějí přispět na webovou stránku.

## ⚡ Snadnější Open-Source účast

Pokud máte [Node. s](https://nodejs.org) (8 nebo vyšší) a [git](https://git-scm.org) nainstalováno ve vašem systému, můžete snadno spustit portál lokálně:

```sh
git klonone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

Nový web je hostován na Heroku. Používáme zaváděcí potrubí a funkci [Review Apps](https://devcenter.heroku.com/articles/github-integration-review-apps) , která automaticky vytvoří spuštěnou kopii aplikace pro každý požadavek na natažení . To umožňuje recenzentům zobrazit skutečné účinky žádosti o natažení na živou kopii webu.

## 🙏 Díky přispěvatelům

Chtěli bychom zvlášť poděkovat všem lidem po celém světě, kteří přispěli svým vlastním časem a energií, aby pomohli vylepšit Electron. Nadšení komunity s otevřeným zdrojovým kódem pomohlo nezměrně přispět k úspěchu Electronu. Děkujeme!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>