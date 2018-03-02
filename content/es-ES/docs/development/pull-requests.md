# Solicitud de Retiro

* [Dependencias](#dependencies)
* [Configurando tu entorno local](#setting-up-your-local-environment) 
  * [Paso 1: Bifurcar](#step-1-fork)
  * [Paso 2: Compilado](#step-2-build)
  * [Paso 3: Rama](#step-3-branch)
* [Haciendo Cambios](#making-changes) 
  * [Paso 4: Código](#step-4-code)
  * [Paso 5: Asignar](#step-5-commit) 
    * [Asignar directrices de mensaje](#commit-message-guidelines)
  * [Paso 6: Reorganizar](#step-6-rebase)
  * [Paso 7: Prueba](#step-7-test)
  * [Paso 8: Presione](#step-8-push)
  * [Paso 9: Abriendo la Solicitud de Retiro](#step-8-opening-the-pull-request)
  * [Paso 10: Analizar y actualizar](#step-9-discuss-and-update) 
    * [Aprobación y Solicitud de Cambios de flujo de trabajo](#approval-and-request-changes-workflow)
  * [Paso 11: Aterrizaje](#step-10-landing)
  * [Prueba de Integración Continua](#continuous-integration-testing)

## Configurando tu entorno local

### Paso 1: Bifurcar

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

Una vez que has compilado el proyecto local mente, ¡estas listo para empezar a hacer cambios!

### Paso 3: Rama

Para mantener tu entorno de desarrollo organizado, crea ramas locales para retener tu trabajo. Estos deben ser ramificados directamente de la rama `master`.

```sh
$ git checkout -b my-branch -t upstream/master
```

## Haciendo Cambios

### Paso 4: Código

La mayoría de las solicitudes de extracción abiertas en contra del repositorio `electron/electron` incluyen cambios tanto para el código C/C++ en los archivos `atom/` como para los archivos `brightray/`, el código JavaScript en el archivo `lib/`, la documentación en `docs/api/` o las pruebas en el archivo `spec/`.

Por favor asegúrate de correr `npm run lint` de vez en cuando en cualquier cambio de código para asegurar que estos siguen el estilo de código del proyecto.

Ver [coding style](https://electronjs.org/docs/development/coding-style) para mas información acerca de la mejor práctica cuando se esta modificando el código en diferentes partes del proyecto.

### Paso 5: Asignar

Se le recomienda mantener sus cambios agrupados lógicamente sin individualizar las asignaciones. Muchos contribuyentes encuentras mas fácil el revisar los cambios que son divididos entre multiples asignaciones. No hay límite en el número de asignaciones en una solicitud de retiro.

```sh
$ git add my/changed/files
$ git commit
```

Tenga en cuenta que multiples asignaciones a menudo son aplastados cuando han aterrizado.

#### Asignar directrices de mensaje

Un buen mensaje de asignación debe describir que ha cambiado y por qué.

1. La primera linea debe:
  
  * contener una breve descripción del cambio (preferiblemente 50 caracteres o menos, y no mas de 72 caracteres)
  * estar completamente en minúsculas con la excepción de nombres propios, acrónimos, y las palabras que refieren a un código, como nombres de función/variables
    
    Ejemplos:
  
  * `actualizar la documentacion de compilado osx para un nuevo sdk`
  
  * `fixed typos in atom_api_menu.h`

2. Keep the second line blank.

3. Wrap all other lines at 72 columns.

See [this article](https://chris.beams.io/posts/git-commit/) for more examples of how to write good git commit messages.

### Paso 6: Reorganizar

Once you have committed your changes, it is a good idea to use `git rebase` (not `git merge`) to synchronize your work with the main repository.

```sh
$ git fetch upstream
$ git rebase upstream/master
```

This ensures that your working branch has the latest changes from `electron/electron` master.

### Paso 7: Prueba

Bug fixes and features should always come with tests. A [testing guide](https://electronjs.org/docs/development/testing) has been provided to make the process easier. Looking at other tests to see how they should be structured can also help.

Before submitting your changes in a pull request, always run the full test suite. To run the tests:

```sh
$ npm run test
```

Make sure the linter does not report any issues and that all tests pass. Please do not submit patches that fail either check.

If you are updating tests and just want to run a single spec to check it:

```sh
$ npm run test -match=menu
```

The above would only run spec modules matching `menu`, which is useful for anyone who's working on tests that would otherwise be at the very end of the testing cycle.

### Paso 8: Presione

Once your commits are ready to go -- with passing tests and linting -- begin the process of opening a pull request by pushing your working branch to your fork on GitHub.

```sh
$ git push origin my-branch
```

### Paso 9: Abriendo la Solicitud de Retiro

From within GitHub, opening a new pull request will present you with a template that should be filled out:

```markdown
<!--
Thank you for your pull request. Please provide a description above and review
the requirements below.

Bug fixes and new features should include tests and possibly benchmarks.

Contributors guide: https://github.com/electron/electron/blob/master/CONTRIBUTING.md
-->
```

### Step 10: Discuss and update

You will probably get feedback or requests for changes to your pull request. This is a big part of the submission process so don't be discouraged! Some contributors may sign off on the pull request right away. Others may have detailed comments or feedback. This is a necessary part of the process in order to evaluate whether the changes are correct and necessary.

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

### Paso 11: Aterrizaje

In order to land, a pull request needs to be reviewed and approved by at least one Electron Code Owner and pass CI. After that, if there are no objections from other contributors, the pull request can be merged.

Congratulations and thanks for your contribution!

### Prueba de Integración Continua

Every pull request is tested on the Continuous Integration (CI) system to confirm that it works on Electron's supported platforms.

Ideally, the pull request will pass ("be green") on all of CI's platforms. This means that all tests pass and there are no linting errors. However, it is not uncommon for the CI infrastructure itself to fail on specific platforms or for so-called "flaky" tests to fail ("be red"). Each CI failure must be manually inspected to determine the cause.

CI starts automatically when you open a pull request, but only [Releasers](https://github.com/orgs/electron/teams/releasers/members) can restart a CI run. If you believe CI is giving a false negative, ask a Releaser to restart the tests.