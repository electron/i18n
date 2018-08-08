# Build Instructions (experimental GN build)

Follow the guidelines below for building Electron with the experimental GN
build.

> **NOTE**: The GN build system is in _experimental_ status, and currently only
> works on macOS, Linux and Windows.

## Prerequisites

Check the build prerequisites for your platform before proceeding

  * [macOS](build-instructions-osx.md#prerequisites)
  * [Linux](build-instructions-linux.md#prerequisites)
  * [Windows](build-instructions-windows.md#prerequisites)

## Install `depot_tools`

You'll need to install [`depot_tools`][depot-tools], the toolset
used for fetching Chromium and its dependencies.

Also, on windows open:

`Control Panel → System and Security → System → Advanced system settings`

and add a system variable `DEPOT_TOOLS_WIN_TOOLCHAIN` with value `0`.
This tells `depot_tools` to use your locally installed
version of Visual Studio (by default, `depot_tools` will try to use a google-internal version).

[depot-tools]: http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

## Getting the Code

```sh
$ mkdir electron-gn && cd electron-gn
$ cat > .gclient <<-GCLIENT
solutions = [
  {
    "url": "https://github.com/electron/electron",
    "managed": False,
    "name": "src/electron",
  },
]
GCLIENT
$ gclient sync --with_branch_heads --with_tags
# This will take a while, go get a coffee.
```

## Building

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

This will generate a build directory `out/Default` under `src/` with
debug build configuration. You can replace `Default` with another name,
but it should be a subdirectory of `out`. Also, to know the list
of available configuration options, run `gn args out/Default --list`.
Also you shouldn't have to run `gn gen` again—if you want to change the
build arguments, you can run `gn args out/Default` to bring up an editor.

**For generating Debug/Component build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

**For generating Release/Non-Component build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/release.gn")'
```

**To build, run `ninja` with the `electron:electron_app` target:**

```sh
$ ninja -C out/Default electron:electron_app
# This will also take a while and probably heat up your lap.
```

This will build all of what was previously 'libchromiumcontent' (i.e. the
`content/` directory of `chromium` and its dependencies, incl. WebKit and V8),
so it will take a while.

To speed up subsequent builds, you can use [sccache][sccache]. Add the GN arg
`cc_wrapper="sccache"` by running `gn args out/Default` to bring up an editor.

[sccache]: https://github.com/mozilla/sccache

The built executable will be under `./out/Default`:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron
# or, on Linux
$ ./out/Default/electron
```

### Cross-compiling

To compile for a platform that isn't the same as the one you're building on,
set the `target_cpu` GN argument. For example, to compile a windows x86 target
from an x64 host, specify `target_cpu = "x86"` in `gn args`.

```sh
$ gn gen out/Default-x86 --args='... target_cpu = "x86"'
```

Not all combinations of source and target CPU/OS are supported by Chromium.
Only cross-compiling Windows 32-bit from Windows 64-bit has been tested in
Electron. If you test other combinations and find them to work, please update
this document :)

## Tests

To run the tests, you'll first need to build the test modules against the
same version of Node.js that was built as part of the build process. To
generate build headers for the modules to compile against, run the following
under `src/` directory.

```sh
$ ninja -C out/Default electron/build/node:headers
# Install the test modules with the generated headers
$ (cd electron/spec && npm i --nodedir=../../out/Default/gen/node_headers)
```

Then, run Electron with `electron/spec` as the argument:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec
```

If you're debugging something, it can be helpful to pass some extra flags to
the Electron binary:

```sh
$ ./out/Default/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```
