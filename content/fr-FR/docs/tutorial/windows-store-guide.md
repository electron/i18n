# Guide Windows Store

Avec Windows 8, le bon vieux win32 executable a un nouveau frère: La plateforme Universelle de Windows. Le nouveau format `.appx` ne permet pas seulement d'avoir de nouvelles API puissantes comme Cortana ou Push Notifications, mais via le Windows Store, il simplifie également les installations et les mises à jour.

Microsoft [à développé un outil qui compile les apps Electron en packages `.appx`](https://github.com/catalystcode/electron-windows-store), permettant aux développeurs d'utiliser une partie des goodies trouvés dans le nouveau modèle d'application. Ce guide explique comment l'utiliser - et quelles sont les capacités et les limites d'un package Electron AppX.

## Contexte et exigences

Windows 10 "Anniversary Update" est capable d'exécuter des binaires win32 `.exe` en les lançant avec un système de fichier et un registre virtualisé. Ils sont tout les deux créés durant la compilation en exécutant l'app et l'installer a l'intérieur d'un conteneur de Windows, ce qui permet à Windows d'identifier exactement quelles modifications au système d'exploitation sont effectuées pendant l'installation. Appareiller l'exécutable avec un système de fichiers virtuel et un registre virtuel permet à Windows la désinstallation et l'installation en un seul clic.

En addition, le exe est lancé à l'intérieur du modèle appx - ce qui signifie qu'il peut utiliser beaucoup des API disponibles pour la plateforme Universelle Windows. Pour gagner encore plus de fonctionnalités, une app Electron peut jumeler avec une tâche d'arrière-plan invisible UWP lancée avec le `exe` - sorte d'acolyte pour exécuter des tâches en arrière-plan, recevoir des notifications push, ou pour communiquer avec d'autres applications UWP.

Pour compiler n’importe quelle app Electron existante, assurez-vous que vous avez les exigences suivantes :

* Windows 10 avec Anniversary Update (sorti le 2 Août 2016)
* Le SDK Windows 10, [downloadable here](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Au minimum Node 4 (pour vérifier, exécutez `node -v`)

Ensuite, installez `electron-windows-store` CLI:

    npm install -g electron-windows-store
    

## Étape 1 : Empaqueter votre Application Electron

Empaquetez l’application à l’aide de [electron-packager](https://github.com/electron-userland/electron-packager) (ou un outil similaire). Assurez vous de supprimer `node_modules` que vous n'avez pas besoin dans votre application finale, puisque n'importe quel module dans vous n'avez pas besoin augmentera inutilement la taille de votre application.

La sortie devrait ressembler à peu près à ceci :

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
    │   ├── am.pak
    │   ├── ar.pak 
    │   ├── [...] 
    ├── natives_blob.bin 
    ├── node.dll 
    ├── resources 
    │   ├── app 
    │   └── atom.asar 
    ├── snapshot_blob.bin 
    ├── squirrel.exe 
    └── ui_resources_200_percent.pak
    

## Étape 2: Exécuter electron-windows-store

Depuis un PowerShell élevé (exécuter le "en tant Administrateur"), exécutez `electron-windows-store` avec les paramètres requis, en mettant le dossier d'entrée, le dossier de sortie, le nom et la version de l'application, et confirmer que `node_modules` doit être aplati :

    electron-windows-store `
       --input-directory C:\myelectronapp `
       --output-directory C:\output\myelectronapp `
       --flatten true `
       --package-version 1.0.0.0 `
       --package-name myelectronapp
    

Une fois exécuté, l’outil se met au travail : il accepte votre app Electron comme entrée, et aplatit les `node_modules`. Ensuite, il archive votre application comme `app.zip`. En utilisant un installateur et un conteneur de Windows, l’outil crée un paquet AppX « élargi » - contenant le manifeste d’Application Windows (`AppXManifest.xml`) ainsi que le système de fichiers virtuel et le registre virtuel à l’intérieur de votre dossier de sortie.

Une fois les fichiers AppX élargis sont créés, l’outil utilise le Windows App Packager (`MakeAppx.exe`) pour créer un package de AppX de fichier unique de ces fichiers sur le disque. Enfin, l’outil peut servir pour créer un certificat approuvé sur votre ordinateur pour signer le nouveau paquet AppX. Avec le package AppX signé, la CLI peut également automatiquement installer le package sur votre machine.

## Étape 3 : Utiliser le Package AppX

In order to run your package, your users will need Windows 10 with the so-called "Anniversary Update" - details on how to update Windows can be found [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

In opposition to traditional UWP apps, packaged apps currently need to undergo a manual verification process, for which you can apply [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). In the meantime, all users will be able to just install your package by double-clicking it, so a submission to the store might not be necessary if you're simply looking for an easier installation method. In managed environments (usually enterprises), the `Add-AppxPackage` [PowerShell Cmdlet can be used to install it in an automated fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Another important limitation is that the compiled AppX package still contains a win32 executable - and will therefore not run on Xbox, HoloLens, or Phones.

## Optional: Add UWP Features using a BackgroundTask

You can pair your Electron app up with an invisible UWP background task that gets to make full use of Windows 10 features - like push notifications, Cortana integration, or live tiles.

To check out how an Electron app that uses a background task to send toast notifications and live tiles, [check out the Microsoft-provided sample](https://github.com/felixrieseberg/electron-uwp-background).

## Optional: Convert using Container Virtualization

To generate the AppX package, the `electron-windows-store` CLI uses a template that should work for most Electron apps. However, if you are using a custom installer, or should you experience any trouble with the generated package, you can attempt to create a package using compilation with a Windows Container - in that mode, the CLI will install and run your application in blank Windows Container to determine what modifications your application is exactly doing to the operating system.

Before running the CLI for the, you will have to setup the "Windows Desktop App Converter". This will take a few minutes, but don't worry - you only have to do this once. Download and Desktop App Converter from [here](https://www.microsoft.com/en-us/download/details.aspx?id=51691). You will receive two files: `DesktopAppConverter.zip` and `BaseImage-14316.wim`.

1. Unzip `DesktopAppConverter.zip`. From an elevated PowerShell (opened with "run as Administrator", ensure that your systems execution policy allows us to run everything we intend to run by calling `Set-ExecutionPolicy bypass`.
2. Then, run the installation of the Desktop App Converter, passing in the location of the Windows base Image (downloaded as `BaseImage-14316.wim`), by calling `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. If running the above command prompts you for a reboot, please restart your machine and run the above command again after a successful restart.

Once installation succeeded, you can move on to compiling your Electron app.