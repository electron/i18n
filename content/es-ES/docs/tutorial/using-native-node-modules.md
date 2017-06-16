# Mediante módulos de nodo nativo

Los módulos nativos de nodo son apoyados por Electron, pero puesto que el Electron es muy probable que utilice una versión V8 del nodo binario instalada en su sistema, usted tiene que especificar manualmente la ubicación de cabeceras del Electron al compilar los módulos nativos.

## Cómo instalar módulos nativos

Tres formas de instalar módulos nativos:

### Utilizando `npm`

Ajustando algunas variables de entorno, puede utilizar `npm` para instalar los módulos directamente.

Un ejemplo de instalación de todas las dependencias para el Electron:

```bash
# Versión del Electron.
Export npm_config_target = 1.2.3 # arquitectura de Electron, puede ser ia32 o x64.
Export npm_config_arch = x64 npm_config_target_arch de exportación = x64 cabeceras de descarga # de electrones.
Export npm_config_disturl = https://atom.io/download/electron # Tell nodo-pre-gyp que estamos construyendo para el Electron.
Export npm_config_runtime = nodo-pre-gyp Electron # Tell para compilar el módulo de código fuente.
Export npm_config_build_from_source = true # instalar todos las dependencias y el almacén de caché a ~ / .electron-gyp.
Inicio = ~ / .electron-gyp MNP instalar
```

### Instalación de módulos y reconstrucción para el Electron

Puede también optar por instalar módulos como otros proyectos del nodo y luego recompilar los módulos de Electron con el paquete [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild). Este módulo puede obtener la versión de Electron y controlar los pasos manual de descargar encabezados y compilar módulos nativos para su aplicación.

Un ejemplo de instalación `electron-rebuild` y reconstrucción de módulos con él:

```bash
MNP instalar--save-dev Electron reconstrucción # cada vez que ejecutar "install del MNP", ejecutar esto:./node_modules/.bin/electron-rebuild # en Windows si tienes problemas, probar:.\node_modules\.bin\electron-rebuild.cmd
```

### Manual de construcción para Electron

Si usted es un desarrollador de desarrollo de un módulo nativo y quiere probar contra el Electron, puede recompilar manualmente el módulo de Electron. Puede utilizar `node-gyp` directamente a compilar para el Electron:

```bash
/path-to-module CD / Inicio = ~ / .electron-gyp nodo-gyp recompilar--target = 1.2.3--arco = x64--dist-url = https://atom.io/download/electron
```

El `HOME = ~ / .electron-gyp` cambios donde encontrar cabeceras de desarrollo. `--target = 1.2.3` es la versión del Electron. ` - dist-url =...` especifica dónde descargar los encabezados. ` - arco = x64` dice que el módulo está construido para sistema de 64 bits.

## Problemas

Si instala un módulo nativo y encontró que no estaba trabajando, usted necesita comprobar a raíz de las cosas:

* La arquitectura del módulo tiene que coincidir con la arquitectura del Electron (ia32 o x64).
* Después de actualizar Electron, generalmente necesitan para recompilar los módulos.
* En caso de duda, ejecute primero `electron rebuild`.

## Módulos que dependen de `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) proporciona una manera de publicar fácilmente nativos módulos de nodo con binarios precompilados para varias versiones de nodo y Electron.

Si los módulos proporcionan binarios para el uso en Electron, asegúrese de omitir`--fabricación de source` y la variable de entorno `npm_config_build_from_source` con el fin de aprovechar al máximo los binarios pre-compilados.

## Módulos que dependen `node-pre-gyp`

El tool</a> de `node-pre-gyp` proporciona una manera nativa nodo módulos con binarios pre-compilados y muchos módulos populares están usando.</p> 

Generalmente los módulos funcionan bien en Electron, pero a veces cuando Electron utiliza una nueva versión del V8 de nodo, y hay cambios ABI, pueden suceder cosas malas. Así que en general se recomienda siempre crear módulos nativos desde el código fuente.

Si usted está siguiendo el camino de la `npm` de la instalación de módulos, entonces esto se hace por defecto, si no, tienes que pasar `--generación de source` a `npm`, o establecer la variable de entorno `npm_config_build_from_source`.