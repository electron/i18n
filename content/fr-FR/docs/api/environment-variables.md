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