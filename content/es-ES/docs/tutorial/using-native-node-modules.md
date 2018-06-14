# Uso de Módulos Nativos de Node

Los módulos nativos de Node están respaldados por Electron, pero debido a que es muy probable que Electron use una versión V8 diferente del binario Node instalado en su sistema, deberá especificar manualmente la ubicación de los encabezados de Electron cuando construya módulos nativos.

## ¿Cómo instalar módulos nativos?

Tres formas de instalar módulos nativos:

### Usando `npm`

Al establecer algunas variables del entorno, puede usar `npm` para instalar módulos directamente.

Un ejemplo de instalación de todas las dependencias para Electron:

```sh
# Versión de Electron.
exportar npm_config_target=1.2.3
# La arquitectura de Electron, puede ser ia32 o x64.
exportar npm_config_arch=x64
exportar npm_config_target_arch=x64
# Descargar encabezados para Electron.
exportar npm_config_disturl=https://atom.io/download/electron
# Informe a node-pre-gyp que estamos construyendo para Electron.
exportar npm_config_runtime=electron
# Informe a node-pre-gyp que construya el módulo desde el código fuente.
exportar npm_config_build_from_source=true
# Instale todas las dependencias y almacene el caché en ~/.electron-gyp.
HOME=~/.electron-gyp npm instalar
```

### Instalación de módulos y reconstrucción para Electron

También puede optar por instalar módulos como otros proyectos de nodo, y luego reconstruir los módulos para Electron con el paquete [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild). Este módulo puede obtener la versión de Electron y manejar los pasos manuales de descargar encabezados y construir módulos nativos para su aplicación.

Un ejemplo de cómo instalar `electron-rebuild` y luego reconstruir módulos con él:

```sh
instalar npm --save-dev electron-rebuild

# Cada vez que ejecute "npm install", ejecute esto:
./node_modules/.bin/electron-rebuild

# En Windows si tiene problemas, intente:
.\node_modules\.bin\electron-rebuild.cmd
```

### Construcción manual para Electron

Si usted es un desarrollador que está desarrollando un módulo nativo y desea probarlo con Electron, es posible que desee reconstruir el módulo para Electron manualmente. Puedes usar `node-gyp` directamente para construir para Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

El `HOME=~/.electron-gyp` cambia dónde encontrar los encabezados de desarrollo. El `--target=1.2.3` es la versión de Electron. El `--dist-url=...` especifica dónde descargar los encabezados. El `--arch=x64` dice que el módulo está diseñado para el sistema de 64 bits.

## Problemas

Si instaló un módulo nativo y descubrió que no estaba funcionando, debe verificar las siguientes cosas:

* La arquitectura del módulo debe coincidir con la arquitectura de Electron (ia32 o x64).
* Después de actualizar Electron, generalmente necesita reconstruir los módulos.
* En caso de duda, ejecute `electron-rebuild` primero.

## Módulos que dependen de `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) proporciona una forma de publicar fácilmente módulos de Node nativos con binarios precompilados para múltiples versiones de Node y Electron.

Si los módulos proporcionan binarios para el uso en Electron, asegúrese de omitir `--build-from-source` y la variable de entorno `npm_config_build_from_source` para aprovechar al máximo los binarios precompilados.

## Módulos que dependen de `node-pre-gyp`

La herramienta [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) proporciona una forma de implementar módulos de nodo nativos con binarios precompilados, y muchos módulos populares lo están usando.

Usualmente esos módulos funcionan bien bajo Electron, pero a veces cuando Electron usa una versión más nueva de V8 que Node, y hay cambios ABI, pueden ocurrir cosas malas. Por lo tanto, en general se recomienda crear siempre módulos nativos a partir del código fuente.

Si está siguiendo la forma `npm` de instalar los módulos, esto se hace de forma predeterminada; si no, tiene que pasar `--build-from-source` a `npm`, o establecer la variable de entorno `npm_config_build_from_source`.