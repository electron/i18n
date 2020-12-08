# Používání nativních Node modulů

Native Node.js modules are supported by Electron, but since Electron has a different [application binary interface (ABI)](https://en.wikipedia.org/wiki/Application_binary_interface) from a given Node.js binary (due to differences such as using Chromium's BoringSSL instead of OpenSSL), the native modules you use will need to be recompiled for Electron. V opačném případě dostanete následující třídu chyb, když se pokusíte spustit aplikaci:

```sh
Chyba: Modul '/path/to/native/module.node'
byl kompilován proti jiné verzi Node.js pomocí
NODE_MODULE_VERSION $XYZ. Tato verze Node.js vyžaduje
NODE_MODULE_VERSION $ABC. Zkuste prosím překompilovat nebo přeinstalovat
modul (například pomocí `npm rebuil` nebo `npm install`).
```

## Jak nainstalovat nativní moduly

Existuje několik různých způsobů, jak nainstalovat nativní moduly:

### Instalace modulů a přestavba Electronu

Můžete nainstalovat moduly jako ostatní projekty uzlu a pak znovu sestavit moduly pro Electron s balíčkem [`elektron-rebuild`](https://github.com/electron/electron-rebuild). This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app. If you are using [Electron Forge](https://electronforge.io/), this tool is used automatically in both development mode and when making distributables.

For example, to install the standalone `electron-rebuild` tool and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools such as [Electron Packager](https://github.com/electron/electron-packager), consult the project's README.

### Používá se `npm`

By setting a few environment variables, you can use `npm` to install modules directly.

Například, nainstalovat všechny závislosti pro Electron:

```sh
# Verze Electronu.
exportovat npm_config_target=1.2.3
# Architektura Electronu, viz https://electronjs.org/docs/tutorial/support#supported-platform
# pro podporované architektury.
exportovat npm_config_arch=x64
export npm_config_target_arch=x64
# Záhlaví stahování Electronu.
export npm_config_disturl=https://electronjs.org/headers
# Tell node-pre-gyp, který vytváříme pro Electron.
exportovat npm_config_runtime=electron
# Tell node-pre-gyp pro sestavení modulu ze zdrojového kódu.
exportovat npm_config_build_from_source=true
# Nainstalujte všechny závislosti a uložte mezipaměť do ~/.electron-gyp.
HOME=~/.electron-gyp npm instalace
```

### Ruční stavba pro Electron

Pokud jste vývojář, který vyvíjí nativní modul a chcete jej otestovat proti Electronu, možná budete chtít znovu sestavit modul pro Electron ručně. Můžete použít `node-gyp` přímo pro sestavení pro Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` se změní, kde najít vývojové hlavičky.
* `--target=1.2.3` je verze Electron.
* `--dist-url=...` určuje kam stáhnout hlavičky.
* `--arch=x64` říká, že modul je vytvořen pro 64bitový systém.

### Ruční stavba pro vlastní sestavení Electronu

Chcete-li kompilovat nativní moduly uzlu proti vlastní verzi Electronu, která neodpovídá veřejné verzi, instruujte `npm` k použití verze uzlu, kterou jste vložili do vašeho vlastního sestavení.

```sh
npm rebuild --nodedir=/cesta/to/electron/vendor/node
```

## Odstranění problémů

Pokud jste nainstalovali nativní modul a zjistili, že nefunguje, musíte zkontrolovat následující věci:

* Pokud máte pochybnosti, nejprve spusťte `elektron-rebuild`.
* Ujistěte se, že nativní modul je kompatibilní s cílovou platformou a architekturou pro vaši Electron aplikaci.
* Ujistěte se, že `win_delay_load_hook` není nastaven na `false` v modulu `binding.gyp`.
* Po aktualizaci Electronu je obvykle potřeba moduly znovu sestavit.

### Poznámka o `win_delay_load_hook`

Ve výchozím nastavení `node-gyp` propojuje nativní moduly s `node.dll`. Avšak v Electronu 4.x a vyšší jsou symboly potřebné pro původní moduly exportovány `elektronem. xe`a neexistuje žádný `node.dll`. Pro načítání nativních modulů do systému Windows, `node-gyp` nainstaluje [zpožděné zatížení hák](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) , které spustí při načtení nativního modulu, a přesměruje uzel `. bude` odkazovat na místo hledání `uzlu. Bude` v knihovně hledat cestu (která by nic nepřinesla). Na Electron 4.x a vyšší, `'win_delay_load_hook': 'true'` je vyžadováno načíst nativní moduly.

Pokud se zobrazí chyba jako `Modul se nezaregistroval sám`, nebo `Zadaná
procedura nebyla nalezena`, to může znamenat, že modul, který se snažíte použít , neobsahoval správně zavěšení zpoždění.  Je-li modul postaven s uzlovou tělískou, ujistěte se, že proměnná `win_delay_load_hook` je nastavena na `true` v v `, která je závazná. yp` soubor a není nikde přepsán.  je-li modul vytvořen s jiným systémem, musíte se ujistit, že stavíte pomocí zavěšení s časovým zatížením nainstalovaného v hlavním `. soubor od` Váš `link.exe` vyvolání by mělo vypadat takto:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

Zejména je důležité, aby:

* propojíte se s `node.lib` od _Electron_ a ne s Nodem. Pokud odkazujete na špatný `node.lib` , zjistíte chyby načítání, když potřebujete modul v Electronu.
* obsahuje vlajku `/DELAYLOAD:node.exe`. Pokud uzel `. xe` odkaz není opožděn, pak háček se zpožděným zatížením nedostane šanci vystřelit a symboly uzlu nebudou správně vyřešeny.
* `win_delay_load_hook.obj` je propojen přímo do posledního DLL. Pokud je háček nastaven v závislém DLL, nebude střelit v pravý čas.

Podívejte se na [`uzlů-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) pro příklad zpožděného načítání háku, pokud implementujete svůj vlastní.

## Moduly, které se spoléhají na `prebuild`

[`Předsestavení`](https://github.com/prebuild/prebuild) poskytuje způsob, jak publikovat nativní moduly uzlu s předsestavenými binárními soubory pro více verzí uzlu a Electron.

If the `prebuild`-powered module provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Moduly, které spoléhají na `uzel pre-gyp`

Nástroj [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) poskytuje způsob, jak umístit moduly nativní uzel s předsestavenými binárními soubory, a mnoho populárních modulů jej používá.

Sometimes those modules work fine under Electron, but when there are no Electron-specific binaries available, you'll need to build from source. Because of this, it is recommended to use `electron-rebuild` for these modules.

If you are following the `npm` way of installing modules, you'll need to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.
