# Custom Linux Desktop Launcher Actions

Во многих средах Linux вы можете добавлять пользовательские записи в свою программу запуска путем изменения файла `.desktop </ 0>. For Canonical's Unity documentation,
see <a href="https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher">Adding Shortcuts to a Launcher</a>. Более подробную информацию об обобщенной реализации, см <a href="https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html"> freedesktop.org Спецификация </ 0>.</p>

<p><strong>Launcher shortcuts of Audacious:</strong></p>

<p><img src="https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png" alt="audacious" /></p>

<p>Ярлыки добавляются путем предоставления свойств <code>Name` и `Exec` для каждой записи в меню ярлыков. Unity will execute the `Exec` field once clicked by the user. The format is as follows:

```text
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

Unity's preferred way of telling your application what to do is to use parameters. You can find these in your app in the global variable `process.argv`.