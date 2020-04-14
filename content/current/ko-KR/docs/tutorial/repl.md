# REPL

Read-Eval-Print-Loop (REPL)은 단일 사용자 입력 (i.e. 단일 표현식)을 평가하고 결과를 사용자에게 반환하는 단순한 대화식 컴퓨터 프로그래밍 환경입니다.

`repl` 모듈은 다음을 사용하여 액세스 할 수 있는 REPL 구현을 제공합니다.

* `electron` 또는 `electron-prebuilt`가 로컬 프로젝트 종속성으로 설치되어 있다고 가정하는 경우:
    
    ```sh
    ./node_modules/.bin/electron --interactive
    ```

* `electron` 또는 `electron-prebuilt`가 전역으로 설치되어 있다고 가정하는 경우:
    
    ```sh
    electron --interactive
    ```

오직 main process에 대해서만 REPL을 생성합니다. Dev Tools의 Console 탭을 사용하여 renderer processes에 대한 REPL을 얻을 수 있습니다.

**주의:** `electron --interactive`은 Windows에서는 사용할 수 없습니다.

상세한 정보는 [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html)에서 찾을 수 있습니다.