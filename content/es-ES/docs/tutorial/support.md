# Soporte de Electron

## Encontrar Soporte

Si tiene una preocupación de seguridad, consulte el documento de seguridad [](https://github.com/electron/electron/tree/master/SECURITY.md).

Si busca ayuda con la programación, respuestas a preguntas o conversaciones con otros desarrolladores que usan Electron, puede interactuar con la comunidad en estos lugares:

* [`Electron's Discord`](https://discord.com/invite/electron) tiene canales para:
  * Obtener ayuda
  * Aplicaciones del ecosistema como [Electron Forge](https://github.com/electron-userland/electron-forge) y [Electron Fiddle](https://github.com/electron/fiddle)
  * Compartir ideas con otros programados de aplicaciones Electron
  * Y más!
* Categoría [`electron`](https://discuss.atom.io/c/electron) en los foros de Atom
* `#electron` canal en [Atom's Slack](https://discuss.atom.io/t/join-us-on-slack/16638?source_topic_id=25406)
* [`electron-ru`](https://telegram.me/electron_ru) *(Ruso)*
* [`electron-br`](https://electron-br.slack.com) *(Portugués Brasileño)*
* [`electron-kr`](https://electron-kr.github.io/electron-kr) *(Coreano)*
* [`electron-jp`](https://electron-jp.slack.com) *(Japonés)*
* [`electron-tr`](https://electron-tr.herokuapp.com) *(Turco)*
* [`electron-id`](https://electron-id.slack.com) *(Indonesio)*
* [`electron-pl`](https://electronpl.github.io) *(Polaco)*

Si quieres contribuir a Electron, consulta el [documento de contribución](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

Si has encontrado un error en una [versión soportada](#supported-versions) de Electron, infórmalo con el [rastreador de problemas](../development/issues.md).

[awesome-electron](https://github.com/sindresorhus/awesome-electron) es una lista mantenida por la comunidad de útiles ejemplos de aplicaciones, herramientas y recursos.

## Versiones Soportadas

Las últimas tres versiones *stable* son soportadas por el equipo Electron. Por ejemplo, si la última versión es 6.1.x, entonces la 5.0.x así como la series 4.2.x son soportadas.  Solo soportamos la última versión minor por cada versión estable.  Esto quiere decir que en el caso de una corrección de seguridad 6.1.x recibirá la corrección, pero no lanzaremos una nueva versión de 6.0.x.

La última versión estable recibe unilateralmente todas las correcciones de `master`, y la versión anterior recibe la gran mayoría de esas correcciones como el tiempo y el ancho de banda lo permite. Las versiones más antiguas soportadas solamente van a recibir correcciones de seguridad directamente.

Todas las versiones soportadas aceptarán peticiones de pull requests externas a backport correcciones previamente fusionadas en `master`, aunque esto puede ser caso por caso para algunas versiones mas antiguas. Todas las decisiones impugnadas entorno a la liberación de la versión de backports serán resueltas por el [Releases Working Group](https://github.com/electron/governance/tree/master/wg-releases) como un elemento de agenda en su reunión semanal la semana que se levanta el PR backport.

Cuando se cambia o elimina una API de una manera que rompe la funcionalidad existente, la funcionalidad anterior será soportada por un mínimo de dos versiones principales cuando sea posible antes de ser eliminada. Por ejemplo, si una función toma tres argumentos, y ese número se reduce a dos en la versión principal 10, la versión de tres argumentos continuaría funcionando hasta que, como mínimo, la versión principal 12. Anterior el umbral mínimo de dos versiones, intentaremos soportar la compatibilidad hacia atrás más allá de dos versiones hasta que los mantenedores sientan que la carga de mantenimiento es demasiado alta para seguir haciéndolo.

### Versiones soportadas actualmente

* 13.x.y
* 12.x.y
* 11.x.y

### Fin de vida

Cuando una rama de lanzamiento llega al final de su ciclo de soporte, la serie quedará obsoleta en NPM y se realizará una versión final de fin de soporte. Este lanzamiento agregará una advertencia para informar que una versión no soportada de Electron está en uso.

Estos pasos son para ayudar a los desarrolladores de aplicaciones a saber cuándo una rama que están utilizando no recibe soporte, pero sin ser excesivamente intrusiva para los usuarios finales.

Si una aplicación tiene circunstancias excepcionales y necesita permanecer en una serie de Electron no admitida, los desarrolladores pueden silenciar la advertencia de fin de soporte al omitir la versión final de `package.json` `devDependencies` de la aplicación. Por ejemplo, dado que la serie 1-6-x finalizó con una versión 1.6.18 de fin de soporte, los desarrolladores podrían optar por permanecer en la serie 1-6-x sin advertencias con un `devDependency` de `"electron": 1.6.0 - 1.6.17`.

## Plataformas soportadas

Las siguientes plataformas son apoyadas por Electron:

### macOS

Only 64bit binaries are provided for macOS, and the minimum macOS version supported is macOS 10.11 (El Capitan).

El soporte nativo para dispositivos Apple Silicon (`arm64`) fue agregado en Electron 11.0.0.

### Windows

Windows 7 y posteriores son soportados, sistemas operativos más viejos no lo son (y no funcionan).

Ambos binarios `ia32` (`x86`) y `x64` (`amd64`) se proporcionan para Windows. [Soporte nativo para Windows en dispositivos Arm (`arm64`) fue agregado a Electron 6.0.8.](windows-arm.md). Es posible ejecutar aplicaciones empaquetadas con versiones anteriores usando el binario ia32.

### Linux

Los binarios preconstruido de Electron están construidos en Ubuntu 18.04.

Si el compilado binario puede correr en una distribución depende de que la distribución incluye las librerías a las que está ligada Electron en la plataforma construida, así que solo hay garantía de que Ubuntu 18.04 trabaje, pero las siguientes plataformas también están verificadas para correr el precompilado binario de Electron:

* Ubuntu 14.04 y posteriores
* Fedora 24 y más nuevo
* Debian 8 y más nuevo
