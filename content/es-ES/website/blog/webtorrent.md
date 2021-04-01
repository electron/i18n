---
title: 'Proyecto de la Semana: WebTorrent'
author:
  - feross
  - zeke
date: '2017-03-14'
---

Esta semana hemos alcanzado con [@feross](https://github.com/feross) y [@dcposch](https://github.com/dcposch) para hablar sobre WebTorrent, el cliente torrent propulsado por web que conecta a los usuarios juntos para formar una red distribuida y descentralizada entre navegadores.

---

## ¿Qué es WebTorrent?

[WebTorrent](https://webtorrent.io) es el primer cliente torrent que funciona en el navegador. Está escrito completamente en JavaScript y puede utilizar WebRTC para el transporte entre pares. No se requiere ningún plugin de navegador, extensión o instalación.

Usando estándares web abiertos, WebTorrent conecta a los usuarios del sitio web para formar una red de navegadores descentralizada y distribuida entre el navegador para una transferencia eficiente de archivos.

Puedes ver una demostración de WebTorrent en acción aquí: [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="página web webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## ¿Por qué es genial?

Imagina un sitio de vídeo como YouTube, pero donde los visitantes ayudan a alojar el contenido del sitio. Cuantas más personas usen un sitio web propulsado por WebTorrent, más rápido y resistente se vuelve.

La comunicación del navegador a navegador corta al mediano y permite a la gente comunicarse en sus propios términos. No más cliente/servidor - sólo una red de pares, todos iguales. WebTorrent es el primer paso en el viaje para volver a descentralizar la Web.

## ¿Dónde entra Electron en la foto?

Hace aproximadamente un año, decidimos construir [WebTorrent Desktop](https://webtorrent.io/desktop/), una versión de WebTorrent que se ejecuta como aplicación de escritorio.

[![Ventana del reproductor de Escritorio WebTorrent](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

Hemos creado WebTorrent Desktop por tres razones:

1. Queríamos una aplicación torrent de código abierto, limpia y ligera, libre de anuncios
2. Queríamos una aplicación torrent con buen soporte de streaming
3. Necesitamos un "cliente híbrido" que conecte las redes BitTorrent y WebTorrent

## Si ya podemos descargar torrents en mi navegador web, ¿por qué una aplicación de escritorio?

En primer lugar, un poco de fondo sobre el diseño de WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="logo del escritorio webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

En los primeros días, BitTorrent utilizó TCP como su protocolo de transporte. Más tarde, uTP llegó prometiendo un mejor rendimiento y ventajas adicionales sobre TCP. Cada cliente ream torrent finalmente adoptado uTP, y hoy puede utilizar BitTorrent sobre cualquier protocol. El protocolo WebRTC es el siguiente paso lógico. Aporta la promesa de interoperabilidad con los navegadores web – una gigantesca red P2P compuesta por todos los clientes de escritorio BitTorrent y millones de navegadores web.

Los “pares web” (pares de torrent que se ejecutan en un navegador web) fortalecen la red BitTorrent añadiendo millones de nuevos pares, y difundiendo BitTorrent a decenas de nuevos casos de uso. WebTorrent sigue la especificación BitTorrent lo más cerca posible, para facilitar a los clientes existentes BitTorrent añadir soporte para WebTorrent.

Algunas aplicaciones torrent como [Vuze](https://www.vuze.com/) ya soportan contactos web, pero no queremos esperar a que el resto agregue soporte. **Básicamente, WebTorrent Desktop era nuestra manera de acelerar la adopción del protocolo WebTorrent.** Al hacer una aplicación torrent impresionante que la gente realmente quiere usar, incrementamos el número de pares en la red que pueden compartir torrents con los pares web (i. . usuarios en sitios web).

## ¿Cuáles son algunos casos de uso interesantes para torrents más allá de lo que la gente ya sabe que pueden hacer?

Uno de los usos más emocionantes para WebTorrent es la entrega asistida por pares. Proyectos sin fines de lucro como [Wikipedia](https://www.wikipedia.org/) y el [Archivo de Internet](https://archive.org/) podrían reducir el ancho de banda y los costos de alojamiento al permitir que los visitantes ingresen. El contenido popular se puede servir navegador-a-navegador, rápida y baratamente. El contenido de acceso rara vez se puede servir de forma fiable a través de HTTP desde el servidor de origen.

El archivo de Internet ya ha actualizado sus archivos torrent por lo que funcionan muy bien con WebTorrent. Así que si desea incrustar contenido de archivo de Internet en su sitio, puede hacerlo de una manera que reduzca los costos de alojamiento para el archivo, ¡permitiéndoles dedicar más dinero a archivar realmente la web!

También hay emocionantes casos de uso empresarial, desde CDNs hasta entrega de aplicaciones por P2P.

## ¿Cuáles son algunos de sus proyectos favoritos que utilizan WebTorrent?

![captura de pantalla de gaia](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

Lo más fresco construido con WebTorrent, las manos, es probablemente [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). Es una simple simulación interactiva en 3D de la Vía Láctea. Los datos se cargan desde un torrent, directamente en su navegador. Es asombroso volar a través de nuestro sistema estrella y darse cuenta de lo poco que somos los humanos comparados con la vastedad de nuestro universo.

Puedes leer cómo se hizo esto en [Torrenting The Galaxy](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), un blog donde el autor, Charlie Hoey, explica cómo construyó el mapa de estrellas con WebGL y WebTorrent.

<a href="https://brave.com/">
  <img alt="logotipo valiente" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

También somos grandes fans de [Brave](https://brave.com/). Brave es un navegador que bloquea automáticamente anuncios y rastreadores para hacer la web más rápida y segura. Brave ha añadido recientemente soporte para torrents, así que puedes [ver torrents tradicionales sin usar una aplicación separada](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). Esa característica es alimentada por WebTorrent.

Así que, al igual que la mayoría de los navegadores pueden renderizar archivos PDF, Brave puede renderizar enlaces imanes y archivos torrent. Son simplemente otro tipo de contenido que el navegador soporta nativamente.

Uno de los cofundadores de Brave es en realidad Brendan Eich, el creador de JavaScript, el idioma que escribimos WebTorrent en, así que creemos que es bastante genial que Brave decidió integrar WebTorrent.

## ¿Por qué eligió construir WebTorrent Desktop en Electron?

<a href="https://webtorrent.io/desktop/">
  <img alt="Ventana principal WebTorrent Desktop" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Hay un meme que las aplicaciones Electron están "infladas" porque incluyen todo el módulo de contenido de Chrome en todas las aplicaciones. En algunos casos, esto es parcialmente cierto (un instalador de aplicaciones Electron suele ser ~40MB, donde un instalador de aplicaciones específicas del sistema operativo suele ser ~20MB).

Sin embargo, en el caso de WebTorrent Desktop, utilizamos casi todas las características de Electron y muchas docenas de características de Chrome en el transcurso de la operación normal. Si queríamos implementar estas características desde cero para cada plataforma, Habría tardado meses o años más en construir nuestra aplicación, o solo habríamos podido liberar para una sola plataforma.

Para obtener una idea, utilizamos la [integración de acoplamiento](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) de Electron (para mostrar el progreso de descarga), [integración de barra de menú](https://electronjs.org/docs/api/menu) (para ejecutar en segundo plano), [registro de manejador de protocolo](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (para abrir enlaces magnéticos), [bloqueador de energía](https://electronjs.org/docs/api/power-save-blocker/) (para evitar el sueño durante la reproducción de vídeo), y [actualizador automático](https://electronjs.org/docs/api/auto-updater). En cuanto a las características de Chrome, usamos abundantemente: la etiqueta `<video>` (para reproducir muchos formatos de video diferentes), la etiqueta `<track>` (para subtítulos cerrados), Soporte de drag-and drop y WebRTC (que no es trivial para usar en una aplicación nativa).

Por no mencionar: nuestro motor de torrent está escrito en JavaScript y asume la existencia de muchas APIs de Nodo, pero especialmente `require('net')` y `require('dgram')` para soporte de socket TCP y UDP.

Básicamente, Electron es justo lo que necesitábamos y tenía el conjunto exacto de características que necesitábamos para enviar una aplicación sólida y pulida en un tiempo récord.

## ¿Cuáles son tus cosas favoritas de Electron?

La biblioteca WebTorrent ha estado en desarrollo como un proyecto de código abierto durante dos años. **Hicimos WebTorrent Desktop en cuatro semanas.** Electron es la razón principal por la que pudimos construir y enviar nuestra aplicación tan rápidamente.

Igual que Node. s hizo que la programación de servidores fuera accesible para una generación de programadores de jQuery-using front-end, Electron hace que el desarrollo de aplicaciones nativas sea accesible para cualquiera que esté familiarizado con la Web o el Node. s desarrollo. Electron es extremadamente poderoso.

## ¿El sitio web y el cliente de escritorio comparten código?

Sí, el paquete [`webtorrent` npm](https://npmjs.com/package/webtorrent) funciona en Node.js, en el navegador, y en Electron. El mismo código se puede ejecutar en todos los entornos - esta es la belleza de JavaScript. Es el tiempo de ejecución universal de hoy. Java Applets prometió "Escribir una vez, ejecutar en cualquier lugar", pero esa visión nunca se materializó por una serie de razones. Electron, más que cualquier otra plataforma, en realidad se pone bastante oscurecido cerca de ese ideal.

## ¿Cuáles son algunos de los desafíos a los que se enfrenta mientras construye WebTorrent?

En versiones tempranas de la aplicación, nos empeñamos en hacer la interfaz de usuario. Ponemos el motor de torrent en el mismo proceso de renderizado que dibuja la ventana principal de la aplicación que, previsiblemente, condujo a la lentitud en cualquier momento hubo una intensa actividad de CPU por parte del motor de torrent (como verificar las piezas de torrent recibidas de pares).

Hemos solucionado esto moviendo el motor de torrent a un segundo proceso de renderizador invisible que nos comunicamos con más de [IPC](https://electronjs.org/docs/api/ipc-main/). De esta manera, si ese proceso utiliza brevemente una gran cantidad de CPU, el flujo de interfaz de usuario no se verá afectado. Los desplazamientos y las animaciones suaves son tan satisfactorios.

Nota: tuvimos que poner el motor de torrent en un proceso de renderizado, en lugar de un proceso "principal", porque necesitamos acceso a WebRTC (que sólo está disponible en el renderizador.)

## ¿En qué áreas debe mejorarse Electron?

Una cosa que nos encantaría ver es una mejor documentación sobre cómo construir y enviar aplicaciones listas para la producción, especialmente alrededor de temas complicados como la firma de código y la actualización automática. Tuvimos que aprender sobre las mejores prácticas cavando en el código fuente y preguntando alrededor en Twitter!

## ¿Está WebTorrent Desktop listo? Si no, ¿qué viene a continuación?

Creemos que la versión actual de WebTorrent Desktop es excelente, pero siempre hay espacio para mejorar. Actualmente estamos trabajando en mejorar el pulido, el rendimiento, el soporte de subtítulos y el soporte de código de vídeo.

Si estás interesado en participar en el proyecto, echa un vistazo a [nuestra página de GitHub](https://github.com/feross/webtorrent-desktop)!

## ¿Algún consejo de desarrollo de Electron que pueda ser útil para otros desarrolladores?

[Feross](http://feross.org/), uno de los colaboradores de WebTorrent, recientemente dio una charla *"Electrón del mundo real: construyendo aplicaciones de escritorio multiplataforma con JavaScript"* en NodeConf Argentina que contiene consejos útiles para lanzar una aplicación Electron pulida. La charla es especialmente útil si estás en el escenario donde tienes una aplicación básica de trabajo y estás intentando llevarla al siguiente nivel de pulido y profesionalismo.

[Mira aquí](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Diapositivas aquí](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), otro colaborador de WebTorrent, escribió [una lista de cosas que puedes hacer](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) para que tu aplicación se sienta pulida y nativa. Viene con ejemplos de código y cubre cosas como la integración de acoplamiento macOS, arrastrar y soltar, las notificaciones de escritorio y asegurarse de que tu aplicación carga rápidamente.

