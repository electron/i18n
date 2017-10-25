# Variables d'environnement

> Contrôle la configuration et le comportement de l'application sans modifier le code.

Certains comportements d'Electron sont contrôlés par les variables d'environnement car ils sont initialisés avant les indicateurs de ligne de commande et le code de l'application.

Exemple sur un shell POSIX :

```bash
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

Don't use the global menu bar on Linux.

## Variables de développement

The following environment variables are intended primarily for development and debugging purposes.

### `ELECTRON_ENABLE_LOGGING`

Prints Chrome's internal logging to the console.

### `ELECTRON_LOG_ASAR_READS`

When Electron reads from an ASAR file, log the read offset and file path to the system `tmpdir`. The resulting file can be provided to the ASAR module to optimize file ordering.

### `ELECTRON_ENABLE_STACK_DUMPING`

Prints the stack trace to the console when Electron crashes.

This environment variable will not work if the `crashReporter` is started.

### `ELECTRON_DEFAULT_ERROR_MODE` *Windows*

Shows the Windows's crash dialog when Electron crashes.

This environment variable will not work if the `crashReporter` is started.