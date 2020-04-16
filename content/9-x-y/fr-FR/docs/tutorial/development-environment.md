# Environnement de développement

Le développement avec Electron est essentiellement du développement Node.js. Pour faire de votre système d'exploitation un environnement capable de construire des applications desktop avec Electron, vous aurez uniquement besoin de Node.js, npm, un éditeur de code de votre choix, et une compréhension rudimentaire du client de ligne de commande de votre système d'exploitation.

## Mise en place sur macOS

> Electron supporte macOS 10.10 (Yosemite) et plus. Apple ne permet pas d'exécuter macOS dans des machines virtuelles à moins que l'ordinateur hôte soit déjà un ordinateur Apple, donc si vous avez besoin d'un Mac, pensez à utiliser un service cloud qui loue l'accès à des Macs (comme [MacInCloud](https://www.macincloud.com/) ou [xcloud](https://xcloud.me)).

Premièrement, installez une version récente de Node.js. Nous vous recommandons d'installer soit la dernière version `LTS` ou `Current` disponible. Visitez [la page de téléchargément de Node.js](https://nodejs.org/en/download/) et sélectionnez `macOS Installer`. Bien que Homebrew soit une option offerte, nous vous le déconseillons toutefois - de nombreux outils seront incompatibles avec la manière dont Homebrew installe Node.js.

Une fois téléchargé, exécutez l'installateur et laissez le guide d'installation vous guider à travers l'installation.

Une fois installé, confirmez que tout fonctionne comme prévu. Trouvez l'application macOS `Terminal` dans votre dossier `/Applications/Utilities` (ou en recherchant le mot `Terminal` dans Spotlight). Ouvrez `Terminal` ou un autre client de ligne de commande de votre choix et confirmez que `node` et `npm` sont disponibles :

```sh
# Cette commande devrait afficher la version de Node.js
node -v

# Cette commande devrait afficher la version de npm
npm -v
```

Si les deux commandes affichent un numéro de version, vous êtes correctement configuré ! Avant de démarrer, vous voudrez peut-être installer un [éditeur de code](#a-good-editor) adapté pour le développement JavaScript.

## Mise en place sur Windows

> Electron supporte Windows 7 et les versions ultérieures – essayer de développer des applications Electron sur des versions antérieures de Windows ne marchera pas. Microsoft fournit gratuitement des [images de machine virtuelle avec Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) pour les développeurs.

Premièrement, installez une version récente de Node.js. Nous vous recommandons d'installer soit la dernière version `LTS` ou `Current` disponible. Visitez [la page de téléchargement de Node.js](https://nodejs.org/en/download/) et sélectionnez `Windows Installer`. Une fois téléchargé, exécutez l'installateur et laissez le guide d'installation vous guider à travers l'installation.

Sur l'écran qui vous permet de configurer l'installation, assurez-vous de sélectionner les options `Node.js runtime`, `npm package manager`, et `Ajouter au PATH`.

Une fois installé, confirmez que tout fonctionne comme prévu. Trouvez le PowerShell Windows en ouvrant le menu Démarrer et tapez `PowerShell`. Ouvrez `PowerShell` ou un autre client de ligne de commande de votre choix et confirmez que `node` et `npm` sont disponibles :

```powershell
# Cette commande devrait afficher la version de Node.js
node -v

# Cette commande devrait afficher la version de npm
npm -v
```

Si les deux commandes affichent un numéro de version, vous êtes correctement configuré ! Avant de démarrer, vous voudrez peut-être installer un [éditeur de code](#a-good-editor) adapté pour le développement JavaScript.

## Mise en place sur Linux

> De manière générale, Electron supporte Ubuntu 12.04, Fedora 21, Debian 8 et plus.

Premièrement, installez une version récente de Node.js. Les étapes d'installation pourraient différer selon votre distribution Linux. En supposant que vous installez normalement les logiciels en utilisant un gestionnaire de paquets comme `apt` ou `pacman`, utilisez le guide officiel [Guide Node.js pour l'installation sur Linux](https://nodejs.org/en/download/package-manager/).

Vous utilisez Linux, vous savez donc probablement déjà comment utiliser un client de ligne de commande. Ouvrez votre terminal préféré et confirmez que `node` et `npm` sont disponibles globalement :

```sh
# Cette commande devrait afficher la version de Node.js
node -v
# Cette commande devrait afficher la version de npm
npm -v
```

Si les deux commandes affichent un numéro de version, vous êtes correctement configuré ! Avant de démarrer, vous voudrez peut-être installer un [éditeur de code](#a-good-editor) adapté pour le développement JavaScript.

## Un bon éditeur

Nous pourrions suggérer deux éditeurs populaires gratuits construits avec Electron : [Atom](https://atom.io/) de GitHub et [Visual Studio Code](https://code.visualstudio.com/) de Microsoft. Les deux ont un excellent support JavaScript.

Si vous êtes l'un des nombreux développeurs ayant une forte préférence, sachez que pratiquement tous les éditeurs de code et IDEs de nos jours supportent JavaScript.
