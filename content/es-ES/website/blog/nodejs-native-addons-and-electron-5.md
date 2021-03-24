---
title: Complementos nativos de Node.js y Electron 5.0
author: BinaryMuse
date: '01-02-2019'
---

Si tiene problemas al usar un complemento nativo de Node.js con Electron 5. , hay una posibilidad de que necesite ser actualizado para trabajar con la versión más reciente de V8.

---

## Budbye `v8::Maneja`, Hola `v8::Local`

En 2014, el equipo de V8 desaprobado `v8::Handle` a favor de `v8::Local` para asas locales. Electron 5.0 incluye una versión de V8 que finalmente ha eliminado `v8::Handle` para el bien y Node nativo. s addons que aún lo usen tendrán que ser actualizados antes de que puedan ser usados con Electron 5.0.

El cambio de código requerido es mínimo, pero *cada* módulo nativo de nodo que todavía usa `v8::Handle` fallará en compilar con Electron 5. y tendrá que ser modificado. La buena noticia es ese Nodo. s v12 también incluirá este cambio de V8, por lo que cualquier módulo que use `v8::Handle` tendrá que actualizarse *de todos modos* para trabajar con la próxima versión del Nodo.

## Mantengo un complemento nativo, ¿cómo puedo ayudar?

Si mantiene un complemento nativo para Node.js, asegúrese de reemplazar todas las ocurrencias de `v8::Handle` por `v8::Local`. La primera era sólo un alias de la segunda, por lo que no es necesario hacer otros cambios para abordar esta cuestión específica.

También puede estar interesado en ver [N-API](https://nodejs.org/api/n-api.html), que se mantiene por separado de V8 como parte de Node. , y tiene como objetivo aislar los complementos nativos de los cambios en el motor JavaScript subyacente. Puede encontrar más información [en la documentación de N-API en el sitio web de Node.js](https://nodejs.org/api/n-api.html#n_api_n_api).

## ¡Ayuda! ¡Utilizo un complemento nativo en mi aplicación y no funcionará!

Si estás consumiendo un complemento nativo para Node. s en tu aplicación y el complemento nativo no se construirá debido a este problema, compruebe con el autor del complemento para ver si han liberado una nueva versión que corrige el problema. Si no, puedes apostar mejor al autor (o [abrir una Pull Request!](https://help.github.com/articles/about-pull-requests/)).
