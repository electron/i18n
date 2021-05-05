# 交互式解释器 (REPL)

[读取(Read)-运算(Eval)-输出(Print)-循环(Loop)](https://en.wikipedia.org/wiki/Read%E2%80%93eval%E2%80%93print_loop) (REPL) 是一个简单的, 交互式的计算机编程环境，它采用单个用户输入(即单个表达式)，运算并返回结果给用户。

## 主进程

Electron 通过 `--interactive` 命令行参数将 [Node.js `repl` 模块](https://nodejs.org/dist/latest/docs/api/repl.html)暴露出去。 假设你已将 `electron` 安装为本地项目依赖，则应能够使用下面的命令访问 REPL：

  ```sh
  ./node_modules/.bin/electron --interactive
  ```

**注意：** `electron --interactive` 在 Windows 上不可用(详情请参阅[electron/electron#5776](https://github.com/electron/electron/pull/5776))。

## 渲染器进程

你可以使用开发者工具Console选项卡获取任意渲染器进程的REPL。 要了解更多，请阅读 [Chrome 文档](https://developer.chrome.com/docs/devtools/console/)。
