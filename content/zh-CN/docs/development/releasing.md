# 发布

本文档描述了发布 Electron 版本的过程。

## Set your tokens and environment variables

You'll need Electron S3 credentials in order to create and upload an Electron release. Contact a team member for more information.

There are a handful of `*_TOKEN` environment variables needed by the release scripts:

- `ELECTRON_GITHUB_TOKEN`: Create this by visiting https://github.com/settings/tokens/new?scopes=repo
- `APPVEYOR_TOKEN`: Create a token from https://windows-ci.electronjs.org/api-token If you don't have an account, ask a team member to add you.
- `CIRCLE_TOKEN`: Create a token from "Personal API Tokens" at https://circleci.com/account/api
- `VSTS_TOKEN`: Create a Personal Access Token at https://github.visualstudio.com/_usersSettings/tokens or https://github.visualstudio.com/_details/security/tokens with the scope of `Build (read and execute)`.
- `ELECTRON_S3_BUCKET`:
- `ELECTRON_S3_ACCESS_KEY`:
- `ELECTRON_S3_SECRET_KEY`: If you don't have these, ask a team member to help you.

Once you've generated these tokens, put them in a `.env` file in the root directory of the project. This file is gitignored, and will be loaded into the environment by the release scripts.

## Determine which branch to release from

- **If releasing beta,** run the scripts below from `master`.
- **If releasing a stable version,** run the scripts below from the branch you're stabilizing.

## Find out what version change is needed

Run `npm run prepare-release -- --notesOnly` to view auto generated release notes. The notes generated should help you determine if this is a major, minor, patch, or beta version change. Read the [Version Change Rules](../tutorial/electron-versioning.md#semver) for more information.

**NB:** If releasing from a branch, e.g. 1-8-x, check out the branch with `git checkout 1-8-x` rather than `git checkout -b remotes/origin/1-8-x`. The scripts need `git rev-parse --abbrev-ref HEAD` to return a short name, e.g. no `remotes/origin/`

## 运行 prepare-release 脚本

The prepare release script will do the following: 1. Check if a release is already in process and if so it will halt. 2. Create a release branch. 3. Bump the version number in several files. See [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) for an example. 4. Create a draft release on GitHub with auto-generated release notes. 5. Push the release branch. 6. Call the APIs to run the release builds.

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
npm run prepare-release -- patch --stable
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

The `prepare-release` script will trigger the builds via API calls. To monitor the build progress, see the following pages:

- [electron-release-mas-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=19&_a=completed) for MAS builds.
- [electron-release-osx-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=18&_a=completed) for OSX builds.
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for Linux builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron-39ng6](https://windows-ci.electronjs.org/project/AppVeyor/electron-39ng6) for Windows 32-bit builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) for Windows 64-bit builds.

## 编译发布说明

Writing release notes is a good way to keep yourself busy while the builds are running. For prior art, see existing releases on [the releases page](https://github.com/electron/electron/releases).

Tips: - Each listed item should reference a PR on electron/electron, not an issue, nor a PR from another repo like libcc. - No need to use link markup when referencing PRs. Strings like `#123` will automatically be converted to links on github.com. - To see the version of Chromium, V8, and Node in every version of Electron, visit [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Patch 发布

For a `patch` release, use the following format:

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

For a `minor` release, e.g. `1.8.0`, use this format:

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
**注意：** 这是一个测试版本并很可能会有一些不稳定和/或复原。

请为您在其中找到的任何错误提出新问题。

This release is published to [npm](https://www.npmjs.com/package/electron)
under the `beta` tag and can be installed via `npm install electron@beta`.
```

## 编辑发布草稿

1. 访问 [发行页面](https://github.com/electron/electron/releases) 然后你将看到一个新的带有发行说明的草稿版本。
2. 编辑版本并添加发行说明.
3. Click 'Save draft'. **Do not click 'Publish release'!**
4. Wait for all builds to pass before proceeding.
5. In the branch, verify that the release's files have been created:

```sh
$ npm run release -- --validateRelease
```

Note, if you need to run `--validateRelease` more than once to check the assets, run it as above the first time, then `node ./script/release.js --validateRelease` for subsequent calls so that you don't have to rebuild each time you want to check the assets.

## Publish the release

Once the merge has finished successfully, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub

## Publish to npm

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

After publishing, you can check the `latest` release:

```sh
$ npm dist-tag ls electron
```

If for some reason `npm run publish-to-npm` fails, you can tag the release manually:

```sh
$ npm dist-tag add electron@<version> <tag>
```

e.g.:

```sh
$ npm dist-tag add electron@2.0.0 latest
```

# 故障排查

## Rerun broken builds

If a release build fails for some reason, you can use `script/ci-release-build.js` to rerun a release build:

### Rerun all linux builds:

```sh
node script/ci-release-build.js --ci=CircleCI --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all macOS builds:

```sh
node script/ci-release-build.js --ci=VSTS --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

### Rerun all Windows builds:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease TARGET_BRANCH
(TARGET_BRANCH) is the branch you are releasing from.
```

Additionally you can pass a job name to the script to run an individual job, eg:

```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease --job=electron-x64 TARGET_BRANCH
```

## 手动修复发行版的缺失二进制文件

In the case of a corrupted release with broken CI machines, we might have to re-upload the binaries for an already published release.

The first step is to go to the [Releases](https://github.com/electron/electron/releases) page and delete the corrupted binaries with the `SHASUMS256.txt` checksum file.

Then manually create distributions for each platform and upload them:

```sh
# Checkout the version to re-upload.
git checkout vTHE.RELEASE.VERSION

# Do release build, specifying one target architecture.
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# Explicitly allow overwritting a published release.
./script/upload.py --overwrite
```

After re-uploading all distributions, publish again to upload the checksum file:

```sh
npm run release
```