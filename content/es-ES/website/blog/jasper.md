---
title: 'Proyecto de la Semana: Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '21-03-2017'
---

Esta semana hemos entrevistado al creador de [Jasper](https://jasperapp.io), una herramienta basada en Electron para administrar las notificaciones de GitHub.

---

## ¡Hola! ¿Quiénes eres?

Soy [Ryo Maruyama](https://github.com/h13i32maru), un desarrollador de software en Japón. Estoy desarrollando [Jasper](https://jasperapp.io) y [ESDoc](https://esdoc.org).

## ¿Qué es Jasper?

[Jasper](https://jasperapp.io) es un lector de problemas flexible y potente para GitHub. Soporta problemas y pull requests en github.com y GitHub Enterprise.

[![Captura de pantalla de Jasper](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## ¿Por qué lo hizo?

Cuando la gente usa GitHub en sus actividades de trabajo o OSS, tienden a recibir muchas notificaciones diariamente. Como forma de suscribirse a las notificaciones, GitHub proporciona correo electrónico y [notificaciones web](https://github.com/notifications). Los he utilizado durante un par de años, pero me he enfrentado a los siguientes problemas:

- Es fácil pasar por alto los problemas en los que he sido mencionado, comenté, o estoy observando.
- Puse algunas cuestiones en un rincón de mi cabeza para comprobar más tarde, pero a veces me olvidé de ellas.
- Para no olvidar problemas, mantengo muchas pestañas abiertas en mi navegador.
- Es difícil comprobar todos los problemas que están relacionados conmigo.
- Es difícil agarrar toda la actividad de mi equipo.

Estaba dedicando mucho tiempo y energía a prevenir esos problemas. así que decidí hacer un lector de problemas para GitHub para resolver estos problemas de manera eficiente, y comenzó a desarrollar Jasper.

## ¿Quién está usando Jasper?

Jasper es utilizado por desarrolladores, diseñadores y gerentes en varias compañías que están usando GitHub. Por supuesto, algunos desarrolladores de OSS también lo están usando. Y también es utilizado por algunas personas en GitHub!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## ¿Cómo funciona Jasper?

Una vez que Jasper está configurado, aparece la siguiente pantalla. De izquierda a derecha, puede ver "lista de secuencias", "lista de incidencias" y "asunto de cuerpo".

[![Pantalla de inicio de Jasper](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

Este "stream" es la característica principal de Jasper. Por ejemplo, si desea ver "asuntos que están asignados a @zeke en el repositorio electron/electrón", crea el siguiente stream:

```
repo:electron/electron asignado:zeke es:problema
```

[![Pantalla de Inicio de Jasper 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

Después de crear el flujo y esperar unos segundos, puede ver los problemas que cumplen las condiciones.

[![Pantalla de Inicio de Jasper 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## ¿Qué podemos hacer con las corrientes?

Introduciré qué tipo de condiciones se pueden utilizar para la transmisión.

### Usuarios y equipos

| Flujo                                              | Problemas                                               |
| -------------------------------------------------- | ------------------------------------------------------- |
| `menciones:gato menciones:perro`                   | Problemas que mencionan al usuario `cat` o `perro`      |
| `autor:cat autor:perro`                            | Problemas creados por el usuario `cat` o `perro`        |
| `asignado:gato asignado:perro`                     | Problemas asignados a `cat` o `perro`                   |
| `commenter:cat commenter:dog`                      | Problemas en los que `gato` o `perro` comentaron        |
| `Más:gatos:perro`                                  | Problemas que "involucran" `cat` o `bob`                |
| `equipo:equipo animal/white-cat :animal/black-dog` | Se mencionan en `animal/white-cat` o `animal/black-dog` |

`involucra` significa `mención`, `autor`, `asignador` o `comentarista`

### Repositorios y Organizaciones

| Flujo                                    | Problemas                                 |
| ---------------------------------------- | ----------------------------------------- |
| `repo:cat/jump repo:dog/run`             | Problemas en `cat/jump` o `dog/run`       |
| `org:electron usuario:cat usuario:perro` | Problemas en `electrón`, `gato` o `perro` |

`org` es igual que `usuario`

### Atributos

| Flujo                                             | Problemas                                                              |
| ------------------------------------------------- | ---------------------------------------------------------------------- |
| `repo:cat/jump milestone:v1.0.0 milestone:v1.0.1` | Problemas conectados a `v1.0.0` o `v1.0.1` en `cat/jump`               |
| `repo:cat/jump label:bug label:blocker`           | Problemas que están adjuntados `bug` **y** `bloqueador` en `gat/salto` |
| `electrón o cáscara atómica`                      | Problemas que incluyen `electrón` o `atomshell`                        |

### Estado de revisión

| Flujo                          | Problemas                                                                          |
| ------------------------------ | ---------------------------------------------------------------------------------- |
| `es:pr review:obligatorio`     | Problemas que son necesarios para revisar en `cat/salto`                           |
| `es:pr reseña-solicitado:gato` | Problemas solicitados por `cat`. <br/> Pero estos no han sido revisados aún. |
| `es:pr revisado por:gato`      | Problemas revisados por `cat`                                                      |

<br/>

Como puede haber notado al mirarlos, los streams pueden usar las consultas de búsqueda de GitHub. Para más detalles sobre cómo usar secuencias y consultas de búsqueda, consulte las siguientes URLs.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

Jasper también tiene características para la gestión de problemas no leídos, gestión de comentarios no leídos, marcadores de estrellas, actualización de notificaciones, problemas de filtrado, atajos de teclado, etc.

## ¿Es Jasper un producto pagado? ¿Cuánto cuesta?

Jasper es de $12. Sin embargo, puedes usar la [edición gratuita de prueba](https://jasperapp.io/) durante 30 días.

## ¿Por qué eligió construir Jasper en Electron?

Me gustan los siguientes aspectos de Electron:

- Las aplicaciones se pueden desarrollar con JavaScript/CSS/HTML.
- Las aplicaciones se pueden construir para plataformas Windows, Mac y Linux.
- Electron está activamente desarrollado y tiene una gran comunidad.

Estas características permiten un rápido y sencillo desarrollo de aplicaciones de escritorio. ¡Es increíble! Si tiene alguna idea de producto, debería considerar utilizar Electron por todos los medios.

## ¿Cuáles son algunos de los desafíos a los que se enfrenta mientras desarrolla Jasper?

Me costó mucho averiguar el concepto de "corriente". Al principio consideré usar la [API de Notificaciones](https://developer.github.com/v3/activity/notifications/) de GitHub. Sin embargo, me he dado cuenta de que no apoya ciertos casos de uso. Después de eso consideré usar la [API de problemas](https://developer.github.com/v3/issues/) y [API de Pull Requests](https://developer.github.com/v3/pulls/), además de la API de Notificación. Pero nunca se convirtió en lo que yo quería. Entonces mientras pensaba en varios métodos, me di cuenta de que el sondeo de la [API de búsqueda](https://developer.github.com/v3/search/) de GitHub ofrecería la mayor flexibilidad. Llevó aproximadamente un mes de experimentación llegar a este punto, entonces implementé un prototipo de Jasper con el concepto de flujo en dos días.

Nota: La votación se limita a una vez cada 10 segundos como máximo. Esto es aceptable para la restricción de la API de GitHub.

## ¿Qué viene después?

Tengo un plan para desarrollar las siguientes características:

- **Un stream filtrado**: Un stream tiene un flujo filtrado que filtra problemas en el stream. Es como la vista de SQL.
- **Múltiples cuentas**: podrás usar tanto github.com como GHE
- **Mejora el rendimiento**: Por ahora, la carga de un problema en WebView es de baja velocidad que el navegador normal.

Sigue a [@jasperappio](https://twitter.com/jasperappio) en Twitter para obtener actualizaciones.

