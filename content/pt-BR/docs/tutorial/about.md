# Sobre Electron

[Electron](https://electron.atom.io) é uma biblioteca open source desenvolvida pelo o GitHub para o desenvolvimento de aplicações desktop multi-plataforma com HTML, CSS e JavaScript. Electron é uma combinação de [Chromium](https://www.chromium.org/Home) e [Node.js](https://nodejs.org) executados juntos em tempo de execução. Os apps podem ser empacotados para Mac, Windows, e Linux.

E Electron foi criado em 2013 como um framework do [Atom](https://atom.io), GitHub's hackable text editor, podendo ser criado. Os dois tiveram o código fonte aberto na primavera de 2014. 

Desde de então tornou-se uma ferramenta muito popular entre os desenvolvedores open source, startups, e empresas. [Veja quem está desenvolvendo com Electron](https://electron.atom.io/apps/).

Leia para saber mais sobre os colaboradores e versões do Electron ou comece a criar aplicações com Electron no seguindo o [Guia rápido](quick-start.md).

## Equipe Principal e Colaboradores

Electron é mantido por um time do Github bem como o grupo de [colaboradores ativos](https://github.com/electron/electron/graphs/contributors) da comunidade. Alguns colaboradores são pessoas individuais e algumas trabalham em grandes empresas que estão desenvolvendo aplicações com Electron. Nós ficamos muito felizes por adicionar colaboradores frequentes no projeto como mantededores. Leia mais sobre como [contribuir com o Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Versões

[Versões do Electron](https://github.com/electron/electron/releases). Nós liberamos uma nova versão quando existe uma correção para um determinado bug, novas APIs ou atualização do Chromium ou Node.js.

### Atualização de Depedências

A versão do Chromium do Electron é normalmente atualizado após uma ou duas semanas depois que uma versão estável do Chromium é liberada, dependendo do esforço envolvido na atualização.

Quando uma nova versão do Node.js é lançada, normalmente aguardamos um mês antes da atualização do Electron, para trazer uma versão mais estável.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### Versioning

Due to the hard dependency on Node.js and Chromium, Electron is in a tricky versioning position and [does not follow `semver`](http://semver.org). You should therefore always reference a specific version of Electron. [Read more about Electron's versioning](https://electron.atom.io/docs/tutorial/electron-versioning/) or see the [versions currently in use](https://electron.atom.io/#electron-versions).

### LTS

Long term support of older versions of Electron does not currently exist. If your current version of Electron works for you, you can stay on it for as long as you'd like. If you want to make use of new features as they come in you should upgrade to a newer version.

A major update came with version `v1.0.0`. If you're not yet using this version, you should [read more about the `v1.0.0` changes](https://electron.atom.io/blog/2016/05/11/electron-1-0).

## Core Philosophy

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

For instance, Electron uses just the rendering library from Chromium rather than all of Chromium. This makes it easier to upgrade Chromium but also means some browser features found in Google Chrome do not exist in Electron.

New features added to Electron should primarily be native APIs. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electron.atom.io/community).

## History

Below are milestones in Electron's history.

| :calendar:      | :tada:                                                                                                                |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| **April 2013**  | [Atom Shell is started](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).        |
| **May 2014**    | [Atom Shell is open sourced](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                            |
| **April 2015**  | [Atom Shell is re-named Electron](https://github.com/electron/electron/pull/1389).                                    |
| **May 2016**    | [Electron releases `v1.0.0`](https://electron.atom.io/blog/2016/05/11/electron-1-0).                                  |
| **May 2016**    | [Electron apps compatible with Mac App Store](https://electron.atom.io/docs/tutorial/mac-app-store-submission-guide). |
| **August 2016** | [Windows Store support for Electron apps](https://electron.atom.io/docs/tutorial/windows-store-guide).                |