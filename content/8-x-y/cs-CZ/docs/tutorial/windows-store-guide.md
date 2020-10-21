# Aplikace Windows Obchodu

S Windows 10 má dobrý starý spustitelný soubor win32 nový sourozenc: Univerzální Windows Platforma. Nový `ppx` formát neumožňuje pouze několik nových výkonných API, jako je Cortana nebo Push oznámení, ale prostřednictvím Windows Store také zjednodušuje instalaci a aktualizaci.

Microsoft [developed a tool that compiles Electron apps as `.appx` packages][electron-windows-store], enabling developers to use some of the goodies found in the new application model. Tato příručka vysvětluje, jak ji používat - a jaké jsou možnosti a omezení balíčku Electron AppX.

## Pozadí a Požadavky

Windows 10 "Anniversary Update" je schopen spustit w32 `.exe` binárních souborů jejich spuštěním společně s virtualizovaným souborovým systémem a registrací. Oba jsou vytvořeny během kompilace spuštěním aplikace a instalačního programu uvnitř kontejneru Windows , umožňuje Windows, aby přesně určil, které úpravy operačního systému byly během instalace provedeny. Spárování spustitelného souboru s virtuálním souborovým systémem a virtuálním registrem umožňuje Windows povolit instalaci a odinstalaci jedním kliknutím .

Kromě toho exe je spuštěna uvnitř modelu appx - což znamená, že může používat mnoho API, které jsou k dispozici pro Universal Windows Platformu. K získání ještě více schopností, Electron aplikace může spárovat s neviditelným UWP úlohou spuštěnou společně s `exe` - druh spuštěných jako vedlejší úkol pro provádění úkolů na pozadí, přijímat push oznámení nebo komunikovat s jinými aplikacemi UWP .

Chcete-li kompilovat existující Electron aplikaci, ujistěte se, že máte následující požadavky:

* Windows 10 s aktualizací výročí (vydána 2. srpna 2016)
* The Windows 10 SDK, [downloadable here][windows-sdk]
* Alespoň uzel 4 (ke kontrole, spusťte `uzel -v`)

Pak jděte a nainstalujte `elektronická okna-obchod` CLI:

```sh
npm install -g elektronicky-windows-store
```

## Krok 1: Připojte vaši Electron aplikaci

Package the application using [electron-packager][electron-packager] (or a similar tool). Ujistěte se, že odstraníte `node_modules` , které nepotřebujete ve své konečné aplikaci, protože jakýkoliv modul, který ve skutečnosti nepotřebujete, zvýší velikost aplikace.

Výstup by měl vypadat zhruba takto:

```plaintext
├── Ghost.exe
├── LICENSE
├── content_resources_200_percent.pak
├── content_shell.pak
├── d3dcompiler_47.dll
├── ffmpeg.dll
├── icudtl.dat
├── libEGL.dll
├── libGLESv2.dll
├── locales
│   ├── am.pak
│   ├── ar.pak
│   ├── [...]
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Krok 2: Spouštěcí elektronická okna e-store

From an elevated PowerShell (run it "as Administrator"), run `electron-windows-store` with the required parameters, passing both the input and output directories, the app's name and version, and confirmation that `node_modules` should be flattened.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0.0 `
    --package-name myelectronapp
```

Jakmile je nástroj spuštěn, bude fungovat: přijímá vaši Electron aplikaci jako vstup, zarovnává `node_modules`. Poté archivuje vaši aplikaci jako `app.zip`. Pomocí instalačního a Windows Containeru vytváří nástroj "rozšířený" balíček AppX - včetně Windows Application Manifest (`AppXManifest. ml`) jako stejně jako virtuální souborový systém a virtuální registr uvnitř vaší složky .

Jakmile budou vytvořeny rozšířené soubory AppX, nástroj používá Windows Packager (`MakeAppx. xe`) pro vytvoření jednoho souboru AppX balíčku z těchto souborů na disku. Nástroj může být použit k vytvoření důvěryhodného certifikátu na vašem počítači k podepsání nového balíčku AppX. Díky podepsanému balíčku AppX může CLI také automaticky nainstalovat balíček na váš počítač.

## Krok 3: Použití balíčku AppX

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here][how-to-update].

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here][centennial-campaigns]. Mezitím budou všichni uživatelé schopni nainstalovat váš balíček dvojitým kliknutím, takže odeslání do obchodu nemusí být nutné, pokud hledáte snadnější způsob instalace . In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion][add-appxpackage].

Dalším důležitým omezením je, že kompilovaný balíček AppX stále obsahuje Win32 spustitelný soubor - a proto nebude spuštěn na Xboxu, HoloLens nebo telefony.

## Volitelné: Přidat funkce UWP pomocí BackgroundTask
Můžete spárovat vaši Electron aplikaci s neviditelným UWP úlohou na pozadí, kterou získáte k plnému využití funkcí Windows 10 - například push notifikace, Cortana integrace, nebo živé dlaždice.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample][background-task].

## Volitelné: Převést pomocí kontejnerovy Virtualizace

Pro vygenerování balíčku AppX `elektronicky-windows-store` CLI používá šablonu , která by měla fungovat pro většinu Electron aplikací. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Před prvním spuštěním CLI budete muset nastavit "Konvertor Windows Desktop App. This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here][app-converter]. Obdržíte dva soubory: `DesktopAppConverter.zip` a `BaseImage-14316.wim`.

1. Rozbalit `DesktopAppConverter.zip`. Ze zvýšeného PowerShell (otevřeného s "run as Administrator", ujistěte se, že vaše systémy nám umožňují spustit vše, co hodláme spustit voláním `Set-ExecutionPolicy obchvat`.
2. Pak spusťte instalaci Převod desktopových aplikací, procházející v umístění základního obrázku systému Windows (staženo jako `BaseImage-14316. im`), voláním `. \DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. Pokud spustíte výše uvedený příkaz, restartujte prosím počítač a po úspěšném restartu spusťte výše uvedený příkaz.

Jakmile je instalace úspěšná, můžete přejít k kompilaci vaší Electron aplikace.

[windows-sdk]: https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
[app-converter]: https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter
[add-appxpackage]: https://technet.microsoft.com/en-us/library/hh856048.aspx
[electron-packager]: https://github.com/electron/electron-packager
[electron-windows-store]: https://github.com/catalystcode/electron-windows-store
[background-task]: https://github.com/felixrieseberg/electron-uwp-background
[centennial-campaigns]: https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge
[how-to-update]: https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update
