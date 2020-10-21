---
title: 'Electron interals&#58; Používání uzlu jako knihovny'
author: zcbenz
date: '2016-08-08'
---

Toto je druhý příspěvek v probíhající sérii vysvětlující interakce Electron. Podívejte se na [první příspěvek](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) o integraci cyklu událostí , pokud jste již neměli.

Většina lidí používá [uzel](https://nodejs.org) pro serverové aplikace, ale z důvodu bohaté API sady a vzkvétající komunity Node je také skvělý vyhovující pro vloženou knihovnu. Tento příspěvek vysvětluje, jak je uzel používán jako knihovna v Electronu.

---

## Sestavit systém

Uzel i Electron používají jako své stavební systémy [`GYP`](https://gyp.gsrc.io). Pokud chcete vložit uzel do aplikace, musíte jej použít také jako svůj systém pro sestavování.

Jste na `GYP`? Před pokračováním v tomto příspěvku si přečtěte [tento návod](https://gyp.gsrc.io/docs/UserDocumentation.md).

## Vlajky uzlu

[`uzel. yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) soubor v adresáři zdrojových kódů uzlu popisuje, jak je vytvořen uzel , společně se spoustou proměnných [`GYP`](https://gyp.gsrc.io) , které určují, které části uzlu jsou povoleny a zda mají být otevřeny určité konfigurace.

Pro změnu parametrů sestavení musíte nastavit proměnné v souboru `.gypi` z vašeho projektu. `configure` skript v uzlu vám může generovat některé běžné konfigurace, například běžící `. configure --shared` vygeneruje a `config.gypi` s proměnnými instrukujícími uzel, které mají být postaveny jako sdílená knihovna.

Electron nepoužívá `configure` skript, protože má vlastní build skripty. Konfigurace pro uzel jsou definovány v souboru [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) v kořenovém adresáři Electronu.

## Propojit uzel s Electron

V elektrolýze Uzel je propojen jako sdílená knihovna nastavením proměnné `GYP` `node_shared` na `true`takže typ Node sestavení bude změněn z `spustitelný soubor` na `shared_library`, a zdrojový kód obsahující vstupní bod `hlavního` uzlu nebude kompilován.

Jelikož Electron používá knihovnu V8 dodávanou s Chromiem, není použita knihovna V8 zahrnutá do zdrojového kódu Node. To se provádí nastavením `node_use_v8_platform` a `node_use_bundled_v8` na `false`.

## Sdílená knihovna nebo statická knihovna

Při propojení s uzlem existují dvě možnosti: buďto můžete vytvořit uzel jako statickou knihovnu a zahrnout jej do konečného spustitelného souboru, nebo ji můžete postavit jako sdílenou knihovnu a odeslat ji vedle konečného spustitelného souboru.

V Electronu byl uzel postaven jako statická knihovna po dlouhou dobu. Díky tomu sestavil jednoduchý sestavení, povolil nejlepší optimalizaci kompilátoru a umožnil Electronu distribuovat bez extra `node.dll` souboru.

To se však změnilo po přepnutí Chrome na použití [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL je fork [OpenSSL](https://www.openssl.org) , který odstraňuje několik nepoužívaných API a mění mnoho stávajících rozhraní. Protože uzel stále používá OpenSSL, kompilátor by generoval mnoho chyb spojených kvůli protichůdným symbolům, pokud by byly propojeny dohromady.

Electron nemohl použít BoringSSL v uzlu nebo použít OpenSSL v Chromiu, takže jedinou možností bylo přepnout na stavbu uzlu jako sdílené knihovny, a [skrýt symboly BoringSSL a OpenSSL](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) v jednotlivých komponentách.

Tato změna přinesla Electronu pozitivní vedlejší účinky. Před touto změnou nemohli jste přejmenovat spustitelný soubor Electronu na Windows, pokud jste použili nativní moduly, protože název spustitelného souboru byl v importní knihovně s velkým kódem. After Node was built as a shared library, this limitation was gone because all native modules were linked to `node.dll`, whose name didn't need to be changed.

## Podpora nativních modulů

[Nativní moduly](https://nodejs.org/api/addons.html) v práci s uzlem definováním vstupní funkce uzlu, který se má načítat, a poté vyhledávat symboly V8 a libuv z Node. Toto je trochu problémové pro embeddery, protože ve výchozím nastavení jsou symboly V8 a libuv skryté při vytváření uzlu jako knihovny a nativní moduly nenačtou , protože tyto symboly nemohou najít.

Takže aby původní moduly fungovaly, byly v Electronu odhaleny symboly V8 a libuv . Pro V8 se to provádí tak, že se projeví [a všechny symboly v konfiguračním souboru Chromia](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). Pro libuv, je dosaženo [nastavením `BUILDING_UV_SHARED=1` definice](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228).

## Spouštění uzlu ve vaší aplikaci

Po všech pracích budování a propojení s uzlem je posledním krokem spuštění uzlu ve vaší aplikaci.

Uzel neposkytuje mnoho veřejných API pro vložení do jiných aplikací. Obvykle můžete zavolat [`uzlů::Start` a `uzel::Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) a spustit novou instanci uzlu. Pokud však budujete komplexní aplikaci založenou na Node, musíte použít APIs jako `uzl::CreateEnvironment` pro přesné ovládání každého kroku.

V Electronu je uzel spuštěn ve dvou režimech: samostatný režim, který běží v hlavním procesu , což je podobné oficiálním binarům uzlu a vloženému režimu , který vloží API uzlu do webových stránek. Podrobnosti budou vysvětleny v budoucím příspěvku.

