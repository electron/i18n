# 빌드 명령 (Linux)

이 가이드는 Linux 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구 사양

* 최소한 25GB 이상의 디스크 공간과 8GB 램이 필요합니다.
* Python 2.7.x. 몇몇 CentOS 6.x와 같은 배포판들은 아직도 Python 2.6.x 버전을 사용합니다. 그래서 먼저 `python -V`를 통해 버전을 확인할 필요가 있습니다.
    
    Please also ensure that your system and Python version support at least TLS 1.2. For a quick test, run the following script:
    
    ```sh
    $ npm run check-tls
    ```
    
    If the script returns that your configuration is using an outdated security protocol, use your system's package manager to update Python to the latest version in the 2.7.x branch. 또는 https://www.python.org/downloads/ 에 방문하여 자세한 방법을 확인하십시오.

* Node.js에서 Node를 설치하는 방법은 여러 가지가 있습니다. [nodejs.org](https://nodejs.org) 에서 소스 코드를 받아 빌드하는 방법입니다. 이렇게 하면 Node를 일반 유저로 홈 폴더에 설치할 수 있습니다. 다른 방법으로는 [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories)에서 소스 파일을 받아와 설치할 수 있습니다.

* [clang](https://clang.llvm.org/get_started.html) 3.4 또는 최신 버전
* GTK+ 와 libnotify의 개발용 헤더

Ubuntu를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

RHEL / CentOS를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Fedora를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

다른 배포판의 경우 pacman 같은 패키지 매니저를 통해 패키지를 설치 할 수 있습니다. 패키지의 이름은 대부분 위 예시와 비슷할 것입니다. 또는 소스 코드를 내려받아 직접 빌드하는 방법도 있습니다.

### 크로스 컴파일

`arm` 아키텍쳐로 빌드 하려면 다음 의존성 라이브러리를 설치해야 합니다:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

`arm64`에 대해서도 비슷하게, 다음을 설치하십시오:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `target_cpu` parameter to `gn gen`:

```sh
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## 빌드하기

See [Build Instructions: GN](build-instructions-gn.md)

## 문제 해결

### Libtinfo.so.5 동적 링크 라이브러리를 로드하는 도중 에러가 발생할 경우

미리 빌드된 `clang`은 `libtinfo.so.5`로 링크를 시도합니다. 따라서 플랫폼에 따라 적당한 `libncurses` symlink를 추가하세요:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 고급 주제

기본적인 빌드 구성은 가장 주력인 Linux 배포판에 초점이 맞춰져있으며, 특정 배포판이나 기기에 빌드할 계획이라면 다음 정보들이 도움이 될 것입니다.

### 다운로드된 `clang` 바이너리 대신 시스템의 `clang` 사용하기

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### `clang` 대신 다른 컴파일러 사용하기

Building Electron with compilers other than `clang` is not supported.