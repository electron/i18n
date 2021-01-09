# Закадровий Рендеринг

Offscreen rendering lets you obtain the content of a browser window in a bitmap, so it can be rendered anywhere, for example on a texture in a 3D scene. візуалізація offscreen в Electron використовує подібний підхід, ніж проект [Chromium вбудований фреймворк](https://bitbucket.org/chromiumembedded/cef) проекту.

Two modes of rendering can be used and only the dirty area is passed in the `'paint'` event to be more efficient. Рендеринг можна зупинити, продовжити і встановити частоту кадрів заново. Зазначена частота кадрів є верхньою межею коли на веб-сторінці нічого не відбувається, кадри не генеруються. The maximum frame rate is 240, because above that there is no benefit, only performance loss.

**Примітка:** Вікно в автономному режимі завжди створюється як [Безграничне вікно](../api/frameless-window.md).

## Режими візуалізації

### GPU прискорено

Відображення прискореного графічного процесора означає, що для композиції GPU використовується відеокарта. Через у кадрі повинен бути скопійований з відеопроцесора, який потребує більшої продуктивності, Таким чином, цей режим досить повільніший за інший. Перевага цього режиму полягає в тому, що підтримуються анімації WebGL і 3D CSS.

### Програмний пристрій

Цей режим використовує пристрій програмного забезпечення для рендерингу процесора, отже генерація кадрів відбувається набагато швидше, Таким чином, цей режим є кращим через GPU один.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`][disablehardwareacceleration] API.

## Використання

``` javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.whenReady(). hen(() => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  виграє. oadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, зображення. etBitmap())
  })
  win.webContents.setFrameRate(30)
})
```

[disablehardwareacceleration]: ../api/app.md#appdisablehardwareacceleration
