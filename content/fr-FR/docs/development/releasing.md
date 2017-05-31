# Relâchant

Ce document décrit le processus pour libérer une nouvelle version d’électron.

## Compiler les notes de publication

Le processus actuel est de maintenir un fichier local, suivi des changements notables que tirez requêtes sont fusionnés. Pour obtenir des exemples de comment mettre en forme les notes, voir versions précédentes sur [the libère page](https://github.com/electron/electron/releases).

## Créer une branche temporaire

Créer une nouvelle branche de `master` nommé `release`.

```sh
libérer de git checkout master git pull git checkout -b
```

Cette branche est créée comme une mesure de précaution pour empêcher tout PRs fusionnées de se faufiler dans un communiqué, entre le moment où la direction de libération provisoire est créé et les builds de CI sont terminées.

## Bosse la version

Exécutez le script de `bump-version`, passage `major`, `minor` ou `patch` en tant qu’argument :

```sh
NGP exécutez bump-version--origine de patch git push tête
```

Cette bosse le numéro de version dans plusieurs fichiers. Voir [this commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) pour obtenir un exemple de bosse.

Plupart des rejets sera `patch` niveau. Mises à jour de Chrome ou d’autres changements majeurs doivent utiliser `minor`. Pour plus d’informations, voir [electron-versioning](/docs/tutorial/electron-versioning.md).

## Modifier le projet de communiqué

  1. Visitez [the libère page](https://github.com/electron/electron/releases) et vous verrez un nouveau projet de sortie avec les notes de publication d’espace réservé.
  2. Modifier la libération et ajouter des notes de publication.
  3. Cliquez sur « enregistrer le projet ». **Do pas cliquer sur « Publier le communiqué » !**
  4. Attendez que toutes les versions de passer. :hourglass_flowing_sand:

## Fusionner la branche temporaire

Fusionner le retour temporaire en maître, sans créer un commit de fusion :

```sh
git merge libération maître--non-commit git push origine maître
```

Si cela échoue, rebase avec maître et reconstruire :

```sh
Caisse de git git pull version git rebase maître git push origine tête
```

## Exécutez la version debug local

Exécutez la version de debug local pour vérifier que vous créez en fait la version que vous souhaitez. Parfois, vous pensiez que vous faisiez une sortie d’une nouvelle version, mais vous n’êtes pas réellement.

```sh
NPM, exécutez build NGP start
```

Vérifiez que la fenêtre affiche la version de mise à jour actuelle.

## Variables d’environnement Set

Vous devrez définir les variables d’environnement suivantes de publier un communiqué. Demandez à un autre membre de l’équipe pour ces informations d’identification.

- `ELECTRON_S3_BUCKET`
- `ELECTRON_S3_ACCESS_KEY`
- `ELECTRON_S3_SECRET_KEY`
- `ELECTRON_GITHUB_TOKEN` - un jeton d’accès personnelle avec une étendue de « repo ».

Vous aurez seulement besoin de le faire une fois.

## Publier le communiqué

Ce script va télécharger les fichiers binaires et générer les en-têtes de nœud et l’éditeur de liens .lib utilisé sur Windows par nœud-gyp pour construire les modules natifs.

```sh
NGP exécuter libération
```

Remarque : Beaucoup de distributions de Python sont toujours livrés avec vieux certificats HTTPS. Vous pouvez voir un `InsecureRequestWarning`, mais elle peut être négligée.

## Supprimer la branche temporaire

```sh
git checkout master git branch -D sortie # delete local branch git push origine : Communiqué # supprimer sites distants
```