# Custom Linux Desktop Launcher Actions

## 概览

On many Linux environments, you can add custom entries to the system launcher by modifying the `.desktop` file. For Canonical's Unity documentation, see [Adding Shortcuts to a Launcher][unity-launcher]. For details on a more generic implementation, see the [freedesktop.org Specification][spec].

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
