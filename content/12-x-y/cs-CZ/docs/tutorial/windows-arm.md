# Windows 10 v paži

Pokud vaše aplikace běží s Electronem 6.0.8 nebo později, můžete ji nyní sestavit pro Windows 10 v ruce. This considerably improves performance, but requires recompilation of any native modules used in your app. It may also require small fixups to your build and packaging scripts.

## Spuštění základní aplikace

Pokud vaše aplikace nepoužívá žádné nativní moduly, je opravdu snadné vytvořit Arm verzi vaší aplikace.

1. Ujistěte se, že adresář `node_modules vaší aplikace` je prázdný.
2. Pomocí _příkazu Prompt_spusťte `nastavit npm_config_arch=arm64` před spuštěním `npm install`/`yarn install` jako obvykle.
3. [Pokud máte Electron nainstalovaný jako vývojová závislost](quick-start.md#prerequisites), npm stáhne a rozbalí verzi arm64. Můžete pak balíček a distribuovat aplikaci jako normální.

## Obecné úvahy

### Specifický kód architektury

Lots of Windows-specific code contains if... else logic that selects between either the x64 or x86 architectures.

```js
if (process.arch === 'x64') {
  // Do 64bitových věcí...
} else {
  // Do 32 bitů...
}
```

Pokud se chcete zaměřit na arm64, logika jako je tato, obvykle zvolí špatnou architekturu, tak pečlivě zkontrolujte vaši aplikaci a sestavte skripty pro podmínky, jako je tato. Ve vlastních sestavách a balících skriptech byste měli vždy zkontrolovat hodnotu `npm_config_arch` v prostředí, Namísto spoléhání se na aktuální oblouk procesu.

### Nativní moduly

Pokud používáte nativní moduly, musíte se ujistit, že se kompilují proti v142 kompilátoru MSVC (uvedeného v Visual Studio 2017). Musíte také zkontrolovat, že všechny předsestavené `.dll` nebo `. ib` soubory poskytované nebo odkazované nativním modulem jsou dostupné pro Windows on Arm.

### Testování vaší aplikace

Chcete-li vyzkoušet aplikaci, použijte Windows na Arm zařízení s Windows 10 (verze 1903 nebo novější). Ujistěte se, že zkopírujete svou aplikaci do cílového zařízení - pískovec Chromia nebude pracovat správně při načítání prostředků aplikace z místa sítě.

## Předpoklady vývoje

### Node.js/uze-gyp

[Node.js v12.9.0 nebo novější.](https://nodejs.org/en/) Pokud je aktualizace na novou verzi uzlu nežádoucí, místo toho můžete [aktualizovat npm kopii node-gyp ručně](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) na verzi 5. .2 nebo později, které obsahují požadované změny kompilace původních modulů pro zbraně.

### Vizuální studio 2017

Visual Studio 2017 (jakékoliv vydání) je vyžadováno pro křížové kompilace nativních modulů. Visual Studio Community 2017 si můžete stáhnout přes [Visual Studio Dev Essentials program](https://visualstudio.microsoft.com/dev-essentials/). Po instalaci můžete přidat komponenty specifické pro brnění následujícím způsobem z _Příkazové výzvy_:

```powershell
vs_installer.exe ^
--add Microsoft.VisualStudio.Workload.NativeDesktop ^
--add Microsoft.VisualStudio.Component.VC.ATLMFC ^
--add Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--add Microsoft.VisualStudio.Component.VC.MFC.ARM64 ^
--includeRecommended
```

#### Vytvoření příkazu zrychleného ke křížové kompilaci

Nastavení `npm_config_arch=arm64` v prostředí vytváří správnou arm64 `. bj` soubory, ale standardní _příkaz vývojáře pro VS 2017_ bude používat x64 liner. Opravit toto:

1. Duplikovat příkazový příkaz křížení _x64_x86 pro VS 2017_ (např. umístěním v úvodní nabídce, kliknutím pravým tlačítkem myši, výběrem _Open File Location_, kopírováním a vložením) do libovolného místa.
2. Klepněte pravým tlačítkem na novou zkratku a vyberte _Vlastnosti_.
3. Změňte pole _Target_ na čtení `vcvarsamd64_arm64.bat` na konci místo `vcvarsamd64_x86.bat`.

Pokud jste úspěšně provedli, příkazová výzva by měla vytisknout něco podobného tomuto při spuštění:

```bat
****************************************************************
** Příkaz vývojáře Visual Studio 2017 v15.9.15
** Copyright (c) 2017 Microsoft Corporation
**********************************************************************************************
[vcvarsall.bat] Životní prostředí inicializováno pro: 'x64_arm64'
```

Pokud chcete vyvíjet svou aplikaci přímo na Windows na Arm zařízení, nahradte `vcvarsx86_arm64. na` in _Target_ , aby ke křížové kompilaci mohlo dojít s emulací x86 zařízení.

### Propojení se správným `node.lib`

By default, `node-gyp` unpacks Electron's node headers and downloads the x86 and x64 versions of `node.lib` into `%APPDATA%\..\Local\node-gyp\Cache`, but it does not download the arm64 version ([a fix for this is in development](https://github.com/nodejs/node-gyp/pull/1875).) Opravit toto:

1. Stáhněte si arm64 `node.lib` z https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Přesunout ji do `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

Nahraďte `6.0.9` za verzi, kterou používáte.

## Přihlášené moduly pro vzájemné kompilaci

Po dokončení výše uvedeného otevřete váš příkaz "cross-compilation" prompt a spusťte `nastavit npm_config_arch=arm64`. Potom použijte `npm nainstalovat` pro sestavení svého projektu jako normální. jako při křížovém kompilaci modulů x86, možná budete muset odstranit `node_modules` , abyste si vynutili rekompilaci nativních modulů, pokud by byly dříve sestaveny pro jinou architekturu.

## Ladění nativního modulu

Ladění nativního modulu lze provést pomocí Visual Studio 2017 (běží na vašem vývojářském stroji) a odpovídajícího [ovladače Visual Studio Remote Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) běžícího na cílovém zařízení. Ladění:

1. Spusťte aplikaci `. xe` na cílovém zařízení prostřednictvím _příkazového příkazu_ (passs `--inspect-brk` k pozastavení před načtením jakéhokoliv nativního modulu).
2. Spusťte Visual Studio 2017 na vašem vývojářském zařízení.
3. Připojit k cílovému zařízení výběrem _Ladění > Připojit k procesu..._ a zadejte IP adresu zařízení a číslo portu, které se zobrazí pomocí nástroje Visual Studio Remote Debugger
4. Klikněte na _Obnovit_ a vyberte [vhodný proces Electronu pro připojení](../development/debug-instructions-windows.md).
5. Možná se budete muset ujistit, že jsou všechny symboly pro nativní moduly ve vaší aplikaci načteny správně. Chcete-li toto nastavit, přejděte na _Ladění > Nastavení..._ ve Visual Studio 2017 a přidejte složky obsahující vaše `. db` symboly pod _ladění > symboly_.
6. Po připojení nastavte vhodné zarážky a pokračujte v provádění JavaScriptu pomocí [vzdálených nástrojů pro uzel](debugging-main-process.md) Chrome.

## Získávám další pomoc

Pokud narazíte na problém s touto dokumentací, nebo pokud vaše aplikace pracuje při sestavování pro x86, ale ne pro arm64, prosím [nahlaste problém](../development/issues.md) s názvem "Windows on Arm".
