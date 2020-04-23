# Soporte de Electron

## Encontrar Soporte

If you have a security concern, please see the [security document](https://github.com/electron/electron/tree/master/SECURITY.md).

Si busca ayuda con la programación, respuestas a preguntas o conversaciones con otros desarrolladores que usan Electron, puede interactuar con la comunidad en estos lugares:
- Categoría [`electron`](https://discuss.atom.io/c/electron) en los foros de Atom
- Canal `#atom-shell` en Freenode
- `#electron` canal en [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
- [`electron-ru`](https://telegram.me/electron_ru) *(Ruso)*
- [`electron-br`](https://electron-br.slack.com) *(Portugués Brasileño)*
- [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coreano)*
- [`electron-jp`](https://electron-jp.slack.com) *(Japonés)*
- [`electron-tr`](https://electron-tr.herokuapp.com) *(Turco)*
- [`electron-id`](https://electron-id.slack.com) *(Indonesio)*
- [`electron-pl`](https://electronpl.github.io) *(Polaco)*

If you'd like to contribute to Electron, see the [contributing document](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Si has encontrado un error en una [versión soportada](#supported-versions) de Electron, infórmalo con el [rastreador de problemas](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) es una lista mantenida por la comunidad de útiles ejemplos de aplicaciones, herramientas y recursos.

## Versiones Soportadas

Las últimas tres versiones *stable* son soportadas por el equipo Electron. Por ejemplo, si la última versión es 6.1.x, entonces la 5.0.x así como la series 4.2.x son soportadas.  Solo soportamos la última versión minor por cada versión estable.  Esto quiere decir que en el caso de una corrección de seguridad 6.1.x recibirá la corrección, pero no lanzaremos una nueva versión de 6.0.x.

La última versión estable recibe unilateralmente todas las correcciones de `master`, y la versión anterior recibe la gran mayoría de esas correcciones como el tiempo y el ancho de banda lo permite. Las versiones más antiguas soportadas solamente van a recibir correcciones de seguridad directamente.

Todas las versiones soportadas aceptarán peticiones de pull requests externas a backport correcciones previamente fusionadas en `master`, aunque esto puede ser caso por caso para algunas versiones mas antiguas. Todas las decisiones impugnadas entorno a la liberación de la versión de backports serán resueltas por el [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) como un elemento de agenda en su reunión semanal la semana que se levanta el PR backport.

When an API is changed or removed in a way that breaks existing functionality, the previous functionality will be supported for a minimum of two major versions when possible before being removed. For example, if a function takes three arguments, and that number is reduced to two in major version 10, the three-argument version would continue to work until, at minimum, major version 12. Past the minimum two-version threshold, we will attempt to support backwards compatibility beyond two versions until the maintainers feel the maintenance burden is too high to continue doing so.

### Versiones soportadas actualmente
- 8.1.x
- 7.1.x
- 6.1.x

### Fin de vida

Cuando una rama de lanzamiento llega al final de su ciclo de soporte, la serie quedará obsoleta en NPM y se realizará una versión final de fin de soporte. Este lanzamiento agregará una advertencia para informar que una versión no soportada de Electron está en uso.

Estos pasos son para ayudar a los desarrolladores de aplicaciones a saber cuándo una rama que están utilizando no recibe soporte, pero sin ser excesivamente intrusiva para los usuarios finales.

Si una aplicación tiene circunstancias excepcionales y necesita permanecer en una serie de Electron no admitida, los desarrolladores pueden silenciar la advertencia de fin de soporte al omitir la versión final de `package.json` `devDependencies` de la aplicación. Por ejemplo, dado que la serie 1-6-x finalizó con una versión 1.6.18 de fin de soporte, los desarrolladores podrían optar por permanecer en la serie 1-6-x sin advertencias con un `devDependency` de `"electron": 1.6.0 - 1.6.17`.

## Plataformas soportadas

Las siguientes plataformas son apoyadas por Electron:

### macOS

Sólo se proporcionan binarios de 64bit para macOS, y la versión mínima de macOS soportada es macOS 10.10 (Yosemite).

### Windows

Windows 7 y posteriores son soportados, sistemas operativos más viejos no lo son (y no funcionan).

Ambos binarios `ia32` (`x86`) y `x64` (`amd64`) se proporcionan para Windows. [Electron 6.0.8 and later add native support for Windows on Arm (`arm64`) devices](windows-arm.md). Running apps packaged with previous versions is possible using the ia32 binary.

### Linux

Los binarios preconstruidos `ia32` (`i686`) y `x64` (`amd64`) de Electron están basados en Ubuntu 12.04, el binario `armv7l` está construido contra ARM v7 con ABI de flotación dura y NEON para Debian Wheezy.

[Until the release of Electron 2.0](../breaking-changes.md#duplicate-arm-assets), Electron will also continue to release the `armv7l` binary with a simple `arm` suffix. Ambos binarios son idénticos.

Si el compilado binario puede correr en una distribución depende de que la distribución incluye las librerías a las que está ligada Electron en la plataforma construida, así que solo hay garantía de que Ubuntu 12.04 trabaje, pero las siguientes plataformas también están verificadas para correr el precompilado binario de Electron:

* Ubuntu 12.04 y posteriores
* Fedora 21
* Debian 8
