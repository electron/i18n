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

Uma vez instalado, confirme se tudo está funcionando corretamente. Encontre o PowerShell do Windows abrindo o Menu Iniciar e digitando `PowerShell` - ou aperte windows + x e selecione a opção Windows PowerShell. Abra o `PowerShell` ou outro aplicativo de linha de comando de sua escolha e confirme que ambos `node` and `npm` estejam disponíveis:

```powershell
#Execute o comando para mostrar a versão do Node.js instalada
node -v

#Execute o comando para mostrar a versão do NPM instalada
npm -v
```

Se o retorno de ambos os comandos for o número da versão instalada, está tudo pronto! Antes de começar, você pode querer instalar um [editor de texto](#a-good-editor) adequado para trabalhar com Javascript.

## Configurando o Linux

> De modo geral, Electron suporta Ubuntu 12.04, Fedora 21, Debian 8 e versões superiores.

Primeiro, instale uma versão recente do Node.js. Dependendo da sua distribuição Linux, os passos da instalação podem ser diferentes. Assumindo que você normalmente instala softwares usando um gerenciador de pacotes como `apt` ou `pacman`, use o [guia de instalação do Node.js no Linux](https://nodejs.org/en/download/package-manager/).

Você usa Linux, então você gostaria de saber como operar pela linha de comando. Abra o aplicativo de linha de comando de sua escolha e confirme que ambos `node` e `npm` estejam disponíveis globalmente:

```sh
#Execute o comando para mostrar a versão do Node.js instalada
node -v

#Execute o comando para mostrar a versão do NPM instalada
npm -v
```

Se o retorno de ambos os comandos for o número da versão instalada, está tudo pronto! Antes de começar, você pode querer instalar um [editor de texto](#a-good-editor) adequado para trabalhar com Javascript.

## Um Bom Editor

Podemos sugerir dois editores gratuitos e populares que foram feitos usando Electron: [Atom](https://atom.io/) e [Visual Studio Code](https://code.visualstudio.com/). Ambos possuem um excelente suporte a linguagem Javascript.

Se você é um desenvolvedor com uma forte preferência, saiba que todos os editores de código e IDEs atualmente suportam JavaScript.
