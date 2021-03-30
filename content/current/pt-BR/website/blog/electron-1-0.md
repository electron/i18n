---
title: Electron 1.0
author: lorde
date: '2016-05-11'
---

Nos últimos dois anos, o Electron tem ajudado os desenvolvedores a construir aplicativos desktop multiplataforma usando HTML, CSS e JavaScript. Agora estamos animados para compartilhar um grande marco para nossa estrutura e para a comunidade que o criou. The release of Electron 1.0 is now available from [electronjs.org][electronjs.org].

---

![Electron 1.0](https://cloud.githubusercontent.com/assets/378023/15007352/315f5eea-1213-11e6-984e-21f5dab31267.png)

O Electron 1.0 representa um marco importante na estabilidade e maturidade da API. Esta versão permite que você construa aplicativos que atuam e se sintam verdadeiramente nativos do Windows, Mac e Linux. Criar aplicativos Electron é mais fácil do que nunca com novas documentações, novas ferramentas e um novo aplicativo para guiá-lo através das APIs do Electron.

If you're ready to build your very first Electron app, here's a [quick start guide][quick-start] to help you get started.

Estamos animados para ver o que você constrói a seguir com o Electron.

## Caminho do Electron's

We released Electron when we launched [Atom][atom] a little over two years ago. O Electron, então conhecido como Atom Shell, era a estrutura que tínhamos construído Atom sobre cima. Nesses dias Atom foi a força motriz por trás dos recursos e funcionalidades que o Electron forneceu enquanto fizemos push para obter o lançamento inicial do Atom

Now driving Electron is a growing community of developers and companies building everything from [email][nylas], [chat][slack], and [Git apps][gitkraken] to [SQL analytics tools][wagon], [torrent clients][webtorrent], and [robots][jibo].

Nesses dois últimos anos, vimos empresas e projetos de código aberto escolherem o Electron como base para seus aplicativos. No ano passado, o Electron foi baixado mais de 1,2 milhões de vezes. [Take a tour][apps] of some of the amazing Electron apps and add your own if it isn't already there.

![Downloads de Electron](https://cloud.githubusercontent.com/assets/378023/15037731/af7e87e0-12d8-11e6-94e2-117c360d0ac9.png)

## Demonstrações da API Electron

Juntamente com o 1. liberar, estamos lançando um novo aplicativo para ajudá-lo a explorar as APIs do Electron e aprender mais sobre como fazer seu aplicativo Electron se sentir nativo. The [Electron API Demos][electron-api-demos] app contains code snippets to help you get your app started and tips on effectively using the Electron APIs.

[![Demonstrações da API Electron](https://cloud.githubusercontent.com/assets/378023/15138216/590acba4-16c9-11e6-863c-bdb0d3ef3eaa.png)][electron-api-demos]

## Devtron

Nós também adicionamos uma nova extensão para ajudá-lo a depurar seus apps Electron. [Devtron][devtron] is an open-source extension to the [Chrome Developer Tools][devtools] designed to help you inspect, debug, and troubleshoot your Electron app.

[![Devtron](https://cloud.githubusercontent.com/assets/378023/15138217/590c8b06-16c9-11e6-8af6-ef96299e85bc.png)][devtron]

### Funcionalidades

  * **Requer um gráfico** que ajuda a visualizar as dependências da biblioteca interna e externa do aplicativo nos processos principal e de renderização
  * **Monitor IPC** que rastreia e exibe as mensagens enviadas e recebidas entre os processos no seu app
  * **inspector de eventos** que mostra os eventos e ouvintes que são registrados no seu aplicativo nas APIs centrais do Electron, como a janela, app e processos
  * **App Linter** que verifica seus aplicativos se cometem erros comuns e funcionalidades ausentes.

## Spectron

Finally, we're releasing a new version of [Spectron][spectron], the integration testing framework for Electron apps.

[![Spectron](https://cloud.githubusercontent.com/assets/378023/15138218/590d50c2-16c9-11e6-9b54-2d73729fe189.png)][spectron]

Spectron 3. tem suporte abrangente para toda a API do Electron que lhe permite escrever testes mais rapidamente que verificam o comportamento da sua aplicação em vários cenários e ambientes. Spectron is based on [ChromeDriver][chromedriver] and [WebDriverIO][webdriver] so it also has full APIs for page navigation, user input, and JavaScript execution.

## Comunidade

Electron 1.0 é o resultado de um esforço comunitário de centenas de desenvolvedores. Fora da estrutura principal, houve centenas de bibliotecas e ferramentas lançadas para tornar mais fácil a construção, embalagem e implantação de aplicativos Electron.

There is now a new [community][community] page that lists many of the awesome Electron tools, apps, libraries, and frameworks being developed. You can also check out the [Electron][electron-org] and [Electron Userland][electron-userland] organizations to see some of these fantastic projects.

Novo no Electron? Assista ao vídeo de introdução do Electron 1.0:

<div class="video"><iframe src="https://www.youtube.com/embed/8YP_nOCO-4Q?rel=0" frameborder="0" allowfullscreen></iframe></div>
[apps]: https://electronjs.org/apps
[atom]: https://atom.io
[chromedriver]: https://sites.google.com/a/chromium.org/chromedriver
[community]: https://electronjs.org/community
[devtools]: https://developer.chrome.com/devtools
[devtron]: https://electronjs.org/devtron
[devtron]: https://electronjs.org/devtron
[electronjs.org]: https://electronjs.org
[electron-api-demos]: https://github.com/electron/electron-api-demos
[electron-api-demos]: https://github.com/electron/electron-api-demos
[electron-org]: https://github.com/electron
[electron-userland]: https://github.com/electron-userland
[gitkraken]: https://www.gitkraken.com
[jibo]: https://www.jibo.com
[nylas]: https://nylas.com
[quick-start]: https://electronjs.org/docs/tutorial/quick-start
[slack]: https://slack.com
[spectron]: https://electronjs.org/spectron
[spectron]: https://electronjs.org/spectron
[wagon]: https://www.wagonhq.com
[webtorrent]: https://webtorrent.io/desktop
[webdriver]: http://webdriver.io

