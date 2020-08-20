# ShortcutDetails 객체

* `target` String -  이 단축 키에서 시작할 대상.
* `cwd` String (optional) - 작업 디렉토리. 기본 값은 빈값.
* `args` String (optional) - 이 단축키에서 시작할 때 `target`으로 적용되는 인자. 기본 값은 빈값.
* `description` String (optional) - 단축키에 대한 설명. 기본 값은 빈값.
* `icon` String (optional) - 아이콘의 경로, DLL이나 EXE일 수 있음. `icon`과 `iconIndex`는 함께 설정해야합니다. 기본 값은 빈값. 이 값은 target의 아이콘으로 사용됩니다.
* `iconIndex` Number (optional) - `icon`이 DLL이나 EXE일 경우 아이콘의 리소스ID. 기본값은 0.
* `appUserModelId` String (optional) - 응용프로그램 사용자 모델 ID. 기본 값은 빈값.
