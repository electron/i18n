# 发布

本文档描述了发布 Electron 版本的过程。

## 决定从哪个版本发布

- **如果发布beta版本，**请从`master`运行以下脚本。
- **If releasing a stable version,** run the scripts below from `1-7-x` or `1-6-x`, depending on which version you are releasing for.

## 找出需要哪个版本更改

Run `npm run prepare-release -- --notesOnly` to view auto generated release notes. The notes generated should help you determine if this is a major, minor, patch, or beta version change. Read the [Version Change Rules](../tutorial/electron-versioning.md#semver) for more information.

## 运行 prepare-release 脚本

The prepare release script will do the following: 1. Check if a release is already in process and if so it will halt. 2. 创建一个发布分支。 3. Bump the version number in several files. See [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) for an example. 4. Create a draft release on GitHub with auto-generated release notes. 5. 推送release分支 6. 调用API以运行release构建

Once you have determined which type of version change is needed, run the `prepare-release` script with arguments according to your need: - `[major|minor|patch|beta]` to increment one of the version numbers, or - `--stable` to indicate this is a stable version

例如：

### Major 版本更改

```sh
npm run prepare-release -- major
```

### Minor 版本更改

```sh
npm run prepare-release -- minor
```

### Patch 版本更改

```sh
npm run prepare-release -- patch
```

### Beta 版本更改

```sh
npm run prepare-release -- beta
```

### 促进 beta 稳定

```sh
npm run prepare-release -- --stable
```

## 等待构建 :hourglass_flowing_sand:

`prepare-release` 脚本将通过 API 调用触发生成。要监视生成进度, 请参阅以下页面:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) 对于 Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) 对于 OS X
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) 对于 Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) 对于 Windows

## 编译发布说明

编写发行说明是在生成运行时保持忙碌的好方法。 有关以前的技术, 请参阅 [ 发布页 ](https://github.com/electron/electron/releases) 上的现有版本。

Tips: - Each listed item should reference a PR on electron/electron, not an issue, nor a PR from another repo like libcc. - No need to use link markup when referencing PRs. Strings like `#123` will automatically be converted to links on github.com. - To see the version of Chromium, V8, and Node in every version of Electron, visit [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Patch 发布

对于 ` 修补程序 ` 版本, 请使用以下格式:

```sh
## Bug 修复

* 修复跨平台问题. #123

### Linux

* 修复 Linux 问题. #123

### macOS

* 修复 macOS 问题. #123

### Windows

* 修复 Windows 问题. #1234
```

### Minor 发布

对于 ` 次要 ` 版本, 如 ` 1.8.0 `, 请使用以下格式:

```sh
## 升级

- 升级 Node 从 `oldVersion` 到 `newVersion`. #123

## API 变更

* 变更内容. #123

### Linux

* 变更 Linux 内容. #123

### macOS

* 变更 macOS 内容. #123

### Windows

* 变更 Windows 内容. #123
```

### Major 发布

```sh
## 升级

- 升级 Chromium 从 `oldVersion` 到 `newVersion`. #123
- 升级 Node 从 `oldVersion` 到 `newVersion`. #123

## 破坏性 API 变更

* 变更内容. #123

### Linux

* 变更 Linux 内容. #123

### macOS

* 变更 macOS 内容. #123

### Windows

* 变更 Windows 内容. #123

## 其它变更

- 其它变更内容. #123
```

### Beta 发布

使用与上述建议相同的格式, 但在日志的开头添加以下注释:

```sh
**注意:** 这是一个测试版本，很可能会有一些不稳定 和/或 复原。

请为您在其中找到的任何错误提出新问题。

此版本发布到 [npm] (https://www.npmjs.com/package/electron) 下的 ' beta ' 标签, 并可以通过 'npm install electron@beta' 安装。
```

## 编辑发布草稿

1. 访问 [发行页面](https://github.com/electron/electron/releases) 然后你将看到一个新的带有发行说明的草稿版本.
2. 编辑版本并添加发行说明.
3. 如果要发布稳定版本, 请取消选中 `prerelease` 复选框。让它检查测试版。
4. 点击 'Save draft'. **不要点 'Publish release'!**
5. 等待所有生成通过, 然后再继续。
6. You can run `npm run release -- --validateRelease` to verify that all of the required files have been created for the release.

## 发布版本

Once the release builds have finished, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. 在Github上发布release 7. Delete the `release` branch.

## 发布到 npm

一旦发布成功，运行 `npm run publish-to-npm` 发布到 npm。

## 手动修复发行版的缺失二进制文件

在发布版本受损的情况下，则可能需要重新上传已发布版本的二进制文件。

第一步是转到[Releases](https://github.com/electron/electron/releases)页面，并使用 `SHASUMS256.txt`校验文件和删除损坏的二进制文件。

然后手动为每个平台创建分发并上传它们：

```sh
# 检出要重新上传的版本。
git checkout vTHE.RELEASE.VERSION

# 发布构建，指定一个目标体系结构。
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# 明确允许覆盖已发布的版本.
./script/upload.py --overwrite
```

重新上传所有发行版之后，再次发布以上载校验和文件：

```sh
npm run release
```