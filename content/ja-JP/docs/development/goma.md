# Goma

> Goma は Chromium や Android などのオープンソースプロジェクト向けに公開されたコンパイラサービスです。

Electron はカスタム Goma バックエンドのデプロイがあり、これはすべての Electron メンテナーが利用できます。  認証詳細情報については以下にある [アクセス](#access) の章を参照してください。  資格情報がない場合にデフォルトで使用される `cache-only` Goma エンドポイントもあります。  cache-only Goma へのリクエストはクラスターにヒットしませんが、キャッシュから読み取るためビルド時間が大幅に短縮されます。

## Goma を有効にする

現在、Goma の使用をサポートしている方法は、[ビルドツール](https://github.com/electron/build-tools) の使用のみです。 `build-tools` をセットアップすると、Goma の設定が自動的にインクルードされます。

あなたがメンテナーかつクラスターにアクセスできる場合は、Goma クラスターを使用する `build-tools` を構成するために `e init` を `--goma=cluster` 付きで実行するようにしてください。  If you have an existing config, you can just set `"goma": "cluster"` in your config file.

## Goma でのビルド

Goma を使用している場合、マシンで通常サポートされている値よりも大幅に大きい値の `j` で `ninja` を実行できます。

Please do not set a value higher than **200** on Windows or Linux and **50** on macOS. We monitor Goma system usage, and users found to be abusing it with unreasonable concurrency will be de-activated.

```bash
ninja -C out/Testing electron -j 200
```

If you're using `build-tools`, appropriate `-j` values will automatically be used for you.

## Goma の監視

ローカルマシンで [http://localhost:8088](http://localhost:8088) にアクセスすると、Goma システムを通過するコンパイルジョブを監視できます。

## アクセス

For security and cost reasons, access to Electron's Goma cluster is currently restricted to Electron Maintainers.  アクセスしたい場合は、Slack の `#access-requests` にアクセスし、`@goma-squad` に連絡してアクセスを要求してください。  メンテナーであることはアクセスを *自動的に* 許可するものではなく、アクセスはその場に応じて許可されることに留意してください。

## Uptime / Support

We have automated monitoring of our Goma cluster and cache at https://status.notgoma.com

We do not provide support for usage of Goma and any issues raised asking for help / having issues will _probably_ be closed without much reason, we do not have the capacity to handle that kind of support.
