# Uso de Módulos Nativos de Node

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed on your system, the modules you use will need to be recompiled for Electron. De lo contrario, obtendrá la siguiente clase de error cuando intente ejecutar su aplicación:

```sh
$XYZ$XYZ. Esta versión de Node.js requiere
NODE_MODULE_VERSION $ABC. Por favor, intenta volver a compilar o reinstalar
el módulo (por ejemplo, usando `npm rebuild` o `npm install`).
```

## ¿Cómo instalar módulos nativos?

There are several different ways to install native modules:

### Instalación de módulos y reconstrucción para Electron

You can install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`](https://github.com/electron/electron-rebuild) package. This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app.

For example, to install `electron-rebuild` and then rebuild modules with it via the command line:

```sh
instalar npm --save-dev electron-rebuild

# Cada vez que ejecute "npm install", ejecute esto:
./node_modules/.bin/electron-rebuild

# En Windows si tiene problemas, intente:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools, consult the project's README.

### Usando `npm`

Al establecer algunas variables del entorno, puede usar `npm` para instalar módulos directamente.

For example, to install all dependencies for Electron:

```sh
# Versión de Electron.
export npm_config_target=1.2.3
# The architecture of Electron, see https://electronjs.org/docs/tutorial/support#supported-platforms
# for supported architectures.
exportar npm_config_arch=x64
exportar npm_config_target_arch=x64
# Descargar encabezados para Electron.
exportar npm_config_disturl=https://electronjs.org/headers
# Informe a node-pre-gyp que estamos construyendo para Electron.
exportar npm_config_runtime=electron
# Informe a node-pre-gyp que construya el módulo desde el código fuente.
exportar npm_config_build_from_source=true
# Instale todas las dependencias y almacene el caché en ~/.electron-gyp.
HOME=~/.electron-gyp npm instalar
```

### Construcción manual para Electron

Si usted es un desarrollador que está desarrollando un módulo nativo y desea probarlo con Electron, es posible que desee reconstruir el módulo para Electron manualmente. Puedes usar `node-gyp` directamente para construir para Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

- `HOME=~/.electron-gyp` changes where to find development headers.
- `--target=1.2.3` is the version of Electron.
- `--dist-url=...` specifies where to download the headers.
- `--arch=x64` says the module is built for a 64-bit system.

### Construcción manual para una compilación personalizada de Electron

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Problemas

If you installed a native module and found it was not working, you need to check the following things:

- En caso de duda, ejecute `electron-rebuild` primero.
- Make sure the native module is compatible with the target platform and architecture for your Electron app.
- Make sure `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
- Después de actualizar Electron, generalmente necesita reconstruir los módulos.

### A note about `win_delay_load_hook`

On Windows, by default, `node-gyp` links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll`. In order to load native modules on Windows, `node-gyp` installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

En particular, es importante que:

- you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## Módulos que dependen de `prebuild`

[`prebuild`](https://github.com/prebuild/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

Si los módulos proporcionan binarios para el uso en Electron, asegúrese de omitir `--build-from-source` y la variable de entorno `npm_config_build_from_source` para aprovechar al máximo los binarios precompilados.

## Módulos que dependen de `node-pre-gyp`

La herramienta [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) proporciona una forma de implementar módulos de nodo nativos con binarios precompilados, y muchos módulos populares lo están usando.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node and/or there are ABI changes, bad things may happen. So in general, it is recommended to always build native modules from source code. `electron-rebuild` handles this for you automatically.

Si está siguiendo la forma `npm` de instalar los módulos, esto se hace de forma predeterminada; si no, tiene que pasar `--build-from-source` a `npm`, o establecer la variable de entorno `npm_config_build_from_source`.