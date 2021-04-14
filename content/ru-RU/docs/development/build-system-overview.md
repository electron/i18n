# Обзор системы сборки

Electron использует [GN](https://gn.googlesource.com/gn) для генерации проектов и [ниндзя](https://ninja-build.org/) для строительства. Конфигурации проектов найти в файлах `.gn` и `.gni` файлов.

## GN Файлы

Следующие `gn` файлы содержат основные правила построения Electron:

* `BUILD.gn` определяет, как строится сам Electron, включает в себя конфигурации по умолчанию для связи с Хромом.
* `build/args/{debug,release,all}.gn` содержат аргументы по умолчанию для Electron.

## Сборка компонентов

Поскольку Chromium является довольно крупным проектом, заключительный этап соединения может занять довольно много минут, что затрудняет его развитие. Для того, чтобы решить это, Chromium представил "компонентную сборку", которая строит каждый компонент как отдельную общую библиотеку, что делает связь очень быстрой, но жертвуя размером и производительностью.

Electron наследует этот вариант сборки от Chromium. В `Debug` сборки, двоичный будет связан с общей библиотечной версией компонентов Chromium, чтобы быстрое время связывания; для `Release` , двоичный будет связан с статическими версиями библиотеки, так что мы можем иметь наилучший бинарный размер и производительности.

## Тестирование

**NB** _этот раздел устарел и содержит информацию, которая больше не иметь отношение к электрону, построенного GN._

Test your changes conform to the project coding style using:

```sh
$ npm run lint
```

Test functionality using:

```sh
$ npm test
```

Всякий раз, когда вы внести изменения в исходный код Electron, вам нужно будет повторно запустить построить до испытаний:

```sh
$ npm run build && npm test
```

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', () => {
  // ... только в этом блоке будут выполняться тесты
})
```

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

To run the tests with the release build use:

```sh
$ npm test -- -R
```
