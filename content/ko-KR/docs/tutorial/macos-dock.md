# MacOS Dock

Electron에는 macOS Dock에 앱의 아이콘을 구성하는 API가 있습니다. 커스텀 독 메뉴를 만들기 위해 macOS 전용 API가 존재합니다, Electron 또한 앱의 독 아이콘을 사용하여 최근 문서([recent documents](./recent-documents.md)) 및 애플리케이션 진행([application progress](./progress-bar.md)) 과 같은 cross-platform 기능을 구현합니다.

커스텀 독은 일반적으로 사용자가 전체 애플리케이션 윈도우를 열지 않으려는 작업에 바로 가기를 추가하는 데 사용됩니다.

**Terminal.app의 dock menu:**

![Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png)

커스텀 dock menu를 설정하려면 `app.dock.setMenu` API를 사용하면 됩니다. macOS에서만 사용 가능합니다:

```javascript
const { app, Menu } = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {
    label: 'New Window',
    click () { console.log('New Window') }
  }, {
    label: 'New Window with Settings',
    submenu: [
      { label: 'Basic' },
      { label: 'Pro' }
    ]
  },
  { label: 'New Command...' }
])

app.dock.setMenu(dockMenu)
```