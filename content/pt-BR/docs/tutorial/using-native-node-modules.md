# Usando Módulos Nativos do Node

Módulos Node,js nativos são suportados pelo Electron, mas, como Electron tem uma [interface binária de aplicação (ABI)][abi] diferente da interface do Node.js (devido a diferenças como o uso do BoringSSL do Chromium ao invés do OpenSSL), os módulos nativos que você usar precisam ser recompilados para Electron. Caso contrário, você receberá a seguinte classe de erro quando você tentar executar seu aplicativo:

```sh
Erro: O módulo '/path/to/native/module.node'
foi compilado contra uma versão diferente do Node.js usando
NODE_MODULE_VERSION $XYZ. Esta versão do Node.js requer
NODE_MODULE_VERSION $ABC. Por favor, tente re-compilar ou reinstalar
o módulo (por exemplo, usando `npm rebuild` ou `npm install`).
```

## Como instalar módulos nativos

Existem várias maneiras diferentes de instalar módulos nativos:

### Instalando módulos e recopilando para Electron

You can install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`][electron-rebuild] package. Este módulo pode determinar automaticamente a versão do Electron e lidar com os passos manuais de baixar cabeçalhos e reconstruir módulos nativos para sua aplicação. If you are using [Electron Forge][electron-forge], this tool is used automatically in both development mode and when making distributables.

Por exemplo, para instalar a ferramenta standalone `electron-rebuild` e então reconstruir módulos com ela via linha de comando:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

Para mais informações sobre uso e integração com outras ferramentas como [Electron Packager][electron-packager], consulte o README do projeto.

### Usando `npm`

Definindo algumas variáveis de ambiente, você pode usar `npm` para instalar módulos diretamente.

Por exemplo, para instalar todas as dependências para Electron:

```sh
# Versão do Electron.
export npm_config_target=1.2.3
# A arquitetura do Electron, consulte https://electronjs.org/docs/tutorial/support#supported-platforms
# para obter arquiteturas suportadas.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download de headers para Electron.
export npm_config_disturl=https://electronjs.org/headers 
# Diga ao node-pre-gyp que estamos copilando para o Electron.
export npm_config_runtime=electron 
# Diga ao node-pre-gyp para copilar os módulos do código fonte.
export npm_config_build_from_source=true
# Instale todas as dependências e armazene cache para ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Construindo manualmente para Electron

Se você é um desenvolvedor que desenvolve um módulo nativo e quer testá-lo contra o Electron, você pode querer reconstruir o módulo do Electron manualmente. Você pode usar `node-gyp` diretamente para build no Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` muda onde encontrar cabeçalhos de desenvolvimento.
* `--target=1.2.3` é a versão do Electron.
* `--dist-url=...` especifica onde baixar os cabeçalhos.
* `--arch=x64` diz que o módulo foi construído para um sistema de 64-bit.

### Construindo manualmente para uma compilação personalizada do Electron

Para compilar módulos nativos do Node contra uma compilação personalizada do Electron que não corresponde a uma versão pública, instrua o `npm` para usar a versão do Node que você empacotou com sua compilação personalizada.

```sh
rebuild npm --nodedir=/path/to/electron/vendor/node
```

## Solução de Problemas

Se você instalou um módulo nativo e descobriu que ele não estava funcionando, você precisa verificar as seguintes coisas:

* Na dúvida, execute `electron-rebuild` primeiro.
* Certifique-se de que o módulo nativo é compatível com a plataforma de destino e a arquitetura para seu aplicativo Electron.
* Certifique-se de `win_delay_load_hook` não está definido como `false` no módulo `binding.gyp`.
* Depois de atualizar o Electron, você geralmente precisa reconstruir os módulos.

### Uma nota sobre `win_delay_load_hook`

No Windows, por padrão, `node-gyp` links nativos contra `node.dll`. No entanto, no Electron 4.x e superior, os símbolos necessários pelos módulos nativos são exportados pelo electron `. xe`, e não há `node.dll`. Para carregar módulos nativos no Windows, `node-gyp` instala um [gancho de carregamento de atraso ](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) que aciona quando o módulo nativo é carregado, e redireciona o nó `. ll` referência para usar o executável de carregamento em vez de procurar por `node. vai` na pesquisa da biblioteca caminho (que não iria aparecer nada). Como tal, no Electron 4.x e superior, `'win_delay_load_hook': 'true'` é necessário para carregar módulos nativos.

Se você receber um erro como o módulo `não se registrou`, ou `O procedimento
especificado não pôde ser encontrado`, isto pode significar que o módulo que você está tentando usar não incluiu corretamente o hook de atraso de carregamento.  Se o módulo for construído com node-gyp, certifique-se de que a variável `win_delay_load_hook` esteja definida como `verdadeiro` em o vínculo `. arquivo yp` e não está sendo sobrescrito em nenhum lugar.  Se o módulo for construído com outro sistema, você precisará garantir que você construa com um gancho de atraso instalado no `principal. ode` arquivo. Sua chamada de `link.exe` </code> deve ficar assim:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

Em particular, é importante que:

* você vincula contra `node.lib` do _Electron_ e não o Node. Se você conectar contra o `node.lib errado,` você receberá erros de carregamento quando precisar do módulo no Electron.
* você inclui a bandeira `/DELAYLOAD:node.exe`. Se o nó `. Link xe` não está atrasado, então o gancho de atraso não terá a chance de disparar e os símbolos do nó não serão corretamente resolvidos.
* `win_delay_load_hook.obj` está ligado diretamente à DLL final. Se o gancho for configurado em uma DLL dependente, não vai disparar no momento certo.

Veja [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) para um exemplo de hook de carregamento de atraso se você estiver implementando o seu próprio.

## Módulos que dependem da `pré-compilação`

[`pré-compilar`](https://github.com/prebuild/prebuild) fornece uma maneira de publicar módulos nativos do Node com binários pré-construídos para várias versões do Node e do Electron.

If the `prebuild`-powered module provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Módulos que dependem de `node-pre-gyp`

The [`node-pre-gyp` tool][node-pre-gyp] provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Sometimes those modules work fine under Electron, but when there are no Electron-specific binaries available, you'll need to build from source. Because of this, it is recommended to use `electron-rebuild` for these modules.

If you are following the `npm` way of installing modules, you'll need to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.

[abi]: https://en.wikipedia.org/wiki/Application_binary_interface
[electron-rebuild]: https://github.com/electron/electron-rebuild
[electron-forge]: https://electronforge.io/
[electron-packager]: https://github.com/electron/electron-packager
[node-pre-gyp]: https://github.com/mapbox/node-pre-gyp
