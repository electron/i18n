# Build Instructions

Follow the guidelines below for building Electron.

## Platform prerequisites

Check the build prerequisites for your platform before proceeding

- [macOS](build-instructions-osx.md#prerequisites)
- [Linux](build-instructions-linux.md#prerequisites)
- [Windows](build-instructions-windows.md#prerequisites)

## GN prerequisites

You'll need to install [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up), the toolset used for fetching Chromium and its dependencies.

Also, on Windows, you'll need to set the environment variable `DEPOT_TOOLS_WIN_TOOLCHAIN=0`. To do so, open `Control Panel` → `System and
Security` → `System` → `Advanced system settings` and add a system variable `DEPOT_TOOLS_WIN_TOOLCHAIN` with value `0`. This tells `depot_tools` to use your locally installed version of Visual Studio (by default, `depot_tools` will try to download a Google-internal version that only Googlers have access to).

## Cached builds (optional step)

### GIT_CACHE_PATH

If you plan on building Electron more than once, adding a git cache will speed up subsequent calls to `gclient`. To do this, set a `GIT_CACHE_PATH` environment variable:

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# This will use about 16G.
```

### sccache

Thousands of files must be compiled to build Chromium and Electron. You can avoid much of the wait by reusing Electron CI's build output via [sccache](https://github.com/mozilla/sccache). This requires some optional steps (listed below) and these two environment variables:

```sh
export SCCACHE_BUCKET="electronjs-sccache"
export SCCACHE_TWO_TIER=true
```

## Getting the code

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config \
    --name "src/electron" \
    --unmanaged \
    https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# This will take a while, go get a coffee.
```

### Chromium git cache

`depot_tools` has an option that allows the developer to set a global cache for all git objects of Chromium + dependencies. This option uses `git clone
--shared` to save bandwidth/space on multiple clones of the same repositories.

If you intend to have several Electron build trees on the same machine (to work on different versions of Electron for example), it is recommended to set use the git cache to speed up the download of Chromium source. Sebagai contoh:

```sh
$ mkdir ~/.chromium-git-cache
$ gclient config \
    --name "src/electron" \
    --unmanaged \
    --cache_dir="$HOME/.chromium-git-cache" \
    https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
```

If the bootstrap script is interrupted while using the git cache, it will leave the cache locked. To remove the lock, pass the `--break_repo_locks` argument to `gclient sync`.

#### Sharing the cache between multiple machines

Adalah mungkin untuk berbagi direktori ini dengan mesin lain dengan mengekspornya sebagai Bagian SMB di linux, tapi hanya satu proses / mesin yang bisa menggunakan cache di a waktu. Kunci yang dibuat dengan skrip git-cache akan mencoba untuk mencegah hal ini, tapi mungkin saja tidak bekerja sempurna dalam jaringan.

Pada Windows, SMBv2 memiliki cache direktori yang akan menimbulkan masalah dengan git Script cache, jadi perlu untuk menonaktifkannya dengan mengatur kunci registry

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

to 0. More information: https://stackoverflow.com/a/9935126

## Bangunan 

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
# this next line is needed only if building with sccache
$ export GN_EXTRA_ARGS="${GN_EXTRA_ARGS} cc_wrapper=\"${PWD}/electron/external_binaries/sccache\""
$ gn gen out/Default --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

This will generate a build directory `out/Default` under `src/` with debug build configuration. You can replace `Default` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Default` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Default --list`.

**For generating Debug (aka "component" or "shared") build config of Electron:**

```sh
$ gn gen out/Default --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

**For generating Release (aka "non-component" or "static") build config of Electron:**

```sh
$ gn gen out/Default --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**To build, run `ninja` with the `electron:electron_app` target:**

```sh
$ ninja -C out/Default electron:electron_app
# This will also take a while and probably heat up your lap.
```

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

To speed up subsequent builds, you can use [sccache](https://github.com/mozilla/sccache). Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Default` to bring up an editor and adding a line to the end of the file.

The built executable will be under `./out/Default`:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron
# or, on Windows
$ ./out/Default/electron.exe
# or, on Linux
$ ./out/Default/electron
```

### Cross-compiling

To compile for a platform that isn't the same as the one you're building on, set the `target_cpu` and `target_os` GN arguments. For example, to compile an x86 target from an x64 host, specify `target_cpu = "x86"` in `gn args`.

```sh
$ gn gen out/Default-x86 --args='... target_cpu = "x86"'
```

Not all combinations of source and target CPU/OS are supported by Chromium. Only cross-compiling Windows 32-bit from Windows 64-bit and Linux 32-bit from Linux 64-bit have been tested in Electron. If you test other combinations and find them to work, please update this document :)

See the GN reference for allowable values of [`target_os`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values) and [`target_cpu`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values)

## Uji

To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under `src/` directory.

```sh
$ ninja -C out/Default third_party/electron_node:headers
# Install the test modules with the generated headers
$ (cd electron/spec && npm i --nodedir=../../out/Default/gen/node_headers)
```

Then, run Electron with `electron/spec` as the argument:

```sh
# on Mac:
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec
# on Windows:
$ ./out/Default/electron.exe electron/spec
# on Linux:
$ ./out/Default/electron electron/spec
```

If you're debugging something, it can be helpful to pass some extra flags to the Electron binary:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```