---
title: Linguagem da Electron
author: zeke
date: '2016-12-20'
---

We've added a new [userland](https://electronjs.org/userland) section to the Electron website to help users discover the people, packages, and apps that make up our flourishing open-source ecosystem.

---

[![github-contributors](https://cloud.githubusercontent.com/assets/2289/21205352/a873f86c-c210-11e6-9a92-1ef37dfc986b.png)](https://electronjs.org/userland)

## Origens do Userland

Userland é onde as pessoas das comunidades de software se unem para compartilhar ferramentas e ideias. O termo se originou na comunidade Unix, onde se referia a qualquer programa que rodasse para fora do kernel, mas hoje isso significa algo mais. Quando as pessoas na comunidade Javascript de hoje se referem ao userland, geralmente estão falando sobre o [registro do pacote npm](http://npm.im). É aqui que a maioria das tentativas e inovação acontece, enquanto o Node e a linguagem JavaScript (como o kernel Unix) retêm um conjunto relativamente pequeno e estável de recursos nativos.

## Node e Electron

Como Node, o Electron tem um pequeno conjunto de APIs principais. Estes fornecem os recursos básicos necessários para o desenvolvimento de aplicativos de área de trabalho multi-plataforma. Esta filosofia do projeto permite que o Electron permaneça uma ferramenta flexível sem ser excessivamente prescritiva sobre como deve ser usado.

Userland é a contraparte ao "núcleo", permitindo que os usuários criem e compartilhem ferramentas que ampliam as funcionalidades do Electron.

## Coletando dados

Para entender melhor as tendências em nosso ecossistema, analisamos metadados de 15 00 repositórios públicos do GitHub que dependem de `electron` ou `electron-prebuilt`

We used the [GitHub API](https://developer.github.com/v3/), the [libraries.io API](https://libraries.io/api), and the npm registry to gather info about dependencies, development dependencies, dependents, package authors, repo contributors, download counts, fork counts, stargazer counts, etc.

Em seguida, usamos esses dados para gerar os seguintes relatórios:

- [Dependências de Desenvolvimento de Apps](https://electronjs.org/userland/dev_dependencies): Pacotes mais frequentemente listados como `devDependências` em aplicativos Electron.
- [GitHub Contributors](https://electronjs.org/userland/github_contributors): Usuários GitHub que contribuíram para vários repositórios GitHub relacionados ao Electron.
- [Dependências de pacote](https://electronjs.org/userland/package_dependencies): Pacotes npm relacionados ao Electron que são frequentemente dependentes de outros pacotes npm.
- [Aplicativos favoritos](https://electronjs.org/userland/starred_apps): Electron apps (que não são pacotes npm) com inúmeros stargazers.
- [Pacotes mais baixados](https://electronjs.org/userland/most_downloaded_packages): Pacotes npm relacionados à Electron que são muito baixados.
- [Dependências de Aplicativos](https://electronjs.org/userland/dependencies): Pacotes mais frequentemente listados como `dependências` em aplicativos Electron.
- [Autores de Pacotes](https://electronjs.org/userland/package_authors): Os autores mais prolíficos dos pacotes npm relacionados ao Electron.

## Filtrando resultados

Relatórios como [dependências de aplicativos](https://electronjs.org/userland/dependencies) e [aplicativos favoritos](https://electronjs.org/userland/starred_apps) quais lista pacotes, apps e repos têm uma entrada de texto que pode ser usada para filtrar os resultados.

Enquanto você digita nesta entrada, a URL da página é atualizada dinamicamente. Isso permite que você copie uma URL que representa uma fatia específica de dados de userland, e então compartilhe com outras pessoas.

[![bebê](https://cloud.githubusercontent.com/assets/2289/21328807/7bfa75e4-c5ea-11e6-8212-0e7988b367fd.png) ](https://electronjs.org/userland/dev_dependencies?q=babel%20preset)

## Mais por vir

Este primeiro conjunto de relatórios é apenas o começo. Nós continuaremos a coletar dados sobre como a comunidade está construindo o Electron, e adicionaremos novos relatórios ao site.

Todas as ferramentas usadas para coletar e exibir esses dados são abertas:

- [electron/electronjs.org](https://github.com/electron/electron.atom): Site do Electron.
- [Electron-userland-reports](https://github.com/electron/electron-userland-reports): Fatias de dados sobre pacotes, repositórios e usuários do Electron
- [electron/repos-using-electron](https://github.com/electron/repos-using-electron)</a>: todos os repositórios públicos no GitHub que dependem do `electron` ou do `electron-prebuilt`
- [electron/electron-npm-packages](https://github.com/zeke/electron-npm-packages): Todos os pacotes npm que mencionam o `electron` em seu arquivo `package.json`.

Se você tem ideias sobre como melhorar esses relatórios, por favor deixe-nos saber [abrir um problema no repositório do site](https://github.com/electron/electronjs.org/issues/new) ou qualquer um dos repositórios acima mencionados.

Graças a você, a comunidade Electron, por fazer do userland o que é hoje!

