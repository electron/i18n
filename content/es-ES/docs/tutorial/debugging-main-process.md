# Depuración del proceso principal

DevTools en una ventana del navegador Electron solo puede depurar JavaScript ejecutado en esa ventana (es decir, las páginas web). To debug JavaScript that's executed in the main process you will need to use an external debugger and launch Electron with the `--inspect` or `--inspect-brk` switch.

## Conmutadores de línea de comando

Use uno de los siguientes interruptores de línea de comando para habilitar la depuración del proceso principal:

### `--inspect=[port]`

Electron escuchará los mensajes de protocolo del inspector V8 en el `port` especificado, un depurador externo deberá conectarse en este puerto. El `port` por defecto será el `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Like `--inspect` but pauses execution on the first line of JavaScript.

## Depuradores externos

Tendrá que usar un depurador que admita el protocolo de inspector V8.

- Connect Chrome by visiting `chrome://inspect` and selecting to inspect the launched Electron app present there.
- [Depurando el Proceso Principal en VSCode](debugging-main-process-vscode.md)