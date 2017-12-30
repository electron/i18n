# Instalação

> Dicas para instalar o elétron

Para instalar os binários do Electro, use o [`npm`](https://docs.npmjs.com/). O método preferido é instalar o Electron com uma dependência em seu projeto:

```sh
npm install electron --save-dev
```

Veja a documentação de versionamento do Electron para informação de como gerenciar as versões em seus aplicativos.

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

Ao executar o `npm install electron`, alguns usuários encontram erros de instalação.

Geralmente esses erros são resultados de problemas com a falta de conexão de internet e não é relacionado ao pacote npm do `Electron`. Erros como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, e `ETIMEDOUT` são resultados da falta de internet. A melhor solução é tenta troca de rede, ou esperar um pouco e tenta instalar novamente o pacote.

Você também pode tentar baixa o Electron diretamente do [electron/electron/releases](https://github.com/electron/electron/releases). se a instalação via `npm` falha.

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