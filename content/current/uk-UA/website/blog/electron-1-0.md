---
title: Electron 1.0
author: молодший
date: '2016-05-11'
---

Протягом останніх двох років, Electron допоміг розробникам створювати крос-платформу настільні застосунки за допомогою HTML, CSS та JavaScript. Зараз ми раді поділитися основною етапом для нашого фреймворку та спільнотою, яка його створила. Версія Electron 1.0 тепер доступна з [electronjs.org](https://electronjs.org).

---

![Electron 1.0](https://cloud.githubusercontent.com/assets/378023/15007352/315f5eea-1213-11e6-984e-21f5dab31267.png)

Electron 1.0 являє собою великий етап в стабільності та зрілості. Цей реліз дозволяє створювати програми, які діють і відчувають себе справді носієм на Windows, Mac та Linux. Створення застосунків Electron простіше, ніж будь-коли з новими документами, новими інструментами та новим додатком, щоб просити вас через API Electron.

Якщо ви готові створити саме перше Electron додаток, ось [швидкий посібник](https://electronjs.org/docs/tutorial/quick-start) , який допоможе вам розпочати роботу.

Ми раді побачити, що ви будуєте поруч з Electron.

## Шлях Electron

Ми випустили Electron під час запуску програми [Atom](https://atom.io) трохи більше двох років тому. Потім Electron, відомий як Atom Shell, був фреймворк, який ми будували Atom поверх нього. В ті дні, Atom був рушійною силою цих функцій та функціональностей що Electron надано при переході для отримання початкового випуску Atom.

Тепер Electron це зростаюча спільнота розробників і компаній все, від [електронної пошти](https://nylas.com), [чат](https://slack.com)і [Git apps](https://www.gitkraken.com) для [SQL аналітики](https://www.wagonhq.com) [торент-клієнтів](https://webtorrent.io/desktop)та [роботи](https://www.jibo.com).

За останні два роки ми бачили, як компанії та проекти з відкритим вихідним кодом оберіть Electron як основу для їхніх програм. Лише за минулий рік, Electron було завантажено більше 1.2 мільйони разів. [Перегляньте](https://electronjs.org/apps) деякі з програм Electron і додайте свої власні додатки, якщо їх ще немає.

![Завантаження Electron](https://cloud.githubusercontent.com/assets/378023/15037731/af7e87e0-12d8-11e6-94e2-117c360d0ac9.png)

## Демос Electron API

Разом з 1. відпуск, Ми випускаємо новий додаток, щоб допомогти вам зрозуміти API Electron і дізнатися більше про те, як зробити ваш додаток Electron виглядає неналежним чином. [Додаток Electron API демо](https://github.com/electron/electron-api-demos) містить сніпети, щоб допомогти вам розпочати роботу та поради щодо ефективного використання API Electron.

[![Демос Electron API](https://cloud.githubusercontent.com/assets/378023/15138216/590acba4-16c9-11e6-863c-bdb0d3ef3eaa.png)](https://github.com/electron/electron-api-demos)

## Devtron

Ми також додали нове розширення, щоб допомогти вам налагодити ваш Electron застосунки. [Devtron](https://electronjs.org/devtron) є розширенням з відкритим вихідним кодом на [Chrome Developer Tools](https://developer.chrome.com/devtools) розроблений так, щоб допомогти вам перевіряти, налагодження та виправлення неполадок вашого застосунку Electron.

[![Devtron](https://cloud.githubusercontent.com/assets/378023/15138217/590c8b06-16c9-11e6-8af6-ef96299e85bc.png)](https://electronjs.org/devtron)

### Особливості

  * **Вимагати графік** , що допоможе вам візуалізувати внутрішні та зовнішні залежності бібліотеки додатків як в основних і рендерингових процесах
  * **IPC monitor** , який відстежує і показує повідомлення, надіслані і отримані між процесами у вашому додатку
  * **Інспектор подій** , який показує вам події та слухачі, які зареєстровані у вашому додатку на базовому API Electron таких як вікно, програма та процеси
  * **App Linter** який перевіряє додатки на наявність загальних помилок і відсутніх функціональності

## Spectron

Наостанок, ми релізуємо нову версію [Spectron](https://electronjs.org/spectron), інтеграційний фреймворк для застосунків Electron.

[![Spectron](https://cloud.githubusercontent.com/assets/378023/15138218/590d50c2-16c9-11e6-9b54-2d73729fe189.png)](https://electronjs.org/spectron)

Спектрон 3. має вичерпну підтримку всього Electron API що дозволяє вам більш швидко писати тести, які перевіряють поведінку вашого додатку в різних сценаріях і середовищах. Спектр заснований на [ChromeDriver](https://sites.google.com/a/chromium.org/chromedriver) та [WebDriverIO](http://webdriver.io) , а також має повний API для навігації по сторінці, користувач вводить і виконується JavaScript.

## Спільнота

Electron 1.0 - це результат громадських зусиль сотнями розробників. Поза ядром фреймворку було сотні бібліотек і інструментів випущено, щоб зробити будівлю, упаковку та розгорнути програми Electron простіше.

Зараз існує нова сторінка спільноти [](https://electronjs.org/community) , яка налічує багато дивовижних інструментів Electron, додатків, бібліотек та фреймворків. Ви також можете перевірити [Electron](https://github.com/electron) та [Electron Userland](https://github.com/electron-userland) організацій щоб побачити деякі з цих фантастичних проектів.

Вперше на Electron? Перегляньте Electron 1.0 внутрішнє відео:

<div class="video"><iframe src="https://www.youtube.com/embed/8YP_nOCO-4Q?rel=0" frameborder="0" allowfullscreen></iframe></div>

