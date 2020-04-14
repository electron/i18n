## 使用 XCode 调试

### 为调试源代码生成Xcode项目（无法从Xcode构建代码）
运行 `gn gen` 并带上 --ide=xcode 参数
```sh
$ gn gen out/Testing --ide=xcode
```
这会生成 electron.ninja.xcworkspace。 您需要打开这个工作区来设置断点和检查。

See `gn help gen` for more information on generating IDE projects with GN.

### 调试与断点

Launch Electron app after build. You can now open the xcode workspace created above and attach to the Electron process through the Debug > Attach To Process > Electron debug menu. [Note: If you want to debug the renderer process, you need to attach to the Electron Helper as well.]

You can now set breakpoints in any of the indexed files. However, you will not be able to set breakpoints directly in the Chromium source. To set break points in the Chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. This will set the breakpoint for all functions with that name, from all the classes if there are more than one. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.
