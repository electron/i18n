# 自定义 Linux 桌面启动器行为

在很多的 Linux 环境中，你可以通过修改文件 `.desktop` 来在它的启动器中添加自定义条目。 关于Canonical 的 Unity 启动器文档, 参考 [Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher). 可以通过 [freedesktop.org Specification](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html)网站，找到更详细的参考信息。

**Audacious 的启动器快捷方式:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

一般情况下，在快捷键menu中为每一个条目添加`Name` 和`Exec`属性就可以将其设置为快捷键。 Unity will execute the `Exec` field once clicked by the user. The format is as follows:

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