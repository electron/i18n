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

Se você necessitar usar um HTTP proxy, é preciso adicionar a variável para múltiplos valores,`ELECTRON_GET_USE_PROXY`, além das variáveis de ambientes adicionais, dependendo da versão do Node:

* [Node 10 and above](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Before Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Mirrors e Caches Customizados
During installation, the `electron` module will call out to [`@electron/get`](https://github.com/electron/get) to download prebuilt binaries of Electron for your platform. Ele fará isso entrando em contato a página de lançamento da GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, onde `$VERSION` é a versão exata do Electron).

Se você não conseguir acessar o GitHub ou precisar fornecer uma compilação personalizada, poderá fazê-lo fornecendo um espelho ou um diretório de cache existente.

#### Mirror (espelhamento)
Você pode usar variáveis de ambiente para substituir a URL base, o caminho no qual procurar por binários Electron e o nome do arquivo binário. The URL used by `@electron/get` is composed as follows:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

For instance, to use the China CDN mirror:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

By default, `ELECTRON_CUSTOM_DIR` is set to `v$VERSION`. To change the format, use the `{{ version }}` placeholder. For example, `version-{{ version }}` resolves to `version-5.0.0`, `{{ version }}` resolves to `5.0.0`, and `v{{ version }}` is equivalent to the default. As a more concrete example, to use the China non-CDN mirror:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

The above configuration will download from URLs such as `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Cache
Como alternativa, você pode substituir o cache local. `@electron/get` will cache downloaded binaries in a local directory to not stress your network. Você pode usar essa pasta de cache para fornecer construções personalizadas do Electron ou evitar contato com a rede.

* Linux: `$XDG_CACHE_HOME` ou `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` ou `~/AppData/Local/electron/Cache/`

Em ambientes que usam versões mais antigas do Electron, você pode encontrar cache também em `~/.electron`.

You can also override the local cache location by providing a `electron_config_cache` environment variable.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

```sh
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9electron-v1.7.9-darwin-x64.zip
│   └── electron-v1.7.9-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.7.9SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1electron-v1.8.1-darwin-x64.zip
│   └── electron-v1.8.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1electron-v1.8.2-beta.1-darwin-x64.zip
│   └── electron-v1.8.2-beta.1-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.1SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2electron-v1.8.2-beta.2-darwin-x64.zip
│   └── electron-v1.8.2-beta.2-darwin-x64.zip
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.2SHASUMS256.txt
│   └── SHASUMS256.txt
├── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3electron-v1.8.2-beta.3-darwin-x64.zip
│   └── electron-v1.8.2-beta.3-darwin-x64.zip
└── httpsgithub.comelectronelectronreleasesdownloadv1.8.2-beta.3SHASUMS256.txt
    └── SHASUMS256.txt
```

## Skip binary download
When installing the `electron` NPM package, it automatically downloads the electron binary.

This can sometimes be unnecessary, e.g. in a CI environment, when testing another component.

To prevent the binary from being downloaded when you install all npm dependencies you can set the environment variable `ELECTRON_SKIP_BINARY_DOWNLOAD`. E.g.:
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
