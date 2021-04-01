# Инструкции по сборке

Следуйте рекомендациям ниже для сборки Electron.

## Системные требования

Перед началом проверьте требования сборки для вашей системы

* [macOS](build-instructions-macos.md#prerequisites)
* [Linux](build-instructions-linux.md#prerequisites)
* [Windows](build-instructions-windows.md#prerequisites)

## Инструменты сборки

[Electron's Build Tools](https://github.com/electron/build-tools) автоматизировать большую часть настройки для компиляции Electron из источника с различными конфигурациями и строить цели. Если вы хотите настроить среду вручную, инструкции перечислены ниже.

## Требования для GN

Вам нужно будет установить [`depot_tools`][depot-tools], набор инструментов, используемый для извлечения Chromium и его зависимостей.

Также, для Windows вам потребуется добавить переменную среды `DEPOT_TOOLS_WIN_TOOLCHAIN=0`. Чтобы это сделать, откройте `Панель управления` → `Система и безопасность` → `Система` → `Дополнительные параметры системы` и добавьте системную переменную `DEPOT_TOOLS_WIN_TOOLCHAIN` со значением `0`.  Она говорит `depot_tools` использовать вашу локальную версию Visual Studio (по умолчанию, `depot_tools` попробует загрузить приватную Google версию к которой имеют доступ только Гугловцы).

### Настройка кэша git

Если вы планируете проверить Electron более одного раза (например, иметь несколько параллельных каталогов, проверенных в разных ветвях), использование кэша git ускорит последующие вызовы для `gclient`. Для этого установите переменную `GIT_CACHE_PATH` среды:

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# Это будет использовать примерно 16 гигабайт.
```

## Получение кода

```sh
$ mkdir электрон && CD электрон
$ Gclient конфигурации - имя "src / электрон" - неуправляемый https://github.com/electron/electron
$ Gclient синхронизации --with_branch_heads --with_tags
- Это займет некоторое время, пойти получить кофе.
```

> Вместо `https://github.com/electron/electron`, вы можете использовать здесь свой собственный форк (что-то вроде `https://github.com/<username>/electron`).

### Заметка о потянув / толкая

Если вы собираетесь `git pull` или `git push` из официального репозитория `electron` в будущем, теперь необходимо обновить URL-адреса папки.

```sh
$ cd src/electron
$ git remote remove origin
$ git remote add origin https://github.com/electron/electron
$ git checkout master
$ git branch --set-upstream-to=origin/master
$ cd -
```

:memo: `gclient` работает, проверяя файл под названием `DEPS` внутри `src/electron` для зависимостей (например, Chromium или Node.js). Запуск `gclient sync -f` гарантирует, что все зависимости, для создания Electron, соответствуют этому файлу.

Таким образом, для того, чтобы вытащить, вы бы запустить следующие команды:

```sh
$ cd src/electron
$ git pull
$ gclient sync -f
```

## Сборка

```sh
$ CD src
$ экспорт CHROMIUM_BUILDTOOLS_PATH'pwd'/buildtools
$ gn gen out/Testing --args""импорт (""/электрон/сборка/args/testing.gn") $GN_EXTRA_ARGS"
```

Или на Windows (без дополнительных аргументов):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\")"
```

Это позволит создать каталог сборки `out/Testing` под `src/` с конфигурацией сборки тестирования. Вы можете заменить `Testing` другим именем, но оно должно быть поднаправленным `out`. Кроме того, вы не должны запускать `gn gen` снова, если вы хотите изменить аргументы сборки, вы можете `gn args out/Testing` , чтобы воспитывать редактора.

Чтобы увидеть список доступных вариантов конфигурации сборки, запустите `gn args
/Testing --список`.

**Для генерации тестовой сборки Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**Для генерации выпуска (ака "некомпонентный" или "статический") построить конфигурацию Electron:**

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

Это позволит построить все, что было ранее "libchromiumcontent" (т.е. `content/` каталог `chromium` и его зависимостей, в том числе. WebKit и V8), так что это займет некоторое время.

Собранный исполняемый файл будет находиться в `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
# или, на Windows
$ ./out/Testing/electron.exe
# или, на Linux
$ ./out/Testing/electron
```

### Упаковка

На linux, первая полоса отладки и символ информации:

```sh
electron/script/strip-binaries.py -d out/Release
```

Для упаковки электронной сборки в качестве распределенного файла zip:

```sh
ninja -C out/Release electron:electron_dist_zip
```

### Кросс-компиляция

Чтобы собрать для платформы, которая не то же самое, что тот, который вы строите на, установить `target_cpu` и `target_os` GN аргументов. Например, чтобы составить x86 из хоста x64, укажите `target_cpu = "x86"` в `gn args`.

```sh
$ gn gen out/Testing-x86 --args'... target_cpu и "x86""
```

Не все комбинации источника и целевого процессора/ОС поддерживаются хромом.

| Узла        | Целевой       | Состояние                 |
| ----------- | ------------- | ------------------------- |
| Windows x64 | Windows arm64 | Экспериментально          |
| Windows x64 | Windows x86   | Автоматически тестировано |
| Linux x64   | Linux x86     | Автоматически тестировано |

Если вы тестировать другие комбинации и найти их для работы, пожалуйста, обновите этот документ :)

Смотрите ссылку GN на допустимые значения [`target_os`][target_os values] и [`target_cpu`][target_cpu values].

#### Windows на Arm (экспериментально)

Для перекрестной компиляции для Windows on Arm [следуйте руководству Chromium](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) , чтобы получить необходимые зависимости, SDK и библиотеки, а затем создайте с `ELECTRON_BUILDING_WOA=1` в среде перед запуском `gclient sync`.

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

Для времени времени для времени тестирования необходимо построить тестовые модули против же версии узла.js которая была построена в рамках процесса сборки. Чтобы заготовки сборки для компиляции модулей, запустите следующие под `src/` каталогом.

```sh
$ ninja -C out/Testing third_party/electron_node:headers
```

Теперь вы можете [запустить тесты](testing.md#unit-tests).

Если вы что-то отлаживаете, то вам может быть полезно передать некоторые дополнительные флаги в бинарный Electron:

```sh
$ npm run test -- \
  --enable-logging -g 'BrowserWindow module'
```

## Обмен кэшем git между несколькими машинами

Можно поделиться кэшем gclient git с другими машинами, экспортовав его в качестве доли SMB на linux, но только один процесс/машина может использовать кэш в время. Блокировки, установленные скриптом git-cache попытаются предотвратить это, однако возможна нестабильная работа по сети.

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

### gclient синхронизации жалуется на перебазу

Если `gclient sync` прерван, дерево git может быть оставлено в плохом состоянии, что приведет к загадочному сообщению при `gclient sync` в будущем:

```plaintext
2> конфликт при перебазирование этой ветви.
2> исправить конфликт и запустить gclient снова.
2> Смотрите человек git-rebase для получения подробной информации.
```

При отсутствие git-конфликтов или перебазы в `src/electron`, возможно, потребуется прервать `git am` в `src`:

```sh
$ CD .. /
$ git am --
$ CD электрон
$ Gclient синхронизации -f
```

### Меня просят имя пользователя / пароль для chromium-internal.googlesource.com

Если вы видите запрос для `Имя пользователя для 'https://chrome-internal.googlesource.com':` при запуске `gclient sync` на Windows, это возможно, потому что `DEPOT_TOOLS_WIN_TOOLCHAIN` переменная окружения не установлена в 0. Откройте `Панель управления` → `Система и безопасность` → `Система` → `Дополнительные параметры системы` и добавьте системную переменную `DEPOT_TOOLS_WIN_TOOLCHAIN` с значением `0`.  Она говорит `depot_tools` использовать вашу локальную версию Visual Studio (по умолчанию, `depot_tools` попробует загрузить приватную Google версию к которой имеют доступ только Гугловцы).

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

[target_os values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values
[target_cpu values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values
