# Sobre electrónica

[Electron](https://electron.atom.io) es una biblioteca de código abierto desarrollada por GitHub para construir aplicaciones de escritorio multiplataforma con HTML, CSS y JavaScript. Electrón logra esto mediante la combinación de [Chromium](https://www.chromium.org/Home) y [Node.js](https://nodejs.org) en un solo tiempo de ejecución y se pueden empaquetar aplicaciones para Mac, Windows y Linux.

Electrónica comenzó en 2013 como el marco en el que se construirían [Atom](https://atom.io), editor de texto hackeable de GitHub. Los dos estaban abiertos de origen en la primavera de 2014.

Desde entonces se ha convertido en una herramienta popular utilizada por los desarrolladores de código abierto, startups y empresas establecidas. [See que está construyendo en Electron](https://electron.atom.io/apps/).

Leer aprender más sobre los colaboradores y lanza de electrón o conseguir comenzó edificio con electrón en el [Quick iniciar Guide](quick-start.md).

## Colaboradores y equipo

Electrón es mantenido por un equipo en GitHub, así como un grupo de contributors</a> de active de la comunidad. Algunos de los colaboradores son personas y algunos trabajan en grandes empresas que están desarrollando en el electrón. Estamos encantados de añadir frecuentes contribuidores al proyecto como desarrollador. Leer más sobre [contributing a Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).</p> 

## Comunicados

Releases</a> de Electron con frecuencia. Liberan cuando hay importantes correcciones de errores, nuevas APIs o son versiones de actualización de cromo o Node.js.</p> 

### Actualización de las dependencias

Versión del electrón de cromo se actualiza generalmente dentro de una o dos semanas después de una nueva versión estable del cromo, dependiendo del esfuerzo en la actualización.

Cuando se libera una nueva versión de Node.js, electrón generalmente espera un mes antes de actualizar para traer en una versión más estable.

En electrónica, Node.js y cromo comparten una única instancia de V8 — generalmente la versión que está utilizando el cromo. Mayoría de las veces este works</em> *just pero a veces significa remendar Node.js.</p> 

### Control de versiones

Debido a la dependencia difícil de Node.js y cromo, electrón está en una posición de difícil control de versiones y [does no siga `semver`](http://semver.org). Se debe por lo tanto siempre referencia a una versión específica del electrón. [Read más sobre versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) o ver la [versions en use](https://electron.atom.io/#electron-versions) del electrón.

### LTS

Largo plazo apoyo de versiones anteriores de electrones no existen. Si su versión actual de electrón trabaja para usted, usted puede permanecer en él por como le gustaría. Si usted desea hacer uso de nuevas características que vienen en usted debe actualizar a una versión más reciente.

Una actualización importante vino con la versión `v1.0.0`. Si aún no estás usando esta versión, debe [read más sobre el changes](https://electron.atom.io/blog/2016/05/11/electron-1-0) de `v1.0.0`.

## Filosofía

Para mantener la electrónica pequeña (tamaño del fichero) y sostenible (la propagación de las dependencias y APIs) el proyecto limita el alcance del proyecto base.

Por ejemplo, el electrón utiliza sólo la biblioteca de renderizado de cromo en lugar de cromo. Esto facilita actualizar cromo pero también significa encontraron algunas características del navegador en Google Chrome no existe en la electrónica.

Nuevas características añadidas a la electrónica principalmente deben ser API nativas. Si una característica puede ser su propio módulo de Node.js, probablemente debería ser. Ver las herramientas de [Electron construidas por el community](https://electron.atom.io/community).

## Historia

A continuación son hitos en la historia del electrón.

| :calendar:         | :tada:                                                                                                                        |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------- |
| **Abril de 2013**  | Cáscara de [Atom es started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).           |
| **Mayo de 2014**   | [Atom Shell es sourced](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html) abierto.                                 |
| **Abril de 2015**  | [Atom Shell re-nombre de Electron](https://github.com/electron/electron/pull/1389).                                           |
| **Mayo de 2016**   | [Electron lanza `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                             |
| **Mayo de 2016**   | [Electron aplicaciones compatibles con Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **Agosto de 2016** | Apoyo de la tienda de [Windows por apps](https://electron.atom.io/docs/tutorial/windows-store-guide) de electrón.             |