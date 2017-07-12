# Débogguer le Processus Principal

Les DevTools dans une fenêtre de navigateur d’Electron peut seulement débogguer le JavaScript qui est exécuté dans cette fenêtre (c'est-à-dire les pages web). Pour débogguer le code JavaScript qui s’exécute dans le processus principal, vous devrez utiliser un déboggueur externe et lancer Electron avec les commutateurs `--debug` ou `--debug-brk`.

## Commutateurs de ligne de commande

Utilisez un des commutateurs de ligne de commande suivants pour activer le déboggage du processus principal :

### `--debug=[port]`

Electron doit écouter les messages de protocole du déboggueur V8 sur le `port` spécifié, un déboggueur externe devra se connecter sur ce port. Le `port` par défaut est `5858`.

```shell
electron --debug=5858 votre/app
```

### `--debug-brk=[port]`

Comme `--debug` mais interrompt l’exécution sur la première ligne de JavaScript.

## Déboggueurs externes

Vous devrez utiliser un déboggueur qui prend en charge le protocole de déboggueur V8, les guides suivants devraient vous aider à démarrer :

- [Débogguer le processus principal dans VSCode](debugging-main-process-vscode.md)
- [Débogguer le processus principal dans node-inspector](debugging-main-process-node-inspector.md)