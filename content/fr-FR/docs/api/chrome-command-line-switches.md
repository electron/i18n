# Commandes Chromes Supportées

> Paramètres de ligne de commande pris en charge par Electron.

Vous pouvez utiliser [app.commandLine.appendSwitch](app.md#appcommandlineappendswitchswitch-value) pour l'ajouter au script principal de votre application avant que l'événement [ready](app.md#event-ready) du module [app](app.md) soit émis :

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('remote-debugging-port', '8315')
app.commandLine.appendSwitch('host-rules', 'MAP * 127.0.0.1')
app.on('ready', () => {
  // Votre code ici
})
```

## --ignore-connections-limit=`domains`

Ignore la limite de connexion pour la liste de `domains` séparés par `,`.

## --disable-http-cache

Désactive le cache disque pour les requêtes HTTP.

## --disable-http2

Désactive les protocoles HTTP/2 et SPDY/3.1.

## --lang

Set a custom locale.

## --inspect=`port` et --inspect-brk=`port`

Indicateurs relatifs au débogage, reportez-vous au guide [Déboguer le processus principal](../tutorial/debugging-main-process.md) pour plus de détails.

## --remote-debugging-port=`port`

Active le débogage distant via HTTP sur le `port` spécifié.

## --disk-cache-size=`size`

Force l'espace disque maximum à utiliser par le cache disque, en octets.

## --js-flags=`flags`

Spécifie les indicateurs à transmettre au moteur de NodeJS. Cela doit être indiqué lors du démarrage d'Electron, si vous souhaitez activer les `flags` dans le processus principal.

```sh
$ electron --js-flags="--harmony_proxies --harmony_collections" votre-app
```

Voir la [documentation de Node](https://nodejs.org/api/cli.html) ou exécutez `node --help` dans votre console pour avoir la liste des indicateurs disponibles. De plus, exécutez `node --v8-options` pour afficher la liste des indicateurs qui se réfèrent spécifiquement au moteur JavaScript V8 de Node.

## --proxy-server=`address:port`

Utilise le serveur proxy spécifié, qui remplace le paramètre système. Cet indicateur n'affecte que les requêtes avec le protocole HTTP, y compris les requêtes HTTPS et WebSocket. Il est également intéressant de noter que tous les serveurs proxy ne supportent pas les requêtes HTTPS et WebSocket.

## --proxy-bypass-list=`hosts`

Demande à Electron de contourner le serveur proxy pour la liste d'hôtes séparées par des points-virgules (;). Cet indicateur prend effet uniquement s'il est utilisé avec `--proxy-server`.

Par exemple :

```javascript
const {app} = require('electron')
app.commandLine.appendSwitch('proxy-bypass-list', '<local>;*.google.com;*foo.com;1.2.3.4:5678')
```

Utilise le serveur proxy pour tous les hôtes sauf les adresses locales (`localhost`, `127.0.0.1`, etc.), les sous-domaines `google.com`, les hôtes qui contiennent le suffixe `foo. com` et tout ce qui est à `1.2.3.4:5678`.

## --proxy-pac-url=`url`

Utilise le script PAC à l'`url` spécifiée.

## --no-proxy-server

N'utilise pas de serveur proxy et établit toujours des connexions directes. Remplace tous les autres drapeaux du serveur proxy qui sont passés.

## --host-rules=`rules`

Une liste séparée par des virgules de `rules` qui contrôle comment les noms d'hôtes sont mappés.

Par exemple :

* `MAP * 127.0.0.1` Force tous les noms d'hôtes à être mappés à 127.0.0.1
* `MAP *.google.com proxy` Force tous les sous-domaines google.com à être résolus en "proxy".
* `MAP test.com [::1]:77` Force "test. com" à être résolu en boucle IPv6. Force également le port de l'adresse socket à 77.
* `MAP * baz, EXCLUDE www.google.com` Remappe tout à "baz", sauf pour "www.google.com".

Ces mappages s'appliquent à l'hôte ciblé dans une requête réseau (le résolveur de connexion et d'hôte TCP dans une connexion directe, et l'hôte `CONNECT` dans une connexion avec proxy HTTP, et l'hôte du point terminal dans une connexion proxy `SOCKS`).

## --host-resolver-rules=`rules`

Comme `--host-rules` mais ces `rules` ne s'appliquent qu'au résolveur hôte.

## --auth-server-whitelist=`url`

Une liste de serveurs séparés par des virgules pour lesquels l'authentification intégrée est activée.

Par exemple :

```sh
--auth-server-whitelist='*example.com, *foobar.com, *baz'
```

puis toute `url` finissant par `example.com`, `foobar.com`, `baz` se verra appliquer une authentification intégrée. Sans préfixe `*` l'URL doit correspondre parfaitement.

## --auth-negotiate-delegate-whitelist=`url`

Une liste de serveurs séparés par des virgulespour lesquels la délégation d'identifiants utilisateur est demandée. Sans préfixe `*` l'URL doit correspondre complètement.

## --ignore-certificate-errors

Ignore les erreurs relatives au certificat.

## --ppapi-flash-path=`path`

Définit le chemin (`path`) du plugin pepper flash.

## --ppapi-flash-version=`version`

Définit la `version` du plugin pepper flash.

## --log-net-log=`path`

Permet que les événements réseau net log soient sauvés et les écrit dans `path`.

## --disable-renderer-backgrounding

Empêche Chromium d'abaisser la priorité des processus de rendu des pages invisibles.

Ce commutateur est global à tous les processus de rendu, si vous voulez seulement désactiver l'ajustement d'une fenêtre, vous pouvez passer par la modification de [playing silent audio](https://github.com/atom/atom/pull/9485/files).

## --enable-logging

Envoie les traces de Chromium à la console.

Ce commutateur ne peut pas être utilisé dans `app.commandLine.appendSwitch` car il est pris en compte avant que l'app utilisateur soit chargée, mais vous pouvez activer la variable d'environnement `ELECTRON_ENABLE_LOGGING` pour obtenir le même résultat.

## --v=`log_level`

Définit le niveau maximal par défaut de V-logging actif ; 0 est la valeur par défaut. Normalement on utilise des valeurs positives pour les niveaux V-logging.

Ce commutateur ne fonctionne que si `--enable-logging` est également fourni.

## --vmodule=`pattern`

Permet que les niveaux maximum par module de V-logging puisse dépasser la valeur donnée par `--v`. Par exemple `my_module=2,foo*=3` changera le niveau de logging pour tout le code source des fichiers `my_module.*` à 2 et `foo*.*` à 3.

Tout modèle ayant un slash ou un antislash ("/" ou "\") sera comparé sur tout le chemin et non seulement le module. Par exemple `*/foo/bar/*=2` changera le niveau de log pour tout le code source des fichiers du dossier `foo/bar`.

Ce commutateur ne fonctionne que si `--enable-logging` est également fourni.