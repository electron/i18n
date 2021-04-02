# 自定义 Linux 桌面动作i

## 概览

在很多的 Linux 环境中，你可以通过修改 `.desktop` 文件来在它的启动器中添加自定义条目。 有关规范的统一文档，请参阅 [向启动器][unity-launcher]添加快捷方式。 有关更通用的 实施的详细信息，请参阅 [freedesktop.org 规范][spec]。

![audacious][3]

> 注：上面的截图是 Audacious 音频播放器中启动器快捷方式的一个例子

若要创建快捷方式，你需要为添加到快捷菜单的条目提供 `Name` 和 `Exec` 属性。 Unity 将在用户点击快捷菜单项后执行 `Exec` 字段定义的命令。 `.desktop` 文件的示例如下：

```plaintext
Actions=PlayPause;Next;Previous

[Desktop Action PlayPause]
Name=Play-Pause
Exec=audacious -t


[Desktop Action Next]
Name=Next
Exec=audacious -f


[Desktop Action Previous]
Name=Previous
Exec=audacious -r
```

Unity 推荐应用程序操作的首选方式是使用参数。 您可以在应用的全局变量 `process.argv` 中找到它们。

[3]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png

[unity-launcher]: https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher
[spec]: https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html
