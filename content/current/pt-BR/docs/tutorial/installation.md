# Instalação

Para instalar binários pré-compilados do Electron, use [`npm`](https://docs.npmjs.com). O método preferido é instalar o Electron como uma dependência de desenvolvimento em seu app:

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

* [Node 10 e superior](https://github.com/gajus/global-agent/blob/v2.1.5/README.md#environment-variables)
* [Antes do Node 10](https://github.com/np-maintain/global-tunnel/blob/v2.7.1/README.md#auto-config)

## Mirrors e Caches Customizados

Durante a instalação, o módulo `electron` irá chamar para [`@electron/get`](https://github.com/electron/get) para baixar os binários pré-construídos do Electron para sua plataforma. Ele fará isso entrando em contato a página de lançamento da GitHub (`https://github.com/electron/electron/releases/tag/v$VERSION`, onde `$VERSION` é a versão exata do Electron).

Se você não conseguir acessar o GitHub ou precisar fornecer uma compilação personalizada, poderá fazê-lo fornecendo um espelho ou um diretório de cache existente.

#### Mirror (espelhamento)

Você pode usar variáveis de ambiente para substituir a URL base, o caminho no qual procurar por binários Electron e o nome do arquivo binário. A URL usada por `@electron/get` é composta da seguinte forma:

```javascript
url = ELECTRON_MIRROR + ELECTRON_CUSTOM_DIR + '/' + ELECTRON_CUSTOM_FILENAME
```

Por exemplo, para usar o espelho CDN da China:

```shell
ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"
```

Por padrão, `ELECTRON_CUSTOM_DIR` está definido como `v$VERSION`. Para alterar o formato, use o espaço reservado `{{ version }}`. Por exemplo, `versão -{{ version }}` resolve para `versão 5.0.`, `{{ version }}` decide para `5.0.`, e `v{{ version }}` é equivalente ao padrão. Como um exemplo mais concreto, use o espelho não-CDN da China:

```shell
ELECTRON_MIRROR="https://npm.taobao.org/mirrors/electron/"
ELECTRON_CUSTOM_DIR="{{ version }}"
```

A configuração acima será baixada de URLs como `https://npm.taobao.org/mirrors/electron/8.0.0/electron-v8.0.0-linux-x64.zip`.

#### Cache

Como alternativa, você pode substituir o cache local. `@electron/get` irá armazenar em cache os binários baixados em um diretório local para não estressar a sua rede. Você pode usar essa pasta de cache para fornecer construções personalizadas do Electron ou evitar contato com a rede.

* Linux: `$XDG_CACHE_HOME` ou `~/.cache/electron/`
* macOS: `~/Library/Caches/electron/`
* Windows: `$LOCALAPPDATA/electron/Cache` ou `~/AppData/Local/electron/Cache/`

Em ambientes que usam versões mais antigas do Electron, você pode encontrar cache também em `~/.electron`.

Você também pode substituir o local de cache fornecendo uma variável de ambiente `electron_config_cache` .

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
