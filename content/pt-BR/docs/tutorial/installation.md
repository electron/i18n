# Instalação

Para instalar os binários do Electro, use o [`npm`](https://docs.npmjs.com). O método preferido é instalar o Electron com uma dependência em seu projeto:

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

During installation, the `electron` module will call out to [`electron-download`](https://github.com/electron-userland/electron-download) to download prebuilt binaries of Electron for your platform. It will do so by contacting GitHub's release download page (`https://github.com/electron/electron/releases/tag/v$VERSION`, where `$VERSION` is the exact version of Electron).

If you are unable to access GitHub or you need to provide a custom build, you can do so by either providing a mirror or an existing cache directory.

#### Mirror

You can use environment variables to override the base URL, the path at which to look for Electron binaries, and the binary filename. The url used by `electron-download` is composed as follows:

```txt
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China mirror:

```txt
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
```

#### Cache

Alternatively, you can override the local cache. `electron-download` will cache downloaded binaries in a local directory to not stress your network. You can use that cache folder to provide custom builds of Electron or to avoid making contact with the network at all.

* Linux: `$XDG_CACHE_HOME` ou `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` ou `~/AppData/Local/electron/Cache/`

On environments that have been using older versions of Electron, you might find the cache also in `~/.electron`.

You can also override the local cache location by providing a `ELECTRON_CACHE` environment variable.

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

## Solução de Problemas

Ao executar o `npm install electron`, alguns usuários encontram erros de instalação.

Em quase todos os casos, esses problemas são resultado de problemas de rede e não de problemas reais com o pacote npm `electron`. Erros como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, e `ETIMEDOUT` são resultados da falta de internet. The best resolution is to try switching networks, or wait a bit and try installing again.

Se a instalação via `npm` falhar, você também pode tentar baixar o Electron diretamente do código fonte em [electron/electron/releases](https://github.com/electron/electron/releases).

Se a instalação falha com um erro `EACCESS`, você precisará [corrgir suas permissões do npm](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` environment variable to `true`.