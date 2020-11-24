# Windows Store gids

Met Windows 10 kreeg de goede oude win32 uitvoerbaar een nieuwe broer: Het Universeel Windows-platform. De nieuwe `. ppx` formaat schakelt niet alleen een aantal nieuwe krachtige API's in, zoals Cortana of Push Notificaties, maar via de Windows Store, vereenvoudigt ook installatie en update.

Microsoft [developed a tool that compiles Electron apps as `.appx` packages][electron-windows-store], enabling developers to use some of the goodies found in the new application model. Deze handleiding legt uit hoe je het moet gebruiken - en wat de mogelijkheden en beperkingen van een Electron AppX pakket zijn.

## Achtergrond en vereisten

Windows 10 "Verjaardag Update" kan win32 `.exe` binaries uitvoeren door samen met een virtueel bestandssysteem en register te lanceren. Both are created during compilation by running app and installer inside a Windows Container, allowing Windows to identify exactly which modifications to the operating system are done during installation. Koppelen van het uitvoerbare met een virtueel bestandssysteem en een virtueel register stelt Windows in staat één-klik installatie en deïnstallatie in te schakelen.

Daarenboven de exe wordt gelanceerd in het appx-model - wat betekent dat het veel van de API's kan gebruiken die beschikbaar zijn voor het Universal Windows Platform. Om nog meer mogelijkheden te krijgen, een Electron app kan koppelen met een onzichtbare UWP achtergrond taak gelanceerd met `exe` - een soort gelanceerd als een sidekick om taken op de achtergrond uit te voeren ontvang push-meldingen of om te communiceren met andere UWP applicaties.

Om bestaande Electron app te compileren, zorg je ervoor dat je de volgende vereisten hebt:

* Windows 10 met Verjaardag Update (vrijgegeven op 2 augustus 2016)
* The Windows 10 SDK, [downloadable here][windows-sdk]
* Ten minste Node 4 (om te controleren, `node -v`)

Ga vervolgens naar de `electron-windows-store` CLI:

```sh
npm installeren -g electron-windows-store
```

## Stap 1: pakket je Electron applicatie

Package the application using [electron-packager][electron-packager] (or a similar tool). Zorg ervoor dat u `node_modules` verwijdert die u niet nodig hebt in uw uiteindelijke applicatie, omdat elke module die je niet nodig hebt de grootte van je applicatie verbetert.

De uitvoer zou er ongeveer zo uit moeten zien:

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
│   └── app.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Stap 2: Elektron-windows-store starten

From an elevated PowerShell (run it "as Administrator"), run `electron-windows-store` with the required parameters, passing both the input and output directories, the app's name and version, and confirmation that `node_modules` should be flattened.

```powershell
electron-windows-store `
    --input-directory C:\myelectronapp `
    --output-directory C:\output\myelectronapp `
    --package-version 1.0.0 `
    --package-name myelectronapp
```

Eenmaal uitgevoerd, gaat de tool werken: Het accepteert je Electron app als input, Sluit de `node_modules`. Daarna archiveer je applicatie als `app.zip`. Met behulp van een installer en een Windows Container maakt het hulpmiddel een "expanded" AppX -pakket - inclusief de Windows Application Manifest (`AppXManifest. ml`) als en het virtuele bestandssysteem en het virtuele register in uw output map.

Zodra de uitgebreide AppX-bestanden zijn aangemaakt, maakt deze tool gebruik van de Windows App Packager (`MakeAppx. xe`) om een AppX pakket van deze bestanden op de schijf te maken. Tot slot kan de tool worden gebruikt om een vertrouwd certificaat op uw computer te maken om de nieuwe AppX-pakket te ondertekenen. Met het ondertekende AppX pakket, kan de CLI ook het pakket automatisch op uw machine installeren.

## Stap 3: Het AppX-pakket gebruiken

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here][how-to-update].

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here][centennial-campaigns]. Intussen kunnen alle gebruikers je pakket installeren door er dubbel op te klikken, dus een uitwerking bij de winkel kan niet nodig zijn als u op zoek bent naar een makkelijkere installatiemethode. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion][add-appxpackage].

Een andere belangrijke beperking is dat het gecompileerde AppX-pakket nog steeds een win32 uitvoerbaar is - en zal daarom niet worden uitgevoerd op Xbox, HoloLens of telefoons.

## Optioneel: Voeg UWP functies toe met behulp van een BackgroundTask

U kunt uw Electron app omhoog koppelen met een onzichtbare UWP achtergrond taak die volledig gebruik maakt van Windows 10 functies - zoals push-meldingen, Cortana-integratie of live tegels.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample][background-task].

## Optioneel: Converteer met Container Virtualisatie

Om het AppX pakket te genereren, gebruikt de `electron-windows-store` CLI een sjabloon die zou moeten werken voor de meeste Electron apps. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Voordat de CLI voor de eerste keer wordt uitgevoerd, moet u de "Windows Desktop App Converter" instellen. Dit duurt een paar minuten, maar maak je geen zorgen - je hoeft dit maar één keer te doen Download and Desktop App Converter from [here][app-converter]. U ontvangt twee bestanden: `DesktopAppConverter.zip` en `BaseImage-14316.wim`.

1. Uitpakken `DesktopAppConverter.zip`. Vanaf een hogere PowerShell (geopend met "Uitvoeren als beheerder", zorg ervoor dat uw systeem uitvoeringsbeleid ons in staat stelt alles uit te voeren dat we willen uitvoeren door `Set-ExecutionPolicy bypass` te noemen.
2. Voer vervolgens de installatie van de Desktop App Converter in, door de locatie van de Windows base image te passeren (gedownload als `BaseImage-14316. im`), door te bellen `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. Als bovenstaand commando u om een herstart vraagt, start dan uw apparaat opnieuw op en voer het bovenstaande commando opnieuw uit na een succesvolle herstart

Zodra de installatie geslaagd is, kunt u doorgaan met het compileren van uw Electron app.

[windows-sdk]: https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk
[app-converter]: https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter
[add-appxpackage]: https://technet.microsoft.com/en-us/library/hh856048.aspx
[electron-packager]: https://github.com/electron/electron-packager
[electron-windows-store]: https://github.com/catalystcode/electron-windows-store
[background-task]: https://github.com/felixrieseberg/electron-uwp-background
[centennial-campaigns]: https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge
[how-to-update]: https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update
