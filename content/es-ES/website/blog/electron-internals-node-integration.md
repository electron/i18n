---
title: 'Electron Internals: Integración de bucle de mensaje'
author: zcbenz
date: '28-07-2016'
---

Este es el primer post de una serie que explica los internos de Electron. Esta publicación introduce cómo se integra el bucle de eventos de Node con Chromium en Electron.

---

Ha habido muchos intentos de usar Node para programación GUI, como [node-gui](https://github.com/zcbenz/node-gui) para enlaces GTK+ y [node-qt](https://github.com/arturadib/node-qt) para enlaces QT. Pero ninguno de ellos funciona en producción porque los kits de herramientas GUI tienen su propio bucle de mensaje mientras que Node usa libuv para su propio bucle de eventos, y el hilo principal sólo puede ejecutar un bucle al mismo tiempo. Así que el truco común para ejecutar un bucle de mensajes GUI en Node es bombear el bucle del mensaje en un temporizador con un intervalo muy pequeño, que hace lenta la respuesta de interfaz GUI y ocupa muchos recursos de CPU.

Durante el desarrollo de Electron nos encontramos con el mismo problema, aunque de una manera invertida: tuvimos que integrar el bucle de eventos de Node en el bucle del mensaje de Chromium.

## El proceso principal y proceso de renderizado

Antes de que nos sumerjamos en los detalles de la integración del bucle de mensajes, primero explicaré la arquitectura multi-proceso de Chromium.

En Electron hay dos tipos de procesos: el proceso principal y el proceso de renderizador (esto en realidad es extremadamente simplificado, para una vista completa por favor vea [Archivación multiproceso](http://dev.chromium.org/developers/design-documents/multi-process-architecture)). El proceso principal es responsable de GUI trabajar como crear ventanas, mientras que el proceso de renderizado solo se ocupa de ejecutar y renderizar páginas web.

Electron permite usar JavaScript para controlar tanto el proceso principal como el proceso de renderizado , lo que significa que tenemos que integrar Node en ambos procesos.

## Sustituyendo el bucle de mensajes de Chromium por libuv

Mi primer intento fue reimplementar el bucle de mensajes de Chromium con libuv.

Fue fácil para el proceso de renderizado, ya que su bucle de mensajes solo escuchó descriptores de archivos y temporizadores, y sólo necesitaba implementar la interfaz con libuv.

Sin embargo, fue mucho más difícil para el proceso principal. Cada plataforma tiene su propio tipo de bucles de mensajes GUI. macOS Chromium usa `NSRunLoop`, mientras que Linux usa glib. Intenté muchos hacks para extraer los descriptores de archivos subyacentes de los bucles nativos de mensajes GUI, y luego alimentó a libuv para iteración, pero todavía conocí casos de borde que no funcionaban.

Así que finalmente añadí un temporizador para sondear el bucle de mensajes GUI en un intervalo pequeño. Como resultado el proceso tomó un uso constante de la CPU, y ciertas operaciones tuvieron largos retrasos.

## Elegir el bucle de eventos del nodo en un hilo separado

A medida que la libuv maduraba, entonces era posible adoptar otro enfoque.

El concepto de fd del backend se introdujo en libuv, que es un descriptor de archivo (o manejador) que las encuestas de libuv para su bucle de eventos. Así que al sondear el fd del backend es posible recibir una notificación cuando hay un nuevo evento en libuv.

Así que en Electron creé un hilo separado para sondear el fd del backend, y puesto que yo estaba usando las llamadas del sistema para sondeo en lugar de las API de libuv, era hilo seguro. Y cada vez que hubo un nuevo evento en el bucle de eventos de libuv, un mensaje sería publicado en el bucle de mensajes de Chromium, y los eventos de libuv entonces serían procesados en el hilo principal.

De esta manera evité parchear el cromo y el nodo, y el mismo código se utilizó en tanto el proceso principal como el proceso de renderizado.

## El código

You can find the implemention of the message loop integration in the `node_bindings` files under [`electron/atom/common/`][node-bindings]. Puede reutilizarse fácilmente para proyectos que quieran integrar Node.

*Actualización: Implementación movida a [`electron/shell/common/node_bindings.cc`][node-bindings-updated].*

[node-bindings]: https://github.com/electron/electron/tree/main/atom/common
[node-bindings-updated]: https://github.com/electron/electron/blob/master/shell/common/node_bindings.cc
