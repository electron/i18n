# 发布

本文档描述了发布 Electron 版本的过程。

## 创建一个临时分支

Create a new branch from `master`. Name it `release` or anything you like.

Note: If you are creating a backport release, you'll check out `1-6-x`, `1-7-x`, etc instead of `master`.

```sh
git checkout master
git pull
git checkout -b release
```

创建此分支是为了防止任何合并的 PR 在创建临时版本分支和 CI 构建完成之间潜入到版本中

## Check for extant drafts

The upload script [looks for an existing draft release](https://github.com/electron/electron/blob/7961a97d7ddbed657c6c867cc8426e02c236c077/script/upload.py#L173-L181). To prevent your new release from clobbering an existing draft, check [the releases page](https://github.com/electron/electron/releases) and make sure there are no drafts.

## 输出版本

运行 `bump-version` 脚本, 传递 `major`, `minor`, 或 `patch` 作为一个属性:

```sh
npm run bump-version -- patch
git push origin HEAD
```

这将在几个文件中冲突版本号. 查看 [这个冲突的提交](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) 的例子.

大多数版本将是 `patch` 级别。 升级到 Chrome 或其他重大更改应使用 `minor`。 更多信息, 查看 [electron-versioning](/docs/tutorial/electron-versioning.md).

## Wait for builds :hourglass_flowing_sand:

The presence of the word [`Bump`](https://github.com/electron/electron/blob/7961a97d7ddbed657c6c867cc8426e02c236c077/script/cibuild-linux#L3-L6) in the commit message created by the `bump-version` script will [trigger the release process](https://github.com/electron/electron/blob/7961a97d7ddbed657c6c867cc8426e02c236c077/script/cibuild#L82-L96).

To monitor the build progress, see the following pages:

- [208.52.191.140:8080/view/All/builds](http://208.52.191.140:8080/view/All/builds) for Mac and Windows
- [jenkins.githubapp.com/label/chromium/](https://jenkins.githubapp.com/label/chromium/) for Linux

## 编译发布说明

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
    

## 编辑发布草稿

1. 访问 [发行页面](https://github.com/electron/electron/releases) 然后你将看到一个新的带有发行说明的草稿版本.
2. 编辑版本并添加发行说明.
3. Ensure the `prerelease` checkbox is checked. This should happen automatically for Electron versions >=1.7
4. 点击 'Save draft'. **不要点 'Publish release'!**
5. Wait for all builds to pass before proceeding. 

## 合并临时分支

将临时合并回 master，不创建合并提交：

```sh
git merge release master --no-commit
git push origin master
```

如果这样做失败了，可以用 master 重新构建：

```sh
git pull
git checkout release
git rebase master
git push origin HEAD
```

## 运行本地调试构建

运行本地调试构建以验证您是否正在构建所需的版本。 有时候你以为你在为一个新版本发布，但实际上并不是这样。

```sh
npm run build
npm start
```

验证窗口中显示当前的更新版本。

## 设置环境变量

你需要设置以下环境变量才能发布版本。 向其他团队成员询问这些凭据。

- `ELECTRON_S3_BUCKET`
- `ELECTRON_S3_ACCESS_KEY`
- `ELECTRON_S3_SECRET_KEY`
- `ELECTRON_GITHUB_TOKEN` - 具有 "repo" 作用域的一个个人访问令牌.

你只需要这样做一次。

## 发布版本

该脚本将下载二进制文件，并生成节点头和在 Windows 上通过 node-gyp 来构建原生模块使用的 .lib 链接器。

```sh
npm run release
```

注意: Python 的许多发行版仍然附带旧的 HTTPS 证书. 你也许能看到一个 `InsecureRequestWarning`, 但它可以被忽视

## 删除临时分支

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