# Uso de Módulos Nativos de Node

Los Módulos Nativos de Node son soportados por Electron, pero ya que es muy probable que Electron use una versión diferente de V8 que el de Node instala en tu sistema, los módulos que utilices deberán de ser re compilados para Electron. De lo contrario, obtendrá la siguiente clase de error cuando intente ejecutar su aplicación:

```sh
$XYZ$XYZ. Esta versión de Node.js requiere
NODE_MODULE_VERSION $ABC. Por favor, intenta volver a compilar o reinstalar
el módulo (por ejemplo, usando `npm rebuild` o `npm install`).
```

## ¿Cómo instalar módulos nativos?

Hay varias formas diferentes de instalar los módulos nativos:

### Instalación de módulos y reconstrucción para Electron

Puedes instalar los módulos como otro proyecto Node, luego reconstruir el modulo para Electron con el paquete [`electron-rebuild`](https://github.com/electron/electron-rebuild). Este módulo puede determinar automáticamente la versión de Electron y manejar los pasos manuales de descargar las cabeceras y reconstruir los módulos nativos para tu app.

Por ejemplo, para instalar `electron-rebuild` y luego reconstruir los módulos con el a través de la línea de comando:

```sh
instalar npm --save-dev electron-rebuild

# Cada vez que ejecute "npm install", ejecute esto:
./node_modules/.bin/electron-rebuild

# En Windows si tiene problemas, intente:
.\node_modules\.bin\electron-rebuild.cmd
```

Para mas información de uso e integración con otras herramientas, consulte el README del proyecto.

### Usando `npm`

Al establecer algunas variables del entorno, puede usar `npm` para instalar módulos directamente.

Por ejemplo, para instalar todas las dependencias para Electron:

```sh
# Versión de Electron.
export npm_config_target=1.2.3
# La arquitectura de Electron, mire https://electronjs.org/docs/tutorial/support#supported-platforms
# para arquitecturas soportadas.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Descargar encabezados para Electron.
exportar npm_config_disturl=https://atom.io/download/electron
# Informe a node-pre-gyp que estamos construyendo para Electron.
export npm_config_runtime=electron
# Informe a node-pre-gyp que construya el módulo desde el código fuente.
export npm_config_build_from_source=true
# Instale todas las dependencias y almacene el caché en ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Construcción manual para Electron

Si usted es un desarrollador que está desarrollando un módulo nativo y desea probarlo con Electron, es posible que desee reconstruir el módulo para Electron manualmente. Puedes usar `node-gyp` directamente para construir para Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
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

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

En particular, es importante que:

- you link against `node.lib` from _Electron_ and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- incluyas la bandera `/DELAYLOAD:node.exe`. Si el enlace a `node.exe` no se retrasa, el delay-load hook no tendra la oportunidad de disparar y el símbolo a node no será resulto correctamente.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

Mire [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) para un ejemplo de delay-load si estas implementando el tuyo propio.

## Módulos que dependen de `prebuild`

[`prebuild`](https://github.com/prebuild/prebuild) proporciona una forma de publicar módulos nativos de Node con binarios precompilados para multiples versiones de Node y Electron.

Si los módulos proporcionan binarios para el uso en Electron, asegúrese de omitir `--build-from-source` y la variable de entorno `npm_config_build_from_source` para aprovechar al máximo los binarios precompilados.

## Módulos que dependen de `node-pre-gyp`

La herramienta [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) proporciona una forma de implementar módulos de nodo nativos con binarios precompilados, y muchos módulos populares lo están usando.

Usualmente esos módulos trabajan bien bajo Electron, pero a veces cuando Electron usa una versión mas nueva de V8 que Node y/o hay cambios ABI, cosas malas pueden pasar. Así que en general, siempre es recomendable compilar módulos nativos desde el código fuente. `electron-rebuild` maneja esto por ti de forma automática.

Si está siguiendo la forma `npm` de instalar los módulos, esto se hace de forma predeterminada; si no, tiene que pasar `--build-from-source` a `npm`, o establecer la variable de entorno `npm_config_build_from_source`.
