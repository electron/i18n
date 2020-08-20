## Debugging with XCode

### Генерировать xcode проект для отладки исходников (невозможно собрать код из xcode)
Run `gn gen` with the --ide=xcode argument.
```sh
$ gn gen out/Debug --ide=xcode
```
Это будет генерировать electron.ninja.xcworkspace. Вам придётся открыть этот проект для установки точек останова и проверки.

Смотрите `gn help gen` для получения дополнительной информации о генерации проектов IDE с помощью GN.

### Отладка и точки останова

Запустить Electron приложение после сборки. You can now open the xcode workspace created above and attach to the Electron process through the Debug > Attach To Process > Electron debug menu. [Примечание: если вы хотите отладить процесс рендеринга, вам также нужно присоединиться к Electron Helper.]

Теперь вы можете установить точки останова в любом из индексированных файлов. Тем не менее, вы не сможете установить точки останова непосредственно в исходниках Chromium. To set break points in the Chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. Это установит точку останова для всех функций с таким именем, из всех классов, если их несколько. Вы также можете сделать этот шаг установки точек останова до прикрепления отладчика, однако, фактические точки останова для символической точки останова могут не появиться до тех пор, пока отладчик не будет прикреплен к приложению.
