# Usando Módulos Nativos do Node

Módulos nativos do nó são suportados pelo Electron, mas já que o Electron é muito provável que use uma diferente versão V8 do binário do Node instalado no seu sistema , os módulos que você usa precisam ser recalculados para o Electron. Caso contrário, você receberá a seguinte classe de erro quando você tentar executar seu aplicativo:

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

Você pode instalar módulos como outros projetos Node, e então reconstruir os módulos para Electron com o pacote [`electron-rebuild`](https://github.com/electron/electron-rebuild). Este módulo pode determinar automaticamente a versão do Electron e lidar com os passos manuais de baixar cabeçalhos e reconstruir módulos nativos para sua aplicação.

Por exemplo, para instalar o `electron-rebuild` e depois reconstruir módulos com ele através da linha de comando:

```sh
npm install --save-dev electron-rebuild

# toda vez que você executar "npm install", execute isto:
./node_modules/. in/electron-rebuild

# No Windows se tiver problemas, tente:
.\node_modules\.bin\electron-rebuild.cmd
```

Para mais informações sobre uso e integração com outras ferramentas, consulte o README do projeto .

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

- você vincula contra `node.lib` do _Electron_ e não o Node. Se você conectar contra o `node.lib errado,` você receberá erros de carregamento quando precisar do módulo no Electron.
- você inclui a bandeira `/DELAYLOAD:node.exe`. Se o nó `. Link xe` não está atrasado, então o gancho de atraso não terá a chance de disparar e os símbolos do nó não serão corretamente resolvidos.
- `win_delay_load_hook.obj` está ligado diretamente à DLL final. Se o gancho for configurado em uma DLL dependente, não vai disparar no momento certo.

Veja [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) para um exemplo de hook de carregamento de atraso se você estiver implementando o seu próprio.

## Módulos que dependem da `pré-compilação`

[`pré-compilar`](https://github.com/prebuild/prebuild) fornece uma maneira de publicar módulos nativos do Node com binários pré-construídos para várias versões do Node e do Electron.

Se os módulos fornecem binários para o uso no Electron, certifique-se de omitir `--build-from-source` e a variável `npm_config_build_from_source` ambiente para aproveitar ao máximo os binários pré-construídos.

## Módulos que dependem de `node-pre-gyp`

A ferramenta [`node-pre-gyp`](https://github.com/mapbox/node-pre-gyp) fornece uma maneira de implantar módulos nativos com binários pré-construídos, e muitos módulos populares estão usando-os.

Geralmente, esses módulos funcionam bem com o Electron, mas às vezes quando o Electron usa uma versão mais recente do V8 do que o Node e/ou existem mudanças no ABI, coisas ruins podem acontecer. Então em geral, é recomendado sempre construir módulos nativos a partir de código-fonte. `electron-rebuild` lida com isso para você automaticamente.

Se você estiver seguindo a forma `npm` de instalar módulos, então isso é feito por padrão, se não, você tem que passar `--build-from-source` para `npm`, ou defina a variável de ambiente `npm_config_build_from_source`.
