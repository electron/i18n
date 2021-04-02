# Commandes Supportées

> Paramètres de ligne de commande pris en charge par Electron.

Vous pouvez utiliser [app.commandLine.appendSwitch][append-switch] pour l'ajouter au script principal de votre application avant que l'événement [ready][ready] du module [app][app] soit émis :

```javascript
const { app } = require ('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch ('host-rules', 'MAP * 127.0.0.1')

app.whenReady().then()=> {
  // Votre code ici
})
```

## Drapeaux CLI électroniques

### --auth-server-whitelist=`url`

Une liste de serveurs séparés par des virgules pour lesquels l'authentification intégrée est activée.

Par exemple :

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

puis toute `url` finissant par `example.com`, `foobar.com`, `baz` se verra appliquer une authentification intégrée. Sans le préfixe `*` l'URL doit correspondre exactement.

### --auth-negotiate-delegate-whitelist=`url`

Une liste de serveurs séparés par virgule pour lesquels une délégation d’informations d’identification utilisateur est requise. Sans le préfixe `*` l'URL doit correspondre exactement.

### --désactiver-ntlm-v2

Désactive NTLM v2 pour les plates-formes posix, aucun effet ailleurs.

### --disable-http-cache

Désactive le cache disque pour les requêtes HTTP.

### --disable-http2

Désactive les protocoles HTTP/2 et SPDY/3.1.

### --disable-renderer-backgrounding

Empêche Chromium d'abaisser la priorité des processus de rendu des pages invisibles.

Ce commutateur est global à tous les processus de rendu, si vous voulez seulement désactiver l'ajustement d'une fenêtre, vous pouvez passer par la modification de [playing silent audio][play-silent-audio].

### --disk-cache-size=`size`

Force l'espace disque maximum à utiliser par le cache disque, en octets.

### --enable-api-filtering-logging

Permet à l’appelant de cumuler les API suivantes (événements de filtrage) :

- `desktopCapturer.getSources()` / `desktop-capturer-get-sources`
- `remote.require()` / `remote-require`
- `remote.getGlobal()` / `remote-get-builtin`
- `remote.getBuiltin()` / `remote-get-global`
- `remote.getCurrentWindow()` / `remote-get-current-window`
- `remote.getCurrentWebContents()` / `remote-get-current-web-contents`

### --enable-logging

Envoie les traces de Chromium à la console.

Ce commutateur ne peut pas être utilisé dans `app.commandLine.appendSwitch` car il est pris en compte avant que l'app utilisateur soit chargée, mais vous pouvez activer la variable d'environnement `ELECTRON_ENABLE_LOGGING` pour obtenir le même résultat.

### --host-rules=`rules`

Une liste séparée par des virgules de `rules` qui contrôle comment les noms d'hôtes sont mappés.

Par exemple :

* `MAP * 127.0.0.1` Force tous les noms d'hôtes à être mappés à 127.0.0.1
* `MAP *.google.com proxy` Force tous les sous-domaines google.com à être résolus en "proxy".
* `MAP test.com [::1]:77` Forces « test.com » à résoudre à IPv6 loopback. Forcera également le port de l’adresse de prise résultante à 77.
* `MAP * baz, EXCLUDE www.google.com` Remappe tout à "baz", sauf pour "www.google.com".

Ces mappages s'appliquent à l'hôte ciblé dans une requête réseau (le résolveur de connexion et d'hôte TCP dans une connexion directe, et l'hôte `CONNECT` dans une connexion avec proxy HTTP, et l'hôte du point terminal dans une connexion proxy `SOCKS`).

### --host-resolver-rules=`rules`

Comme `--host-rules` mais ces `rules` ne s'appliquent qu'au résolveur hôte.

### --ignore-certificate-errors

Ignore les erreurs relatives au certificat.

### --ignore-connections-limit=`domains`

Ignore la limite de connexion pour la liste de `domains` séparés par `,`.

### --js-flags=`flags`

Spécifie les drapeaux transmis au moteur .js nœud. Il doit être passé lors du démarrage 'électron si vous souhaitez activer la `flags` dans le processus principal.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" votre-app
```

Consultez la documentation [Node.js][node-cli] ou exécutez `node --help` dans votre terminal pour une liste des drapeaux disponibles. De plus, exécutez `node --v8-options` pour voir une liste de drapeaux qui se réfèrent spécifiquement au moteur JavaScript V8 de Node.js.

### --lang

Permet de mettre une langue personnalisée.

### --log-net-log=`path`

Permet que les événements réseau net log soient sauvés et les écrit dans `path`.

### --no-proxy-server

N’utilisez pas de serveur proxy et faites toujours des connexions directes. Remplace toute autre serveur proxy qui sont passés.

### --no-sandbox

Désactive le bac à sable Chrome, qui est maintenant activé par défaut. Ne doit être utilisé que pour les tests.

### --proxy-bypass-list=`hosts`

Demande à Electron de contourner le serveur proxy pour la liste des hôtes semi-colon-séparés données. Ce drapeau n’a d’effet que s’il est utilisé en tandem avec `--proxy-server`.

Par exemple :

```javascript
const { app } = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Utilise le serveur proxy pour tous les hôtes sauf les adresses locales (`localhost`, `127.0.0.1`, etc.), les sous-domaines `google.com`, les hôtes qui contiennent le suffixe `foo. com` et tout ce qui est à `1.2.3.4:5678`.

### --proxy-pac-url=`url`

Utilise le script PAC à l'`url` spécifiée.

### --proxy-server=`address:port`

Utilise le serveur proxy spécifié, qui remplace le paramètre système. Cet indicateur n'affecte que les requêtes avec le protocole HTTP, y compris les requêtes HTTPS et WebSocket. Il est également intéressant de noter que tous les serveurs proxy ne supportent pas les requêtes HTTPS et WebSocket. L'url du proxy ne supporte pas l'authentification par nom d'utilisateur et mot de passe [selon un bug Chronium](https://bugs.chromium.org/p/chromium/issues/detail?id=615947).

### --remote-debugging-port=`port`

Active le débogage distant via HTTP sur le `port` spécifié.

### --v=`log_level`

Donne le niveau maximum de v-logging actif par défaut; 0 est la valeur par défaut. Normalement, valeurs positives sont utilisées pour les niveaux d’enregistrement en V.

Ce commutateur ne fonctionne que si `--enable-logging` est également fourni.

### --vmodule=`pattern`

Permet que les niveaux maximum par module de V-logging puisse dépasser la valeur donnée par `--v`. Exemple : `my_module=2,foo*=3` modifierait le niveau d’enregistrement de tous les codes dans fichiers source `my_module.*` et `foo*.*`.

Tout pattern contenant un slash ou un anti-slash sera testé pour tout le chemin et pas seulement le module. Exemple : `*/foo/bar/*=2` modifierait le niveau d journalisation pour tous les fichiers source dans les fichiers source sous `foo/bar` répertoire.

Ce commutateur ne fonctionne que si `--enable-logging` est également fourni.

### --force_high_performance_gpu

Force à l’aide d’un GPU discret lorsqu’il existe plusieurs GPU disponibles.

### --force_low_power_gpu

Force utilisant le GPU intégré lorsqu’il y a plusieurs GPU disponibles.

## Drapeaux de .js nœud

Electron prend en charge certains des [drapeaux CLI][node-cli] pris en charge par Node.js.

**Remarque :** Le passage d'options de ligne de commande non supportées n'aura aucun effet lorsque Electron ne s'exécute pas en mode `ELECTRON_RUN_AS_NODE`.

### --inspect-brk[=[hôte:]port]

Activer l’inspecteur sur host:port et casser au début du script utilisateur. Configuration par défaut pour host:port 127.0.0.1:9229.

Aliased à `--debug-brk=[host:]port`.

### --inspect-port=[hôte:]port

Réglez `host:port` à utiliser lorsque l’inspecteur est activé. Utile lors de l’activation de l’inspecteur en envoyant le signal SIGUSR1. L’hôte par défaut `127.0.0.1`.

Aliased à `--debug-port=[host:]port`.

### --inspecter[=[hôte:]port]

Activez l’inspecteur `host:port`. Par défaut est `127.0.0.1:9229`.

L’intégration de l’inspecteur V8 permet à des outils tels que Chrome DevTools et IDEs de déboger et de profiler les instances Electron. Les outils s’attachent aux instances Electron via un port TCP et communiquent à l’aide [protocole Chrome DevTools](https://chromedevtools.github.io/devtools-protocol/).

Consultez le guide [Debugging the Main Process][debugging-main-process] pour plus de détails.

Aliased à `--debug[=[host:]port`.

### --inspect-publish-uid=stderr,http

Spécifiez les moyens de l’exposition à l’url web de l’inspecteur.

Par défaut, l'url du websocket de l'inspecteur est disponible dans stderr et dans /json/list endpoint sur http://host:port/json/list.

[app]: app.md
[append-switch]: command-line.md#commandlineappendswitchswitch-value
[ready]: app.md#event-ready
[play-silent-audio]: https://github.com/atom/atom/pull/9485/files
[debugging-main-process]: ../tutorial/debugging-main-process.md
[node-cli]: https://nodejs.org/api/cli.html
[node-cli]: https://nodejs.org/api/cli.html
