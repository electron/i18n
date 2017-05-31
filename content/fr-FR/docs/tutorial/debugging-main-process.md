# Le principal processus de débogage

Le DevTools dans une fenêtre de navigateur d’électron peut seulement déboguer JavaScript qui est exécuté dans cette fenêtre (c'est-à-dire les pages web). Pour déboguer le code JavaScript qui s’exécute dans le processus principal, vous devrez utiliser un débogueur externe et de lancer des électrons avec la `--debug` ou `--debug-brk` passer.

## Commutateurs de ligne de commande

Utilisez une des commutateurs de ligne de commande suivante pour activer le débogage du processus principaux :

### `--debug =[port]`

Électron doit écouter les messages de protocole du débogueur V8 sur le `port` spécifié, un débogueur externe devra se connecter sur ce port. Le `port` par défaut est `5858`.

```shell
électrons--debug = 5858 votre / app
```

### `--debug-brk =[port]`

Comme `--debug`, mais s’arrête l’exécution sur la première ligne de JavaScript.

## Débogueurs externes

Vous devrez utiliser un débogueur qui prend en charge le protocole de débogueur V8, les guides suivants devraient vous aider à démarrer :

- [Déboguer le processus principal dans VSCode](debugging-main-process-vscode.md)
- [Déboguer le processus principal dans le nœud-inspecteur](debugging-main-process-node-inspector.md)