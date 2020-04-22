# Instalação

To install prebuilt Electron binaries, use [`npm`](https://docs.npmjs.com). The preferred method is to install Electron as a development dependency in your app:

```sh
npm install electron --save-dev
```

Veja a [documentação de versionamento do Electron](./electron-versioning.md) para informação de como gerenciar as versões em seus aplicativos.

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

## Mirrors e Caches Customizados
Durante a instalação, o módulo `electron` vai se conectar para o [`electron-download`](https://github.com/electron-userland/electron-download) para fazer o download de binários pré-construídos do Electron para a sua plataforma. Ele fará isso entrando em contato a página de lançamento da GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, onde `$VERSION` é a versão exata do Electron).

Se você não conseguir acessar o GitHub ou precisar fornecer uma compilação personalizada, poderá fazê-lo fornecendo um espelho ou um diretório de cache existente.

#### Mirror (espelhamento)
Você pode usar variáveis de ambiente para substituir a URL base, o caminho no qual procurar por binários Electron e o nome do arquivo binário. A Url usada pelo `electron-download` é composta da seguinte maneira:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Por exemplo, para usar o mirror da China:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache
Como alternativa, você pode substituir o cache local. O `electron-download` armazenará em cache os binários baixados em um diretório local para não estressar sua rede. Você pode usar essa pasta de cache para fornecer construções personalizadas do Electron ou evitar contato com a rede.

* Linux: `$XDG_CACHE_HOME` ou `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` ou `~/AppData/Local/electron/Cache/`

Em ambientes que usam versões mais antigas do Electron, você pode encontrar cache também em `~/.electron`.

Você também pode sobrescrever o local do cache local fornecendo uma variável `ELECTRON_CACHE` de ambiente.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── electron-v1.7.9-darwin-x64.zip
├── electron-v1.8.1-darwin-x64.zip
├── electron-v1.8.2-beta.1-darwin-x64.zip
├── electron-v1.8.2-beta.2-darwin-x64.zip
├── electron-v1.8.2-beta.3-darwin-x64.zip
├── SHASUMS256.txt-1.7.9
├── SHASUMS256.txt-1.8.1
├── SHASUMS256.txt-1.8.2-beta.1
├── SHASUMS256.txt-1.8.2-beta.2
├── SHASUMS256.txt-1.8.2-beta.3
```

## Skip binary download
When installing the `electron` NPM package, it automatically downloads the electron binary.

This can sometimes be unnecessary, e.g. in a CI environment, when testing another component.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. Ex.:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 npm install
```

## Solução de Problemas

Ao executar o `npm install electron`, alguns usuários encontram erros de instalação.

Em quase todos os casos, esses problemas são resultado de problemas de rede e não de problemas reais com o pacote npm `electron`. Erros como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, e `ETIMEDOUT` são resultados da falta de internet. A melhor solução é tentar trocar de rede, ou aguardar um pouco e tentar instalar novamente.

Se a instalação via `npm` falhar, você também pode tentar baixar o Electron diretamente do código fonte em [electron/electron/releases](https://github.com/electron/electron/releases).

Se a instalação falha com um erro `EACCESS`, você precisará [corrgir suas permissões do npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

Se o erro acima persistir, o sinalizador

unsafe-perm</ 0> pode precisar ser definido como true:</p> 



```sh
sudo npm install electron --unsafe-perm=true
```


Em redes mais lentas, pode ser aconselhável usar o sinalizador `--verbose</ 0> para
mostrar o progresso do download:</p>

<pre><code class="sh">npm install --verbose electron
`</pre> 

Se você precisar forçar um novo download do ativo e o arquivo SHASUM, defina a variável force_no_cache</ 0> do ambiente para <code>true</ 0>.</p>
