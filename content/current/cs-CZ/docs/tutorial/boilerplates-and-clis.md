# Boilerplates and CLIs

Vývoj Electronu je nepřipnutý - neexistuje žádná "jediná pravda" pro vývoj, stavbu, balíček nebo vydání aplikace Electron. Dodatečné vlastnosti pro Electron, a to jak pro běh, tak i pro běh, lze obvykle nalézt na [npm](https://www.npmjs.com/search?q=electron) v jednotlivých balíčcích, umožňuje vývojářům postavit aplikaci a postavit potřebné potrubí.

Tato úroveň modularity a rozšiřitelnosti zajišťuje, že všichni vývojáři pracují s Electronem, jak velkými, tak malými co do velikosti týmu, nejsou nikdy omezováni v tom, co mohou nebo nemohou dělat kdykoli během svého vývoje životního cyklu. Avšak pro mnoho vývojářů, jeden z komunitně poháněných kotlových desek nebo příkazové řádky může výrazně zjednodušit jejich kompilaci, balit a uvolnit aplikaci.

## Varo.com.chikitaisaac123@gmail.com

Kotelová deska je pouze výchozím bodem - plátno, abych tak řekl, ze kterého vytváříte svou aplikaci. Obvykle přicházejí ve formě repozitáře, který můžete klonovat a přizpůsobit obsahu Vašeho srdce.

Nástroj příkazové řádky vás na druhé straně nadále podporuje v průběhu vývoje a vydání . Jsou užitečnější a podporovanější, ale prosazují pokyny, jak by váš kód měl být strukturován a budován. *Zejména pro začátečníky, pomocí nástroje příkazové řádky bude pravděpodobně nápomocný*.

## elektronová kovárna

"Kompletní nástroj pro budování moderních elektronových aplikací". Electron Forge sjednotí stávající (a dobře spravované) stavební nástroje pro vývoj Electronu do soudržného balíčku, aby každý mohl přeskočit přímo na vývoj Electronu .

Forge přichází s [šablonou připravenou k použití](https://electronforge.io/templates) používající Webpack jako bundler. Obsahuje ukázkovou konfiguraci typů a poskytuje dva konfigurační soubory, které umožňují snadné přizpůsobení. Používá stejné základní moduly používané větší Electron komunitou (např. [`elektron-packager`](https://github.com/electron/electron-packager)) – změn provedených správci Electronu (jako Slack) ve prospěch uživatelů Forge, také.

Více informací a dokumentace naleznete na [electronforge.io](https://electronforge.io/).

## elektronický stavitel

„Kompletní řešení pro balíček a sestavení aplikace připravené pro distribuci Electron“ , která se zaměřuje na integrovaný zážitek. [`elektronický tvůrce`](https://github.com/electron-userland/electron-builder) přidává jednu jednotnou závislost zaměřenou na jednoduchost a spravuje všechny další požadavky interně.

`elektronick-builder` nahrazuje funkce a moduly používané správci Electron (jako například automatický aktualizátor) vlastními. Obecně jsou integrovanější, ale budou mít méně společného s populárními Electron aplikacemi jako Atom, Visual Studio Code nebo Slack.

Více informací a dokumentace naleznete v [repozitáři](https://github.com/electron-userland/electron-builder).

## elektronická reakční kotle

Pokud nechcete žádné nástroje, ale pouze tuhý kotelní deska, ze které chcete stavět. CT linka [`elektronická reakční deska`](https://github.com/chentsulin/electron-react-boilerplate) může mít cenu vzhled. Je to velmi populární v komunitě a interně používá `elektroniku` .

## Ostatní nástroje a vařiče

Seznam ["Awesome Electron"](https://github.com/sindresorhus/awesome-electron#boilerplates) obsahuje další nástroje a kotle pro výběr. If you find the length of the list intimidating, don't forget that adding tools as you go along is a valid approach, too.
