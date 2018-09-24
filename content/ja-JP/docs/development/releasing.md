# リリース

このドキュメントでは、Electronの新しいバージョンをリリースするプロセスについて説明します。

## トークンと環境変数をセットする

Electron リリースを作成してアップロードするには、Electron S3 認証が必要です。 より詳しくはチームメンバーにお問い合わせください。

There are a handful of `*_TOKEN` environment variables needed by the release scripts:

- `ELECTRON_GITHUB_TOKEN`: Create this by visiting https://github.com/settings/tokens/new?scopes=repo
- `APPVEYOR_TOKEN`: Create a token from https://windows-ci.electronjs.org/api-token If you don't have an account, ask a team member to add you.
- `CIRCLE_TOKEN`: Create a token from "Personal API Tokens" at https://circleci.com/account/api
- `VSTS_TOKEN`: Create a Personal Access Token at https://github.visualstudio.com/_usersSettings/tokens or https://github.visualstudio.com/_details/security/tokens with the scope of `Build (read and execute)`.
- `ELECTRON_S3_BUCKET`:
- `ELECTRON_S3_ACCESS_KEY`:
- `ELECTRON_S3_SECRET_KEY`: If you don't have these, ask a team member to help you.

Once you've generated these tokens, put them in a `.env` file in the root directory of the project. This file is gitignored, and will be loaded into the environment by the release scripts.

## リリースするブランチを決定する

- **ベータをリリースする場合、**`master` から以下のスクリプトを実行してください。
- **安定版をリリースする場合、**その安定しているブランチから以下のスクリプトを実行してください。

## どのバージョンの変更が必要かを知る

`npm run prepare-release -- --notesOnly` を実行すると自動生成されたリリースノートが表示されます。 生成されたノートはこれがメジャー、マイナー、パッチ、またはベータ版の変更であるかどうかを判断するのに役立ちます。 より詳しい情報については、[バージョン変更ルール](../tutorial/electron-versioning.md#semver) を読んで下さい。

**注意:** ブランチ (1-8-xなど) からリリースする場合、ブランチを `git checkout -b remotes/origin/1-8-x` ではなく `git checkout 1-8-x` でチェックアウトします。 スクリプトが `remotes/origin/` などでない短い名前を返すには、`git rev-parse --abbrev-ref HEAD` が必要です。

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
npm run prepare-release -- patch --stable
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

- [electron-release-mas-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=19&_a=completed) for MAS builds.
- [electron-release-osx-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=18&_a=completed) for OSX builds.
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) for Linux builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron-39ng6](https://windows-ci.electronjs.org/project/AppVeyor/electron-39ng6) for Windows 32-bit builds.
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) for Windows 64-bit builds.

## リリースノートをコンパイルする

リリースノートを書くことは、ビルドの実行中に自分自身を忙しくする良い方法です。 従来の開発については、[リリースページ](https://github.com/electron/electron/releases) の既存のリリースを参照してください。

ヒント: - リストされている各項目は issue ではなく、libcc のような別のリポジトリからのPRでもなく、 electron/electron 上のPRを参照する必要があります。 - PRを参照する際にリンクマークアップを使用する必要はありません。 `#123` のような文字列は自動的に github.com のリンクに変換されます。 - それぞれの Electron のバージョンで Chromium、V8、Node のバージョンを確認するには、[atom.io/download/electron/index.json](https://atom.io/download/electron/index.json) を参照してください。

### パッチリリース

`パッチ` リリースでは、以下の形式を使用します。

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

### マイナーリリース

`1.8.0` などの `マイナー` リリースでは、以下の形式を使用します。

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

### メジャーリリース

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

上記のフォーマットと同じフォーマットを使用しますが、変更履歴の冒頭に次の注記を追加してください。

```sh
**Note:** This is a beta release and most likely will have have some
instability and/or regressions.

Please file new issues for any bugs you find in it.

This release is published to [npm](https://www.npmjs.com/package/electron)
under the `beta` tag and can be installed via `npm install electron@beta`.
```

## リリースのドラフトを編集する

1. [リリースページ](https://github.com/electron/electron/releases) にアクセスすると、プレースホルダリリースノートを含む新しいドラフトリリースが表示されます。
2. リリースを編集し、リリースノートを追加します。
3. Save draft (ドラフトを保存)をクリックします。 **'Publish release' はクリックしないでください！**
4. 続行する前に全ビルドがパスするのを待ちます。
5. In the branch, verify that the release's files have been created:

```sh
$ npm run release -- --validateRelease
```

Note, if you need to run `--validateRelease` more than once to check the assets, run it as above the first time, then `node ./script/release.js --validateRelease` for subsequent calls so that you don't have to rebuild each time you want to check the assets.

## リリースを公開する

マージが正常に終了したら、`npm run release` を介して `release` スクリプトを実行してリリースプロセスを終了します。 このスクリプトは、以下の処理を行います。 1. プロジェクトをビルドして、正しいバージョン番号がリリースされていることを検証します。 2. バイナリをダウンロードし、ネイティブモジュールをビルドするために node-gyp によって Windows 上で使用される node ヘッダと .lib リンカーを生成します。 3. S3 に保存された SHASUMS ファイルを作成し、node ファイル用にアップロードします。 4. GitHub リリースに格納される SHASUMS256.txt ファイルを作成してアップロードします。 5. すべての必要なファイルが GitHub と S3 に存在し、SHASUMS ファイルで指定されている正しいチェックサムを持っていることを検証します。 6. GitHub 上でリリースを公開します。

## npm に公開

npm に公開する前に、Electron として npm にログインする必要があります。 任意ですが、[npmrc](https://www.npmjs.com/package/npmrc) は Electron のプロファイルを自分自身と並べて維持するのに便利な方法でしょう。

```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

The Electron account's credentials are kept by GitHub in a password manager. You'll also need to have access to an 2FA authenticator app with the appropriate OTP generator code to log in.

```sh
$ npm login
Username: electron-nightly
Password: <This can be found under NPM Electron Nightly on LastPass>
Email: (this IS public) electron@github.com
```

Publish the release to npm. Before running this you'll need to have set `ELECTRON_NPM_OTP` as an environment variable using a code from the aforementioned 2FA authenticator app.

```sh
$ npm whoami
electron-nightly
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

# トラブルシューティング

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

## 手動でリリースの欠けたバイナリを修正する

CI マシンが壊れてリリースが破損した場合、既に公開されているリリースのバイナリを再アップロードする必要があります。

最初のステップは、[リリース](https://github.com/electron/electron/releases) ページに行き、`SHASUMS256.txt` チェックサムファイルで破損したバイナリを削除することです。

次に以下のように各プラットフォームの配布を手動で作成してアップロードします。

```sh
# 再アップロードするバージョンをチェックアウトします
git checkout vX.Y.Z

# Create release build
gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"

# To compile for specific arch, instead set
gn gen out/Release-<TARGET_ARCH> --args='import(\"//electron/build/args/release.gn\") target_cpu = "[arm|x64|ia32]"'

# Build by running ninja with the electron target
ninja -C out/Release electron
ninja -C out/Release electron:dist_zip

# Explicitly allow overwriting a published release.
./script/upload.py --overwrite
```

Allowable values for [target_cpu](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values) and [target_os](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values).

すべてのディストリビューションを再アップロードした後、チェックサムファイルをアップロードするために再度公開します。

```sh
npm run release
```