---
title: 'Electron Internals: Message Loop Integration'
author: zcbenz
date: '2016-07-28'
---

Это первая должность серии статей, которая объясняет интернаты Electron. Этот пост рассказывает о том, как цикл событий узла интегрирован с Chromium в Electron.

---

There had been many attempts to use Node for GUI programming, like [node-gui][node-gui] for GTK+ bindings, and [node-qt][node-qt] for QT bindings. Но ни один из них не работает в производстве, потому что инструментарий GUI содержит свои собственные сообщения циклов, в то время как узел использует libuv для своего собственного цикла событий, и главный поток может только запустить один цикл одновременно. Поэтому обычный трюк для запуска цикла сообщений GUI в узле — это наложить цикл сообщений в таймере с очень небольшим интервалом, , который делает GUI интерфейс медленным и занимает много ресурсов процессора.

During the development of Electron we met the same problem, though in a reversed way: we had to integrate Node's event loop into Chromium's message loop.

## Основной процесс и процесс визуализации

Прежде чем мы погрузимся в детали циклической интеграции сообщений, я сначала опишу многопроцессорную архитектуру Chromium.

In Electron there are two types of processes: the main process and the renderer process (this is actually extremely simplified, for a complete view please see [Multi-process Architecture][multi-process]). Главный процесс несет ответственность за GUI работает как создание окон, в то время как обработчик работает только с запущенными и отображающими веб-страницы.

Electron позволяет использовать JavaScript для управления как главным процессом, так и процессом визуализации , что означает, что мы должны интегрировать узел в оба процесса.

## Замена цикла сообщений Chromium на libuv

Моя первая попытка была реализации цикла сообщений Chromium с libuv.

Процесс рендерера, так как его цикл сообщений прослушивал только файловых дескрипторов и таймеров, и мне нужен только для реализации интерфейса с libuv.

Однако для основного процесса было значительно труднее. Каждая платформа имеет свои собственные циклы сообщений GUI. macOS Chromium использует `NSRunLoop`, в то время как Linux использует glib. Я пытался извлечь лежащих в основе файла дескрипторов из собственных циклов сообщений GUI, а затем кормил их в libuv для итерации, но я до сих пор встречал краевые случаи, которые не работали.

Так что наконец-то я добавил таймер для опроса цикла GUI сообщений через небольшой интервал. в результате этого процесс занял постоянное использование ЦП, и некоторые операции имели длительные задержки.

## Цикл события при опросе узла в отдельной теме

По мере становления либува можно было использовать другой подход.

Концепция fd была введена в libuv, который является файловым дескриптором (или обработать), которым libuv опрос за свой цикл событий. So by polling the backend fd it is possible to get notified when there is a new event in libuv.

Итак, в Electron я создал отдельную тему, чтобы опросить бэкэнда fd, и так как я использовал системные вызовы для опроса вместо libuv API, это тема безопасна. И всякий раз, когда было новое событие в цикле libuv, сообщение будет размещено в цикле сообщений Chromium, и события libuv затем будут обработаны в главном потоке.

Таким образом я избегал патча Chromium и Node, и тот же код использовался в как в основных процессах, так и в процессах визуализации.

## Код

You can find the implemention of the message loop integration in the `node_bindings` files under [`electron/atom/common/`][node-bindings]. Он может быть легко использован для проектов, которые хотят интегрировать узел.

*Update: Implementation moved to [`electron/shell/common/node_bindings.cc`][node-bindings-updated].*

[node-gui]: https://github.com/zcbenz/node-gui
[node-qt]: https://github.com/arturadib/node-qt
[multi-process]: http://dev.chromium.org/developers/design-documents/multi-process-architecture
[node-bindings]: https://github.com/electron/electron/tree/master/atom/common
[node-bindings-updated]: https://github.com/electron/electron/blob/master/shell/common/node_bindings.cc
