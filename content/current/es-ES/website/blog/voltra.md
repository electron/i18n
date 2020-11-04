---
title: 'Proyecto de la Semana: Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '07-03-2017'
---

Esta semana nos hemos reunido con [Aprile Elcich](https://twitter.com/aprileelcich) y [Paolo Fragomeni](https://twitter.com/0x00A) para hablar de Voltra, un reproductor de música propulsado por Electron.

---

## ¿Qué es Voltra?

[Voltra](https://voltra.co/) es un reproductor de música para personas que quieren tener su música. También es una tienda donde podrás descubrir y comprar música nueva basada en lo que ya posees. Está libre de anuncios, multiplataforma para escritorio y móvil. Tampoco te espía.

[![vista voltra-artista](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## ¿Para quién es Voltra?

Cualquiera que escuche la música.

## ¿Qué te motivó para crear Voltra?

La radio siempre ha tenido una gran proporción de oyentes. Se mueve fuera de las ondas y a Internet. Ahora puedes alquilar música bajo demanda, ¡es una reactivación de la radio! Debido a esto, han surgido muchos nuevos productos y servicios pero la radio de streaming todavía deja a alguien más bajo control de su música y cómo la experimenta.

Queríamos un producto totalmente centrado en la música que usted posee. Algo que hizo fácil descubrir y comprar música nueva directamente de artistas o etiquetas.

## ¿Hay una versión gratuita?

El reproductor de escritorio es completamente gratuito. [¡Vender tu música también es gratis!](https://voltra.co/artists) No tenemos soporte para anuncios.

Puesto que la aplicación es gratuita, podemos abrir código fuente más adelante. Ahora mismo no tenemos el ancho de banda para manejar eso. También tenemos ideas muy concretas sobre las características y la dirección que queremos tomar. Tenemos una comunidad beta activa y nos tomamos en serio nuestros comentarios.

## ¿Cómo ganas dinero?

¡Tenemos características premium!

Nuestro [Voltra Audio Archive](https://voltra.co/premium/) es un servicio de copia de seguridad en la nube diseñado específicamente para música. No comprimimos ni compartimos bloques de datos. Tu colección de música está físicamente respaldada para ti.

Para artistas y etiquetas, nuestra suscripción [Pro](https://voltra.co/artists/pro) ofrece herramientas para ayudarles a llegar a audiencias más relevantes, como análisis y páginas web profesionales de artistas.

## ¿Qué hace Voltra diferente?

El diseño y la usabilidad son increíblemente importantes para nosotros. ¡Queremos dar a los oyentes una experiencia de escucha sin distracción! Hay algunos reproductores de música interesantes y tiendas por ahí. Pero muchos de ellos son más avanzados y difíciles de usar de lo que sus creadores creen. Queremos que Voltra sea accesible para el mayor número de personas posible.

Tampoco tomamos un corte del artista o de la etiqueta. Ese es un diferenciador clave para nosotros. Es realmente importante porque reduce la barrera para que los artistas lleven su música al mercado.

## ¿Qué son algunas decisiones técnicas de diseño & que has tomado?

Mientras diseñábamos Voltra, considerábamos convenciones de UI desde aplicaciones nativas y la web, también pensábamos mucho en lo que podíamos eliminar. Tenemos un grupo beta privado activo que nos ha dado comentarios críticos en los últimos meses.

Encontramos que el arte y la fotografía del álbum son muy importantes para la gente. Muchos reproductores son sólo listas de archivos. Una de las cosas interesantes acerca de poseer álbumes físicos es el arte del álbum, y queríamos poner énfasis en esto en la aplicación de escritorio Voltra.

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

También nos aseguramos de no meternos con los expedientes de la gente. Utilizamos la observación de archivos para que puedas poner tus archivos donde quieras, y no los renombramos ni los movemos por ti. Tenemos una base de datos incrustada para rastrear el estado de los directorios vistos para que podamos rastrear lo que es nuevo, incluso cuando el proceso no se ejecuta.

## ¿Cuáles son algunos de los desafíos a los que se enfrenta mientras construye Voltra?

Pasamos mucho tiempo enfocado en el rendimiento. Comenzamos con frameworks pero nos movemos a vanilla Javascript. Según nuestra experiencia, las abstracciones generalizadas que proporcionan superan las sanciones de rendimiento y la ceremonia que introducen.

En este punto manejamos muy bien las colecciones muy grandes. Colecciones grandes significa posiblemente decenas de miles de imágenes! Tener Node. El módulo de sistema de archivos de s directamente disponible desde el proceso de renderizado hizo que sea muy fácil cargar y descargar muchas imágenes super rápido basado en eventos DOM.

En general, *[setImmediate](https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate)* y *[requestIdleCallback](https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback)* han sido herramientas super importantes para realizar un montón de procesamiento manteniendo la interfaz receptiva. Más específicamente, la distribución de las tareas vinculadas a la CPU en procesos separados realmente ayuda a mantener la interfaz de usuario receptiva. Por ejemplo, hemos movido el contexto de audio real a un proceso separado, comunicarse con él a través de [IPC](https://electronjs.org/docs/glossary/#ipc) para evitar posibles interrupciones desde una interfaz de usuario ocupada.

## ¿Por qué eligió construir Voltra en Electron?

El sandbox del navegador está demasiado restringido para nuestra aplicación. Pero también estamos desarrollando un reproductor web. Así que es una gran victoria que podemos compartir casi el 100% del código entre las dos implementaciones.

En realidad empezamos construyendo una aplicación nativa con Swift. El principal problema que encontramos fue que estábamos reinventando muchas cosas. La web tiene el ecosistema de código abierto más grande del mundo. Así que muy rápidamente cambiamos a Electron.

También, y lo más importante, con Electron usted se desarrolla una vez y debería sólo WorkTM en todas las plataformas principales. No está garantizado, pero el costo de la codificación nativamente para cada plataforma definitivamente supera a cualquier otro costo que introduzca el electrón.

## ¿Cuáles son tus cosas favoritas de Electron?

**GTD!**: Tener la pila de red de Node.js y la capa de presentación de Chromium empaquetada es una receta para hacer las cosas.

**Competencia**: Es sólo la pila web, así que literalmente todo nuestro equipo está involucrado en la construcción real del producto.

**Comunidad**: ¡Hay una comunidad muy organizada que sabe cómo comunicarse realmente bien! Nos sentimos bastante buenos en el desarrollo con apoyo así.

## ¿En qué áreas se podría mejorar Electron?

Nos gustaría ver a Electron endosar un único empaquetador. El empaquetador es tan importante para Electron lo que el gestor de paquetes es para Node. Hay varios empaquetadores en tierra de usuario, cada uno con características interesantes pero cada uno con fallos. El consenso de la comunidad ayudaría a dirigir la energía que gastan los contribuyentes.

## ¿Qué viene después?

Actualmente estamos desarrollando una aplicación móvil y trabajando con artistas y etiquetas para añadir su música a la tienda Voltra. ¡Hola! ¡Si eres artista o etiqueta, [regístrate ahora](https://admin.voltra.co/signup)! Tenemos previsto abrir la tienda cuando alcancemos nuestro objetivo de 10 millones de pistas.

