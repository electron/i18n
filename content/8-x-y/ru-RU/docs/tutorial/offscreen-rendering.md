# Закадровый рендеринг

Закадровый рендеринг позволяет получить содержимое окна браузера в виде Bitmap изображения, которое может быть отображено где угодно. (Например, может быть использовано в виде текстуры в 3D сцене). Закадровый рендеринг в Electron использует подход, схожий с [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef).

Два режима рендеринга могут быть использованы и только грязная область передается в `'paint'` событие более эффективно. рендеринг может быть остановлен, продолжиться и частота кадров может быть установлена. Указанная частота кадров является предельным значением, когда на веб-странице ничего не происходит, фреймы не создаются. Максимальная скорость работы составляет 60, так как выше нет выгоды, только потеря производительности.

**Примечание:** Окно с выключенным экраном всегда создается как [Окно без кадров](../api/frameless-window.md).

## Режими рендеринга

### Аппаратное ускорение

Ускоренное отображение GPU означает, что GPU используется для композиции GPU. Because of that the frame has to be copied from the GPU which requires more performance, thus this mode is quite a bit slower than the other one. The benefit of this mode that WebGL and 3D CSS animations are supported.

### Устройство вывода

Этот режим использует устройство вывода для рендеринга в процессоре, поэтому кадр поколения намного быстрее, поэтому этот режим предпочтительнее GPU ускоренного режима.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Использование

``` javascript
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

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
