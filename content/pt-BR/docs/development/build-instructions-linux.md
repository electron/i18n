# Instruções para Configurar (Linux)

Siga as instruções abaixo para configurar o Electron no Linux.

## Pré-requisitos

* Pelo o menos o 25GB de espaço em disco e 8GB de memória RAM.
* Python 2.7x. Para algumas distribuições como o CentOS 6.x continue usando o Python 2.6.x, então você precisa verificar a versão do Python com o comando `python -V`.
    
    Por favor verifique se o seu sistema suporta no mínimo a versão do Python TLS 1.2. Para um teste rápido, execute o seguinte script:
    
    ```sh
    $ npm run check-tls
    ```
    
    Se o script retornar que sua configuração está usando um protocolo de segurança desatualizado, use seu gerenciador de pacotes para atualizar o Python para a última versão no ramo 2.7.x. Alternativamente, visite https://www.python.org/downloads/ para instruções mais detalhadas.

* Node.js. Existem várias maneiras para instalar o Node. Você pode baixar o código fonte do [nodejs.org](https://nodejs.org) e compilar. Isto permite somente instalar o Node em seu próprio diretório como o usuário padrão. Ou pode tentar no repositório [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).

* [clang](https://clang.llvm.org/get_started.html) 3.4 ou mais antigo.
* Cabeçalho do GTK+ e libnotify.

No Ubuntu, é necessário instalar as seguintes bibliotecas:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison python-dbusmock
```

No RHEL (Red Hat) / CentOS, é necessário instalar as seguintes bibliotecas:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

No Fedora, é necessário instalar as seguintes bibliotecas:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel python-dbusmock
```

Outras distribuições podem oferecer estas bibliotecas para serem instaladas através de gerenciadores de pacote, como o pacman. Ou você pode compilar o código fonte.

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
$ gn gen out/Debug --args='import(...) target_cpu="arm"'
```

## Compilando

Veja [ Instruções de build: GN ](build-instructions-gn.md)

## Solução de Problemas

### Erro ao carregar bibliotecas compartilhadas: libtinfo.so.5

Prebuilt `clang` irá atentar vincular a `libtinfo.so.5`. Dependendo da arquitetura utilizada, um link é criado para `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Tópicos Avançados

A configuração padrão para compilação é direcionado para as principais distribuições Linux, para compilar para uma determinada distribuição ou dispositivo, siga as seguintes informações que talvez possa ajudá-lo.

### Usando o `clang` em vez de fazer o download dos binários de `clang`

Por padrão o Electron é feito com código binário [`clang`](https://clang.llvm.org/get_started.html) pre-produzido e fornecido pelo projeto Chromium. If for some reason you want to build with the `clang` installed in your system, you can specify the `clang_base_path` argument in the GN args.

For example if you installed `clang` under `/usr/local/bin/clang`:

```sh
$ gn gen out/Debug --args='import("//electron/build/args/debug.gn") clang_base_path = "/usr/local/bin"'
```

### Utilizando compiladores diferentes de `clang`

Building Electron with compilers other than `clang` is not supported.