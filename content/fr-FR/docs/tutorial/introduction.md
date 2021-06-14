# Introduction

Welcome to the Electron documentation! If this is your first time developing an Electron app, read through this Getting Started section to get familiar with the basics. Otherwise, feel free to explore our guides and API documentation!

## Qu'est-ce qu'Electron ?

Electron is a framework for building desktop applications using JavaScript, HTML, and CSS. By embedding [Chromium][chromium] and [Node.js][node] into its binary, Electron allows you to maintain one JavaScript codebase and create cross-platform apps that work on Windows, macOS, and Linux — no native development experience required.

## Prérequis

These docs operate under the assumption that the reader is familiar with both Node.js and general web development. Si vous avez besoin d'être plus à l'aise avec l'un ou l'autre de ces domaines, nous vous recommandons les ressources suivantes :

* [Commencer avec le Web (MDN)][mdn-guide]
* [Introduction à Node.js][node-guide]

De plus, vous comprendrez mieux comment fonctionne Electron si vous vous familiarisé avec le modèle de processus de Chromium. Vous pouvez obtenir un bref aperçu de l'architecture Chrome avec la [bande dessinée Chrome ][comic], qui a été publiée en même temps que le lancement de Chrome en 2008. Although it's been over a decade since then, the core principles introduced in the comic remain helpful to understand Electron.

## Running examples with Electron Fiddle

[Electron Fiddle][fiddle] est une application de type bac à sable écrite avec Electron et supportée par les contributeurs d'Electron. We highly recommend installing it as a learning tool to experiment with Electron's APIs or to prototype features during development.

Fiddle s'intègre également parfaitement à notre documentation. When browsing through examples in our tutorials, you'll frequently see an "Open in Electron Fiddle" button underneath a code block. If you have Fiddle installed, this button will open a `fiddle.electronjs.org` link that will automatically load the example into Fiddle, no copy-pasting required.

## Pour obtenir de l'aide

Are you getting stuck anywhere? Voici quelques liens vers des endroits où chercher :

* Si vous avez besoin d'aide pour développer votre application, notre [serveur communautaire Discord][discord] est un excellent endroit pour obtenir des conseils d'autres développeurs d'applications Electron.
* If you suspect you're running into a bug with the `electron` package, please check the [GitHub issue tracker][issue-tracker] to see if any existing issues match your problem. If not, feel free to fill out our bug report template and submit a new issue.

[chromium]: https://www.chromium.org/
[node]: https://nodejs.org/
[mdn-guide]: https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web
[node-guide]: https://nodejs.dev/learn
[comic]: https://www.google.com/googlebooks/chrome/
[fiddle]: https://electronjs.org/fiddle
[issue-tracker]: https://github.com/electron/electron/issues
[discord]: https://discord.gg/electron
