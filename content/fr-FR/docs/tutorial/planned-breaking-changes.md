# Changements majeurs prévus de l'API (4.0)

La liste suivante inclut les APIs qui seront supprimés dans Electron 4.0.

Il n'y a pas de planning pour la sortie de cette version, mais des avertissements de dépréciation seront ajoutés au moins [une version majeure ](electron-versioning.md#semver)au préalable.

## `webFrame`

```js
// Deprecated
webFrame.registerURLSchemeAsPrivileged('app', {secure: true})
// Replace with
protocol.registerStandardSchemes(['app'], {secure: true})
```

*Nota Bene:* Before we can remove this we need to update all of the relevant specs to `protocol.registerStandardSchemes(['app'], {secure: true})`.

## `app.makeSingleInstance`

```js
// Déprécié
app.makeSingleInstance(function (argv, cwd) {

})
// Remplacé par
app.requestSingleInstanceLock()
app.on('second-instance', function (argv, cwd) {

})
```

## `app.releaseSingleInstance`

```js
// Déprécié
app.releaseSingleInstance()
// Remplacé par
app.releaseSingleInstanceLock()
```

## commentaires `FIXME`

La chaîne de caractère `FIXME` est utilisée dans les commentaires de code pour désigner les choses qu’il convient de fixer pour la version 3.0. Voir https://github.com/electron/electron/search?q=fixme