# 构建指南

请遵循以下指南来构建Electron。

## 平台要求

各个平台所对应的构建要求如下：

* [macOS](build-instructions-macos.md#prerequisites)
* [Linux](build-instructions-linux.md#prerequisites)
* [Windows](build-instructions-windows.md#prerequisites)

## 构建工具

[电子的构建工具](https://github.com/electron/build-tools) 自动化大部分设置，用于从具有不同配置的源中编译电子并生成目标。 如果您希望手动设置环境，则说明如下。

## 前置知识

此外，你还需要安装[`depot_tools`][depot-tools]，这是一个用于获取Chromium，及其相关依赖工具。

另外，如果使用Windows系统, 你需要设置环境变量`DEPOT_TOOLS_WIN_TOOLCHAIN=0`。 依次打开 `Control Panel` → `System and
Security` → `System` → `Advanced system settings` ，然后添加系统变量 `DEPOT_TOOLS_WIN_TOOLCHAIN` ，并设置默认值为 `0`.  这将促使`depot_tools` 使用本地已安装的Visual Studio(默认状态下，`depot_tools`将会下载一个只有谷歌内部员工有权限使用的内部版本)。

### 设置 git 缓存

如果您想 checkout 多份 Electron 源码 (例如多个并行目录 checkout 到不同的分支)， 推荐使用 git 缓存来加速后续对 `gclient`的调用。 为此，设置 `GIT_CACHE_PATH` 环境变量：

```sh
$出口GIT_CACHE_PATH="${HOME}/.git_cache"
$mkdir-p"${GIT_CACHE_PATH}"
#这将使用约16G。
```

## 获得源码

```sh
$ mkdir electron && cd electron
$ gclient config --name "src/electron" --unmanaged https://github.com/electron/electron
$ gclient sync --with_branch_heads --with_tags
# 这将需要一段时间，喝杯咖啡休息一下。
```

> 除了使用 `https://github.com/electron/electron`， 你也可以使用你自己的 fork  (形如 `https://github.com/<username>/electron`)。

### 推送/拉取的注意事项

如果您将来打算从 `electron` 官方地址进行 `git pull` 或 `git push`，那么您需要更新相应文件夹的源 URL。

```sh
$cd src/电子
$git 远程删除原点
$git 远程添加原点 https://github.com/electron/electron
$git 结帐主
$git 分支 - 设置上游到源/主
$cd -
```

:memo: `gclient` 会检查 `src/electron` 目录下的 `DEPS` 文件，从中获取依赖信息 (就像 Chromium 或 Node.js 那样)。 运行 `gclient sync -f` 确保所有用来构建 Electron 的依赖都符合该文件的描述。

因此，为了拉取，您将运行以下命令：

```sh
$cd src/电子
$git拉
$胶质同步-f
```

## 构建

```sh
$cd src
$ 出口CHROMIUM_BUILDTOOLS_PATH='pwd'/构建图
$gn 基因输出/测试 - args="进口（\"//电子/生成/args/测试.gn\"） $GN_EXTRA_ARGS"
```

若在 Windows 上 (没有可选参数)：

```sh
$cd src
$ 设置CHROMIUM_BUILDTOOLS_PATH=%cd%[ 构建图
$gn gen 出 / 测试 - args= "进口 （\"/ /电子 / 生成 / args / 测试.gn\"）
```

这将在`src/`下的`out/Testing`内生成一个有测试生成配置的文件夹 您可以用另一个名称 替换 `Testing` ，但它应该是 `out` 的子目录。 此外，你不应该再次运行 `gn gen` -如果你想改变 建立参数，你可以运行 `gn args out/Testing` 提出一个编辑器。

要查看可用的构建配置选项列表，请 `gn args 运行
/测试 - 列表`。

**用于生成 电子的测试生成配置：**

```sh
$gn gen 出/测试 -- -- "进口（\"/电子/生成/args/测试.gn\） $GN_EXTRA_ARGS"
```

**用于生成版本（又名"非组件"或"静态"），构建 电子的配置：**

```sh
$gn 基因出/释放 - args="导入（\"/电子/生成/args/释放.gn\） $GN_EXTRA_ARGS"
```

**要建立， `ninja` 与 `electron` 的目标运行：** ·奥塔·贝恩：这也需要一段时间，并可能加热你的腿。

对于测试配置：

```sh
$ 忍者-C出/测试电子
```

对于发布配置：

```sh
$ 忍者-C出/释放电子
```

这将建立所有以前"不铬"（即 `chromium` 及其依赖关系的 `content/` 目录，包括。 网络基特和V8）， ，所以它将需要一段时间。

已构建的可执行将在 `./out/Testing`下：

```sh
$ ./出/测试/电子.app/内容/MacOS/电子
# 或，在视窗
$./出/测试/电子.exe
# 或，在Linux
$./出/测试/电子
```

### 打包

在 linux 上，首先剥离调试和符号信息：

```sh
电子/脚本/条状 binaries.py-d 出/释放
```

将电子生成打包为可分发的拉链文件：

```sh
忍者 -C 出/释放电子：electron_dist_zip
```

### 交叉编译

要为与构建平台不一样的平台进行编译， 设置 `target_cpu` 并 `target_os` GN 参数。 例如，要从 x64 主机中编译 x86 目标，在 `gn args`中指定 `target_cpu = "x86"` 。

```sh
$gn 基因出 / 测试 - x86 - 阿格斯]...target_cpu="x86"
```

并非所有源和目标 CPU/OS 的组合都由铬支持。

| Host  | 目标    | 状态   |
| ----- | ----- | ---- |
| 视窗x64 | 视窗臂64 | 实验功能 |
| 视窗x64 | 视窗x86 | 自动测试 |
| 利努x64 | 利努x86 | 自动测试 |

如果您测试其他组合并找到它们工作，请更新此文档:)

有关 [`target_os`][target_os values] 和 [`target_cpu`][target_cpu values]的允许值，请参阅 GN 参考。

#### 手臂上的窗户（实验）

要交叉编译手臂上的 Windows， [按照 Chromium 的指南](https://chromium.googlesource.com/chromium/src/+/refs/heads/master/docs/windows_build_instructions.md#Visual-Studio) 获取必要的依赖项、SDK 和库，然后在运行 `gclient sync`之前在环境中 `ELECTRON_BUILDING_WOA=1` 构建。

```bat
设置ELECTRON_BUILDING_WOA=1
胶度同步-f-with_branch_heads-with_tags
```

或者（如果使用电源壳）：

```powershell
$env：ELECTRON_BUILDING_WOA=1
胶度同步 - f - with_branch_heads - with_tags
```

接下来，用 `target_cpu="arm64"`跑 `gn gen` 如上。

## 测试

要运行测试，您首先需要根据作为构建过程的一部分构建的相同版本的节点.js构建测试模块 。 要 生成模块的生成标题以进行对接，可在 `src/` 目录下运行以下 。

```sh
$ 忍者 -C 出/测试third_party/electron_node：头
```

你现在可以 [运行测试](testing.md#unit-tests)。

可以通过增加其它标记来调试程序，例如：

```sh
$npm 运行测试 - -
  - 启用记录 - g "浏览器窗口模块"
```

## 在多台机器之间共享 git 缓存

通过将 gclient git 缓存导出 SMB 在 linux 上共享，可以与其他机器共享 gclient git 缓存，但只有一个过程/机器可以在 时间使用缓存。 由 git-缓存脚本创建的锁将尝试防止这种情况，但它可能 在网络中不能完美工作。

在 Windows 上，SMBv2 具有目录缓存，该缓存会导致 git 缓存脚本出现问题，因此有必要通过设置注册表密钥将其禁用

```sh
HKEY_LOCAL_MACHINE\System\CurrentControlSet\Services\Lanmanworkstation\Parameters\DirectoryCacheLifetime
```

到0。 更多信息： https://stackoverflow.com/a/9935126

这可以在电源壳中快速设置（作为管理员运行）：

```powershell
新项目-产品-路径"HKLM：\系统]当前控制集|服务\兰曼工作站\参数"-名称目录缓存-时间-价值0-属性类型DWORD-Force
```

## 故障排查

### 鳄鱼同步抱怨重新基础

如果 `gclient sync` 被中断，git 树可能会处于不良状态，从而在未来运行 `gclient sync` 时出现神秘消息：

```plaintext
2> 冲突，同时重新平衡此分支。
2> 修复冲突，并再次运行闪烁。
2> 见男子 git 重新基地的细节。
```

如果 `src/electron`中没有 git 冲突或重新基础，则可能需要中止 `src`中的 `git am` ：

```sh
$光盘。/
$git am-中止
$CD电子
$胶质同步-f
```

### 我被要求为 chromium-internal.googlesource.com 提供用户名/密码

如果您在 Windows 上运行 `gclient sync` 时看到 `Username for 'https://chrome-internal.googlesource.com':` 提示，可能是因为 `DEPOT_TOOLS_WIN_TOOLCHAIN` 环境变量未设置为 0。 打开 `Control Panel` → `System and Security` → `System` → `Advanced system settings` ，并添加具有价值 `0`的系统变量 `DEPOT_TOOLS_WIN_TOOLCHAIN` 。  这将促使`depot_tools` 使用本地已安装的Visual Studio(默认状态下，`depot_tools`将会下载一个只有谷歌内部员工有权限使用的内部版本)。

[depot-tools]: https://commondatastorage.googleapis.com/chrome-infra-docs/flat/depot_tools/docs/html/depot_tools_tutorial.html#_setting_up

[target_os values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values
[target_cpu values]: https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values
