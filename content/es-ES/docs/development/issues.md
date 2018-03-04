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

Las dos piezas mas importantes de información necesitadas para evaluar el reporte son, la descripción del error y un caso de prueba simple para recrearlo. Es más fácil corregir un error si se puede reproducir.

Véase [Como crear un Mínimo, Completo y Verificable ejemplo](https://stackoverflow.com/help/mcve).

## Inquirir un Informe de Error

Es común para asuntos abiertos el involucrar una discusión. Algunos contribuyentes pueden tener diferentes opiniones, incluyendo si el comportamiento es un error o una falla. La discusión es parte del proceso y debe mantenerse centrada, útil y profesional.

Respuestas bruscas que no proveen contexto adiciona o detalles de apoyo, no son útiles o profesionales. To many, such responses are annoying and unfriendly.

Contributors are encouraged to solve issues collaboratively and help one another make progress. If encounter an issue that you feel is invalid, or which contains incorrect information, explain *why* you feel that way with additional supporting context, and be willing to be convinced that you may be wrong. By doing so, we can often reach the correct outcome faster.

## Resolviendo un Informe de Error

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.