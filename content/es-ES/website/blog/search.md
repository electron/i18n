---
title: Buscar
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

El sitio web de Electron tiene un nuevo motor de búsqueda que ofrece resultados instantáneos para documentos API, tutoriales, paquetes npm relacionados con Electron, y más.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Captura de pantalla de búsqueda de Electron">
  </a>
</figure>

---

Aprender una nueva tecnología o marco como Electron puede ser intimidante. Una vez superada la fase de inicio rápido de [](https://github.com/electron/electron-quick-start) , puede ser difícil aprender las mejores prácticas, encuentre las API correctas, o descubra las herramientas que le ayudarán a construir la aplicación de sus sueños. Queremos que el sitio web de Electron sea una mejor herramienta para encontrar los recursos que necesita para construir aplicaciones más rápido y más fácilmente.

Visita cualquier página en [electronjs.org](https://electronjs.org) y encontrarás la nueva entrada de búsqueda en la parte superior de la página.

## El motor de búsqueda

Cuando empezamos a agregar búsqueda al sitio web, avanzamos nuestro propio motor de búsqueda usando GraphQL como backend. GraphQL fue divertido de trabajar y el motor de búsqueda era performante, pero rápidamente nos dimos cuenta de que construir un motor de búsqueda no es una tarea trivial. Cosas como la búsqueda de múltiples palabras y la detección de errores tipográficos requieren mucho trabajo para corregir. En lugar de reinventar la rueda, decidimos utilizar una solución de búsqueda existente: [Algolia](https://algolia.com).

Algolia es un servicio de búsqueda alojado que se ha convertido rápidamente en el motor de búsqueda de entre los proyectos populares de código abierto como React, Vue, Bootstrap, Yarn, y [muchos otros](https://community.algolia.com/docsearch/).

Aquí están algunas de las características que hicieron de Algolia un buen ajuste para el proyecto Electron:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) proporciona resultados a medida que escribes, generalmente en unos 1ms.
- [Tolerancia tipográfica](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) significa que todavía obtendrás resultados incluso cuando escribas [`widnow`].
- [La sintaxis avanzada de consulta](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) habilita `"coincidencias cotizadas exactas"` y `-exclusión`.
- [Los clientes de la API](https://www.algolia.com/doc/api-client/javascript/getting-started/) son de código abierto y están bien documentados.
- [Analíticas](https://www.algolia.com/doc/guides/analytics/analytics-overview/) nos dicen lo que la gente está buscando más, así como lo que está buscando pero no encontrando. Esto nos dará una valiosa visión de cómo se puede mejorar la documentación de Electron.
- Algolia es [gratis para proyectos de código abierto](https://www.algolia.com/for-open-source).

## API Docs

A veces sabes *qué* quieres conseguir, pero no sabes exactamente *cómo* hacerlo. Electron tiene más de 750 métodos, eventos y propiedades de API. Ningún ser humano puede recordar a todos, pero las computadoras son buenas en esta materia. Usando [documentos JSON API](https://electronjs.org/blog/api-docs-json-schema)de Electron, indexamos todos estos datos en Algolia, y ahora puedes encontrar fácilmente la API exacta que estás buscando.

¿Intentando redimensionar una ventana? Busca [`redimensionar`] y salta directamente al método que necesitas.

## Tutoriales

Electron tiene una colección cada vez mayor de tutoriales para complementar su documentación de API. Ahora puedes encontrar más fácilmente tutoriales sobre un tema determinado, justo al lado de la documentación API relacionada.

¿Buscando mejores prácticas de seguridad? Buscar [`security`][].

## paquetes npm

Ahora hay más de 700.000 paquetes en el registro npm y no es siempre fácil encontrar el que necesitas. Para hacer más fácil descubrir estos módulos, hemos creado [`electron-npm-packages`], una colección de los más de 3400+ módulos en el registro que se construyen específicamente para su uso con Electron.

La gente de [Bibliotecas. o](https://libraries.io) han creado [SourceRank](https://docs.libraries.io/overview.html#sourcerank), un sistema para anotar proyectos de software basado en una combinación de métricas como código, comunidad, documentación y uso. Hemos creado un módulo [`sourceranks`] que incluye la puntuación de cada módulo en el registro npm, y nosotros usamos estas puntuaciones para ordenar los resultados del paquete.

¿Quieres alternativas a los módulos IPC incorporados de Electron? Buscar [`es:paquete ipc`].

## Aplicaciones de Electron

Es [fácil de indexar datos con Algolia](https://github.com/electron/algolia-indices), así que hemos añadido la lista de aplicaciones existentes de [electron/apps](https://github.com/electron/apps).

Prueba a buscar [`music`] o [`homebrew`].

## Filtrando Resultados

Si has usado GitHub [búsqueda de código](https://github.com/search) antes, probablemente esté al tanto de sus filtros de clave-valor separados por dos puntos como `extension:js` o `user:defunkt`. Creemos que esta técnica de filtrado es bastante poderosa, así que hemos añadido una `es:` palabra clave a la búsqueda de Electron que le permite filtrar resultados para mostrar sólo un solo tipo:

- [`[<code>es:api miniatura`]</code>][]
- [`[<code>es:tutorial security`]</code>][]
- [`[<code>es:paquete ipc`]</code>][]
- [`[<code>es:app grafiql`]</code>][]

## Navegación de teclado

¡A la gente le encantan los atajos de teclado! La nueva búsqueda se puede utilizar sin quitar los dedos del teclado:

- <kbd>/</kbd> centra la entrada de búsqueda
- <kbd>esc</kbd> centra la entrada de búsqueda y la borra
- <kbd>hacia abajo</kbd> se mueve al siguiente resultado
- <kbd>arriba</kbd> se mueve al resultado anterior, o a la entrada de búsqueda
- <kbd>enter</kbd> abre un resultado

También hemos abierto el módulo [](https://github.com/electron/search-with-your-keyboard/) que habilita esta interacción de teclado. Está diseñado para usarse con Algolia InstantSearch, pero está generalizado para habilitar la compatibilidad con diferentes implementaciones de búsqueda.

## Queremos tus comentarios

Si encuentras algún problema con la nueva herramienta de búsqueda, ¡queremos saber de ella!

La mejor manera de enviar sus comentarios es archivando un problema en GitHub en el repositorio apropiado :

- [electron/electronjs.org](https://github.com/electron/electronjs.org) es el sitio web de Electron. Si usted no sabe dónde presentar un problema, esta es su mejor apuesta.
- [electron/algolia-indices](https://github.com/electron/algolia-indices) es donde se compilan todos los datos de Electron buscables.
- [electron/search-with-your-keyboard](https://github.com/electron/search-with-your-keyboard) hace la interfaz de búsqueda navegable por teclado.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) es el cliente del lado del navegador que habilita la búsqueda find-as-you-type.
- [algolia/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) es el cliente Node.js para subir datos a los servidores de Algolia.

## Gracias

Un agradecimiento especial a [Emily Jordan](https://github.com/echjordan) y [Vanessa Yuen](https://github.com/vanessayuenn) por la construcción de estas nuevas capacidades de búsqueda, a [Libraries.io][] para proporcionar [SourceRank][] puntuaciones, y para el equipo de Algolia por ayudarnos a comenzar. 🍹

[`[&lt;code>es:api miniatura`]</code>]: https://electronjs.org/?query=is%3Aapi%20thumbnail
[`[&lt;code>es:app grafiql`]</code>]: https://electronjs.org/?query=is%3Aapp%20graphql
[`[&lt;code>es:paquete ipc`]</code>]: https://electronjs.org/?query=is%3Apackage%20ipc
[`[&lt;code>es:tutorial security`]</code>]: https://electronjs.org/?query=is%3Atutorial%20security
[`security`]: https://electronjs.org/?query=security
[Libraries.io]: https://libraries.io
[SourceRank]: https://docs.libraries.io/overview.html#sourcerank