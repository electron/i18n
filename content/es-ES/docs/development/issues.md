# Inconvenientes en Electron

# Inconvenientes

* [Cómo contribuir en un inconveniente](#how-to-contribute-in-issues)
* [Pedir Ayuda General](#asking-for-general-help)
* [Presentar un informe de error](#submitting-a-bug-report)
* [Inquirir un Informe de Error](#triaging-a-bug-report)
* [Resolviendo un Informe de Error](#resolving-a-bug-report)

## Cómo contribuir en un inconveniente

Para cualquier inconveniente, existen tres maneras fundamentales en las que un individuo puede contribuir:

1. Abriendo el inconveniente como "tema" en una discusión: Si crees haber encontrado un nuevo error en Electro, debes reportarlo creando un nuevo asunto en el rastreador de inconvenientes `electron/electron`.
2. Ayudando a examinar el inconveniente: Puedes hacer esto tanto proporcionando detalles de asistencia (un caso de prueba reproducible que demuestra un error) como proporcionando sugerencias para abordar el inconveniente.
3. Ayudando a resolver el inconveniente: Esto se puede hacer demostrando que el inconveniente no es un error o se fue arreglado; Pero mas a menudo, abriendo un pull request que cambia la fuente de `electron/electron` a una manera concreta y susceptible de revisión.

## Pedir Ayuda General

Porque es tan alto el nivel de actividad en el repositorio `electron/electron`, preguntas o peticiones por ayuda general usando Electron deben orientarse al [canal de comunidad holgazana](https://atomio.slack.com) o al [foro](https://discuss.atom.io/c/electron).

## Presentar un informe de error

Al abrir un nuevo asunto en el rastreador de inconvenientes `electron/electron`, los usuarios serán presentados con una plantilla que debe ser llenada.

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

Si cree que ha encontrado un error en Electron, por favor llene este formulario con sus mejores habilidades.

The two most important pieces of information needed to evaluate the report are a description of the bug and a simple test case to recreate it. It easier to fix a bug if it can be reproduced.

See [How to create a Minimal, Complete, and Verifiable example](https://stackoverflow.com/help/mcve).

## Inquirir un Informe de Error

It's common for open issues to involve discussion. Some contributors may have differing opinions, including whether the behavior is a bug or feature. This discussion is part of the process and should be kept focused, helpful, and professional.

Terse responses that provide neither additional context nor supporting detail are not helpful or professional. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Resolviendo un Informe de Error

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.