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

Параметр задает отрицательные значения (напр. `-1`) удалит прогресс бар, а значения больше, чем `1` (e.. `2`) переключит индикатор прогресса на режим неопределённого (только для Windows--- в противном случае он будет хватать на 100%). В этом режиме планка прогресса остается активной, но не показывает процент. Используйте этот режим для ситуаций, когда вы не знаете сколько времени займет операция.

Просмотрите [документацию по API для большего количества опций и режимов][setprogressbar].

## Пример

Начиная с рабочего приложения из [Quick Start Guide](quick-start.md), добавьте следующие строки в файл `main.js`:

```javascript fiddle='docs/fiddles/features/progress-bar'
const { BrowserWindow } = require('electron')
const win = new BrowserWindow()

win.setProgressBar(0.5)
```

After launching the Electron application, you should see the bar in the dock (macOS) or taskbar (Windows, Unity), indicating the progress percentage you just defined.

![macOS dock progress bar](../images/dock-progress-bar.png)

Для macOS планка прогресса также будет указана для вашей приложения использовании [Mission Control](https://support.apple.com/en-us/HT204100):

![Mission Control Progress Bar](../images/mission-control-progress-bar.png)

[1]: https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png
[2]: ../images/macos-progress-bar.png
[3]: ../images/linux-progress-bar.png
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
[setprogressbar]: ../api/browser-window.md#winsetprogressbarprogress-options
