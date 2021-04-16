# Пользовательские действия рабочего стола Linux

## Обзор

On many Linux environments, you can add custom entries to the system launcher by modifying the `.desktop` file. Для документации Canonical's Unity с</a>

м. For details on a more generic implementation, see the [freedesktop.org Specification][spec].</p> 

![чудовищный][2]



> NOTE: The screenshot above is an example of launcher shortcuts in Audacious audio player

To create a shortcut, you need to provide `Name` and `Exec` properties for the entry you want to add to the shortcut menu. Unity will execute the command defined in the `Exec` field after the user clicked the shortcut menu item. An example of the `.desktop` file may look as follows:



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


The preferred way for Unity to instruct your application on what to do is using parameters. You can find them in your application in the global variable `process.argv`.

[2]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
