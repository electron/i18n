---
title: Node.js native Addons a Electron 5.0
author: BinaryMuse
date: '2019-02-01'
---

Pokud máte potíže s používáním nativního Node.js addon s Electron 5. , je tu šance, že je třeba aktualizovat pro práci s nejnovější verzí V8.

---

## Sbohem `v8:::Handle`, Ahoj `v8::Local`

V roce 2014 tým V8 ztroskotal `v8:::Handle` ve prospěch `v8::Local` pro místní manipulace. Electron 5.0 obsahuje verzi V8, která nakonec odstranila `v8::Handle` pro dobré, a nativní uzel. s doplňky, které je stále používají, budou muset být aktualizovány dříve, než je bude možné použít s Electron 5.0.

Požadovaná změna kódu je minimální, ale *každý* nativní Node modul, který stále používá `v8::Handle` nebude sestaven s Electron 5. a bude muset být upraven. Dobrou zprávou je, že Node. s v12 zahrne také tuto změnu V8, aby všechny moduly, které používají `v8:::Handle` , musely být přesto aktualizovány ** pro práci s nadcházející verzí Node.

## Mám vlastní doplněk, jak mohu pomoci?

Pokud udržujete původní doplněk pro Node.js, ujistěte se, že nahradíte všechny výskyty `v8:::Handle` `v8:Local`. První z nich byl jen přezdívkou druhého, takže není třeba provádět žádné další změny, které by řešily tento konkrétní problém.

Můžete se také zajímat o zkoumání [N-API](https://nodejs.org/api/n-api.html), které je udržováno odděleně od V8 jako součást Node. Sám a jeho cílem je izolovat nativní doplňky od změn v základním JavaScriptovém enginu. Více informací [naleznete v dokumentaci N-API na webu Node.js](https://nodejs.org/api/n-api.html#n_api_n_api).

## Nápověda! Používám v mé aplikaci doplněk a nebude to fungovat!

Pokud konzumujete nativní doplněk pro Node. s ve vaší aplikaci a původní doplněk se kvůli tomuto problému nebude vytvářet, zkontrolujte autora doplňku a zjistěte, zda uvolnili novou verzi, která problém opraví. Pokud ne, oslovení autora (nebo [otevření Pull Request!](https://help.github.com/articles/about-pull-requests/)je pravděpodobně vaše nejlepší sázka.
