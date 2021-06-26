# Instalação

npm install electron --save-dev O método preferido é instalar o Electron como uma dependência de desenvolvimento em seu app:

```sh
npm install electron --save-dev
```

Veja a [documentação de versionamento do Electron][versioning] para informação de como gerenciar as versões em seus aplicativos.

## Running Electron ad-hoc

If you're in a pinch and would prefer to not use `npm install` in your local project, you can also run Electron ad-hoc using the [`npx`][npx] command runner bundled with `npm`:

```sh
npx electron .
```

The above command will run the current working directory with Electron. Note that any dependencies in your app will not be installed.

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

Durante a instalação, o módulo `electron` vai se conectar para o [`@electron/get`][electron-get] para fazer o download de binários pré-construídos do Electron para a sua plataforma. Ele fará isso entrando em contato a página de lançamento da GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, onde `$VERSION` é a versão exata do Electron).

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

Como alternativa, você pode substituir o cache local. O `@electron/get` armazenará em cache os binários baixados em um diretório local para não estressar sua rede. Você pode usar essa pasta de cache para fornecer construções personalizadas do Electron ou evitar contato com a rede.

* Linux: `$XDG_CACHE_HOME` ou `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` ou `~/AppData/Local/electron/Cache/`

Em ambientes que usam versões mais antigas do Electron, você pode encontrar cache também em `~/.electron`.

Você também pode sobrescrever o local do cache local fornecendo uma variável `electron_config_cache` de ambiente.

The cache contains the version's official zip file as well as a checksum, stored as a text file. A typical cache might look like this:

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

Under the hood, Electron's JavaScript API binds to a binary that contains its implementations. Because this binary is crucial to the function of any Electron app, it is downloaded by default in the `postinstall` step every time you install `electron` from the npm registry.

However, if you want to install your project's dependencies but don't need to use Electron functionality, you can set the `ELECTRON_SKIP_BINARY_DOWNLOAD` environment variable to prevent the binary from being downloaded. For instance, this feature can be useful in continuous integration environments when running unit tests that mock out the `electron` module.

```sh npm2yarn
ELECTRON_SKIP_BINARY_DOWNLOAD=1 instalação npm
```

## Solução de Problemas

Ao executar o `npm install electron`, alguns usuários encontram erros de instalação.

Em quase todos os casos, esses problemas são resultado de problemas de rede e não de problemas reais com o pacote npm `electron`. Erros como `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, e `ETIMEDOUT` são resultados da falta de internet. A melhor solução é tentar trocar de rede, ou aguardar um pouco e tentar instalar novamente.

Se a instalação via `npm` falhar, você também pode tentar baixar o Electron diretamente do código fonte em [electron/electron/releases][releases].

Se a instalação falha com um erro `EACCESS`, você precisará [corrgir suas permissões do npm][npm-permissions].

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

[versioning]: ./electron-versioning.md
[npx]: https://docs.npmjs.com/cli/v7/commands/npx
[releases]: https://github.com/electron/electron/releases
[proxy-env-10]: https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables
[proxy-env]: https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config
[electron-get]: https://github.com/electron/get
[npm-permissions]: https://docs.npmjs.com/getting-started/fixing-npm-permissions
