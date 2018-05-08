# Przegląd Systemu Budowania

Electron używa [gyp](https://gyp.gsrc.io/) dla generowania projektu i [ninja](https://ninja-build.org/) dla budowania. Konfiguracja projektu znajduje się w plikach `.gyp` i `.gypi`.

## Pliki Gyp

Następujące pliki `gyp` zawierają główne zasady dla budowania Electron:

* `electron.gyp` definiuje z czego sam w sobie składa się Electron.
* `common.gypi`dodaje konfiguracje budowy Node aby zbudować to razem z Chromium.
* <brightray/brightray.gyp</code> definiuje jak `brightray` jest zbudowany i zawiera domyślną konfigurację połączoną z Chromium.
* `brightray/brightray.gypi` includes general build configurations about building.

## Budowa składnika

Od kiedy Chromium jest dość wielkim projektem, końcowa faza łączenia może zająć kilka minut, co sprawia trudności dla rozwoju. W celu rozwiązania tego, Chromium wprowadziło "budowę składnika", która buduje każdy składnik jako osobną bibliotekę, sprawiając linkowanie bardzo szybkim, ale poświęcając rozmiar pliku oraz wydajność.

W Electron mamy bardzo podobne podejście: dla budowy `debug`, system dwójkowy będzie łączony z udostępnioną wersją składników biblioteki Chromium, aby osiągać szybki czas łączenia; dla budowy `wydania`, system binarny będzie łączony ze statyczną wersją biblioteki, dzięki czemu będziemy mieli najlepsze możliwe binarne rozmiary oraz wydajność.

## Minimalny Booststrapping

Wszystkie pliki binarne Chromium (`libchromiumcontent`) są pobierane kiedy skrypt bootstrap jest uruchomiony. By default both static libraries and shared libraries will be downloaded and the final size should be between 800MB and 2GB depending on the platform.

By default, `libchromiumcontent` is downloaded from Amazon Web Services. If the `LIBCHROMIUMCONTENT_MIRROR` environment variable is set, the bootstrap script will download from it. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) is a mirror for `libchromiumcontent`. If you have trouble in accessing AWS, you can switch the download address to it via `export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/`

If you only want to build Electron quickly for testing or development, you can download the shared library versions by passing the `--dev` parameter:

```sh
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## Two-Phase Project Generation

Electron links with different sets of libraries in `Release` and `Debug` builds. `gyp`, however, doesn't support configuring different link settings for different configurations.

To work around this Electron uses a `gyp` variable `libchromiumcontent_component` to control which link settings to use and only generates one target when running `gyp`.

## Target Names

Unlike most projects that use `Release` and `Debug` as target names, Electron uses `R` and `D` instead. This is because `gyp` randomly crashes if there is only one `Release` or `Debug` build configuration defined, and Electron only has to generate one target at a time as stated above.

This only affects developers, if you are building Electron for rebranding you are not affected.

## Testy

Test your changes conform to the project coding style using:

```sh
$ npm run lint
```

Test funkcjonalności używając:

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

To run the tests with the release build use:

```sh
$ npm test -- -R
```