---
title: Podpora Apple Silicon
author: Marshallovo zvuk
date: '2020-10-15'
---

Vzhledem k tomu, že hardware Apple Silicon bude vydán později v letošním roce, Jaká cesta vypadá tak, aby vaše Electron aplikace běžela na novém hardwaru?

---

S vydáním Electron 11.0.0-beta. , Electron tým je nyní lodní stavba Electronu, která běží na novém Apple Silicon hardwaru, který Apple plánuje na dopravu později v tomto roce. Nejnovější beta verzi si můžete vzít pomocí `npm nainstalovat electron@beta` nebo ji stáhnout přímo z našich [webových stránek s release](https://electronjs.org/releases/stable).

## Jak to funguje?

Od Electronu 11 budeme zasílat samostatné verze Electronu pro Intel Macs a Apple Silicon Macs. Před touto změnou jsme již přepravovali dva artefakty, `darwin-x64` a `mas-x64`. s tím, že je to pro využití kompatibility s Mac App Store. Nyní přepravujeme další dva artefakty, `darwin-arm64` a `mas-arm64`, které jsou ekvivalenty Apple Silicon uvedených artefaktů.

## Co potřebuji udělat?

Budete muset odeslat dvě verze vaší aplikace: jednu pro x64 (Intel Mac) a jednu pro arm64 (Apple Silicon). Dobrá zpráva je, že [`elektronický balík`](https://github.com/electron/electron-packager/), [`elektronické rebuild`](https://github.com/electron/electron-rebuild/) a [`elektronická forge`](https://github.com/electron-userland/electron-forge/) již podporují zaměření na architekturu `arm64`. Dokud používáte nejnovější verze těchto balíčků, vaše aplikace by měla fungovat bezchybně, jakmile aktualizujete cílovou architekturu na `arm64`.

V budoucnu vydáme balíček, který vám umožní "sloučit" vaše `arm64` a `x64` aplikace do jediného univerzálního binárního souboru, ale stojí za zmínku, že tento binární soubor by byl _velký_ a pravděpodobně není ideální pro dopravu uživatelům.

## Potenciální problémy

### Nativní moduly

Při zaměřování na novou architekturu budete muset aktualizovat několik závislostí, které mohou způsobit problémy při sestavování. Minimální verze určitých závislostí je pro váš odkaz uvedena níže.

| Závislost                   | Požadavek na verzi |
| --------------------------- | ------------------ |
| Xcode                       | `>=12.2.0`      |
| `uzlová tělíska`            | `>=7.1.0`       |
| `elektronická rekonstrukce` | `>=1.12.0`      |
| `elektronický balík`        | `>=15.1.0`      |

V důsledku těchto požadavků na verzi závislosti, možná budete muset opravit/aktualizovat některé nativní moduly.  Jednou z poznámek je, že Xcode upgrade zavede novou verzi macOS SDK, což může způsobit selhání sestavení vašich nativních modulů.


## Jak to testovat?

Aplikace Apple Silicon v současné době běží pouze na hardwaru Apple Silicon Apple, který není komerčně dostupný v době psaní tohoto blogu. Pokud máte [vývojářskou sadu](https://developer.apple.com/programs/universal/), můžete vyzkoušet svou aplikaci. V opačném případě budete muset počkat na vydání hardwaru Apple Silicon pro testování, pokud vaše aplikace funguje.

## A co Rosetta 2?

Rosetta 2 je nejnovější iterace své [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) technologie Apple, který vám umožňuje spouštět x64 Intel aplikace na jejich novém hardwaru arm64 Apple Silicon software. Ačkoli jsme přesvědčeni, že x64 Electron aplikace budou spuštěny pod Rosetta 2, jsou zde některé důležité věci, které můžete zaznamenat (a důvody, proč byste měli odeslat nativní binární arm64).

* Výkon aplikace bude výrazně snížen. Electron / V8 používá [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) kompilaci pro JavaScript a kvůli tomu, jak funguje Rosetta, budete účinně běžet JIT dvakrát (jednou ve V8 a jednou v Rosetta).
* Ztrácíte výhodu nových technologií v Apple Silicon, jako je větší velikost stránky paměti.
* Zmínili jsme, že výkon **bude výrazně** zhoršen?
