## 使用 XCode 调试

### 使用生产版本的libchromiumcontent来构建测试版Electron

你可以跟随[build instructions for macOS](build-instructions-osx.md)来构建一个测试版electron。 默认情况下，启动进程会下载生产版本的libchromiumcontent，所以你不能对chromium的源代码进行单步调试。

### 使用测试版本的libchromiumcontent来构建测试版Electron

如果你相对libchromiumcontent进行除错并且单步调试，你需要对启动代码添加`--build_debug_libcc`参数。

```sh
$ cd electron
$ ./script/bootstrap.py -v --build_debug_libcc
```

This can take a significant amount of time depending on build machine as it has to build all of the libchromium source.

Once, the lib is built, create a symlink to the built directory under download

`ln -s vendor/libchromiumcontent/dist/main/shared_library vendor/download/libchromiumcontent/shared_library`

Electron debug builds will use this shared library to link against.

```sh
$ ./script/build.py -c D --libcc
```

This will build debug electron with debug version of libchromiumcontent.

### Generate xcode project for debugging sources (cannot build code from xcode)

Run the update script with the --xcode argument.

```sh
$ ./script/update.py --xcode
```

This will generate the electron.ninjs.xcworkspace. You will have to open this workspace to set breakpoints and inspect.

### 调试与断点

Launch electron app after build. You can now open the xcode workspace created above and attach to the electron process through the Debug > Attach To Process > Electron debug menu. [Note: If you want to debug the renderer process, you need to attach to the Electron Helper as well.]

You can now set breakpoints in any of the indexed files. However, you will not be able to set breakpoints directly in the chromium source. To set break points in the chromium source, you can choose Debug > Breakpoints > Create Symbolic Breakpoint and set any function name as the symbol. This will set the breakpoint for all functions with that name, from all the classes if there are more than one. You can also do this step of setting break points prior to attaching the debugger, however, actual breakpoints for symbolic breakpoint functions may not show up until the debugger is attached to the app.