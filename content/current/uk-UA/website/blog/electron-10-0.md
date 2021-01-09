---
title: Electron 10.0.0
author:
  - VerteDinde
  - софіангі
date: '2020-08-25'
---

Electron 10.0.0 було випущено! Вона включає оновлення до Chromium `85`, V8 `8.5`і Node.js `12.16`. Ми додали кілька нових інтеграцій API і вдосконалень. Читайте нижче для більш докладної інформації!

---

Команда Electron з радістю оголошує реліз Electron 10.0.0! Ви можете встановити його за допомогою npm за допомогою `npm встановити electron@latest` або завантажити з нашого [релізів веб-сайт](https://electronjs.org/releases/stable). Реліз упакований разом з оновленнями, виправленнями та новими функціями.

В релізі Electron 10, ми також зробили зміни до наших приміток щодо випуску. Щоб спростити розуміння того, що абсолютно новий в Electron 10 і що могло змінитися між релізами Electron 10 і минулими, ми також включаємо зміни, які були введені до Electron 10, але серверні до попередніх релізів. Сподіваємося, що цю програму значно полегшує пошук нових функцій та виправлень при оновленні Electron.

Ми не можемо дочекатися, щоб побачити, що ви з ними будуєте! Продовжити читання і поділитися інформацією про цей реліз, і будь ласка поділіться з усіма відгуками!

## Важливі зміни

### Зміни стека

* Chromium `85.0.4183.84`
    * [Нова в Chrome 84](https://developers.google.com/web/updates/2020/07/nic84)
    * [Нова в Chrome 85](https://chromereleases.googleblog.com/2020/08/stable-channel-update-for-desktop_25.html)
* Node.js `12.16.3`
    * [Допис у блозі 12.16.3](https://nodejs.org/en/blog/release/v12.16.3/)
* V8 `8.5`
    * [V8 запис 8.4 у блозі](https://v8.dev/blog/v8-release-84)
    * [V8 8.5 запис у блозі](https://v8.dev/blog/v8-release-85)

### Підсвітка функцій

* Додано `contents.getBackgroundThrottling()` метод і `contents.backgroundThrottling` властивість. [#21036]
* Включити `desktopCapturer` модуль в головному процесі. [#23548](https://github.com/electron/electron/pull/23548)
* Можна тепер перевірити, чи не існує `сеанс` стійкий виклик `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Вирішіть проблеми мережі, які не дозволили здійснення RTC викликів через з'єднання з IP-адресою і ICE. (Проблема Chromium 1113227). [#24998](https://github.com/electron/electron/pull/24998)

Дивіться [10.0.0 примітки до випуску](https://github.com/electron/electron/releases/tag/v10.0.0) для повного списку нових функцій і змін.

## Важливі Зміни

* Значення за замовчуванням змінено `enableRemoteModule` на `false`. [#22091](https://github.com/electron/electron/pull/22091)
    * Це частина наших планів щодо застарілості `віддаленого` та переходу його на користувач. Ви можете прочитати й ознайомитися з [цією проблемою](https://github.com/electron/electron/issues/21408) , що детально оформила наші причини для цього, і включити запропоновану часову шкалу для розгортання.
* Змінено значення за замовчуванням для `app.allowRendererProcessReuse` на `true`. [#22336](https://github.com/electron/electron/pull/22336) (також [Electron 9](https://github.com/electron/electron/pull/22401)
   * Це буде перешкоджати завантаженню неконтекстних нативних модулів в процесі рендерингу.
   * Ви можете прочитати й ознайомитися з [цією проблемою](https://github.com/electron/electron/issues/18397) , що детально оформила наші причини для цього, і включити запропоновану часову шкалу для розгортання.
* Виправлено позиціонування кнопок у вікнах на macOS, коли локалізація ОС встановлена на RTL (наприклад Арабська чи Іврито). Бездротові додатки можуть мати обліковий запис для цих змін під час стилізації своїх вікон. [#22016](https://github.com/electron/electron/pull/22016)

Більше інформації про ці та майбутні зміни можна знайти на сторінці [Заплановані порушення](https://github.com/electron/electron/blob/master/docs/breaking-changes.md)

## Зміни API

* Сесія: можна перевірити чи заданий `сеанс` наполегливо викликаючи `ses.isPersistent()` API. [#22622](https://github.com/electron/electron/pull/22622)
* Вміст: Додано `contents.getBackgroundThrottling()` метод і `contents.backgroundThrottling` властивість. [#21036](https://github.com/electron/electron/pull/21036)

### Застарілий API

Зараз наступні API застарілі або видалені:

* Видалено властивість `currentlyLoggingPath` із `netLog`. Додатково, `netLog.stopLogging` більше не повертає шлях до записаного журналу. [#22732](https://github.com/electron/electron/pull/22732)
* Застаріле вивантаження нестиснених помилок у `аварійному журналі`. [#23598](https://github.com/electron/electron/pull/23598)

## Кінець підтримки 7.x.y

Electron 7.x.y досяг закінчення підтримки як політика підтримки проекту [](https://electronjs.org/docs/tutorial/support#supported-versions). Розробники та додатки заохочують оновитися до новішої версії Electron.

## Що далі

У короткостроковій перспективі, ви можете очікувати, що команда продовжить зосереджуватися на тому, щоб не змінювати роботу основних компонентів з метою створення Electron, включаючи Chromium, Node, та V8. Хоча ми обережні, не виконуючи обіцянок щодо дати випуску, наш план - це випуску нових основних версій Electron з новими версіями цих компонентів приблизно щоквартально. Мисливський [графік 11.0.0](https://electronjs.org/docs/tutorial/electron-timelines) відображає ключові дати в ході життєвого циклу Electron 11.0 розробки. Також, [подивитися наш Візуальний документ](https://electronjs.org/docs/tutorial/electron-versioning) для більш докладної інформації про керування версіями в Electron.

Для отримання інформації про заплановані зміни у майбутніх версіях Electron, [дивіться наші заплановані порушенні зміни](https://github.com/electron/electron/blob/master/docs/breaking-changes.md).

### Продовжується робота для розгортання `віддаленого` модуля (в Electron 11)
Ми почали роботу над тим, щоб видалити віддалений модуль в [Electron 9](https://www.electronjs.org/blog/electron-9-0) , і ми продовжуємо планувати видалити модуль `віддаленого`. В 11 Electron ми плануємо продовжити роботу з реактором для реалізації [WeakRef](https://v8.dev/features/weak-references) , як ми робили в Electron 10. Будь ласка, прочитайте і слідкуйте за [цією проблемою](https://github.com/electron/electron/issues/21408) для всіх планів та деталей для застарілості.

### Final Step for Requiring Native Node Modules to be Context Aware or N-API (in Electron 12)
_Edit: Originally, this blog post stated that we would disable renderer process reuse in Electron 11. Disabling renderer process reuse has now been pushed to Electron 12._

From Electron 6 onwards, we've been laying the groundwork to require [native Node modules](https://nodejs.org/api/addons.html) loaded in the renderer process to be either [N-API](https://nodejs.org/api/n-api.html) or [Context Aware](https://nodejs.org/api/addons.html#addons_context_aware_addons). Enforcing this change allows for stronger security, faster performance, and reduced maintenance workload. The final step of this plan is to remove the ability to disable render process reuse in Electron 12. Read [this issue](https://github.com/electron/electron/issues/18397) for full details including the proposed timeline.
