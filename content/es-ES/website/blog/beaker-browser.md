---
title: 'Proyecto de la Semana: Navegador Beaker'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

Esta semana hemos alcanzado con [Paul Frazee](http://pfrazee.github.io/), creador de [Beaker Browser](https://beakerbrowser.com/). Beaker es un navegador web peer-to-peer experimental que utiliza el protocolo Dat para alojar sitios desde dispositivos de los usuarios.

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## ¿Qué es Beaker y por qué lo creaste?

Beaker es un navegador participativo. Es un navegador para hackers de indie.

La web es de código cerrado. Si quieres influir en cómo funcionan las redes sociales, tienes que trabajar en Facebook o Twitter. Para búsqueda, Google. El control está en manos de las empresas, y no de los propios usuarios.

Con Beaker, tenemos un nuevo protocolo Web: el [Transporte de archivos descentralizados](https://datprotocol.com). "Dato". Crea sitios bajo demanda, de forma gratuita, y luego los comparte desde el dispositivo. No se requieren servidores. Esa es nuestra innovación.

![Protocols de Beakers](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Cuando usted visita un sitio de Dat en Beaker, usted descarga los archivos. El sitio es tuyo, para siempre. Puedes guardarlo, bifurcarlo, modificarlo y compartir gratis tu nueva versión. Todo es de código abierto.

De eso se trata: Estamos creando un navegador para sitios web de código abierto. Queremos que sea un conjunto de herramientas para la piratería social.

## ¿Quién debería usar Beaker?

Hackers. Modders. Tipos creativos. A la gente a la que le gusta retocarse.

## ¿Cómo puedo crear un nuevo proyecto que utilice Dato?

Tenemos [una herramienta de línea de comandos llamada bkr](https://github.com/beakerbrowser/bkr) que es como git + npm. Aquí está creando un sitio:

```bash
$ bifurcación bkr dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "Mi bifurcación no tiene en cuenta el índice anterior. tml!" > index.html
$ bkr publicar
```

Y aquí está bifurcando un sitio:

```bash
bifurcación $ BKR dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/~/My-Fork
$ CD ~/My-Fork
$ echo "mi bifurcación no tiene ninguna consideración con el índice anterior. html!" tml!" > index.html
$ bkr publicar
```

Estos sitios son alojados fuera de su navegador. Es un poco como BitTorrent; usted comparte los sitios en una malla P2P.

Si quieres un GUI, tenemos algunas herramientas básicas incorporadas en el navegador, pero estamos empujando esas herramientas al campo de usuario. Todo va a ser de aplicaciones de usuario modulables.

## ¿Por qué eligiste construir Beaker en Electron?

Era evidente para este proyecto. Si yo mismo bifurcé Chrome, ¡estaría escribiendo C++ ahora mismo! Nadie quiere hacerlo. Conozco la pila web, y puedo trabajar rápidamente con ella. Es una persona no-pagadora.

La verdad es que no estoy seguro de que pudiera hacer nada de esto sin Electron. Es una gran pieza de software.

## ¿Cuáles son algunos de los desafíos a los que se enfrenta mientras construye Beaker?

La mitad de ella se está dando cuenta de las herramientas y averiguando cuánto puedo salir.

Hacer que el navegador en sí mismo fue bastante fácil. Electron es prácticamente un conjunto de herramientas para hacer navegadores. ...Excepto por las pestañas del navegador; eso me llevó para siempre bien. Finalmente me rompí y aprendí a hacer los SVG. Es mucho mejor mirar, pero se tardaron 3 o 4 iteraciones antes de que lo hiciera bien.

## ¿En qué áreas debe mejorarse Electron?

Sería realmente genial si pudiera acoplar las herramientas de desarrollo dentro de una vista web.

## ¿Qué va a venir en Beaker?

Nombres DNS seguros para sitios Dat. Un esquema de URL socialmente configurable, llamado el ["esquema de aplicación".](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) Más API Dat.

## ¿Para la gente que puede estar interesada en contribuir al proyecto, en qué áreas necesita ayuda Beaker?

Tenemos muchas cuestiones abiertas. No tengas miedo de hacer ping a mí. #beakerbrowser en freenode. Mantenemos una página [para los colaboradores](https://beakerbrowser.com/docs/team.html) y te agregaremos a ella. Y si visitas Austin, te compraré una cerveza.

## ¿Algún consejo de Electron que pueda ser útil para otros desarrolladores?

1. Utilice la herramienta de construcción que está ahí fuera. No quieres discutir con tus propias soluciones, confíen en mí. Usar electron-builder. Utilice un repositorio de boilerplate .
2. Si necesita abrir un problema en el repositorio de Electron vaya a la milla extra para que sea fácil de reproducir. Recibirás una respuesta mucho más rápida, y el equipo la apreciará. Aún mejor, intente arreglarlo usted mismo. En realidad es bastante interesante ver las posadas.
3. Lee todas las guías y documentos avanzados al menos una vez.
4. No construya un navegador, es un mercado saturado.

