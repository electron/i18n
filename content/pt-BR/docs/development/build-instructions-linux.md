# Instruções para Configurar (Linux)

Siga as instruções abaixo para configurar o Electron no Linux.

## Pré-requisitos

* Pelo o menos o 25GB de espaço em disco e 8GB de memória RAM.
* Python 2.7x. Para algumas distribuições como o CentOS 6.x continue usando o Python 2.6.x, então você precisa verificar a versão do Python com o comando `python -V`.
* Node.js. Existem várias maneiras para instalar o Node. You can download source code from [nodejs.org](http://nodejs.org) and compile it. Isto permite somente instalar o Node em seu próprio diretório como o usuário padrão. Ou pode tentar no repositório [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 or later.
* Cabeçalho do GTK+ e libnotify.

No Ubuntu, é necessário instalar as seguintes bibliotecas:

```bash
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk2.0-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

No RHEL (Red Hat) / CentOS, é necessário instalar as seguintes bibliotecas:

```bash
$ sudo yum install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

No Fedora, é necessário instalar as seguintes bibliotecas:

```bash
$ sudo dnf install clang dbus-devel gtk2-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Outras distribuições podem oferecer estas bibliotecas para serem instaladas através de gerenciadores de pacote, como o pacman. Ou você pode compilar o código fonte.

## Obtendo o Código Fonte

```bash
$ git clone https://github.com/electron/electron
```

## Inicialização

O script de inicialização irá baixar todas as dependências necessárias e criar os arquivos de configuração do projeto. Você deve ter o Python 2.7.x para que o script tenha sucesso. Pode levar algum tempo para baixar certos arquivos. Observe que estamos utilizando `ninja` para configurar o Electron, não existe nenhum `Makefile` gerado.

```bash
$ cd electron
$ ./script/bootstrap.py --verbose
```

### Forçar compilação

Se você deseja configurar para o caminho de `arm`, você precisa instalar as seguintes dependências:

```bash
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

And to cross-compile for `arm` or `ia32` targets, you should pass the `--target_arch` parameter to the `bootstrap.py` script:

```bash
$ ./script/bootstrap.py -v --target_arch=arm
```

## Compilando

Se você deseja de compilar tanto para `Release` e `Debug`:

```bash
$ ./script/build.py
```

O script irá gerar um executável do Electron muito grande para ser gravado no diretório `out/R`. O tamanho do arquivo é superior a 1.3 gigabytes. Isso acontece porque o binário contém sinais de depuração. Para reduzir o tamanho do arquivo, execute o script `create-dist.py`:

```bash
$ ./script/create-dist.py
```

Com isso será gerado uma distribuição muito menor no diretório `dist`. After running the `create-dist.py` script, you may want to remove the 1.3+ gigabyte binary which is still in `out/R`.

Você também pode compilar somente o `Debug`:

```bash
$ ./script/build.py -c D
```

Após a finalização, você pode encontrar o `electron` debug no diretório `out/D`.

## Excluindo

Para excluir os arquivos de compilação:

```bash
$ npm run clean
```

Para excluir somente os diretórios `out` e `dist`:

```bash
$ npm run clean-build
```

**Nota:** Os dois comandos exigem que seja executado o `bootstrap` novamente antes da compilação.

## Solução de Problemas

### Erro ao carregar bibliotecas compartilhadas: libtinfo.so.5

Prebuilt `clang` irá atentar vincular a `libtinfo.so.5`. Dependendo da arquitetura utilizada, um link é criado para `libncurses`:

```bash
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Testes

Veja [Visão Geral do Sistema: Testes](build-system-overview.md#tests)

## Tópicos Avançados

The default building configuration is targeted for major desktop Linux distributions. To build for a specific distribution or device, the following information may help you.

### Compilando `libchromiumcontent` localmente

To avoid using the prebuilt binaries of `libchromiumcontent`, you can build `libchromiumcontent` locally. To do so, follow these steps: 1. Install [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install) 2. Install [additional build dependencies](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies) 3. Fetch the git submodules:

    $ git submodule update --init --recursive 4. Copy the .gclient config file

    $ cp vendor/libchromiumcontent/.gclient . 5. Pass the 

`--build_libchromiumcontent` switch to `bootstrap.py` script:

    $ ./script/bootstrap.py -v --build_libchromiumcontent

Note that by default the `shared_library` configuration is not built, so you can only build `Release` version of Electron if you use this mode:

```bash
$ ./script/build.py -c R
```

### Usando o `clang` em vez de fazer o download dos binários de `clang`

By default Electron is built with prebuilt [`clang`](https://clang.llvm.org/get_started.html) binaries provided by the Chromium project. If for some reason you want to build with the `clang` installed in your system, you can call `bootstrap.py` with `--clang_dir=<path>` switch. By passing it the build script will assume the `clang` binaries reside in `<path>/bin/`.

For example if you installed `clang` under `/user/local/bin/clang`:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent --clang_dir /usr/local
$ ./script/build.py -c R
```

### Using compilers other than `clang`

To build Electron with compilers like `g++`, you first need to disable `clang` with `--disable_clang` switch first, and then set `CC` and `CXX` environment variables to the ones you want.

For example building with GCC toolchain:

```bash
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_libchromiumcontent --disable_clang
$ ./script/build.py -c R
```

### Variáveis de ambiente

Apart from `CC` and `CXX`, you can also set following environment variables to custom the building configurations:

* `CPPFLAGS`
* `CPPFLAGS_host`
* `CFLAGS`
* `CFLAGS_host`
* `CXXFLAGS`
* `CXXFLAGS_host`
* `AR`
* `AR_host`
* `CC`
* `CC_host`
* `CXX`
* `CXX_host`
* `LDFLAGS`

The environment variables have to be set when executing the `bootstrap.py` script, it won't work in the `build.py` script.