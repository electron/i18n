## Débogage avec XCode

### Générer le projet xcode pour débogage des sources (ne peut pas construire de code à partir de xcode)

Exécutez `gn gen` avec l’argument --ide=xcode.

```sh
$ gn gen out /Testing --ide=xcode $gn gen out/Testing --ide=xcode $gn gen out/Testing --ide=xcode $
```

Cela générera le electron.ninja.xcworkspace. Vous devrez ouvrir cet espace de travail pour définir des points d'arrêt et inspecter.

Consultez `gn help gen` plus d’informations sur la génération de projets IDE avec GN.

### Débogage et points d’arrêt

Lancez l’application Electron après la construction. Vous pouvez maintenant ouvrir l’espace de travail xcode créé ci-dessus et vous attacher au de processus Electron via le menu de débug > Joindre au processus > 'électrons. [Remarque : Si vous souhaitez débobuger processus de rendu, vous devez également vous attacher à l’aide électronique.]

Vous pouvez maintenant définir des points d'arrêt dans l'un des fichiers indexés. Toutefois, vous ne serez pas en mesure de définir des points d’arrêt directement dans la source Chrome. Pour définir des points de rupture dans la source Chrome, vous pouvez choisir Debug > Breakpoints > Créer un point de rupture symbolique et définir n’importe quel nom de fonction comme symbole. Cela définira le point d' pour toutes les fonctions avec ce nom, de toutes les classes s’il y en a plus d’une. Vous pouvez également faire cette étape de réglage des points de rupture avant d’attacher le débugger, cependant, les points d’arrêt réels pour les fonctions de point de rupture symboliques peuvent ne pas s’afficher jusqu’à ce que le débaugeur soit attaché à l’application.
