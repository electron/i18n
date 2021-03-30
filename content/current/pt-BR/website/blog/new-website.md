---
title: "Novo site internacionalizado do Electron"
author: zeke
date: '2017-11-13'
---

A Electron tem um novo site em [electronjs.org][]! Substituímos nosso site estático do Jekyll por um nó. s webserver, dando-nos flexibilidade para internacionalizar o site e pavimentando o caminho para novas funcionalidades mais emocionantes.

---

## 🌍 Traduções

Iniciamos o processo de internacionalização do site com o objetivo de tornar o desenvolvimento de aplicativos do Electron acessível para um público global de desenvolvedores. Estamos usando uma plataforma de localização chamada [Crowdin][] que integra com o GitHub, abrindo e atualizando solicitações de tração automaticamente à medida que o conteúdo é traduzido para diferentes idiomas.

<figure>
  <a href="https://electronjs.org/languages">
    <img src="https://user-images.githubusercontent.com/2289/32803530-a35ff774-c938-11e7-9b98-5c0cfb679d84.png" alt="Electron Nav em Chinês Simplificado">
    <figcaption>Electron's Nav em Chinês Simplificado</figcaption>
  </a>
</figure>

Embora estivemos trabalhando calmamente neste esforço até agora mais de 75 membros da comunidade Electron já descobriram o projeto organicamente e se juntaram à tentativa de internacionalizar o site e traduzir a documentação do Electron para mais de 20 idiomas. Estamos vendo [contribuições diárias](https://github.com/electron/electron-i18n/pulls?utf8=%E2%9C%93&q=is%3Apr%20author%3Aglotbot%20) de pessoas em todo o mundo com traduções para línguas como francês, vietnamita, indonésio e chinês liderando o caminho.

Para escolher o seu idioma e visualizar o progresso da tradução, acesse [electronjs.org/languages](https://electronjs.org/languages)

<figure>
  <a href="https://electronjs.org/languages">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32754734-e8e43c04-c886-11e7-9f34-f2da2bb4357b.png" alt="Idiomas-alvo atuais no Crowdin">
    <figcaption>Traduções em andamento no Crowdin</figcaption>
  </a>
</figure>

Se você está multilíngue e interessado em ajudar a traduzir os e site de documentos da Electron, visite o [elétron/elétron-i18n][] repo, ou pule direto para traduzindo em [][]Crowdin , onde você pode fazer login usando sua conta gitHub.

Atualmente existem 21 idiomas ativados para o projeto Electron no Crowdin. Adicionar suporte para mais idiomas é fácil, então se você estiver interessado em ajudando a traduzir, mas você não vê sua língua listada, [nos conte](https://github.com/electron/electronjs.org/issues/new) e que o habilitaremos.

## Documentação não traduzida

Se você preferir ler a documentação em arquivos Markdown, agora você pode fazer isso em qualquer idioma:

```sh
git clone https://github.com/electron/electron-i18n
ls electron-i18n/content
```

## Páginas do aplicativo

A partir de hoje, qualquer app do Electron pode ter facilmente sua própria página no site do Electron. Para alguns exemplos, confira [Etcher](https://electronjs.org/apps/etcher), [1Clipboard](https://electronjs.org/apps/1clipboard), ou [GraphQL Playground](https://electronjs.org/apps/graphql-playground), fotografada aqui na versão japonesa do site:

<figure>
  <a href="https://electronjs.org/apps/graphql-playground">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871096-f5043292-ca33-11e7-8d03-a6a157aa183d.png" alt="Playground Gráfico">
  </a>
</figure>

Existem alguns aplicativos incríveis do Electron por aí, mas nem sempre são fáceis de encontrar, e nem todos os desenvolvedores têm tempo ou recursos para construir um site adequado para comercializar e distribuir seu aplicativo.

Usando apenas um arquivo de ícone PNG [e uma pequena quantidade de metadados de aplicativos](https://github.com/electron/electron-apps/blob/master/contributing.md), somos capazes de coletar muitas informações sobre um determinado aplicativo. Usando dados coletados do GitHub, as páginas do aplicativo agora podem exibir capturas de tela, baixar links, versões, notas de lançamento e READMEs para cada aplicativo que tem um repositório público. Usando uma paleta de cores extraída do ícone de cada aplicativo, nós podemos produzir [cores negritas e acessíveis](https://github.com/zeke/pick-a-good-color) para dar alguma distinção visual a cada página da aplicação.

A página de índice de aplicativos [](https://electronjs.org/apps) agora também tem categorias e um filtro de palavra-chave para encontrar aplicativos interessantes como [GraphQL GUIs](https://electronjs.org/apps?q=graphql) e ferramentas [p2p](https://electronjs.org/apps?q=graphql).

Se você tem um aplicativo Electron que você gostaria de apresentar no site, abra uma solicitação de puxar no [][] repositório de elétrons/elétrons.

## Instalação em uma linha com o Homebrew

O [Homebrew][] o gerenciador de pacotes para macOS tem um subcomand chamado [][] de barril que facilita a instalação de aplicativos de desktop usando um único comando em seu terminal de , como `brew cask install atom`.

Nós começamos a coletar nomes do Homebrew cask para apps Electron populares e agora estamos exibindo o comando de instalação (para visitantes do macOS) em todas as páginas de aplicativo que possuem um dinheiro:

<figure>
  <a href="https://electronjs.org/apps/dat">
   <img class="screenshot" src="https://user-images.githubusercontent.com/2289/32871246-c5ef6f2a-ca34-11e7-8eb4-3a5b93b91007.png">
   <figcaption>Opções de instalação personalizadas para sua plataforma: macOS, Windows, Linux</figcaption>
  </a>
</figure>

Para ver todos os aplicativos que têm nomes de casco homebrew, visite [electronjs.org/apps?q=homebrew](https://electronjs.org/apps?q=homebrew). Se você conhece outros aplicativos com cascos que ainda não indexamos, [por favor, adicione-os!](https://github.com/electron/electron-apps/blob/master/contributing.md)

## 🌐 Um Novo Domínio

Mudamos o site de electron.atom.io para um novo domínio: [electronjs.org][].

O projeto Electron nasceu dentro [Atom][], editor de texto de código aberto do GitHub construído sobre tecnologias web. O Electron foi originalmente chamado `atom-shell`. Atom foi o primeiro aplicativo a usá-lo, mas não demorou muito para que as pessoas percebessem que este Chromium mágico + tempo de execução do nó poderia ser usado para todos os tipos de aplicativos diferentes. Quando empresas como Microsoft e Slack começaram a usar `atom-shell`, ficou claro que o projeto precisava de um novo nome.

E então nasceu o "Electron". No início de 2016, o GitHub montou uma nova equipe para se concentrar especificamente no desenvolvimento e manutenção do Electron, além do Atom. In the time since, Electron has been adopted by thousands of app developers, and is now depended on by many large companies, many of which have Electron teams of their own.

Apoiar projetos de Elétrons do GitHub, como o Átomo e o [gitHub Desktop][] ainda é uma prioridade para nossa equipe, mas ao passar para um novo domínio esperamos ajudar a esclarecer a distinção técnica entre Átomo e Elétron.

## 🐢:foguete: Node.js Everywhere

O site anterior da Electron foi construído com [Jekyll][], o popular gerador de estático baseado em Ruby. O Jekyll é uma ótima ferramenta para construir sites estáticos, mas o site começou a crescer. Queríamos recursos mais dinâmicos, como redirecionamentos adequados e renderização dinâmica de conteúdo, então um [Node.js][] servidor era a escolha óbvia.

O ecossistema do Electron inclui projetos com componentes escritos em muitas linguagens de programação diferentes, desde Python até C++ até Bash. Mas JavaScript é fundamental para o Electron, e é o idioma mais usado em nossa comunidade.

Ao migrar o site do Ruby para Node.js, buscamos diminuir a barreira para a entrada para as pessoas que desejam contribuir com o site.

## ⚡ Participação Aberta Mais fácil

Se você tiver [Node.js][] (8 ou mais) e [](https://git-scm.org) de git instalado em seu sistema, você pode facilmente obter o site em execução local:

```sh
git clone https://github.com/electron/electronjs.org
cd electronjs.org
npm install
npm run dev
```

O novo site está hospedado no Heroku. Nós usamos pipelines de implantação e o recurso [Apps de revisão](https://devcenter.heroku.com/articles/github-integration-review-apps) o que cria automaticamente uma cópia em execução do aplicativo para cada solicitação de pull . Isso facilita para os revisores visualizar os efeitos reais de um pull request em uma cópia ao vivo do site.

## 🙏 Graças aos Contribuidores

Gostaríamos de dar um agradecimento especial a todas as pessoas em todo o mundo que contribuíram com seu próprio tempo e energia para ajudar a melhorar o Electron. A paixão da comunidade de código aberto tem ajudado incomensuravelmente a fazer do Electron um sucesso. Muito obrigado!

<figure>
  <img src="https://user-images.githubusercontent.com/2289/32871386-92eaa4ea-ca35-11e7-9511-a746c7fbf2c4.png">
</figure>
[Atom]: https://atom.io
[9]: https://caskroom.github.io
[10]: https://caskroom.github.io
[Crowdin]: https://crowdin.com/project/electron
[4]: https://crowdin.com/project/electron
[5]: https://crowdin.com/project/electron
[6]: https://github.com/electron/electron-apps
[7]: https://github.com/electron/electron-apps
[elétron/elétron-i18n]: https://github.com/electron/electron-i18n#readme
[electronjs.org]: https://electronjs.org
[gitHub Desktop]: https://desktop.github.com
[Homebrew]: https://brew.sh
[Jekyll]: https://jekyllrb.com
[Node.js]: https://nodejs.org