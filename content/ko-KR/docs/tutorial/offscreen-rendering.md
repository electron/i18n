# 오프 스크린 렌더링

오프 스크린 렌더링을 사용하면 브라우저 창의 내용을 비트 맵으로 가져올 수 있으며, 3D scene 의 텍스처와 같이 어디에서나 렌더링 할 수 있습니다. Electron의 오프 스크린 렌더링은 [Chromium 임베디드 프레임워크](https://bitbucket.org/chromiumembedded/cef) 프로젝트와 비슷한 방식을 사용합니다.

렌더링의 두 가지 모드를 사용할 수 있으며 더 효율적이도록 `'paint'` 이벤트에 더티 영역만 전달됩니다. 렌더링을 중지하고 계속하며 프레임률을 설정할 수 있습니다. 지정된 프레임 레이트는 상한값이며, 웹 페이지에서 아무 일도 일어나지 않으면 프레임이 생성되지 않습니다. 최대 프레임 레이트는 60입니다. 그 이유는 그 이상의 경우에는 장점이 없고 성능만 손실되기 때문입니다.

**Note: ** 오프 스크린 윈도우는 항상 [프레임이없는 윈도우 ](../api/frameless-window.md)로 만들어집니다

## 렌더링 모드

### GPU accelerated

GPU 가속 렌더링은 GPU가 합성에 사용됨을 의미합니다. GPU에서 프레임을 복사해야하므로 더 많은 성능이 필요합니다. 따라서이 모드는 다른것 보다 약간 느립니다. 이 모드의 이점은 WebGL 및 3D CSS 애니메이션이 지원된다는 것입니다.

### Software output device

이 모드는 CPU에서 렌더링하기 위해 소프트웨어 출력 장치를 사용하므로 프레임 생성 속도가 훨씬 빠르기 때문에 GPU 가속 모드보다이 모드가 더 좋습니다.

이 모드를 사용하려면 [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API를 호출하여 GPU 가속을 사용 중지해야합니다.

## Usage

```javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.once('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  win.loadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, image.getBitmap())
  })
  win.webContents.setFrameRate(30)
})
```