# Boilerplates e CLIs

O desenvolvimento do Electron não é opinionado - não há "uma maneira verdadeira" para desenvolver, compilar, pacote ou lançar uma aplicação Electron. Recursos adicionais para o Electron, tanto para versão de compilação quanto para tempo de execução, podem geralmente ser encontrados no [npm](https://www.npmjs.com/search?q=electron) em pacotes individuais, permitindo que desenvolvedores construam ambos o aplicativo e construam o pipeline de que precisam.

That level of modularity and extendability ensures that all developers working with Electron, both big and small in team-size, are never restricted in what they can or cannot do at any time during their development lifecycle. No entanto, para muitos desenvolvedores, uma das ferramentas de boilerplates ou linha de comando podem tornar drasticamente mais fácil de compilar, compacte e solte um app .

## Boilerplate vs CLI

Uma boilerplate é apenas um ponto de partida - uma tela, por assim dizer - a partir do qual você constrói seu aplicativo. Eles geralmente vêm na forma de um repositório que você pode clonar e personalizar o conteúdo do seu coração.

Uma ferramenta de linha de comando, por outro lado, continua a apoiá-lo durante o desenvolvimento e lançamento de . Eles são mais úteis e colaborativos, mas aplicam as diretrizes sobre como seu código deve ser estruturado e construído. *especialmente para iniciantes, usar uma ferramenta de linha de comando provavelmente será útil*.

## electron-forge

Uma "ferramenta completa para construir aplicações modernas do Electron". Electron Forge unifica as ferramentas de compilação existentes (e bem mantidas) para o desenvolvimento de Electron em um pacote coeso para que qualquer um possa entrar no desenvolvimento do Electron .

O Forge vem com [um modelo pronto para usar](https://electronforge.io/templates) usando Webpack como um empacotador. Ele inclui um exemplo de configuração de typescript e fornece dois arquivos de configuração para habilitar a personalização fácil. Ele usa os mesmos módulos de núcleo utilizados pela maior comunidade do Electron (como [`electron-packager`](https://github.com/electron/electron-packager)) – alterações feitas pelos mantenedores do Electron (como o Slack) beneficiam usuários do Forge, também.

Você pode encontrar mais informações e documentação em [electronforge.io](https://electronforge.io/).

## electron-builder

Uma "solução completa para empacotar e construir um aplicativo Electron pronto para distribuição" que se concentra em uma experiência integrada. [`builder do electron-builder`](https://github.com/electron-userland/electron-builder) adiciona uma dependência única focada na simplicidade e gerencia todos os outros requisitos internamente.

`electron-builder` substitui recursos e módulos usados pelos mantenedores do Electron (como o atualizador automático) por um personalizado. Geralmente eles são mais fortes integrados mas terão menos em comum com os populares aplicativos Electron como Atom, Visual Studio Code ou Slack.

Você pode encontrar mais informações e documentação no [repositório](https://github.com/electron-userland/electron-builder).

## electron-react-boilerplate

If you don't want any tools but only a solid boilerplate to build from, CT Lin's [`electron-react-boilerplate`](https://github.com/chentsulin/electron-react-boilerplate) might be worth a look. É bastante popular na comunidade e usa `builder electron-builder` internamente.

## Outras Ferramentas e Boilerplates

A [Lista "Eletrão Incrível"](https://github.com/sindresorhus/awesome-electron#boilerplates) contém mais ferramentas e boilerplates para escolher. Se você encontrar o comprimento da lista intimidatória, não se esqueça que adicionar ferramentas enquanto você segue também é uma abordagem válida.
