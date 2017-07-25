# Versioning d'Electron

Si vous utilisez Node et npm depuis un moment, vous êtes probablement au courant du [versioning sémantique](http://semver.org), ou SemVer en abrégé. Il s’agit d’une convention pour les numéros de version pour les logiciel permettant de communiquer les intentions de vos mises à jour pour les utilisateurs.

## Vue d’ensemble du versionnage sémantique

Les versions sémantiques sont toujours constituées de trois nombres :

    majeur.mineur.patch
    

Les numéros de version sémantiques sont incrémentés en utilisant les règles suivantes :

* **Majeur** est pour les modifications pouvant casser la rétro-compatibilité.
* **Mineur** est pour les nouvelles fonctionnalités ne cassant pas la rétro-compatibilité.
* **Patch** est pour les corrections de bugs et autres modifications mineures.

Une simple mnémotechnique pour se rappeler de ce schéma :

    breaking.feature.fix (brisant.fonctionnalité.fixe)
    

## Versioning d'Electron

En raison de sa dépendance sur Node et Chromium, il n’est pas possible pour le projet Electron à adhérer à une politique SemVer. **Vous devriez donc toujours faire référence à une version spécifique d'Electron.**

Les numéros de version d'Electron sont incrémentés en utilisant les règles suivantes :

* **Majeur** est pour les changements non rétro-compatible dans l'API Electron. Si vous mettez à jour de la `0.37.0` à la `1.0.0`, vous devrez apporter des modifications à votre application.
* **Mineur** est pour les mises à jour majeur pour Chrome et mineur pour Node, ou d'importantes modifications d'Electron. Si vous passez de la `1.5.0` à la `1.6.0`, votre application est supposée toujours fonctionner, mais vous devrez peut-être avoir quelques petites modifications.
* **Patch** est pour les nouvelles fonctionnalités et corrections de bugs. Si vous passez de la `1.6.2` à la `1.6.3`, votre application continuera de fonctionner sans problème.

Nous vous recommandons de définir une version fixe lors de l’installation d'Electron depuis npm :

```sh
npm install electron --save-exact --save-dev
```

The `--save-exact` flag will add `electron` to your `package.json` file without using a `^` or `~`, e.g. `1.6.2` instead of `^1.6.2`. This practice ensures that all upgrades of Electron are a manual operation made by you, the developer.

Alternatively, you can use the `~` prefix in your SemVer range, like `~1.6.2`. This will lock your major and minor version, but allow new patch versions to be installed.