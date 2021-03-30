---
title: Documentação da API do Electron como Dados Estruturados
author: zeke
date: '2016-09-27'
---

Hoje estamos anunciando algumas melhorias na documentação do Electron. A cada nova versão agora inclui um [arquivo JSON](https://github.com/electron/electron/releases/download/v1.4.1/electron-api.json) que descreve detalhadamente todas as APIs públicas do Electron. Nós criamos este arquivo para permitir que os desenvolvedores usem a documentação da API do Electron de novas maneiras interessantes.

---

## Visão geral

Cada API é um objeto com propriedades como nome, descrição, tipo, etc. Aulas como `BrowserWindow` e `Menu` têm propriedades adicionais descrevendo seus métodos de instância, propriedades de instância, eventos de instância, etc.

Aqui está um excerto do esquema que descreve a classe `BrowserWindow` (Janela de Navegação):

```js
{
  nome: 'BrowserWindow',
  descrição: 'Criar e controlar janelas do navegador.',
  processo: {
    main: true,
    renderer: false
  }, tipo
  : 'Classe',
  instânciaNo nome: 'ganhar',
  lesma: 'janela do navegador',
  siteUrl: 'https://electronjs.org/docs/api/browser-window',
  repoUrl: 'https://github.com/electron/electron/blob/v1.4.0/docs/api/browser-window.md',
  estáticaMethods: [...],
  instanceMethods: [...],
  instancePropérties: [...],
  instanceEvents: [...]
}
```

E aqui está um exemplo de uma descrição de método, neste caso o método de instância `apis.BrowserWindow.instanceMethods.setMaximumSize`:

```js
{
  name: 'setMaximumSize',
  signature: '(width, height)',
  description: 'Sets the maximum size of window to width and height.',
  parameters: [{
    name: 'width',
    type: 'Integer'
  }, {
    name: 'height',
    type: 'Integer'
  }]
}
```

## Usando os novos dados

Para facilitar o uso desses dados estruturados pelos desenvolvedores em seus projetos, criamos [electron-docs-api](https://www.npmjs.com/package/electron-api-docs), um pequeno pacote npm que é publicado automaticamente sempre que houver uma nova versão do Electron.

```sh
npm install electron-api-docs --save
```

Para gratificação instantânea, experimente o módulo no seu Node.js REPL:

```sh
npm i -g trymodule && trymodule electron-api-docs=apis
```

## Como os dados são coletados

Documentação da API do Electron adere ao [Electron Coding Style](https://github.com/electron/electron/blob/master/docs/development/coding-style.md) e ao [Electron Styleguide](https://github.com/electron/electron/blob/master/docs/styleguide.md#readme), para que o seu conteúdo possa ser analisado programaticamente.

O [electron-docs-linter](https://github.com/electron/electron-docs-linter) é uma nova dependência de desenvolvimento do repositório `electron/electron`. É uma ferramenta de linha de comando que limpa todos os arquivos markdown e impõe as regras do styleguide. Se os erros forem encontrados, eles serão listados e o processo de liberação for interrompido. Se a documentação da API for válida, o `electron-json. pi` arquivo é criado e [é enviado para o GitHub](https://github.com/electron/electron/releases/tag/v1.4.1) como parte da versão do Electron.

## Javascript padrão e Markdown padrão

No início deste ano, a base de código do Electron foi atualizada para usar o linter[`padrão`](http://standardjs.com/) para todos os JavaScript. O padrão README resume o raciocínio por trás desta escolha:

> Adotar o estilo padrão significa classificar a importância da clareza do código e das convenções da comunidade acima do estilo pessoal. Isto pode não fazer sentido para 100% dos projectos e das culturas de desenvolvimento, por mais que a fonte aberta possa ser um lugar hostil para os novatos. Configurar expectativas claras e automatizadas dos colaboradores torna um projeto mais saudável.

Também criamos recentemente [padrão markdown](https://github.com/zeke/standard-markdown) para verificar se todos os trechos de código JavaScript em nossa documentação são válidos e consistentes com o estilo na própria base de código.

Juntos estas ferramentas nos ajudam a usar a integração contínua (CI) para encontrar automaticamente erros em pull requests. Isso reduz a carga colocada sobre os humanos fazendo uma revisão e nos dá mais confiança sobre a precisão de nossa documentação.

### Um esforço comunitário

A documentação do Electron está constantemente melhorando, e temos nossa incrível comunidade de código aberto para agradecê-la. A partir deste artigo, quase 300 pessoas contribuíram para a documentação.

Estamos animados para ver o que as pessoas fazem com esses novos dados estruturados. Possíveis usos incluem:

- Melhorias em [https://electronjs.org/docs/](https://electronjs.org/docs/)
- Um [arquivo de definição TypeScript](https://github.com/electron/electron-docs-linter/blob/master/README.md#typescript-definitions) para desenvolvimento Electron mais simplificado em projetos usando TypeScript.
- Documentação off-line pesquisável para ferramentas como [Dash.app](https://kapeli.com/dash) e [devdocs.io](http://devdocs.io/)

