# Depurar el proceso del principal inspector de nodo

[`node-inspector`](https://github.com/node-inspector/node-inspector) proporciona una GUI DevTools familiar que puede utilizarse en cromo para depurar el proceso principal del electrón, sin embargo, porque `node-inspector` se basa en algunos módulos nativos de nodo que debe ser reconstruidos para la versión de electrón que desea depurar. Puede reconstruir las dependencias `node-inspector` a ti mismo, o que[`electron-inspector`](https://github.com/enlight/electron-inspector) hacer por usted, ambos enfoques están cubiertos en este documento.

**Note**: en el momento de escribir la última versión de `node-inspector` (0.12.8) no puede reconstruirse destino electrón 1.3.0 o posterior sin parchear una de sus dependencias. Si utilizas `electron inspector` se encargará de esto para usted.

## Uso `electron-inspector` para la depuración

### 1. instalar el tools</a> de node-gyp necesaria</h3> 

### 2. Instale el [`electron-rebuild`](https://github.com/electron/electron-rebuild), si no has hecho ya.

```shell
MNP instalar electrónica-reconstrucción--save-dev
```

### 3. instalar [`electron-inspector`](https://github.com/enlight/electron-inspector)

```shell
MNP instalar inspector del electrón--save-dev
```

### 4. arranque electrónico

Lanzamiento de electrón con el ` - debug` conmutador:

```shell
electrónica--debug = 5858 su / app
```

o para pausar la ejecución de la primera línea de JavaScript:

```shell
electrónica--debug-brk = 5858 su / app
```

### 5. arranque electrónico-inspector

En macOS / Linux:

```shell
node_modules/.bin/Electron-inspector
```

En Windows:

```shell
node_modules\\.bin\\electron-inspector
```

`electron-inspector` será necesario reconstruir las dependencias `node-inspector` en la primera carrera, y cualquier momento cambiar su versión electrónica. El proceso de reconstrucción puede requerir una conexión a internet para descargar librerías y cabeceras del nodo y puede tardar unos minutos.

### 6. Cargue el interfaz de usuario de depurador

Abra http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=5858 en el navegador Chrome. Que tenga que hacer clic en pausa si a partir de `--debug-brk` a la interfaz de usuario para actualizar la fuerza.

## Uso `node-inspector` para la depuración

### 1. instalar el tools</a> de node-gyp necesaria</h3> 

### 2. Instale el [`node-inspector`](https://github.com/node-inspector/node-inspector)

```bash
$ MNP instalar nodo-inspector
```

### 3. instalar [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp)

```bash
$ MNP instalar nodo-pre-gyp
```

### 4. compilar los módulos de `v8` de `node-inspector` de electrónica

**Note:** actualizar el argumento objetivo a ser el número de versión electrónica

```bash
$ node_modules/.bin/node-pre-gyp--objetivo = 1.2.5--tiempo de ejecución = electrón--respaldo para construir--directorio node_modules/v8-debug /--dist-url = https://atom.io/download/atom-shell reinstalar $ node_modules/.bin/node-pre-gyp--objetivo = 1.2.5--tiempo de ejecución = electrón--respaldo para construir--directorio node_modules/v8-profiler / url--dist = https://atom.io/download/atom-shell vuelva a instalar
```

Véase también [How para instalar el modules](using-native-node-modules.md#how-to-install-native-modules) nativo.

### 5. activar el modo debug para electrónica

Usted puede cualquier salida como el electrón con una bandera de la depuración:

```bash
electrónica $--debug = 5858 su / app
```

o bien, para hacer una pausa en la secuencia de comandos en la primera línea:

```bash
electrónica $--debug-brk = 5858 su / app
```

### 6. iniciar el servidor de [`node-inspector`](https://github.com/node-inspector/node-inspector) con electrones

```bash
$ ELECTRON_RUN_AS_NODE = true path/to/electron.exe node_modules/node-inspector/bin/inspector.js
```

### 7. carga el interfaz de usuario de depurador

Abra http://127.0.0.1:8080/debug?ws=127.0.0.1:8080&port=5858 en el navegador Chrome. Quizás tenga que haga clic en Pausar si a partir de `--debug-brk` ver la línea de entrada.