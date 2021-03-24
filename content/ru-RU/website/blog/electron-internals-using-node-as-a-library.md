---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '2016-08-08'
---

Это вторая должность в текущей серии, объясняющая интернаты Electron. Посмотрите [первый пост](https://electronjs.org/blog/2016/07/28/electron-internals-node-integration) о интеграции цикла событий , если вы еще этого не сделали.

Most people use [Node](https://nodejs.org) for server-side applications, but because of Node's rich API set and thriving community, it is also a great fit for an embedded library. Это сообщение объясняет, как узел используется в качестве библиотеки в Electron.

---

## Система сборки

Узел и Electron используют [`GYP`](https://gyp.gsrc.io) в качестве их систем сборки. Если вы хотите вставить узла внутри вашего приложения, вы также должны использовать его как систему сборки.

Новый `GYP`? Прочтите [это руководство](https://gyp.gsrc.io/docs/UserDocumentation.md) прежде чем вы продолжите работу в этом сообщении.

## Флаги узла

[`узел. yp`](https://github.com/nodejs/node/blob/v6.3.1/node.gyp) файл в директории исходного кода узла описывает, как строится узел , вместе со множеством переменных [`GYP`](https://gyp.gsrc.io) управляет какими частями узла и открывают ли некоторые конфигурации.

To change the build flags, you need to set the variables in the `.gypi` file of your project. The `configure` script in Node can generate some common configurations for you, for example running `./configure --shared` will generate a `config.gypi` with variables instructing Node to be built as a shared library.

Electron не использует сценарий `настроить` так как у него есть свои собственные сценарии сборки. Конфигурации для узла определены в файле [`common.gypi`](https://github.com/electron/electron/blob/master/common.gypi) в корневом каталоге исходного кода Electron.

## Связать узел с Electron

In Electron, Node is being linked as a shared library by setting the `GYP` variable `node_shared` to `true`, so Node's build type will be changed from `executable` to `shared_library`, and the source code containing the Node's `main` entry point will not be compiled.

Поскольку Electron использует V8 библиотеку, поставляемую в Chromium, библиотека V8 включена в исходный код узла не используется. Это делается путем установки параметров `node_use_v8_platform` и `node_use_bundled_v8` до `false`.

## Общая библиотека или статическая

При соединении с узлом есть два варианта: вы можете построить узел как статическую библиотеку и включить его в окончательный исполняемый файл, или вы можете построить его как общую библиотеку и отправить его вместе с окончательным исполняемым файлом.

В Electron, Node был построен как статическая библиотека долгое время. Это сделало сборку простым, включило лучшие оптимизации компилятора, и позволило Electron распространять без лишних `узлов.dll` файлов.

Тем не менее, это изменилось после того, как Chrome переключился на использование [BoringSSL](https://boringssl.googlesource.com/boringssl). BoringSSL — это ответвление [OpenSSL](https://www.openssl.org) , которое удаляет несколько неиспользуемых API и изменяет многие существующие интерфейсы. Поскольку узел все еще использует OpenSSL, компилятор генерирует множество ошибок, связанных с конфликтующими символами, если они связаны вместе.

Electron не смог использовать BoringSSL в узле или использовать OpenSSL в Chromium, чтобы единственный вариант заключался в том, чтобы переключиться на построение узла в качестве разделяемой библиотеки, и [скрыть символы BoringSSL и OpenSSL](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218) в компонентах каждого из них.

Это изменение принесло Electron некоторые положительные побочные эффекты. Перед изменением вы не можете переименовать исполняемый файл Electron на Windows, если вы использовали родные модули, так как имя исполняемого файла было закодировано в библиотеке импорта. После того, как узел был построен как общая библиотека, это ограничение было снято потому что все родные модули были связаны с узлом `. если`, имя которого не нужно изменить.

## Поддержка собственных модулей

[Нативные модули](https://nodejs.org/api/addons.html) в работе узла определяют функцию ввода для загрузки узла, и затем поиск символов V8 и libuv из узла. This is a bit troublesome for embedders because by default the symbols of V8 and libuv are hidden when building Node as a library and native modules will fail to load because they cannot find the symbols.

Поэтому для того, чтобы родные модули работали, символы V8 и libuv были выставлены в Electron. Для V8 это выполняется [с помощью принудительного использования всех символов в конфигурационном файле Chromium](https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122). For libuv, it is achieved by [setting the `BUILDING_UV_SHARED=1` definition](https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228).

## Запуск узла в вашем приложении

После всех работ по построению и связыванию с узлом последний шаг - запустить узел в вашем приложении.

Узел не предоставляет много публичных API для встраивания себя в другие приложения. Обычно вы можете просто вызвать [`узел::Start` и `узел::Init`](https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191) , чтобы запустить новый экземпляр узла. Однако, если вы создаете сложное приложение на основе узла, вы должны использовать API, такие как `узел::CreateEnvironment` для точного контроля каждые шаги.

В Electron, узел запускается в двух режимах: автономный режим, который запускается в главном процессе , похожий на официальные узлы и встроенный режим , который вставляет API узлов на веб-страницы. Подробности об этом будут разъяснены на одной из будущих должностей.

