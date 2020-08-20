# Огляд Системи Збірки

Electron використовує [GN](https://gn.googlesource.com/gn) для створення проектів та [ninja](https://ninja-build.org/) для білду. Конфігурації проекту можна знайти в `.gn` та `.gni` файлах.

## GN Файли

The following `gn` files contain the main rules for building Electron:

* `BUILD.gn` defines how Electron itself is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## Component Build

Since Chromium is quite a large project, the final linking stage can take quite a few minutes, which makes it hard for development. In order to solve this, Chromium introduced the "component build", which builds each component as a separate shared library, making linking very quick but sacrificing file size and performance.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Тести

**NB** _ця секція застаріла і вміщає інформацію, яка більше не актуальна для GN-built electron._

Test your changes conform to the project coding style using:

```sh
$ npm run lint
```

Перевірити функціональність за допомогою:

```sh
$ npm test
```

Whenever you make changes to Electron source code, you'll need to re-run the build before the tests:

```sh
$ npm run build && npm test
```

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

Щоб запустити тести з використанням збірки релізів:

```sh
$ npm test -- -R
```
