# Chromium Geliştirme

> Krom hakkında öğrenme ve gelişimi izleme için kaynak topluluğu

- [chromiumdev](https://chromiumdev-slack.herokuapp.com) on Slack
- [@ChromiumDev](https://twitter.com/ChromiumDev) on Twitter
- [@googlechrome](https://twitter.com/googlechrome) on Twitter
- [Blog](https://blog.chromium.org)
- [Kod Arama](https://cs.chromium.org/)
- [Kaynak Kodu](https://cs.chromium.org/chromium/src/)
- [Development Calendar and Release Info](https://www.chromium.org/developers/calendar)
- [Tartışma grupları](http://www.chromium.org/developers/discussion-groups)

Ayrıca bkz: [V8 geliştirme](v8-development.md)

# Elektron ile krom geliştirme

Krom elektron ile ileterek hata ayıklamak mümkündür `--build_debug_libcc` önyükleme komut dosyası:

```sh
$ ./script/bootstrap.py -d --build_debug_libcc
```

This will download and build libchromiumcontent locally, similarly to the `--build_release_libcc`, but it will create a shared library build of libchromiumcontent and won't strip any symbols, making it ideal for debugging.

When built like this, you can make changes to files in `vendor/libchromiumcontent/src` and rebuild quickly with:

```sh
$ ./script/build.py -c D --libcc
```

When developing on linux with gdb, it is recommended to add a gdb index to speed up loading symbols. Her dosya üzerinde çalıştırılmasına gerek yoktur, ancak en çok paylaşılan kütüphaneleri dizinlemek için bunu en az bir kez yapmak önerilir:

```sh
$ ./vendor/libchromiumcontent/src/build/gdb-add-index ./out/D/electron
```

Building libchromiumcontent requires a powerful machine and takes a long time (though incremental rebuilding the shared library component is fast). With an 8-core/16-thread Ryzen 1700 CPU clocked at 3ghz, fast SSD and 32GB of RAM, it should take about 40 minutes. It is not recommended to build with less than 16GB of RAM.

## Krom git önbellek

`depot_tools` has an undocumented option that allows the developer to set a global cache for all git objects of Chromium + dependencies. This option uses `git clone --shared` to save bandwidth/space on multiple clones of the same repositories.

On electron/libchromiumcontent, this option is exposed through the `LIBCHROMIUMCONTENT_GIT_CACHE` environment variable. If you intend to have several libchromiumcontent build trees on the same machine(to work on different branches for example), it is recommended to set the variable to speed up the download of Chromium source. Örneğin:

```sh
$ mkdir ~/.chromium-git-cache
$ LIBCHROMIUMCONTENT_GIT_CACHE=~/.chromium-git-cache ./script/bootstrap.py -d --build_debug_libcc
```

If the bootstrap script is interrupted while using the git cache, it will leave the cache locked. To remove the lock, delete the files ending in `.lock`:

```sh
$ find ~/.chromium-git-cache/ -type f -name '*.lock' -delete
```

It is possible to share this directory with other machines by exporting it as SMB share on linux, but only one process/machine can be using the cache at a time. Git-cache komut dosyası tarafından oluşturulan kilitler bunu önlemeye çalışacaktır, ancak ağda mükemmel çalışmayabilir.

Windows'ta, SMBv2'de git ile ilgili sorunlara neden olacak bir dizin önbellek vardır Önbellek komut dosyası, bu nedenle kayıt defteri anahtarını ayarlayarak devre dışı bırakmak gerekir

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

0'a. Daha fazla bilgi için: https://stackoverflow.com/a/9935126