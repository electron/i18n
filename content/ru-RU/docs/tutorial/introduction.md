# Введение

Добро пожаловать в документацию Electron! Если вы впервые разрабатываете приложение на Electron, начните знакомство с раздела Getting Started, чтобы ознакомиться с основами. В противном случае, не стесняйтесь изучать наши руководства и документацию по API!

## Что такое Electron?

Electron - это фреймворк для разработки десктопных приложений с использованием HTML, CSS и JavaScript. В двоичный код Electron уже встроены [Chromium][chromium] и [Node.js][node], и это позволяет вам поддерживать только JavaScript код и создавать кроссплатформенные приложение, которые будут работать как на Windows, так и на macOS и Linux без необходимости иметь собственный опыт разработки.

## Требования

Данная документация опирается на предположение о том, что читатель знаком как с Node.js, так и с веб-разработкой в общем виде. Если вы хотите стать более уверенными в какой-либо из этих областей разработки, то мы рекомендуем вам следующие ресурсы для ознакомления:

* [Начало работы с Интернетом (MDN)][mdn-guide]
* [Введение в Node.js][node-guide]

Более того, вы будете лучше понимать, как работает Electron, если вы ознакомитесь с моделью процессов Chromium. Вы можете ознакомиться с кратким обзором архитектуры Chrome с помощью [комикса Chrome][comic], который был выпущен вместе с релизом Chrome в 2008 году. Несмотря на то, что с тех пор прошло более десяти лет, основные принципы, представленные в комиксе, по-прежнему полезны для понимания Electron.

## Эксперименты с Electron Fiddle

[Electron Fiddle][fiddle] - песочница, написанная на Electron и поддерживаемая разработчиками Electron. Мы настоятельно рекомендуем установить его в качестве обучающего инструмента для экспериментов с API-интерфейсами Electron или для создания прототипов функций во время разработки.

Fiddle также прекрасно интегрируется с нашей документацией. When browsing through examples in our tutorials, you'll frequently see an "Open in Electron Fiddle" button underneath a code block. If you have Fiddle installed, this button will open a `fiddle.electronjs.org` link that will automatically load the example into Fiddle, no copy-pasting required.

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
