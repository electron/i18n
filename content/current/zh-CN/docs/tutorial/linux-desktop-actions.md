# 自定义 Linux 桌面启动器行为

## 概览

在很多的 Linux 环境中，你可以通过修改 `.desktop` 文件来在它的启动器中添加自定义条目。 关于 Canonical 的 Unity 启动器文档， 参考 [Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher)。 详细的参考信息请见 [freedesktop.org Specification](https://specifications.freedesktop.org/desktop-entry-spec/1.1/ar01s11.html)。

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

> 注意：上面的截图是 Audacious 音频播放器中启动器快捷方式的一个例子

To create a shortcut, you need to provide `Name` and `Exec` properties for the entry you want to add to the shortcut menu. Unity 将在用户点击快捷菜单项后执行 `Exec` 字段定义的命令。 `.desktop` 文件的示例如下：

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

The preferred way for Unity to instruct your application on what to do is using parameters. 您可以在应用的全局变量 `process.argv` 中找到它们。
