# Instalação

> Dicas para instalar o elétron

Para instalar os binários do Electro, use o [`npm`](https://docs.npmjs.com/). O método preferido é instalar o Electron com uma dependência em seu projeto:

```sh
npm install electron --save-dev
```

See the [Electron versioning doc](electron-versioning.md) for info on how to manage Electron versions in your apps.

## Instalação Global

Você também pode instalar o comando `Electron` globalmente em seu `$PATH`:

```sh
npm install electron -g
```

## Personalização

Se você quer alterar a arquitetura que é baixada (Ex: `ia32` em uma máquina `x64`), você pode usar a opção `--arch` com npm install ou definir a variável de ambiente `npm_config_arch`:

```shell
npm install --arch=ia32 electron
```

Além de alterar a arquitetura, você pode também especificar a plataforma (ex: `win32`, `linux`, etc.) usando a opção `--platform`:

```shell
npm install --platform=win32 electron
```

## Proxies

Se você precisar usar um proxy HTTP você pode [definir estas variáveis de ambiente](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Solução de Problemas

Ao executar `npm install electron`, alguns usuários ocasionalmente encontram erros de instalação.

Em quase todos os casos, esses problemas são resultado de problemas de rede e não de problemas reais com o pacote npm `electron`. Erros como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET` e `ETIMEDOUT`, são todas indicações de tais problemas de rede. A melhor solução é tentar trocar de rede ou aguardar um pouco e tentar instalar novamente.

Você pode também baixar Electron diretamente [electron/electron/releases](https://github.com/electron/electron/releases) se a instalação via `npm` estiver falhando.

Se a instalação falha com um erro `EACCESS`, você precisará [corrgir suas permissões do npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Se o erro acima persistir, você deve definir a opção [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) como "true":

```sh
sudo npm install electron --unsafe-perm=true
```

Em redes mais lentas, pode ser aconselhável usar opção `--verbose` para exibir o progresso do download:

```sh
npm install --verbose electron
```

Se você precisar forçar um novo download do recurso e do arquivo SHANSUM, defina a variável de ambiente `force_no_cache` com o valor `true`.