# 최근 문서 (Windows & macOS)

## 개요

Windows 및 macOS는 각각 JumpList 또는 Dock 메뉴를 통해 애플리케이션에서 열었던 최근 문서 목록에 대한 액세스를 제공합니다.

__JumpList:__

![최근파일의  JumpList][1]

__dock menu 애플리케이션:__

![macOS 독 메뉴][2]

To add a file to recent documents, you need to use the [app.addRecentDocument][addrecentdocument] API.

## Example

### Add an item to recent documents

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following lines to the `main.js` file:

```javascript
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

After launching the Electron application, right click the application icon. You should see the item you just added. In this guide, the item is a Markdown file located in the root of the project:

![Recent document](../images/recent-documents.png)

### Clear the list of recent documents

To clear the list of recent documents, you need to use [app.clearRecentDocuments][clearrecentdocuments] API in the `main.js` file:

```javascript
onst { app } = require('electron')

app.clearRecentDocuments()
```

## Additional information

### Windows에서 주의할 점

To use this feature on Windows, your application has to be registered as a handler of the file type of the document, otherwise the file won't appear in JumpList even after you have added it. 애플리케이션 등록에 관련된 API의 모든 내용은 [Application Registration][app-registration]에서 찾아볼 수 있습니다.

유저가 JumpList에서 파일을 클릭할 경우 클릭된 파일의 경로가 커맨드 라인 인수로 추가되어 새로운 인스턴스의 애플리케이션이 실행됩니다.

### macOS에서 주의할 점

#### Add the Recent Documents list to the application menu

You can add menu items to access and clear recent documents by adding the following code snippet to your menu template:

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recentdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![macOS Recent Documents menu item][6]

파일이 최근 문서 메뉴에서 요청될 경우 `app` 모듈의 `open-file` 이벤트가 호출됩니다.

[1]: https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png
[2]: https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png
[6]: https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png
[addrecentdocument]: ../api/app.md#appaddrecentdocumentpath-macos-windows
[clearrecentdocuments]: ../api/app.md#appclearrecentdocuments-macos-windows
[app-registration]: https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx
