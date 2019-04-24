# Variables d'environnement

> Contrôle la configuration et le comportement de l'application sans modifier le code.

Certains comportements d'Electron sont contrôlés par les variables d'environnement car ils sont initialisés avant les indicateurs de ligne de commande et le code de l'application.

Exemple sur un shell POSIX :

```sh
$ export ELECTRON_ENABLE_LOGGING=true
$ electron
```

Exemple sur la console Windows :

```powershell
> set ELECTRON_ENABLE_LOGGING=true
> electron
```

## Variables de production

Les variables d'environnement suivantes sont destinés principalement à l'exécution des applications Electron empaquetées.

### `NODE_OPTIONS`

Electron inclut le support pour un sous-ensemble des [`NODE_OPTIONS`](https://nodejs.org/api/cli.html#cli_node_options_options) de Node. La majorité sont supportés à l'exception de celles qui rentrent en conflit avec l'utilisation de BoringSSL dans Chronium.

Exemple :

```sh
export NODE_OPTIONS="--no-warnings --max-old-space-size=2048"
```

Les options non supportées sont :

```sh
--use-bundled-ca
--force-fips
--enable-fips
--openssl-config
--use-openssl-ca
```

Les `NODE_OPTIONS` sont strictement interdites dans les applications compilées.

### `GOOGLE_API_KEY`

You can provide an API key for making requests to Google's geocoding webservice. To do this, place the following code in your main process file, before opening any browser windows that will make geocoding requests:

```javascript
process.env.GOOGLE_API_KEY = 'VOTRE_CLE_ICI'
```

For instructions on how to acquire a Google API key, visit [this page](https://developers.google.com/maps/documentation/javascript/get-api-key). Par défaut, une nouvelle clé API Google générée ne peut pas faire de requêtes geocoding. Pour activer les requêtes geocoding, veuillez voir [cette page](https://developers.google.com/maps/documentation/geocoding/get-api-key).

### `ELECTRON_NO_ASAR`

Désactive le support ASAR. Cette variable est seulement supportée par les processus enfant forké et les processus enfant qui ont `ELECTRON_RUN_AS_NODE`.

### `ELECTRON_RUN_AS_NODE`

Démarre le processus comme un processus normal de Node.js.

### `ELECTRON_NO_ATTACH_CONSOLE` *Windows*

Ne s'attache pas la session courante de la console.

### `ELECTRON_FORCE_WINDOW_MENU_BAR` *Linux*

N'utilise pas la bar de menu global sur Linux.

### `ELECTRON_TRASH` *Linux*

Met en place l'implémentation de la corbeille dans Linux. Vaut par défaut `gio`.

Options :

* `gvfs-trash`
* `trash-cli`
* `kioclient5`
* `kioclient`

## Variables de développement

Les variables d'environnement suivantes sont destinés principalement pour le développement et le débogage.

### `ELECTRON_ENABLE_LOGGING`

Affiche les logs interne de Chrome sur la console.

### `ELECTRON_LOG_ASAR_READS`

Lorsque Electron lit un fichier ASAR, enregistrez le décalage de lecture et le chemin d'accès du fichier dans le système `tmpdir`. Le fichier résultant peut être fourni au module ASAR pour optimiser l'ordonnancement des fichiers.

### `ELECTRON_ENABLE_STACK_DUMPING`

Affiche la stack trace sur la console lorsqu'Electron plante.

Cette variable d'environnement ne fonctionnera pas si vous avez démarré `crashReporter`.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Affiche la boite de dialogue de plantage lorsqu'Electron plante.

Cette variable d'environnement ne fonctionnera pas si vous avez démarré `crashReporter`.

### `ELECTRON_OVERRIDE_DIST_PATH`

Quand lancée depuis le paquet `electron` , cette variable dit à la commande d'`electron` d'utiliser la version spécifiée au lieu de celle intallée avec `npm install`. Utilisation:

```sh
export ELECTRON_OVERRIDE_DIST_PATH=/Users/username/projects/electron/out/Debug
```