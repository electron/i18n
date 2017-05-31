# Construire des Instructions (macOS)

Suivez les indications ci-dessous pour la construction des électrons sur macOS.

## Conditions préalables

- macOS > = 10.11.6
- [Xcode](https://developer.apple.com/technologies/tools/) > = 8.2.1
- [node.js](http://nodejs.org) (externe)

Si vous utilisez Python téléchargé par Homebrew, vous devez également installer les modules Python suivants :

- [PyObjC](https://pythonhosted.org/pyobjc/install.html)

## Mac OS SDK

Si vous êtes simplement développer des électrons et ne prévoyez pas de redistribuer votre génération électronique personnalisée, vous pouvez ignorer cette section.

Pour certaines fonctionnalités (par exemple pinch-zoom) fonctionner correctement, vous devez cibler le macOS, 10,10 SDK.

Les versions électronique officielles sont construites avec [Xcode 8.2.1](http://adcdownload.apple.com/Developer_Tools/Xcode_8.2.1/Xcode_8.2.1.xip), qui ne contient pas le SDK 10.10 par défaut. Pour l’obtenir, tout d’abord télécharger et installer le[Xcode 6.4](http://developer.apple.com/devcenter/download.action?path=/Developer_Tools/Xcode_6.4/Xcode_6.4.dmg) DMG.

Puis, en supposant que le Xcode 6.4 DMG a été monté à `/Volumes/Xcode` et que votre installation de Xcode 8.2.1 est à `/Applications/Xcode.app`, exécutez :

```bash
CP - r /Volumes/Xcode/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/MacOSX10.10.sdk /Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Developer/SDKs/
```

Vous devrez aussi activer Xcode construire contre le SDK 10.10 :

- Ouvrir `/Applications/Xcode.app/Contents/Developer/Platforms/MacOSX.platform/Info.plist`
- La valeur du `MinimumSDKVersion` `10.10`
- Enregistrez le fichier

## Obtenir le Code

```bash
$ git clone https://github.com/electron/electron
```

## Amorçage

Le script bootstrap téléchargera toutes les dépendances nécessaires et créer les fichiers de projet. Avis que nous utilisons [ninja](https://ninja-build.org/) pour construire des électrons donc il n’y a aucun projet Xcode générée.

```bash
$ cd $ électron./script/bootstrap.py - v
```

## Bâtiment

Mise à jour des objectifs tant `Release` que `Debug` :

```bash
$./script/build.py
```

Vous pouvez également que construire la cible de `Debug` :

```bash
$./script/build.py - c D
```

Après que le bâtiment est terminé, vous pouvez trouver `Electron.app` sous `out/D`.

## 32 bit Support

Électron ne peut se construire que pour un objectif de 64 bits sur Mac OS et il n’y a pas de plan de soutien 32bits macOS dans le futur.

## Nettoyage

Pour nettoyer les fichiers de build :

```bash
NGP $ courir propre
```

Pour nettoyer uniquement les répertoires `out` et `dist` :

```bash
NGP $ exécuter nettoyer-génération
```

**Note:** que les deux commandes propres demander l’exécution de `bootstrap` encore une fois devant le bâtiment.

## Tests

Voir la présentation du système [Build : Tests](build-system-overview.md#tests)