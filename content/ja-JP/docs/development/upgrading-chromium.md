# Chromium のアップグレード

これは、Electron で Chromium をアップグレードするために必要な手順の概要です。

- 新しい Chromium バージョンへ libcc をアップグレードする
- Electron のコードに新しい libcc との互換性を持たせる
- 必要に応じて Electron の依存ファイルを更新する (crashpad、NodeJS、etc.)。
- libcc と electron の内部ビルドを作る
- 必要であれば Electron ドキュメントを更新する

## 新しい Chromium バージョンへ `libcc` をアップグレードする

1. コードを取得してプロジェクトを初期化します。 
      sh
      $ git clone git@github.com:electron/libchromiumcontent.git
      $ cd libchromiumcontent
      $ ./script/bootstrap -v

2. Chromium スナップショットを更新します 
  - [OmahaProxy](https://omahaproxy.appspot.com/) からバージョン番号を選択して `VERSION` ファイルを更新します 
    - これはブラウザで OmahaProxy に手動でアクセスするか、以下のようにして自動的に行うことができます。
    - 最新の安定 mac 版は一行でこのようになります。`curl -so- https://omahaproxy.appspot.com/mac > VERSION`
    - 最新のベータ win64 版は一行でこのようになります。`curl -so- https://omahaproxy.appspot.com/all | grep "win64,beta" | awk -F, 'NR==1{print $3}' > VERSION`
  - `$ ./script/update を実行します` 
    - お茶でも淹れましょう。これは30分以上かかります。
    - おそらく、パッチ適用には失敗するでしょう。
3. `patches/` と `patches-mas/` フォルダの `*.patch` ファイルを修正します。
4. (任意) `script/update` はパッチを適用しますが、複数の試行が必要な場合は呼び出しを `update` する同じスクリプトをこのように手動で実行できます。 `$ ./script/apply-patches` 
  - もう一つ有用なスクリプト `script/patch.py` があります。 より詳しくは `./script/patch.py -h` を読んでください。
5. すべてのパッチをエラーなく適用できれば、ビルドを実行します 
  - `$ ./script/build`
  - 一部のパッチが Chromium コードと互換性がなくなった場合は、コンパイルエラーを修正してください。
6. ビルドに成功すれば、Electron に `dist` を作成します 
  - `$ ./script/create-dist --no_zip` 
    - libcc リポジトリのルートに `dist/main` フォルダが作成されます。 Electron をビルドするには、これが必要です。
7. (任意) 削除または名前を変更したファイルが原因でエラーがある場合は、スクリプトの内容を更新します。 (`--no-zip` はスクリプトが `dist` アーカイブを作成するのを防ぎます。 このアーカイブは必要ありません。)

## Electron のコードを更新する

1. コードを取得する。 
      sh
      $ git clone git@github.com:electron/electron.git
      $ cd electron

2. マシン上に独自のリポジトリで libcc をビルドしている場合は、以下のように Electron にそれを使用するよう伝えてください。 
      sh
      $ ./script/bootstrap.py -v \
        --libcc_source_path <libcc_folder>/src \
        --libcc_shared_library_path <libcc_folder>/shared_library \
        --libcc_static_library_path <libcc_folder>/static_library

3. まだ libcc をビルドしていないのにすでに新しい Chromium にアップグレードする予定がある場合は、いつものように Electron をブートストラップしてください。`$ ./script/bootstrap.py -v`
  
  - libcc サブモジュール (`vendor/libchromiumcontent`) が正しいリビジョンを指していることを確認します

4. `script/update-clang.sh` 内の `CLANG_REVISION` を Chromium が使用しているバージョンに一致するようにセットします。
  
  - `electron/libchromiumcontent/src/tools/clang/scripts/update.py` にあります。

5. まだチェックアウトしていない場合は Chromium をチェックアウトしてください。
  
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py 
    - (上記 URL の `{VERSION}` プレースホルダを libcc が使用する Chromium のバージョンに置き換えてください。)
6. Electron をビルドします。 
  - Try to build Debug version first: `$ ./script/build.py -c D`
  - You will need it to run tests
7. Fix compilation and linking errors
8. Ensure that Release build can be built too 
  - `$ ./script/build.py -c R`
  - Often the Release build will have different linking errors that you'll need to fix.
  - Some compilation and linking errors are caused by missing source/object files in the libcc `dist`
9. Update `./script/create-dist` in the libcc repo, recreate a `dist`, and run Electron bootstrap script once again.

### Tips for fixing compilation errors

- Fix build config errors first
- Fix fatal errors first, like missing files and errors related to compiler flags or defines
- Try to identify complex errors as soon as possible. 
  - Ask for help if you're not sure how to fix them
- Disable all Electron features, fix the build, then enable them one by one
- Add more build flags to disable features in build-time.

When a Debug build of Electron succeeds, run the tests: `$ ./script/test.py` Fix the failing tests.

Follow all the steps above to fix Electron code on all supported platforms.

## Updating Crashpad

If there are any compilation errors related to the Crashpad, it probably means you need to update the fork to a newer revision. See [Upgrading Crashpad](upgrading-crashpad.md) for instructions on how to do that.

## Updating NodeJS

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

See [Upgrading Node](upgrading-node.md) for instructions on this.

## Verify ffmpeg support

Electron ships with a version of `ffmpeg` that includes proprietary codecs by default. A version without these codecs is built and distributed with each release as well. Each Chrome upgrade should verify that switching this version is still supported.

You can verify Electron's support for multiple `ffmpeg` builds by loading the following page. It should work with the default `ffmpeg` library distributed with Electron and not work with the `ffmpeg` library built without proprietary codecs.

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
      video.addEventListener('error', ({target}) => {
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

## Useful links

- [Chrome のリリース スケジュール](https://www.chromium.org/developers/calendar)
- [OmahaProxy](http://omahaproxy.appspot.com)
- [Chromium Issue Tracker](https://bugs.chromium.org/p/chromium)