# Instalação

> Dicas para instalar o elétron

Para instalar os binários do Electro, use o [`npm`](https://docs.npmjs.com/). O método preferido é instalar o Electron com uma dependência em seu projeto:

```sh
npm install electron --save-dev --save-exact
```

A opção `--save-exact` é recomendada uma vez que o Electron não segue semântica de versionamento. Veja a [documentação](https://electron.atom.io/docs/tutorial/electron-versioning/) para obter informações de como gerenciar as versões do Electron em suas aplicações.

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

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.