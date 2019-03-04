# Depuración del proceso principal

DevTools en una ventana del navegador Electron solo puede depurar JavaScript ejecutado en esa ventana (es decir, las páginas web). Para depurar JavaScript que es ejecutado en el proceso principal, se necesita utilizar un depurador externo y ejecutar Electron con el switch `--inspect` o `--inspect-brk`.

## Conmutadores de línea de comando

Use uno de los siguientes interruptores de línea de comando para habilitar la depuración del proceso principal:

### `--inspect=[port]`

Electron escuchará los mensajes de protocolo del inspector V8 en el `port` especificado, un depurador externo deberá conectarse en este puerto. El `port` por defecto será el `5858`.

```shell
electron --inspect=5858 su/app
```

### `--inspect-brk=[port]`

Como `--inspect` pero pausa la ejecución en la primera línea de JavaScript.

## Depuradores externos

Tendrá que usar un depurador que admita el protocolo de inspector V8.

- Conecta a Chrome visitando `chrome://inspect` y selecciona inspeccionar en la aplicación de Electron ejecutada allí presente.
- [Depurando el Proceso Principal en VSCode](debugging-main-process-vscode.md)