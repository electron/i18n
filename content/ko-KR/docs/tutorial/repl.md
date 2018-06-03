# REPL

Read-Eval-Print-Loop (REPL)은 단일 사용자 입력 (i.e. 단일 표현식)을 평가하고 결과를 사용자에게 반환하는 단순한 대화식 컴퓨터 프로그래밍 환경입니다.

The `repl` module provides a REPL implementation that can be accessed using:

* `electron` 또는 `electron-prebuilt`가 로컬 프로젝트 종속성으로 설치되어 있다고 가정하는 경우:
    
    ```sh
    ./node_modules/.bin/electron --interactive
    ```

* `electron` 또는 `electron-prebuilt`가 전역으로 설치되어 있다고 가정하는 경우:
    
    ```sh
    electron --interactive
    ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**Note:** `electron --interactive` is not available on Windows.

More information can be found in the [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html).