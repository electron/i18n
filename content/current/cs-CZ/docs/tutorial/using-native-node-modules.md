# Používání nativních Node modulů

Nativní moduly uzlu jsou podporovány Elektronem, ale protože Electron je velmi , pravděpodobně použije jinou verzi V8 než binární uzel nainstalovaný na vašem systému, moduly, které používáte budou muset být rekompilovány pro Electron. V opačném případě dostanete následující třídu chyb, když se pokusíte spustit aplikaci:

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

Můžete nainstalovat moduly jako ostatní projekty uzlu a pak znovu sestavit moduly pro Electron s balíčkem [`elektron-rebuild`](https://github.com/electron/electron-rebuild). Tento modul může automaticky určit verzi Electronu a zpracovat manuální kroky stahování hlaviček a přestavbu nativních modulů pro vaši aplikaci.

Například, nainstalovat `elektronick-rebuild` a poté znovu sestavit moduly s ní pomocí příkazové řádky:

```sh
npm install --save-dev electron-rebuild

# Pokaždé, když spustíte "npm install", spusťte toto:
./node_modules/. in/electron-rebuild

# Pokud máte potíže, vyzkoušejte:
.\node_modules\.bin\electron-rebuild.cmd
```

Další informace o používání a integraci s jinými nástroji naleznete v ČERVETNÉ.

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

Pokud moduly poskytují binární soubory pro použití v elektronikě, ujistěte se, že vynecháte proměnnou `--build-from-source` a `npm_config_build_from_source` prostředí , abyste plně využili předkompilovaných binárních souborů.

## Moduly, které spoléhají na `uzel pre-gyp`

Nástroj [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) poskytuje způsob, jak umístit moduly nativní uzel s předsestavenými binárními soubory, a mnoho populárních modulů jej používá.

Obvykle tyto moduly fungují dobře pod elektronem, ale někdy když Electron používá novější verzi V8 než Node a/nebo jsou změny ABI, mohou se vyskytnout špatné věci . Takže obecně se doporučuje vždy vytvářet nativní moduly ze zdrojového kódu . `elektronická rebuild` to pro vás automaticky ovládá.

Pokud sledujete `npm` způsob instalace modulů, pak se to provádí ve výchozím nastavení, pokud ne, musíte předat `--build-from-source` `npm`, nebo nastavte proměnnou prostředí `npm_config_build_from_source`.
