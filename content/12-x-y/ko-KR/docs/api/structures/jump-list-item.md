# JumpListItem 개체

* `type` String (optional) - One of the following:
  * `task` - 테스크는 특정 인수가 포함된 어플리케이션을 시작합니다.
  * `separator` - 표준 `테스크` 범주의 항목을 분리하는데 사용할 수 있습니다.
  * `file` -파일 링크는 jump LIst를 만든 앱을 사용하여 파일을 열고, 이를 위해서는 응용 프로그램이 파일 형식의 핸들러로 등록되어 있어야 합니다.(디폴트 핸들러가 아닐 경우)
* `path` String (optional) - 열려 있는 파일의 경로는 `file` `type`인 경우에만 설정하여야 합니다.
* `program` String (optional) - 실행할 프로그래의 경로는 대게 `process.execPath`(프로그램 실행 경로)를 지정하여 현재 프로그램을 엽니다. `type`가 `task`하는 경우에만 설정해야 합니다.
* `args` String (optional) - The command line arguments when `program` is executed. Should only be set if `type` is `task`.
* `title` String (optional) - The text to be displayed for the item in the Jump List. Should only be set if `type` is `task`.
* `description` String (optional) - Description of the task (displayed in a tooltip). Should only be set if `type` is `task`.
* `iconPath` String (optional) - 아이콘을 포함하는 임의의 리소스 파일로 표시될 수 있는 Jump List에 아이콘의 절대 경로를 표시합니다. (e.g. `.ico`, `.exe`, `.dll`). 대게 `process.execPath`를 지정하여 프로그램 아이콘을 표시할 수 있습니다.
* `iconIndex` Number (optional) - 리소스 파일의 아이콘 인덱스 리소스 파일에 여러 아이콘이 포함되어 있는 경우 이 값을 사용하여 이 테스크에 대해 표시되어야 하는 아이콘의 제로-베이스 인덱스를 지정 할 수 있습니다. 리소스 파일에 하나의 아이콘만 포함된 경우 이 속성을 0으로 설정해야 합니다.
* `workingDirectory` String (optional) - The working directory. Default is empty.
