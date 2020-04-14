# macOS BrowserWindows에 대한 파일 표현

macOS는 창에서 대표 파일을 설정할 수 있습니다. 타이틀바에서 파일 아이콘이 있고, 사용자가 Command-Click 또는 Control-Click 키를 누를 경우 파일 경로 팝업이 보여집니다.

또한 창의 상태도 지정할 수 있습니다. 다시 말해 로드된 문서의 수정 여부를 제목의 파일 아이콘에 표시할 수 있습니다.

__대표 파일 팝업 메뉴:__

![대표 파일](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

대표 파일 관련 API는 [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) 과 [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos)를 사용할 수 있습니다:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
