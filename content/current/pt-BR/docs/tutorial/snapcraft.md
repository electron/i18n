# Guia do Snapcraft (Central de Software Ubuntu & Mais)

Este guia fornece informações sobre como empacotar seu aplicativo Electron para qualquer ambiente Snapcraft, incluindo o Centro de Software Ubuntu.

## Contexto e Requisitos

Junto com a comunidade mais ampla do Linux, Canônica visa corrigir muitos dos problemas comuns de instalação de software com o projeto [`snapcraft`](https://snapcraft.io/) . Os snaps são pacotes de software containerized que incluem as necessárias dependências, atualização automática e funcionam em todas as principais distribuições Linux sem a modificação de sistema .

Existem três maneiras de criar um arquivo `.snap`:

1) Usando [`electron-forge`](https://github.com/electron-userland/electron-forge) ou [`electron-builder`](https://github.com/electron-userland/electron-builder), ambas as ferramentas que vêm com `snap` suporte de fora da caixa. Esta é a opção mais fácil. 2) Usando `electron-installer-snap`, que leva a saída do `electron-packager`. 3) Usando um pacote `.deb` já criado.

Em alguns casos, você precisará ter a ferramenta `snapcraft` instalada. Instruções para instalar `snapcraft` para sua distribuição específica estão disponíveis [aqui](https://snapcraft.io/docs/installing-snapcraft).

## Usando `electron-installer-snap`

O módulo funciona como o [`electron_winstaller`](https://github.com/electron/windows-installer)e módulos semelhantes em que seu escopo é limitado a construir pacotes snap. Você pode testá-lo com:

```sh
npm install --save-dev electron-installer-snap
```

### Etapa 1: Empacotar sua aplicação Electron

Empacote a aplicação usando o [electron-packager](https://github.com/electron/electron-packager) (ou uma ferramenta similar). Certifique-se de remover `node_modules` que você não precisa no seu aplicativo final, desde qualquer módulo de que você não precisa aumentará o tamanho do seu aplicativo.

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

Se você tiver uma pipeline de compilação existente, você pode usar programaticamente o `electron-installer-snap` . Para obter mais informações, consulte a [documentação da API do Snapcraft](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Criado em ${snapPath}!`))
```

## Using `snapcraft` with `electron-packager`

### Step 1: Create Sample Snapcraft Project

Create your project directory and add the following to `snap/snapcraft.yaml`:

```yaml
name: electron-packager-hello-world
version: '0.1'
summary: Hello World Electron app
description: |
  Simple Hello World Electron app as an example
base: core18
confinement: strict
grade: stable

apps:
  electron-packager-hello-world:
    command: electron-quick-start/electron-quick-start --no-sandbox
    extensions: [gnome-3-34]
    plugs:
    - browser-support
    - network
    - network-bind
    environment:
      # Correct the TMPDIR path for Chromium Framework/Electron to ensure
      # libappindicator has readable resources.
      TMPDIR: $XDG_RUNTIME_DIR

parts:
  electron-quick-start:
    plugin: nil
    source: https://github.com/electron/electron-quick-start.git
    override-build: |
        npm install electron electron-packager
        npx electron-packager . --overwrite --platform=linux --output=release-build --prune=true
        cp -rv ./electron-quick-start-linux-* $SNAPCRAFT_PART_INSTALL/electron-quick-start
    build-snaps:
    - node/14/stable
    build-packages:
    - unzip
    stage-packages:
    - libnss3
    - libnspr4
```

If you want to apply this example to an existing project:

- Replace `source: https://github.com/electron/electron-quick-start.git` with `source: .`.
- Replace all instances of `electron-quick-start` with your project's name.

### Step 2: Build the snap

```sh
$ snapcraft

<output snipped>
Snapped electron-packager-hello-world_0.1_amd64.snap
```

### Step 3: Install the snap

```sh
sudo snap install electron-packager-hello-world_0.1_amd64.snap --dangerous
```

### Step 4: Run the snap

```sh
electron-packager-hello-world
```

## Usando um pacote Debian existente

Snapcraft é capaz de pegar um arquivo `.deb` existente e transformá-lo em um arquivo `.snap`. A criação de um snap é configurada usando um `snapcraft. aml` arquivo que descreve as fontes, dependências, descrição e outros blocos de construção.

### Passo 1: Crie um pacote Debian

Se você ainda não tiver um pacote `.deb` , usar `electron-installer-snap` pode ser um caminho mais fácil para criar pacotes de snap. No entanto, existem várias soluções para a criação de pacotes Debian, incluindo o [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) ou [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Passo 2: Criar um snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
name: minhaApp
versão: '2.0.0'
resumo: Uma pequena descrição do aplicativo.
descrição: 「
 Sabe o quê? Este aplicativo é incrível! Isso faz todas as coisas
 por você. Alguns dizem que o mantém jovem, talvez até feliz.

grade: stable
confinement: classic

parts:
  slack:
    plugin: dump
    source: my-deb.deb
    source-type: deb
    after:
      - desktop-gtk3
    stage-packages:
      - libasound2
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  electron-launch:
    plugin: dump
    source: files/
    prepare: |
      chmod +x bin/electron-launch

apps:
  myApp:
    command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    ambiente:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

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
