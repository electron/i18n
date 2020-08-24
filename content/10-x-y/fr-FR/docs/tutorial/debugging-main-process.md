# Débogguer le Main Process

Les DevTools dans une fenêtre de navigateur d’Electron peut seulement débogguer le JavaScript qui est exécuté dans cette fenêtre (c'est-à-dire les pages web). Pour débogguer le code JavaScript qui s’exécute dans le main process, vous devrez utiliser un déboggueur externe et lancer Electron avec les variables d'environnement `--inspect` ou `--inspect-brk`.

## Variables d'environnement

Utilisez une des variables d'environnement de ligne de commande suivantes pour activer le déboggage du main process :

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 votre/app
```

### `--inspect-brk=[port]`

Comme `--inspect` mais interrompt l'exécution sur la première ligne de JavaScript.

## Déboggueurs externes

Vous devrez utiliser un débogueur supportant le protocole de l'inspecteur V8.

- Connectez Chrome en visitant `chrome://inspect` et sélectionnez inspecter l'application Electron lancé présente ici.
- [Débogguer le main process dans VSCode](debugging-main-process-vscode.md)
