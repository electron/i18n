# 릴리즈

이 문서는 Electron 의 새버전 출시 절차를 설명합니다.

## Determine which branch to release from

- **If releasing beta,** run the scripts below from `master`.
- **If releasing a stable version,** run the scripts below from `1-7-x` or `1-6-x`, depending on which version you are releasing for.

## Find out what version change is needed

Run `npm run prepare-release -- --notesOnly` to view auto generated release notes. The notes generated should help you determine if this is a major, minor, patch, or beta version change. Read the [Version Change Rules](../tutorial/electron-versioning.md#semver) for more information.

## Run the prepare-release script

The prepare release script will do the following: 1. Check if a release is already in process and if so it will halt. 2. Create a release branch. 3. Bump the version number in several files. See [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) for an example. 4. Create a draft release on GitHub with auto-generated release notes. 5. Push the release branch. 6. Call the APIs to run the release builds.

Once you have determined which type of version change is needed, run the `prepare-release` script with arguments according to your need: - `[major|minor|patch|beta]` to increment one of the version numbers, or - `--stable` to indicate this is a stable version

예시:

### Major version change

```sh
npm run prepare-release -- major
```

### Minor version change

```sh
npm run prepare-release -- minor
```

### Patch version change

```sh
npm run prepare-release -- patch
```

### Beta version change

```sh
npm run prepare-release -- beta
```

### Promote beta to stable

```sh
npm run prepare-release -- --stable
```

## 빌드를 기다리십시오 : hourglass_flowing_sand :

The `prepare-release` script will trigger the builds via API calls. To monitor the build progress, see the following pages:

- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-mas-x64-release/activity) for Mac App Store
- [mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity](https://mac-ci.electronjs.org/blue/organizations/jenkins/electron-osx-x64-release/activity) for OS X
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for Linux
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) for Windows

## 릴리즈 노트 컴파일

릴리스 노트 작성은 빌드가 실행되는 동안 작업을 계속해서 유지하는 좋은 방법입니다. 또는 선행 기술의 경우, [릴리스 페이지](https://github.com/electron/electron/releases)의 기존 릴리스를 참조하십시오.

Tips: - Each listed item should reference a PR on electron/electron, not an issue, nor a PR from another repo like libcc. - No need to use link markup when referencing PRs. Strings like `#123` will automatically be converted to links on github.com. - Electron의 모든 버전에서 Chromium, V8 및 Node의 버전을 보려면 [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json)을 방문하십시오.

### 패치 릴리즈

`패치` 릴리스의 경우 다음 형식을 사용하십시오.

```sh
## Bug Fixes

* Fixed a cross-platform thing. #123

### Linux

* Fixed a Linux thing. #123

### macOS

* Fixed a macOS thing. #123

### Windows

* Fixed a Windows thing. #1234
```

### 마이너 릴리즈

For a `minor` release, e.g. `1.8.0`, use this format:

```sh
## Upgrades

- Upgraded from Node `oldVersion` to `newVersion`. #123

## API Changes

* Changed a thing. #123

### Linux

* Changed a Linux thing. #123

### macOS

* Changed a macOS thing. #123

### Windows

* Changed a Windows thing. #123
```

### Major releases

```sh
## Upgrades

- Upgraded from Chromium `oldVersion` to `newVersion`. # 123
- 노드`oldVersion`에서`newVersion`으로 업그레이드되었습니다. #123

## Breaking API changes

* Changed a thing. #123

### Linux

* Changed a Linux thing. #123

### macOS

* Changed a macOS thing. #123

### Windows

* Changed a Windows thing. # 123

## 기타 변경 사항

- 다른 변화. #123
```

### Beta releases

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some instability and/or regressions.

버그가 발견되면 새로운 문제를 제출하십시오.

이 릴리즈는`beta '태그 아래 [npm] (https://www.npmjs.com/package/electron)에 게시되며`npm install electron @ beta`를 통해 설치할 수 있습니다.
```

## 릴리즈 초안 편집

1. [릴리즈 페이지](https://github.com/electron/electron/releases)에 가면 릴리즈 노트 초안과 자리 표시자로써 릴리즈 노트를 볼 수 있습니다.
2. 릴리즈를 편집하고 릴리즈 노트를 추가하세요.
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. 'Save draft' 를 클릭하세요. **'Publish release' 를 누르면 안됩니다!**
5. 모든 빌드가 통과할 때 까지 기다리세요.
6. You can run `npm run release -- --validateRelease` to verify that all of the required files have been created for the release.

## 릴리즈 게시

Once the release builds have finished, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub 7. Delete the `release` branch.

## Publish to npm

Once the publish is successful, run `npm run publish-to-npm` to publish to release to npm.

## Fix missing binaries of a release manually

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