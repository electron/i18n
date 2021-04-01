---
title: Electron 2.0.0
author: ckerr
date: '2018-05-02'
---

Después de más de cuatro meses de desarrollo, ocho versiones beta y pruebas en todo el mundo desde el despliegue de muchas aplicaciones, el lanzamiento de Electron 2. .0 está ahora disponible en [electronjs.org](https://electronjs.org/).

---

## Proceso de lanzamiento

A partir de 2.0.0, Electron lanzará [versión semántica](https://electronjs.org/blog/electron-2-semantic-boogaloo). Esto significa que la versión más importante vendrá más a menudo y que normalmente será una actualización importante de Chromium. Las versiones de parches deberían ser más estables porque sólo contendrán correcciones de errores de alta prioridad.

Electron 2.0.0 también representa una mejora a la forma en que Electron se estabiliza antes de una versión mayor. Varias aplicaciones Electron de gran escala han incluido 2.0.0 betas en las etapas de lanzamiento, proporcionando el mejor ciclo de retroalimentación que Electron haya tenido para una serie beta.

## Cambios / Nuevas características

 * La mayoría golpea a varias partes importantes de la cadena de herramientas de Electron, incluyendo Chrome 61, Nodo 8.9.3, V8 6.1.534.41, GTK+ 3 en Linux, corrector ortográfico actualizado y ardilla.
 * [Las compras dentro de la aplicación](https://electronjs.org/blog/in-app-purchases) ahora son compatibles con MacOS. [#11292](https://github.com/electron/electron/pull/11292)
 * Nueva API para cargar archivos. [#11565](https://github.com/electron/electron/pull/11565)
 * Nueva API para activar/desactivar una ventana. [#11832](https://github.com/electron/electron/pull/11832)
 * New API app.setLocale(). [#11469](https://github.com/electron/electron/pull/11469)
 * Nuevo soporte para registrar mensajes IPC. [#11880](https://github.com/electron/electron/pull/11880)
 * Nuevos eventos de menú. [#11754](https://github.com/electron/electron/pull/11754)
 * Añade un evento de `apagado` a powerMonitor. [#11417](https://github.com/electron/electron/pull/11417)
 * Añadir la opción `affinity` para recolectar varios BrowserWindows en un solo proceso. [#11501](https://github.com/electron/electron/pull/11501)
 * Añadir la capacidad para saveDialog a la lista de extensiones disponibles. [#11873](https://github.com/electron/electron/pull/11873)
 * Soporte para acciones adicionales de notificación [#11647](https://github.com/electron/electron/pull/11647)
 * La capacidad de configurar el título del botón de cierre de notificación de macOS. [#11654](https://github.com/electron/electron/pull/11654)
 * Añadir condicional para menu.popup(window, callback)
 * Mejoras de memoria en elementos de la barra táctil. [#12527](https://github.com/electron/electron/pull/12527)
 * Mejorada la lista de verificación de recomendaciones de seguridad.
 * Añadir marcadores de ámbito de seguridad de ámbito de la aplicación. [#11711](https://github.com/electron/electron/pull/11711)
 * Agrega la posibilidad de establecer argumentos arbitrarios en un proceso de renderizado. [#11850](https://github.com/electron/electron/pull/11850)
 * Añadir vista accesoria para el selector de formato. [#11873](https://github.com/electron/electron/pull/11873)
 * Fijado estado de carrera del delegado de la red. [#12053](https://github.com/electron/electron/pull/12053)
 * Soporte para soltar el arch `mips64el` en Linux. Electron requiere la cadena de herramientas C++14, que no estaba disponible para ese arco en el momento de la liberación. Esperamos volver a añadir apoyo en el futuro.

## Rompiendo cambios de API

 * Se han eliminado [APIs obsoletas](https://github.com/electron/electron/blob/v2.0.0-beta.8/docs/tutorial/planned-breaking-changes.md), incluyendo:
   * Se ha cambiado la firma `menu.popup`. [#11968](https://github.com/electron/electron/pull/11968)
   * Eliminado obsoleto `crashReporter.setExtraParameter` [#11972](https://github.com/electron/electron/pull/11972)
   * Eliminado `webContents.setZoomLevelLimits` y `webFrame.setZoomLevelLimits`. [#11974](https://github.com/electron/electron/pull/11974)
   * Se eliminaron los métodos del `portapapeles` desaprobados. [#11973](https://github.com/electron/electron/pull/11973)
   * Se ha eliminado el soporte para parámetros booleanos para `tray.setHighlightMode`. [#11981](https://github.com/electron/electron/pull/11981)

## Corrección de errores

 * Cambiado para asegurarse de que `webContents.isOffscreen()` esté siempre disponible. [#12531](https://github.com/electron/electron/pull/12531)
 * Solucionado `BrowserWindow.getFocusedWindow()` cuando DevTools está desacoplado y enfocado. [#12554](https://github.com/electron/electron/pull/12554)
 * La precarga fija no se carga en el renderizado de un bocadillo si la ruta de precarga contiene caracteres especiales. [#12643](https://github.com/electron/electron/pull/12643)
 * Corregir el valor por defecto de allowRunningInsecureContent según documentos. [#12629](https://github.com/electron/electron/pull/12629)
 * Transparencia fija en nativeImage. [#12683](https://github.com/electron/electron/pull/12683)
 * Se ha solucionado un problema con `Menu.buildFromTemplate`. [#12703](https://github.com/electron/electron/pull/12703)
 * Las opciones menu.popup confirmadas son objetos. [#12330](https://github.com/electron/electron/pull/12330)
 * Se ha eliminado una condición de carrera entre la creación de nuevos procesos y la liberación de contexto. [#12361](https://github.com/electron/electron/pull/12361)
 * Actualizar regiones arrastrables al cambiar BrowserView. [#12370](https://github.com/electron/electron/pull/12370)
 * Detección de teclas alta, fija en el foco. [#12235](https://github.com/electron/electron/pull/12235)
 * Se corrigieron advertencias incorrectas en las vistas web. [#12236](https://github.com/electron/electron/pull/12236)
 * Se corrigió la herencia de la opción 'mostrar' desde las ventanas padres. [#122444](https://github.com/electron/electron/pull/122444)
 * Asegúrese de que `getLastCrashReport()` es el último informe de error. [#12255](https://github.com/electron/electron/pull/12255)
 * Se ha corregido el requerimiento en la ruta de compartición de red. [#12287](https://github.com/electron/electron/pull/12287)
 * Menú contextual fijo haga clic en callback. [#12170](https://github.com/electron/electron/pull/12170)
 * Posición fija del menú emergente. [#12181](https://github.com/electron/electron/pull/12181)
 * Mejora de la limpieza del bucle libuv. [#11465](https://github.com/electron/electron/pull/11465)
 * Solucionado `hexColorDWORDToRGBA` para colores transparentes. [#11557](https://github.com/electron/electron/pull/11557)
 * Reparado de referencia de puntero nulo con api getWebPreferencias. [#12245](https://github.com/electron/electron/pull/12245)
 * Se ha corregido una referencia cíclica en el delegado del menú. [#11967](https://github.com/electron/electron/pull/11967)
 * Filtrado de protocolo fijo de net.request. [#11657](https://github.com/electron/electron/pull/11657)
 * WebFrame.setVisualZoomLevelLimits ahora establece restricciones de escala user-agent [#12510](https://github.com/electron/electron/pull/12510)
 * Establecer los valores predeterminados apropiados para las opciones de visualización web. [#12292](https://github.com/electron/electron/pull/12292)
 * Soporte de vibración mejorado. [#12157](https://github.com/electron/electron/pull/12157) [#12171](https://github.com/electron/electron/pull/12171) [#11886](https://github.com/electron/electron/pull/11886)
 * Se ha corregido un problema de temporización en un solo letón.
 * Corregido caché de producción roto en NotifierSupportsActions()
 * Compatible con camelCase de roles de MenuItem fabricado. [#11532](https://github.com/electron/electron/pull/11532)
 * Actualizaciones mejoradas de la barra táctil. [#11812](https://github.com/electron/electron/pull/11812), [#11761](https://github.com/electron/electron/pull/11761).
 * Eliminados los separadores de menú extra. [#11827](https://github.com/electron/electron/pull/11827)
 * Corregido error del selector Bluetooth. Cerrar [#11399](https://github.com/electron/electron/pull/11399).
 * Corregido macos Pantalla Completa Alternar etiqueta de elemento de menú. [#11633](https://github.com/electron/electron/pull/11633)
 * Se ha mejorado el ocultamiento de la descripción cuando se desactiva una ventana. [#11644](https://github.com/electron/electron/pull/11644)
 * Migrado método de visualización web obsoleto. [#11798](https://github.com/electron/electron/pull/11798)
 * Se corrigió cerrar una ventana abierta desde una vista de navegador. [#11799](https://github.com/electron/electron/pull/11799)
 * Corregido error del selector Bluetooth. [#11492](https://github.com/electron/electron/pull/11492)
 * Actualizado para utilizar el planificador de tareas para la API app.getFileIcon. [#11595](https://github.com/electron/electron/pull/11595)
 * Cambiado para disparar el evento de `mensaje de consola` incluso cuando se procesa fuera de pantalla. [#11921](https://github.com/electron/electron/pull/11921)
 * Se corrigió la descarga de protocolos personalizados usando `WebContents.downloadURL`. [#11804](https://github.com/electron/electron/pull/11804)
 * Ventanas transparentes que pierden transparencia cuando devtools se desprende. [#11956](https://github.com/electron/electron/pull/11956)
 * Aplicaciones de Electron corregidas cancelando el reinicio o el apagado. [#11625](https://github.com/electron/electron/pull/11625)

### macOS
 * Fijada fuga de eventos al reutilizar el artículo de la barra táctil. [#12624](https://github.com/electron/electron/pull/12624)
 * Resaltar la bandeja fija en modo oscuro. [#12398](https://github.com/electron/electron/pull/12398)
 * Arreglado proceso principal de bloqueo para diálogo asíncrono. [#12407](https://github.com/electron/electron/pull/12407)
 * Corregido `setTitle` cuelga la bandeja [#12356](https://github.com/electron/electron/pull/12356)
 * Se ha corregido el error al ajustar el menú de acoplamiento. [#12087](https://github.com/electron/electron/pull/12087)

### Linux
 * Mejores notificaciones de escritorio para Linux. [#12229](https://github.com/electron/electron/pull/12229) [#12216](https://github.com/electron/electron/pull/12216) [#11965](https://github.com/electron/electron/pull/11965) [#11980](https://github.com/electron/electron/pull/11980)
 * Mejor soporte para temas GTK+ para menús. [#12331](https://github.com/electron/electron/pull/12331)
 * Salir en linux. [#12139](https://github.com/electron/electron/pull/12139)
 * Utilice el nombre de la aplicación como la descripción predeterminada del icono de la bandeja. [#12393](https://github.com/electron/electron/pull/12393)

### Windows
 * Se ha añadido soporte para Visual Studio 2017. [#11656](https://github.com/electron/electron/pull/11656)
 * Se corrigió el paso de la excepción al manejador de fallos del sistema. [#12259](https://github.com/electron/electron/pull/12259)
 * Se ha corregido la descripción de ocultación de la ventana minimizada. [#11644](https://github.com/electron/electron/pull/11644)
 * Solucionado `escritorioCapturador` para capturar la pantalla correcta. [#11664](https://github.com/electron/electron/pull/11664)
 * Solucionado `desableHardwareAcceleration` con transparencia. [#11704](https://github.com/electron/electron/pull/11704)

# Lo siguiente

El equipo de Electron está trabajando duro para soportar nuevas versiones de Chromium, Node, y v8. Espere 3.0.0-beta.1 pronto!
