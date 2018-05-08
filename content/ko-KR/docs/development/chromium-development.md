# Chromium 개발

> 크롬에 대해 학습하고 개발을 추적할 수 있는 리소스 모음

- [chromiumdev](https://chromiumdev-slack.herokuapp.com) 슬랙
- [@ChromiumDev](https://twitter.com/ChromiumDev) 트위터
- [@googlechrome](https://twitter.com/googlechrome) 트위터
- [블로그](https://blog.chromium.org)
- [코드 검색](https://cs.chromium.org/)
- [소스 코드](https://cs.chromium.org/chromium/src/)
- [개발 일정 및 출시 정보](https://www.chromium.org/developers/calendar)
- [토론 그룹](http://www.chromium.org/developers/discussion-groups)

[V8 개발](v8-development.md) 참고

# Chromium development with Electron

It is possible to debug Chromium with Electron by passing `--build_debug_libcc` to the bootstrap script:

```sh
$ ./script/bootstrap.py -d --build_debug_libcc
```

This will download and build libchromiumcontent locally, similarly to the `--build_release_libcc`, but it will create a shared library build of libchromiumcontent and won't strip any symbols, making it ideal for debugging.

When built like this, you can make changes to files in `vendor/libchromiumcontent/src` and rebuild quickly with:

```sh
$ ./script/build.py -c D --libcc
```

When developing on linux with gdb, it is recommended to add a gdb index to speed up loading symbols. This doesn't need to be executed on every build, but it is recommended to do it at least once to index most shared libraries:

```sh
$ ./vendor/libchromiumcontent/src/build/gdb-add-index ./out/D/electron
```

Building libchromiumcontent requires a powerful machine and takes a long time (though incremental rebuilding the shared library component is fast). With an 8-core/16-thread Ryzen 1700 CPU clocked at 3ghz, fast SSD and 32GB of RAM, it should take about 40 minutes. It is not recommended to build with less than 16GB of RAM.

## Chromium git cache

`depot_tools` has an undocumented option that allows the developer to set a global cache for all git objects of Chromium + dependencies. This option uses `git clone --shared` to save bandwidth/space on multiple clones of the same repositories.

On electron/libchromiumcontent, this option is exposed through the `LIBCHROMIUMCONTENT_GIT_CACHE` environment variable. If you intend to have several libchromiumcontent build trees on the same machine(to work on different branches for example), it is recommended to set the variable to speed up the download of Chromium source. 예시:

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