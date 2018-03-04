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

Si cree que ha encontrado un error en Electron, por favor llene este formulario lo mejor posible.

Las dos piezas mas importantes de información necesitadas para evaluar el reporte son, la descripción del error y un caso de prueba simple para recrearlo. Es más fácil corregir un error si se puede reproducir.

Véase [Como crear un Mínimo, Completo y Verificable ejemplo](https://stackoverflow.com/help/mcve).

## Inquirir un Informe de Error

Es común para asuntos abiertos el involucrar una discusión. Algunos contribuyentes pueden tener diferentes opiniones, incluyendo si el comportamiento es un error o una falla. La discusión es parte del proceso y debe mantenerse centrada, útil y profesional.

Respuestas bruscas que no proveen contexto adiciona o detalles de apoyo, no son útiles o profesionales. Para muchos, tales respuestas son molestas y dañinas.

Los contribuyentes están incentivados a resolver inconvenientes de manera colaborativa y ayudarse mutuamente a progresar. Si encuentra un inconveniente que siente que es inválido, o contiene información incorrecta, explica *por qué* se siente de esa manera con ayuda de contexto de apoyo adicional, y estar dispuesto a ser convencido de que puede estar equivocado. Al hacerlo, podemos a menudo alcanzar la correcta solución de manera rápida.

## Resolviendo un Informe de Error

La mayoría de los inconvenientes son resueltos al abrir un pull request. El proceso para abrir y revisar un pull request es similar a abrir e inquirir inconvenientes, pero conlleva una revisión necesaria y aprobar un workflow que asegure que los cambios propuestos tengan el mínimo atributo y criterios funcionales del proyecto Electron.