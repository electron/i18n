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

## Pedir ayuda general

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

### Actual comportamiento

<!-- ¿Qué está ocurriendo? -->

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

If you believe that you have found a bug in Electron, please fill out this form to the best of your ability.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It is easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Seguimiento de un Informe de Error

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If you encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Resolviendo un informe de error

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.