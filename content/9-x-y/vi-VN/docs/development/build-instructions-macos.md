# Hướng dẫn build (macOS)

Follow the guidelines below for building Electron on macOS.

## Prerequisites

* macOS >= 10.11.6
* [Xcode](https://developer.apple.com/technologies/tools/) >= 9.0.0
* [node.js](https://nodejs.org) (external)
* Python 2.7 with support for TLS 1.2

## Python

Please also ensure that your system and Python version support at least TLS 1.2. This depends on both your version of macOS and Python. For a quick test, run:

```sh
$ npx @electron/Check-Python-TLS
```

If the script returns that your configuration is using an outdated security protocol, you can either update macOS to High Sierra or install a new version of Python 2.7.x. To upgrade Python, use [Homebrew](https://brew.sh/):

```sh
$ brew install python@2 && brew link python@2 --force
```

Nếu bạn đang dùng Python được cung cấp bởi Homebrew, bạn cũng cần phải cài thêm các Python module sau:

* [pyobjc](https://pypi.org/project/pyobjc/#description)

Bạn có thể dùng `pip` để cài:

```sh
$ pip install pyobjc
```

## macOS SDK

Nếu bạn đang phát triển Electron và không định phân phối lại bản xây dựng của bạn thì bạn có thể bỏ qua phần này.

Các bản xây dựng chính thức của Electron được xây dựng bởi [Xcode 9.4.1](http://adcdownload.apple.com/Developer_Tools/Xcode_9.4.1/Xcode_9.4.1.xip), và macOS 10.13 SDK.  Xây dựng với phiên bản SDK mới hơn cũng hoạt động, nhưng phiên bản phát hành hiện tại đang dùng SDK phiên bản 10.13.

## Building Electron

Xem [Build Instructions: GN](build-instructions-gn.md).
