# Créer une nouvelle version d'Electron

Ce document décrit le processus pour créer une nouvelle version d’Electron.

## Compiler les notes de publication

Le processus actuel est de maintenir un fichier local, en faisant un suivi des changements notables que vous verrez dans les pull request qui sont merged. Pour obtenir des exemples de comment mettre en forme les notes, voir les versions précédentes sur [la page de parutions](https://github.com/electron/electron/releases).

## Créer une branche temporaire

Créer une nouvelle branche depuis `master` nommée `release`.

```sh
git checkout master
git pull
git checkout -b release
```

Cette branche est créée comme une mesure de précaution pour empêcher tout PRs fusionnées de se faufiler dans un communiqué, entre le moment où la branche temporaire de nouvelle version est créée et les builds de CI sont terminés.

## Changer le numéro de version

Exécutez le script de `bump-version`, et mettre `majeure`, `mineure` ou `patch` comme argument :

```sh
npm run bump-version -- patch
git push origin HEAD
```

Cela va changer le numéro de version dans plusieurs fichiers. Voir [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) pour exemple.

La plupart des nouvelles versions seront des `patch`. Les mises à jour de Chrome ou d'autres changements majeurs doivent utiliser `minor`. Pour plus d’informations, consultez [electron-versioning](/docs/tutorial/electron-versioning.md).

## Modifier le projet de communiqué

1. Visitez [la page de parutions](https://github.com/electron/electron/releases) et vous verrez un nouveau projet de version avec les notes de publication.
2. Modifiez la version et ajouter des notes de publication.
3. Cliquez sur 'Save draft'. **Ne pas cliquer sur 'Publish release'!**
4. Attendez que toutes les builds passent. :hourglass_flowing_sand:

## Fusionner une branche temporaire

Fusionner la branche temporaire dans master, sans créer un merge commit :

```sh
git merge release master --no-commit
git push origin master
```

Si cela échoue, rebase avec master et rebuild :

```sh
git pull
git checkout release
git rebase master
git push origin HEAD
```

## Exécuter un build de debug local

Exécutez la version de debug local pour vérifier que vous créez la version que vous souhaitez. Parfois, vous pensiez que vous faisiez une nouvelle version, mais vous ne le faites pas.

```sh
npm run build
npm start
```

Vérifiez que la fenêtre affiche la version de mise à jour actuelle.

## Définir les variables d'environnement

Vous devrez définir les variables d’environnement suivantes pour publier une nouvelle version. Demandez à un autre membre de l’équipe pour ces informations d’identification.

- `ELECTRON_S3_BUCKET`
- `ELECTRON_S3_ACCESS_KEY`
- `ELECTRON_S3_SECRET_KEY`
- `ELECTRON_GITHUB_TOKEN` - un jeton d’accès personnelle avec le scope « repo ».

Vous aurez besoin de le faire seulement une fois.

## Publier la release

Ce script va télécharger les fichiers binaires et générer les headers de node et l’éditeur de liens .lib utilisé sur Windows par node-gyp pour build les modules natifs.

```sh
npm run release
```

Remarque: Beaucoup de distributions de Python sont toujours livrés avec de vieux certificats HTTPS. Vous pouvez voir un `InsecureRequestWarning`, mais c'est négligeable.

## Supprimer la branche temporaire

```sh
git checkout master
git branch -D release # delete local branch
git push origin :release # delete remote branch
```