# Débogguer le Processus Principal

Les DevTools dans une fenêtre de navigateur d’Electron peut seulement débogguer le JavaScript qui est exécuté dans cette fenêtre (c'est-à-dire les pages web). To debug JavaScript that's executed in the main process you will need to use an external debugger and launch Electron with the `--inspect` or `--inspect-brk` switch.

## Commutateurs de ligne de commande

Utilisez un des commutateurs de ligne de commande suivants pour activer le déboggage du processus principal :

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Like `--inspector` but pauses execution on the first line of JavaScript.

## Déboggueurs externes

You will need to use a debugger that supports the V8 inspector protocol.

- Connect Chrome by visiting `chrome://inspect` and selecting to inspect the launched Electron app present there.
- [Déboguer le processus principal dans VSCode](debugging-main-process-vscode.md)