# Instruções para Configurar (Linux)

Siga as instruções abaixo para configurar o Electron no Linux.

## Pré-requisitos

* Pelo o menos o 25GB de espaço em disco e 8GB de memória RAM.
* Python 2.7x. Para algumas distribuições como o CentOS 6.x continue usando o Python 2.6.x, então você precisa verificar a versão do Python com o comando `python -V`.
* Node.js. Existem várias maneiras para instalar o Node. Você pode baixar o código fonte do [Node.js](http://nodejs.org) e compilar. Isto permite somente instalar o Node em seu próprio diretório como o usuário padrão. Ou pode tentar no repositório [NodeSource](https://nodesource.com/blog/nodejs-v012-iojs-and-the-nodesource-linux-repositories).
* Clang 3.4 ou superior.
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

## Obtendo o código fonte

```bash
$ git clone https://github.com/electron/electron.git
```

## Inicialização

O script de inicialização irá baixar todas as dependências necessárias e criar os arquivos de configuração do projeto. Você deve ter o Python 2.7.x para que o script tenha sucesso. Pode levar algum tempo para baixar certos arquivos. Observe que estamos utilizando `ninja` para configurar o Electron, não existe nenhum `Makefile` gerado.

```bash
$ cd electron
$ ./script/bootstrap.py -v
```

### Forçar compilação

Se você deseja configurar para o caminho de `arm`, você precisa instalar as seguintes dependências:

```bash
$ sudo apt-get install libc6-dev-armhf-cross linux-libc-dev-armhf-cross \
                       g++-arm-linux-gnueabihf
```

E para compilar para `arm` ou `i32`, Você deve passar o parâmetro `--target_arch` ao executar o script `bootstrap.py`:

```bash
$ ./script/bootstrap.py -v --target_arch=arm
```

## Compilando

Se você deseja de compilar tanto para `Release` e `Debug`:

```bash
$ ./script/build.py
```

O script irá gerar um executável do Electron muito grande para ser gravado no diretório `/R`. O tamanho do arquivo é superior a 1.3 gigabytes. Isso acontece porque o binário contém sinais de depuração. Para reduzir o tamanho do arquivo, execute o script `create-dist.py`:

```bash
$ ./script/create-dist.py
```

Com isso será gerado uma distribuição muito menor no diretório `dist`. Depois de the executar o script create-dist.py, você talvez queira remover os 1.3+ gigabytes gerados anteriormente no `out/R<0>.</p>

<p>Você também pode compilar somente o <code>Debug`:

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

A configuração padrão para compilação é direcionado para as principais distribuições Linux, para compilar para uma determinada distribuição ou dispositivo, siga as seguintes informações que talvez possa ajudá-lo. 

### Compilando `libchromiumcontent` localmente

Para evitar de usar o prebuilt de `libchromiumcontent`, você pode passar o `--build_libchromiumcontent` e mudar para o script `bootstrap.py`:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent
```

Observe que por padrão a configuração de `shared_library` não é compilada, você pode compilar somente a versão de `Release` do Electron se você utilizar o modo:

```bash
$ ./script/build.py -c R
```

### Usando o `clang` em vez de fazer o download dos binários de `clang`

Por padrão Electron é compilado com prebuilt `clang` fornecidos pelo o Chromium. Se por alguma razão você queira compilar com o `clang` instalado, você pode executar o script `bootstrap.py` com o parâmetro `--clang_dir=<path>`. Todos os scripts irão assumir o binários de `clang` para `<path>/bin/`.

Por exemplo, se você instalou `clang` em `/user/local/bin/clang`:

```bash
$ ./script/bootstrap.py -v --build_libchromiumcontent --clang_dir /usr/local
$ ./script/build.py -c R
```

### Utilizando outros compiladores diferentes de `clang`

Para compilar o Electron com compiladores parecidos com o `g++`, você primeiro precisa desativar o `clang` com o parâmetro `--disable_clang`, depois configurar o 0>CC</code> e `CXX` nas variáveis de ambiente.

Por exemplo, compilando com GCC toolchain:

```bash
$ env CC=gcc CXX=g++ ./script/bootstrap.py -v --build_libchromiumcontent --disable_clang
$ ./script/build.py -c R
```

### Variáveis de ambiente

Além de `CC` e `CXX`, você também pode personalizar a configuração de compilação após a configuração das variáveis de ambiente:

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