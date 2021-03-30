---
title: 'Electron Internals: Using Node as a Library'
author: zcbenz
date: '2016-08-08'
---

Это вторая должность в текущей серии, объясняющая интернаты Electron. Check out the [first post][event-loop] about event loop integration if you haven't already.

Most people use [Node](https://nodejs.org) for server-side applications, but because of Node's rich API set and thriving community, it is also a great fit for an embedded library. Это сообщение объясняет, как узел используется в качестве библиотеки в Electron.

---

## Система сборки

Both Node and Electron use [`GYP`][gyp] as their build systems. Если вы хотите вставить узла внутри вашего приложения, вы также должны использовать его как систему сборки.

Новый `GYP`? Read [this guide][gyp-docs] before you continue further in this post.

## Флаги узла

The [`node.gyp`][nodegyp] file in Node's source code directory describes how Node is built, along with lots of [`GYP`][gyp] variables controlling which parts of Node are enabled and whether to open certain configurations.

To change the build flags, you need to set the variables in the `.gypi` file of your project. The `configure` script in Node can generate some common configurations for you, for example running `./configure --shared` will generate a `config.gypi` with variables instructing Node to be built as a shared library.

Electron не использует сценарий `настроить` так как у него есть свои собственные сценарии сборки. The configurations for Node are defined in the [`common.gypi`][commongypi] file in Electron's root source code directory.

## Связать узел с Electron

In Electron, Node is being linked as a shared library by setting the `GYP` variable `node_shared` to `true`, so Node's build type will be changed from `executable` to `shared_library`, and the source code containing the Node's `main` entry point will not be compiled.

Поскольку Electron использует V8 библиотеку, поставляемую в Chromium, библиотека V8 включена в исходный код узла не используется. Это делается путем установки параметров `node_use_v8_platform` и `node_use_bundled_v8` до `false`.

## Общая библиотека или статическая

При соединении с узлом есть два варианта: вы можете построить узел как статическую библиотеку и включить его в окончательный исполняемый файл, или вы можете построить его как общую библиотеку и отправить его вместе с окончательным исполняемым файлом.

В Electron, Node был построен как статическая библиотека долгое время. Это сделало сборку простым, включило лучшие оптимизации компилятора, и позволило Electron распространять без лишних `узлов.dll` файлов.

However, this changed after Chrome switched to use [BoringSSL][boringssl]. BoringSSL is a fork of [OpenSSL][openssl] that removes several unused APIs and changes many existing interfaces. Поскольку узел все еще использует OpenSSL, компилятор генерирует множество ошибок, связанных с конфликтующими символами, если они связаны вместе.

Electron couldn't use BoringSSL in Node, or use OpenSSL in Chromium, so the only option was to switch to building Node as a shared library, and [hide the BoringSSL and OpenSSL symbols][openssl-hide] in the components of each.

Это изменение принесло Electron некоторые положительные побочные эффекты. Перед изменением вы не можете переименовать исполняемый файл Electron на Windows, если вы использовали родные модули, так как имя исполняемого файла было закодировано в библиотеке импорта. После того, как узел был построен как общая библиотека, это ограничение было снято потому что все родные модули были связаны с узлом `. если`, имя которого не нужно изменить.

## Поддержка собственных модулей

[Native modules][native-modules] in Node work by defining an entry function for Node to load, and then searching the symbols of V8 and libuv from Node. This is a bit troublesome for embedders because by default the symbols of V8 and libuv are hidden when building Node as a library and native modules will fail to load because they cannot find the symbols.

Поэтому для того, чтобы родные модули работали, символы V8 и libuv были выставлены в Electron. For V8 this is done by [forcing all symbols in Chromium's configuration file to be exposed][v8-expose]. For libuv, it is achieved by [setting the `BUILDING_UV_SHARED=1` definition][libuv-expose].

## Запуск узла в вашем приложении

После всех работ по построению и связыванию с узлом последний шаг - запустить узел в вашем приложении.

Узел не предоставляет много публичных API для встраивания себя в другие приложения. Usually, you can just call [`node::Start` and `node::Init`][node-start] to start a new instance of Node. Однако, если вы создаете сложное приложение на основе узла, вы должны использовать API, такие как `узел::CreateEnvironment` для точного контроля каждые шаги.

В Electron, узел запускается в двух режимах: автономный режим, который запускается в главном процессе , похожий на официальные узлы и встроенный режим , который вставляет API узлов на веб-страницы. Подробности об этом будут разъяснены на одной из будущих должностей.

[gyp]: https://gyp.gsrc.io
[nodegyp]: https://github.com/nodejs/node/blob/v6.3.1/node.gyp
[commongypi]: https://github.com/electron/electron/blob/master/common.gypi
[openssl-hide]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L209-L218
[v8-expose]: https://github.com/electron/libchromiumcontent/blob/v51.0.2704.61/chromiumcontent/chromiumcontent.gypi#L104-L122
[libuv-expose]: https://github.com/electron/electron/blob/v1.3.2/common.gypi#L219-L228
[node-start]: https://github.com/nodejs/node/blob/v6.3.1/src/node.h#L187-L191
[event-loop]: https://electronjs.org/blog/2016/07/28/electron-internals-node-integration
[gyp-docs]: https://gyp.gsrc.io/docs/UserDocumentation.md
[native-modules]: https://nodejs.org/api/addons.html
[boringssl]: https://boringssl.googlesource.com/boringssl
[openssl]: https://www.openssl.org

