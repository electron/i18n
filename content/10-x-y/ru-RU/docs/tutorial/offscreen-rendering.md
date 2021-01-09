# Закадровый рендеринг

Закадровый рендеринг позволяет получить содержимое окна браузера в виде Bitmap изображения, которое может быть отображено где угодно. (Например, может быть использовано в виде текстуры в 3D сцене). Закадровый рендеринг в Electron использует подход, схожий с [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef).

Два режима рендеринга могут быть использованы и только грязная область передается в `'paint'` событие более эффективно. рендеринг может быть остановлен, продолжиться и частота кадров может быть установлена. Указанная частота кадров является предельным значением, когда на веб-странице ничего не происходит, фреймы не создаются. The maximum frame rate is 240, because above that there is no benefit, only performance loss.

**Примечание:** Окно с выключенным экраном всегда создается как [Окно без кадров](../api/frameless-window.md).

## Режимы рендеринга

### Аппаратное ускорение

Ускоренное отображение GPU означает, что GPU используется для композиции GPU. Because of that the frame has to be copied from the GPU which requires more performance, thus this mode is quite a bit slower than the other one. Преимущество этого режима заключается в том, что поддерживается анимация WebGL и 3D CSS.

### Устройство вывода

Этот режим использует устройство вывода для рендеринга в процессоре, поэтому кадр поколения намного быстрее, поэтому этот режим предпочтительнее GPU ускоренного режима.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Использование

``` javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

позволит выиграть

app.whenReady(). hen(() => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  win. oadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, image. etBitmap())
  })
  win.webContents.setFrameRate(30)
})
```

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
