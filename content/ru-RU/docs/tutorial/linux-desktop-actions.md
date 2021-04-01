# Пользовательские действия рабочего стола Linux

## Обзор

Во многих средах Linux можно добавлять пользовательские записи в систему запуска , изменяя `.desktop` файл. Для документации Canonical's Unity с</a> [м. Для получения подробной информации о более реализации, с][unity-launcher]

freedesktop.org м.</p> 

![чудовищный][2]



> ПРИМЕЧАНИЕ: Скриншот выше является примером пусковой ярлыки в Audacious аудио плеер

Чтобы создать ярлык, необходимо предоставить `Name` и `Exec` свойства для , которую вы хотите добавить в меню ярлыка. Unity выполнит команду, в поле `Exec` после того, как пользователь нажал на элемент меню ярлыка. Пример файла `.desktop` может выглядеть следующим образом:



```plaintext
Actions=PlayPause;Next;Previous

[Desktop Action PlayPause]
Name=Play-Pause
Exec=audacious -t
OnlyShowIn=Unity;

[Desktop Action Next]
Name=Next
Exec=audacious -f
OnlyShowIn=Unity;

[Desktop Action Previous]
Name=Previous
Exec=audacious -r
OnlyShowIn=Unity;
```


Предпочтительным способом для Unity инструктировать приложение о том, что делать, является использование параметров. Вы можете найти их в приложении в глобальной переменной `process.argv`.

[2]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
