---
title: "Використання GN для створення Electron"
author: nornagon
date: '2018-09-05'
---

Electron використовує GN для самопобудови. Тут ми обговоримо причину.

---

# GYP і GN

Коли Electron був вперше випущений у 2013 році, було написано конфігурацію збірки Chromium за допомогою [GYP](https://gyp.gsrc.io/), скорочено для "Генерувати ваші проекти".

У 2014 році проект Chromium запровадив новий інструмент конфігурації збірки [GN](https://gn.googlesource.com/gn/) (скорочено для "Генерувати [Ninja](https://ninja-build.org/)") Файли збірки Chromium були перенесені в GN і GYP був вилучений з вихідного коду.

Електрон історично підтримував розмежування між основним [кодом Electron](https://github.com/electron/electron) і [libchromiumcontent](https://github.com/electron/libchromiumcontent)частина Electron, яка охоплює підмодуль Chromium 'content' Chromium. Електрон продовжується за допомогою GYP, в той час як libchromiumcontent - як підмножину Chromium - перемкнувся на GN, коли це зробив Chromium.

Як і шестерні, не зовсім по-матеріальному, існує тертя між двома будівельними системами. Підтримка сумісності була помилкою для компілятора, із прапорців та `#defines` які потребують ретельної синхронізації між Chromium, Node, V8 та Electron.

Щоб вирішити цю проблему, команда Electron працювала над тим, щоб все переміщати до GN. Сьогодні [коміт](https://github.com/electron/electron/pull/14097) видаляє останній з GYP коду Electron було знято з master.

# Що це означає для вас

Якщо ви сприяєте самим Electron, процес перевірки та побудови Electron з `майстра` або 4. 0,0 дуже відрізняється від нього в 3.0.0 чи раніше . See the [GN build instructions](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) for details.

Якщо ви розробляєте додаток з Electron, ви можете помітити декілька незначних змін в новому Electron 4. 0,0-ночі; але більш ніж імовірно, зміна роботи Electron у будівельній системі буде абсолютно прозорою для вас.

# Що це означає для Electron

GN [швидша](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) за GYP і його файли більш читабельні. Крім того, ми сподіваємось, що за допомогою єдиної конфігураційної системи зменшить роботу, необхідну для оновлення Electron на нові версії Chromium.

 * Це вже допомогло розвиватися на Electron 4.0.0 істотно, тому що Chromium 67 знята підтримка MSVC і перемикалася на будівництво з Clang на Windows. Збудовано GN, ми успадковуємо всі команди компілятора безпосередньо з Chromium, тому ми отримали збірку Кланга на Windows безкоштовно!

 * It's also made it easier for Electron to use [BoringSSL](https://boringssl.googlesource.com/boringssl/) in a unified build across Electron, Chromium, and Node -- something that was [problematic before](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
