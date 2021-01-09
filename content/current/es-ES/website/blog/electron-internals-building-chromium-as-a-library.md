---
title: 'Internacionales de electrón: Construir cromo como una biblioteca'
author: zcbenz
date: '2017-03-03'
---

Electron se basa en el cromo de código abierto de Google, un proyecto que no está necesariamente diseñado para ser utilizado por otros proyectos. Esta publicación presenta cómo se construye Chromium como una biblioteca para uso de Electron y cómo el sistema de compilación ha evolucionado a lo largo de los años.

---

## Usando CEF

El Chromium Embedded Framework (CEF) es un proyecto que convierte Chromium en una biblioteca, y proporciona APIs estables basadas en el código base de Chromium. Versiones muy tempranas del editor Atom y NW.js usaron CEF.

Para mantener una API estable, CEF oculta todos los detalles de Chromium y envuelve las APIs de Chromium con su propia interfaz. Así que cuando necesitábamos acceder a las API de Chromium subyacentes, como integrar Node.js en páginas web, las ventajas del CEF se convirtieron en bloqueadores.

Así que al final tanto Electron como NW.js cambiaron a usar las APIs de Chromium directamente.

## Construyendo como parte del cromo

A pesar de que Chromium no apoya oficialmente proyectos externos, el código base es modular y es fácil construir un navegador mínimo basado en Chromium. El módulo núcleo que proporciona la interfaz del navegador se llama Content Module.

Para desarrollar un proyecto con el Módulo de Contenido, la forma más fácil es construir el proyecto como parte de Chromium. Esto se puede hacer primero revisando el código fuente de Chromium y luego agregando el proyecto al archivo `DEPS` de Chromium.

NW.js y versiones muy tempranas de Electron están utilizando de esta manera para la construcción.

El inconveniente es que el cromo es una base de código muy grande y requiere máquinas muy potentes para construir. Para portatiles normales, esto puede tardar más de 5 horas. Así que esto tiene un gran impacto en el número de desarrolladores que pueden contribuir al proyecto , y también hace que el desarrollo sea más lento.

## Creando cromo como una sola biblioteca compartida

Como usuario del Módulo de Contenido, Electron no necesita modificar el código de Chromium en la mayoría de los casos, tan una manera obvia de mejorar la construcción de Electron es construir Chromium como una biblioteca compartida, y luego enlazar con él en Electron. De esta forma los desarrolladores ya no necesitan construir todo Chromium cuando contribuyen a Electron.

El proyecto [libchromiumcontent](https://github.com/electron/libchromiumcontent) fue creado por [@aroben](https://github.com/aroben) para este propósito. Construye el Módulo de Contenido de Chromium como una biblioteca compartida, y luego proporciona cabeceras de Chromium y binarios preconstruidos para su descarga. El código de la versión inicial de libchromiumcontent puede encontrarse [en este enlace](https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c).

El proyecto [brightray](https://github.com/electron/brightray) también nació como parte de libchromiumcontent, que proporciona una capa fina alrededor del Módulo de Contenido.

Al utilizar juntos libchromiumcontent y brightray, los desarrolladores pueden construir rápidamente un navegador sin entrar en los detalles de construir Chromium. Y elimina el requisito de una red rápida y una máquina potente para construir el proyecto.

Aparte de Electron, también hubo otros proyectos basados en Chromium construidos de esta forma , como el navegador [Breach](https://www.quora.com/Is-Breach-Browser-still-in-development).

## Filtrando símbolos exportados

En Windows hay una limitación de cuántos símbolos una biblioteca compartida puede exportar. A medida que creció el código base de Chromium, el número de símbolos exportados en libchromiumcontent excedió pronto la limitación.

La solución era filtrar los símbolos innecesarios al generar el archivo DLL. Funcionó por [proporcionando un `. archivo ef` al enlazador](https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b), y luego usando un script para [juzgar si los símbolos bajo un espacio de nombres deben ser exportados](https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd).

Al adoptar este enfoque, aunque Chromium seguía agregando nuevos símbolos exportados, libchromiumcontent todavía podría generar archivos de librería compartidos despojando más símbolos .

## Componente compilado

Antes de hablar de los siguientes pasos dados en libchromiumcontent, es importante introducir primero el concepto de compilación de componentes en Chromium.

Como un proyecto enorme, el paso de enlace lleva mucho tiempo en Chromium cuando se construye. Normalmente cuando un desarrollador realiza un pequeño cambio, puede tardar 10 minutos en ver la salida final . Para resolver esto, Chromium introdujo la compilación de componentes, que construye cada módulo en Chromium como librerías compartidas separadas, así que el tiempo que pasa en el paso final de enlace se hace invisible.

## Envío de binarios sin procesar

Con el cromo continuando creciendo, había tantos símbolos exportados en Chromium que incluso los símbolos del Módulo de Contenido y Webkit eran más que la limitación. Era imposible generar una biblioteca compartida utilizable con simplemente símbolos de desguace.

Al final, tuvimos que [enviar los binarios crudos de Chromium](https://github.com/electron/libchromiumcontent/pull/98) en lugar de generar una sola biblioteca compartida.

Como se ha introducido anteriormente, hay dos modos de construcción en Chromium. Como resultado de enviar binarios crudos, tenemos que enviar dos distribuciones diferentes de binarios en libchromiumcontent. Una se llama build `static_library` , que incluye todas las librerías estáticas de cada módulo generado por la compilación normal de Chromium. El otro es `shared_library`, que incluye todas las librerías compartidas de cada módulo generado por la compilación de componentes.

En Electron, la versión de depuración está enlazada con la versión de `shared_library` de libchromiumcontent, porque es pequeño para descargar y toma poco tiempo al enlazar el ejecutable final. Y la versión de lanzamiento de Electron está enlazada con la versión `static_library` de libchromiumcontent, para que el compilador pueda generar símbolos completos que son importantes para la depuración, y el enlazador puede hacer una optimización mucho mejor, ya que sabe qué archivos de objeto son necesarios y cuáles no.

Así que para el desarrollo normal, los desarrolladores sólo necesitan construir la versión de depuración, que no requiere una buena red o una máquina potente. Aunque la versión de lanzamiento requiere un hardware mucho mejor para construir, puede generar mejores binarios optimizados.

## La actualización de `gn`

Siendo uno de los proyectos más grandes del mundo, la mayoría de los sistemas normales no son aptos para construir Chromium, y el equipo de Chromium desarrolla sus propias herramientas de construcción .

Las versiones anteriores de Chromium usaban `gyp` como un sistema de compilación, pero sufre de ser lento, y su archivo de configuración se vuelve difícil de entender para proyectos complejos. Después de años de desarrollo, Chromium cambió a `gn` como un sistema de construcción , el cual es mucho más rápido y tiene una arquitectura clara.

Una de las mejoras de `gn` es introducir `source_set`, que representa un grupo de archivos de objeto. En `gyp`, cada módulo fue representado por `static_library` o `shared_library`, y para la compilación normal de Chromium, cada módulo generó una biblioteca estática y fueron enlazados juntos en el ejecutable final. Al usar `gn`, cada módulo ahora solo genera un puñado de archivos de objeto, y el ejecutable final enlaza todos los archivos objeto juntos, para que los archivos estáticos intermedios ya no se generen.

Sin embargo, esta mejora hizo grandes problemas a libchromiumcontent, porque los archivos intermedios de librería estática eran realmente necesarios por libchromiumcontent.

El primer intento de resolver esto fue [parche `gn` para generar librerías estáticas archivos](https://github.com/electron/libchromiumcontent/pull/239), que resolvió el problema, pero estaba lejos de una solución decente.

El segundo intento fue realizado por [@alespergl](https://github.com/alespergl) a [produce librerías estáticas personalizadas de la lista de archivos de objetos](https://github.com/electron/libchromiumcontent/pull/249). Usó un truco para ejecutar primero una construcción tonta para recolectar una lista de archivos de objetos generados, y luego construye las librerías estáticas alimentando `gn` con la lista. Solo hizo cambios mínimos en el código fuente de Chromium, y mantuvo la arquitectura de construcción de Electron.

## Summary

Como puede ver, comparado con la construcción de Electron como parte de Chromium, la construcción de Chromium como biblioteca toma mayores esfuerzos y requiere mantenimiento continuo . Sin embargo, este último elimina el requerimiento de hardware poderoso para construir Electron, por lo tanto, permitiendo que una gama mucho mayor de desarrolladores para construir y contribuir a Electron. El esfuerzo merece la pena completamente.

