---
title: Soporte de silicio de Apple
author: MarshallOfSound
date: '2020-10-15'
---

Con el hardware de Apple Silicon que se publicará a finales de este año, ¿Cómo se ve la ruta para que tu aplicación Electron funcione en el nuevo hardware?

---

Con el lanzamiento de Electron 11.0.0-beta. , el equipo Electron está enviando versiones de Electron que funcionan con el nuevo hardware de Apple Silicon que Apple planea enviar más adelante este año. Puede obtener la última versión beta con `npm install electron@beta` o descargarla directamente desde nuestra [versión del sitio web](https://electronjs.org/releases/stable).

## ¿Cómo funciona?

A partir de Electron 11, enviaremos versiones separadas de Electron para Intel Macs y Apple Silicon Macs. Antes de este cambio, ya enviábamos dos artefactos, `darwin-x64` y `mas-x64`con este último para el uso de compatibilidad de Mac App Store. Ahora estamos enviando otros dos artefactos, `darwin-arm64` y `mas-arm64`, que son los equivalentes de Apple Silicon de los artefactos antes mencionados.

## ¿Qué debo hacer?

Necesitarás enviar dos versiones de tu aplicación: una para x64 (Intel Mac) y otra para arm64. La buena noticia es que [`electron-packager`](https://github.com/electron/electron-packager/), [`electron-rebuild`](https://github.com/electron/electron-rebuild/) y [`electron-forge`](https://github.com/electron-userland/electron-forge/) ya soporta la `arm64` arquitectura. Mientras esté ejecutando las últimas versiones de estos paquetes, tu aplicación debería funcionar de forma incorrecta una vez que actualices la arquitectura de destino a `arm64`.

En el futuro, lanzaremos un paquete que te permitirá "combinar" tus `arm64` y `x64` aplicaciones en un solo binario universal, pero vale la pena señalar que este binario sería _enorme_ y probablemente no sea ideal para el envío a los usuarios.

## Posibles problemas

### Módulos nativos

Como está apuntando a una nueva arquitectura, necesitará actualizar varias dependencias que pueden causar problemas de compilación. La versión mínima de ciertas dependencias se incluye a continuación para su referencia.

| Dependencia         | Requisitos de la versión |
| ------------------- | ------------------------ |
| Xcode               | `>=12.2.0`            |
| `node-gyp`          | `>=7.1.0`             |
| `electron-rebuild`  | `>=1.12.0`            |
| `electron-packager` | `>=15.1.0`            |

Como resultado de estos requerimientos de la versión de dependencias, es posible que tengas que arreglar/actualizar ciertos módulos nativos.  Una cosa importante es que la actualización de Xcode introducirá una nueva versión del SDK de macOS, que puede causar fallos en la compilación de sus módulos nativos.


## ¿Cómo lo compruebo?

Actualmente, las aplicaciones de Apple Silicon sólo funcionan con el hardware de Apple Silicon que no está disponible comercialmente en el momento de escribir este post en el blog. Si tienes un [kit de transición de desarrollador](https://developer.apple.com/programs/universal/), puedes probar tu aplicación en eso. De lo contrario, tendrá que esperar a la liberación de la producción de hardware Apple Silicon para probar si su aplicación funciona.

## ¿Y qué ocurre con Rosetta 2?

Rosetta 2 es la última iteración de su tecnología de [Rosetta](https://en.wikipedia.org/wiki/Rosetta_(software)) . que le permite ejecutar aplicaciones x64 Intel en su nuevo hardware de Apple Silicon arm64. Aunque creemos que las aplicaciones x64 Electron funcionarán en Rosetta 2, hay algunas cosas importantes a tener en cuenta (y razones por las que debería enviar un binario arm64 nativo).

* El rendimiento de tu aplicación se degradará significativamente. Electron / V8 usa la compilación [JIT](https://en.wikipedia.org/wiki/Just-in-time_compilation) para JavaScript, y debido a cómo funciona Rosetta Usted ejecutará efectivamente JIT dos veces (una en V8 y otra en Rosetta).
* Usted pierde el beneficio de la nueva tecnología en Apple Silicon, como el mayor tamaño de la página de memoria.
* ¿Mencionamos que el rendimiento será **significativamente** degradado?
