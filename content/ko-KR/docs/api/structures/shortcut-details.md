# ShortcutDetails 객체

* `target` String - 이 단축 키에서 시작할 대상.
* `cwd` String (선택적) - 작업 디렉토리. 기본값은 비워두기입니다.
* `args` String (선택적) - 이 단축 키에서 시작할 때 `target`으로 적용되는 인자입니다. 기본값은 비워두기입니다.
* `description` String (optional) - 바로가기에 대한 설명입니다. 기본값은 비워두기입니다.
* `icon` String (optional) - 아이콘의 경로는 DLL 또는 EXE 일 수 있습니다. `icon`과 `iconIndex`를 같이 설정 해야 합니다. 기본값은 비워두기이므로 대상의 아이콘으로 사용합니다.
* `iconIndex` Number (선택적) - `icon` DLL이거나 EXE일 경우 아이콘의 리소스 ID입니다. 기본값은 0 입니다.
* `appUserModelId` String (optional) - Application 사용자 모델 ID 입니다. 디폴트 값은 0입니다.