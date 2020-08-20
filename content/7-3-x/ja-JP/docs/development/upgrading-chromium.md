# Chromium のアップグレード

これは、Electron で Chromium をアップグレードするために必要な手順の概要です。

- 新しい Chromium バージョンへ libcc をアップグレードする
- Electron のコードに新しい libcc との互換性を持たせる
- 必要に応じて Electron の依存ファイルを更新する (crashpad、NodeJS、etc.)。
- libcc と electron の内部ビルドを作る
- 必要であれば Electron ドキュメントを更新する


## 新しい Chromium バージョンへ `libcc` をアップグレードする

1. コードを取得してプロジェクトを初期化します。
  ```sh
  $ git clone git@github.com:electron/libchromiumcontent.git
  $ cd libchromiumcontent
  $ ./script/bootstrap -v
  ```
2. Chromium スナップショットを更新します
  - Choose a version number from [OmahaProxy](https://omahaproxy.appspot.com/) and update the `VERSION` file with it
    - これはブラウザで OmahaProxy に手動でアクセスするか、以下のようにして自動的に行うことができます。
    - 最新の安定 mac 版は一行でこのようになります。`curl -so- https://omahaproxy.appspot.com/mac > VERSION`
    - 最新のベータ win64 版は一行でこのようになります。`curl -so- https://omahaproxy.appspot.com/all | grep "win64,beta" | awk -F, 'NR==1{print $3}' > VERSION`
  - run `$ ./script/update`
    - お茶でも淹れましょう。これは30分以上かかります。
    - おそらく、パッチ適用には失敗するでしょう。
3. `patches/` と `patches-mas/` フォルダの `*.patch` ファイルを修正します。
4. (Optional) `script/update` applies patches, but if multiple tries are needed you can manually run the same script that `update` calls: `$ ./script/apply-patches`
  - There is a second script, `script/patch.py` that may be useful. Read `./script/patch.py -h` for more information.
5. すべてのパッチをエラーなく適用できれば、ビルドを実行します
  - `$ ./script/build`
  - If some patches are no longer compatible with the Chromium code, fix compilation errors.
6. When the build succeeds, create a `dist` for Electron
  - `$ ./script/create-dist --no_zip`
    - It will create a `dist/main` folder in the libcc repo's root. You will need this to build Electron.
7. (Optional) Update script contents if there are errors resulting from files that were removed or renamed. (`--no_zip` prevents script from create `dist` archives. このアーカイブは必要ありません。)


## Electron のコードを更新する

1. コードを取得します。
  ```sh
  $ git clone git@github.com:electron/electron.git
  $ cd electron
  ```
2. If you have libcc built on your machine in its own repo, tell Electron to use it:
  ```sh
  $ ./script/bootstrap.py -v \
    --libcc_source_path <libcc_folder>/src \
    --libcc_shared_library_path <libcc_folder>/shared_library \
    --libcc_static_library_path <libcc_folder>/static_library
  ```
3. If you haven't yet built libcc but it's already supposed to be upgraded to a new Chromium, bootstrap Electron as usual `$ ./script/bootstrap.py -v`
  - libcc サブモジュール (`vendor/libchromiumcontent`) が正しいリビジョンを指していることを確認します

4. Set `CLANG_REVISION` in `script/update-clang.sh` to match the version Chromium is using.
  - `electron/libchromiumcontent/src/tools/clang/scripts/update.py` にあります。

5. まだチェックアウトしていない場合は Chromium をチェックアウトしてください。
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py
    - (上記 URL の `{VERSION}` プレースホルダを libcc が使用する Chromium のバージョンに置き換えてください。)
6. Electron をビルドします。
  - まずはじめにこれで Debug 版のビルドを試してください。`$ ./script/build.py -c D`
  - テストを実行するのに必要です。
7. コンパイルエラーとリンクエラーを修正します
8. Release ビルドでもビルドできることを確認します
  - `$ ./script/build.py -c R`
  - 多くの場合、リリースビルドには修正が必要な異なるリンクエラーがあります。
  - いくつかのコンパイルエラーとリンクエラーは、libcc の `dist` 内のソースファイルやオブジェクトファイルが見つからないことが原因です。
9. libcc レポジトリ内の `./script/create-dist` を更新し、`dist` を再作成して Electron ブートストラップスクリプトをもう一度実行してください。

### コンパイルエラー修正のヒント
- ビルドコンフィグエラーを第一に修正します
- ファイルの欠損やコンパイラーのフラグと定義に関するエラーのような、致命的なエラーを優先して修正します。
- 複雑なエラーをできるだけ早く特定するようにします。
  - どうやって修正するのかがわからない場合は助けを求めてください。
- すべての Electron の機能を無効にし、ビルドを修正してから、それを1つずつ有効にします
- ビルド時の機能を無効にするビルドフラグを追加します。

Electron の Debug ビルドが成功したならば、以下のとおりテストを実行してください。 `$ npm run test` テストの失敗を修正します。

上記のすべての手順に従って、サポートされているすべてのプラットフォームで Electron のコードを修正してください。


## Crashpad の更新

Crashpad に関連するコンパイルエラーがある場合は、フォークを新しいリビジョンに更新する必要がある可能性があります。 このやり方については、[Crashpad の更新](upgrading-crashpad.md) を参照してください。


## NodeJS の更新

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

これについては、[Node の更新](upgrading-node.md) を参照してください。

## ffmpeg サポートの確認

Electron はデフォルトで独自のコーデックを含む `ffmpeg` のバージョンを提供しています。 これらのコーデックのないバージョンも、各リリースでビルドされて配布されます。 各 Chrome のアップグレードでは、このバージョンの切り替えが引き続きサポートされていることを確認する必要があります。

複数の `ffmpeg` ビルドに対する Electron のサポートを確認するには、次のページをロードします。 これは Electron と共に配布されているデフォルトの `ffmpeg` ライブラリで動作し、独自のコーデックなしで構築された `ffmpeg` ライブラリでは動作しません。

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Proprietary Codec Check</title>
  </head>
  <body>
    <p>Checking if Electron is using proprietary codecs by loading video from http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p>
    <p id="outcome"></p>
    <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
    <script>
      const video = document.querySelector('video')
      video.addEventListener('error', ({ target }) => {
        if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          document.querySelector('#outcome').textContent = 'Not using proprietary codecs, video emitted source not supported error event.'
        } else {
          document.querySelector('#outcome').textContent = `Unexpected error: ${target.error.code}`
        }
      })
      video.addEventListener('playing', () => {
        document.querySelector('#outcome').textContent = 'Using proprietary codecs, video started playing.'
      })
    </script>
  </body>
</html>
```

## 役に立つリンク

- [Chrome のリリース スケジュール](https://www.chromium.org/developers/calendar)
- [OmahaProxy](http://omahaproxy.appspot.com)
- [Chromium Issue トラッカー](https://bugs.chromium.org/p/chromium)
