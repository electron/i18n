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

Les `NODE_OPTIONS` sont strictement interdites dans les applications compilées :

```sh
--max-http-header-size
--http-parser
```

### `GOOGLE_API_KEY`

La prise en charge de la géolocalisation dans Electron nécessite l’utilisation du service Web de géolocalisation de Google Cloud Platform. Pour activer cette fonctionnalité, acquérez une</a> de clé

Google API et placez le code suivant dans votre fichier de processus principal, avant d’ouvrir toutes les fenêtres du navigateur qui feront des demandes de géolocalisation :</p> 



```javascript
process.env.GOOGLE_API_KEY = 'VOTRE_CLE_ICI'
```


Par défaut, une clé API Google nouvellement générée peut ne pas être autorisée à faire des demandes de géolocalisation. Pour activer le service Web de géolocalisation de votre projet, activez-le à travers la bibliothèque ['API](https://console.cloud.google.com/apis/library).

N.b. Vous devrez ajouter une [de facturation](https://cloud.google.com/billing/docs/how-to/payment-methods#add_a_payment_method) au projet associé à la clé API pour que le service Web de géolocalisation fonctionne.



### `ELECTRON_NO_ASAR`

Désactive le support ASAR. Cette variable n’est prise en charge que dans les processus des enfants fourchus processus d’enfant et engendrés qui `ELECTRON_RUN_AS_NODE`.



### `ELECTRON_RUN_AS_NODE`

Démarre le processus comme un processus normal de Node.js.

Dans ce mode, vous serez en mesure de passer [options cli](https://nodejs.org/api/cli.html) à nœud.js comme vous le feriez lors de l’exécution du nœud normal.js exécutable, à l’exception des drapeaux suivants:

* « --openssl-config »
* « --utilisation-bundled-ca »
* « --use-openssl-ca »,
* « -force-fips »
* « --enable-fips »

Ces drapeaux sont désactivés en raison du fait qu’Electron utilise BoringSSL au lieu d.js’OpenSSL lors de la construction du module `crypto` de nœud, et ne fonctionnera donc pas comme prévu.



### `ELECTRON_NO_ATTACH_CONSOLE` _Windows_

Ne s'attache pas la session courante de la console.



### `ELECTRON_FORCE_WINDOW_MENU_BAR` _Linux_

N'utilise pas la bar de menu global sur Linux.



### `ELECTRON_TRASH` _Linux_

Réglez la mise en œuvre des déchets sur Linux. Par défaut est `gio`.

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

Lorsque Electron lit à partir d’un fichier ASAR, enregistrez le décalage lu et le chemin de fichier pour le système `tmpdir`. Le fichier qui en résulte peut être fourni au module ASAR optimiser la commande de fichiers.



### `ELECTRON_ENABLE_STACK_DUMPING`

Affiche la stack trace sur la console lorsqu'Electron plante.

Cette variable d'environnement ne fonctionnera pas si vous avez démarré `crashReporter`.



### `ELECTRON_DEFAULT_ERROR_MODE` _Windows_

Affiche la boite de dialogue de plantage lorsqu'Electron plante.

Cette variable d'environnement ne fonctionnera pas si vous avez démarré `crashReporter`.



### `ELECTRON_OVERRIDE_DIST_PATH`

Quand lancée depuis le paquet `electron` , cette variable dit à la commande d'`electron` d'utiliser la version spécifiée au lieu de celle intallée avec `npm install`. Utilisation:



```sh
exportation ELECTRON_OVERRIDE_DIST_PATH=/Utilisateurs/nom d’utilisateur/projets/électron/out/Testing
```




## Défini par Electron

Electron définit certaines variables dans votre environnement au moment de l’exécution.



### `ORIGINAL_XDG_CURRENT_DESKTOP`

Cette variable est définie en fonction de la valeur des `XDG_CURRENT_DESKTOP` votre application a été à l’origine.  Electron modifie parfois la valeur de `XDG_CURRENT_DESKTOP` pour affecter d’autres logiques dans chrome donc si vous voulez accéder à la valeur</em> d’origine _ vous devriez rechercher cette variable de l’environnement à la place.</p>
