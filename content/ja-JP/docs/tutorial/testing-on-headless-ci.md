# ヘッドレスCIシステムでのテスト (Travis CI, Jenkins)

Chromium ベースであるが故に、 Electron の動作にはディスプレイドライバが必要です。 もし Chromium がディスプレイドライバを見つけられない場合、Electron は起動に失敗します。そのため、実行方法に関わらずテストを実行できません。 Travis、Circle、Jenkins などのシステムで Electron ベースのアプリをテストするには、ちょっとした設定が必要です。 要するに、仮想ディスプレイドライバを使う必要があります。

## 仮想ディスプレイの構成

まず、[Xvfb](https://en.wikipedia.org/wiki/Xvfb) をインストールします。 これは仮想フレームバッファで、X11 ディスプレイサーバプロトコルを実装しています。このフレームバッファは、画面出力を行うことなくメモリ内ですべてのグラフィック操作を行います。

それから、仮想 Xvfb スクリーンを作成し、DISPLAY 環境変数でそれを指定します。 Electron の Chromium は自動的に `$DISPLAY` を探してくれるので、アプリの設定は特に必要ありません。 このステップは、Anaïs Betts 氏の [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe) で自動化できます。テストコマンドに `xvfb-maybe` を加えると、この小さなツールは必要な場合に自動で Xvfb を設定します。 Windows や macOS では何もしません。

```sh
## Windows や macOS はelectron-mochaを起動します。
## Linuxで ヘッドレス環境の場合、これは
## xvfb-run electron-mocha ./test/*.js と同じです。
xvfb-maybe electron-mocha ./test/*.js
```

### Travis CI

Travisにおいては、 `.travis.yml` を以下のようなものにしてください。

```yml
addons:
  apt:
    packages:
      - xvfb

install:
  - export DISPLAY=':99.0'
  - Xvfb :99 -screen 0 1024x768x24 > /dev/null 2>&1 &
```

### Jenkins

Jenkins 用の [Xvfb プラグインが利用可能です](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin)。

### Circle CI

Circle CI はよくできており、 Xvfb と `$DISPLAY` が [すでにセットアップされているのでこれ以上の設定は不要](https://circleci.com/docs/environment#browsers) です。

### AppVeyor

Windows上で AppVeyor は実行します。また Selenium、 Chromium、 Electron またそれに類似したツールをすぐに使用できます。 - 設定は必要ありません。
