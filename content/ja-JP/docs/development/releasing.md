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
3. 安定版を公開する場合は、ベータ版がないか確認し、`prerelease` チェックボックスを外します。
4. Save draft (ドラフトを保存)をクリックします。 **'Publish release' はクリックしないでください！**
5. 続行する前に全ビルドがパスするのを待ちます。
6. `release` ブランチで、リリースのファイルが作成されていることを確認します。

```sh
$ git rev-parse --abbrev-ref HEAD
release
$ npm run release -- --validateRelease
```

## 一時ブランチのマージ (2-0-x 以前のブランチ限定)

リリースビルドが完了したら、`release` ブランチを `merge-release` スクリプトを使用してソースリリースブランチにマージします。 ブランチが正常にマージバックされない場合、このスクリプトは `release` ブランチを自動的にリベースし、リリースビルドをトリガする変更をプッシュします。これは、続行する前にリリースビルドが再び実行されるのを待つ必要があることを意味します。

### マスターにマージバックする

```sh
npm run merge-release -- master
```

### 旧リリースブランチにマージバックする

```sh
npm run merge-release -- 1-7-x
```

## リリースを公開する

マージが正常に終了したら、`npm run release` を介して `release` スクリプトを実行してリリースプロセスを終了します。 このスクリプトは、以下の処理を行います。 1. プロジェクトをビルドして、正しいバージョン番号がリリースされていることを検証します。 2. バイナリをダウンロードし、ネイティブモジュールをビルドするために node-gyp によって Windows 上で使用される node ヘッダと .lib リンカーを生成します。 3. S3 に保存された SHASUMS ファイルを作成し、node ファイル用にアップロードします。 4. GitHub リリースに格納される SHASUMS256.txt ファイルを作成してアップロードします。 5. すべての必要なファイルが GitHub と S3 に存在し、SHASUMS ファイルで指定されている正しいチェックサムを持っていることを検証します。 6. GitHub 上でリリースを公開します。 7. `release` ブランチを削除します。

## npm に公開

npm に公開する前に、Electron として npm にログインする必要があります。 任意ですが、[npmrc](https://www.npmjs.com/package/npmrc) は Electron のプロファイルを自分自身と並べて維持するのに便利な方法でしょう。

```sh
$ sudo npm install -g npmrc
$ npmrc -c electron
Removing old .npmrc (default)
Activating .npmrc "electron"
```

Electron アカウントの証明書はGitHubによって保持されます。 "Electron - NPM" の URL は "https://www.npmjs.com/login".

```sh
$ npm login
Username: electron
Password:
Email: (this IS public) electron@github.com
```

npm にリリースを公開します。

```sh
$ npm whoami
electron
$ npm run publish-to-npm
```

注意: 一般的に、このプロセスでは最新の Node を使用する必要があります。 しかし、`publish-to-npm` スクリプトの古いバージョンでは、Node 7 以上で問題が発生する可能性があります。 古いブランチで問題が発生した場合は、Node の以前のバージョン、たとえば 6.x LTS で実行してみてください。

## 手動でリリースの欠けたバイナリを修正する

CI マシンが壊れてリリースが破損した場合、既に公開されているリリースのバイナリを再アップロードする必要があります。

最初のステップは、[リリース](https://github.com/electron/electron/releases) ページに行き、`SHASUMS256.txt` チェックサムファイルで破損したバイナリを削除することです。

次に以下のように各プラットフォームの配布を手動で作成してアップロードします。

```sh
# 再アップロードするバージョンをチェックアウトします
git checkout vTHE.RELEASE.VERSION

# ひとつのターゲットを指定してリリースビルドをします。
./script/bootstrap.py --target_arch [arm|x64|ia32]
./script/build.py -c R
./script/create-dist.py

# 公開されたリリースを上書きすることを明示的に許可します。
./script/upload.py --overwrite
```

すべてのディストリビューションを再アップロードした後、チェックサムファイルをアップロードするために再度公開します。

```sh
npm run release
```