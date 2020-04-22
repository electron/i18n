# Problemas en Electron

* [How to Contribute to Issues](#how-to-contribute-to-issues)
* [Pedir ayuda general](#asking-for-general-help)
* [Presentar un informe de error](#submitting-a-bug-report)
* [Seguimiento de un Informe de Error](#triaging-a-bug-report)
* [Resolviendo un informe de error](#resolving-a-bug-report)

## How to Contribute to Issues

Para cualquier problema, existen fundamentalmente tres maneras en las que un individuo puede contribuir:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. Ayudando en el seguimiento del problema: Puedes hacerlo proporcionando detalles asistivos (un caso de prueba reproducible que demuestra el fallo) o proporcionando sugerencias para abordar el problema.
3. Ayudando a resolver el problema: Esto se puede hacer demostrando que el problema no es un fallo o fue arreglado; Pero mas a menudo, abriendo un pull request que cambia el código fuente de `electron/electron` de una manera concreta y susceptible de revisión.

## Pidiendo ayuda general

["Finding Support"](../tutorial/support.md#finding-support) tiene una lista de recursos para obtener ayuda de programación, reportar problemas de seguridad, contribuir y más. ¡Por favor, use el gestor de incidencias solo para errores!

## Presentar un informe de error

To submit a bug report:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with a template that should be filled in.

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

### Actual comportamiento<!-- ¿Qué está ocurriendo? -->### How to reproduce

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

Las dos informaciones mas importantes necesarias para evaluar el informe son, la descripción del error y un caso de prueba simple para recrearlo. It is easier to fix a bug if it can be reproduced.

Véase [Como crear un Mínimo, Completo y Verificable ejemplo](https://stackoverflow.com/help/mcve).

## Seguimiento de un Informe de Error

Es común que los problemas abiertos se acompañen con un debate. Algunos contribuyentes pueden tener diferentes opiniones, incluyendo si se comporta como un fallo o una funcionalidad. La discusión es parte del proceso y debe mantenerse centrada, útil y profesional.

Respuestas bruscas que no proveen contexto adiciona o detalles de apoyo, no son útiles o profesionales. Para muchos, tales respuestas son molestas y dañinas.

Los contribuyentes están animados a resolver problemas de manera colaborativa y ayudarse mutuamente a progresar. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. Al hacerlo, podemos a menudo alcanzar la solución correcta de manera rápida.

## Resolviendo un informe de error

La mayoría de los problemas son resueltos al abrir un pull request. El proceso para abrir y revisar un pull request es similar a abrir y seguir los problemas, pero conlleva una revisión necesaria y aprobar un workflow que asegure que los cambios propuestos tengan una mínima calidad y criterios funcionales del proyecto Electron.
