# Acerca de Electron

[Electron](https://electronjs.org) es una biblioteca de código abierto desarrollada por GitHub para crear aplicaciones de escritorio multiplataforma con HTML, CSS y JavaScript. Electron logra esto combinando [Chromium](https://www.chromium.org/Home) y Node.js</ 1> en un solo tiempo de ejecución, además permite a las aplicaciones la posibilidad de empaquetarse para Mac, Windows y Linux.</p> 

Electron comenzó en 2013 como el marco de trabajo en el que se construiría [Atom](https://atom.io), el editor de texto pirateable de GitHub. Los dos fueron liberados como proyectos de código abierto en la primavera de 2014.

Desde entonces se ha convertido en una herramienta popular utilizada por desarrolladores de código abierto, nuevas empresas y compañías establecidas. [Vea quién está desarrollando con Electron](https://electronjs.org/apps).

Sigue leyendo para obtener más información sobre los contribuyentes y las versiones de Electron, o comienza a desarrollar con Electron con la [Guía de inicio rápido](quick-start.md).

## Equipo central y contribuyentes

Electron es mantenido por un equipo en GitHub, así como por un grupo de [colaboradores activos](https://github.com/electron/electron/graphs/contributors) de la comunidad. Algunos de los contribuyentes trabajan de manera individual y otros trabajan en empresas más grandes, las cuales se están desarrollando con Electron. Nos complace agregar colaboradores frecuentes al proyecto como desarrolladores. Obtenga más información sobre [como contribuir a Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Lanzamientos

Electron realiza [liberaciones frecuentes.](https://github.com/electron/electron/releases) Lanzamos una nueva versión cuando hay correcciones de errores significativos, nuevas API o existen nuevas versiones de Chromium o Node.js.

### Actualización de dependencias

La versión de Electrón de Chromium generalmente se actualiza luego de una o dos semanas después de que se lanza una nueva versión estable de Chromium, dependiendo del esfuerzo involucrado en la actualización.

Cuando se lanza una nueva versión de Node.js, Electron generalmente espera alrededor de un mes antes de la actualización para traer una versión más estable.

En Electron, Node.js y Chromium comparten una sola instancia de V8—generalmente la versión que usa Chromium. La mayoría de las veces esto *simplemente funciona* pero a veces significa parchear Node.js.

### Control de versiones

A partir de la versión 2.0 Electron [sigue a `semver`](https://semver.org). Para la mayoría de las aplicaciones y usando cualquier versión reciente de npm, ejecutar `$ npm install electron` ejecutará perfectamente.

El proceso de actualización de la versión se detalla explícitamente en nuestro [documento de versiones](electron-versioning.md).

### LTS

El soporte a largo plazo de versiones anteriores de Electron no existe actualmente. Si su versión actual de Electron trabaja correctamente para usted, usted puede permanecer en dicha versión tanto tiempo como guste. Si desea utilizar nuevas funciones a medida que se agregan, debe actualizar a una versión más nueva.

Llegó una actualización importante con la versión `v1.0.0`. Si aún no está utilizando esta versión, debería [ leer más acerca de los cambios de la versión `1.0.0`](https://electronjs.org/blog/electron-1-0).

## Filosofía inicial

Para mantener Electron pequeño (tamaño del fichero) y sostenible (la propagación de las dependencias y APIs) el proyecto limita el alcance del proyecto base.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. Esto facilita actualizar Chromium pero también significa encontrar algunas características del navegador Google Chrome no existentes en Electron.

Las nuevas características añadidas a Electron deberían ser principalmente API nativas. Si una característica puede ser su propio módulo Node.js, probablemente debería serlo. Vea las [herramientas construidas en Electron por la comunidad](https://electronjs.org/community).

## Histórico

A continuación hay hitos en la historia de Electron.

| :calendario:       | :tada:                                                                                                          |
| ------------------ | --------------------------------------------------------------------------------------------------------------- |
| **Abril de 2013**  | [Atom Shell es iniciado](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Mayo de 2014**   | [Atom Shell pasa a ser de código libre](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).          |
| **Abril de 2015**  | [Atom Shell es renombrado a Electron](https://github.com/electron/electron/pull/1389).                          |
| **Mayo de 2016**   | [Electrón libera la versión `1.0.0`](https://electronjs.org/blog/electron-1-0).                                 |
| **Mayo de 2016**   | [Electron apps compatible with Mac App Store](mac-app-store-submission-guide.md).                               |
| **Agosto de 2016** | Soporte de la tienda de [Windows](windows-store-guide.md) para las aplicaciones hechas con Electron.            |