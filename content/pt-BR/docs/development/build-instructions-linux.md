# Instruções para Configurar (Linux)

Siga as instruções abaixo para configurar o Electron no Linux.

## Pré-requisitos

* Pelo o menos o 25GB de espaço em disco e 8GB de memória RAM.
* Python 2.7x. Para algumas distribuições como o CentOS 6.x continue usando o Python 2.6.x, então você precisa verificar a versão do Python com o comando `python -V`.
* Node.js. Existem várias maneiras para instalar o Node. Você pode baixar o código fonte do [nodejs.org](https://nodejs.org) e compilar. Isto permite somente instalar o Node em seu próprio diretório como o usuário padrão. Ou pode tentar no repositório [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* [clang](https://clang.llvm.org/get_started.html) 3.4 ou mais antigo.
* Cabeçalho do GTK+ e libnotify.

No Ubuntu, é necessário instalar as seguintes bibliotecas:

```sh
$ sudo apt-get install build-essential clang libdbus-1-dev libgtk-3-dev \
                       libnotify-dev libgnome-keyring-dev libgconf2-dev \
                       libasound2-dev libcap-dev libcups2-dev libxtst-dev \
                       libxss1 libnss3-dev gcc-multilib g++-multilib curl \
                       gperf bison
```

No RHEL (Red Hat) / CentOS, é necessário instalar as seguintes bibliotecas:

```sh
$ sudo yum install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

No Fedora, é necessário instalar as seguintes bibliotecas:

```sh
$ sudo dnf install clang dbus-devel gtk3-devel libnotify-devel \
                   libgnome-keyring-devel xorg-x11-server-utils libcap-devel \
                   cups-devel libXtst-devel alsa-lib-devel libXrandr-devel \
                   GConf2-devel nss-devel
```

Outras distribuições podem oferecer estas bibliotecas para serem instaladas através de gerenciadores de pacote, como o pacman. Ou você pode compilar o código fonte.

## Obtendo o Código Fonte

```sh
$ git clone https://github.com/electron/electron
```

## Inicialização

O script de inicialização irá baixar todas as dependências necessárias e criar a compilação do projeto. Você deve ter o Python 2.7.x para que o script tenha sucesso. Pode levar algum tempo para baixar certos arquivos. Observe que estamos utilizando `ninja` para configurar o Electron, não existe nenhum `Makefile` gerado.

```sh
$ cd electron
$ ./script/bootstrap.py --verbose
```

If you are using editor supports [JSON compilation database](http://clang.llvm.org/docs/JSONCompilationDatabase.html) based language server, you can generate it:

```sh
$ ./script/build.py --compdb
```

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

E para compilar para `arm` ou `i32`, Você deve passar o parâmetro `--target_arch` ao executar o script `bootstrap.py`:

```sh
$ ./script/bootstrap.py -v --target_arch=arm
```

## Compilando

Se você deseja de compilar tanto para `Release` e `Debug`:

```sh
$ ./script/build.py
```

O script irá gerar um executável do Electron muito grande para ser gravado no diretório `out/R`. O tamanho do arquivo é superior a 1.3 gigabytes. Isso acontece porque o binário contém sinais de depuração. Para reduzir o tamanho do arquivo, execute o script `create-dist.py`:

```sh
$ ./script/create-dist.py
```

Com isso será gerado uma distribuição muito menor no diretório `dist`. Depois de the executar o script `create-dist.py`, você talvez queira remover os 1.3+ gigabytes gerados anteriormente no `out/R`.

Você também pode compilar somente o `Debug`:

```sh
$ ./script/build.py -c D
```

Após a finalização, você pode encontrar o `electron` debug no diretório `out/D`.

## Excluindo

Para excluir os arquivos de compilação:

```sh
$ npm run clean
```

Para excluir somente os diretórios `out` e `dist`:

```sh
$ npm run clean-build
```

**Nota:** Os dois comandos exigem que seja executado o `bootstrap` novamente antes da compilação.

## Solução de Problemas

### Erro ao carregar bibliotecas compartilhadas: libtinfo.so.5

Prebuilt `clang` irá atentar vincular a `libtinfo.so.5`. Dependendo da arquitetura utilizada, um link é criado para `libncurses`:

```sh
$ sudo ln -s /usr/lib/libncurses.so.5 /usr/lib/libtinfo.so.5
```

## Testes

Veja [Visão Geral do Sistema: Testes](build-system-overview.md#tests)

## Tópicos Avançados

A configuração padrão para compilação é direcionado para as principais distribuições Linux, para compilar para uma determinada distribuição ou dispositivo, siga as seguintes informações que talvez possa ajudá-lo.

### Compilando `libchromiumcontent` localmente

Para evitar o uso dos códigos binários pre-produzidos do `libchromiumcontent`, você pode criar `libchromiumcontent` localmente. Para faze-lo, siga as seguintes etapas:

1. Instale o [depot_tools](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install)
2. Instale as [dependências de compilação adicionais](https://chromium.googlesource.com/chromium/src/+/master/docs/linux_build_instructions.md#Install-additional-build-dependencies)
3. Busque por novos git submodules:

```sh
$ git submodule update --init --recursive
```

1. Use o `--build_release_libcc` para mudar o script `bootstrap.py`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc
```

Observe que por padrão a configuração de `shared_library` não é compilada, você pode compilar somente a versão de `Release` do Electron se você utilizar o modo:

```sh
$ ./script/build.py -c R
```

### Usando o `clang` em vez de fazer o download dos binários de `clang`

Por padrão o Electron é feito com código binário [`clang`](https://clang.llvm.org/get_started.html) pre-produzido e fornecido pelo projeto Chromium. Se por alguma razão você quer usar o `clang` instalado em seu sistema, você pode chamar `bootstrap.py` com o interruptor `--clang_dir=<path>`. Ao passar o código pre-produzido, se assumirá que o código binário `clang` está localizado em `<path>/bin/`.

Por exemplo, se você instalou `clang` em `/user/local/bin/clang`:

```sh
$ ./script/bootstrap.py -v --build_release_libcc --clang_dir /usr/local
$ ./script/build.py -c R
```

### Utilizando compiladores diferentes de `clang`

Para compilar o Electron com compiladores parecidos com o `g++`, você primeiro precisa desativar o `clang` com o parâmetro `--disable_clang`, depois configurar o 0>CC</code> e `CXX` nas variáveis de ambiente.

Por exemplo, compilando com GCC toolchain:

```sh
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_release_libcc --disable_clang
$ ./script/build.py -c R
```

### Variáveis de ambiente

À parte de `CC` e `CXX`, você também pode definir as seguintes variáveis de ambiente para customizar as configurações para criar o build do seu aplicativo:

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

A variável de ambiente precisa ser definidas ao executar o script `bootstrap.py`, isso não vai funcionar no script `build.py`.