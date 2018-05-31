# Sobre Electron

[Electron](https://electronjs.org) é uma biblioteca de código aberto desenvolvida pelo GitHub para o desenvolvimento de aplicativos desktop multiplataforma usando HTML, CSS e JavaScript. O Electron consegue isso combinando [Chromium](https://www.chromium.org/Home) e [Node.js](https://nodejs.org) em um único ambiente de execução. Aplicativos Electron podem ser lançados para Mac, Windows e Linux.

Electron começou em 2013, como um framewok que seria utilizado para construir o [Atom](https://atom.io), o editor de texto hackeável do GitHub. Os dois foram disponibilizados na primavera de 2014, com seu código fonte aberto.

Desde então, ele se tornou uma ferramenta popular usada por desenvolvedores de código aberto, startups e empresas estabelecidas no mercado. [Veja quem está mandando ver com o Electron](https://electronjs.org/apps).

Para aprender mais sobre os contribuidores e lançamentos do Electron ou para começar a criar apps com o Electron, confira nosso [guia rápido](quick-start.md).

## Equipe Principal e Contribuidores

O Electron é mantido por uma equipe no GitHub, juntamente com um grupo de [contribuidores ativos](https://github.com/electron/electron/graphs/contributors) da comunidade. Alguns dos contribuidores são individuais e outros trabalham em grandes empresas que estão usando o Electron. Ficamos contentes em adicionar contribuidores frequentes ao projeto como mantenedores. Leia mais sobre como [contribuir para o Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Versões

Frequentemente são liberadas novas [versões do Electron](https://github.com/electron/electron/releases). Nós as liberamos sempre que existirem importantes correções de bugs, novas APIs ou atualizações do Chromium ou do Node.js.

### Atualizando as Dependências

A versão do Chromium do Electron normalmente é atualizada uma ou duas semanas depois que uma nova versão estável do Chromium é liberada, dependendo do esforço envolvido na atualização.

Quando uma nova versão do Node.js é lançada, o Electron espera normalmente cerca de um mês antes de atualizá-lo, de modo a garantir uma versão mais estável.

No Electron, o Node.js e o Chromium compartilham uma única instância V8 — normalmente na versão que o Chromium está usando. Na maioria das vezes isso *funciona já de cara*, mas em outras se faz necessário aplicar ajustes no Node.js.

### Controle de Versão

A partir da versão 2.0, o Electron [segue o padrão `semver`](https://semver.org). Para a maioria das aplicações, e usando qualquer versão recente do npm, basta executar `$ npm install electron` e tudo vai vir certinho.

O processo de atualização de versão é detalhado explicitamente em nosso [Documento de Versionamento](electron-versioning.md).

### LTS

Não existe atualmente suporte a versões antigas do Electron para longo prazo (LTS). Se a sua versão atual do Electron funciona para você, você pode continuar usando ela pelo tempo que desejar. Se você quiser usar as novas funcionalidades assim que elas forem lançadas, considere atualizar para uma versão mais recente.

Uma atualização massiva foi liberada na versão `v1.0.0`. Se você ainda não está usando esta versão, recomendamos que você [leia mais sobre as mudanças na versão` v. 1.0.0`](https://electronjs.org/blog/electron-1-0).

## Filosofia Básica

Para manter Electron pequeno (tamanho de arquivo) e sustentável (a disseminação de dependências e APIs), o projeto limita o escopo do núcleo do projeto.

Por exemplo, o Electron utiliza apenas a biblioteca de renderização do Chromium ao invés do Chromium como um todo. Isso torna mais fácil atualizar o Chromium, mas também significa que alguns recursos de navegador encontradas no Google Chrome não existem no Electron.

Novas características adicionados ao Electron poderiam ser primariamente APIs nativas. Se um recurso puder ser um módulo separado do Node.js, ele provavelmente será. Veja as [ferramentas do Electron criadas pela comunidade](https://electronjs.org/community).

## Histórico

Abaixo estão marcos na história do Electron.

| :calendar:         | :tada:                                                                                                                   |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| **Abril de 2013**  | [O projeto Atom Shell é iniciado](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Maio de 2014**   | [Liberado o código fonte do Atom Shell](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                   |
| **Abril de 2015**  | [Atom Shell é renomeado para Electron](https://github.com/electron/electron/pull/1389).                                  |
| **Maio de 2016**   | [Electron lança a versão `v1.0.0`](https://electronjs.org/blog/electron-1-0).                                            |
| **Maio de 2016**   | [Apps Electron são compatíveis com a Mac App Store](mac-app-store-submission-guide.md).                                  |
| **Agosto de 2016** | [Apps Electron são compatíveis com a Windows Store](windows-store-guide.md).                                             |