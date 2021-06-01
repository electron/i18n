# Введение

Добро пожаловать в документацию Electron! Если вы впервые разрабатываете приложение Electron, прочтите этот раздел Getting Started, чтобы ознакомиться с основами. В противном случае, не стесняйтесь изучить наши руководства и документацию по API!

## Что такое Electron?

Electron это фреймворк для разработки десктопных приложений с использованием HTML, CSS и JavaScript. By embedding [Chromium][chromium] and [Node.js][node] into its binary, Electron allows you to maintain one JavaScript codebase and create cross-platform apps that work on Windows, macOS, and Linux — no native development experience required.

## Требования

Данная документация опирается на предположение о том, что читатель знаком как с Node.js, так и с веб-разработкой в общем виде. If you need to get more comfortable with either of these areas, we recommend the following resources:

* [Getting started with the Web (MDN)][mdn-guide]
* [Introduction to Node.js][node-guide]

Более того, вы будете лучше понимать, как работает Electron, если вы ознакомитесь с моделью процессов Chromium. You can get a brief overview of Chrome architecture with the [Chrome comic][comic], which was released alongside Chrome's launch back in 2008. Although it's been over a decade since then, the core principles introduced in the comic remain helpful to understand Electron.

## Running examples with Electron Fiddle

[Electron Fiddle][fiddle] is a sandbox app written with Electron and supported by Electron's maintainers. We highly recommend installing it as a learning tool to experiment with Electron's APIs or to prototype features during development.

Fiddle also integrates nicely with our documentation. When browsing through examples in our tutorials, you'll frequently see an "Open in Electron Fiddle" button underneath a code block. If you have Fiddle installed, this button will open a `fiddle.electronjs.org` link that will automatically load the example into Fiddle, no copy-pasting required.

## Getting help

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
