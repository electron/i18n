---
title: Electron 1.0
author: джлорд
date: '2016-05-11'
---

На протяжении последних двух лет Electron помогал разработчикам создавать кросс-платформенные настольные приложения с помощью HTML, CSS и JavaScript. Теперь мы рады поделиться важной вехой в для нашей платформы и для сообщества, создавшего ее. The release of Electron 1.0 is now available from [electronjs.org][electronjs.org].

---

![Electron 1.0](https://cloud.githubusercontent.com/assets/378023/15007352/315f5eea-1213-11e6-984e-21f5dab31267.png)

Electron 1.0 представляет собой главную веху в стабильности API и зрелости. Этот релиз позволяет создавать приложения, которые действуют и чувствуют себя действительно родными в Windows, Mac и Linux. Создавать приложения Electron легче, чем когда-либо с новыми документами, новыми инструментами и новым приложением, чтобы обойти вас через Electron API.

If you're ready to build your very first Electron app, here's a [quick start guide][quick-start] to help you get started.

Мы с удовольствием посмотрим, что вы построили дальше с Electron.

## Путь электрона

We released Electron when we launched [Atom][atom] a little over two years ago. Electron, затем известный как Atom Shell, был каркасом, на котором мы построили Atom на вершине. В эти дни Атом стал движущей силой, лежащей за функциями и функциями, которые Electron предоставил после того, как мы толкнули к тому, чтобы получить первоначальный выпуск Atom исхода.

Now driving Electron is a growing community of developers and companies building everything from [email][nylas], [chat][slack], and [Git apps][gitkraken] to [SQL analytics tools][wagon], [torrent clients][webtorrent], and [robots][jibo].

За последние два года мы видели как компании, так и проекты с открытым исходным кодом выбрали Electron в качестве основы для своих приложений. Только в прошлом году Electron был загружен более 1,2 миллиона раз. [Take a tour][apps] of some of the amazing Electron apps and add your own if it isn't already there.

![Загрузки Electron](https://cloud.githubusercontent.com/assets/378023/15037731/af7e87e0-12d8-11e6-94e2-117c360d0ac9.png)

## Демонстрации Electron API

Along with the 1.0 release, we're releasing a new app to help you explore the Electron APIs and learn more about how to make your Electron app feel native. The [Electron API Demos][electron-api-demos] app contains code snippets to help you get your app started and tips on effectively using the Electron APIs.

[![Демонстрации Electron API](https://cloud.githubusercontent.com/assets/378023/15138216/590acba4-16c9-11e6-863c-bdb0d3ef3eaa.png)][electron-api-demos]

## Devtron

Мы также добавили новое расширение, чтобы помочь вам отладить ваши приложения Electron . [Devtron][devtron] is an open-source extension to the [Chrome Developer Tools][devtools] designed to help you inspect, debug, and troubleshoot your Electron app.

[![Devtron](https://cloud.githubusercontent.com/assets/378023/15138217/590c8b06-16c9-11e6-8af6-ef96299e85bc.png)][devtron]

### Возможности

  * **Require graph** that helps you visualize your app's internal and external library dependencies in both the main and renderer processes
  * **IPC монитор** , который отслеживает и отображает отправленные и полученные сообщения между процессами в вашем приложении
  * **Событие инспектор** показывает вам события и слушатели, которые зарегистрированы в вашем приложении на ядре Electron API, такие как окно, приложение и процессы
  * **App Linter** , который проверяет ваши приложения на наличие общих ошибок и недостающей функциональности

## Spectron

Finally, we're releasing a new version of [Spectron][spectron], the integration testing framework for Electron apps.

[![Spectron](https://cloud.githubusercontent.com/assets/378023/15138218/590d50c2-16c9-11e6-9b54-2d73729fe189.png)][spectron]

Спектр 3. имеет полную поддержку всего Electron API, позволяя более быстро писать тесты, которые подтверждают поведение вашего приложения в различных сценариях и окружениях. Spectron is based on [ChromeDriver][chromedriver] and [WebDriverIO][webdriver] so it also has full APIs for page navigation, user input, and JavaScript execution.

## Сообщество

Electron 1.0 является результатом усилий сообщества сотен разработчиков. За пределами ядра были выпущены сотни библиотек и инструментов для упрощения разработки, упаковки и установки приложений Electron.

There is now a new [community][community] page that lists many of the awesome Electron tools, apps, libraries, and frameworks being developed. You can also check out the [Electron][electron-org] and [Electron Userland][electron-userland] organizations to see some of these fantastic projects.

Новые в Electron? Смотрите вводное видео Electron 1.0:

<div class="video"><iframe src="https://www.youtube.com/embed/8YP_nOCO-4Q?rel=0" frameborder="0" allowfullscreen></iframe></div>
[apps]: https://electronjs.org/apps
[atom]: https://atom.io
[chromedriver]: https://sites.google.com/a/chromium.org/chromedriver
[community]: https://electronjs.org/community
[devtools]: https://developer.chrome.com/devtools
[devtron]: https://electronjs.org/devtron
[devtron]: https://electronjs.org/devtron
[electronjs.org]: https://electronjs.org
[electron-api-demos]: https://github.com/electron/electron-api-demos
[electron-api-demos]: https://github.com/electron/electron-api-demos
[electron-org]: https://github.com/electron
[electron-userland]: https://github.com/electron-userland
[gitkraken]: https://www.gitkraken.com
[jibo]: https://www.jibo.com
[nylas]: https://nylas.com
[quick-start]: https://electronjs.org/docs/tutorial/quick-start
[slack]: https://slack.com
[spectron]: https://electronjs.org/spectron
[spectron]: https://electronjs.org/spectron
[wagon]: https://www.wagonhq.com
[webtorrent]: https://webtorrent.io/desktop
[webdriver]: http://webdriver.io

