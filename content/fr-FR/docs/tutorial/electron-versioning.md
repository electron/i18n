# Versionnement d'Electron

> Un descriptif de la politique de gestion de version et d'implémentation.

Depuis la version 2.0.0, Electron applique la politique [semver](#semver) (gestion sémantique de version). La commande suivante installe la version stable d'Electron la plus récente :

```sh
npm install --save-dev electron
```

Pour mettre à jour un projet existant afin d'utiliser la dernière version stable :

```sh
npm install --save-dev electron@latest
```

## Version 1.x

Electron versions *< 2.0* did not conform to the [semver](http://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. Bien que pratique pour les développeurs qui fusionnent des fonctionnalités, cela crée des problèmes pour les développeurs d'applications côté client. Les cycles de tests QA d'applications majeures comme Slack, Stride, Teams, Skype, VS Code, Atom et Desktop peuvent être longs et la stabilité est un résultat très attendu. Il y a un grand risque d'inclure de nouvelles fonctionnalités en tentant de récupérer des correctifs.

Voici un exemple de la stratégie 1.x :

![](../images/versioning-sketch-0.png)

Une application développée avec la `1.8.1` ne peut pas avoir les corrections d'anomalies de la `1.8.3` sans inclure la fonctionnalité de la `1.8.2`, ou faire un rétroportage de la correction tout en maintenant une nouvelle ligne de versionnage.

## Version 2.0 et suivantes

Il y a plusieurs changements majeurs par rapport à notre stratégie 1.x décrite ci-dessous. Chaque changement vise à satisfaire les besoins et les priorités des développeurs/mainteneurs et développeurs d'applications.

1. Utilisation stricte de semver
2. Introduction de semver compatible avec les tags `-beta`
3. Introduction des [messages de commit conventionnels](https://conventionalcommits.org/)
4. Well-defined stabilization branches
5. The `master` branch is versionless; only stabilization branches contain version information

Nous expliquerons en détail comment les branches de git fonctionnent, comment le tagging npm fonctionne, ce que les développeurs devraient d'attendre à voir, et comment l'on peut rapporter les changements antérieurement.

# semver

Dès la version 2.0, Electron va appliquer semver.

Ci-dessous, une table explicitant les types de changement avec leur catégorie correspondante semver (par exemple Majeur, Mineur, Correctif).

| Incréments de version Majeure        | Incréments de version mineure                 | Incréments de version de Correctifs |
| ------------------------------------ | --------------------------------------------- | ----------------------------------- |
| changement Electron qui altère l'API | changement Electron n'altérant pas l'API      | Mises à jour de correctif Electron  |
| Node.js major version updates        | Mises à jour mineure de la version de Node.js | Node.js patch version updates       |
| mises à jour de version Chromium     |                                               | mises à jour de correctifs Chromium |

Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# Branches de stabilisation

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

We allow for multiple stabilization branches to exist simultaneously, and intend to support at least two in parallel at all times, backporting security fixes as necessary. ![](../images/versioning-sketch-2.png)

Older lines will not be supported by GitHub, but other groups can take ownership and backport stability and security fixes on their own. We discourage this, but recognize that it makes life easier for many app developers.

# Versions bêta et corrections de bugs

Les développeurs veulent savoir quelles versions sont fiables (*safe*). Even seemingly innocent features can introduce regressions in complex applications. At the same time, locking to a fixed version is dangerous because you’re ignoring security patches and bug fixes that may have come out since your version. Our goal is to allow the following standard semver ranges in `package.json` :

- Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
- Use `^2.0.0` to admit non-breaking *reasonably stable* feature work as well as security and bug fixes.

What’s important about the second point is that apps using `^` should still be able to expect a reasonable level of stability. To accomplish this, semver allows for a *pre-release identifier* to indicate a particular version is not yet *safe* or *stable*.

Whatever you choose, you will periodically have to bump the version in your `package.json` as breaking changes are a fact of Chromium life.

The process is as follows:

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions: 
    1. The change is backwards API-compatible (deprecations are allowed)
    2. The risk to meeting our stability timeline must be low.
2. If allowed changes need to be made once a release is beta, they are applied and the prerelease tag is incremented, e.g. `2.0.0-beta.2`.
3. If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`. After the first stable, all changes must be backwards-compatible bug or security fixes.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented e.g. `2.0.1`.

Specifically, the above means:

1. Admitting non-breaking-API changes before Week 3 in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort after Week 3 in the beta cycle is 

For each major and minor bump, you should expect to see something like the following:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

An example lifecycle in pictures:

- A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
- A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
- The beta is considered *generally stable* and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
- Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

A few examples of how various semver ranges will pick up new releases:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas

Our strategy has a few tradeoffs, which for now we feel are appropriate. Most importantly that new features in master may take a while before reaching a stable release line. If you want to try a new feature immediately, you will have to build Electron yourself.

As a future consideration, we may introduce one or both of the following:

- alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in *alpha*

# Feature Flags

Feature flags are a common practice in Chromium, and are well-established in the web-development ecosystem. In the context of Electron, a feature flag or **soft branch** must have the following properties:

- it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
- it completely segments new and old code paths; refactoring old code to support a new feature *violates* the feature-flag contract
- feature flags are eventually removed after the feature is released

# Semantic Commits

We seek to increase clarity at all levels of the update and releases process. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

- Commits that would result in a semver **major** bump must start their body with `BREAKING CHANGE:`.
- Commits that would result in a semver **minor** bump must start with `feat:`.
- Commits that would result in a semver **patch** bump must start with `fix:`.

- We allow squashing of commits, provided that the squashed message adheres the the above message format.

- It is acceptable for some commits in a pull request to not include a semantic prefix, as long as the pull request title contains a meaningful encompassing semantic message.

# Versioned `master`

- The `master` branch will always contain the next major version `X.0.0-nightly.DATE` in its `package.json`
- Release branches are never merged back to master
- Release branches *do* contain the correct version in their `package.json`
- As soon as a release branch is cut for a major, master must be bumped to the next major. I.e. `master` is always versioned as the next theoretical release branch