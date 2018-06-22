# Pull Requests

* [Configurando tu entorno local](#setting-up-your-local-environment) 
  * [Paso 1: Fork](#step-1-fork)
  * [Paso 2: Compilado](#step-2-build)
  * [Paso 3: Rama](#step-3-branch)
* [Haciendo Cambios](#making-changes) 
  * [Paso 4: Código](#step-4-code)
  * [Paso 5: Commit](#step-5-commit) 
    * [Directrices de mensaje commit](#commit-message-guidelines)
  * [Paso 6: Reorganizar](#step-6-rebase)
  * [Paso 7: Prueba](#step-7-test)
  * [Paso 8: Push](#step-8-push)
  * [Paso 9: Abriendo la Solicitud de Retiro](#step-9-opening-the-pull-request)
  * [Paso 10: Analizar y actualizar](#step-10-discuss-and-update) 
    * [Aprobación y Solicitud de Cambios de Workflow](#approval-and-request-changes-workflow)
  * [Paso 11: Ejecutado](#step-11-landing)
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

### Paso 5: Commit

Se le recomienda mantener sus cambios agrupados lógicamente dentro de commits individuales. Muchos contribuyentes encuentras mas fácil el revisar los cambios que son divididos entre multiples commits. No hay límite en el número de commits en un pull request.

```sh
$ git add my/changed/files
$ git commit
```

Tenga en cuenta que multiples commits a menudo colisionan cuando son ejecutadas.

#### Directrices de mensaje commit

Un buen mensaje de commit debe describir que ha cambiado y por qué. The Electron project uses [semantic commit messages](https://conventionalcommits.org/) to streamline the release process.

Before a pull request can be merged, it should include at least one semantic commit message, though it's not necessary for all commits in the pull request to be semantic. Alternatively, you can **update your pull request title** to start with a semantic prefix.

Examples of commit messages with semantic prefixes:

* `fix: don't overwrite prevent_default if default wasn't prevented`
* `feat: add app.isPackaged() method`
* `docs: app.isDefaultProtocolClient is now available on Linux`

Common prefixes:

    - fix: A bug fix
    - feat: A new feature
    - docs: Documentation changes
    - test: Adding missing tests or correcting existing tests
    - build: Changes that affect the build system
    - ci: Changes to our CI configuration files and scripts
    - perf: A code change that improves performance
    - refactor: A code change that neither fixes a bug nor adds a feature
    - style: Changes that do not affect the meaning of the code (linting)
    

Other things to keep in mind when writing a commit message:

1. La primera linea debe: 
  * contener una breve descripción del cambio (preferiblemente 50 caracteres o menos, y no mas de 72 caracteres)
  * estar completamente en minúsculas con la excepción de nombres propios, acrónimos, y las palabras que refieren a un código, como nombres de función/variables
2. Mantén la segunda linea vacía.
3. Ajuste todas las otras linea en 72 columnas.

#### Breaking Changes

A commit that has the text `BREAKING CHANGE:` at the beginning of its optional body or footer section introduces a breaking API change (correlating with Major in semantic versioning). A breaking change can be part of commits of any type. e.g., a `fix:`, `feat:` & `chore:` types would all be valid, in addition to any other type.

See [conventionalcommits.org](https://conventionalcommits.org) for more details.

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

If you are updating tests and want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

Lo anterior solo podrá ejecutar módulos específicos coincidentes `menu`, el cual es útil para cualquiera que esta trabajando en pruebas que podrían de lo contrario estar al final de un ciclo de prueba.

### Paso 8: Push

Una vez que tus commits están listos -- ya pasadas las pruebas y el linting -- comienza el proceso de apertura de un pull request haciendo un push de tu rama de trabajo a tu fork en GitHub.

```sh
$ git push origin my-branch
```

### Paso 9: Abriendo la Solicitud de Retiro

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

Para realizar cambios a un pull request existente, realiza los cambios a tu rama loca, añade una nuevo commit con esos cambios, y haz a este nuevo commit un push hacia tu fork. GitHub actualizará automáticamente el pull request.

```sh
$ git add my/changed/files
$ git commit
$ git push origin my-branch
```

Existe un número de mecanismos mas avanzados para gestionar commits usando `git rebase` que puede ser usado, pero esta mas allá del alcance de esta guía.

Siéntete libre de postear un comentario en el pull request para avisar a los críticos si estas esperando una respuesta en algo. Si encuentras palabras o acrónimos que parecen desconocidas, consulte este [glosario](https://sites.google.com/a/chromium.org/dev/glossary).

#### Aprobación y Solicitud de Cambios de Workflow

Todos los pull request requieren la aprobación de un [Propietario de Código](https://github.com/orgs/electron/teams/code-owners) en el area que modificaste con el fín de ejecutar. Cada vez que un responsable revisa un pull request ellos pueden solicitar cambios. Estos pueden ser pequeños, tales como corregir un error, o puede implicar cambios sustanciales. Dichas solicitudes tienen la intención de ser útiles, pero a veces pueden venir mediante algo brusco o poco útil, especialmente si no incluyen sugerencias concretas en *como* cambiarlo.

Trata de no estar desmotivado. Si tu sientes que una crítica es injusta, confórmate o busca la entrada de otro contribuyente del proyecto. A menudo ese tipo de comentarios son el resultado de un crítico que no toma el suficiente tiempo para revisar y no son mal intencionados. Estas dificultades a menudo pueden ser resueltas con un poco de paciencia. Dicho esto, se espera que los críticos ofrezcan una crítica útil.

### Paso 11: Ejecutado

Con el fin de ejecutar, un pull request necesita se revisado y aprobado por al menos un Propietario de Código Electron y tarjeta CI. Después de eso, si no hay objeciones de otro contribuyentes, el pull request puede ser combinado.

¡Felicitaciones y gracias por tu contribución!

### Prueba de Integración Continua

Cada pull request se prueva en el sistema de Integracion Continua (CI) para confirmar que funciona en plataformas compatibles con Electron.

Idealmente, el pull request pasara("ser verde") en todas las plataformas de CI. Esto quiere decir que pasa todas las pruebas y no hay errores linting. Sin embargo, no es infrecuente para la infraestructura de CI el fallar en plataformas específicas o como son llamadas pruebas "escamosas" a fallar ("be red"). Cada falla de CI debe ser inspeccionada manualmente para determinar la causa.

CI inicia automáticamente cuando abres un pull request, pero solo los [Liberadores](https://github.com/orgs/electron/teams/releasers/members) pueden reiniciar una ejecución CI. Si usted cree que CI esta dando negativos falsos, pregunta a un Liberador para reiniciar las pruebas.