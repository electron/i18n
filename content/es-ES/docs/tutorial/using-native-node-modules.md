# Uso de Módulos Nativos de Node

Los módulos nativos de Node.js están soportados por Electron, pero dado que Electron tiene una diferente [interfaz binaria de aplicación (ABI)][abi] de un binario Node.js dado (debido a diferencias tales como usar BoringSSL de Chromium en lugar de OpenSSL), los módulos nativos que use necesitarán ser recompilados para Electron. De lo contrario, obtendrá la siguiente clase de error cuando intente ejecutar su aplicación:

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

## ¿Cómo instalar módulos nativos?

Hay varias formas diferentes de instalar los módulos nativos:

### Instalación de módulos y reconstrucción para Electron

Puedes instalar los módulos como otro proyecto Node, luego reconstruir el modulo para Electron con el paquete [`electron-rebuild`][electron-rebuild]. Este módulo puede determinar automáticamente la versión de Electron y manejar los pasos manuales de descargar las cabeceras y reconstruir los módulos nativos para tu app. Si está usando [Electron Forge][electron-forge], esta herramienta se utiliza automáticamente tanto en desarrollo como al hacer distribuibles.

Por ejemplo, para instalar la herramienta independiente `electron-rebuild` y recompilar los módulos con este a través de la linea de comando:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

Para más información sobre el uso y la integración con otras herramientas como [Electron Packager][electron-packager], consulte el README del proyecto.

### Usando `npm`

Al establecer algunas variables del entorno, puede usar `npm` para instalar módulos directamente.

Por ejemplo, para instalar todas las dependencias para Electron:

```sh
# Electron's version.
export npm_config_target=1.2.3
# The architecture of Electron, see https://electronjs.org/docs/tutorial/support#supported-platforms
# for supported architectures.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://electronjs.org/headers
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Construcción manual para Electron

Si usted es un desarrollador que está desarrollando un módulo nativo y desea probarlo con Electron, es posible que desee reconstruir el módulo para Electron manualmente. Puedes usar `node-gyp` directamente para construir para Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` cambie para encontrar las cabeceras de desarrollo.
* `--target=1.2.3` es la versión de Electron.
* `--dist-url=...` especifique de donde descargar las cabeceras.
* `--arch=x64` dice que el modulo es construido para un sistema de 64-bit.

### Construcción manual para una compilación personalizada de Electron

Para compilar Módulos Nativos de Node contra una compilación personalizada de Electron que no coincide con una version pública, indique a `npm` que use la versión de Node que ha incluido en su versión personalizada.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Problemas

Si ha instalado un módulo nativo y este no funciona, necesitas verificar las siguientes cosas:

* En caso de duda, ejecute `electron-rebuild` primero.
* Asegúrese de que el módulo nativo es compatible con la plataforma de destino y la arquitectura para su aplicación Electron.
* Asegúrese de que `win_delay_load_hook` no esta configurado como `false` en el módulo `binding.gyp`.
* Después de actualizar Electron, generalmente necesita reconstruir los módulos.

### Una nota acerca de `win_delay_load_hook`

En Windows, por defecto `node-gyp` enlaza los módulos nativos contra `node.dll`. Sin embargo, en Electron 4.x y superiores, los symbols que necesitan los módulos nativos son exportados por `electron.exe`, y no ahí `node.dll`. Para poder cargar módulos nativos en Windows, `node-gyp` instala un [delay_load_hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) que es lanzado cuando el módulo nativo es cargado, y redirige las referencias de `node.dll` para usar el ejecutable de carga en lugar de buscar por `node.dll` en la ruta de la libreria (el cual no daría nada). Como tal, en Electron 4.x y superiores `'win_delay_load_hook': 'true'` es necesario para cargar módulos nativos.

Si se obtiene un error como `Módulo no se auto-registró`, o `El procedimiento especificado
no se pudo encontrar`, puede significar que el módulo que está intentando usar no incluyó correctamente el delay-load hook.  Si el módulo esta construido con node-gyp, asegurese de que la variable `win_delay_load_hook` esta configurada a `true` en el archivo `binding.gyp`, y que no esta siendo sobrescrita en ningún lado.  Si el módulo esta siendo construido con otro sistema, necesitarás asegurarte que construye con un delay-load hook instalado en el archivo `.node` principal. Su invocación `link.exe` debe parecerce a esto:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

En particular, es importante que:

* enlazas contra `node.lib` de _Electron_ y no Node. Si enlazas contra el `node.lib` incorrecto obtendrás errores de carga cuando necesites el módulo en Electron.
* incluyas la bandera `/DELAYLOAD:node.exe`. Si el enlace a `node.exe` no se retrasa, el delay-load hook no tendra la oportunidad de disparar y el símbolo a node no será resulto correctamente.
* `win_delay_load_hook.obj` está vinculado directamente a la DLL final. Si el gancho está configurado en una DLL dependiente, no se disparará en el momento adecuado.

Mire [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) para un ejemplo de delay-load si estas implementando el tuyo propio.

## Módulos que dependen de `prebuild`

[`prebuild`](https://github.com/prebuild/prebuild) proporciona una forma de publicar módulos nativos de Node con binarios precompilados para multiples versiones de Node y Electron.

Si el módulo `prebuild`-powered provee binarios para el uso en Electron, asegúrate de omitir `--build-from-source` y la variable de entorno `npm_config_build_from_source` para aprovechar el máximo de los binarios preconstruidos.

## Módulos que dependen de `node-pre-gyp`

La herramienta [`node-pre-gyp`][node-pre-gyp] proporciona una forma de implementar módulos de nodo nativos con binarios precompilados, y muchos módulos populares lo están usando.

Algunas veces esos módulos funcionan bien bajo Electron, pero cuando no hay disponibles binarios específico para Electron necesitarás construirlos desde el código fuente. Por esto, es recomendable usar `electron-rebuild` para estos módulos.

Si estás siguiendo la forma de `npm` de instalar módulos, necesitarás pasar `--build-from-source` a `npm`, o establecer la variable de entorno `npm_config_build_from_source`.

[abi]: https://en.wikipedia.org/wiki/Application_binary_interface
[electron-rebuild]: https://github.com/electron/electron-rebuild
[electron-forge]: https://electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
