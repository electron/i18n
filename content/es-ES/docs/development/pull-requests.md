# Pull Requests

* [Dependencias](#dependencies)
* [Configurando tu entorno local](#setting-up-your-local-environment) 
  * [Paso 1: Fork](#step-1-fork)
  * [Paso 2: Compilado](#step-2-build)
  * [Paso 3: Rama](#step-3-branch)
* [Haciendo Cambios](#making-changes) 
  * [Paso 4: Código](#step-4-code)
  * [Paso 5: Asignar](#step-5-commit) 
    * [Asignar directrices de mensaje](#commit-message-guidelines)
  * [Paso 6: Reorganizar](#step-6-rebase)
  * [Paso 7: Prueba](#step-7-test)
  * [Paso 8: Push](#step-8-push)
  * [Paso 9: Abriendo la Solicitud de Retiro](#step-8-opening-the-pull-request)
  * [Paso 10: Analizar y actualizar](#step-9-discuss-and-update) 
    * [Aprobación y Solicitud de Cambios de flujo de trabajo](#approval-and-request-changes-workflow)
  * [Paso 11: Ejecutado](#step-10-landing)
  * [Prueba de Integración Continua](#continuous-integration-testing)

## Configurando tu entorno local

### Paso 1: Fork

Fork the project [on GitHub](https://github.com/electron/electron) and clone your fork locally.

```sh
$ git clone git@github.com:username/electron.git
$ cd electron
$ git remote add upstream https://github.com/electron/electron.git
$ git fetch upstream
```

### Paso 2: Compilado

Pasos de compilado y dependencias difieren ligeramente dependiendo de su sistema operativo. Ver estas guías detalladas en compilacion local de Electron:

* [Compilado en MacOS](https://electronjs.org/docs/development/build-instructions-osx)
* [Compilado en Linux](https://electronjs.org/docs/development/build-instructions-linux)
* [Compilado en Windows](https://electronjs.org/docs/development/build-instructions-windows)

Una vez que has compilado el proyecto localmente, ¡Estas listo para empezar a hacer cambios!

### Paso 3: Rama

Para mantener tu entorno de desarrollo organizado, crea ramas locales para retener tu trabajo. Estos deben ser ramificados directamente de la rama `master`.

```sh
$ git checkout -b my-branch -t upstream/master
```

## Haciendo Cambios

### Paso 4: Código

La mayoría de los pull request abiertos en contra del repositorio `electron/electron` incluyen cambios tanto para el código C/C++ en los archivos `atom/` como para los archivos `brightray/`, el código JavaScript en el archivo `lib/`, la documentación en `docs/api/` o las pruebas en el archivo `spec/`.

Por favor asegúrate de correr `npm run lint` de vez en cuando en cualquier cambio de código para asegurar que estos siguen el estilo de código del proyecto.

Ver [estilo de codificación](https://electronjs.org/docs/development/coding-style) para mas información acerca de la mejor práctica cuando se esta modificando el código en diferentes partes del proyecto.

### Paso 5: Asignar

Se le recomienda mantener sus cambios agrupados lógicamente sin individualizar las asignaciones. Muchos contribuyentes encuentras mas fácil el revisar los cambios que son divididos entre multiples asignaciones. No hay límite en el número de asignaciones en un pull request.

```sh
$ git add my/changed/files
$ git commit
```

Tenga en cuenta que multiples asignaciones a menudo colisionan cuando son ejecutadas.

#### Asignar directrices de mensaje

Un buen mensaje de asignación debe describir que ha cambiado y por qué.

1. La primera linea debe:
  
  * contener una breve descripción del cambio (preferiblemente 50 caracteres o menos, y no mas de 72 caracteres)
  * estar completamente en minúsculas con la excepción de nombres propios, acrónimos, y las palabras que refieren a un código, como nombres de función/variables
    
    Ejemplos:
  
  * `actualizar la documentacion de compilado osx para un nuevo sdk`
  
  * `fixed typos in atom_api_menu.h`

2. Mantén la segunda linea vacía.

3. Ajuste todas las otras linea en 72 columnas.

Ver [este artículo](https://chris.beams.io/posts/git-commit/) para mas ejemplos de como escribir buenos mensajes git de asignación.

### Paso 6: Reorganizar

Una vez hayas asignado tus cambios, es una buena idea el usar `git rebase` (no `git merge`) para sincronizar tu trabajo con el repositorio principal.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

Esto asegura que tu rama de trabajo tiene los ultimos cambios del principal `electron/electron`.

### Paso 7: Prueba

Las características y reparaciones de un error deben siempre ser dadas con pruebas. Una [guía de prueba](https://electronjs.org/docs/development/testing) ha sido proporcionado para facilitar el proceso. Mirar otras pruebas para ver como deberían ser estructuradas también puede ayudar.

Antes de enviar tus cambios en una pull request, siempre ejecute el paquete completo de pruebas. Para ejecutar las pruebas:

```sh
$ npm run test
```

Asegúrese de que el linter no reporta ningún inconveniente y que pasa todas pruebas. Por favor no envíe parches que fallan en cualquiera de las verificaciones.

Si estas actualizando las pruebas y sólo desea ejecutar una especificación única para comprobarlo:

```sh
$ npm run test -match=menu
```

Lo anterior solo podrá ejecutar módulos específicos coincidentes `menu`, el cual es útil para cualquiera que esta trabajando en pruebas que podrían de lo contrario estar al final de un ciclo de prueba.

### Paso 8: Push

Una vez tus asignaciones están listas -- ya pasadas las pruebas y el linting -- comienza el proceso de apertura de un pull request haciendo un push de tu rama de trabajo a tu fork en GitHub.

```sh
$ git push origin my-branch
```

### Paso 9: Abriendo el Pull Request

Desde dentro de GitHub, abrir una nueva pull request te presentará con una plantilla que debe ser llenada:

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### Paso: 10: Analizar y actualizar

Probablemente recibirás críticas o peticiones de cambios a tu pull request. ¡Esta es una gran parte del proceso de envío así que no te desanimes! Algunos contribuyentes pueden inmediatamente desistir del pull request. Otros pueden tener comentarios o críticas detalladas. Esto es una parte necesaria del proceso con el fin de evaluar si los cambios son correctos y necesarios.

To make changes to an existing pull request, make the changes to your local branch, add a new commit with those changes, and push those to your fork. GitHub will automatically update the pull request.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

There are a number of more advanced mechanisms for managing commits using `git rebase` that can be used, but are beyond the scope of this guide.

Feel free to post a comment in the pull request to ping reviewers if you are awaiting an answer on something. If you encounter words or acronyms that seem unfamiliar, refer to this [glossary](https://sites.google.com/a/chromium.org/dev/glossary).

#### Aprobación y Solicitud de Cambios de flujo de trabajo

All pull requests require approval from a [Code Owner](https://github.com/orgs/electron/teams/code-owners) of the area you modified in order to land. Whenever a maintainer reviews a pull request they may request changes. These may be small, such as fixing a typo, or may involve substantive changes. Such requests are intended to be helpful, but at times may come across as abrupt or unhelpful, especially if they do not include concrete suggestions on *how* to change them.

Try not to be discouraged. If you feel that a review is unfair, say so or seek the input of another project contributor. Often such comments are the result of a reviewer having taken insufficient time to review and are not ill-intended. Such difficulties can often be resolved with a bit of patience. That said, reviewers should be expected to provide helpful feeback.

### Paso 11: Ejecutado

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### Prueba de Integración Continua

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only [Releasers](https://github.com/orgs/electron/teams/releasers/members) can restart a CI run. If you believe CI is giving a false negative, ask a Releaser to restart the tests.