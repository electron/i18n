# Инструкции по сборке

Follow the guidelines below for building **Electron itself**, for the purposes of creating custom Electron binaries. For bundling and distributing your app code with the prebuilt Electron binaries, see the [application distribution][application-distribution] guide.

## Системные требования

Перед началом проверьте требования сборки для вашей системы

* [macOS](build-instructions-macos.md#prerequisites)
* [Linux](build-instructions-linux.md#prerequisites)
* [Windows](build-instructions-windows.md#prerequisites)

## Build Tools

[Electron's Build Tools](https://github.com/electron/build-tools) automate much of the setup for compiling Electron from source with different configurations and build targets. If you wish to set up the environment manually, the instructions are listed below.

## Требования для GN

Вам нужно будет установить [`depot_tools`][depot-tools], набор инструментов, используемый для извлечения Chromium и его зависимостей.

Также, для Windows вам потребуется добавить переменную среды `DEPOT_TOOLS_WIN_TOOLCHAIN=0`. Чтобы это сделать, откройте `Панель управления` → `Система и безопасность` → `Система` → `Дополнительные параметры системы` и добавьте системную переменную `DEPOT_TOOLS_WIN_TOOLCHAIN` со значением `0`.  Она говорит `depot_tools` использовать вашу локальную версию Visual Studio (по умолчанию, `depot_tools` попробует загрузить приватную Google версию к которой имеют доступ только Гугловцы).

### Setting up the git cache

If you plan on checking out Electron more than once (for example, to have multiple parallel directories checked out to different branches), using the git cache will speed up subsequent calls to `gclient`. To do this, set a `GIT_CACHE_PATH` environment variable:

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# Это будет использовать примерно 16 гигабайт.
```

## Получение кода

```sh
$ mkdir electron && cd electron
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# This will take a while, go get a coffee.
```

> Вместо `https://github.com/electron/electron`, вы можете использовать здесь свой собственный форк (что-то вроде `https://github.com/<username>/electron`).

### A note on pulling/pushing

If you intend to `git pull` or `git push` from the official `electron` repository in the future, you now need to update the respective folder's origin URLs.

```sh
$ cd src/electron
$ git remote remove origin
$ git remote add origin https://github.com/electron/electron
$ git checkout master
$ git branch --set-upstream-to=origin/master
$ cd -
```

:memo: `gclient` works by checking a file called `DEPS` inside the `src/electron` folder for dependencies (like Chromium or Node.js). Running `gclient sync -f` ensures that all dependencies required to build Electron match that file.

So, in order to pull, you'd run the following commands:

```sh
$ cd src/electron
$ git pull
$ gclient sync -f
```

## Сборка

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

Или на Windows (без дополнительных аргументов):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\")"
```

This will generate a build directory `out/Testing` under `src/` with the testing build configuration. You can replace `Testing` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Testing` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Testing --list`.

**Для генерации тестовой сборки Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**For generating Release (aka "non-component" or "static") build config of Electron:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**Чтобы построить, запустите `ninja` с целью `electron`:** Nota Bene: Это займет некоторое время и, вероятно, нагревает ваш ноутбук.

Для конфигурации тестирования:

```sh
$ ninja -C out/Testing electron
```

Для конфигурации релиза:

```sh
$ ninja -C out/Release electron
```

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

Собранный исполняемый файл будет находиться в `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
# или, на Windows
$ ./out/Testing/electron.exe
# или, на Linux
$ ./out/Testing/electron
```

### Упаковка

On linux, first strip the debugging and symbol information:

```sh
electron/script/strip-binaries.py -d out/Release
```

To package the electron build as a distributable zip file:

```sh
ninja -C out/Release electron:electron_dist_zip
```

### Кросс-компиляция

To compile for a platform that isn't the same as the one you're building on, set the `target_cpu` and `target_os` GN arguments. For example, to compile an x86 target from an x64 host, specify `target_cpu = "x86"` in `gn args`.

```sh
$ gn gen out/Testing-x86 --args='... target_cpu = "x86"'
```

Not all combinations of source and target CPU/OS are supported by Chromium.

| Host        | Target        | Состояние                 |
| ----------- | ------------- | ------------------------- |
| Windows x64 | Windows arm64 | Экспериментально          |
| Windows x64 | Windows x86   | Автоматически тестировано |
| Linux x64   | Linux x86     | Автоматически тестировано |

If you test other combinations and find them to work, please update this document :)

See the GN reference for allowable values of [`target_os`][target_os values] and [`target_cpu`][target_cpu values].

#### Windows на Arm (экспериментально)

To cross-compile for Windows on Arm, [follow Chromium's guide](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) to get the necessary dependencies, SDK and libraries, then build with `ELECTRON_BUILDING_WOA=1` in your environment before running `gclient sync`.

```bat
set ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Или (если используется PowerShell):

```powershell
$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Далее, запустите `gn gen`, как указано выше, с `target_cpu="arm64"`.

## Тестирование

To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under `src/` directory.

```sh
$ ninja -C out/Testing third_party/electron_node:headers
```

Теперь вы можете [запустить тесты](testing.md#unit-tests).

Если вы что-то отлаживаете, то вам может быть полезно передать некоторые дополнительные флаги в бинарный Electron:

```sh
$ npm run test -- \
  --enable-logging -g 'BrowserWindow module'
```

## Sharing the git cache between multiple machines

It is possible to share the gclient git cache with other machines by exporting it as SMB share on linux, but only one process/machine can be using the cache at a time. Блокировки, установленные скриптом git-cache попытаются предотвратить это, однако возможна нестабильная работа по сети.

На Windows, у SMBv2 есть кэш директорий, который будет создавать проблемы со скриптом git-cache, поэтому необходимо отключить его, установив ключ регистра

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

на 0. Подробнее: https://stackoverflow.com/a/9935126

Это можно быстро установить в powershell (запускается от имени администратора):

```powershell
New-ItemProperty -Path "HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
```

## Устранение проблем

### gclient sync complains about rebase

If `gclient sync` is interrupted the git tree may be left in a bad state, leading to a cryptic message when running `gclient sync` in the future:

```plaintext
2> Conflict while rebasing this branch.
2> Fix the conflict and run gclient again.
2> See man git-rebase for details.
```

If there are no git conflicts or rebases in `src/electron`, you may need to abort a `git am` in `src`:

```sh
$ cd ../
$ git am --abort
$ cd electron
$ gclient sync -f
```

### I'm being asked for a username/password for chromium-internal.googlesource.com

Если вы видите запрос для `Имя пользователя для 'https://chrome-internal.googlesource.com':` при запуске `gclient sync` на Windows, это возможно, потому что `DEPOT_TOOLS_WIN_TOOLCHAIN` переменная окружения не установлена в 0. Откройте `Панель управления` → `Система и безопасность` → `Система` → `Дополнительные параметры системы` и добавьте системную переменную `DEPOT_TOOLS_WIN_TOOLCHAIN` с значением `0`.  Она говорит `depot_tools` использовать вашу локальную версию Visual Studio (по умолчанию, `depot_tools` попробует загрузить приватную Google версию к которой имеют доступ только Гугловцы).

[application-distribution]: ../tutorial/application-distribution.md

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

[target_os values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values
[target_cpu values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values
