# Goma

> Goma は Chromium や Android などのオープンソースプロジェクト向けに公開されたコンパイラサービスです。

Electron はカスタム Goma バックエンドのデプロイがあり、これはすべての Electron メンテナーが利用できます。  認証詳細情報については以下にある [アクセス](#access) の章を参照してください。  資格情報がない場合にデフォルトで使用される `cache-only` Goma エンドポイントもあります。  cache-only Goma へのリクエストはクラスターにヒットしませんが、キャッシュから読み取るためビルド時間が大幅に短縮されます。

## Goma を有効にする

現在、Goma の使用をサポートしている方法は、[ビルドツール](https://github.com/electron/build-tools) の使用のみです。 `build-tools` をセットアップすると、Goma の設定が自動的にインクルードされます。

あなたがメンテナーかつクラスターにアクセスできる場合は、Goma クラスターを使用する `build-tools` を構成するために `e init` を `--goma=cluster` 付きで実行するようにしてください。  既存のコンフィグがある場合は、`"goma": "cluster"` をコンフィグファイルにセットするだけです。

## Goma でのビルド

Goma を使用している場合、マシンで通常サポートされている値よりも大幅に大きい値の `j` で `ninja` を実行できます。

Windows や Linux では **200**、macOS では **50** より大きい値を設定しないでください。 Goma システムの使用状況は監視されており、不合理な並列実行で Goma システムを悪用していることが判明したユーザーは無効になります。

```bash
ninja -C out/Testing electron -j 200
```

`build-tools` を使用している場合、適切な `-j` の値が自動的に使用されます。

## Goma の監視

ローカルマシンで [http://localhost:8088](http://localhost:8088) にアクセスすると、Goma システムを通過するコンパイルジョブを監視できます。

## アクセス

For security and cost reasons, access to Electron's Goma cluster is currently restricted to Electron Maintainers.  アクセスしたい場合は、Slack の `#access-requests` にアクセスし、`@goma-squad` に連絡してアクセスを要求してください。  メンテナーであることはアクセスを *自動的に* 許可するものではなく、アクセスはその場に応じて許可されることに留意してください。

## Uptime / Support

We have automated monitoring of our Goma cluster and cache at https://status.notgoma.com

We do not provide support for usage of Goma and any issues raised asking for help / having issues will _probably_ be closed without much reason, we do not have the capacity to handle that kind of support.
