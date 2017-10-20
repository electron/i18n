# 发布

本文档描述了发布 Electron 版本的过程。

## 编译发布说明

当前的进程是维护本地文件，持续跟踪因拉取请求被合并的显著变化。有关如何格式化记录的例子，请参阅 [发行页面](https://github.com/electron/electron/releases) 上的以前的版本。

## 创建一个临时分支

从 `master` 创建一个新的分支命名为 `release`。

```sh
git checkout master
git pull
git checkout -b release
```

创建此分支是为了防止任何合并的 PR 在创建临时版本分支和 CI 构建完成之间潜入到版本中。

## 输出版本

运行 `bump-version` 脚本, 传递 `major`, `minor`, 或 `patch` 作为一个属性:

```sh
npm run bump-version -- patch
git push origin HEAD
```

这将在几个文件中阻止版本号. 查看 [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) 获取示例.

大多数版本将是 `patch`  级别。 升级到 Chrome 或其他重大更改应使用 `minor`。 更多信息, 查看 [electron-versioning](/docs/tutorial/electron-versioning.md).

## 编辑发布草稿

1. 访问 [发行页面](https://github.com/electron/electron/releases) 然后你将看到一个新的带有发行说明的草稿版本.
2. 编辑版本并添加发行说明。
3. 点击 'Save draft'. **不要点 'Publish release'!**
4. 等待所有的版本通过。:hourglass_flowing_sand:

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

注意: Python 的许多发行版仍然附带旧的 HTTPS 证书. 你也许能看到一个 `InsecureRequestWarning`, 但它可以被忽视。

## 删除临时分支

```sh
git checkout master
git branch -D release # 删除本地分支
git push origin :release # 删除远程分支
```