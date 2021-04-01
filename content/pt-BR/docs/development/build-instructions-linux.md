# Instruções para Configurar (Linux)

Siga as instruções abaixo para configurar o Electron no Linux.

## Pré-requisitos

* Pelo o menos o 25GB de espaço em disco e 8GB de memória RAM.
* Python 2.7.x. Algumas distribuições como o CentOS 6.x ainda usam Python 2.6.x então você pode precisar verificar sua versão Python com `python -V`.

  Certifique-se também de que seu sistema e versão Python suportam pelo menos o TLS 1.2. Para um teste rápido, execute o seguinte script:

  ```sh
  $ npx @electron/check-python-tls
  ```

  Se o script retornar que sua configuração está usando um protocolo de segurança desatualizado, use seu gerenciador de pacotes para atualizar o Python para a última versão no ramo 2.7.x. Alternativamente, visite https://www.python.org/downloads/ para instruções mais detalhadas.

* Node.js. Existem várias maneiras para instalar o Node. Você pode baixar o código fonte do [nodejs.org](https://nodejs.org) e compilar. Isto permite somente instalar o Node em seu próprio diretório como o usuário padrão. Ou pode tentar no repositório [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 ou mais antigo.
* Cabeçalhos de desenvolvimento do GTK 3 e libnotify.

No Ubuntu, é necessário instalar as seguintes bibliotecas:

```sh
$ sudo apt-get instalar build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock openjdk-8-jre
```

No RHEL (Red Hat) / CentOS, é necessário instalar as seguintes bibliotecas:

```sh
$ sudo yum instalar clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   copos-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

No Fedora, é necessário instalar as seguintes bibliotecas:

```sh
$ sudo dnf instalar clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   copos-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   nss-devel python-dbusmock openjdk-8-jre
```

No Arch Linux / Manjaro, instale as seguintes bibliotecas:

```sh
$ sudo pacman -Syu base-devel clang libdbus gtk2 libnotify \
                   libgnome-keyring alsa-libcap libcups libxtst \
                   libxss nss gcc-multilib curl gperf bison \
                   python2 python-dbusmock jdk8-openjdk
```

Outras distribuições podem oferecer pacotes semelhantes para instalação via pacote gerentes, como pacman. Ou pode-se compilar a partir do código fonte.

### Forçar compilação

Se você deseja configurar para o caminho de `arm`, você precisa instalar as seguintes dependências:

```sh
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

Da mesma forma para `arm64`, instale as seguintes dependências:

```sh
$ sudo apt-get install libc6-dev-arm64-cross linux-libc-dev-arm64-cross \
                       g++-aarch64-linux-gnu
```

E para compilação cruzada para arquitetura `arm` ou `ia32` deve passar o parâmetro `target_cpu` para `gn gen`:

```sh
$ gn gen out/Testing --args='import(...) target_cpu="arm"'
```

## Compilando

Veja [Instruções de build: GN](build-instructions-gn.md)

## Solução de Problemas

### Erro ao carregar bibliotecas compartilhadas: libtinfo.so.5

Prebuilt `clang` tentará vincular-se a `libtinfo.so.5`. Dependendo da arquitetura do host, symlink para `libncurses`apropriado:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tópicos Avançados

A configuração de construção padrão é direcionada para as principais distribuições de Linux de desktop. Para construir para uma distribuição ou dispositivo específico, as seguintes informações podem ajudá-lo.

### Usando o `clang` em vez de fazer o download dos binários de `clang`

Por padrão o Electron é feito com código binário [`clang`](https://clang.llvm.org/get_started.html) pre-produzido e fornecido pelo projeto Chromium. Se por alguma razão quer construir usando `clang` instalado no seu sistema, pode especificar o argumento `clang_base_path` nos argumentos do GN.

Por exemplo, se o `clang` estiver instalado em `/usr/local/bin/clang`:

```sh
$ gn gen out/Testing --args='import("//electron/build/args/testing.gn") clang_base_path = "/usr/local/bin"'
```

### Utilizando compiladores diferentes de `clang`

Construir Electron com compiladores diferentes de `clang` não é suportado.
