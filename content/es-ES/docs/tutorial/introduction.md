# Introducción

Bienvenido a la documentacion de Electron! Si es esta es tu primera vez programando una aplicacion de Electron, lea esta sección de Introducción para familiarizarse con lo esencial. De lo contrario, sientase libre de explorar nuestra guias y documentaciones sobre nuestra API!

## What is Electron?

Electron es un framework para crear aplicaciones de escritorio usando JavaScript, HTML y CSS. Incrustando [Chromium][chromium] y [Node.js][node] dentro del mismo, Electron le permite mantener una base de código JavaScript y crear aplicaciones multiplataforma que funcionan en Windows, macOS y Linux, - no requiere experiencia en desarrollo nativo.

## Prerequisitos

Estos documentos funcionan bajo el supuesto de que el lector está familiarizado con ambos Node.js y desarrollo web en general. Si necesita sentirse más cómodo con cualquiera de estas áreas, recomendamos los siguientes recursos:

* [Comenzando con la Web (MDN)][mdn-guide]
* [Introducción a Node.js][node-guide]

Además, tendrá un mejor momento para comprender cómo funciona Electron si obtiene familiarizado con el modelo de proceso de Chromium. You can get a brief overview of Chrome architecture with the [Chrome comic][comic], which was released alongside Chrome's launch back in 2008. Although it's been over a decade since then, the core principles introduced in the comic remain helpful to understand Electron.

## Running examples with Electron Fiddle

[Electron Fiddle][fiddle] is a sandbox app written with Electron and supported by Electron's maintainers. We highly recommend installing it as a learning tool to experiment with Electron's APIs or to prototype features during development.

Fiddle also integrates nicely with our documentation. When browsing through examples in our tutorials, you'll frequently see an "Open in Electron Fiddle" button underneath a code block. If you have Fiddle installed, this button will open a `fiddle.electronjs.org` link that will automatically load the example into Fiddle, no copy-pasting required.

## Obtener ayuda

Are you getting stuck anywhere? Here are a few links to places to look:

* If you need help with developing your app, our [community Discord server][discord] is a great place to get advice from other Electron app developers.
* If you suspect you're running into a bug with the `electron` package, please check the [GitHub issue tracker][issue-tracker] to see if any existing issues match your problem. If not, feel free to fill out our bug report template and submit a new issue.

[chromium]: https://www.chromium.org/
[node]: https://nodejs.org/
[mdn-guide]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[node-guide]: https://nodejs.dev/learn
[comic]: https://www.google.com/googlebooks/chrome/
[fiddle]: https://electronjs.org/fiddle
[issue-tracker]: https://github.com/electron/electron/issues
[discord]: https://discord.gg/electron
