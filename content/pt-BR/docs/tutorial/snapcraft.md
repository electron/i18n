# Guia do Snapcraft (Central de Software Ubuntu & Mais)

Este guia fornece informações sobre como empacotar seu aplicativo Electron para qualquer ambiente Snapcraft, incluindo o Centro de Software Ubuntu.

## Contexto e Requisitos

Junto com a comunidade mais ampla do Linux, Canônica visa corrigir muitos dos problemas comuns de instalação de software com o projeto [`snapcraft`](https://snapcraft.io/) . Os snaps são pacotes de software containerized que incluem as necessárias dependências, atualização automática e funcionam em todas as principais distribuições Linux sem a modificação de sistema .

Existem três maneiras de criar um arquivo `.snap`:

1) Utilizando [`electron-forge`][electron-forge] ou [`electron-builder`][electron-builder], ambas as ferramentas que vêm com suporte `snap` fora da caixa. Esta é a opção mais fácil. 2) Usando `electron-installer-snap`, que leva a saída do `electron-packager`. 3) Usando um pacote `.deb` já criado.

Em alguns casos, você precisará ter a ferramenta `snapcraft` instalada. Instruções para instalar `snapcraft` para sua distribuição específica estão disponíveis [aqui](https://snapcraft.io/docs/installing-snapcraft).

## Usando `electron-installer-snap`

O módulo funciona como [`electron-winstaller`][electron-winstaller] e módulos semelhantes, na qual seu escopo está limitado à construção de pacotes snap. Você pode instalar com:

```sh
npm install --save-dev electron-installer-snap
```

### Etapa 1: Empacotar sua aplicação Electron

Embale o aplicativo usando [][electron-packager] de pacotes eletrônicos (ou uma ferramenta semelhante). Certifique-se de remover `node_modules` que você não precisa no seu aplicativo final, desde qualquer módulo de que você não precisa aumentará o tamanho do seu aplicativo.

A saída deve ser algo mais ou menos assim:

```plaintext
.
── dist
    ── app-linux-x64
        ── LICENSE
        ─── LICENSE 
 ── LICENSES. hromium.html
        ─ content_shell. ak
        ── app
        ── icudtl. em
        ── libgcrypt.so.11
        ── libnode. o
        ── localidades
        ── recursos
        ── v8_context_snapshot. em
        ── versão
```

### Etapa 2: Executando `electron-installer-snap`

De um terminal que tem `snapcraft` em seu `PATH`, run `electron-installer-snap` com o único parâmetro obrigatório `--src`, que é a localização de sua aplicação Electron empacotada criada na primeira etapa.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Se você tiver uma pipeline de compilação existente, você pode usar programaticamente o `electron-installer-snap` . Para obter mais informações, consulte os [os documentos da API Snapcraft][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Criado em ${snapPath}!`))
```

## Usando `snapcraft` com `electron-packager`

### Passo 1: Criar projeto de snapcraft de exemplo

Crie seu diretório de projetos e adicione o seguinte a `snap/snapcraft.yaml`:

```yaml
nome: electron-packager-hello-world
versão: '0.1'
resumo: Hello World Electron app
descrição: |
  aplicativo Simple Hello World Electron como exemplo
base: core18
confinamento: rigoroso grau de
: aplicativos de

estáveis:
  electron-packager-hello-world:
    comando: electron-quick-start/electron-quick-start --no-sandbox
    extensões: [gnome-3-34]
    plugs:
    -
    de suporte ao navegador -
    de rede -
    ambiente de ligação de rede:
      # Corrija o caminho TMPDIR para Chromium Framework/Electron para garantir que
      # libappindicador tenha recursos legíveis.
      TMPDIR: partes de $XDG_RUNTIME_DIR

:
  início rápido de elétrons:
    plugin: zero
    fonte: https://github.com/electron/electron-quick-start.git
    sobreposição de compilação: |
        npm instale o empacotador eletrônico
        empacotador eletrônico npx . -overwrite --platform=linux --output=release-build --prune=true
        cp -rv ./electron-quick-start-linux-* $SNAPCRAFT_PART_INSTALL/electron-quick-start
    build-snaps:
    - nó/14/estável
    pacotes de compilação:
    - unzip
    pacotes de estágio:
    - libnss3
    - libnspr4
```

Se você quiser aplicar este exemplo a um projeto existente:

- Substitua `source: https://github.com/electron/electron-quick-start.git` por `source: .`.
- Substitua todas as instâncias de `electron-quick-start` pelo nome do seu projeto.

### Passo 2: Construa o snap

```sh
$ snapcraft

<output snipped>
Snapped electron-packager-hello-world_0.1_amd64.snap
```

### Passo 3: Instale o snap

```sh
sudo snap instalar electron-packager-hello-world_0.1_amd64.snap --perigoso
```

### Passo 4: Executar o snap

```sh
elétron-embalador-olá-mundo
```

## Usando um pacote Debian existente

Snapcraft é capaz de pegar um arquivo `.deb` existente e transformá-lo em um arquivo `.snap`. A criação de um snap é configurada usando um `snapcraft. aml` arquivo que descreve as fontes, dependências, descrição e outros blocos de construção.

### Passo 1: Crie um pacote Debian

Se você ainda não tiver um pacote `.deb` , usar `electron-installer-snap` pode ser um caminho mais fácil para criar pacotes de snap. No entanto, existem várias soluções para a criação de pacotes Debian, incluindo [`electron-forge`][electron-forge], [`electron-builder`][electron-builder] ou [`electron-installer-debian`][electron-installer-debian].

### Passo 2: Criar um snapcraft.yaml

Para obter mais informações sobre as opções de configuração disponíveis, consulte a documentação [na sintaxe snapcraft][snapcraft-syntax]. Vejamos um exemplo:

```yaml
name: minhaApp
versão: '2.0.0'
resumo: Uma pequena descrição do aplicativo.
descrição: 「
 Sabe o quê? Este aplicativo é incrível! Isso faz todas as coisas
 por você. Alguns dizem que o mantém jovem, talvez até feliz.

grau: confinamento
estável: peças clássicas de

:
  folga:
    plugin: dump
    fonte: my-deb.deb
    tipo de fonte: deb
    após:
      - desktop-gtk3
    pacotes de estágio:
      - libasound2
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  lançamento de elétrons:
    plugin: dump
    fonte: arquivos/
    preparar: |
      chmod +x bin/electron-launch

apps:
  myApp:
    comando: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    # Corrija o caminho TMPDIR para Chromium Framework/Electron para garantir
    # libappindicator tem recursos legíveis.
    ambiente:
      TMPDIR: $XDG_RUNTIME_DIR
```

Como você pode ver, o `snapcraft.yaml` instrui o sistema a lançar um arquivo chamado `electron-launch`. Neste exemplo, ele passa informações para o binário do aplicativo :

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Como alternativa, se você estiver construindo o seu `encaixando` com `confinamento estrito` você pode usar o `comando de inicialização da área de trabalho`:

```yaml
apps:
  meuApp:
    # Corrija o caminho TMPDIR para o Chromium Framework/Electron para garantir que
    # libappindicator possua recursos legíveis.
    comando: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
