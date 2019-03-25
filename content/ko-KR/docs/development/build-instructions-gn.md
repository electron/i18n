# 빌드 방법

아래 명시된 가이드라인에 따라 Electron을 빌드하시길 바랍니다.

## 플랫폼 별 기본 요건

우선, 빌드를 진행할 플랫폼의 기본 요건을 확인하세요.

- [macOS](build-instructions-macos.md#prerequisites)
- [리눅스](build-instructions-linux.md#prerequisites)
- [Windows](build-instructions-windows.md#prerequisites)

## GN 기본 요건

Chromium과 Chromium 관련 의존성을 가져오는데 사용되는 툴셋인 [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up)를 설치해야 합니다.

또한, Windows에서는 환경 변수 `DEPOT_TOOLS_WIN_TOOLCHAIN=0`으로 설정해야 합니다. 이를 위해, `제어판`→`시스템과 보안`→`시스템`→`고급 시스템 설정`을 열고, 그 값이 `0` 인 시스템 변수 `DEPOT_TOOLS_WIN_TOOLCHAIN`을 추가합니다. 이것은 로컬에 설치된 Visual Studio 버전을 사용하라고 `depot_tools`에게 알려주는 설정입니다. (이같은 설정이 없다면, `depot_tools`는 구글 직원들만 이용할 수 있는 구글 내부 Visual Studio 버전을 다운로드할 것입니다).

## 캐시된 빌드 (선택 사항)

### GIT\_CACHE\_PATH

Electron을 여러 번 빌드할 예정이라면, git cache를 추가하여 잇따라 발생하는 `gclient` 호출 속도를 높일 수 있습니다. git cache를 추가하려면 `GIT_CACHE_PATH` 환경 변수를 설정하세요:

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# This will use about 16G.
```

> **주의**: git cache는 로컬 캐시를 지정하기 위해 upstream git 저장소 대신 `src/electron` 저장소를 `origin`으로 설정할 것입니다. 이같은 설정을 유지하면 `git push`를 실행할 때 원하는 결과를 얻지 못하게 될 것입니다—여러분은 로컬 캐시가 아닌 github로 push하고 싶을 것입니다. 이러한 문제를 해결하려면, `src/electron` 디렉토리에서 아래 명령어를 실행하세요:

```sh
$ git remote set-url origin https://github.com/electron/electron
```

### sccache

Chromium 및 Electron을 빌드하기 위해 수 천개의 파일이 컴파일됩니다. [sccache](https://github.com/mozilla/sccache)를 통해 Electron CI의 빌드 결과를 재사용하면 대기 시간을 줄일 수 있습니다. 이를 위해, 2 개의 환경 변수 설정과 추가적인 절차(하단에 명시됨)가 필요합니다.

```sh
export SCCACHE_BUCKET="electronjs-sccache"
export SCCACHE_TWO_TIER=true
```

## 코드 받기

```sh
$ mkdir electron-gn && cd electron-gn
$ gclient config \
    --name "src/electron" \
    --unmanaged \
    https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# 이 작업은 시간이 약간 소요될 수 있습니다.
```

> `https://github.com/electron/electron` 대신, 자신이 소유한 fork저장소를 사용할 수도 있습니다. (저장소 url은 아래와 같은 형태일 것입니다. `https://github.com/<username>/electron`).

#### pulling/pushing 관련 참고 사항

향후 공식 `electron` 저장소에 대해 `git pull` 또는 `git push`를 할 계획이라면 각 폴더의 origin URL을 업데이트해야 합니다.

```sh
$ cd src/electron
$ git remote remove origin
$ git remote add origin https://github.com/electron/electron
$ git branch --set-upstream-to=origin/master
$ cd -
```

:memo: `gclient` 는 의존성 (Chromium 이나 Node.js 같은)을 확인하기 위해 `src/electron` 폴더 안에 있는 `DEPS`라는 파일을 확인합니다. `gclient sync -f`는 Electron 빌드를 위해 필요한 모든 의존성이 DEPS 파일과 일치하는지 확인하는 명령어입니다.

따라서, pull을 하려면 다음 명령어를 입력하세요:

```sh
$ cd src/electron
$ git pull
$ gclient sync -f
```

## 빌드하기

```sh
$ cd src
$ export CHROMIUM_BUILDTOOLS_PATH=`pwd`/buildtools
# this next line is needed only if building with sccache
$ export GN_EXTRA_ARGS="${GN_EXTRA_ARGS} cc_wrapper=\"${PWD}/electron/external_binaries/sccache\""
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

Windows 환경이라면 (추가적인 인자는 없음):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\")"
```

This will generate a build directory `out/Debug` under `src/` with debug build configuration. You can replace `Debug` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Debug` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Debug --list`.

**Electron의 디버그("component" 또는 "shared") 빌드 설정을 생성하려면 이 명령어를 실행하십시오:**

```sh
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

**Electron의 배포("non-component" 또는 "static") 빌드 설정을 생성하려면 이 명령어를 실행하십시오:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**To build, run `ninja` with the `electron` target:** Nota Bene: This will also take a while and probably heat up your lap.

For the debug configuration:

```sh
$ ninja -C out/Debug electron
```

For the release configuration:

```sh
$ ninja -C out/Release electron
```

This will build all of what was previously 'libchromiumcontent' (i.e. the `content/` directory of `chromium` and its dependencies, incl. WebKit and V8), so it will take a while.

To speed up subsequent builds, you can use [sccache](https://github.com/mozilla/sccache). Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Debug` to bring up an editor and adding a line to the end of the file.

The built executable will be under `./out/Debug`:

```sh
$ ./out/Debug/Electron.app/Contents/MacOS/Electron
# or, on Windows
$ ./out/Debug/electron.exe
# or, on Linux
$ ./out/Debug/electron
```

### 패키징

On linux, first strip the debugging and symbol information:

```sh
electron/script/strip-binaries.py -d out/Release
```

To package the electron build as a distributable zip file:

```sh
ninja -C out/Release electron:electron_dist_zip
```

### Cross-compiling

To compile for a platform that isn't the same as the one you're building on, set the `target_cpu` and `target_os` GN arguments. For example, to compile an x86 target from an x64 host, specify `target_cpu = "x86"` in `gn args`.

```sh
$ gn gen out/Debug-x86 --args='... target_cpu = "x86"'
```

Not all combinations of source and target CPU/OS are supported by Chromium. Only cross-compiling Windows 32-bit from Windows 64-bit and Linux 32-bit from Linux 64-bit have been tested in Electron. If you test other combinations and find them to work, please update this document :)

See the GN reference for allowable values of [`target_os`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values) and [`target_cpu`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values)

## 테스트

To run the tests, you'll first need to build the test modules against the same version of Node.js that was built as part of the build process. To generate build headers for the modules to compile against, run the following under `src/` directory.

```sh
$ ninja -C out/Debug third_party/electron_node:headers
# Install the test modules with the generated headers
$ (cd electron/spec && npm i --nodedir=../../out/Debug/gen/node_headers)
```

Then, run Electron with `electron/spec` as the argument:

```sh
# on Mac:
$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec
# on Windows:
$ ./out/Debug/electron.exe electron/spec
# on Linux:
$ ./out/Debug/electron electron/spec
```

If you're debugging something, it can be helpful to pass some extra flags to the Electron binary:

```sh
$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```

## Sharing the git cache between multiple machines

It is possible to share the gclient git cache with other machines by exporting it as SMB share on linux, but only one process/machine can be using the cache at a time. The locks created by git-cache script will try to prevent this, but it may not work perfectly in a network.

On Windows, SMBv2 has a directory cache that will cause problems with the git cache script, so it is necessary to disable it by setting the registry key

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

to 0. More information: https://stackoverflow.com/a/9935126

## 문제 해결

### Stale locks in the git cache

If `gclient sync` is interrupted while using the git cache, it will leave the cache locked. To remove the lock, pass the `--break_repo_locks` argument to `gclient sync`.

### I'm being asked for a username/password for chromium-internal.googlesource.com

If you see a prompt for `Username for 'https://chrome-internal.googlesource.com':` when running `gclient sync` on Windows, it's probably because the `DEPOT_TOOLS_WIN_TOOLCHAIN` environment variable is not set to 0. Open `Control Panel` → `System and Security` → `System` → `Advanced system settings` and add a system variable `DEPOT_TOOLS_WIN_TOOLCHAIN` with value `0`. 이렇게 하면 `depot_tools`가 로컬에 설정된 버전의 비주얼 스튜디오를 사용하게 됩니다. (기본값으로 `depot_tools`는 구글 내부에서 사용하는 비주얼 스튜디오 버전을 다운로드를 시도합니다.)