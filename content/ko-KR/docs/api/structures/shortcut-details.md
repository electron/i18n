# ShortcutDetails Object

* `target` String - 이 단축 키에서 시작할 대상.
* `cwd` String (optional) - 작업 디렉토리. 디폴트 값은 empty입니다.
* `args` String (optional) - 이 단축 키에서 시작 할 때 `target` 으로 적용되는 인자입니다. 디폴트 값은 empty입니다.
* `description` String (optional) - 바로가기에 대한 설명입니다. 디폴트 값은 empty입니다.
* `icon` String (optional) - 아이콘의 경로는 DLL 또는 EXE 일 수 있습니다. `icon`과 `iconIndex`를 같이 설정 해야 합니다. 디폴트 값은 empty이므로 target`s 아이콘으로 사용합니다.
* `iconIndex` Number (optional) - `icon` DLL이거나 EXE일 경우 아이콘의 리소스 ID입니다. 디폴트값은 0입니다.
* `appUserModelId` String (optional) - The Application User Model ID. Default is empty.