# Problemas en Electron

* [Cómo contribuir a problemas](#how-to-contribute-to-issues)
* [Pedir ayuda general](#asking-for-general-help)
* [Presentar un informe de error](#submitting-a-bug-report)
* [Seguimiento de un Informe de Error](#triaging-a-bug-report)
* [Resolviendo un informe de error](#resolving-a-bug-report)

## Cómo contribuir a problemas

Para cualquier problema, existen fundamentalmente tres maneras en las que un individuo puede contribuir:

1. By opening the issue for discussion: If you believe that you have found a new bug in Electron, you should report it by creating a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues).
2. Ayudando en el seguimiento del problema: Puedes hacerlo proporcionando detalles asistivos (un caso de prueba reproducible que demuestra el fallo) o proporcionando sugerencias para abordar el problema.
3. Ayudando a resolver el problema: Esto se puede hacer demostrando que el problema no es un fallo o fue arreglado; Pero mas a menudo, abriendo un pull request que cambia el código fuente de `electron/electron` de una manera concreta y susceptible de revisión.

## Pidiendo ayuda general

["Finding Support"](../tutorial/support.md#finding-support) tiene una lista de recursos para obtener ayuda de programación, reportar problemas de seguridad, contribuir y más. ¡Por favor, use el gestor de incidencias solo para errores!

## Presentar un informe de error

Para enviar un informe de error:

When opening a new issue in the [`electron/electron` issue tracker](https://github.com/electron/electron/issues/new/choose), users will be presented with [a template](https://github.com/electron/electron/blob/master/.github/ISSUE_TEMPLATE/Bug_report.md) that should be filled in.

If you believe that you have found a bug in Electron, please fill out the template to the best of your ability.

Las dos informaciones mas importantes necesarias para evaluar el informe son, la descripción del error y un caso de prueba simple para recrearlo. It is easier to fix a bug if it can be reproduced.

Véase [Como crear un Mínimo, Completo y Verificable ejemplo](https://stackoverflow.com/help/mcve).

## Seguimiento de un Informe de Error

Es común que los problemas abiertos se acompañen con un debate. Algunos contribuyentes pueden tener diferentes opiniones, incluyendo si se comporta como un fallo o una funcionalidad. La discusión es parte del proceso y debe mantenerse centrada, útil y profesional.

Respuestas bruscas que no proveen contexto adiciona o detalles de apoyo, no son útiles o profesionales. Para muchos, tales respuestas son molestas y dañinas.

Los contribuyentes están animados a resolver problemas de manera colaborativa y ayudarse mutuamente a progresar. Si encuentras un fallo que crees que es inválido o que contiene información errónea, explica *por qué* crees eso añadiendo contexto adicional y estando dispuesto a convencerse de que puedes estar equivocado. Al hacerlo, podemos a menudo alcanzar la solución correcta de manera rápida.

## Resolviendo un informe de error

La mayoría de los problemas son resueltos al abrir un pull request. El proceso para abrir y revisar un pull request es similar a abrir y seguir los problemas, pero conlleva una revisión necesaria y aprobar un workflow que asegure que los cambios propuestos tengan una mínima calidad y criterios funcionales del proyecto Electron.
