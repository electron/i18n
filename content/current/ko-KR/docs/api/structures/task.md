# Task Object

* `program` String - 실행할 프로그램의 경로는 일반적으로 현재 프로그램을 여는  `process.execPath`를 지정해야 합니다.
* `arguments` String - 명령줄을 `program` 이 실행될 때 정의됩니다.
* `title` String - JumpList에 표시할 string형
* `description` String - 태스크에 대한 설명
* `iconPath` String - 아이콘이 포함된 임의의 리소스 파일 일 수 있는  JumpList에 표시되는 아이콘의 절대 경로입니다. 일반적으로 프로그램 아이콘을 표시하는 `process.execPath` 를 지정 할 수 있습니다.
* `iconIndex` Number - 아이콘 파일의 아이콘 인덱스. 아이콘 파일이 두개 이상의 아이콘으로 구성된 경우 이 값을 설정하여 아이콘을 식별합니다. 아이콘 파일이 하나의 아이콘으로 구성된 경우 이 값은 0입니다.
* `workingDirectory` String (optional) - The working directory. Default is empty.
