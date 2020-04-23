# crashReporter

> Soumet un rapport de plantage à un serveur distant.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Voici un exemple d'envoi automatique d'un rapport de plantage à un serveur distant :

```javascript
const { crashReporter } = require('electron')

crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  uploadToServer: true
})
```

Pour configurer un serveur pour accepter et traiter les rapports de plantage, vous pouvez utiliser projets suivants :

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Ou utilisez une solution hébergée par un tiers :

* [Backtrace I/O](https://backtrace.io/electron/)
* [Sentinelle](https://docs.sentry.io/clients/electron)

Les rapports de plantage sont enregistrés localement dans un dossier de répertoire temporaire spécifique à l'application. Pour un `productName` de `VotreNom`, les rapports de plantage seront stockés dans un dossier nommé `Écrasement` dans le répertoire temp. Vous pouvez personnaliser cet emplacement de répertoire temporaire pour votre application en appelant l'API `app.setPath('temp', '/my/custom/temp')` avant de démarrer le rapport de plantage.

## Méthodes

Le module `crashReporter` dispose des méthodes suivantes :

### `crashReporter.start(options)`

* `options` Object
  * `companyName` String
  * `submitURL` String - URL à laquelle les rapports de plantage seront envoyés en tant que POST.
  * `productName` String (optional) - Defaults to `app.getName()`.
  * `uploadToServer` Boolean (optional) - Whether crash reports should be sent to the server Default is `true`.
  * `ignoreSystemCrashHandler` Boolean (facultatif) - La valeur par défaut est `false`.
  * `extra` Object (optional) - An object you can define that will be sent along with the report. Seules les propriétés de la chaîne sont envoyées correctement. Nested objects are not supported and the property names and values must be less than 64 characters long.
  * `crashesDirectory` String (optional) - Directory to store the crashreports temporarily (only used when the crash reporter is started via `process.crashReporter.start`).

Vous devez appeler cette méthode avant d'utiliser toute autre API `crashReporter` et dans chaque processus (principal/renderer) dont vous souhaitez recueillir les rapports d'accident. Vous pouvez passer différentes options à `crashReporter.start` lors d'un appel de différents processus.

**Note** Les processus enfants créés via le module `child_process` n'auront pas accès aux modules Electron. Par conséquent, pour collecter les rapports de plantage, utilisez `process.crashReporter.start` à la place. Passez les mêmes options que celles ci-dessus avec une autre appelée `crashesDirectory` qui devrait pointer vers un répertoire pour stocker temporairement le crash . Vous pouvez tester cela en appelant `process.crash()` pour faire planter le processus fils.

**Remarque :** Si vous avez besoin d'envoyer des paramètres supplémentaires ou mis à jour `extra` après votre premier appel `démarrer` vous pouvez appeler `addExtraParameter` sur macOS ou appeler à nouveau `start` avec les paramètres `extra` mis à jour sur Linux et Windows.

**Remarque :** Sur macOS et Windows, Electron utilise un nouveau client `crashpad` pour la collecte et le reporting des plantages. Si vous voulez activer le rapport de plantage, initialisant `crashpad` depuis le processus principal en utilisant `crashReporter. tart` est requis quel que soit le processus à partir duquel vous voulez collecter des plantages. Une fois initialisé de cette façon, le gestionnaire de crashpad collecte plantages de tous les processus. Vous devez toujours appeler `crashReporter. tart` depuis le rendu ou le processus fils, sinon les plantages de d'eux seront signalés sans `companyName`, `productName` ou n'importe quelle information `extra`.

### `crashReporter.getLastCrashReport()`

Retourne [`CrashReport`](structures/crash-report.md) :

Renvoi la date et l'identifiant du dernier crash. Seuls les rapports de plantages qui ont étés téléchargés seront renvoyés ; même si un rapport de plantages est présent sur le disque, il ne sera pas renvoyé avant qu'il soit téléchargé. Dans le cas où il n'y a pas de rapports téléchargés, `null` est retourné.

### `crashReporter.getUploadedReports()`

Retourne [`CrashReport[]`](structures/crash-report.md) :

Returns all uploaded crash reports. Each report contains the date and uploaded ID.

### `crashReporter.getUploadToServer()`

Returns `Boolean` - Whether reports should be submitted to the server. Set through the `start` method or `setUploadToServer`.

**Note:** Cette API ne peut être appelée que depuis le processus principal.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean _macOS_ - Si les rapports doivent être soumis au serveur.

This would normally be controlled by user preferences. This has no effect if called before `start` is called.

**Note:** Cette API ne peut être appelée que depuis le processus principal.

### `crashReporter.addExtraParameter(key, value)` _macOS_ _Windows_

* `clé` Chaîne - Le paramètre de clé, doit contenir moins de 64 caractères.
* `valeur` Chaîne - La valeur du paramètre, doit contenir moins de 64 caractères.

Définit un paramètre supplémentaire à envoyer avec le rapport de plantage. Les valeurs spécifiées ici seront envoyées en plus de toutes les valeurs définies via l'option `extra` lorsque `start` a été appelé. Cette API n'est disponible que sur macOS et windows, si vous devez ajouter/mettre à jour des paramètres supplémentaires sur Linux après votre premier appel à `start` vous pouvez appeler à nouveau `start` avec les options `extra` mises à jour.

### `crashReporter.removeExtraParameter(key)` _macOS_ _Windows_

* `clé` Chaîne - Le paramètre de clé, doit contenir moins de 64 caractères.

Supprime un paramètre supplémentaire de l'ensemble de paramètres courant afin qu'il ne soit pas envoyé avec le rapport de plantage.

### `crashReporter.getParameters()`

Voir tous les paramètres actuels passés au rapport de plantage.

## Payload du Crash Report

Le rapporteur de plantage enverra les données suivantes à `submitURL` comme un `POST` en `multipart/form-data` :

* `ver` String - La version d'Electron.
* `platform` String - Par exemple 'win32'.
* `process_type` String - Par exemple 'renderer'.
* `guid` String - Par exemple '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - La version dans `package.json`.
* `_productName` String - Le nom du produit dans l'objet `options` de `crashReporter`.
* `prod` String - Name of the underlying product. In this case Electron.
* `_companyName` String - Le nom de l'entreprise dans l'objet `options` de `crashReporter`.
* `upload_file_minidump` File - Le rapport d'incident dans le format `minidump`.
* Toutes les propriétés de niveau 1 de l'objet `extra` dans l'objet `options` de `crashReporter`.
