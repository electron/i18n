# Про Electron

[Electron](https://electronjs.org) це бібліотека з відкритим вихідним кодом для побудови крос-платформних настільних додатків з HTML, CSS та JavaScript. Розроблена компанією GitHub. Електрон вирішує цю задачу об'єднуючи [Chromium](https://www.chromium.org/Home) та [Node.js](https://nodejs.org) в одне середовище виконання та застосунки, що можуть бути упаковані для Mac, Windows і Linux.

Electron засновано в 2013 році як фреймворк на якому згодом буде створено [Atom](https://atom.io) - хакерський текстовий редактор від GitHub. Весною 2014 року вони стали open-source.

Від того часу він став популярним інструментом, який використовується розробниками з відкритим вихідним кодом, стартапами та великими компаніями. [Подивіться хто використовує Electron](https://electronjs.org/apps).

Читайте далі, щоб дізнатись більше про авторів та резіли Electron або почніть працювати з Electron за допомогою [короткого посібника](quick-start.md).

## Основна команда та автори

Electron підтримується командою GitHub, а також групою [активних учасників](https://github.com/electron/electron/graphs/contributors) спільноти. Деякі автори самозайняті, а деякі працюють у великих компаніях, які розвиваються разом з Electron. We're happy to add frequent contributors to the project as maintainers. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Релізи

[Релізи Electron](https://github.com/electron/electron/releases) виходять часто. Ми їх випускається, коли є виправлення важливих помилок, новий API або обновлена версія Chromium чи Node.js.

### Оновлення Залежностей

Версія Chromium в Electron зазвичай обновляється напротязі одного чи двох тижнів після релізу нової стабільної версії Chromium, в залежності від обєму робіт, звязаних з оновленням.

Після релізу нової версії Node.js, Electron зазвичай випускає оновлення приблизно через місяць, щоб переконатись у стабільності останньої версії Node.js.

У Electron Node.js та Chromium використовують один екзеппляр V8 - зазвичай версію, яку використовує Chromium. У більшості випадків це *працює* але іколи вимагає оновлення Node.js.

### Версії

Починаючи з версії 2.0 Electron [використовує `семантичні версії`](https://semver.org). Для більшості додатків і при використанні останніх версій npm, команда `$ npm install electron` зробить свою справу.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Core Philosophy

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## Історія

Нижче наведені віхи історії Electron.

| :calendar:       | :tada:                                                                                                        |
| ---------------- | ------------------------------------------------------------------------------------------------------------- |
| **Квітень 2013** | [Стартував Atom Shell](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Травень 2014** | [Відкрився доступ до коду Atom Shell](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).          |
| **Квітень 2015** | [Atom Shell перейменований в Electron](https://github.com/electron/electron/pull/1389).                       |
| **Травень 2016** | [Випуск Electron `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                         |
| **Травень 2016** | [Застосунки Electron стали сумісні з Mac App Store](mac-app-store-submission-guide.md).                       |
| **Серпень 2016** | [Windows Store підтримує застосунки Electron](windows-store-guide.md).                                        |