# 빌드 설명서 (Linux)

이 가이드는 Linux 운영체제에서 Electron을 빌드하는 방법을 설명합니다.

## 빌드전 요구 사양

* 최소한 25GB 이상의 디스크 공간과 8GB 램이 필요합니다.
* Python 2.7.x. 몇몇 CentOS 6.x와 같은 배포판들은 아직도 Python 2.6.x 버전을 사용합니다. 그래서 먼저 `python -V`를 통해 버전을 확인할 필요가 있습니다.

  시스템과 Python 버전이 TLS 1.2를 지원해야 합니다. 테스트해보려면 아래 스크립트를 실행하세요.

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
                       gperf bison python-dbusmock openjdk-8-jre
```

RHEL / CentOS를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock openjdk-8-jre
```

Fedora를 사용하고 있다면 다음과 같이 라이브러리를 설치해야 합니다:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock openjdk-8-jre
```

Other distributions may offer similar packages for installation via package managers such as pacman. Or one can compile from source code.

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

Prebuilt `clang` will try to link to `libtinfo.so.5`. Depending on the host architecture, symlink to appropriate `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## 고급 주제

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### 다운로드된 `clang` 바이너리 대신 시스템의 `clang` 사용하기

기본적으로 Electron은 Chromium 프로젝트에서 제공하는 미리 빌드된 [`clang`](https://clang.llvm.org/get_started.html) 바이너리를 통해 빌드됩니다. 몇 가지 이유로 시스템에 설치된 `clang`으로 빌드하고 싶으시다면, GN 인수에서 `clang_base_path` 인수를 명시할 수 있습니다.

예를 들어 `clang`을 `/user/local/bin/clang`에 설치했다면 다음과 같습니다:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### `clang` 대신 다른 컴파일러 사용하기

`clang` 이외 컴파일러를 사용한 Electron 빌드는 지원하지 않습니다.
