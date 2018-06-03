# Recent Documents (Windows & macOS)

Windows 및 macOS는 각각 JumpList 또는 Dock 메뉴를 통해 애플리케이션에서 열었던 최근 문서 목록에 대한 액세스를 제공합니다.

**JumpList:**

![최근파일의  JumpList](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**dock menu 애플리케이션:**

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

파일을 최근 문서에 추가하려면 [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API를 사용할 수 있습니다:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

그리고 [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API로 최근 문서 리스트를 비울 수 있습니다:

```javascript
onst { app } = require('electron')
app.clearRecentDocuments()
```

## Windows에서 주의할 점

이 기능을 Windows에서 사용할 땐 운영체제 시스템에 애플리케이션에서 사용하는 파일 확장자가 등록되어 있어야 합니다. 그렇지 않은 경우 파일을 JumpList에 추가해도 추가되지 않습니다. 애플리케이션 등록에 관련된 API의 모든 내용은 [Application Registration](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx)에서 찾아볼 수 있습니다.

유저가 JumpList에서 파일을 클릭할 경우 클릭된 파일의 경로가 커맨드 라인 인수로 추가되어 새로운 인스턴스의 애플리케이션이 실행됩니다.

## macOS에서 주의할 점

파일이 최근 문서 메뉴에서 요청될 경우 `app` 모듈의 `open-file` 이벤트가 호출됩니다.