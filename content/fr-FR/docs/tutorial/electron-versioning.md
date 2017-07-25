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

Due to its dependency on Node and Chromium, it is not possible for the Electron project to adhere to a SemVer policy. **You should therefore always reference a specific version of Electron.**

Electron version numbers are bumped using the following rules:

* **Major** is for breaking changes in Electron's API. If you upgrade from `0.37.0` to `1.0.0`, you will have to make changes to your app.
* **Minor** is for major Chrome and minor Node upgrades, or significant Electron changes. If you upgrade from `1.5.0` to `1.6.0`, your app is supposed to still work, but you might have to work around small changes.
* **Patch** is for new features and bug fixes. If you upgrade from `1.6.2` to `1.6.3`, your app will continue to work as-is.

We recommend that you set a fixed version when installing Electron from npm:

```sh
npm install electron --save-exact --save-dev
```

The `--save-exact` flag will add `electron` to your `package.json` file without using a `^` or `~`, e.g. `1.6.2` instead of `^1.6.2`. This practice ensures that all upgrades of Electron are a manual operation made by you, the developer.

Alternatively, you can use the `~` prefix in your SemVer range, like `~1.6.2`. This will lock your major and minor version, but allow new patch versions to be installed.