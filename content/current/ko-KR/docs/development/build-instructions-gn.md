# 빌드 방법

아래 명시된 가이드라인에 따라 Electron을 빌드하시길 바랍니다.

## 플랫폼 별 기본 요건

우선, 빌드를 진행할 플랫폼의 기본 요건을 확인하세요.

  * [macOS](build-instructions-macos.md#prerequisites)
  * [리눅스](build-instructions-linux.md#prerequisites)
  * [Windows](build-instructions-windows.md#prerequisites)

## GN 기본 요건

Chromium과 Chromium 관련 의존성을 가져오는데 사용되는 툴셋인 [`depot_tools`](http://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up)를 설치해야 합니다.

또한, Windows에서는 환경 변수 `DEPOT_TOOLS_WIN_TOOLCHAIN=0`으로 설정해야 합니다. 이를 위해, `제어판`→`시스템과 보안`→`시스템`→`고급 시스템 설정`을 열고, 그 값이 `0` 인 시스템 변수 `DEPOT_TOOLS_WIN_TOOLCHAIN`을 추가합니다.  이것은 로컬에 설치된 Visual Studio 버전을 사용하라고 `depot_tools`에게 알려주는 설정입니다. (이같은 설정이 없다면, `depot_tools`는 구글 직원들만 이용할 수 있는 구글 내부 Visual Studio 버전을 다운로드할 것입니다).

### Setting up the git cache

If you plan on checking out Electron more than once (for example, to have multiple parallel directories checked out to different branches), using the git cache will speed up subsequent calls to `gclient`. To do this, set a `GIT_CACHE_PATH` environment variable:

```sh
$ export GIT_CACHE_PATH="${HOME}/.git_cache"
$ mkdir -p "${GIT_CACHE_PATH}"
# 약 16G의 저장공간을 사용할 것입니다.
```

## 코드 받기

```sh
$ mkdir electron && cd electron
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
$ git checkout master
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
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

Windows 환경이라면 (추가적인 인자는 없음):
```sh
$ cd src
$ set CHROMIUM_BUILDTOOLS_PATH=%cd%\buildtools
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\")"
```

This will generate a build directory `out/Testing` under `src/` with the testing build configuration. You can replace `Testing` with another name, but it should be a subdirectory of `out`. Also you shouldn't have to run `gn gen` again—if you want to change the build arguments, you can run `gn args out/Testing` to bring up an editor.

To see the list of available build configuration options, run `gn args
out/Testing --list`.

**For generating Testing build config of Electron:**

```sh
$ gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") $GN_EXTRA_ARGS"
```

**Electron의 Release ("non-component" 또는 "static" 이라고 부르기도 함) 빌드 설정을 생성하려면:**

```sh
$ gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"
```

**빌드하고 `electron` 타켓과 함께 `ninja`를 실행하려면:** 주의하세요: 이 작업은 시간이 좀 걸릴 수 있습니다.

For the testing configuration:
```sh
$ ninja -C out/Testing electron
```

release 설정:
```sh
$ ninja -C out/Release electron
```

이 명령어는 이전에 'libchromiumcontent' (`chromium` 디렉토리의 `content/` 디렉토리와 WebKit 및 V8을 포함한 관련 의존성) 였던 모든 것을 빌드하는 것이기 때문에 상당한 시간이 걸릴 것입니다.

반복된 빌드 작업 속도를 향상시키기 위해 [sccache](https://github.com/mozilla/sccache)를 사용할 수 있습니다. Add the GN arg `cc_wrapper = "sccache"` by running `gn args out/Testing` to bring up an editor and adding a line to the end of the file.

The built executable will be under `./out/Testing`:

```sh
$ ./out/Testing/Electron.app/Contents/MacOS/Electron
# or, on Windows
$ ./out/Testing/electron.exe
# or, on Linux
$ ./out/Testing/electron
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
$ gn gen out/Testing-x86 --args='... target_cpu = "x86"'
```

Chromium에서 모든 종류의 소스 및 타겟 CPU/OS 조합을 지원하지는 않습니다.

<table>
<tr><th>Host</th><th>Target</th><th>Status</th></tr>
<tr><td>Windows x64</td><td>Windows arm64</td><td>Experimental</td>
<tr><td>Windows x64</td><td>Windows x86</td><td>Automatically tested</td></tr>
<tr><td>Linux x64</td><td>Linux x86</td><td>Automatically tested</td></tr>
</table>

If you test other combinations and find them to work, please update this document :)

See the GN reference for allowable values of [`target_os`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values) and [`target_cpu`](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values).

#### Windows on Arm (experimental)
To cross-compile for Windows on Arm, [follow Chromium's guide](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) to get the necessary dependencies, SDK and libraries, then build with `ELECTRON_BUILDING_WOA=1` in your environment before running `gclient sync`.

```bat
set ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Or (if using PowerShell):
```powershell
$env:ELECTRON_BUILDING_WOA=1
gclient sync -f --with_branch_heads --with_tags
```

Next, run `gn gen` as above with `target_cpu="arm64"`.


## 테스트

테스트를 실행하려면 우선 빌드 과정에서 빌드된 Node.js 버전과 같은 버전을 기준으로 테스트 모듈을 빌드해야합니다. 컴파일하려는 모듈을 위한 빌드 헤더를 생성하려면 `src/` 디렉토리 안에서 다음 명령어를 실행하세요.

```sh
$ ninja -C out/Testing third_party/electron_node:headers
```

You can now [run the tests](testing.md#unit-tests).

Electron 바이너리에 추가 플래그를 넘겨주면 디버깅하는데 도움이 될 것입니다:

```sh
$ npm run test -- \
  --enable-logging -g 'BrowserWindow module'
```

## 다른 컴퓨터와 git cache 공유하기

리눅스에서는 SMB 공유를 이용한 내보내기를 통해 gclient git cache를 다른 컴퓨터와 공유할 수 있습니다. 하지만 한 번에 한 프로세스/컴퓨터에서만 캐시를 사용할 수 있습니다. git-cache 스크립트에 의해 생성된 locks이 이러한 상황을 막기 위해 노력하겠지만, 네트워크 환경에서는 완벽하게 동작하지는 않을 수 있습니다.

Windows에서는 SMBv2 는 캐시 디렉토리를 가지고 있는데 git cache 스크립트와 문제를 일으킬 수 있습니다. 따라서, 아래의 레지스터 키를

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

0으로 설정해 비활성화시켜야 합니다. 추가 정보는 이곳에서 확인하세요: https://stackoverflow.com/a/9935126

This can be set quickly in powershell (ran as administrator):

```powershell
New-ItemProperty -Path "HKLM:\System\CurrentControlSet\Services\Lanmanworkstation\Parameters" -Name DirectoryCacheLifetime -Value 0 -PropertyType DWORD -Force
```

## 문제 해결

### git cache 안의 오래된 locks
git cache 이용 과정 중에 `gclient sync`가 중단되면, 캐시는 잠긴 상태(locked) 로 남을 것입니다. To remove the lock, pass the `--ignore_locks` argument to `gclient sync`.

### chromium-internal.googlesource.com에 대한 사용자이름/비밀번호를 물어보는 경우
Windows에서 `gclient sync`를 실행했을 때 `'https://chrome-internal.googlesource.com':에 대한 사용자 이름` 을 요청하는 창이 나타났다면, `DEPOT_TOOLS_WIN_TOOLCHAIN` 환경 변수를 0으로 설정하지 않았기 때문일 것입니다. `제어판`→`시스템과 보안`→`시스템`→`고급 시스템 설정`을 열고, 그 값이 `0` 인 시스템 변수 `DEPOT_TOOLS_WIN_TOOLCHAIN`을 추가합니다.  이것은 로컬에 설치된 Visual Studio 버전을 사용하라고 `depot_tools`에게 알려주는 설정입니다. (이같은 설정이 없다면, `depot_tools`는 구글 직원들만 이용할 수 있는 구글 내부 Visual Studio 버전을 다운로드할 것입니다).
