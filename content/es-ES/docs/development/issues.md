# Problemas en Electron

# Problemas

* [Cómo contribuir para arreglar los problemas](#how-to-contribute-in-issues)
* [Pedir ayuda general](#asking-for-general-help)
* [Presentar un informe de error](#submitting-a-bug-report)
* [Seguimiento de un Informe de Error](#triaging-a-bug-report)
* [Resolviendo un informe de error](#resolving-a-bug-report)

## Cómo contribuir para arreglar los problemas

Para cualquier problema, existen fundamentalmente tres maneras en las que un individuo puede contribuir:

1. Mostrando el problema en una discusión: si crees haber encontrado un nuevo fallo en Electron, debes reportarlo creando un nuevo problema en el issue tracker de `electron/electron`.
2. Ayudando en el seguimiento del problema: Puedes hacerlo proporcionando detalles asistivos (un caso de prueba reproducible que demuestra el fallo) o proporcionando sugerencias para abordar el problema.
3. Ayudando a resolver el problema: Esto se puede hacer demostrando que el problema no es un fallo o fue arreglado; Pero mas a menudo, abriendo un pull request que cambia el código fuente de `electron/electron` de una manera concreta y susceptible de revisión.

## Pedir ayuda general

["Finding Support"](../tutorial/support.md#finding-support) has a list of resources for getting programming help, reporting security issues, contributing, and more. Please use the issue tracker for bugs only!

## Presentar un informe de error

Al abrir un nuevo problema en el issue tracker de `electron/electron`, a los usuarios se les presentará una plantilla que deberá ser rellenada.

```markdown
<!--
Thanks for opening an issue! A few things to keep in mind:

- The issue tracker is only for bugs and feature requests.
- Before reporting a bug, please try reproducing your issue against
  the latest version of Electron.
- If you need general advice, join our Slack: http://atom-slack.herokuapp.com
-->

* Electron version:
* Operating system:

### Expected behavior

<!-- What do you think should happen? -->

### Actual behavior

<!-- What actually happens? -->

### How to reproduce

<!--

Your best chance of getting this bug looked at quickly is to provide a REPOSITORY that can be cloned and run.

You can fork https://github.com/electron/electron-quick-start and include a link to the branch with your changes.

If you provide a URL, please list the commands required to clone/setup/run your repo e.g.

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron .

-->
```

Si cree que ha encontrado un fallo en Electron, por favor rellene este formulario lo mejor posible.

Las dos informaciones mas importantes necesarias para evaluar el informe son, la descripción del error y un caso de prueba simple para recrearlo. Es más fácil corregir un fallo si se puede reproducir.

Véase [Como crear un Mínimo, Completo y Verificable ejemplo](https://stackoverflow.com/help/mcve).

## Seguimiento de un Informe de Error

Es común que los problemas abiertos se acompañen con un debate. Algunos contribuyentes pueden tener diferentes opiniones, incluyendo si se comporta como un fallo o una funcionalidad. La discusión es parte del proceso y debe mantenerse centrada, útil y profesional.

Respuestas bruscas que no proveen contexto adiciona o detalles de apoyo, no son útiles o profesionales. Para muchos, tales respuestas son molestas y dañinas.

Los contribuyentes están animados a resolver problemas de manera colaborativa y ayudarse mutuamente a progresar. Si encuentra un problema que cree que es nulo, o contiene información incorrecta, explique *por qué* lo cree de esa manera con un contexto de soporte adicional, y esté dispuesto a ser convencido de que pueda estar equivocado. Al hacerlo, podemos a menudo alcanzar la solución correcta de manera rápida.

## Resolviendo un informe de error

La mayoría de los problemas son resueltos al abrir un pull request. El proceso para abrir y revisar un pull request es similar a abrir y seguir los problemas, pero conlleva una revisión necesaria y aprobar un workflow que asegure que los cambios propuestos tengan una mínima calidad y criterios funcionales del proyecto Electron.