---
title: 'Proyecto de la Semana: Kap'
author:
  - skllcrn
  - sindresorhus
  - zeke
date: '31-01-2017'
---

La comunidad Electron está creciendo rápidamente y la gente está creando poderosas nuevas aplicaciones y herramientas a un ritmo increíble. Para celebrar este impulso creativo y mantener informada a la comunidad de algunos de estos nuevos proyectos. hemos decidido iniciar una serie semanal de blogs con proyectos notables relacionados con Electron.

---

Esta publicación es la primera en la serie, y características [Kap](https://getkap.co/), una aplicación de grabación de pantalla de código abierto construida por [Wulkano](https://wulkano.com/), un equipo distribuido geográficamente de diseñadores y desarrolladores freelance.

[![Cerrar pantalla](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## ¿Qué es Kap?

[Kap es una grabadora de pantalla de código abierto](https://getkap.co) creada principalmente para diseñadores y desarrolladores para capturar fácilmente su trabajo. La gente lo usa para compartir prototipos animados, errores de documentos, crear GIF tontos y todo lo que está en medio.

Hemos visto a gente de todas las edades y fondos usarlo en entornos educativos, screencasts, tutoriales... la lista continúa. ¡Incluso para crear activos de producción! Estamos completamente soplados por lo bien recibido que ha sido nuestro pequeño proyecto lateral.

## ¿Por qué lo construyiste?

Es una pregunta muy buena, no es como que haya falta de grabadoras de pantalla por ahí! Pensamos que las alternativas eran demasiado complejas, demasiado caras o demasiado limitadas. Nada se sentía *justo* para nuestras necesidades diarias. También creemos que es genial cuando las herramientas que utilizamos para hacer nuestro trabajo son de código abierto, de esa manera todo el mundo puede ayudarles a moldearlas. [Compilación terminó siendo igual de lo que no hicimos](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38). Todo esto en los detalles, una acumulación de pequeñas mejoras que se convirtieron en el contorno de una herramienta que queríamos utilizar.

Sin embargo, y tal vez lo más importante, Kap se ha convertido en un lugar para dejar nuestras preocupaciones en la puerta y divertirse construyendo algo para nosotros mismos y personas como nosotros. Es tan importante crear un ambiente en el que te puedas relajar, probar nuevas finas y disfrutar de tu artesanía. Sin requisitos, sin presión, sin expectativas. ¿Deben los diseñadores y desarrolladores acompañar el proyecto? ¿Por qué, sí? Sí, deberían hacerlo.

## ¿Por qué eligió construir Kap en Electron?

Había una serie de razones:

* Tecnología web
* La mayoría del equipo son desarrolladores web
* Estamos invertidos en JavaScript
* Abre la puerta para que más personas contribuyan
* Electron mismo es de código abierto
* La potencia y la modularidad fácilmente mantenible de `node_modules`
* Posibilidades multiplataforma

Creemos que el futuro de las aplicaciones está en el navegador, pero todavía no estamos ahí. Electron es un paso importante en el camino hacia ese futuro. No sólo hace que las aplicaciones mismas sean más accesibles, sino también el código con el que están construidos. Un pensamiento interesante es imaginar un futuro donde el sistema operativo es un navegador, y las pestañas son esencialmente aplicaciones Electron .

Adicionalmente, siendo principalmente desarrolladores web, somos grandes fans de la naturaleza isomórfica de JavaScript, para que pueda ejecutar JS en el cliente, servidor y ahora el escritorio. Con la tecnología web (HTML, CSS y JS), muchas cosas son mucho más simples que nativas: prototipos más rápidos, menos código, flexbox > auto-layout (macOS/iOS).

## ¿Cuáles son algunos de los desafíos a los que se enfrenta mientras construye Kap?

Usando los recursos que Electron tiene disponible para grabar la pantalla fue el mayor desafío. Sencillamente, no funcionaron lo suficiente como para satisfacer nuestros requerimientos y harían del proyecto un fracaso en nuestros ojos. Aunque no tiene ninguna culpa de Electron en sí mismo, todavía hay una brecha entre el desarrollo nativo y la construcción de aplicaciones de escritorio con tecnología web.

Pasamos mucho tiempo tratando de solucionar el pobre rendimiento de la API de `getUserMedia` , un problema que se originó en Chromium. Uno de nuestros principales objetivos cuando comenzamos a hacer Kap era construir toda la aplicación con tecnología web. Después de intentar todo lo que pudimos hacer que funcionara (el requisito mínimo es 30 FPS en una pantalla de Retina), Al final tuvimos que encontrar otra solución.

## Veo un poco de código Swift en el repo. ¿De qué se trata?

Al ser forzado a buscar alternativas a `getUserMedia`, empezamos a experimentar con `ffmpeg`. Además de ser una de las mejores herramientas para la conversión de audio y video tiene la funcionalidad de grabar la pantalla en casi cualquier sistema operativo, y pudimos grabar vídeo crispado que cumplía con nuestro requisito mínimo de 30 FPS en una pantalla de Retina. ¿Problema? El rendimiento fue ":weary:", el uso de CPU estaba yendo haywire. Así que volvimos a la mesa de dibujo, discutimos nuestras opciones y nos dimos cuenta de que teníamos que llegar a un compromiso. Esto resultó en [Apertura](https://github.com/wulkano/aperture), nuestra propia biblioteca de grabación de pantalla para macOS escrita en Swift.

## ¿En qué áreas debe mejorarse Electron?

Todos sabemos que las aplicaciones Electron pueden tener algo para usar RAM, pero de nuevo, eso es realmente una cosa de Chromium. Es parte de cómo funciona y realmente depende de lo que esté ejecutando, por ejemplo Kap y Hyper usan normalmente menos de 100MB de memoria.

Una de las mayores áreas de mejora que vemos es la carga útil, particularmente cómo Electron distribuye Chromium. Una idea sería tener un núcleo compartido de Electron y hacer que los instaladores de aplicaciones comprueben si ya está presente en el sistema.

Crear aplicaciones multiplataforma Electron podría ser una mejor experiencia. Ahora mismo hay demasiadas inconsistencias, APIs específicas de la plataforma y faltan características entre plataformas, haciendo que tu código base esté plagado de sentencias if-else . Por ejemplo, la vibración sólo es compatible con macOS, el autoactualizador funciona de forma diferente en macOS y Windows, y ni siquiera está soportado en Linux. La transparencia es un golpe o una falta en Linux, normalmente falta.

También debería ser más fácil llamar APIs del sistema nativo. Electron viene con un muy buen conjunto de APIs, pero a veces necesitas funcionalidad que no proporciona. Crear un complemento nativo de Node.js es una opción, pero es doloroso trabajar con. Idealmente Electron incluiría una buena API [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) , como [`fastcall`](https://github.com/cmake-js/fastcall). Esto nos habría permitido escribir la parte Swift en JavaScript en su lugar.

## ¿Cuáles son tus cosas favoritas de Electron?

Nuestra cosa favorita es fácilmente el hecho de que cualquier persona con conocimiento de crear para la web puede construir y contribuir a experiencias nativas multiplataforma. Por no mencionar la facilidad y la alegría de desarrollarse en ella, la excelente documentación y el emocionante ecosistema.

Desde una perspectiva de front-end, la construcción de Kap no se sintió diferente a la construcción de un sitio web simple usando APIs del navegador. Electron hace un gran trabajo haciendo que el desarrollo de aplicaciones sea similar (básicamente idéntico) al desarrollo web. Tan simple de hecho, que no había necesidad de marcos o similares para ayudarnos, simplemente limpios y modulares JS y CSS.

También somos grandes fans del equipo que la construye, su dedicación y apoyo, y la comunidad activa y amistosa que mantienen. ¡Abuja a todos usted!

## ¿Qué va a venir en Kap?

El siguiente paso para nosotros es revisar la aplicación en preparación para nuestra 2.0. hito, que incluye una reescritura React además de soporte para plugins, permitiendo a los desarrolladores extender la funcionalidad de Kap! Invitamos a todos a seguir el proyecto y contribuir en nuestro [repositorio GitHub](https://github.com/wulkano/kap). Estamos escuchando y queremos escuchar de tantos de ustedes como sea posible, [déjanos saber cómo podemos hacer de Kap la mejor herramienta posible que puede ser para ti](https://wulkano.typeform.com/to/BIvJKz)!

## ¿Qué es Wulkano?

[Wulkano](https://wulkano.com) es un estudio de diseño y colectividad digital, un equipo de tecnólogos remotos a los que les encanta trabajar juntos tanto en gigs clientes como en nuestros propios proyectos. Somos un grupo de personas distribuidas pero estrechas de diferentes lugares y orígenes, compartiendo conocimientos, ideas, experiencias, pero lo más importante es que GIFs y memes tontos, en nuestra oficina virtual (que es el Slack basado en Electron!).

## ¿Algún consejo de Electron que pueda ser útil para otros desarrolladores?

Aprovecha e involúcrate en la fantástica [comunidad](https://discuss.atom.io/c/electron), echa un vistazo a [increíble Electron](https://github.com/sindresorhus/awesome-electron), ¡mira los [ejemplos](https://github.com/electron/electron-api-demos) y haz uso de la gran [documentación](https://electronjs.org/docs/)!

