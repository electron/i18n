# 빌드 시스템 개요

Electron은 프로젝트 생성을 위해 [gyp](https://gyp.gsrc.io/)를 사용하며 [ninja](https://ninja-build.org/)를 이용하여 빌드합니다. 프로젝트 설정은 `.gyp` 와 `.gypi` 파일에서 볼 수 있습니다.

## Gyp 파일

Electron을 빌드 할 때 `gyp` 파일들은 다음과 같은 규칙을 따릅니다:

* `electron.gyp`는 Electron의 빌드 과정 자체를 정의합니다.
* `common.gypi`는 Node가 Chromium과 함께 빌드될 수 있도록 조정한 빌드 설정입니다.
* `brightray/brightray.gyp`는 `brightray`의 빌드 과정을 정의하고 Chromium 링킹에 대한 기본적인 설정을 포함합니다.
* `brightray/brightray.gypi`는 빌드에 대한 일반적인 설정이 포함되어 있습니다.

## 구성요소 빌드

Chromium은 꽤나 큰 프로젝트입니다. 이러한 이유로 인해 최종 링킹 작업은 상당한 시간이 소요될 수 있습니다. 보통 이런 문제는 개발을 어렵게 만듭니다. 우리는 이 문제를 해결하기 위해 Chromium의 "component build" 방식을 도입했습니다. 이는 각각의 컴포넌트를 각각 따로 분리하여 공유 라이브러리로 빌드 합니다. 하지만 이 빌드 방식을 사용하면 링킹 작업은 매우 빨라지지만 실행 파일 크기가 커지고 성능이 저하됩니다.

In Electron we took a very similar approach: for `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## Minimal Bootstrapping

All of Chromium's prebuilt binaries (`libchromiumcontent`) are downloaded when running the bootstrap script. By default both static libraries and shared libraries will be downloaded and the final size should be between 800MB and 2GB depending on the platform.

By default, `libchromiumcontent` is downloaded from Amazon Web Services. If the `LIBCHROMIUMCONTENT_MIRROR` environment variable is set, the bootstrap script will download from it. [`libchromiumcontent-qiniu-mirror`](https://github.com/hokein/libchromiumcontent-qiniu-mirror) is a mirror for `libchromiumcontent`. If you have trouble in accessing AWS, you can switch the download address to it via `export LIBCHROMIUMCONTENT_MIRROR=http://7xk3d2.dl1.z0.glb.clouddn.com/`

If you only want to build Electron quickly for testing or development, you can download just the shared library versions by passing the `--dev` parameter:

```bash
$ ./script/bootstrap.py --dev
$ ./script/build.py -c D
```

## Two-Phase Project Generation

Electron links with different sets of libraries in `Release` and `Debug` builds. `gyp`, however, doesn't support configuring different link settings for different configurations.

To work around this Electron uses a `gyp` variable `libchromiumcontent_component` to control which link settings to use and only generates one target when running `gyp`.

## Target Names

Unlike most projects that use `Release` and `Debug` as target names, Electron uses `R` and `D` instead. This is because `gyp` randomly crashes if there is only one `Release` or `Debug` build configuration defined, and Electron only has to generate one target at a time as stated above.

This only affects developers, if you are just building Electron for rebranding you are not affected.

## 테스트

Test your changes conform to the project coding style using:

```bash
$ npm run lint
```

Test functionality using:

```bash
$ npm test
```

Whenever you make changes to Electron source code, you'll need to re-run the build before the tests:

```bash
$ npm run build && npm test
```

You can make the test suite run faster by isolating the specific test or block you're currently working on using Mocha's [exclusive tests](https://mochajs.org/#exclusive-tests) feature. Just append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... only tests in this block will be run
})
```

Alternatively, you can use mocha's `grep` option to only run tests matching the given regular expression pattern:

```sh
$ npm test -- --grep child_process
```

Tests that include native modules (e.g. `runas`) can't be executed with the debug build (see [#2558](https://github.com/electron/electron/issues/2558) for details), but they will work with the release build.

To run the tests with the release build use:

```bash
$ npm test -- -R
```