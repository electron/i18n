# JumpListItem 개체

* `type` String (optional) - 다음 중 하나: 
  * `task` - 테스크는 특정 인수가 포함된 어플리케이션을 시작합니다.
  * `separator` - 표준 `테스크` 범주의 항목을 분리하는데 사용할 수 있습니다.
  * `file` -파일 링크는 jump LIst를 만든 앱을 사용하여 파일을 열고, 이를 위해서는 응용 프로그램이 파일 형식의 핸들러로 등록되어 있어야 합니다.(디폴트 핸들러가 아닐 경우)
* `path` String (optional) - 열려 있는 파일의 경로는 `file` `type`인 경우에만 설정하여야 합니다.
* `program` String (optional) - 실행할 프로그래의 경로는 대게 `process.execPath`(프로그램 실행 경로)를 지정하여 현재 프로그램을 엽니다. `type`가 `task`하는 경우에만 설정해야 합니다.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - The absolute path to an icon to be displayed in a Jump List, which can be an arbitrary resource file that contains an icon (e.g. `.ico`, `.exe`, `.dll`). You can usually specify `process.execPath` to show the program icon.
* `iconIndex` Number (optional) - The index of the icon in the resource file. If a resource file contains multiple icons this value can be used to specify the zero-based index of the icon that should be displayed for this task. If a resource file contains only one icon, this property should be set to zero.