# Custom Linux Desktop Launcher Actions

Во многих средах Linux вы можете добавлять пользовательские записи в свою программу запуска путем изменения файла `.desktop </ 0>. For Canonical's Unity documentation,
see <a href="https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher">Adding Shortcuts to a Launcher</a>. Для подробной информации про обобщенную реализацию смотрите: <a href="https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html">Спецификация freedesktop.org</a>.</p>

<p spaces-before="0"><strong x-id="2">Launcher shortcuts of Audacious:</strong></p>

<p spaces-before="0"><img src="https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png" alt="audacious" /></p>

<p spaces-before="0">Ярлыки добавляются путем предоставления свойств <code>Name` и `Exec` для каждой записи в меню ярлыков. Unity will execute the `Exec` field once clicked by the user. Они выглядят следующим образом:

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

Unity's preferred way of telling your application what to do is to use parameters. Вы можете найти их в вашем приложении в глобальной переменной `process.argv`.
