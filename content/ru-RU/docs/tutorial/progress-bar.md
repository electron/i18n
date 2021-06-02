# Индикатор прогресса в меню задач (Windows, macOS, Unity)

## Обзор

Progress bar позволяет окну предоставлять информацию о прогрессе пользователю без необходимости переключения на само окно.

В Windows вы можете использовать кнопку панели задач для отображения progress bar.

![Windows Progress Bar][1]

На macOS progress bar будет отображаться как часть dock icon.

![macOS Progress Bar][2]

На Linux графический интерфейс Unity также имеет аналогичную функцию, которая вам указать планку прогресса в пусковой установке.

![Linux Progress Bar][3]

> ПРИМЕЧАНИЕ: на Windows, каждое окно может иметь свой собственный планку прогресса, в то время как на macOS и Linux (Unity) может быть только одна планка прогресса для приложения.

----

Все три случая охватываются одним и тем же API - [`setProgressBar()`][setprogressbar] методом, доступным на экземпляре `BrowserWindow`. Чтобы указать свой прогресс, позвоните в этот метод с номером между `0` и `1`. Например, если у вас есть давняя задача, которая в настоящее время 63% к завершению, вы назвали бы ее как `setProgressBar(0.63)`.

Setting the parameter to negative values (e.g. `-1`) will remove the progress bar. Setting it to a value greater than `1` will indicate an indeterminate progress bar in Windows or clamp to 100% in other operating systems. An indeterminate progress bar remains active but does not show an actual percentage, and is used for situations when you do not know how long an operation will take to complete.

Просмотрите [документацию по API для большего количества опций и режимов][setprogressbar].

## Пример

In this example, we add a progress bar to the main window that increments over time using Node.js timers.

```javascript fiddle='docs/fiddles/features/progress-bar'
const { app, BrowserWindow } = require('electron')

let progressInterval

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600
  })

  win.loadFile('index.html')

  const INCREMENT = 0.03
  const INTERVAL_DELAY = 100 // ms

  let c = 0
  progressInterval = setInterval(() => {
    // update progress bar to next value
    // values between 0 and 1 will show progress, >1 will show indeterminate or stick at 100%
    win.setProgressBar(c)

    // increment or reset progress bar
    if (c < 2) c += INCREMENT
    else c = 0
  }, INTERVAL_DELAY)
}

app.whenReady().then(createWindow)

// before the app is terminated, clear both timers
app.on('before-quit', () => {
  clearInterval(progressInterval)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
```

After launching the Electron application, the dock (macOS) or taskbar (Windows, Unity) should show a progress bar that starts at zero and progresses through 100% to completion. It should then show indeterminate (Windows) or pin to 100% (other operating systems) briefly and then loop.

![macOS dock progress bar](../images/dock-progress-bar.png)

Для macOS планка прогресса также будет указана для вашей приложения использовании [Mission Control](https://support.apple.com/en-us/HT204100):

![Mission Control Progress Bar](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
