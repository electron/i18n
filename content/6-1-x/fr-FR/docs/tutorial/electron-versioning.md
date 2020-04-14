# La gestion de versions d'Electron

> Un descriptif de la politique de gestion de version et d'implémentation.

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

```sh
npm install --save-dev electron
```

Pour mettre à jour un projet existant afin d'utiliser la dernière version stable :

```sh
npm install --save-dev electron@latest
```

## Version 1.x

Version d'Electron *< 2. * n'est pas conforme à la spécification [semver](http://semver.org) : les versions principales correspondent aux changements de l'API de l'utilisateur final, les versions mineures correspondaient aux versions majeures de Chromium, et les versions de correctifs correspondaient aux nouvelles fonctionnalités et aux corrections de bogues. Bien que pratique pour les développeurs qui fusionnent des fonctionnalités, cela crée des problèmes pour les développeurs d'applications côté client. Les cycles de tests QA d'applications majeures comme Slack, Stride, Teams, Skype, VS Code, Atom et Desktop peuvent être longs et la stabilité est un résultat très attendu. Il y a un grand risque d'inclure de nouvelles fonctionnalités en tentant de récupérer des correctifs.

Voici un exemple de la stratégie 1.x :

![](../images/versioning-sketch-0.png)

Une application développée avec la `1.8.1` ne peut pas avoir les corrections d'anomalies de la `1.8.3` sans inclure la fonctionnalité de la `1.8.2`, ou faire un rétroportage de la correction tout en maintenant une nouvelle ligne de versionnage.

## Version 2.0 et suivantes

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

1. Utilisation stricte de semver
2. Introduction de semver compatible avec les tags `-beta`
3. Introduction des [messages de commit conventionnels](https://conventionalcommits.org/)
4. Branches de stabilisation bien définies
5. La branche `master` est sans version; seules les branches de stabilisation contiennent des informations de version

Nous expliquerons en détail comment les branches de git fonctionnent, comment le tagging npm fonctionne, ce que les développeurs devraient d'attendre à voir, et comment l'on peut rapporter les changements antérieurement.

# semver

Dès la version 2.0, Electron va appliquer semver.

Ci-dessous, une table explicitant les types de changement avec leur catégorie correspondante semver (par exemple Majeur, Mineur, Correctif).

| Incréments de version Majeure                 | Incréments de version mineure                 | Incréments de version de Correctifs    |
| --------------------------------------------- | --------------------------------------------- | -------------------------------------- |
| changement Electron qui altère l'API          | changement Electron n'altérant pas l'API      | Mises à jour de correctif Electron     |
| Mises à jour de la version majeure de Node.js | Mises à jour mineure de la version de Node.js | Mises à jour des correctifs de Node.js |
| mises à jour de version Chromium              |                                               | mises à jour de correctifs Chromium    |


Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# Branches de stabilisation

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

Nous permettons à plusieurs branches de stabilisation d'exister simultanément, et ont l'intention de supporter au moins deux en parallèle en tout temps, en rétroportant les correctifs de sécurité si nécessaire. ![](../images/versioning-sketch-2.png)

Les anciennes lignes ne seront pas supportées par GitHub, mais d'autres groupes peuvent prendre possession et rétroporter des correctifs de stabilité et de sécurité par eux-mêmes. Nous décourageons cela, mais reconnaissons que cela facilite la vie de nombreux développeurs d'applications.

# Versions bêta et corrections de bugs

Les développeurs veulent savoir quelles versions sont fiables (_safe_). Même des fonctionnalités apparemment innocentes peuvent introduire des régressions dans des applications complexes. En même temps, verrouiller une version corrigée est dangereux parce que vous ignorez les correctifs de sécurité et les corrections de bogues qui sont peut-être apparues depuis votre version. Notre objectif est d'autoriser les plages de semver standards suivantes dans `package.json` :

* Utilisez `~2.0.0` pour admettre que les corrections liées à la stabilité ou à la sécurité dans votre version `2.0.0`.
* Utilisez `^2.0.0` pour admettre que la fonctionnalité _raisonnablement stable_ ne soit pas cassée, ainsi que la sécurité et les corrections de bogues.

Ce qui est important dans le deuxième point, c'est que les applications utilisant `^` devraient quand même pouvoir s'attendre à un niveau raisonnable de stabilité. To accomplish this, semver allows for a _pre-release identifier_ to indicate a particular version is not yet _safe_ or _stable_.

Quoi que vous choisissiez, vous devrez périodiquement remonter la version dans votre `package.json` car les changements cassés sont un fait de la vie de Chromium.

Le processus est le suivant:

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions:
    1. Le changement est compatible avec l'API ascendante (les dépréciations sont autorisées)
    2. Le risque de respect de notre calendrier de stabilité doit être faible.
2. Si les modifications autorisées doivent être apportées une fois qu'une version est bêta, elles sont appliquées et la balise de prélocation est incrémentée, par exemple `2.0.0-beta.2`.
3. Si une version bêta particulière est _généralement considérée_ comme stable, elle sera relancée comme une version stable, ne changeant que les informations de version. par exemple `2.0.0`. Après la première stable, tous les changements doivent être des bogues rétrocompatibles ou des corrections de sécurité.
4. Si de futures corrections de bogues ou de correctifs de sécurité doivent être faites une fois qu'une version est stable, elles sont appliquées et la version _patch_ est incrémentée e. . `2.0.1`.

Plus précisément, ce qui précède signifie :

1. Admitting non-breaking-API changes early in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort very late in the beta cycle is 👎 without a very good reason.

Pour chaque bosse majeure et mineure, vous devriez vous attendre à voir quelque chose comme ceci:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Un exemple de cycle de vie dans les images :

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* La bêta est considérée comme _généralement stable_ et est à nouveau publiée comme non-bêta sous `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Quelques exemples de la façon dont différentes gammes de semver vont ramasser les nouvelles versions:

![](../images/versioning-sketch-7.png)

# Caractéristiques manquantes : Alphas
Notre stratégie comporte quelques compromis qui, pour l'instant, nous semblent appropriés. Le plus important est que les nouvelles fonctionnalités dans master peuvent prendre un certain temps avant d'atteindre une ligne de publication stable. Si vous voulez essayer une nouvelle fonctionnalité immédiatement, vous devrez construire Electron vous-même.

À l'avenir, nous pourrions introduire l'un ou l'autre des éléments suivants:

* les versions alpha qui ont des contraintes de stabilité plus lâches aux bêta; par exemple, il serait permis d'admettre de nouvelles fonctionnalités alors qu'un canal de stabilité est en _alpha_

# Indicateurs de fonctionnalités
Les drapeaux de fonctionnalités sont une pratique courante dans Chromium, et sont bien établis dans l'écosystème de développement Web. Dans le contexte d'Electron, une fonctionnalité ou une **branche soft** doit avoir les propriétés suivantes :

* il est activé/désactivé soit au moment de l'exécution, soit au moment de la construction ; nous ne prenons pas en charge le concept d'une fonctionnalité à portée de requête
* il segmente complètement les chemins de code nouveaux et anciens; refactoring l'ancien code pour supporter une nouvelle fonctionnalité _violation_ le contrat de trait-flag
* les drapeaux de fonctionnalités sont éventuellement supprimés après la publication de la fonctionnalité

# Commits sémantiques

Nous cherchons à accroître la clarté à tous les niveaux du processus de mise à jour et de publication. À partir de `2.0.0` nous aurons besoin que les demandes de fusion adhèrent à la spécification [Engagements conventionnels](https://conventionalcommits.org/), qui peut être résumée comme suit :

* Les commits qui entraîneraient un bump **majeur** doivent commencer leur corps avec `CHANGEMENT DE RÉCUPÉRATION :`.
* Les commits qui entraîneraient un bump **mineur** doivent commencer par `feat:`.
* Les commits qui entraîneraient un bump de type **patch** doivent commencer par `correctif :`.

* Nous autorisons le écrasement des livres, à condition que le message écrasé adhère au format de message ci-dessus.
* Il est acceptable pour certains commits dans une pull request de ne pas inclure un préfixe sémantique, aussi longtemps que le titre de la demande d'ajout contient un message sémantique significatif.

# Version `master`

- La branche `master` contiendra toujours la prochaine version majeure `X.0.0-nightly.DATE` dans son `package.json`
- Les branches de version ne sont jamais fusionnées vers master
- Les branches de version _do_ contiennent la version correcte dans leur `package.json`
- As soon as a release branch is cut for a major, master must be bumped to the next major.  I.e. `master` is always versioned as the next theoretical release branch
