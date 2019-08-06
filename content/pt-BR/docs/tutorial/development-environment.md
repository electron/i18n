# Ambiente de Desenvolvimento

O Electron é essencialmente desenvolvido em Node.js. Para transformar seu sistema operacional em um ambiente capaz de fazer compilação de aplicativos desktop com Electron, você precisará do Node.js, npm, um editor de código de sua preferencia e uma compreensão rudimentar da linha de comando do seu sistema operacional.

## Configurando o macOS

> O Electron suporta o macOS 10.10 (Yosemite) e posterior. Apple não permite rodar macOS em máquinas virtuais a menos que o computador de hospedagem seja já um computador Apple, então se você se encontrar carecido de um Mac, considere usando um serviço de nuvem que aluga o acesso a Macs (como [MacInCloud](https://www.macincloud.com/) ou [xcloud](https://xcloud.me)).

Primeiro, instale uma versão recente do Node.js. Recomendamos que você instale a última versão `LTS` ou `Atual` versão disponível. Visite a [página de download do Node.js](https://nodejs.org/en/download/) e selecione `macOS Installer`. Homebrew é um método de instalação oferecida mas não a recomendamos. Algumas ferramentas são incompatíveis com essa forma de instalação.

Uma vez baixado, execute o instalador e siga os passos da instalação.

Uma vez instalado, confirme se tudo está funcionando corretamente. Encontre o `Terminal` do macOS, encontrado em `/Aplicações/Utilitários` ou pesquise por `Terminal` no Spotlight (cmd + espaço). Abra o `Terminal` ou outro aplicativo de linha de comando de sua escolha e confirme que ambos `node` e `npm` estejam disponíveis:

```sh
#Execute o comando para mostrar a versão do Node.js instalada
node -v

#Execute o comando para mostrar a versão do NPM instalada
npm -v
```

Se o retorno de ambos os comandos for o número da versão instalada, está tudo pronto! Antes de começar, você pode querer instalar um [editor de texto](#a-good-editor) adequado para trabalhar com Javascript.

## Configurando o Windows

> Electron suporta Windows 7 e versões superiores - o desenvolvimento de aplicações Electron em versões anteriores ao Windows 7 não vão funcionar. A Microsoft fornece [imagens de máquinas virtuais com Windows 10](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) gratuitas para desenvolvedores.

Primeiro, instale uma versão recente do Node.js. Recomendamos que você instale a última versão `LTS` ou `Atual` versão disponível. Visite a [página de download do Node.js](https://nodejs.org/en/download/) e selecione `Windows Installer`. Uma vez baixado, execute o instalador e siga os passos da instalação.

Na tela que permite você configurar a instalação, tenha certeza de selecionar as seguintes opções: `Node.js runtime`, `npm package manager`, e `Adcionar ao PATH`.

Uma vez instalado, confirme se tudo está funcionando corretamente. Find the Windows PowerShell by opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
#Execute o comando para mostrar a versão do Node.js instalada
node -v

#Execute o comando para mostrar a versão do NPM instalada
npm -v
```

Se o retorno de ambos os comandos for o número da versão instalada, está tudo pronto! Antes de começar, você pode querer instalar um [editor de texto](#a-good-editor) adequado para trabalhar com Javascript.

## Configurando o Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

Primeiro, instale uma versão recente do Node.js. Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
#Execute o comando para mostrar a versão do Node.js instalada
node -v

#Execute o comando para mostrar a versão do NPM instalada
npm -v
```

Se o retorno de ambos os comandos for o número da versão instalada, está tudo pronto! Antes de começar, você pode querer instalar um [editor de texto](#a-good-editor) adequado para trabalhar com Javascript.

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.