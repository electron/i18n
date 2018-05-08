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

A versão do Chromium do Electron é atualizada normalmente uma ou duas semanas depois que uma nova versão estável do Chromium é liberada, dependendo do esforço envolvido na atualização.

Quando uma nova versão do Node.js é lançada, Electron espera normalmente ceerca de um mês antes de atualizar de modo a trazer uma versão mais estável.

No Electron, Node.js e Chromium compartilham uma única instância V8 — normalmente a versão que o Chromium está usando. Na maioria das vezes isso já *funciona a contento* mas algumas vezes significa que corrigir o Node.js.

### Controle de Versão

A partir da versão 2.0, Electron [segue `semver`](https://semver.org). Para a maioria das aplicações, e usando qualquer versão recente do npm, executar `$ npm install electron` fará a coisa certa.

O processo de atualização de versão é detalhado explicitamente em nosso [Documento de Versionamento](electron-versioning.md).

### LTS

Não existe atualmente suporte a versões antigas do Electron para longo prazo (LTS). Se a sua versão atual do Electron funciona para você, você pode permanecer com ele o tempo que desejar. Se você quer usar as novas funcionalidades quando elas são lançadas, você deve atualizar para a nova versão.

Uma atualização principal vem o número de versão `1.0.0`. Se você ainda não está usando esta versão, deveria [ler mais sobre as mudança na versão` v. 1.0.0`](https://electronjs.org/blog/electron-1-0).

## Filosofia Básica

Para manter Electron pequeno (tamanho de arquivo) e sustentável (a disseminação de dependências e APIs), o projeto limita o escopo do núcleo do projeto.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. Isso torna mais fácil atualizar o Chromium mas também significa que algumas características do browser encontradas no Google Chromium não existem no Electron.

Novas características adicionados ao Electron poderiam ser primariamente APIs nativas. Se uma característica pode ser um módulo Node.js, ele provavelmente será. Veja as [ferramentas do Electron criadas pela comunidade](https://electronjs.org/community).

## História

Abaixo estão marcos na história do Electron.

| :calendar:         | :tada:                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------- |
| **Abril de 2013**  | [Atom Shell é iniciado](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Maio de 2014**   | [Atom Shell tem código fonte aberto](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).            |
| **Abril de 2015**  | [Atom Shell é renomeado para Electron](https://github.com/electron/electron/pull/1389).                        |
| **Maio de 2016**   | [Electron versão `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                          |
| **Maio de 2016**   | [Electron apps são compatíveis com Mac App Store](mac-app-store-submission-guide.md).                          |
| **Agosto de 2016** | [Electron apps são compatíveis com Windows Store](windows-store-guide.md).                                     |