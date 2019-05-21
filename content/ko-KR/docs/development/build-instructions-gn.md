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
# 약 16G의 저장공간을 사용할 것입니다.
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
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# This will take a while, go get a coffee.
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
# 다음 줄은 sccache와 함께 빌드하는 경우만 필요합니다
$ export GN_EXTRA_ARGS="${GN_EXTRA_ARGS} cc_wrapper=\"${PWD}/electron/external_binaries/sccache\""
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

Windows 환경이라면 (추가적인 인자는 없음):

```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\")"
```

위의 명령어를 실행하면 `src/` 아래에 debug 빌드 설정을 가진 `out/Debug`라는 빌드 디렉토리가 생성될 것입니다. `Debug`라는 이름은 다른 이름으로 변경할 수 있습니다. 단, `out`의 서브 디렉토리여야만 합니다. 또한 `gn gen`을 다시 실행할 수 없습니다—빌드 인자를 변경하고 싶다면, 에디터를 불러오기 위해 `gn args out/Debug` 명령을 실행할 수 있습니다.

이용 가능한 빌드 설정 옵션 목록을 보려면, `gn args
out/Debug --list` 명령어를 실행하세요.

**Electron의 Debug ("component" 또는 "shared" 라고 부르기도 함) 빌드 설정을 생성하려면:**

```sh
$ gn gen out/Debug --args="import(\"//electron/build/args/debug.gn\") $GN_EXTRA_ARGS"
```

**Electron의 Release ("non-component" 또는 "static" 이라고 부르기도 함) 빌드 설정을 생성하려면:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**빌드하고 `electron` 타켓과 함께 `ninja`를 실행하려면:** 주의하세요: 이 작업은 시간이 좀 걸릴 수 있습니다.

debug 설정:

```sh
$ ninja -C out/Debug electron
```

release 설정:

```sh
$ ninja -C out/Release electron
```

이 명령어는 이전에 'libchromiumcontent' (`chromium` 디렉토리의 `content/` 디렉토리와 WebKit 및 V8을 포함한 관련 의존성) 였던 모든 것을 빌드하는 것이기 때문에 상당한 시간이 걸릴 것입니다.

반복된 빌드 작업 속도를 향상시키기 위해 [sccache](https://github.com/mozilla/sccache)를 사용할 수 있습니다. `gn args out/Debug` 명령어를 통해 에디터가 파일을 열면 제일 마지막 부분에 `cc_wrapper = "sccache"`를 입력해서 GN 인자를 추가할 수 있습니다.

실행 가능한 빌드 결과는 `./out/Debug` 디렉토리 안에 존재할 것입니다.

```sh
$ ./out/Debug/Electron.app/Contents/MacOS/Electron
# Windows 환경에서는
$ ./out/Debug/electron.exe
# 리눅스 환경에서는
$ ./out/Debug/electron
```

### 패키징

리눅스에서는 우선 아래 명령으로 디버깅 및 심볼 정보를 제거합니다:

```sh
electron/script/strip-binaries.py -d out/Release
```

electron 빌드를 배포 가능한 zip 파일로 패키지하려면:

```sh
ninja -C out/Release electron:electron_dist_zip
```

### 크로스-컴파일

현재 빌드 작업을 하고 있는 플랫폼 환경과 동일하지 않은 플랫폼을 대상으로 컴파일하려면, `target_cpu` 및 `target_os` 를 GN 인자에서 설정하세요 예를 들어, x64 시스템 환경에서 x86을 대상으로 컴파일하는 경우, `gn args`에서 `target_cpu = "x86"`으로 설정하세요.

```sh
$ gn gen out/Debug-x86 --args='... target_cpu = "x86"'
```

Chromium에서 모든 종류의 소스 및 타겟 CPU/OS 조합을 지원하지는 않습니다. Electron에서는 Windows 64-비트에서 Windows 32-비트, 리눅스 64-비트에서 리북스 32-비트에 대한 크로스-컴파일만 테스트되었습니다. 다른 조합을 테스트해보시고 잘 동작한다면, 이 문서를 업데이트 해주시길 바랍니다.

GN 문서에서 사용 가능한 [`target_os`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values) 및 [`target_cpu`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values) 값을 확인하실 수 있습니다.

## 테스트

테스트를 실행하려면 우선 빌드 과정에서 빌드된 Node.js 버전과 같은 버전을 기준으로 테스트 모듈을 빌드해야합니다. 컴파일하려는 모듈을 위한 빌드 헤더를 생성하려면 `src/` 디렉토리 안에서 다음 명령어를 실행하세요.

```sh
$ ninja -C out/Debug third_party/electron_node:headers
# 생성된 헤더를 이용해 테스트 모듈을 설치하세요
$ (cd electron/spec && npm i --nodedir=../../out/Debug/gen/node_headers)
```

그리고 `electron/spec` 인자와 함께 Electron을 실행하세요.

```sh
# Mac:
$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec
# Windows:
$ ./out/Debug/electron.exe electron/spec
# 리눅스:
$ ./out/Debug/electron electron/spec
```

Electron 바이너리에 추가 플래그를 넘겨주면 디버깅하는데 도움이 될 것입니다:

```sh
$ ./out/Debug/Electron.app/Contents/MacOS/Electron electron/spec \
  --ci --enable-logging -g 'BrowserWindow module'
```

## 다른 컴퓨터와 git cache 공유하기

리눅스에서는 SMB 공유를 이용한 내보내기를 통해 gclient git cache를 다른 컴퓨터와 공유할 수 있습니다. 하지만 한 번에 한 프로세스/컴퓨터에서만 캐시를 사용할 수 있습니다. git-cache 스크립트에 의해 생성된 locks이 이러한 상황을 막기 위해 노력하겠지만, 네트워크 환경에서는 완벽하게 동작하지는 않을 수 있습니다.

Windows에서는 SMBv2 는 캐시 디렉토리를 가지고 있는데 git cache 스크립트와 문제를 일으킬 수 있습니다. 따라서, 아래의 레지스터 키를

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

0으로 설정해 비활성화시켜야 합니다. 추가 정보는 이곳에서 확인하세요: https://stackoverflow.com/a/9935126

## 문제 해결

### git cache 안의 오래된 locks

git cache 이용 과정 중에 `gclient sync`가 중단되면, 캐시는 잠긴 상태(locked) 로 남을 것입니다. lock을 제거하려면, `--break_repo_locks` 인자를 `gclient sync`에 전달하시길 바랍니다.

### chromium-internal.googlesource.com에 대한 사용자이름/비밀번호를 물어보는 경우

Windows에서 `gclient sync`를 실행했을 때 `'https://chrome-internal.googlesource.com':에 대한 사용자 이름` 을 요청하는 창이 나타났다면, `DEPOT_TOOLS_WIN_TOOLCHAIN` 환경 변수를 0으로 설정하지 않았기 때문일 것입니다. `제어판`→`시스템과 보안`→`시스템`→`고급 시스템 설정`을 열고, 그 값이 `0` 인 시스템 변수 `DEPOT_TOOLS_WIN_TOOLCHAIN`을 추가합니다. 이것은 로컬에 설치된 Visual Studio 버전을 사용하라고 `depot_tools`에게 알려주는 설정입니다. (이같은 설정이 없다면, `depot_tools`는 구글 직원들만 이용할 수 있는 구글 내부 Visual Studio 버전을 다운로드할 것입니다).