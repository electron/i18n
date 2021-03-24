---
title: "Usando GN para construir Electron"
author: nornagon
date: '05-09-2018'
---

Electron ahora usa GN para construirse a sí mismo. He aquí una discusión sobre el porqué.

---

# GYP y GN

Cuando Electron fue lanzado por primera vez en 2013, la configuración de compilación de Chromium fue escrita con [GYP](https://gyp.gsrc.io/), abreviando "Generar proyectos".

En 2014, el proyecto Chromium introdujo una nueva herramienta de configuración de construcción llamada [GN](https://gn.googlesource.com/gn/) (abreviatura de "Generar [Ninja](https://ninja-build.org/)") los archivos de construcción de Chromium fueron migrados a GN y GYP fue eliminado del código fuente.

Históricamente, Electron ha mantenido una separación entre el código principal [de Electron](https://github.com/electron/electron) y [libchromiumcontent](https://github.com/electron/libchromiumcontent), la parte de Electron que envuelve el 'contenido' de Chromium. Electron ha seguido usando GYP, mientras que libchromiumcontent -- como un subconjunto de Chromium -- cambió a GN cuando Chromium lo hizo.

Al igual que los engranajes que no son malla hubo fricción entre el uso de los dos sistemas de construcción. Mantener la compatibilidad era propenso a errores, desde banderas del compilador y `#define` que debían mantenerse meticulosamente sincronizados entre Chromium, Node, V8 y Electron.

Para hacer frente a esto, el equipo Electron ha estado trabajando en mover todo a GN. Hoy, el [commit](https://github.com/electron/electron/pull/14097) para eliminar el último del código GYP de Electron fue aterrizado en maestro.

# Lo que esto significa para ti

Si estás contribuyendo a Electron mismo, el proceso de revisar y construir Electron desde `master` o 4. .0 es muy diferente de lo que era en 3.0.0 y anterior. Consulte las [instrucciones de compilación de GN](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) para más detalles.

Si estás desarrollando una aplicación con Electron, hay algunos cambios menores que podrías notar en el nuevo Electron 4. .0-noche; pero más que probable, el cambio de Electron en el sistema de construcción será totalmente transparente para usted.

# Lo que esto significa para Electron

GN es [más rápido](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) que GYP y sus archivos son más legibles y mantenibles. Además, esperamos que el uso de un único sistema de configuración de compilación reduzca el trabajo necesario para actualizar Electron a nuevas versiones de Chromium.

 * Ya se ha ayudado al desarrollo en Electron 4.0.0 sustancialmente porque Chromium 67 eliminó el soporte para MSVC y cambió para construir con Clang en Windows. Con la construcción del GN, heredamos directamente todos los comandos del compilador de Chromium, así que tenemos el Clang build en Windows gratis!

 * También está hecho más fácil para Electron usar [BoringSSL](https://boringssl.googlesource.com/boringssl/) en una compilación unificada a través de Electron, Chromium, y Node, algo que era [problemático antes](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
