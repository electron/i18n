# ShortcutDetails Object

* `target` String - 이 단축 키에서 시작할 대상.
* `cwd` String (optional) - 작업 디렉토리. 디폴트 값은 empty입니다.
* `args` String (optional) - 이 단축 키에서 시작 할 때 `target` 으로 적용되는 인자입니다. 디폴트 값은 empty입니다.
* `description` String (optional) - The description of the shortcut. Default is empty.
* `icon` String (optional) - The path to the icon, can be a DLL or EXE. `icon` and `iconIndex` have to be set together. Default is empty, which uses the target's icon.
* `iconIndex` Number (optional) - The resource ID of icon when `icon` is a DLL or EXE. Default is 0.
* `appUserModelId` String (optional) - The Application User Model ID. Default is empty.