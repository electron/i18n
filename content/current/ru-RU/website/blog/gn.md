---
title: "Использование GN для создания Electron"
author: nornagon
date: '2018-09-05'
---

Electron теперь использует GN для самостоятельной сборки. Вот почему мы посмотрим на вопрос.

---

# ГиП и GN

Когда Electron был впервые выпущен в 2013 году, конфигурация сборки Chromium была написана [GYP](https://gyp.gsrc.io/), короче "Генерировать ваши проекты".

В 2014 году Проект Chromium представил новый инструмент конфигурации сборки [GN](https://gn.googlesource.com/gn/) (короче "Generate [Ninja](https://ninja-build.org/)") файлы сборки Chrome были перенесены в GN и GYP были удалены из исходного кода.

Electron исторически держал разделение между основными [кодами Electron](https://github.com/electron/electron) и [libchromiumcontent](https://github.com/electron/libchromiumcontent), часть Electron, которая завершает содержимое подмодуля Chromium. Electron использовал GYP, в то время как libchromiumcontent -- в качестве подмножества Chromium -- переключался на GN, когда это делал Chromium.

Как и не совсем сетка, между использованием двух систем сборки было трение. Поддерживаемая совместимость была подвержена ошибкам, с помощью флагов компилятора и `#определяет` которые должны быть тщательно синхронизированы между Chromium, Node, V8 и Electron.

Для решения этой проблемы команда Electron работала над переносом всего в GNG. Сегодня [фиксирует](https://github.com/electron/electron/pull/14097) для удаления последнего кода GYP из Electron был приземлен мастером.

# Что это значит для вас

Если вы вносите свой вклад в развитие самого Electron, процесс проверки и строительства Electron от `мастера` или 4. .0 очень отличается от версии 3.0.0 и раньше. Смотрите [инструкции по сборке GN](https://github.com/electron/electron/blob/master/docs/development/build-instructions-gn.md) для деталей.

Если вы разрабатываете приложение с Electron, то есть некоторые незначительные изменения, которые вы можете заметить в новом Electron 4. .0-ночь; но скорее всего изменение Electron в системе сборки будет полностью прозрачным.

# Что это значит для Electron

GN [быстрее](https://chromium.googlesource.com/chromium/src/tools/gn/+/48062805e19b4697c5fbd926dc649c78b6aaa138/README.md) чем GYP и его файлы более читаемы и поддерживаются. Кроме того, мы надеемся, что использование единой системы конфигурации сборки уменьшит работу, необходимую для обновления Electron до новых версий Chromium.

 * Уже помогли в разработке Electron 4.0.0, потому что Chromium 67 убрал поддержку MSVC и переключился на здание с Clang on Windows. С помощью сборки GN, мы непосредственно наследуем все команды компилятора от Chromium, так что мы получили сборку Clang на Windows бесплатно!

 * Electron также упростил использование [BoringSSL](https://boringssl.googlesource.com/boringssl/) в единой сборке через Electron, Хромий и Узел -- то, что было [проблемным до](https://electronjs.org/blog/electron-internals-using-node-as-a-library#shared-library-or-static-library).
