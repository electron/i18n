# リリース

このドキュメントでは、Electronの新しいバージョンをリリースするプロセスについて説明します。

## リリースするブランチを決定する

- **ベータをリリースする場合、**`master` から以下のスクリプトを実行してください。
- **安定版をリリースする場合、**その安定しているブランチから以下のスクリプトを実行してください。

## どのバージョンの変更が必要かを知る

`npm run prepare-release -- --notesOnly` を実行すると自動生成されたリリースノートが表示されます。 生成されたノートはこれがメジャー、マイナー、パッチ、またはベータ版の変更であるかどうかを判断するのに役立ちます。 より詳しい情報については、[バージョン変更ルール](../tutorial/electron-versioning.md#semver) を読んで下さい。

**注意:** ブランチ (1-8-xなど) からリリースする場合、ブランチを `git checkout -b remotes/origin/1-8-x` ではなく `git checkout 1-8-x` でチェックアウトします。 スクリプトが `remotes/origin/` などでない短い名前を返すには、`git rev-parse --abbrev-ref HEAD` が必要です。

## トークンと環境変数をセットする

Electron リリースを作成してアップロードするには、Electron S3 認証が必要です。 より詳しくはチームメンバーにお問い合わせください。

リリーススクリプトが必要とする環境変数は、`*_TOKEN` です。 これらユーザーごとのトークンを生成したら、リリースを開始するときに `明示` できるローカルファイルにそれらを保持するとよいでしょう。 * `ELECTRON_GITHUB_TOKEN`: https://github.com/settings/tokens/new で説明されているように作成し、トークンレポジトリアクセススコープを与えます。 * `APPVEYOR_TOKEN`: https://windows-ci.electronjs.org/api-token からトークンを作成します。 アカウントをお持ちでない場合は、チームメンバーにあなたの追加を依頼してください。 * `CIRCLE_TOKEN`: https://circleci.com/account/api の "Personal API Tokens" からトークンを作ります。

## prepare-release スクリプトを実行する

prepare release スクリプトは、以下の処理を行います。 1. リリースがすでに処理中であるかどうかを確認し、リリースがあれば中止します。 2. リリースブランチを作成します。 3. バージョン番号をいくつかのファイルで上げます。 例に [このバージョン上げコミット](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) を参照してください。 4. 自動生成されたリリースノートで GitHub 上にドラフトリリースを作成します。 5. リリースブランチをプッシュします。 6. リリースビルドを実行するために API を呼び出します。

必要なバージョン変更のタイプを決定したら、必要に応じて以下の引数を指定して `prepare-release` スクリプトを実行します。 - `[major|minor|patch|beta]` 増やすバージョン番号 - `--stable` これが安定版であることを示す

例:

### メジャーバージョンの変更

```sh
npm run prepare-release -- major
```

### マイナーバージョンの変更

```sh
npm run prepare-release -- minor
```

### パッチバージョンの変更

```sh
npm run prepare-release -- patch
```

### ベータ版の変更

```sh
npm run prepare-release -- beta
```

### ベータを安定版へ昇格

```sh
npm run prepare-release -- --stable
```

ヒント: 以下のように、メジャー/マイナー/パッチ/ベータの同じ引数を持つ `bump-version` スクリプトのドライランで、`prepare-release` を実行する前に新しいバージョン番号をテストできます。

```sh
$ ./script/bump-version.py --bump minor --dry-run
```

## ビルドを待つ :hourglass_flowing_sand:

`prepare-release` スクリプトは、API 呼び出しを介してビルドをトリガーします。 ビルドの進行状況をモニターするには、以下のページを参照してください。

- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) OS X と Linux 向け
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) Windows 向け

## リリースノートをコンパイルする

リリースノートを書くことは、ビルドの実行中に自分自身を忙しくする良い方法です。 従来の開発については、[リリースページ](https://github.com/electron/electron/releases) の既存のリリースを参照してください。

ヒント: - リストされている各項目は issue ではなく、libcc のような別のリポジトリからのPRでもなく、 electron/electron 上のPRを参照する必要があります。 - PRを参照する際にリンクマークアップを使用する必要はありません。 Strings like `#123` will automatically be converted to links on github.com. - To see the version of Chromium, V8, and Node in every version of Electron, visit [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

### Patch releases

For a `patch` release, use the following format:

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

### Minor releases

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

### Major リリース

```sh
## Upgrades

- Upgraded from Chromium `oldVersion` to `newVersion`. #123
- Upgraded from Node `oldVersion` to `newVersion`. #123

## Breaking API changes

* Changed a thing. #123

### Linux

* Changed a Linux thing. #123

### macOS

* Changed a macOS thing. #123

### Windows

* Changed a Windows thing. #123

## Other Changes

- Some other change. #123
```

### ベータリリース

Use the same formats as the ones suggested above, but add the following note at the beginning of the changelog:

```sh
**Note:** This is a beta release and most likely will have have some
instability and/or regressions.

Please file new issues for any bugs you find in it.

This release is published to [npm](https://www.npmjs.com/package/electron)
under the `beta` tag and can be installed via `npm install electron@beta`.
```

## リリースのドラフトを編集する

1. Visit [the releases page](https://github.com/electron/electron/releases) and you'll see a new draft release with placeholder release notes.
2. リリースを編集し、リリースノートを追加します。
3. Uncheck the `prerelease` checkbox if you're publishing a stable release; leave it checked for beta releases.
4. Save draft (ドラフトを保存)をクリックします。 **'Publish release' はクリックしないでください！**
5. Wait for all builds to pass before proceeding.
6. In the `release` branch, verify that the release's files have been created:

```sh
$ git rev-parse --abbrev-ref HEAD
release
$ npm run release -- --validateRelease
```

## Merge temporary branch (pre-2-0-x branches only)

Once the release builds have finished, merge the `release` branch back into the source release branch using the `merge-release` script. If the branch cannot be successfully merged back this script will automatically rebase the `release` branch and push the changes which will trigger the release builds again, which means you will need to wait for the release builds to run again before proceeding.

### Merging back into master

```sh
npm run merge-release -- master
```

### Merging back into old release branch

```sh
npm run merge-release -- 1-7-x
```

## リリースを公開する

Once the merge has finished successfully, run the `release` script via `npm run release` to finish the release process. This script will do the following: 1. Build the project to validate that the correct version number is being released. 2. Download the binaries and generate the node headers and the .lib linker used on Windows by node-gyp to build native modules. 3. Create and upload the SHASUMS files stored on S3 for the node files. 4. Create and upload the SHASUMS256.txt file stored on the GitHub release. 5. Validate that all of the required files are present on GitHub and S3 and have the correct checksums as specified in the SHASUMS files. 6. Publish the release on GitHub 7. Delete the `release` branch.

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

Note: In general you should be using the latest Node during this process; however, older versions of the `publish-to-npm` script may have trouble with Node 7 or higher. If you have trouble with this in an older branch, try running with an older version of Node, e.g. a 6.x LTS.

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