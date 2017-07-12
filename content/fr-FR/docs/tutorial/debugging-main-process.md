# Débogguer le Processus Principal

Les DevTools dans une fenêtre de navigateur d’Electron peut seulement débogguer le JavaScript qui est exécuté dans cette fenêtre (c'est-à-dire les pages web). To debug JavaScript that's executed in the main process you will need to use an external debugger and launch Electron with the `--debug` or `--debug-brk` switch.

## Commutateurs de ligne de commande

Use one of the following command line switches to enable debugging of the main process:

### `--debug=[port]`

Electron doit écouter les messages de protocole du déboggueur V8 sur le `port` spécifié, un déboggueur externe devra se connecter sur ce port. Le `port` par défaut est `5858`.

```shell
electron --debug=5858 votre/app
```

### `--debug-brk=[port]`

Comme `--debug` mais interrompt l’exécution sur la première ligne de JavaScript.

## Déboggueurs externes

You will need to use a debugger that supports the V8 debugger protocol, the following guides should help you to get started:

- [Débogguer le processus principal dans VSCode](debugging-main-process-vscode.md)
- [Débogguer le processus principal dans node-inspector](debugging-main-process-node-inspector.md)