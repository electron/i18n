# Goma

> Goma は Chromium や Android などのオープンソースプロジェクト向けに公開されたコンパイラサービスです。

Electron はカスタム Goma バックエンドのデプロイがあり、これはすべての Electron メンテナーが利用できます。  認証詳細情報については以下にある [アクセス](#access) の章を参照してください。

## Goma を有効にする

現在 Electron Goma は Windows と Linux の両方をサポートしており、macOS サポートはそのうち追加する予定です。  サポート済みプラットフォームを使用している場合、`gn` の使用時に `goma.gn` コンフィグをインポートして Goma を有効にできます。

```bash
gn gen out/Testing --args="import(\"//electron/build/args/testing.gn\") import(\"//electron/build/args/goma.gn\")"
```

`cc_wrapper` が設定されているかどうかを確認してください。設定されていない場合は `sccache` や同様のテクノロジーを使用できないということです。

Before you can use goma to build Electron you need to authenticate against the Goma service.  You only need to do this once per-machine.

```bash
cd electron/external_binaries/goma
goma_auth.py login
```

Once authenticated you need to make sure the goma daemon is running on your machine.

```bash
cd electron/external_binaries/goma
goma_ctl.py ensure_start
```

## Building with Goma

When you are using Goma you can run `ninja` with a substantially higher `j` value than would normally be supported by your machine.  Please do not set a value higher than **300**, we monitor the goma system and users found to be abusing it with unreasonable concurrency will be de-activated.

```bash
ninja -C out/Testing electron -j 200
```

## Monitoring Goma

If you access [http://localhost:8088](http://localhost:8088) on your local machine you can monitor compile jobs as they flow through the goma system.

## アクセス

For security and cost reasons access to Electron Goma is currently restricted to Electron Maintainers.  If you want access please head to `#access-requests` in Slack and ping `@goma-squad` to ask for access.  Please be aware that being a maintainer does not *automatically* grant access and access is determined on a case by case basis.
