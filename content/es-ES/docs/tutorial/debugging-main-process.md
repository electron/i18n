# Los principales procesos de depuración

Las DevTools en una ventana del navegador del Electron sólo puede depurar JavaScript que se ejecuta en la ventana (es decir, las páginas web). To debug JavaScript that's executed in the main process you will need to use an external debugger and launch Electron with the `--inspect` or `--inspect-brk` switch.

## Línea de comandos

Utilice uno de los siguientes modificadores de línea de comandos para habilitar la depuración del proceso principal:

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Like `--inspector` but pauses execution on the first line of JavaScript.

## Depuradores externos

You will need to use a debugger that supports the V8 inspector protocol.

- Connect Chrome by visiting `chrome://inspect` and selecting to inspect the launched Electron app present there.
- [Depurar el proceso principal en VSCode](debugging-main-process-vscode.md)