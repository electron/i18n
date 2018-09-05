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

При разработке под linux с gdb рекомендуется добавлять индекс gdb для ускорения загрузки symbols. This doesn't need to be executed on every build, but it is recommended to do it at least once to index most shared libraries:

```sh
$ ./vendor/libchromiumcontent/src/build/gdb-add-index ./out/D/electron
```

Building libchromiumcontent requires a powerful machine and takes a long time (though incremental rebuilding the shared library component is fast). With an 8-core/16-thread Ryzen 1700 CPU clocked at 3ghz, fast SSD and 32GB of RAM, it should take about 40 minutes. It is not recommended to build with less than 16GB of RAM.

## Chromium git cache

`depot_tools` has an undocumented option that allows the developer to set a global cache for all git objects of Chromium + dependencies. This option uses `git clone --shared` to save bandwidth/space on multiple clones of the same repositories.

On electron/libchromiumcontent, this option is exposed through the `LIBCHROMIUMCONTENT_GIT_CACHE` environment variable. If you intend to have several libchromiumcontent build trees on the same machine(to work on different branches for example), it is recommended to set the variable to speed up the download of Chromium source. Например:

```sh
$ mkdir ~/.chromium-git-cache
$ LIBCHROMIUMCONTENT_GIT_CACHE=~/.chromium-git-cache ./script/bootstrap.py -d --build_debug_libcc
```

If the bootstrap script is interrupted while using the git cache, it will leave the cache locked. To remove the lock, delete the files ending in `.lock`:

```sh
$ find ~/.chromium-git-cache/ -type f -name '*.lock' -delete
```

It is possible to share this directory with other machines by exporting it as SMB share on linux, but only one process/machine can be using the cache at a time. The locks created by git-cache script will try to prevent this, but it may not work perfectly in a network.

On Windows, SMBv2 has a directory cache that will cause problems with the git cache script, so it is necessary to disable it by setting the registry key

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

to 0. More information: https://stackoverflow.com/a/9935126