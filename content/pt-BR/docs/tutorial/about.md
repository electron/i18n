# Sobre Electron

[Electron](https://electronjs.org) é uma biblioteca open source desenvolvida pelo GitHub para o desenvolvimento de aplicações desktop multi-plataforma com HTML, CSS e JavaScript. Electron realiza isto combinando [Chromium](https://www.chromium.org/Home) e [Node.js](https://nodejs.org) em uma única runtime e os aplicativos podem ser empacotados para Mac, Windows e Linux.

Electron começou em 2013, como um framewok que seria utilizado para construir o [Atom](https://atom.io), o editor de texto hackeável do GitHub. Os dois foram disponibilizados na primavera de 2014, com seu código fonte aberto.

Desde então ele se tornou uma ferramenta popular usada por desenvolvedores de código aberto, startups e empresas estabelecidas. [ Veja quem está utilizando Electron](https://electronjs.org/apps).

Continue lendo para aprender mais sobre os contribuidores e lançamentos do Electron ou comece a criar com Electron no [Guia Rápido](quick-start.md).

## Equipe Principal e Contribuidores

Electron é mantido por uma equipe do GitHub, bem como um grupo de [contribuidores ativos](https://github.com/electron/electron/graphs/contributors) da comunidade. Alguns dos contribuidores são indivíduos e alguns trabalham em grandes empresas que estão utilizando Electron. Estamos felizes em adicionar contribuidores frequentes ao projeto como mantedores. Leia mais sobre como [contribuir para o Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Versões

Frequentemente são liberadas novas [versões do Electron](https://github.com/electron/electron/releases). Nós liberamos quando existem importantes correções de bugs, novas APIs ou são versões de atualização do Chromium ou Node.js.

### Atualizando as Dependências

Electron's version of Chromium is usually updated within one or two weeks after a new stable Chromium version is released, depending on the effort involved in the upgrade.

When a new version of Node.js is released, Electron usually waits about a month before upgrading in order to bring in a more stable version.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### Controle de Versão

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Não existe atualmente suporte a versões antigas do Electron para longo prazo (LTS). If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electronjs.org/blog/electron-1-0).

## Core Philosophy

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## History

Below are milestones in Electron's history.

| :calendar:         | :tada:                                                                                                                  |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| **Abril 2013**     | [Atom Shell é iniciado](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).          |
| **Maio de 2014**   | [Atom Shell tem código fonte aberto](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                      |
| **Abril de 2015**  | [Atom Shell é renomeado para Electron](https://github.com/electron/electron/pull/1389).                                 |
| **Maio de 2016**   | [Electron versão `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                                   |
| **Maio de 2016**   | [Electron apps são compatíveis com Mac App Store](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **Agosto de 2016** | [Electron apps são compatíveis com Windows Store](https://electronjs.org/docs/tutorial/windows-store-guide).            |