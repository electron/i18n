# Guide Windows Store

Avec Windows 10, le bon vieux win32 executable a un nouveau frère: La plateforme Universelle de Windows. Le nouveau format `.appx` ne permet pas seulement d'avoir de nouvelles API puissantes comme Cortana ou Push Notifications, mais via le Windows Store, il simplifie également les installations et les mises à jour.

Microsoft [à développé un outil qui compile les apps Electron en packages `.appx`](https://github.com/catalystcode/electron-windows-store), permettant aux développeurs d'utiliser une partie des goodies trouvés dans le nouveau modèle d'application. Ce guide explique comment l'utiliser - et quelles sont les capacités et les limites d'un package Electron AppX.

## Contexte et exigences

Windows 10 "Anniversary Update" est capable d'exécuter des binaires win32 `.exe` en les lançant avec un système de fichier et un registre virtualisé. Ils sont tout les deux créés durant la compilation en exécutant l'app et l'installer a l'intérieur d'un conteneur de Windows, ce qui permet à Windows d'identifier exactement quelles modifications au système d'exploitation sont effectuées pendant l'installation. Appareiller l'exécutable avec un système de fichiers virtuel et un registre virtuel permet à Windows la désinstallation et l'installation en un seul clic.

En addition, le exe est lancé à l'intérieur du modèle appx - ce qui signifie qu'il peut utiliser beaucoup des API disponibles pour la plateforme Universelle Windows. Pour gagner encore plus de fonctionnalités, une app Electron peut jumeler avec une tâche d'arrière-plan invisible UWP lancée avec le `exe` - sorte d'acolyte pour exécuter des tâches en arrière-plan, recevoir des notifications push, ou pour communiquer avec d'autres applications UWP.

Pour compiler n’importe quelle app Electron existante, assurez-vous que vous avez les exigences suivantes :

* Windows 10 avec Anniversary Update (sorti le 2 Août 2016)
* Le SDK Windows 10, [downloadable here](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Au minimum Node 4 (pour vérifier, exécutez `node -v`)

Ensuite, installez `electron-windows-store` CLI:

```sh
npm install -g electron-windows-store
```

## Étape 1 : Empaqueter votre Application Electron

Empaquetez l’application à l’aide de [electron-packager](https://github.com/electron-userland/electron-packager) (ou un outil similaire). Assurez vous de supprimer `node_modules` que vous n'avez pas besoin dans votre application finale, puisque n'importe quel module dont vous n'avez pas besoin augmentera inutilement la taille de votre application.

La sortie devrait ressembler à peu près à ceci :

```text
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
├── natives_blob.bin
├── node.dll
├── resources
│   ├── app
│   └── atom.asar
├── v8_context_snapshot.bin
├── squirrel.exe
└── ui_resources_200_percent.pak
```

## Étape 2: Exécuter electron-windows-store

Depuis un PowerShell élevé (exécuter le "en tant Administrateur"), exécutez `electron-windows-store` avec les paramètres requis, en mettant le dossier d'entrée, le dossier de sortie, le nom et la version de l'application, et confirmer que `node_modules` doit être aplati :

```powershell
electron-windows-store `
   --input-directory C:\myelectronapp `
   --output-directory C:\output\myelectronapp `
   --flatten true `
   --package-version 1.0.0.0 `
   --package-name myelectronapp
```

Une fois exécuté, l’outil se met au travail : il accepte votre app Electron comme entrée, et aplatit les `node_modules`. Ensuite, il archive votre application comme `app.zip`. En utilisant un installateur et un conteneur de Windows, l’outil crée un paquet AppX « élargi » - contenant le manifeste d’Application Windows (`AppXManifest.xml`) ainsi que le système de fichiers virtuel et le registre virtuel à l’intérieur de votre dossier de sortie.

Une fois les fichiers AppX élargis sont créés, l’outil utilise le Windows App Packager (`MakeAppx.exe`) pour créer un package de AppX de fichier unique de ces fichiers sur le disque. Enfin, l’outil peut servir pour créer un certificat approuvé sur votre ordinateur pour signer le nouveau paquet AppX. Avec le package AppX signé, la CLI peut également automatiquement installer le package sur votre machine.

## Étape 3 : Utiliser le Package AppX

Afin d’exécuter votre paquet, vos utilisateurs auront besoin de Windows 10 "Anniversaire Update" - plus de détails sur comment mettre à jour Windows peuvent être trouvés [ici](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

En opposition aux traditionelles apps UWP, actuellement les apps empaquetées doivent subir un processus de vérification manuelle, pour lequel vous pouvez appliquer [ici](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). En attendant, tous les utilisateurs seront en mesure d’installer votre paquet en double-cliquant dessus, donc une soumission au store ne sera ne peut-être pas nécessaire si vous cherchez simplement une méthode d’installation plus facile. Dans des environnements gérés (généralement des entreprises), l'`Add-AppxPackage` [applet de commande PowerShell permet de l'installer de façon automatisée](https://technet.microsoft.com/en-us/library/hh856048.aspx).

Une autre limitation importante est que le paquet AppX compilé contient un fichier exécutable win32 - toujours et qu’il ne fonctionnera donc pas sur Xbox, HoloLens ou téléphones.

## Facultatif : Ajouter les fonctionnalités UWP à l’aide d’un BackgroundTask

Vous pouvez coupler votre app Electron avec une tâche en arrière-plan UWP invisible qui vous permet de tirer pleinement parti des fonctionnalités de Windows 10 - comme notifications push, ou les tuiles vivantes.

Pour voir comment une app Electron peut utiliser une tâche de fond pour envoyer des notifications toast et tuiles vivantes, [consultez l'exemple fourni par Microsoft](https://github.com/felixrieseberg/electron-uwp-background).

## Optionnel: Conversion en utilisant la virtualisation de conteneur

Pour générer le package AppX, l'`electron-windows-store` CLI utilise un modèle qui devrait fonctionner pour la plupart des applications Electron. Toutefois, si vous utilisez un programme d’installation personnalisé, ou si vous rencontrez des problèmes avec le paquet généré, vous pouvez essayer de créer un package à l’aide de compilation avec un conteneur Windows - dans ce mode, le CLI va installer et exécuter votre application dans un conteneur vide de Windows pour déterminer quelles modifications votre application fait au système d’exploitation.

Avant d'exécuter le CLI pour la première fois, vous devrez configurer le "Windows Desktop App Converter". Cela prendra quelques minutes, mais ne vous inquiétez pas il suffit de le faire une fois. Téléchargez le Desktop App Converter [ici](https://docs.microsoft.com/en-us/windows/uwp/porting/desktop-to-uwp-run-desktop-app-converter). Vous recevrez deux fichiers: `DesktopAppConverter.zip` et `BaseImage-14316.wim`.

1. Décompressez `DesktopAppConverter.zip`. Depuis un PowerShell élevé (ouvert avec "exécuter en tant qu'administrateur"), faire en sorte que votre stratégie d'exécution de systèmes nous permet d'exécuter tout que nous avons besoin d'exécuter en appelant `Set-ExecutionPolicy bypass`.
2. Ensuite, exécutez l'installation du Desktop App Converter, en lui passant l'emplacement du Windows base Image (téléchargé comme `BaseImage-14316.wim`), en exécutant la commande `.\DesktopAppConverter.ps1 -Setup -BaseImage .\BaseImage-14316.wim`.
3. Si la commande ci-dessus vous demande un redémarrage, veuillez redémarrer votre machine et exécuter la commande ci-dessus une nouvelle fois après le redémarrage réussi.

Une fois l’installation réussie, vous pouvez passer à la compilation de votre app Electron.