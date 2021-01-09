# Windows 10 op Arm

Als uw app werkt met Electron 6.0.8 of hoger, kunt u het nu bouwen voor Windows 10 op Arm. Dit verbetert aanzienlijk de prestaties, maar vereist hercompilatie van alle inheemse modules die in uw app worden gebruikt. Het kan ook kleine reparaties vereisen voor jouw bouw- en verpakkingsscripts.

## Een basis app uitvoeren

Als uw app geen native modules gebruikt, dan is het heel eenvoudig om een Arm versie van uw app te maken.

1. Zorg ervoor dat de map `node_modules` leeg is.
2. Gebruik een _Command Prompt_, voer `set npm_config_arch=arm64` uit voor het uitvoeren van `npm install`/`yarn install` zoals gebruikelijk.
3. [Als je Electron hebt geïnstalleerd als ontwikkelaarsafhankelijkheid](quick-start.md#prerequisites)zal npm de versie van arm64 downloaden en uitpakken. Je kunt je app dan als normaal verpakken en distribueren.

## Algemene overwegingen

### Architectuur-specifieke code

Veel Windows-specifieke code bevat als... anders logica die ofwel tussen de x64 of x86 architecturen selecteert.

```js
if (process.arch === 'x64') {
  // Doe 64-bit ding...
} anders {
  // Do 32-bit ding...
}
```

Als je je bepantsering wilt richten, zal logica zoals dit meestal de verkeerde architectuur selecteren zo zorgvuldig uw aanvraag controleren en scripts bouwen voor dit soort omstandigheden. In scripts voor aangepaste bouw en verpakking moet je altijd de waarde van `npm_config_arch` controleren in de omgeving, in plaats van te vertrouwen op de huidige procesboog.

### Oorspronkelijke modules

Als u inheemse modules gebruikt, moet u ervoor zorgen dat ze compileren tegen v142 van de MSVC compiler (geleverd in Visual Studio 2017). Je moet ook controleren of je `.dll` of `hebt ingebouwd. ib` bestanden aangeboden of gerefereerd door de native module zijn beschikbaar voor Windows op Arm.

### Je app testen

Om uw app te testen, gebruik een Windows op het Arm apparaat met Windows 10 (versie 1903 of hoger). Zorg ervoor dat u uw applicatie naar het doelapparaat kopieert - Chromium's sandbox zal niet goed werken bij het laden van uw applicatie-assets van een netwerklocatie.

## Ontwikkeling voorwaarden

### Node.js/node-gyp

[Node.js v12.9.0 of hoger wordt aanbevolen.](https://nodejs.org/en/) Als bijwerken naar een nieuwe versie van node ongewenst is, u kunt in plaats daarvan [de kopie van node-gyp handmatig](https://github.com/nodejs/node-gyp/wiki/Updating-npm's-bundled-node-gyp) naar versie 5 bijwerken. .2 of later bevat de vereiste wijzigingen om inheemse modules voor Arm te compileren.

### Visual Studio 2017

Visual Studio 2017 (elke editie) is vereist voor cross-compileren van native modules. U kunt Visual Studio Community 2017 downloaden via Microsoft's [Visual Studio Dev Essentials programma](https://visualstudio.microsoft.com/dev-essentials/). Na de installatie kun je de pantserspecifieke componenten toevoegen door het volgende uit te voeren vanuit een _Command Prompt_:

```powershell
vs_installer.exe ^
--voeg Microsoft.VisualStudio.Workload.NativeDesktop ^
--voeg Microsoft.VisualStudio.Component.VC.ATLMFC ^
toe --voeg Microsoft.VisualStudio.Component.VC.Tools.ARM64 ^
--voeg Microsoft.VisualStudio.Component.VC.VC.MC.ARM64 ^
--includeRecommended
```

#### Maak een cross-compilatie opdracht prompt

Het instellen van `npm_config_arch=arm64` in de omgeving creëert de juiste arm64 `. bj` bestanden, maar de standaard _Developer Command Prompt voor VS 2017_ gebruikt de x64 linker. Om dit te repareren:

1. Dupliceer de _x64_x86 Cross Tools Command Prompt voor VS 2017_ snelkoppeling (bijv. door het te vinden in het start menu, met de rechtermuisknop, _Open bestandslocatie_, kopiëren en plakken) naar ergens waar het handig is.
2. Klik met de rechtermuisknop op de nieuwe snelkoppeling en kies _Eigenschappen_.
3. Verander het _Target_ veld om `vcvarsamd64_arm64.bat` aan het einde te lezen in plaats van `vcvarsamd64_x86.bat`.

Als deze succesvol is afgerond, dan zal de opdrachtprompt iets soortgelijks afdrukken bij het opstarten:

```bat
******************************************************************
** Visual Studio ** ** ** ** Visual Studio 2017 Developer Command Prompt v15.9.15
** ** ** ** ** Copyright (c) 2017 Microsoft Corporation
******************************************************** **
[vcvarsall.bat] Gecombuigend voor: 'x64_arm'
```

Als u uw toepassing rechtstreeks op een Windows op Arm apparaat wilt ontwikkelen, vervang dan `vcvarsx86_arm64. bij` in _Doel_ zodat cross-compilatie kan gebeuren met de x86 emulatie van het apparaat.

### Koppelen tegen de juiste `node.lib`

Standaard `node-gyp` unpacks node headers van Electron, en download de x86 en x64 versies van `node. ib` in `%APPDATA%\. \Local\node-gyp\Cache`, maar het downloadt niet de arm64 versie ([een oplossing hiervoor is in ontwikkeling](https://github.com/nodejs/node-gyp/pull/1875). Om dit te repareren:

1. Download het arm64 `node.lib` van https://electronjs.org/headers/v6.0.9/win-arm64/node.lib
2. Verplaats het naar `%APPDATA%\..\Local\node-gyp\Cache\6.0.9\arm64\node.lib`

Vervang `6.0.9` voor de versie die je gebruikt.

## Cross-compileren inheemse modules

Na het voltooien van al het bovenstaande open je jouw cross-compilation command prompt en run `set npm_config_arch=arm64`. Gebruik vervolgens `npm install` om je project zo normaal te maken. Net als bij cross-compilerende x86 modules, je moet mogelijk `node_modules` verwijderen om hercompilatie van inheemse modules te forceren als ze eerder zijn gecompileerd voor een andere architectuur.

## Debuggen van native modules

Debuggen van specifieke modules kan worden gedaan met Visual Studio 2017 (draait op uw ontwikkelmachine) en bijbehorende [Visual Studio Remote Debugger](https://docs.microsoft.com/en-us/visualstudio/debugger/remote-debugging-cpp?view=vs-2019) draait op het doelapparaat. Naar debug:

1. Start je app `op. Bijlage` op het doelapparaat via de _Command Prompt_ (passeer `-inspect-brk` om het te pauzeren voordat native modules worden geladen).
2. Start Visual Studio 2017 op uw ontwikkelmachine.
3. Maak verbinding met het doel apparaat door _Foutopsporing > Koppelen aan Proces..._ en vul het IP-adres van het apparaat en het poortnummer in dat wordt weergegeven door de Visual Studio Remote Debugger tool.
4. Klik op _vernieuwen_ en selecteer het [juiste Electron proces om bij te voegen](../development/debug-instructions-windows.md).
5. Je moet er mogelijk voor zorgen dat alle symbolen voor native modules in je app correct worden geladen. Om dit te configureren, ga naar _Debug > Opties..._ in Visual Studio 2017, en voeg de mappen met uw `toe. db` symbolen onder _Debugging > Symbols_.
6. Eenmaal gekoppeld, stel je eventuele juiste breekpunten in en hervat JavaScript uitvoering met Chrome [externe tools voor Node](debugging-main-process.md).

## Krijg extra hulp

Als u een probleem tegenkomt met deze documentatie, of als de app werkt wanneer deze gecompileerd is voor x86, maar niet voor arm64, [bestand een probleem](../development/issues.md) met "Windows on Arm" in de titel.
