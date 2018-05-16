# 빌드 명령 (Linux)

이 가이드는 Linux 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구 사양

* 최소한 25GB 이상의 디스크 공간과 8GB 램이 필요합니다.
* Python 2.7.x. 몇몇 CentOS 6.x와 같은 배포판들은 아직도 Python 2.6.x 버전을 사용합니다. 그래서 먼저 `python -V`를 통해 버전을 확인할 필요가 있습니다.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ python ./script/check-tls.py
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. Alternatively, visit https://www.python.org/downloads/ for detailed instructions.

* Node.js에서 Node를 설치하는 방법은 여러 가지가 있습니다. [nodejs.org](https://nodejs.org) 에서 소스 코드를 받아 빌드하는 방법입니다. 이렇게 하면 Node를 일반 유저로 홈 폴더에 설치할 수 있습니다. 다른 방법으로는 [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories)에서 소스 파일을 받아와 설치할 수 있습니다.

* [clang](https://clang.llvm.org/get_started.html) 3.4 또는 최신 버전
* GTK+ 와 libnotify의 개발용 헤더

Ubuntu를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

RHEL / CentOS를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Fedora를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

다른 배포판의 경우 pacman 같은 패키지 매니저를 통해 패키지를 설치 할 수 있습니다. 패키지의 이름은 대부분 위 예시와 비슷할 것입니다. 또는 소스 코드를 내려받아 직접 빌드하는 방법도 있습니다.

## 코드 가져오기

```sh
$ git clone https://github.com/electron/electron
```

## 부트스트랩

부트스트랩 스크립트는 필수적인 빌드 의존성 라이브러리들을 모두 다운로드하고 프로젝트 파일을 생성합니다. 스크립트가 정상적으로 작동하기 위해선 Python 2.7.x 버전이 필요합니다. 다운로드 작업이 상당히 많은 시간을 소요할 것입니다. 참고로 Electron은 `ninja`를 빌드 툴체인으로 사용하므로 `Makefile`은 생성되지 않습니다.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

### 크로스 컴파일

`arm` 아키텍쳐로 빌드 하려면 다음 의존성 라이브러리를 설치해야 합니다:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Similarly for `arm64`, install the following:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

그리고 `arm` 또는 `ia32`를 크로스 컴파일로 지정하여 `bootstrap.py` 스크립트의 `--target_arch` 파라미터로 넣을 수 있다.

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## 빌드하기

`Release`와 `Debug` 두 타겟 모두 빌드 합니다:

```sh
$ ./script/build.py
```

이 스크립트는 `out/R` 디렉터리에 크기가 매우 큰 Electron 실행 파일을 배치합니다. 파일 크기는 1.3GB를 초과합니다. 이러한 문제가 발생하는 이유는 Release 타겟 바이너리가 디버그 심볼을 포함하기 때문입니다. 파일 크기를 줄이려면 `create-dist.py` 스크립트를 실행하세요:

```sh
$ ./script/create-dist.py
```

이 스크립트는 매우 작은 배포판을 `dist` 디렉터리에 생성합니다. `create-dist.py` 스크립트를 실행한 이후부턴 1.3GB에 육박하는 공간을 차지하는 `out/R` 폴더의 바이너리는 삭제해도 됩니다.

또는 `Debug` 타겟만 빌드 할 수 있습니다:

```sh
$ ./script/build.py -c D
```

빌드가 모두 끝나면 `out/D` 디렉터리에서 `electron` 디버그 바이너리를 찾을 수 있습니다.

## 정리하기

빌드 파일들을 정리하려면:

```sh
$ npm run clean
```

`out`과 `dist` 폴더만 정리하려면:

```sh
$ npm run clean-build
```

참고: 두 정리 명령어는 빌드하기 전에 `bootstrap`을 재실행 해야 한다.

## 문제 해결

### Libtinfo.so.5 동적 링크 라이브러리를 로드하는 도중 에러가 발생할 경우

미리 빌드된 `clang`은 `libtinfo.so.5`로 링크를 시도합니다. 따라서 플랫폼에 따라 적당한 `libncurses` symlink를 추가하세요:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 테스트

[빌드 시스템 개요: 테스트](build-system-overview.md#tests)를 보세요.

## 고급 주제

기본적인 빌드 구성은 가장 주력인 Linux 배포판에 초점이 맞춰져있으며, 특정 배포판이나 기기에 빌드할 계획이라면 다음 정보들이 도움이 될 것입니다.

### 로컬에서 `libchromiumcontent` 빌드하기

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps:

1. Install [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
2. Install [additional build dependencies](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies)
3. 자식 서브 모듈을 가져옵니다.

```sh
$ git submodule update --init --recursive
```

1. Pass the `--build_release_libcc` switch to `bootstrap.py` script:

```sh
$ ./script/bootstrap.py -v --build_release_libcc
```

참고로 `shared_library` 구성은 기본적으로 빌드되어있지 않으며, 다음 모드를 사용하면 `Release` 버전의 Electron만 빌드할 수 있습니다:

```sh
$ ./script/build.py -c R
```

### 다운로드된 `clang` 바이너리 대신 시스템의 `clang` 사용하기

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

예를 들어 `clang`을 `/user/local/bin/clang`에 설치했다면 다음과 같습니다:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### `clang` 대신 다른 컴파일러 사용하기

Electron을 `g++`과 같은 다른 컴파일러로 빌드하려면, 먼저 `--disable_clang` 스위치를 통해 `clang`을 비활성화 시켜야 하고, 필요하다면 `CC`와 `CXX` 환경 변수도 설정합니다.

예를 들어 GCC 툴체인을 사용하여 빌드한다면 다음과 같습니다:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### 환경 변수

Apart from `CC` and `CXX`, you can also set the following environment variables to customise the build configuration:

* `CPPFLAGS`
* `CPPFLAGS_host`
* `CFLAGS`
* `CFLAGS_host`
* `CXXFLAGS`
* `CXXFLAGS_host`
* `AR`
* `AR_host`
* `CC`
* `CC_host`
* `CXX`
* `CXX_host`
* `LDFLAGS`

이 환경 변수는 `bootstrap.py` 스크립트를 실행할 때 설정되어야 하며, `build.py` 스크립트에선 작동하지 않습니다.