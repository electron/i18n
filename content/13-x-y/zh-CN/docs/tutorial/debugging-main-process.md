# 调试主进程

Electron 浏览器窗口中的 DevTools 只能调试 在该窗口中执行的 JavaScript (即 web 页面) 。 为了提供一个可以调试主进程的方法，Electron 提供了 `--inspect` 和 `--inspect-brk` 开关。

## 命令行开关

使用如下的命令行开关来调试 Electron 的主进程：

### `--inspect=[port]`

Electron 将在指定的 `端口`上监听V8 检查员协议消息 外部调试器需要连接到这个端口。 默认 `端口` 是 `5858`。

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

和`--inspector` 一样，但是会在JavaScript 脚本的第一行暂停运行。

## 外部调试器

你需要使用一个支持 V8 调试协议的调试器

- 通过访问 `chrome://inspect` 来连接 Chrome 并在那里选择需要检查的Electron 应用程序。
- [使用 VsCode调试](debugging-vscode.md)
