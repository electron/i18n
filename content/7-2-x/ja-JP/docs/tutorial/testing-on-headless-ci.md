# ヘッドレスCIシステムでのテスト (Travis CI, Jenkins)

Chromiumベースであるため、 Electronは機能するためにディスプレイドライバを要求します。 もし、Chromiumがディスプレイドライバを見つけられない場合、Electronは起動に失敗します。そのため、あなたがどのように実行するかに関わらず、あなたのテストは実行できません。 Travis, Circle, Jenkins または類似したシステム上でElectronベースアプリケーションのテストには、少し設定が必要になります。 つまり私たちには、仮想ディスプレイドライバが必要です。

## 仮想ディスプレイの構成

最初に、[Xvfb](https://en.wikipedia.org/wiki/Xvfb)をインストールします。 これは仮想フレームバッファでありX11ディスプレイサーバープロトコルを実装しています。- またこれは全てのグラフィック操作をメモリ上で画面に表示することなく実行するので、これはまさに私たちの求めていたものです。

それから、仮想 Xvfb スクリーンを作成し、DISPLAY 環境変数でそれを指定します。 ElectronのChromium は自動的に`$DISPLAY`を探しますので、あなたのアプリケーションにこれ以上の設定は不要になります。 このステップは、Anaïs Betts 氏の [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe) で自動化できます。テストコマンドに `xvfb-maybe` を加えると、この小さなツールは必要な場合に自動で Xvfb を設定します。 Windows や macOSでは何もしません。

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
