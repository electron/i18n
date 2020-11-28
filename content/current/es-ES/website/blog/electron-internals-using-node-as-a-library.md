---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '08-08-2016'
---

Esta es la segunda publicación de una serie en curso explicando los internos de Electron. Echa un vistazo a la [primera publicación](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) sobre integración de bucles de eventos si aún no lo has hecho.

La mayoría de la gente usa [Nodo](https://nodejs.org) para aplicaciones del lado del servidor, pero debido al rico conjunto de API de Node, y a la comunidad emocionante, también es un buen ajuste para una biblioteca incrustada. Esta publicación explica cómo se utiliza Node como una biblioteca en Electron.

---

## Construir sistema

Tanto Node como Electron usan [`GYP`](https://gyp.gsrc.io) como sus sistemas de compilación. Si quieres incrustar Nodo dentro de tu aplicación, también tienes que usarlo como sistema de compilación.

¿Nuevo en `GYP`? Leer [esta guía](https://gyp.gsrc.io/docs/UserDocumentation.md) antes de continuar en esta publicación.

## Banderas del nodo

El nodo [`. yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) archivo en el directorio de código fuente de Node describe cómo se construye el Node , junto con un montón de [`GYP`](https://gyp.gsrc.io) variables que controlan qué partes de Node están habilitadas y si abrir ciertas configuraciones.

Para cambiar las banderas de construcción, necesita establecer las variables en el archivo `.gypi` de su proyecto. El script `configure` en Node puede generar algunas configuraciones comunes, por ejemplo ejecutando `. configure --shared` generará un `config.gypi` con variables indicando que el nodo sea construido como una biblioteca compartida.

Electron no utiliza el script `configure` ya que tiene sus propios scripts de compilación. Las configuraciones para Node se definen en el archivo [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) en el directorio raíz del código fuente de Electron.

## Enlazar nodo con Electron

In Electron, Node is being linked as a shared library by setting the `GYP` variable `node_shared` to `true`, so Node's build type will be changed from `executable` to `shared_library`, and the source code containing the Node's `main` entry point will not be compiled.

Puesto que Electron utiliza la librería V8 que se envía con Chromium, no se utiliza la librería V8 incluida en el código fuente de Node. Esto se hace estableciendo `node_use_v8_platform` y `node_use_bundled_v8` a `false`.

## Biblioteca compartida o biblioteca estática

Al enlazar con Node, hay dos opciones: puede construir Node como una librería estática e incluirlo en el ejecutable final, o puedes construirla como una biblioteca compartida y enviarla junto al ejecutable final.

En Electron, Node se construyó como una biblioteca estática durante mucho tiempo. Esto hizo que la construcción de fuera simple, habilitó las mejores optimizaciones del compilador, y permitió que Electron fuera distribuido sin un archivo `node.dll` extra.

Sin embargo, esto cambió después de que Chrome cambiara para usar [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL es una bifurcación de [OpenSSL](https://www.openssl.org) que elimina varias API no utilizadas y cambia muchas interfaces existentes. Dado que Node todavía utiliza OpenSSL, el compilador generaría numerosos errores de enlace debido a símbolos en conflicto si estuvieran enlazados juntos.

Electron no pudo usar BoringSSL en Node, o usar OpenSSL en Chromium, así que la única opción era cambiar a construir Node como una biblioteca compartida, y [ocultar los símbolos BoringSSL y OpenSSL](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) en los componentes de cada uno.

Este cambio trajo Electron algunos efectos secundarios positivos. Antes de este cambio , no se pudo renombrar el archivo ejecutable de Electron en Windows si usó módulos nativos porque el nombre del ejecutable estaba duramente codificado en la biblioteca de importación. Después de que Node se construyó como una biblioteca compartida, esta limitación se eliminó porque todos los módulos nativos estaban enlazados al nodo `. ll`, cuyo nombre no necesitaba ser cambiado.

## Soportando módulos nativos

[Los módulos nativos](https://nodejs.org/api/addons.html) en Node funcionan definiendo una función de entrada para la carga de Node, y luego buscando los símbolos de V8 y libuv desde Node. Esto es un poco problemático para los incrustadores porque por defecto los símbolos de V8 y libuv están ocultos al construir Node como una biblioteca y los módulos nativos no cargarán porque no pueden encontrar los símbolos.

Así que para que los módulos nativos funcionen, los símbolos V8 y libuv fueron expuestos en Electron. Para V8 esto se hace [obligando a todos los símbolos en el archivo de configuración de Chromium a ser expuestos](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). Para libuv, se consigue estableciendo [la definición `BUILDING_UV_SHARED=1`](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228).

## Iniciando Nodo en tu aplicación

Después de todo el trabajo de construcción y enlace con Node, el paso final es ejecutar Node en tu aplicación.

Node no proporciona muchas API públicas para incrustarse en otras aplicaciones. Generalmente, puedes simplemente llamar a [`node::Start` y `node::Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) para iniciar una nueva instancia de Node. Sin embargo, si estás construyendo una aplicación compleja basada en Node, tienes que usar APIs como `node::CreateEnvironment` para controlar con precisión cada paso.

En Electron, el nodo se inicia en dos modos: el modo independiente que se ejecuta en el proceso principal . que es similar a los binarios oficiales del Nodo, y el modo incrustado que inserta las APIs del Nodo en las páginas web. Los detalles de esto se explicarán en una publicación futura.

