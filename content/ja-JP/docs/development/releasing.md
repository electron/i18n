# リリース

このドキュメントでは、Electronの新しいバージョンをリリースするプロセスについて説明します。

## リリースノートをコンパイルする

The current process is to maintain a local file, keeping track of notable changes as pull requests are merged. For examples of how to format the notes, see previous releases on [the releases page](https://github.com/electron/electron/releases).

## テンポラリなブランチを作成

Create a new branch from `master` named `release`.

```sh
git checkout master
git pull
git checkout -b release
```

This branch is created as a precaution to prevent any merged PRs from sneaking into a release between the time the temporary release branch is created and the CI builds are complete.

## バージョンを上げる

Run the `bump-version` script, passing `major`, `minor`, or `patch` as an argument:

```sh
npm run bump-version -- patch
git push origin HEAD
```

This will bump the version number in several files. See [this bump commit](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) for an example.

Most releases will be `patch` level. Upgrades to Chrome or other major changes should use `minor`. For more info, see [electron-versioning](/docs/tutorial/electron-versioning.md).

## リリースのドラフトを編集する

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. リリースを編集し、リリースノートを追加します。
3. Save draft (ドラフトを保存)をクリックします。 **'Publish release' はクリックしないでください！**
4. すべてのビルドがパスするのを待ちます :hourglass_flowing_sand:

## テンポラリなブランチをマージ

Merge the temporary back into master, without creating a merge commit:

```sh
git merge release master --no-commit
git push origin master
```

もしこれが失敗した場合、masterブランチとリベースしてからビルドしてください

```sh
git pull
git checkout release
git rebase master
git push origin HEAD
```

## ローカルのデバッグビルドを実行する

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

## リリースを公開する

This script will download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules.

```sh
npm run release
```

Note: Many distributions of Python still ship with old HTTPS certificates. You may see a `InsecureRequestWarning`, but it can be disregarded.

## テンポラリなブランチを削除する

```sh
git checkout master
git branch -D release # ローカルブランチを削除
git push origin :release # リモートブランチを削除
```