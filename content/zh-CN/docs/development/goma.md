# 戈马

> Goma是一款很多开源项目都在使用的分布式编译服务，例如Chromium和Android。

电子有一个自定义Goma后端的部署，我们提供给 所有电子维护器。  有关身份验证的详细信息，请参阅下面的 [访问](#access) 部分 。  还有一个 `cache-only` Goma 端点，如果您没有凭据，默认情况下将 使用。  仅存缓存 Goma 的请求不会击中我们的群集，但会从我们的缓存中读取，并应在显著加快构建速度时 。

## 启用戈马

目前使用Goma的唯一支持方式是使用我们的 [构建工具](https://github.com/electron/build-tools)。 当您设置 `build-tools`时，Goma 配置将自动包含在内。

如果您是维护者并能够访问我们的群集，请确保您使用 `--goma=cluster` 运行 `e init` ，以便配置 `build-tools` Goma群集中使用。  如果您有一个现有的配置，您可以在配置文件中设置 `"goma": "cluster"` 。

## 与戈马一起建造

当您使用 Goma 时，您可以运行 `ninja` ，其 `j` 值远远高于通常由您的机器支持。

请不要在 Windows 或 Linux 上设置高于 200</strong> **值，在 macOS 上 **50** 。 我们监控Goma系统的使用情况，发现用户滥用 不合理的并发将予以解激活。</p>

```bash
忍者-C出/测试电子-j 200
```

如果您使用 `build-tools`，适当的 `-j` 值将自动 用于您。

## 监测戈马

如果您在本地 机上访问 [http://localhost:8088](http://localhost:8088) ，您可以在编译作业流经goma系统时进行监控。

## 访问

出于安全和成本原因，目前仅限于电子维护器 使用电子的Goma集群。  如果你想访问，请前往 `#access-requests` 在 Slack和ping `@goma-squad` 要求访问。  请注意，作为一名 维护者不会自动 ** 授予访问权限，访问权限是根据 个案逐一确定的。

## 正常工作时间/支持

我们对Goma集群进行自动监控，并在 https://status.notgoma.com 缓存

我们不支持使用Goma，任何提出的寻求帮助/有 问题的问题 _可能_ 无缘无故地关闭，我们没有能力处理 这种支持。
