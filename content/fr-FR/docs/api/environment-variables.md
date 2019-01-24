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

Electron inclut une clé d'API codée en dur pour faire des requêtes au webservice de geocoding de Google. Car cette clé API est incluse dans toutes les versions d'Electron, elle dépasse souvent son quota d'utilisation. Pour contourner ce problème, vous pouvez fournir votre propre clé API Google dans l'environnement. Placez le code suivant dans votre fichier main process avant d'ouvrir une fenêtre navigateur qui va faire des requêtes geocoding :

```javascript
process.env.GOOGLE_API_KEY = 'VOTRE_CLE_ICI'
```

Pour savoir comment obtenir une clé API Google, vous pouvez aller [sur cette page](https://www.chromium.org/developers/how-tos/api-keys).

Par défaut, une nouvelle clé API Google générée ne peut pas faire de requêtes geocoding. Pour activer les requêtes geocoding, veuillez voir [cette page](https://console.developers.google.com/apis/api/geolocation/overview).

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