# 테스트

우리는 Electron 코드의 테스트 커버리지를 높게 유지하려고 합니다. 우리는 모든 pull request에 대해서, 이미 작성된 테스트를 통과하는 것 뿐만 아니라, 변경된 코드에 대한 새로운 테스트와 새로운 시나리오를 함께 포함하도록 권장합니다. Electron의 코드 흐름과 사용법에 대해서 최대한 테스트하는 것은 우리의 앱을 배포할 때 버그를 최대한 없애기 위해서입니다.

이 저장소는 JavaScript와 C++ 모두에 대해서 lint, 단위 테스트, 그리고 통합 테스트 규칙을 가지고 있습니다. Electron의 코딩 스타일에 대해 더 알아보려면 [coding-style](coding-style.md) 문서를 읽어주십시오.

## Linting

To ensure that your JavaScript is in compliance with the Electron coding style, run `npm run lint-js`, which will run `standard` against both Electron itself as well as the unit tests. If you are using an editor with a plugin/addon system, you might want to use one of the many [StandardJS addons](https://standardjs.com/#are-there-text-editor-plugins) to be informed of coding style violations before you ever commit them.

To run `standard` with parameters, run `npm run lint-js --` followed by arguments you want passed to `standard`.

To ensure that your C++ is in compliance with the Electron coding style, run `npm run lint-cpp`, which runs a `cpplint` script. We recommend that you use `clang-format` and prepared [a short tutorial](clang-format.md).

There is not a lot of Python in this repository, but it too is governed by coding style rules. `npm run lint-py` will check all Python, using `pylint` to do so.

## Unit Tests

If you are not using [build-tools](https://github.com/electron/build-tools), ensure that that name you have configured for your local build of Electron is one of `Testing`, `Release`, `Default`, `Debug`, or you have set `process.env.ELECTRON_OUT_DIR`. Without these set, Electron will fail to perform some pre-testing steps.

To run all unit tests, run `npm run test`. The unit tests are an Electron app (surprise!) that can be found in the `spec` folder. Note that it has its own `package.json` and that its dependencies are therefore not defined in the top-level `package.json`.

To run only specific tests matching a pattern, run `npm run test --
-g=PATTERN`, replacing the `PATTERN` with a regex that matches the tests you would like to run. As an example: If you want to run only IPC tests, you would run `npm run test -- -g ipc`.

### Testing on Windows 10 devices

#### 단위 테스트를 실행하기 위한 추가 단계:

1. Visual Studio 2019가 설치되어 있어야 합니다.
2. 구성을 위해 노드 헤더를 컴파일해야합니다.
   ```powershell
   ninja -C out\Testing third_party\electron_node:headers
   ```
3. electron.lib는 node.lib로 복사해야 합니다.
   ```powershell
   cd out\Testing
   mkdir gen\node_headers\Release
   copy electron.lib gen\node_headers\Release\node.lib
   ```

#### 누락된 글꼴

[Some Windows 10 devices](https://docs.microsoft.com/en-us/typography/fonts/windows_10_font_list) do not ship with the Meiryo font installed, which may cause a font fallback test to fail. To install Meiryo:
1. Windows 키를 누르고 _옵션 기능 관리_를 검색하십시오.
2. _기능 추가_를 클릭하십시오.
3. _일본어 보조 글꼴_을 선택하고 _설치_를 클릭하십시오.

#### 픽셀 측정

Some tests which rely on precise pixel measurements may not work correctly on devices with Hi-DPI screen settings due to floating point precision errors. To run these tests correctly, make sure the device is set to 100% scaling.

To configure display scaling:
1. Windows 키를 누르고 _디스플레이 설정_을 검색하십시오.
2. _스케일 및 레이아웃_에서 장치가 100%로 설정되어 있는지 확인하십시오.
