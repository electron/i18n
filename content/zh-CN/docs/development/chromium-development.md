# Chromium 开发

> 学习 和跟踪 Chromium 开发的资源集合

- [chromiumdev](https://chromiumdev-slack.herokuapp.com) on Slack
- [@ChromiumDev](https://twitter.com/ChromiumDev) on Twitter
- [@googlechrome](https://twitter.com/googlechrome) on Twitter
- [博客](https://blog.chromium.org)
- [代码搜索](https://cs.chromium.org/)
- [源代码](https://cs.chromium.org/chromium/src/)
- [开发日历和版本信息](https://www.chromium.org/developers/calendar)
- [讨论组](http://www.chromium.org/developers/discussion-groups)

参阅 [V8 开发](v8-development.md)

# 通过 Electron 开发 Chromium

通过 Electron 来调试 Chromium 是可能的，只需将 `--build_debug_libcc` 传递给 bootstrap 引导脚本：

```sh
$ ./script/bootstrap.py -d --build_debug_libcc
```

这将在本地下载和生成 libchromiumcontent, 类似于 `-build_release_libcc `, 但它将创建 libchromiumcontent 的共享库版本, 并且不会剥离任何符号, 从而使其成为调试的理想选择。

这样生成时, 您可以对 ` vendor/libchromiumcontent/src ` 中的文件进行更改, 并使用以下内容快速重新生成:

```sh
$ ./script/build.py -c D --libcc
```

当在linux上使用 gdb 开发时, 建议添加一个 gdb 索引来加速加载符号。 这不需要在每次生成时执行, 但建议至少执行一次以索引大多数共享库:

```sh
$ ./vendor/libchromiumcontent/src/build/gdb-add-index ./out/D/electron
```

构建 libchromiumcontent 需要强大的机器, 需要很长的时间 (虽然增量重建共享库组件是快速的)。 使用一个8核/16线程的 Ryzen 1700 CPU 时钟在 3ghz, 快速 SSD 和32GB 的内存, 它应该需要大约40分钟。 不建议使用少于16GB 的内存进行生成。

## Chromium git 缓存

`depot_tools` has an undocumented option that allows the developer to set a global cache for all git objects of Chromium + dependencies. 此选项使用 ` git clone --shared ` 可在同一存储库的多个克隆上节省带宽/空间。

On electron/libchromiumcontent, this option is exposed through the `LIBCHROMIUMCONTENT_GIT_CACHE` environment variable. If you intend to have several libchromiumcontent build trees on the same machine(to work on different branches for example), it is recommended to set the variable to speed up the download of Chromium source. 例如：

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

为 0. 更多内容: https://stackoverflow.com/a/9935126