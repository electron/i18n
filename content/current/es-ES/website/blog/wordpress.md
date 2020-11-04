---
title: 'Proyecto de la semana: WordPress Desktop'
author:
  - mkaz
  - johngodley
  - zeke
date: '28-02-2017'
---

Esta semana nos hemos puesto al día con gente en [Automático](https://automattic.com/) a hablar sobre [WordPress Desktop](https://apps.wordpress.com/desktop/), un cliente de escritorio de código abierto para gestionar el contenido de WordPress.

---

[![Apps WordPress](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## Todo el mundo sabe de WordPress, pero ¿qué es WordPress Desktop?

La [WordPress. om Desktop app](https://apps.wordpress.com/desktop/) proporciona una experiencia multiplataforma perfecta que le permite centrarse en su contenido y diseño sin pestañas del navegador para distraerlo — o para mantener sus sitios al margen pero accesible. En combinación con nuestro soporte para el navegador y la aplicación móvil, puede construir su sitio web en cualquier lugar, de cualquier forma que le ayude a llevar a cabo su trabajo.

## ¿Por qué construir una aplicación de escritorio para gestionar sitios WordPress? ¿No se pudo basar todo en la web?

En realidad está utilizando exactamente la misma tecnología que obtienes cuando visitas [WordPress.com](https://wordpress.com) en tu navegador. Sin embargo, todo está alojado localmente, por lo que tiene unos tiempos de carga mínimos. Con el beneficio de características nativas como estar en tu muelle, notificaciones, etc., realmente puedes centrarte en tus sitios de WordPress y bloging.

## ¿Por qué eligió construir WordPress en Electron?

A finales de 2015 reconstruimos gran parte de WordPress.com en forma de [Calypso](https://github.com/automattic/wp-calypso), una aplicación de código abierto moderna de JavaScript usando React. Comenzamos a mirar a Electron y con algunos cambios en Calypso fueron capaces de ponerlo en funcionamiento localmente. Fue una experiencia convincente y pensamos que tenía mucho valor desarrollarla aún más.

Teníamos varios equipos trabajando en Calypso. Para hacer un cliente multiplataforma completo de GUI que concuerde con esto utilizando tecnologías tradicionales de escritorio habría tomado más trabajo. Usando Electron, un pequeño equipo de 2-4 de nosotros pudimos aprovechar los esfuerzos del otro equipo y construir la aplicación de escritorio en un par de meses.

## ¿Cuáles son algunos de los retos a los que te enfrentaste mientras construyes WordPress Desktop?

Tenemos una versión inicial de la aplicación funcionando muy rápidamente, pero sintonizarlo para comportarse de forma óptima como una aplicación de escritorio tomó mucho más tiempo. Un gran desafío con la aplicación es que realmente estás ejecutando una copia de Calypso en tu propia máquina: es puramente una interfaz de usuario basada en API. Había mucho trabajo de freno en esto, y los cambios se devolvieron a Calypso en sí mismo.

Además, se ha invertido un gran esfuerzo en empaquetar la aplicación para diferentes plataformas - proporcionamos Windows, versiones de macOS y Linux - y hay suficientes diferencias para hacer esto complicado.

En el momento Electron era relativamente nuevo y seguimos encontrando problemas que en breve fueron arreglados (a veces el mismo día!)

## ¿En qué áreas debe mejorarse Electron?

Electron ya proporciona la mayor parte de lo que necesitamos para la aplicación de escritorio, y está progresando rápidamente desde que empezamos a usarlo. Dicho esto, hay algunas áreas que se dan por sentadas en una aplicación de escritorio, tal como comprobación ortográfica y encontrar/reemplazar, que son más difíciles de replicar con Electron tal como es.

También nos encantaría ver que algunas de las nuevas tecnologías de Chrome se filtran en Electron también. Estamos particularmente interesados en experimentar con WebVR.

## ¿Cuáles son tus cosas favoritas de Electron?

La razón principal por la que elegimos Electron, y su mayor fuerza, es la comunidad muy activa y abierta. Automático siempre ha creído en el código abierto. Es uno de nuestros principios básicos, y el proyecto y la comunidad Electron sigue muchas de las creencias fundamentales de ser muy abierto y positivo.

## ¿Qué va a venir a continuación en WordPress Escritorio?

Lo mejor de nuestro modelo es que la aplicación de escritorio se beneficia de cualquier nueva característica de Calypso - hay mejoras constantes. Esperamos poder añadir características adicionales a la aplicación, como el soporte sin conexión, que realmente llevaría la aplicación a territorio nativo, y mejores notificaciones del sistema.

## ¿Hay algún equipo en Automático trabajando en otras aplicaciones de Electron?

Sí, después de nuestros esfuerzos en la aplicación de Escritorio, el equipo Simplenote decidió usar Electron para construir aplicaciones de escritorio para Windows y Linux (ya existe un cliente nativo de Mac). La aplicación [Simplenote Electron](https://github.com/Automattic/simplenote-electron) también es de código abierto y está disponible en Github.

También tenemos una próxima integración Raspberry Pi que utiliza Electron.

¡Si algo de eso suena interesante, entonces [nos encantaría saber de ti](https://automattic.com/work-with-us/)!

## ¿Algún consejo de Electron que pueda ser útil para otros desarrolladores?

El proceso de envío de software firmado de escritorio es relativamente nuevo para nosotros, especialmente para Windows. escribimos un artículo para [Code Signing a Windows App](https://mkaz.blog/code/code-signing-a-windows-application/) que incluye el proceso y algunos de los hurdles que pasamos para hacerlo bien.

