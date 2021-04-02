# crashReporter

> Soumet un rapport de plantage à un serveur distant.

Processus : [Main](../glossary.md#main-process), [Renderer](../glossary.md#renderer-process)

Ce qui suit est un exemple de configuration d’Electron pour soumettre automatiquement rapports de crash à un serveur distant :

```javascript
const { crashReporter } = require ('electron')

crashReporter.start({ submitURL: 'https://your-domain.com/url-to-submit' })
```

Pour configurer un serveur pour accepter et traiter les rapports de plantage, vous pouvez utiliser les projets suivants :

* [socorro](https://github.com/mozilla/socorro)
* [mini-breakpad-server](https://github.com/electron/mini-breakpad-server)

Ou utilisez une solution hébergée par un tiers :

* [Trace d'appels](https://backtrace.io/electron/)
* [Sentinelle](https://docs.sentry.io/clients/electron)
* [BugSplat](https://www.bugsplat.com/docs/platforms/electron)

Les rapports de crash sont stockés temporairement avant d’être téléchargés dans un répertoire sous l’annuaire des données utilisateur de l’application (appelé « Crashpad » sur Windows et Mac, ou « Crash Reports » sur Linux). Vous pouvez passer outre à cet annuaire en appelant `app.setPath('crashDumps', '/path/to/crashes')` avant de commencer le crash journaliste.

Sur Windows et macOS, Electron utilise [crashpad](https://chromium.googlesource.com/crashpad/crashpad/+/master/README.md) pour surveiller et signaler les plantages. Sur Linux, Electron utilise [breakpad](https://chromium.googlesource.com/breakpad/breakpad/+/master/). Ce un détail de mise en œuvre piloté par chrome, et il peut changer à l’avenir. Dans particulier, crashpad est plus nouveau et sera probablement éventuellement remplacer breakpad sur tous les plates-formes.

### Note sur les processus node enfant sur Linux

Si vous utilisez le module Nœud.js `child_process` et que vous souhaitez signaler les de plantage à partir de ces processus sur Linux, il ya une étape supplémentaire que vous devrez prendre pour correctement initialiser le journaliste crash dans le processus de l’enfant. Ce n’est nécessaire sur Mac ou Windows, car ces plates-formes utilisent Crashpad, qui automatiquement les processus enfant.

Étant donné `require('electron')` n’est pas disponible dans les processus node enfant, les api suivantes sont disponibles sur l’objet `process` dans les processus node enfant. Notez que, sur Linux, chaque processus enfant nœud a sa propre instance distincte de le journaliste crash breakpad. Ceci est différent des processus renderer enfant, qui ont un « stub » breakpad reporter qui renvoie l’information à l' processus de rapport.

#### `process.crashReporter.start(options)`

Voir [`crashReporter.start()`](#crashreporterstartoptions).

#### `process.crashReporter.getParamètres()`

Voir [`crashReporter.getParameters()`](#crashreportergetparameters).

#### `process.crashReporter.addExtraParameter (clé, valeur)`

Voir [`crashReporter.addExtraParameter(key, value)`](#crashreporteraddextraparameterkey-value).

#### `process.crashReporter.removeExtraParameter (clé)`

Voir [`crashReporter.removeExtraParameter(key)`](#crashreporterremoveextraparameterkey).

## Méthodes

Le module `crashReporter` dispose des méthodes suivantes :

### `crashReporter.start(options)`

* `options` objet
  * `submitURL` String - URL à laquelle les rapports de plantage seront envoyés en tant que POST.
  * `productName` String (facultatif) - `app.name`.
  * `companyName` String (facultatif) _Deprecated_ - Alias déprécié pour `{ globalExtra: { _companyName: ... } }`.
  * `uploadToServer` Boolean (facultatif) - Si les rapports de plantage doivent être au serveur. S’ils sont faux, les rapports d’accident seront collectés et stockés dans répertoire des plantages, mais pas téléchargés. La valeur par défaut est `true`.
  * `ignoreSystemCrashHandler` Boolean (facultatif) - Si c’est vrai, les plantages générés dans le processus principal ne seront pas transmis au gestionnaire de plantage du système. Par défaut la valeur est `false`.
  * `rateLimit` Boolean (facultatif) _macOS_ _Windows_ - Si c’est vrai, limitez le nombre de plantages téléchargés à 1/heure. Par défaut la valeur est `false`.
  * `compress` Boolean (facultatif) - Si c’est vrai, les rapports de crash seront compressés et téléchargés avec `Content-Encoding: gzip`. La valeur par défaut est `true`.
  * `extra` enregistrement<String, String> (facultatif) - Des annotations supplémentaires de clé/valeur de chaîne qui seront envoyées ainsi que des rapports de plantage qui sont générés dans le processus principal. Seules les valeurs de chaîne sont prises en charge. Les plantages générés processus pour enfants ne contiendront pas ces paramètres de supplémentaires aux rapports d’accident générés par les processus pour enfants, les [`addExtraParameter`](#crashreporteraddextraparameterkey-value) d’appel du processus 'enfant.
  * `globalExtra` enregistrement<String, String> (facultatif) - Annotations de clé/valeur de chaîne supplémentaire qui seront envoyées avec tous les rapports de plantage générés dans n’importe quel processus ' œil. Ces annotations ne peuvent pas être modifiées une fois que le journaliste du crash été démarré. Si une clé est présente à la fois dans les paramètres supplémentaires mondiaux et les paramètres supplémentaires spécifiques au processus, alors la clé globale aura préséance. Par défaut, `productName` et la version de l’application sont incluses, ainsi que la version Electron.

Cette méthode doit être appelée avant d’utiliser toute autre `crashReporter` API. Une fois paramétisé de cette façon, le gestionnaire de crashpad recueille les plantages de toutes les par la suite créé des processus. Le journaliste du crash ne peut pas être désactivé une fois commencé.

Cette méthode doit être appelée le plus tôt possible dans le démarrage de l’application, de préférence avant `app.on('ready')`. Si le reporter de plantage n’est pas paramé huisié au moment où un processus de rendu est créé, alors ce processus de rendu ne sera pas surveillé par le journaliste de crash.

**note:** pouvez tester le journaliste crash en générant un crash en utilisant `process.crash()`.

**remarque :** si vous avez besoin d’envoyer des paramètres de `extra` supplémentaires/mis à jour après votre premier appel `start` vous pouvez appeler `addExtraParameter`.

**Note : les paramètres** sont passés en `extra`, `globalExtra` ou définis avec `addExtraParameter` ont des limites sur la longueur des touches et des valeurs. Les noms doivent être au plus 39 octets de long, et les valeurs ne doivent pas être plus de 127 octets. Les touches dont les noms sont plus longs que le maximum seront silencieusement ignorées. Les valeurs plus longues que la longueur maximale seront tronquées.

**Note:** méthode n’est disponible que dans le processus principal.

### `crashReporter.getLastCrashReport()`

Retours [`CrashReport`](structures/crash-report.md) - La date et l’identité du dernier rapport d’accident. Seuls les rapports d’accident qui ont été téléchargés seront retournés; même si un rapport de crash est présent sur disque, il ne sera pas retourné tant qu’il n’aura pas téléchargé. Dans le cas où il n'y a pas de rapports téléchargés, `null` est retourné.

**Note:** méthode n’est disponible que dans le processus principal.

### `crashReporter.getUploadedReports()`

Retourne [`CrashReport[]`](structures/crash-report.md) :

Renvoie tous les rapports de crash téléchargés. Chaque rapport contient la date et téléchargé ID.

**Note:** méthode n’est disponible que dans le processus principal.

### `crashReporter.getUploadToServer()`

Retours `Boolean` - Si les rapports doivent être soumis au serveur. Définissez à travers la `start` ou la `setUploadToServer`.

**Note:** méthode n’est disponible que dans le processus principal.

### `crashReporter.setUploadToServer(uploadToServer)`

* `uploadToServer` Boolean - Si les rapports doivent être soumis au serveur.

Cela serait normalement contrôlé par les préférences des utilisateurs. Cela n’a aucun effet si appelé avant `start` il soit appelé.

**Note:** méthode n’est disponible que dans le processus principal.

### `crashReporter.addExtraParameter (clé, valeur)`

* `key` String - Paramètre clé, ne doit pas être plus de 39 octets.
* `value` String - Valeur de paramètre, ne doit pas être plus de 127 octets.

Définit un paramètre supplémentaire à envoyer avec le rapport de plantage. Les valeurs spécifiées ici seront envoyées en plus de toutes les valeurs définies via l’option `extra` lorsque `start` été appelée.

Les paramètres ajoutés de cette façon (ou via le paramètre `extra` à `crashReporter.start`) sont spécifiques au processus d’appel. L’ajout paramètres supplémentaires dans le processus principal n’entraînera pas l’envoi de ces paramètres le long des avec des plantages de renderer ou d’autres processus enfant. De même, l’ajout de paramètres supplémentaires dans un processus de rendu n’entraînera pas l’envoi de ces paramètres avec des plantages qui se produisent dans d’autres processus de rendu ou dans le processus principal.

**note :** paramètres ont des limites sur la longueur des touches et des valeurs. Les clés ne doivent pas être plus de 39 octets, et les valeurs ne doivent pas être plus longues que 20320 octets. Les touches dont les noms sont plus longs que le maximum seront silencieusement ignorées. Les valeurs clés plus longues que la longueur maximale seront tronquées.

**Note:** Sur les valeurs linux qui sont plus de 127 octets seront divisés en touches multiples, chacun 127 octets de longueur.  Exemple : `addExtraParameter('foo', 'a'.repeat(130))` se traduira par deux touches en morceaux `foo__1` et `foo__2`, la première contiendra les 127 premiers octets et le second contiendra les 3 octets restants.  Lors votre backend de déclaration d’accident, vous devez assembler les touches dans ce format.

### `crashReporter.removeExtraParameter (clé)`

* `key` String - Paramètre clé, ne doit pas être plus de 39 octets.

Supprimez un paramètre supplémentaire de l’ensemble actuel de paramètres. Les futurs n’incluront pas ce paramètre.

### `crashReporter.getParameters()`

Retours `Record<String, String>` - Les paramètres « supplémentaires » actuels du journaliste crash.

## Payload du Crash Report

Le rapporteur de plantage enverra les données suivantes à `submitURL` comme un `POST` en `multipart/form-data` :

* `ver` String - La version d'Electron.
* `platform` String - Par exemple 'win32'.
* `process_type` String - Par exemple 'renderer'.
* `guid` String - Par exemple '5e1286fc-da97-479e-918b-6bfb0c3d1c72'.
* `_version` String - La version dans `package.json`.
* `_productName` String - Le nom du produit dans l'objet `options` de `crashReporter`.
* `prod` String - Nom du produit sous-jacent. Dans ce cas, Electron.
* `_companyName` String - Le nom de l'entreprise dans l'objet `options` de `crashReporter`.
* `upload_file_minidump` File - Le rapport d'incident dans le format `minidump`.
* Toutes les propriétés de niveau 1 de l'objet `extra` dans l'objet `options` de `crashReporter`.
