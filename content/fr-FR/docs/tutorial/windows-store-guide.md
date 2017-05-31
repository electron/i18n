# Guide de Windows Store

Avec Windows 8, bon vieux win32 exécutable obtenu un nouveau frère : The Universal Windows Platform. Le nouveau format de `.appx` ne permet pas seulement à un certain nombre de nouvelles API puissant comme Cortana ou Notifications Push, mais par le magasin de Windows, également simplifie l’installation et la mise à jour.

Microsoft [developed un outil qui compile apps électron comme `.appx` packages](https://github.com/catalystcode/electron-windows-store), permettant aux développeurs d’utiliser une partie des goodies trouvé dans le nouveau modèle d’application. Ce guide explique comment l’utiliser - et quelles sont les capacités et les limites d’un paquet d’électrons AppX.

## Contexte et exigences

Windows 10 « Mise à jour de l’anniversaire » est en mesure d’exécuter des binaires `.exe` win32 en leur lançant ainsi qu’un système de fichiers virtualisé et le registre. Les deux sont créés pendant la compilation en exécutant app et le programme d’installation à l’intérieur d’un conteneur de Windows, ce qui permet à Windows d’identifier exactement quelles modifications au système d’exploitation sont effectuées pendant l’installation. Appariement de l’exécutable avec un système de fichiers virtuel et un registre virtuel permet à Windows permettre la désinstallation et l’installation d’un seul clic.

En outre, le fichier exe est lancé à l’intérieur du modèle appx - ce qui signifie qu’il peut utiliser bon nombre des API disponibles pour la plate-forme Windows universel. Pour gagner encore plus de fonctionnalités, une application d’électron peut jumeler avec une tâche d’arrière-plan invisible UWP lancée conjointement avec le `exe` - sorte de lancé comme un acolyte pour exécuter des tâches en arrière-plan, recevoir des notifications push, ou pour communiquer avec d’autres applications UWP.

Pour compiler n’importe quelle application électronique existante, assurez-vous que vous avez les exigences suivantes :

* Windows 10 avec mise à jour d’anniversaire (sorti le 2 août 2016)
* Le SDK de Windows 10, [downloadable here](https://developer.microsoft.com/en-us/windows/downloads/windows-10-sdk)
* Au moins nœud 4 (pour vérifier, exécutez `node-v`)

Ensuite, allez et installer le CLI `electron-windows-store` :

    NGP installer -g-magasin d’électron-windows
    

## Étape 1 : Empaqueter votre Application d’électrons

Empaqueter l’application à l’aide de [electron-packager](https://github.com/electron-userland/electron-packager) (ou un outil similaire). Veillez à supprimer le `node_modules` que vous n’avez pas besoin dans votre application finale, puisque n’importe quel module que vous n’avez pas réellement besoin augmentera seulement la taille de votre application.

La sortie devrait ressembler à peu près à ceci :

    ├── Ghost.exe ├── licence ├── content_resources_200_percent.pak ├── content_shell.pak ├── d3dcompiler_47.dll ├── ffmpeg ├── icudtl.dat ├── libEGL.dll ├── libGLESv2.dll ├── locales │ ├── am.pak │ ├── ar.pak │ ├── [...] ├── natives_blob.bin ├── node.dll ├── ressources │ ├── app │ └── atom.asar ├── snapshot_blob.bin ├── squirrel.exe └── ui_resources_200_percent.pak
    

## Étape 2 : Exécution d’électron-windows-store

D’une élévation PowerShell (exécuter « en tant qu’administrateur »),`electron-windows-store` exécution avec les paramètres requis, en passant aussi bien l’entrée et répertoires de sortie de l’app nom et version et confirmation que `node_modules` devrait être aplaties.

    électron-windows-magasin '--entrée-répertoire C:\myelectronapp '--C:\output\myelectronapp répertoire de sortie '--aplatir vrai '--package-version 1.0.0.0 "--nom du package myelectronapp
    

Une fois exécuté, l’outil se met au travail : il accepte votre app électron comme intrant, aplatissement de la `node_modules`. Ensuite, il Archive votre application comme `app.zip`. En utilisant un installateur et un conteneur de Windows, l’outil crée un paquet AppX « élargi » - dont le manifeste d’Application Windows (`AppXManifest.xml`) ainsi que le système de fichiers virtuel et le registre virtuel à l’intérieur de votre dossier de sortie.

Une fois les fichiers AppX élargis sont créés, l’outil utilise le Windows App Packager (`MakeAppx.exe`) pour créer un package de AppX de fichier unique de ces fichiers sur le disque. Enfin, l’outil peut servir à créer un certificat approuvé sur votre ordinateur pour signer le nouveau paquet AppX. Avec le package AppX signé, la CLI peut également automatiquement installer le package sur votre machine.

## Étape 3 : En utilisant le Package AppX

Afin d’exécuter votre paquet, vos utilisateurs auront besoin Windows 10 avec le soi-disant « anniversaire Update » - détails sur la façon de mettre à jour de Windows peuvent être trouvés à [here](https://blogs.windows.com/windowsexperience/2016/08/02/how-to-get-the-windows-10-anniversary-update).

En opposition à la traditionnelle UWP apps, apps emballés doivent actuellement subissent un processus de vérification manuelle, pour lequel vous pouvez appliquer [here](https://developer.microsoft.com/en-us/windows/projects/campaigns/desktop-bridge). En attendant, tous les utilisateurs seront en mesure d’installer juste votre paquet en double-cliquant dessus, donc une présentation dans le magasin ne sera ne peut-être pas nécessaire si vous cherchez simplement une méthode d’installation plus facile. Dans des environnements gérés (généralement des entreprises), l’applet de commande [PowerShell`Add-AppxPackage` permet de l’installer dans une fashion](https://technet.microsoft.com/en-us/library/hh856048.aspx) automatique.

Une autre limitation importante est que le paquet AppX compilé contient un fichier exécutable win32 - toujours et qu’il ne fonctionnera donc pas sur Xbox, HoloLens ou téléphones.

## Facultatif : Ajouter UWP caractéristiques à l’aide d’un BackgroundTask

Vous pouvez coupler votre app électrons vers le haut avec une tâche en arrière-plan UWP invisible qui vous permet de tirer pleinement parti des fonctionnalités de Windows 10 - notifications push, intégration de Cortana ou tuiles vivants.

Pour vérifier comment une application électronique qui utilise une tâche de fond pour envoyer des notifications toast et vivre des tuiles, [check sur le sample](https://github.com/felixrieseberg/electron-uwp-background) fourni par Microsoft.

## En option : Conversion à partir de conteneur virtualisation

Pour générer le package AppX, la CLI `electron-windows-store` utilise un modèle qui devrait fonctionner pour la plupart des applications d’électrons. Toutefois, si vous utilisez un programme d’installation personnalisé, ou si vous rencontrez des problèmes avec le paquet généré, vous pouvez essayer de créer un package à l’aide de compilation avec un conteneur Windows - dans ce mode, le CLI va installer et exécuter votre application en conteneur vide de Windows pour déterminer quelles modifications votre application est exactement faire du système d’exploitation.

Avant d’exécuter l’interface CLI pour la, vous devrez configurer le convertisseur « Windows Desktop App ». Cela prendra quelques minutes, mais ne vous inquiétez pas-il suffit de le faire une fois. Téléchargement et Bureau App convertisseur de [here](https://www.microsoft.com/en-us/download/details.aspx?id=51691). Vous recevrez deux fichiers : `DesktopAppConverter.zip` et `BaseImage-14316.wim`.

  1. Décompressez `DesktopAppConverter.zip`. Une élévation PowerShell (ouvert avec « exécuter en tant qu’administrateur », faire en sorte que votre stratégie d’exécution de systèmes nous permet d’exécuter tout ce que nous avons l’intention d’exécuter en appelant `Set-ExecutionPolicy bypass`.
  2. Ensuite, exécutez l’installation du convertisseur Desktop App, en passant à l’emplacement de l’Image de base Windows (téléchargé comme `BaseImage-14316.wim`), en appelant `.\DesktopAppConverter.ps1-BaseImage -.\BaseImage-14316.wim` de configuration.
  3. Si cas les invites de commande ci-dessus vous pour une remise à zéro, s’il vous plaît redémarrer votre machine et exécutez la commande ci-dessus après un redémarrage réussi.

Une fois l’installation réussie, vous pouvez passer à la compilation de votre application d’électrons.