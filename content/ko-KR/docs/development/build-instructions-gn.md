# 빌드 개요 (GN 빌드는 실험적인 기능)

아래 설명은 Electron을 GN으로 빌드하는 방법에 대한 것입니다.

> **노트**: GN 빌드 시스템은 *실험적인* 기능입니다.

## 빌드전 요구 사양

더 진행하기 전에 플랫폼에 따른 요구 사양을 미리 확인하십시오.

- [macOS](build-instructions-osx.md#prerequisites)
- [Linux](build-instructions-linux.md#prerequisites)
- [Windows](build-instructions-windows.md#prerequisites)

## `depot_tools` 설치하기

[`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up)를 설치해야합니다. <0>depot_tools</0>는 Chromium과 필요 요구사양을 가져오는데 사용하는 도구모음입니다.

윈도우 환경에서는 `DEPOT_TOOLS_WIN_TOOLCHAIN=0` 환경 변수를 지정해주어야 합니다. `제어판`→`시스템과 보안`→`시스템`→`고급 시스템 설정`으로 이동합니다. 환경 변수... 버튼을 클릭하고 `DEPOT_TOOLS_WIN_TOOLCHAIN` 환경 변수를 `0` 값으로 설정합니다. 이렇게 하면 `depot_tools`가 로컬에 설정된 버전의 비주얼 스튜디오를 사용하게 됩니다. (기본값으로 `depot_tools`는 구글 내부에서 사용하는 비주얼 스튜디오 버전을 다운로드를 시도합니다.)

## 코드 가져오기

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config \
    --name "src/electron" \
    --unmanaged \
    https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# This will take a while, go get a coffee.
```

## 빌드하기

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

This will generate a build directory `out/Default` under `src/` with debug build configuration. You can replace `Default` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Default` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Default --list`.

**For generating Debug (aka "component" or "shared") build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/debug.gn")'
```

**For generating Release (aka "non-component" or "static") build config of Electron:**

```sh
$ gn gen out/Default --args='import("//electron/build/args/release.gn")'
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

## 테스트

To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under `src/` directory.

```sh
$ ninja -C out/Default electron/build/node:headers
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