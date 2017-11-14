# 릴리즈

이 문서는 Electron 의 새버전 출시 절차를 설명합니다.

## 임시 브랜치 생성

`release` 혹은 사용자가 원하는 이름의 새 브랜치를 `master` 로부터 생성합니다.

참고: 백 포트 릴리스를 만드는 경우 `master`가 아닌 `1-6-x`, `1-7-x` 등을 체크 아웃합니다.

```sh
git checkout master
git pull
git checkout -b release
```

이 브랜치는 임시 릴리즈 브랜치가 생성되고 CI 빌드가 완료되는 동안 아무도 모르는 PR 병합을 방지하기위한 예방조치로써 생성됩니다.

## 남아있는 초안 확인

업로드 스크립트는 [기존 초안 릴리스를 찾습니다](https://github.com/electron/electron/blob/7961a97d7ddbed657c6c867cc8426e02c236c077/script/upload.py#L173-L181). 새 버전이 기존 초안을 손상시키지 않도록하려면 [릴리스 페이지](https://github.com/electron/electron/releases)를 확인하고 초안이 없는지 확인하십시오.

## 버전 올리기

`major,` `minor`, `patch` 를 인수로 전달하여, `bump-version` 스크립트를 실행하세요:

```sh
npm run bump-version -- patch
git push origin HEAD
```

이것은 여러 파일의 버전 번호를 올릴 것 입니다. 예시로 이 [범프 커밋](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a)을 보세요.

대부분의 릴리즈는 `patch` 수준이 될 것입니다. Chrome 또는 다른 주요 변화를 위한 업그레이드는 `minor` 를 사용해야합니다. 자세한 정보는, [Electron 버전 관리](/docs/tutorial/electron-versioning.md)를 보세요.

## Wait for builds :hourglass_flowing_sand:

The presence of the word [`Bump`](https://github.com/electron/electron/blob/7961a97d7ddbed657c6c867cc8426e02c236c077/script/cibuild-linux#L3-L6) in the commit message created by the `bump-version` script will [trigger the release process](https://github.com/electron/electron/blob/7961a97d7ddbed657c6c867cc8426e02c236c077/script/cibuild#L82-L96).

To monitor the build progress, see the following pages:

- [208.52.191.140:8080/view/All/builds](http://208.52.191.140:8080/view/All/builds) for Mac and Windows
- [jenkins.githubapp.com/label/chromium/](https://jenkins.githubapp.com/label/chromium/) for Linux

## Compile release notes

Writing release notes is a good way to keep yourself busy while the builds are running. For prior art, see existing releases on [the releases page](https://github.com/electron/electron/releases).

Tips:

- Each listed item should reference a PR on electron/electron, not an issue, nor a PR from another repo like libcc.
- No need to use link markup when referencing PRs. Strings like `#123` will automatically be converted to links on github.com.
- To see the version of Chromium, V8, and Node in every version of Electron, visit [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Patch releases

For a `patch` release, use the following format:

    ## Bug Fixes
    
    * Fixed a cross-platform thing. #123
    
    ### Linux
    
    * Fixed a Linux thing. #123
    
    ### macOS
    
    * Fixed a macOS thing. #123
    
    ### Windows
    
    * Fixed a Windows thing. #1234
    
    ## API Changes
    
    * Changed a thing. #123
    
    ### Linux
    
    * Changed a Linux thing. #123
    
    ### macOS
    
    * Changed a macOS thing. #123
    
    ### Windows
    
    * Changed a Windows thing. #123
    

### Minor releases

For a `minor` release (which is normally a Chromium update, and possibly also a Node update), e.g. `1.8.0`, use this format:

    **Note:** This is a beta release. This is the first release running on upgraded versions of Chrome/Node.js/V8 and most likely will have have some instability and/or regressions.
    
    Please file new issues for any bugs you find in it.
    
    This release is published to [npm](https://www.npmjs.com/package/electron) under the `beta` tag and can be installed via `npm install electron@beta`.
    
    ## Upgrades
    
    - Upgraded from Chrome `oldVersion` to `newVersion`. #123
    - Upgraded from Node `oldVersion` to `newVersion`. #123
    - Upgraded from v8 `oldVersion` to `newVersion`. #9116
    
    ## Other Changes
    
    - Some other change. #123
    

## Edit the release draft

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. Edit the release and add release notes.
3. Ensure the `prerelease` checkbox is checked. This should happen automatically for Electron versions >=1.7
4. Click 'Save draft'. **Do not click 'Publish release'!**
5. Wait for all builds to pass before proceeding. 

## Merge temporary branch

Merge the temporary back into master, without creating a merge commit:

```sh
git merge release master --no-commit
git push origin master
```

If this fails, rebase with master and rebuild:

```sh
git pull
git checkout release
git rebase master
git push origin HEAD
```

## Run local debug build

Run local debug build to verify that you are actually building the version you want. Sometimes you thought you were doing a release for a new version, but you're actually not.

```sh
npm run build
npm start
```

Verify the window is displaying the current updated version.

## Set environment variables

You'll need to set the following environment variables to publish a release. Ask another team member for these credentials.

- `ELECTRON_S3_BUCKET`
- `ELECTRON_S3_ACCESS_KEY`
- `ELECTRON_S3_SECRET_KEY`
- `ELECTRON_GITHUB_TOKEN` - A personal access token with "repo" scope.

You will only need to do this once.

## Publish the release

This script will download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules.

```sh
npm run release
```

Note: Many distributions of Python still ship with old HTTPS certificates. You may see a `InsecureRequestWarning`, but it can be disregarded.

## Delete the temporary branch

```sh
git checkout master
git branch -D release # delete local branch
git push origin :release # delete remote branch
```

## Promoting a release on npm

New releases are published to npm with the `beta` tag. Every release should eventually get promoted to stable unless there's a good reason not to.

Releases are normally given around two weeks in the wild before being promoted. Before promoting a release, check to see if there are any bug reports against that version, e.g. issues labeled with `version/1.7.x`.

It's also good to ask users in Slack if they're using the beta versions successfully.

To see what's beta and stable at any given time:

    $ npm dist-tag ls electron  
    beta: 1.7.5
    latest: 1.6.11
    

To promote a beta version to stable (aka `latest`):

    npm dist-tag add electron@1.2.3 latest