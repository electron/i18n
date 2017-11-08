# 빌드 설명서 (Linux)

이 가이드는 Linux 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구사양

* 최소한 25GB 이상의 디스크 공간과 8GB 램이 필요합니다.
* Python 2.7.x. 몇몇 CentOS 6.x와 같은 배포판들은 아직도 Python 2.6.x 버전을 사용합니다. 그래서 먼저 `python -V`를 통해 버전을 확인할 필요가 있습니다.
* Node.js에서 Node를 설치하는 방법은 여러 가지가 있습니다. [nodejs.org](http://nodejs.org) 에서 소스 코드를 받아 빌드하는 방법입니다. 이렇게 하면 Node를 일반 유저로 홈 폴더에 설치할 수 있습니다. 다른 방법으로는 [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories)에서 소스 파일을 받아와 설치할 수 있습니다.
* [clang](https://clang.llvm.org/get_started.html) 3.4 또는 최신 버전
* GTK+ 와 libnotify의 개발용 헤더

Ubuntu를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```bash
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk2.0-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

RHEL / CentOS를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```bash
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Fedora를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```bash
$ sudo dnf install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

다른 배포판의 경우 pacman 같은 패키지 매니저를 통해 패키지를 설치 할 수 있습니다. 패키지의 이름은 대부분 위 예시와 비슷할 것입니다. 또는 소스 코드를 내려받아 직접 빌드하는 방법도 있습니다.

## 코드 가져오기

```bash
$ git clone https://github.com/electron/electron
```

## 부트스트랩

부트스트랩 스크립트는 필수적인 빌드 의존성 라이브러리들을 모두 다운로드하고 프로젝트 파일을 생성합니다. 스크립트가 정상적으로 작동하기 위해선 Python 2.7.x 버전이 필요합니다. 다운로드 작업이 상당히 많은 시간을 소요할 것입니다. 참고로 Electron은 `ninja`를 빌드 툴체인으로 사용하므로 `Makefile`은 생성되지 않습니다.

```bash
$ cd electron
$ ./script/bootstrap.py --verbose
```

### 크로스 컴파일

`arm` 아키텍쳐로 빌드 하려면 다음 의존성 라이브러리를 설치해야 합니다:

```bash
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

그리고 `arm` 또는 `ia32`를 크로스 컴파일로 지정하여 `bootstrap.py` 스크립트의 `--target_arch` 파라미터로 넣을 수 있다.

```bash
$ ./script/bootstrap.py -v --target_arch=arm
```

## 빌드하기

`Release`와 `Debug` 두 타겟 모두 빌드 합니다:

```bash
$ ./script/build.py
```

이 스크립트는 `out/R` 디렉터리에 크기가 매우 큰 Electron 실행 파일을 배치합니다. 파일 크기는 1.3GB를 초과합니다. 이러한 문제가 발생하는 이유는 Release 타겟 바이너리가 디버그 심볼을 포함하기 때문입니다. To reduce the file size, run the `create-dist.py` script:

```bash
$ ./script/create-dist.py
```

This will put a working distribution with much smaller file sizes in the `dist` directory. After running the `create-dist.py` script, you may want to remove the 1.3+ gigabyte binary which is still in `out/R`.

You can also build the `Debug` target only:

```bash
$ ./script/build.py -c D
```

After building is done, you can find the `electron` debug binary under `out/D`.

## Cleaning

To clean the build files:

```bash
$ npm run clean
```

To clean only `out` and `dist` directories:

```bash
$ npm run clean-build
```

**Note:** Both clean commands require running `bootstrap` again before building.

## Troubleshooting

### Error While Loading Shared Libraries: libtinfo.so.5

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tests

See [Build System Overview: Tests](build-system-overview.md#tests)

## Advanced topics

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Building `libchromiumcontent` locally

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps: 1. Install [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install) 2. Install [additional build dependencies](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies) 3. Fetch the git submodules:

    bash
      $ git submodule update --init --recursive 4. Copy the .gclient config file

    bash
      $ cp vendor/libchromiumcontent/.gclient . 5. Pass the 

`--build_libchromiumcontent` switch to `bootstrap.py` script:

    bash
      $ ./script/bootstrap.py -v --build_libchromiumcontent

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```bash
$ ./script/build.py -c R
```

### Using system `clang` instead of downloaded `clang` binaries

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent --clang_dir /usr/local
$ ./script/build.py -c R
```

### Using compilers other than `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```bash
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_libchromiumcontent --disable_clang
$ ./script/build.py -c R
```

### Environment variables

Apart from `CC` and `CXX`, you can also set following environment variables to custom the building configurations:

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

The environment variables have to be set when executing the `bootstrap.py` script, it won't work in the `build.py` script.