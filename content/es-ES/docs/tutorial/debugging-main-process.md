# Depuración del proceso principal

DevTools en una ventana del navegador Electron solo puede depurar JavaScript ejecutado en esa ventana (es decir, las páginas web). Para depurar JavaScript que es ejecutado en el proceso principal, se necesita utilizar un depurador externo y ejecutar Electron con el switch `--inspect` o `--inspect-brk`.

## Conmutadores de línea de comando

Use uno de los siguientes interruptores de línea de comando para habilitar la depuración del proceso principal:

### `--inspect=[port]`

Electron escuchará mensajes de protocolo del inspector V8 en el `puerto`especificado, un depurador externo necesitará conectarse en este puerto. El puerto predeterminado `` es `5858`.

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

Como `--inspect` pero pausa la ejecución en la primera línea de JavaScript.

## Depuradores externos

Tendrá que usar un depurador que admita el protocolo de inspector V8.

- Conecta a Chrome visitando `chrome://inspect` y selecciona inspeccionar en la aplicación de Electron ejecutada allí presente.
- [Depurando en VSCode](debugging-vscode.md)
