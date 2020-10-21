---
title: "Nuevo sitio web internacionalizado de Electron"
author: zeke
date: '13-11-2017'
---

¡Electron tiene un nuevo sitio web en [electronjs.org](https://electronjs.org)! Hemos reemplazado nuestro sitio Jekyll estático por un Nodo. s servidor web, dándonos flexibilidad para internacionalizar el sitio y allanar el camino para nuevas características más interesantes.

---

## :globe_showing_Europa-Portugal: Traducciones

Hemos iniciado el proceso de internacionalización del sitio web con el objetivo de hacer el desarrollo de aplicaciones de Electron accesible a una audiencia global de desarrolladores. Estamos utilizando una plataforma de localización llamada [Crowdin](https://crowdin.com/project/electron) que integra con GitHub, abriendo y actualizando las pull requests automáticamente ya que el contenido se traduce a diferentes idiomas.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav en Chino simplificado">
    <figcaption>Nav de Electron en Chino Simplificado</figcaption>
  </a>
</figure>

Aunque hemos estado trabajando tranquilamente en este esfuerzo hasta ahora, más de 75 miembros de la comunidad Electron ya han descubierto el proyecto de forma orgánica y se han unido en el esfuerzo por internacionalizar el sitio web y traducir los documentos de Electron a más de 20 idiomas. Estamos viendo [contribuciones diarias](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) de personas de todo el mundo, con traducciones para idiomas como el francés, el nombre, el indonesio y el chino a la cabeza.

Para elegir tu idioma y ver el progreso de la traducción, visita [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Idiomas actuales en Crowdin">
    <figcaption>Traducciones en curso en Crowdin</figcaption>
  </a>
</figure>

Si estás multilingüe e interesado en ayudar a traducir la documentación de Electron y la página web, visita el repositorio [electron/electron-i18n](https://github.com/electron/electron-i18n#readme) , o salta directamente a traduciendo el [Crowdin](https://crowdin.com/project/electron), donde puedes iniciar sesión usando tu cuenta de GitHub.

Actualmente hay 21 idiomas habilitados para el proyecto Electron en Crowdin. Añadir soporte para más idiomas es fácil, así que si estás interesado en ayudar a traducir pero no ves tu idioma en la lista, [háganoslo saber](https://github.com/electron/electronjs.org/issues/new) y lo activaremos.

## Documentos traducidos sin procesar

Si prefiere leer la documentación en archivos markdown crudos, ahora puede hacerlo en cualquier idioma:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Páginas App

A partir de hoy, cualquier aplicación Electron puede tener fácilmente su propia página en el sitio Electron . Para ver algunos ejemplos, revisa [Etcher](https://electronjs.org/apps/etcher), [1Portapapeles](https://electronjs.org/apps/1clipboard), o [GraphQL Playground](https://electronjs.org/apps/graphql-playground), fotografiado aquí en la versión japonesa del sitio:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="Campo de juego GraphQL">
  </a>
</figure>

Hay algunas increíbles aplicaciones de Electron ahí fuera, pero no siempre son fáciles de encontrar, y no todos los desarrolladores tienen el tiempo o los recursos para crear un sitio web apropiado para comercializar y distribuir su aplicación.

Using just a [PNG icon file and a small amount of app metadata](https://github.com/electron/electron-apps/blob/master/contributing.md), we're able to collect a lot of information about a given app. Using data collected from GitHub, app pages can now display screenshots, download links, versions, release notes, and READMEs for every app that has a public repository. Usando una paleta de colores extraída del icono de cada aplicación, podemos producir [colores atrevidos y accesibles](https://github.com/zeke/pick-a-good-color) para dar a cada página de aplicación una distinción visual.

La página de índice de [aplicaciones](https://electronjs.org/apps) ahora también tiene categorías y un filtro de palabras clave para encontrar aplicaciones interesantes como [GUI GraphQL](https://electronjs.org/apps?q=graphql) y [herramientas p2p](https://electronjs.org/apps?q=graphql).

If you've got an Electron app that you'd like featured on the site, open a pull request on the [electron/electron-apps](https://github.com/electron/electron-apps) repository.

## Instalación de una línea con Homebrew

El gestor de paquetes [Homebrew](https://brew.sh) para macOS tiene un subcomando llamado [cask](https://caskroom.github.io) que hace fácil instalar aplicaciones de escritorio usando un solo comando en tu terminal , como `brew cask install atom`.

Hemos empezado a recolectar nombres de barriles de Homebrew para aplicaciones populares de Electron y ahora estamos mostrando el comando de instalación (para visitantes de macOS) en cada página de aplicación que tiene un barril:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Opciones de instalación adaptadas a tu plataforma: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Para ver todas las aplicaciones que tienen nombres de casco, visita [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Si sabes de otras aplicaciones con barriles que aún no hemos indexado, [¡por favor añádelas!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Un nuevo dominio

Hemos movido el sitio de electron.atom.io a un nuevo dominio: [electronjs.org](https://electronjs.org).

El proyecto Electron nació dentro de [Atom](https://atom.io), editor de texto de código abierto de GitHub basado en tecnologías web. Electron originalmente se llamaba `atom-shell`. Atom fue la primera aplicación en usarlo, pero la gente no tardó mucho en darse cuenta de que este tiempo de ejecución mágico de Chromium + Node podría ser usado para todo tipo de aplicaciones diferentes. Cuando empresas como Microsoft y Slack empezaron a utilizar `atom-shell`, quedó claro que el proyecto necesitaba un nuevo nombre.

Y así nació "Electron". A principios de 2016, GitHub ensambló un nuevo equipo para centrarse específicamente en el desarrollo y mantenimiento de Electron aparte de Atom. En el tiempo , Electron ha sido adoptado por miles de desarrolladores de aplicaciones, y ahora está dependiente de muchas grandes empresas, muchas de las cuales tienen equipos Electron de propios.

Soportar proyectos de Electron de GitHub como Atom y [GitHub Desktop](https://desktop.github.com) sigue siendo una prioridad para nuestro equipo, pero al pasar a un nuevo dominio esperamos ayudar a aclarar la distinción técnica entre Atom y Electron.

## 🐢🚀 Node.js En todas partes

El anterior sitio web de Electron fue construido con [Jekyll](https://jekyllrb.com), el popular generador estático de sitios basado en Ruby. Jekyll es una gran herramienta para construir sitios web estáticos, pero el sitio web había comenzado a superarlo. Queríamos capacidades más dinámicas como redirecciones adecuadas y representación de contenido dinámico, por lo que un servidor de [Node.js](https://nodejs.org) era la elección obvia.

El ecosistema Electron incluye proyectos con componentes escritos en muchos lenguajes de programación diferentes, desde Python hasta C++ hasta Bash. Pero JavaScript es fundamental para Electron, y es el lenguaje que más se utiliza en nuestra comunidad.

Al migrar el sitio web de Ruby a Node.js, nuestro objetivo es reducir la barrera a entrada para las personas que deseen contribuir al sitio web.

## ⚡ Participación más fácil de código abierto

Si tienes [nodo. s](https://nodejs.org) (8 o superior) y [git](https://git-scm.org) instalado en su sistema, puedes hacer que el sitio funcione localmente:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

El nuevo sitio web está alojado en Heroku. Utilizamos pipelines de despliegue y la función [Revisar aplicaciones](https://devcenter.heroku.com/articles/github-integration-review-apps) , que automáticamente crea una copia en ejecución de la aplicación para cada solicitud de pull . Esto facilita a los revisores ver los efectos reales de una solicitud de extracción en una copia en vivo del sitio.

## 🙏 Gracias a los colaboradores

Nos gustaría dar las gracias a todas las personas de todo el mundo que han contribuido con su propio tiempo y energía para ayudar a mejorar Electron. La pasión de la comunidad de código abierto ha ayudado inmensamente a hacer de Electron un éxito. Gracias.

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>