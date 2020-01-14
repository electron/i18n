# Goma

> Goma は Chromium や Android などのオープンソースプロジェクト向けに公開されたコンパイラサービスです。

Electron はカスタム Goma バックエンドのデプロイがあり、これはすべての Electron メンテナーが利用できます。  認証詳細情報については以下にある [アクセス](#access) の章を参照してください。

## Goma を有効にする

現在 Electron Goma は Windows、Linux、macOS をサポートしています。  If you are on a supported platform you can enable goma by importing the `goma.gn` config file when using `gn`.

```bash
gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") import(\"//electron/build/args/goma.gn\")"
```

`cc_wrapper` が設定されているかどうかを確認してください。設定されていない場合は `sccache` や同様のテクノロジーを使用できないということです。

Goma を使用して Electron を構築する前に、Goma サービスに対して認証する必要があります。  これはマシンにつき一度だけ行う必要があります。

```bash
cd electron/external_binaries/goma
goma_auth.py login
```

認証されたら Goma デーモンをマシンで必ず実行してください。

```bash
cd electron/external_binaries/goma
goma_ctl.py ensure_start
```

## Goma でのビルド

Goma を使用している場合、マシンで通常サポートされている値よりも大幅に大きい値の `j` で `ninja` を実行できます。

Please do not set a value higher than **300** on Windows or Linux and **80** on macOS, we monitor the goma system and users found to be abusing it with unreasonable concurrency will be de-activated.

```bash
ninja -C out/Testing electron -j 200
```

## Goma の監視

ローカルマシンで [http://localhost:8088](http://localhost:8088) にアクセスすると、Goma システムを通過するコンパイルジョブを監視できます。

## アクセス

現在、セキュリティとコストの理由により Electron Goma へのアクセスは Electron メンテナーに制限されています。  アクセスしたい場合は、Slack の `#access-requests` にアクセスし、`@goma-squad` に連絡してアクセスを要求してください。  メンテナーであることはアクセスを *自動的に* 許可するものではなく、アクセスはその場に応じて許可されることに留意してください。
