# Los principales procesos de depuración

Las DevTools en una ventana del navegador del Electron sólo puede depurar JavaScript que se ejecuta en la ventana (es decir, las páginas web). Para depurar JavaScript que se ejecuta en el proceso principal que usted necesitará utilizar un depurador externo y lanzar electrones con el ` - debug` o `--debug-brk` interruptor.

## Línea de comandos

Utilice uno de los siguientes modificadores de línea de comandos para habilitar la depuración del proceso principal:

### `--debug =[port]`

Electrón se escucha mensajes de protocolo de depurador de V8 en el `port` especificado, un depurador externo necesitará conectarse a este puerto. El `port` por defecto es `5858`.

```shell
Electron--debug = 5858 su / app
```

### `--debug-brk =[port]`

Como `--debug` pero detiene temporalmente la ejecución de la primera línea de JavaScript.

## Depuradores externos

Usted necesitará utilizar un depurador que soporta el protocolo del debugger de V8, las siguientes guías le ayudarán a empezar:

- [Depurar el proceso principal en VSCode](debugging-main-process-vscode.md)
- [Depurar el proceso del principal inspector de nodo](debugging-main-process-node-inspector.md)