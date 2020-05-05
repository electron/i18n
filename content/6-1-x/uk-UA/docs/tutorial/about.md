# Про Electron

[Electron](https://electronjs.org) це бібліотека з відкритим вихідним кодом для побудови крос-платформних настільних додатків з HTML, CSS та JavaScript. Розроблена компанією GitHub. Електрон вирішує цю задачу об'єднуючи [Chromium](https://www.chromium.org/Home) та [Node.js](https://nodejs.org) в одне середовище виконання та застосунки, що можуть бути упаковані для Mac, Windows і Linux.

Electron began in 2013 as the framework on which [Atom](https://atom.io), GitHub's hackable text editor, would be built. The two were open sourced in the Spring of 2014.

It has since become a popular tool used by open source developers, startups, and established companies. [See who is building on Electron](https://electronjs.org/apps).

Читайте далі, щоб дізнатись більше про авторів та резіли Electron або почніть працювати з Electron за допомогою [короткого посібника](quick-start.md).

## Основна команда та автори

Electron підтримується командою GitHub, а також групою [активних учасників](https://github.com/electron/electron/graphs/contributors) спільноти. Деякі автори самозайняті, а деякі працюють у великих компаніях, які розвиваються разом з Electron. Ми будемо раді додати постійних учасників проекту в якості супроводжуючих. Детальніше про [Розвиток Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Релізи

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Оновлення Залежностей

Версія Chromium в Electron зазвичай обновляється напротязі одного чи двох тижнів після релізу нової стабільної версії Chromium, в залежності від обєму робіт, звязаних з оновленням.

Після релізу нової версії Node.js, Electron зазвичай випускає оновлення приблизно через місяць, щоб переконатись у стабільності останньої версії.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this _just works_ but sometimes it means patching Node.js.


### Версії

Починаючи з версії 2.0 Electron [використовує `семантичне версіювання`](https://semver.org). Для більшості додатків і при використанні останніх версій npm, команда `$ npm install electron` зробить свою справу.

Process оновлення версій детально описаний в нашому [документі версій](electron-versioning.md).

### LTS

На даний час підтримки більш старіших версій Electron не існує. Якщо ваша поточна версія Electron у вас працює, ви можете залишатись на ній стільки - скільки завгодно. Якщо ви хочете використовувати нові можливості по мірі їх надходження, вам потрібно перейти на новішу версію.

Основні оновлення появились з версією `v1.0.0`. Якщо ви ще не використовуєте цю версію, вам необхідно [ознайомитись більше із змінами у версії `v1.0.0`](https://electronjs.org/blog/electron-1-0).

## Основна філософія

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. Перегляньте [інструменти, побудовані спільнотою Electron](https://electronjs.org/community).

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
