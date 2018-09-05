# Разработка Chromium

> Список ресурсов для изучения Chromium и отслеживания его разработки

- [chromiumdev](https://chromiumdev-slack.herokuapp.com) в Slack
- [@ChromiumDev](https://twitter.com/ChromiumDev) в Twitter
- [@googlechrome](https://twitter.com/googlechrome) в Twitter
- [Блог](https://blog.chromium.org)
- [Code Search](https://cs.chromium.org/)
- [Исходный код](https://cs.chromium.org/chromium/src/)
- [Development Calendar and Release Info](https://www.chromium.org/developers/calendar)
- [Discussion Groups](http://www.chromium.org/developers/discussion-groups)

Также смотрите [V8 Development](v8-development.md)

# Разработка под Chromium с помощью Electron

Отладка в Chromium с помощью Electron может осуществляться подачей `--build_debug_libcc` в загрузочный скрипт:

```sh
$ ./script/bootstrap.py -d --build_debug_libcc
```

После этого произойдет загрузка и локальная сборка libchromiumcontent, подобно `--build_release_libcc`, но при этом будет создана общая сборка библиотеки, откуда не будут удалены symbols, что облегчит отладку.

При сборке таким образом, вы можете вносить изменения в файлы в `vendor/libchromiumcontent/src` и пересобирать с помощью:

```sh
$ ./script/build.py -c D --libcc
```

При разработке под linux с gdb рекомендуется добавлять индекс gdb для ускорения загрузки symbols. Выполнять эту команду при каждой сборке не обязательно, но рекомендуется сделать это хотя бы один раз для индексации большинства общих библиотек:

```sh
$ ./vendor/libchromiumcontent/src/build/gdb-add-index ./out/D/electron
```

Для сборки libchromiumcontent необходимы большая вычислительная мощность и много времени (однако, последующие пересборки компонентов общей библиотеки происходят быстро). С 8-ядерным/16-поточным процессором Ryzen 1700 с частотой 3 Ггц, быстрым SSD и 32 Гб оперативной памяти, это займет приблизительно 40 минут. Сборка при оперативной памяти менее чем 16 Гб не рекомендуется.

## Chromium git cache

У `depot_tools` есть незадокументированная опция, которая позволяет разработчику установить глобальный кэш для всех git объектов Chromium + зависимостей. Эта опция использует `git clone --shared` для экономии трафика/свободного места на нескольких клонах одного репозитория.

В electron/libchromiumcontent, эта опция доступна через переменную окружения `LIBCHROMIUMCONTENT_GIT_CACHE`. Если вы хотели несколько деревьев сборки libchromiumcontent на одной машине (для работы над разными ветвями, например), рекомендуется объявить переменную для ускорения загрузки исходников Chromium. Например:

```sh
$ mkdir ~/.chromium-git-cache
$ LIBCHROMIUMCONTENT_GIT_CACHE=~/.chromium-git-cache ./script/bootstrap.py -d --build_debug_libcc
```

Если работа загрузочного скрипта прервана при использовании git cache, он оставит кэш заблокированным. Чтобы снять блокировку, удалите все файлы, заканчивающиеся на `.lock`:

```sh
$ find ~/.chromium-git-cache/ -type f -name '*.lock' -delete
```

Возможно делиться этой директорией с другими машинами, экспортируя ее как SMB share на Linux, но лишь один процесс/машина могут использовать этот кэш одновременно. Блокировки, установленные скриптом git-cache попытаются предотвратить это, однако возможна нестабильная работа по сети.

На Windows, у SMBv2 есть кэш директорий, который будет создавать проблемы со скриптом git-cache, поэтому необходимо отключить его, установив ключ регистра

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

больше информации: https://stackoverflow.com/a/9935126