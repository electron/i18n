# 发布

本文档描述了发布 Electron 版本的过程。

## 决定从哪个版本发布

- **如果发布beta版本，**请从`master`运行以下脚本。
- **If releasing a stable version,** run the scripts below from the branch you're stabilizing.

## 找出需要哪个版本更改

Run `npm run prepare-release -- --notesOnly` to view auto generated release notes. The notes generated should help you determine if this is a major, minor, patch, or beta version change. Read the [Version Change Rules](../tutorial/electron-versioning.md#semver) for more information.

**NB:** If releasing from a branch, e.g. 1-8-x, check out the branch with `git checkout 1-8-x` rather than `git checkout -b remotes/origin/1-8-x`. The scripts need `git rev-parse --abbrev-ref HEAD` to return a short name, e.g. no `remotes/origin/`

## Set your tokens and environment variables

You'll need Electron S3 credentials in order to create and upload an Electron release. Contact a team member for more information.

There are a handful of `*_TOKEN` environment variables needed by the release scripts. Once you've generated these per-user tokens, you may want to keep them in a local file that you can `source` when starting a release. * `ELECTRON_GITHUB_TOKEN`: Create as described at https://github.com/settings/tokens/new, giving the token repo access scope. * `APPVEYOR_TOKEN`: Create a token from https://windows-ci.electronjs.org/api-token If you don't have an account, ask a team member to add you. * `CIRCLE_TOKEN`: Create a token from "Personal API Tokens" at https://circleci.com/account/api

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

Tip: You can test the new version number before running `prepare-release` with a dry run of the `bump-version` script with the same major/minor/patch/beta arguments, e.g.:

```sh
$ ./script/bump-version.py --bump minor --dry-run
```

## 等待构建 :hourglass_flowing_sand:

`prepare-release` 脚本将通过 API 调用触发生成。要监视生成进度, 请参阅以下页面:

- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for OS X and Linux
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

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some
instability and/or regressions.

请为您在其中找到的任何错误提出新问题。

This release is published to [npm](https://www.npmjs.com/package/electron)
under the `beta` tag and can be installed via `npm install electron@beta`.
```

## 编辑发布草稿

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. 编辑版本并添加发行说明.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. 点击 'Save draft'. **不要点 'Publish release'!**
5. 等待所有生成通过, 然后再继续。
6. In the `release` branch, verify that the release's files have been created:

```sh
$ git rev-parse --abbrev-ref HEAD
release
$ npm run release -- --validateRelease
```

## Merge temporary branch (pre-2-0-x branches only)

Once the release builds have finished, merge the `release` branch back into the source release branch using the `merge-release` script. If the branch cannot be successfully merged back this script will automatically rebase the `release` branch and push the changes which will trigger the release builds again, which means you will need to wait for the release builds to run again before proceeding.

### 合并回 master

```sh
npm run merge-release -- master
```

### 合并回旧版本分支

```sh
npm run merge-release -- 1-7-x
```

## 发布版本

Once the merge has finished successfully, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. 在Github上发布release 7. Delete the `release` branch.

## 发布到 npm

Before publishing to npm, you'll need to log into npm as Electron. Optionally, you may find [npmrc](https://www.npmjs.com/package/npmrc) to be a useful way to keep Electron's profile side-by-side with your own:

```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

The Electron account's credentials are kept by GitHub. "Electron - NPM" for the URL "https://www.npmjs.com/login".

```sh
$ npm login
Username: electron
Password:
Email: (this IS public) electron@github.com
```

Publish the release to npm.

```sh
$ npm whoami
electron
$ npm run publish-to-npm
```

Note: In general you should be using the latest Node during this process; however, older versions of the `publish-to-npm` script may have trouble with Node 7 or higher. If you have trouble with this in an older branch, try running with an older version of Node, e.g. a 6.x LTS.

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