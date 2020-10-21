# Instalação

To install prebuilt Electron binaries, use [`npm`][npm]. O método preferido é instalar o Electron como uma dependência de desenvolvimento em seu app:

```sh
npm install electron --save-dev
```

Veja a [documentação de versionamento do Electron][versioning] para informação de como gerenciar as versões em seus aplicativos.

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

Se você necessitar usar um HTTP proxy, é preciso adicionar a variável para múltiplos valores,`ELECTRON_GET_USE_PROXY`, além das variáveis de ambientes adicionais, dependendo da versão do Node:

* [Node 10 e superior][proxy-env-10]
* [Antes do Node 10][proxy-env]

## Mirrors e Caches Customizados
During installation, the `electron` module will call out to [`@electron/get`][electron-get] to download prebuilt binaries of Electron for your platform. Ele fará isso entrando em contato a página de lançamento da GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, onde `$VERSION` é a versão exata do Electron).

Se você não conseguir acessar o GitHub ou precisar fornecer uma compilação personalizada, poderá fazê-lo fornecendo um espelho ou um diretório de cache existente.

#### Mirror (espelhamento)
Você pode usar variáveis de ambiente para substituir a URL base, o caminho no qual procurar por binários Electron e o nome do arquivo binário. The url used by `@electron/get` is composed as follows:

```plaintext
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Por exemplo, para usar o mirror da China:

```plaintext
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

#### Cache
Como alternativa, você pode substituir o cache local. `@electron/get` irá armazenar em cache os binários baixados em um diretório local para não estressar a sua rede. Você pode usar essa pasta de cache para fornecer construções personalizadas do Electron ou evitar contato com a rede.

* Linux: `$XDG_CACHE_HOME` ou `~/.cache/electron/`
* MacOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` ou `~/AppData/Local/electron/Cache/`

Em ambientes que usam versões mais antigas do Electron, você pode encontrar cache também em `~/.electron`.

Você também pode sobrescrever o local do cache local fornecendo uma variável `ELECTRON_CACHE` de ambiente.

O cache contém o arquivo zip oficial da versão, bem como uma soma de verificação, armazenada como um arquivo de texto. Um cache típico pode se parecer com isto:

```sh
── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
── electron-v1.7.9-darwin-x64.zip
─── httpsgithub.comelectronreleasesdownloadv1.7.9SHASUMS256.txt
── SHASUMS256.txt
── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64. ip
├── electron-v1.8.1-darwin-x64.zip
── httpsgithub.comelectronreleasesdownloadv1.8.1SHASUMS256.txt
── SHASUMS256.txt
─ httpsgithub. omelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
── electron-v1.8.2-beta.1-darwin-x64.zip
── httpsgithub. omelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
├── SHASUMS256.txt
── httpsgithub.comelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
─── electron-v1.8.2-beta.2-darwin-x64.zip
── httpsgithubelectronreleasesdownloadv1.8.2-beta. SHASUMS256.txt
├── SHASUMS256.txt
─ httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64. ip
├── electron-v1.8.2-beta.3-darwin-x64.zip
── httpsgithub.comelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    ── SHASUMS256.txt
```

## Pular download binário
Ao instalar o `electron` pacote NPM, ele baixa automaticamente o binário de elétrons.

Às vezes, isso pode ser desnecessário, por exemplo, em um ambiente CI, ao testar outro componente.

Para evitar que o binário seja baixado quando você instalar todas as dependências npm, você pode definir a variável de ambiente `ELECTRON_SKIP_BINARY_DOWNLOAD`. Ex:
```sh
ELECTRON_SKIP_BINARY_DOWNLOAD=1 instalação npm
```

## Solução de Problemas

Ao executar o `npm install electron`, alguns usuários encontram erros de instalação.

Em quase todos os casos, esses problemas são resultado de problemas de rede e não de problemas reais com o pacote npm `electron`. Erros como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, e `ETIMEDOUT` são resultados da falta de internet. A melhor solução é tentar trocar de rede, ou aguardar um pouco e tentar instalar novamente.

You can also attempt to download Electron directly from [electron/electron/releases][releases] if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions][npm-permissions].

If the above error persists, the [unsafe-perm][unsafe-perm] flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

Em redes mais lentas, pode ser aconselhável usar o sinalizador `--verbose</ 0> para
mostrar o progresso do download:</p>

<pre><code class="sh">npm install --verbose electron
`</pre>

Se você precisar forçar um novo download do ativo e o arquivo SHASUM, defina a variável force_no_cache</ 0> do ambiente para <code>true</ 0>.</p>

[npm]: https://docs.npmjs.com
[versioning]: ./electron-versioning.md
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
[unsafe-perm]: https://docs.npmjs.com/misc/config#unsafe-perm
