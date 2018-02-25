# Débogguer le Main Process

Les DevTools dans une fenêtre de navigateur d’Electron peut seulement débogguer le JavaScript qui est exécuté dans cette fenêtre (c'est-à-dire les pages web). Pour débogguer le code JavaScript qui s’exécute dans le main process, vous devrez utiliser un déboggueur externe et lancer Electron avec les variables d'environnement `--inspect` ou `--inspect-brk`.

## Variables d'environnement

Utilisez une des variables d'environnement de ligne de commande suivantes pour activer le déboggage du main process :

### `--inspect=[port]`

Electron doit écouter les messages de protocole de l'inspecteur V8 sur le `port` spécifié, un débogueur externe devra se connecter sur ce port. Le `port` par défaut est `5858`.

```shell
electron --inspect=5858 votre/app
```

### `--inspect-brk=[port]`

Comme `--inspect` mais interrompt l'exécution sur la première ligne de JavaScript.

## Déboggueurs externes

Vous devrez utiliser un débogueur supportant le protocole de l'inspecteur V8.

- Connectez Chrome en visitant `chrome://inspect` et sélectionnez inspecter l'application Electron lancé présente ici.
- [Déboguer le processus principal dans VSCode](debugging-main-process-vscode.md)