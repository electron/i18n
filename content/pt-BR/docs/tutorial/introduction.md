# Introdução

Bem vindo a documentação do Electron If this is your first time developing an Electron app, read through this Getting Started section to get familiar with the basics. Otherwise, feel free to explore our guides and API documentation!

## O que é o Electron?

Electron é um framework que te permite criar aplicações desktop com JavaScript, HTML e CSS. By embedding [Chromium][chromium] and [Node.js][node] into its binary, Electron allows you to maintain one JavaScript codebase and create cross-platform apps that work on Windows, macOS, and Linux — no native development experience required.

## Pré-requisitos

Estes documentos operam sob a suposição de que o leitor está familiarizado com Node.js e desenvolvimento web geral. Se você precisar se sentir mais confortável com qualquer uma dessas áreas, recomendamos os seguintes recursos:

* [Getting started with the Web (MDN)][mdn-guide]
* [Introduction to Node.js][node-guide]

Além disso, você terá um tempo melhor para entender como o Electron funciona se você tiver conhecido o modelo de processo do Chromium. You can get a brief overview of Chrome architecture with the [Chrome comic][comic], which was released alongside Chrome's launch back in 2008. Embora já tenha mais de uma década desde então, os princípios fundamentais introduzidos na Google Comic permanecem úteis para entender a Electron.

## Exemplos de execução com Electron Fiddle

[Electron Fiddle][fiddle] is a sandbox app written with Electron and supported by Electron's maintainers. É altamente recomendável instalá-lo como uma ferramenta de aprendizado para experiências com APIs do Electron, ou para protótipos de recursos durante o desenvolvimento.

O Fiddle também se integra muito bem com a nossa documentação. Ao navegar pelos exemplos em nossos tutoriais, você frequentemente verá um botão "Abrir no Electron Fiddle" abaixo de um bloco de código. Se você tiver o Fiddle instalado, este botão abrirá um `fiddle.electronjs. rg` link que carregará automaticamente o exemplo no Fiddle, nenhuma cópia é necessária.

## Getting help

Você está ficando preso em algum lugar? Aqui estão alguns links de lugares para procurar:

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
