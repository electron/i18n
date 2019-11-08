# Инструкции по сборке

Следуйте рекомендациям ниже для сборки Electron.

## Системные требования

Перед началом проверьте требования сборки для вашей системы

- [macOS](build-instructions-macos.md#prerequisites)
- [Linux](build-instructions-linux.md#prerequisites)
- [Windows](build-instructions-windows.md#prerequisites)

## Требования для GN

Вам нужно будет установить [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up), набор инструментов, используемый для извлечения Chromium и его зависимостей.

Также, для Windows вам потребуется добавить переменную среды `DEPOT_TOOLS_WIN_TOOLCHAIN=0`. Чтобы это сделать, откройте `Панель управления` → `Система и безопасность` → `Система` → `Дополнительные параметры системы` и добавьте системную переменную `DEPOT_TOOLS_WIN_TOOLCHAIN` со значением `0`. Она говорит `depot_tools` использовать вашу локальную версию Visual Studio (по умолчанию, `depot_tools` попробует загрузить приватную Google версию к которой имеют доступ только Гугловцы).

## Кэшированная сборка (необязательно)

### GIT\_CACHE\_PATH

Если вы планируете собирать Electron больше одного раза, добавление git cache ускорит дальнейшие запросы к `gclient`. Чтобы это сделать, установите переменную среды `GIT_CACHE_PATH`:

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# Это будет использовать примерно 16 гигабайт.
```

### sccache

Для сборки Chromium и Electron компилируются тысячи файлов. Вы можете избежать большей части ожидания, повторно используя вывод сборки Electron CI через [sccache](https://github.com/mozilla/sccache). Для этого требуются некоторые необязательные шаги (перечисленные ниже) и эти две переменные среды:

```sh
export SCCACHE_BUCKET="electronjs-sccache-ci"
export SCCACHE_TWO_TIER=true
```

## Получение кода

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# Это займёт некоторое время, идите и налейте себе кофейку.
```

> Вместо `https://github.com/electron/electron`, вы можете использовать здесь свой собственный форк (что-то вроде `https://github.com/<username>/electron`).

#### A note on pulling/pushing

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
# this next line is needed only if building with sccache
$ export GN_EXTRA_ARGS="${GN_EXTRA_ARGS} cc_wrapper=\"${PWD}/electron/external_binaries/sccache\""
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

**For generating Testing build config of Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**For generating Release (aka "non-component" or "static") build config of Electron:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**Чтобы построить, запустите `ninja` с целью `electron`:** Nota Bene: Это займет некоторое время и, вероятно, нагревает ваш ноутбук.

For the testing configuration:

```sh
$ ninja -C out/Testing electron
```

Для конфигурации релиза:

```sh
$ ninja -C out/Release electron
```

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

Для ускорения последующих сборок можно использовать [sccache](https://github.com/mozilla/sccache). Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Testing` to bring up an editor and adding a line to the end of the file.

The built executable will be under `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
# or, on Windows
$ ./out/Testing/electron.exe
# or, on Linux
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

<table>
  
<tr><th>Host</th><th>Target</th><th>Состояние</th></tr>
  
  <tr>
    <td>
      Windows x64
    </td>
    
    <td>
      Windows arm64
    </td>
    
    <td>
      Экспериментально
    </td>
<tr><td>Windows x64</td><td>Windows x86</td><td>Автоматически тестировано</td></tr>
<tr><td>Linux x64</td><td>Linux x86</td><td>Автоматически тестировано</td></tr>
</table> 
    
    <p>
      If you test other combinations and find them to work, please update this document :)
    </p>
    
    <p>
      See the GN reference for allowable values of <a href="https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values"><code>target_os</code></a> and <a href="https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values"><code>target_cpu</code></a>.
    </p>
    
    <h4>
      Windows на Arm (экспериментально)
    </h4>
    
    <p>
      To cross-compile for Windows on Arm, <a href="https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio">follow Chromium's guide</a> to get the necessary dependencies, SDK and libraries, then build with <code>ELECTRON_BUILDING_WOA=1</code> in your environment before running <code>gclient sync</code>.
    </p>
    
    <pre><code class="bat">set ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
</code></pre>
    
    <p>
      Или (если используется PowerShell):
    </p>
    
    <pre><code class="powershell">$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
</code></pre>
    
    <p>
      Далее, запустите <code>gn gen</code>, как указано выше, с <code>target_cpu="arm64"</code>.
    </p>
    
    <h2>
      Тестирование
    </h2>
    
    <p>
      To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under <code>src/</code> directory.
    </p>
    
    <pre><code class="sh">$ ninja -C out/Testing third_party/electron_node:headers
</code></pre>
    
    <p>
      You can now <a href="testing.md#unit-tests">run the tests</a>.
    </p>
    
    <p>
      Если вы что-то отлаживаете, то вам может быть полезно передать некоторые дополнительные флаги в бинарный Electron:
    </p>
    
    <pre><code class="sh">$ npm run test -- \
  --enable-logging -g 'BrowserWindow module'
</code></pre>
    
    <h2>
      Sharing the git cache between multiple machines
    </h2>
    
    <p>
      It is possible to share the gclient git cache with other machines by exporting it as SMB share on linux, but only one process/machine can be using the cache at a time. Блокировки, установленные скриптом git-cache попытаются предотвратить это, однако возможна нестабильная работа по сети.
    </p>
    
    <p>
      На Windows, у SMBv2 есть кэш директорий, который будет создавать проблемы со скриптом git-cache, поэтому необходимо отключить его, установив ключ регистра
    </p>
    
    <pre><code class="sh">HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
</code></pre>
    
    <p>
      на 0. Подробнее: https://stackoverflow.com/a/9935126
    </p>
    
    <p>
      Это можно быстро установить в powershell (запускается от имени администратора):
    </p>
    
    <pre><code class="powershell">New-ItemProperty -Path "HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
</code></pre>
    
    <h2>
      Устранение проблем
    </h2>
    
    <h3>
      Stale locks in the git cache
    </h3>
    
    <p>
      If <code>gclient sync</code> is interrupted while using the git cache, it will leave the cache locked. To remove the lock, pass the <code>--break_repo_locks</code> argument to <code>gclient sync</code>.
    </p>
    
    <h3>
      I'm being asked for a username/password for chromium-internal.googlesource.com
    </h3>
    
    <p>
      Если вы видите запрос для <code>Имя пользователя для 'https://chrome-internal.googlesource.com':</code> при запуске <code>gclient sync</code> на Windows, это возможно, потому что <code>DEPOT_TOOLS_WIN_TOOLCHAIN</code> переменная окружения не установлена в 0. Откройте <code>Панель управления</code> → <code>Система и безопасность</code> → <code>Система</code> → <code>Дополнительные параметры системы</code> и добавьте системную переменную <code>DEPOT_TOOLS_WIN_TOOLCHAIN</code> с значением <code>0</code>. Она говорит <code>depot_tools</code> использовать вашу локальную версию Visual Studio (по умолчанию, <code>depot_tools</code> попробует загрузить приватную Google версию к которой имеют доступ только Гугловцы).
    </p>