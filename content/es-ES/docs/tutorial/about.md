# Acerca de Electron

[Electron](https://electronjs.org)es una biblioteca de código abierto desarrollada por GitHub para crear aplicaciones de escritorio multiplataforma con HTML, CSS y JavaScript. Electron logra esto combinando [Chromium](https://www.chromium.org/Home) y Node.js</ 1> en un solo tiempo de ejecución y las aplicaciones se pueden empaquetar para Mac, Windows y Linux.</p> 

Electron comenzó en 2013 como el marco en el que se construiría [Atom](https://atom.io), el editor de texto pirateable de GitHub. Los dos fueron de fuente abierta en la primavera de 2014.

Desde entonces se ha convertido en una herramienta popular utilizada por desarrolladores de código abierto, nuevas empresas y compañías establecidas. [Vea quién está construyendo en Electron](https://electronjs.org/apps).

Siga leyendo para obtener más información sobre los contribuyentes y las versiones de Electron o para comenzar a construir con Electron en la [Guía de inicio rápido](quick-start.md).

## Equipo central y contribuyentes

Electron es mantenido por un equipo en GitHub, así como por un grupo de [colaboradores activos](https://github.com/electron/electron/graphs/contributors) de la comunidad. Algunos de los contribuyentes trabajan de manera individual y algunos trabajan en empresas más grandes que se están desarrollando en Electron. Nos complace agregar colaboradores frecuentes al proyecto como desarrolladores. Obtenga más información sobre [contribuyendo a Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Lanzamientos

Con frecuencia [liberan electrones](https://github.com/electron/electron/releases). Lanzamos cuando hay correcciones de errores significativas, nuevas API o están actualizando versiones de Chromium o Node.js.

### Actualización de dependencias

La versión de Electrón de Chromium generalmente se actualiza dentro de una o dos semanas después de que se lanza una nueva versión estable de Chromium, dependiendo del esfuerzo involucrado en la actualización.

Cuando se lanza una nueva versión de Node.js, Electron generalmente espera alrededor de un mes antes de la actualización para traer una versión más estable.

En Electron, Node.js y Chromium comparten una sola instancia de V8—generalmente la versión que usa Chromium. La mayoría de las veces esto *simplemente funciona* pero a veces significa remendar Node.js.

### Versiones

A partir de la versión 2.0 Electron[sigue a`semver`](http://semver.org). Para la mayoría de las aplicaciones y usando cualquier versión reciente de npm, ejecutar `$ npm electron de instalación` hará lo correcto.

El proceso de actualización de la versión se detalla explícitamente en nuestro [documento de versiones](electron-versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. Si su versión actual de Electron trabaja para usted, usted puede permanecer en él por como le gustaría. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Core Philosophy

Para mantener la Electron pequeña (tamaño del fichero) y sostenible (la propagación de las dependencias y APIs) el proyecto limita el alcance del proyecto base.

Por ejemplo, el Electron utiliza sólo la biblioteca de renderizado de cromo en lugar de cromo. Esto facilita actualizar cromo pero también significa encontraron algunas características del navegador en Google Chrome no existe en la Electron.

Nuevas características añadidas a la Electron principalmente deben ser API nativas. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## Histórico

A continuación son hitos en la historia del Electron.

| :calendar:      | :tada:                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).      |
| **May 2014**    | [Atom Shell is open sourced](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                          |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                                  |
| **May 2016**    | [Electron releases `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                             |
| **May 2016**    | [Electron apps compatible with Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **August 2016** | Apoyo de la tienda de [Windows por apps](https://electronjs.org/docs/tutorial/windows-store-guide) de Electron.     |