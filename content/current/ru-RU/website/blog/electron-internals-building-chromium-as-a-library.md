---
title: 'Electron Internals: Создание Chromium в качестве библиотеки'
author: zcbenz
date: '2017-03-03'
---

Electron основан на Google с открытым исходным кодом Chromium, проекте, который не обязательно разработан для использования другими проектами. Этот пост представляет как Chromium собран как библиотека для использования Electron и как система сборки с течением лет развивалась.

---

## Использование CEF

Chromium Embedded Framework (CEF) - проект, который превращает Chromium в библиотеку и обеспечивает стабильные API на основе кодовой базы Chromium. Очень ранних версий Atom редактора и NW.js использовали CEF.

Чтобы поддерживать стабильный API, CEF скрывает все детали Chromium и обертывает API Chromium с его собственным интерфейсом. Таким образом, когда нам нужно получить доступ к лежащим в основе Chromium API, такие как интеграция Node.js на веб-страницах, преимущества CEF стали блокировщиками.

Таким образом, в конце концов Electron и NW.js переключились на использование API Chromium непосредственно.

## Создание как часть Chromium

Несмотря на то, что Chromium официально не поддерживает внешние проекты, кодека является модульной и легко построить минимальный браузер на основе Chromium. Ядро модуль, предоставляющий интерфейс браузера, называется Content Module.

Для разработки проекта с модулем контента самый простой способ - это построить проект в рамках Chromium. This can be done by first checking out Chromium's source code, and then adding the project to Chromium's `DEPS` file.

NW.js и очень ранние версии Electron используют этот способ для строительства.

Нижняя сторона, Chromium является очень большим кодом и требует очень мощных машин для сборки. Для обычных ноутбуков, это может занять более 5 часов. Таким образом, это сильно влияет на количество разработчиков, которые могут внести свой вклад в проект, а также замедляет процесс разработки.

## Создание Chromium в качестве одной разделяемой библиотеки

Как пользователю модуля контента, Electron не нужно изменять код Chromium в большинстве случаев, так что очевидным способом улучшить построение Electron является построить Chromium в качестве общей библиотеки, , а затем связать с ним в Electron. Таким образом, разработчикам больше не нужно выводить все приложения Chromium, когда они вносят свой вклад в Electron.

The [libchromiumcontent][] project was created by [@aroben](https://github.com/aroben) for this purpose. Он строит модуль содержимого Chromium в качестве общей библиотеки, а затем предоставляет заголовки Chromium и готовые бинарные файлы для скачивания. The code of the initial version of libchromiumcontent can be found [in this link][libcc-classic].

The [brightray][] project was also born as part of libchromiumcontent, which provides a thin layer around Content Module.

Используя libchromiumcontent и brightray вместе, разработчики могут быстро построить браузер, не зная подробностей о создании Chromium. И он удаляет требование быстрой сети и мощной машины для строительства проекта.

Apart from Electron, there were also other Chromium-based projects built in this way, like the [Breach browser][breach].

## Фильтрация экспортируемых символов

В Windows существует ограничение на то, сколько символов одна общая библиотека может экспортировать. По мере того как кодовая база Chromium росла, количество символов, экспортированных в libchromiumcontent вскоре превысило ограничение.

Решение заключалось в том, чтобы отфильтровать ненужные символы при генерации DLL файла. It worked by [providing a `.def` file to the linker][libcc-def], and then using a script to [judge whether symbols under a namespace should be exported][libcc-filter].

Используя этот подход, Chromium продолжал добавлять новые экспортируемые символы, libchromiumcontent по-прежнему может генерировать общие библиотечные файлы, удаляя больше символов.

## Компонент сборки

Перед тем, как говорить о следующих шагах, предпринятых в libchromiumсодержание, важно внедрить концепцию сборки компонента в Chromium.

Как огромный проект, связующий шаг занимает очень много времени в Chromium при строительстве. Обычно когда разработчик делает небольшое изменение, может занять 10 минут, чтобы увидеть окончательный результат . Чтобы решить эту проблему, Chromium представил сборку компонентов, которая строит каждый модуль в Chromium отдельными разделяемыми библиотеками, так что время, проведенное в итоговом шаге , становится незаметным.

## Доставка сырых файлов

С развитием Chromium в Chromium было так много экспортированных символов, что даже символы Content Module и Webkit были более чем ограничение. Невозможно создать доступную для использования библиотеку просто stripping символы.

In the end, we had to [ship the raw binaries of Chromium][libcc-gyp] instead of generating a single shared library.

Как уже сообщалось ранее, в Chromium есть два режима сборки. В результате отгрузки сырых двоичных файлов мы должны поставлять два различных дистрибутива в libchromiumcontent. Один из них называется `static_library` build, который включает в себя все статические библиотеки каждого модуля, созданного обычной сборкой Chromium. Другое — `shared_library`, который включает в себя все общие библиотеки каждого модуля , созданного сборкой компонента.

В Electron отладочная версия связана с `shared_library` версии libchromiumcontent, потому что загрузка маленькая и занимает мало времени при связывании окончательного исполняемого файла. And the Release version of Electron is linked with the `static_library` version of libchromiumcontent, so the compiler can generate full symbols which are important for debugging, and the linker can do much better optimization since it knows which object files are needed and which are not.

Так что для нормальной разработки разработчикам нужно только построить отладочную версию, которая не требует хорошей сети или мощной машины. Несмотря на то, что версия требует гораздо лучшего оборудования для сборки, она может генерировать лучше оптимизированных бинарных файлов.

## `gn` обновление

Being one of the largest projects in the world, most normal systems are not suitable for building Chromium, and the Chromium team develops their own build tools.

Ранее версии Chromium использовали `gyp` в качестве системы сборки, но он страдает от замедления и его конфигурационный файл становится трудно понять для сложных проектов. После многих лет разработки Chromium переключился на `gn` как система сборки, которая работает гораздо быстрее и имеет чистую архитектуру.

Одним из улучшений в `gn` является представление `source_set`, представляющего группу объектных файлов. In `gyp`, each module was represented by either `static_library` or `shared_library`, and for the normal build of Chromium, each module generated a static library and they were linked together in the final executable. Используя `gn`, каждый модуль теперь генерирует только кучу объектных файлов, и окончательный исполняемый файл просто соединяет все объектные файлы вместе, так что промежуточные статические файлы больше не сгенерируются.

Однако это улучшение создало большие проблемы для libchromiumcontent потому что промежуточные статические библиотечные файлы действительно были необходимы libchromiumcontent.

The first try to solve this was to [patch `gn` to generate static library files][libcc-gn-hack], which solved the problem, but was far from a decent solution.

The second try was made by [@alespergl](https://github.com/alespergl) to [produce custom static libraries from the list of object files][libcc-gn]. Он использовал трюк для первого запуска пустышной сборки, чтобы получить список сгенерированных объектных файлов, а затем построить статические библиотеки, набрав `gn` со списком. Он лишь минимально изменил исходный код Chromium, и все еще сохранил архитектуру здания Electron.

## Summary

Как видите, в сравнении с построением Electron в рамках Chromium, сборка Chromium в качестве библиотеки требует больших усилий и непрерывного обслуживания . Однако последняя удаляет требование мощного аппаратного обеспечения для создания Electron, таким образом позволяя создавать более широкий круг разработчиков, и вносить свой вклад в Electron. Усилия в этой связи вполне достойны.

[libchromiumcontent]: https://github.com/electron/libchromiumcontent
[brightray]: https://github.com/electron/brightray
[breach]: https://www.quora.com/Is-Breach-Browser-still-in-development
[libcc-classic]: https://github.com/electron/libchromiumcontent/tree/873daa8c57efa053d48aa378ac296b0a1206822c
[libcc-def]: https://github.com/electron/libchromiumcontent/pull/11/commits/85ca0f60208eef2c5013a29bb4cf3d21feb5030b
[libcc-filter]: https://github.com/electron/libchromiumcontent/pull/47/commits/d2fed090e47392254f2981a56fe4208938e538cd
[libcc-gyp]: https://github.com/electron/libchromiumcontent/pull/98
[libcc-gn-hack]: https://github.com/electron/libchromiumcontent/pull/239
[libcc-gn]: https://github.com/electron/libchromiumcontent/pull/249

