# リリース

このドキュメントでは、Electronの新しいバージョンをリリースするプロセスについて説明します。

## トークンと環境変数をセットする
You'll need Electron S3 credentials in order to create and upload an Electron release. Contact a team member for more information.

リリーススクリプトが必要とする環境変数は、以下の `*_TOKEN` です。

* * `ELECTRON_GITHUB_TOKEN`: これは https://github.com/settings/tokens/new?scopes=repo の通りに作成します。
* `APPVEYOR_TOKEN`: https://windows-ci.electronjs.org/api-token からトークンを作成します。 アカウントを持っていない場合は、チームメンバーにあなたの追加を依頼してください。
* `CIRCLE_TOKEN`: https://circleci.com/account/api の "Personal API Tokens" からトークンを作ります。
* `VSTS_TOKEN`: https://github.visualstudio.com/_usersSettings/tokens や https://github.visualstudio.com/_details/security/tokens で、`Build (read and execute)` のスコープで Personal Access Token を作成します。
* `ELECTRON_S3_BUCKET`:
* `ELECTRON_S3_ACCESS_KEY`:
* `ELECTRON_S3_SECRET_KEY`: これらがない場合は、チームメンバーに質問してください。

Once you've generated these tokens, put them in a `.env` file in the root directory of the project. This file is gitignored, and will be loaded into the environment by the release scripts.


## リリースするブランチを決定する

- **ベータをリリースする場合、**`master` から以下のスクリプトを実行してください。
- **安定版をリリースする場合、**その安定しているブランチから以下のスクリプトを実行してください。

## どのバージョンの変更が必要かを知る
`npm run prepare-release -- --notesOnly` を実行すると自動生成されたリリースノートが表示されます。 生成されたノートはこれがメジャー、マイナー、パッチ、またはベータ版の変更であるかどうかを判断するのに役立ちます。 より詳しい情報については、[バージョン変更ルール](../tutorial/electron-versioning.md#semver) を読んで下さい。

**注意:** ブランチ (1-8-xなど) からリリースする場合、ブランチを `git checkout -b remotes/origin/1-8-x` ではなく `git checkout 1-8-x` でチェックアウトします。 スクリプトが `remotes/origin/` などでない短い名前を返すには、`git rev-parse --abbrev-ref HEAD` が必要です。

## prepare-release スクリプトを実行する
The prepare release script will do the following:
1. リリースがすでに処理中であるかどうかを確認し、リリースがあれば中止します。
2. リリースブランチを作成します。
3. バージョン番号をいくつかのファイルで上げます。 例に [このバージョン上げコミット](https://github.com/electron/electron/commit/78ec1b8f89b3886b856377a1756a51617bc33f5a) を参照してください。
4. 自動生成されたリリースノートで GitHub 上にドラフトリリースを作成します。
5. リリースブランチをプッシュします。
6. リリースビルドを実行するために API を呼び出します。

Once you have determined which type of version change is needed, run the `prepare-release` script with arguments according to your need:
- `[major|minor|patch|beta]` to increment one of the version numbers, or
- `--stable` to indicate this is a stable version

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
The `prepare-release` script will trigger the builds via API calls. To monitor the build progress, see the following pages:

- [electron-release-mas-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=19&_a=completed) は MAS ビルド向けです。
- [electron-release-osx-x64](https://github.visualstudio.com/electron/_build/index?context=allDefinitions&path=%5C&definitionId=18&_a=completed) は OSX ビルド向けです。
- [circleci.com/gh/electron/electron](https://circleci.com/gh/electron) は Linux ビルド向けです。
- [windows-ci.electronjs.org/project/AppVeyor/electron-39ng6](https://windows-ci.electronjs.org/project/AppVeyor/electron-39ng6) Windows 32-bit ビルド向けです。
- [windows-ci.electronjs.org/project/AppVeyor/electron](https://windows-ci.electronjs.org/project/AppVeyor/electron) は Windows 64-bit ビルド向けです。

## リリースノートをコンパイルする

リリースノートを書くことは、ビルドの実行中に自分自身を忙しくする良い方法です。 従来の開発については、[リリースページ](https://github.com/electron/electron/releases) の既存のリリースを参照してください。

参考:
- Each listed item should reference a PR on electron/electron, not an issue, nor a PR from another repo like libcc.
- No need to use link markup when referencing PRs. `#123` のような文字列は自動的に github.com のリンクに変換されます。
- To see the version of Chromium, V8, and Node in every version of Electron, visit [atom.io/download/electron/index.json](https://atom.io/download/electron/index.json).

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
3. Click 'Save draft'. **Do not click 'Publish release'!**
4. 続行する前に全ビルドがパスするのを待ちます。
5. そのブランチで、リリースのファイルが作成されていることを確認します。
```sh
$ npm run release -- --validateRelease
```
アセットをチェックするために `--validateRelease` を複数回実行する必要がある場合は、アセットをチェックするたびに再構築する必要がないように、まず上記を同様に実行し、その後の呼び出しでは `node ./script/release.js --validateRelease` を実行します。

## リリースを公開する

マージが正常に終了したら、`npm run release` を介して `release` スクリプトを実行してリリースプロセスを終了します。 This script will do the following:
1. プロジェクトをビルドして、正しいバージョン番号がリリースされていることを検証します。
2. バイナリをダウンロードし、ネイティブモジュールをビルドするために node-gyp によって Windows 上で使用される node ヘッダと .lib リンカーを生成します。
3. S3 に保存された SHASUMS ファイルを作成し、node ファイル用にアップロードします。
4. GitHub リリースに格納される SHASUMS256.txt ファイルを作成してアップロードします。
5. すべての必要なファイルが GitHub と S3 に存在し、SHASUMS ファイルで指定されている正しいチェックサムを持っていることを検証します。
6. Publish the release on GitHub

## npm に公開

npm に公開する前に、Electron として npm にログインする必要があります。 任意ですが、[npmrc](https://www.npmjs.com/package/npmrc) は Electron のプロファイルを自分自身と並べて維持するのに便利な方法でしょう。
```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

The Electron account's credentials are kept by GitHub in  a password manager. You'll also need to have access to an 2FA authenticator app with the appropriate OTP generator code to log in.
```sh
$ npm login
Username: electron-nightly
Password: <これは LastPass の NPM Electron Nightly の下にあります>
Email: (これが公式) electron@github.com
```

npm にリリースを公開します。 Before running this you'll need to have set `ELECTRON_NPM_OTP` as an environment variable using a code from the aforementioned 2FA authenticator app.
```sh
$ npm whoami
electron-nightly
$ npm run publish-to-npm
```

公開後、`latest` リリースを確認できます。
```sh
$ npm dist-tag ls electron
```

なんらかの理由で `npm run publish-to-npm` に失敗した場合、以下のように手動でタグ付けできます。
```sh
$ npm dist-tag add electron@<version> <tag>
```
例
```sh
$ npm dist-tag add electron@2.0.0 latest
```

# トラブルシューティング

## 壊れたビルドを再実行する

なんらかの理由でリリースビルドに失敗した場合、`script/ci-release-build.js` を使って以下のようにリリースビルドを再実行できます。

### 全ての Linux ビルドを再実行する:
```sh
node script/ci-release-build.js --ci=CircleCI --ghRelease TARGET_BRANCH
(TARGET_BRANCH) はあなたからリリースされているブランチです。
```

### 全ての macOS ビルドを再実行する:
```sh
node script/ci-release-build.js --ci=VSTS --ghRelease TARGET_BRANCH
(TARGET_BRANCH) はあなたからリリースされているブランチです。
```

### 全ての Windows ビルドを再実行する:
```sh
node script/ci-release-build.js --ci=AppVeyor --ghRelease TARGET_BRANCH
(TARGET_BRANCH) はあなたからリリースされているブランチです。
```

加えて、個々のジョブを実行するためにスクリプトにジョブ名を渡すことができます。例:
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

# リリースビルドを作成します
gn gen out/Release --args="import(\"//electron/build/args/release.gn\") $GN_EXTRA_ARGS"

# コンパイルするためにアーキテクチャを指定します。置き換えてください
gn gen out/Release-<TARGET_ARCH> --args='import(\"//electron/build/args/release.gn\") target_cpu = "[arm|x64|ia32]"'

# electron ターゲットで ninja を実行しビルドします
ninja -C out/Release electron
ninja -C out/Release electron:dist_zip

# 公開されたリリースを上書きすることを明示的に許可します。
./script/upload.py --overwrite
```

利用可能な値は [target_cpu](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_cpu_the-desired-cpu-architecture-for-the-build-possible-values) と [target_os](https://gn.googlesource.com/gn/+/master/docs/reference.md#built_in-predefined-variables-target_os_the-desired-operating-system-for-the-build-possible-values) にあります。

すべてのディストリビューションを再アップロードした後、チェックサムファイルをアップロードするために再度公開します。

```sh
npm run release
```
