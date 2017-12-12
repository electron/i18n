# 调试主进程

Electron 浏览器窗口中的 DevTools 只能调试 在该窗口中执行的 JavaScript (即 web 页面) 。 为了提供一个可以调试主进程的方法，Electron 提供了 `--inspect` 和 `--inspect-brk` 开关。

## 命令行开关

使用如下的命令行开关来调试 Electron 的主进程：

### `--inspect=[port]`

当这个开关用于 Electron 时，它将会监听 V8 引擎中有关 `port` 的调试器协议信息。 默认的` port` 是 `5858`

```shell
electron --inspect=5858 your/app
```

### `--inspect-brk=[port]`

和`--inspector` 一样，但是会在JavaScript 脚本的第一行暂停运行。

## 外部调试器

你需要使用一个支持 V8 调试协议的调试器

- 通过访问 `chrome://inspect` 来连接 Chrome 并在那里选择需要检查的Electron 应用程序。
- [使用 VSCode 进行主进程调试](debugging-main-process-vscode.md)