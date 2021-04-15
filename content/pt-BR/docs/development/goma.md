# Goma

> Goma é um serviço distribuído de compilador para projetos open-source como Chromium e Android.

O Electron possui uma implantação de um Backend Goma personalizado que nós deixamos disponível para todos que fazem a manutenção do Electron.  Veja a seção [Acesso](#access) abaixo para detalhes sobre autenticação.  Existe também um endpoint Goma `cache-only` que será usado por padrão caso você não tenha credenciais.  Requisições para o cache-only Goma não chamará nosso cluster, mas lerá do nosso cache, o que deve resultar em tempos de build significativamente mais rápidos.

## Habilitando o Goma

Atualmente, a única maneira suportada de utilizar o Goma é usando nossas [Ferramentas de Construção](https://github.com/electron/build-tools). Uma configuração do Goma é automaticamente incluída quando você configurar as `build-tools`.

If you are a maintainer and have access to our cluster, please ensure that you run `e init` with `--goma=cluster` in order to configure `build-tools` to use the Goma cluster.  If you have an existing config, you can just set `"goma": "cluster"` in your config file.

## Building with Goma

When you are using Goma you can run `ninja` with a substantially higher `j` value than would normally be supported by your machine.

Please do not set a value higher than **200** on Windows or Linux and **50** on macOS. We monitor Goma system usage, and users found to be abusing it with unreasonable concurrency will be de-activated.

```bash
ninja -C out/Testing electron -j 200
```

If you're using `build-tools`, appropriate `-j` values will automatically be used for you.

## Monitoring Goma

If you access [http://localhost:8088](http://localhost:8088) on your local machine you can monitor compile jobs as they flow through the goma system.

## Acesso

For security and cost reasons, access to Electron's Goma cluster is currently restricted to Electron Maintainers.  If you want access please head to `#access-requests` in Slack and ping `@goma-squad` to ask for access.  Please be aware that being a maintainer does not *automatically* grant access and access is determined on a case by case basis.

## Uptime / Support

We have automated monitoring of our Goma cluster and cache at https://status.notgoma.com

We do not provide support for usage of Goma and any issues raised asking for help / having issues will _probably_ be closed without much reason, we do not have the capacity to handle that kind of support.
