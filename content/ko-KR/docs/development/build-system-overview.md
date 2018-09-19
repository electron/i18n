# 빌드 시스템 개요

Electron uses [GN](https://gn.googlesource.com/gn) for project generation and [ninja](https://ninja-build.org/) for building. Project configurations can be found in the `.gn` and `.gni` files.

## GN Files

The following `gn` files contain the main rules for building Electron:

* `BUILD.gn` defines how Electron itself is built.
* `brightray/BUILD.gn` defines how `brightray` is built and includes the default configurations for linking with Chromium.
* `build/args/{debug,release,all}.gn` contain the default build arguments for building Electron.

## 구성요소 빌드

Chromium은 꽤나 큰 프로젝트입니다. 이러한 이유로 인해 최종 링킹 작업은 상당한 시간이 소요될 수 있습니다. 보통 이런 문제는 개발을 어렵게 만듭니다. 우리는 이 문제를 해결하기 위해 Chromium의 "component build" 방식을 도입했습니다. 이는 각각의 컴포넌트를 각각 따로 분리하여 공유 라이브러리로 빌드 합니다. 하지만 이 빌드 방식을 사용하면 링킹 작업은 매우 빨라지지만 실행 파일 크기가 커지고 성능이 저하됩니다.

Electron inherits this build option from Chromium. In `Debug` builds, the binary will be linked to a shared library version of Chromium's components to achieve fast linking time; for `Release` builds, the binary will be linked to the static library versions, so we can have the best possible binary size and performance.

## 테스트

**NB** *this section is out of date and contains information that is no longer relevant to the GN-built electron.*

변경사항이 프로젝트 코딩 스타일을 준수하는지 테스트하려면 다음 명령을 사용하세요:

```sh
$ npm run lint
```

기능을 테스트하려면 다음 명령을 사용하세요:

```sh
$ npm test
```

Electron 소스 코드를 변경할 때 마다, 테스트 전에 빌드를 다시 실행해야 합니다:

```sh
$ npm run build && npm test
```

모카의 [전용 테스트](https://mochajs.org/#exclusive-tests) 기능을 사용해서 특정 테스트 또는 블록을 분리하여 테스트 세트 실행을 빠르게 할 수 있습니다. Append `.only` to any `describe` or `it` function call:

```js
describe.only('some feature', function () {
  // ... 이 블록에서는 테스트만 실행될 것 입니다.
})
```

또는, 주어진 정규 표현 패턴에 일치하는 경우에만 테스트를 실행하기 위해 모카의 `grep` 을 사용할 수 있습니다:

```sh
$ npm test -- --grep child_process
```

테스트시 (`runas<0> 같은) 네이티브 모듈을 포함하면 디버그 빌드에서 실행할 수 없습니다. (자세한 것은 <a href="https://github.com/electron/electron/issues/2558">#2558</a> 를 보세요). 그러나 릴리즈 빌드에서는 작동할 것 입니다.</p>

<p>릴리즈 빌드로 테스트를 실행하려면 다음 명령을 사용하세요:</p>

<pre><code class="sh">$ npm test -- -R
`</pre>