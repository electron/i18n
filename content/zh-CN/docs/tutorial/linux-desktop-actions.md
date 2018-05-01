# Custom Linux Desktop Launcher Actions

在很多的 Linux 环境中，你可以通过修改文件 `.desktop` 来在它的启动器中添加自定义条目。 For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). For details on a more generic implementation, see the [freedesktop.org Specification](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html).

**Audacious 的启动器快捷方式:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

Generally speaking, shortcuts are added by providing a `Name` and `Exec` property for each entry in the shortcuts menu. Unity will execute the `Exec` field once clicked by the user. The format is as follows:

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