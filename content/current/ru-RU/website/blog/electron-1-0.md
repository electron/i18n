---
title: Electron 1.0
author: джлорд
date: '2016-05-11'
---

На протяжении последних двух лет Electron помогал разработчикам создавать кросс-платформенные настольные приложения с помощью HTML, CSS и JavaScript. Теперь мы рады поделиться важной вехой в для нашей платформы и для сообщества, создавшего ее. Выпуск Electron 1.0 теперь доступен в [electronjs.org](https://electronjs.org).

---

![Electron 1.0](https://cloud.githubusercontent.com/assets/378023/15007352/315f5eea-1213-11e6-984e-21f5dab31267.png)

Electron 1.0 представляет собой главную веху в стабильности API и зрелости. Этот релиз позволяет создавать приложения, которые действуют и чувствуют себя действительно родными в Windows, Mac и Linux. Создавать приложения Electron легче, чем когда-либо с новыми документами, новыми инструментами и новым приложением, чтобы обойти вас через Electron API.

Если вы готовы создать свое первое приложение Electron, вот [быстрый старт](https://electronjs.org/docs/tutorial/quick-start) поможет вам начать работу.

Мы с удовольствием посмотрим, что вы построили дальше с Electron.

## Путь электрона

Мы выпустили Electron, когда мы запустили [Atom](https://atom.io) чуть более двух лет назад. Electron, затем известный как Atom Shell, был каркасом, на котором мы построили Atom на вершине. В эти дни Атом стал движущей силой, лежащей за функциями и функциями, которые Electron предоставил после того, как мы толкнули к тому, чтобы получить первоначальный выпуск Atom исхода.

Теперь вождение Electron является растущим сообществом разработчиков и компаний строит все на основе [электронной почты](https://nylas.com), [чата](https://slack.com), и [Git-приложения](https://www.gitkraken.com) для [Инструменты аналитики SQL](https://www.wagonhq.com), [клиентов торрентов](https://webtorrent.io/desktop), и [робота](https://www.jibo.com).

За последние два года мы видели как компании, так и проекты с открытым исходным кодом выбрали Electron в качестве основы для своих приложений. Только в прошлом году Electron был загружен более 1,2 миллиона раз. [Ознакомьтесь с](https://electronjs.org/apps) некоторыми из удивительных приложений Electron и добавьте свои собственные приложения, если они еще не там.

![Загрузки Electron](https://cloud.githubusercontent.com/assets/378023/15037731/af7e87e0-12d8-11e6-94e2-117c360d0ac9.png)

## Демонстрации Electron API

Along with the 1.0 release, we're releasing a new app to help you explore the Electron APIs and learn more about how to make your Electron app feel native. Приложение [Electron API Demos](https://github.com/electron/electron-api-demos) содержит фрагменты кода, которые помогут запустить ваше приложение и советы по эффективному использованию Electron API.

[![Демонстрации Electron API](https://cloud.githubusercontent.com/assets/378023/15138216/590acba4-16c9-11e6-863c-bdb0d3ef3eaa.png)](https://github.com/electron/electron-api-demos)

## Devtron

Мы также добавили новое расширение, чтобы помочь вам отладить ваши приложения Electron . [Devtron](https://electronjs.org/devtron) является открытым исходным кодом расширением для [Инструментов разработчика Chrome](https://developer.chrome.com/devtools) , призванных помочь вам проверить, отладка и устранение неполадок вашего приложения Electron.

[![Devtron](https://cloud.githubusercontent.com/assets/378023/15138217/590c8b06-16c9-11e6-8af6-ef96299e85bc.png)](https://electronjs.org/devtron)

### Возможности

  * **Require graph** that helps you visualize your app's internal and external library dependencies in both the main and renderer processes
  * **IPC монитор** , который отслеживает и отображает отправленные и полученные сообщения между процессами в вашем приложении
  * **Событие инспектор** показывает вам события и слушатели, которые зарегистрированы в вашем приложении на ядре Electron API, такие как окно, приложение и процессы
  * **App Linter** , который проверяет ваши приложения на наличие общих ошибок и недостающей функциональности

## Spectron

Наконец, мы выпускаем новую версию [Spectron](https://electronjs.org/spectron), интеграцию тестирования фреймворка для Electron приложений.

[![Spectron](https://cloud.githubusercontent.com/assets/378023/15138218/590d50c2-16c9-11e6-9b54-2d73729fe189.png)](https://electronjs.org/spectron)

Спектр 3. имеет полную поддержку всего Electron API, позволяя более быстро писать тесты, которые подтверждают поведение вашего приложения в различных сценариях и окружениях. Спектр основан на [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver) и [WebDriverIO](http://webdriver.io) , поэтому у него также полные API для навигации по страницам, пользователь вводит и выполняет JavaScript.

## Сообщество

Electron 1.0 является результатом усилий сообщества сотен разработчиков. За пределами ядра были выпущены сотни библиотек и инструментов для упрощения разработки, упаковки и установки приложений Electron.

Сейчас появилась новая страница [сообщества](https://electronjs.org/community) с описанием многих замечательных инструментов Electron, приложений, библиотек и фреймворков. Вы также можете проверить [Electron](https://github.com/electron) и [Electron Userland](https://github.com/electron-userland) , чтобы увидеть некоторые из этих фантастических проектов.

Новые в Electron? Смотрите вводное видео Electron 1.0:

<div class="video"><iframe src="https://www.youtube.com/embed/8YP_nOCO-4Q?rel=0" frameborder="0" allowfullscreen></iframe></div>

