---
title: "Anunciando suporte do TypeScript no Electron"
author: zeke
date: '2017-06-01'
---

O pacote npm `electron` agora inclui um arquivo de definição TypeScript que fornece anotações detalhadas de toda a API do Electron. Essas anotações podem melhorar sua experiência de desenvolvimento do Electron **mesmo se você estiver escrevendo o vanilla JavaScript**. Apenas `npm install electron` para obter tipos atualizados do Electron em seu projeto.

---

TypeScript é uma linguagem de programação de código aberto criada pela Microsoft. É um superconjunto de JavaScript que estende a linguagem adicionando suporte para tipos estáticos . A comunidade TypeScript cresceu rapidamente nos últimos anos. e TypeScript se classificou entre as [linguagens de programação mais amadas](https://stackoverflow.com/insights/survey/2017#technology-most-loved-dreaded-and-wanted-languages) em uma pesquisa recente de desenvolvedor do Stack Overflow.  TypeScript é descrito como "JavaScript que dimensiona" e equipes no [GitHub](https://githubengineering.com/how-four-native-developers-wrote-an-electron-app/), [Slack](https://slack.engineering/typescript-at-slack-a81307fa288d), e [Microsoft](https://github.com/Microsoft/vscode) estão todos usando para escrever aplicativos Electron escaláveis que são usados por milhões de pessoas.

TypeScript suporta muitos dos recursos de linguagem mais recentes em JavaScript, como classes, desestruturação de objetos, e async/aguarda, mas seu recurso diferencial real é **as anotações do tipo**. Declarar os tipos de dados de entrada e saída esperados pelo seu programa pode [reduzir](https://slack.engineering/typescript-at-slack-a81307fa288d) bugs ajudando você a encontrar erros na hora de compilação, e as anotações também podem servir como uma declaração formal de [como o seu programa funciona](https://staltz.com/all-js-libraries-should-be-authored-in-typescript.html).

Quando as bibliotecas são escritas em Javascript vanilla, os tipos são muitas vezes vagamente definidos como uma ideia após ao escrever documentação. Funções podem muitas vezes aceitar mais tipos do que o que foi documentado, ou uma função pode ter restrições invisíveis que não estão documentadas, o que pode levar a erros em tempo de execução.

TypeScript resolve este problema com **arquivos de definição**. Um arquivo de definição TypeScript descreve todas as funções de uma biblioteca e suas esperadas entradas e tipos de saída. Quando autores de biblioteca empacotam um arquivo de definição do TypeScript com sua biblioteca publicada, os consumidores dessa biblioteca podem [explorar a sua API diretamente dentro do seu editor](https://code.visualstudio.com/docs/editor/intellisense) e começar a usá-la imediatamente, muitas vezes sem precisar consultar a documentação da biblioteca.

Muitos projetos populares como [Angular](https://angularjs.org/), [Vue. s](http://vuejs.org/), [node-github](https://github.com/mikedeboer/node-github) (e agora Electron! compile seu próprio arquivo de definição e junte-o com seu pacote npm publicado. Para projetos que não agrupam seu próprio arquivo de definição, há [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped), um ecossistema de terceiros de arquivos de definição mantidos pela comunidade.

## Instalação

A partir da versão 1.6.10, cada versão do Electron inclui seu próprio arquivo de definição TypeScript. Quando você instalar o `electron` pacote do npm, o `arquivo electron.d.ts` é empacotado automaticamente com o pacote instalado.

A maneira mais segura de [](https://electronjs.org/docs/tutorial/electron-versioning/) instalar o Electron é usando um número exato da versão:

```sh
npm install electron --save-dev --save-exact
```

Ou se você estiver usando [yarn](https://yarnpkg.com/lang/en/docs/migrating-from-npm/#toc-cli-commands-comparison):

```sh
yarn add electron --dev --exact
```

Se você já estivesse usando definições de terceiros como `@types/electron` e `@types/node`, você deve removê-los de seu projeto Electron para evitar colisões.

O arquivo de definição é derivado de nossa [documentação da API estruturada](https://electronjs.org/blog/2016/09/27/api-docs-json-schema), então será sempre consistente com a [documentação de API do Electron](https://electronjs.org/docs/api/). Just install `electron` and you'll always get TypeScript definitions that are up to date with the version of Electron you're using.

## Usando

Para um resumo de como instalar e usar as novas anotações do Electron's TypeScript, assista esta breve screencast: <iframe width="100%" height="420" src="https://www.youtube.com/embed/PJRag0rYQt8" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

If you're using [Visual Studio Code](https://code.visualstudio.com/), you've already got TypeScript support built in. There are also community-maintained plugins for [Atom](https://atom.io/packages/atom-typescript), [Sublime](https://github.com/Microsoft/TypeScript-Sublime-Plugin), [vim](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support#vim), and [other editors](https://www.typescriptlang.org/index.html#download-links).

Once your editor is configured for TypeScript, you'll start to see more context-aware behavior like autocomplete suggestions, inline method reference, argument checking, and more.

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128017/f6318c20-3a3f-11e7-9c2c-401a32d1f9fb.png" alt="Autocompletar método">
  <figcaption>Completar método de autenticação</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128018/f6352600-3a3f-11e7-8d92-f0fb88ecc53e.png" alt="Método de referência">
  <figcaption>Referência do método embutida</figcaption>
</figure>

<figure>
  <img src="https://cloud.githubusercontent.com/assets/2289/26128021/f6b1ca0c-3a3f-11e7-8161-ce913268a9f0.png" alt="Verificação de argumento">
  <figcaption>Verificação de argumento</figcaption>
</figure>

## Primeiros passos com TypeScript

Se você é novo no TypeScript e quer aprender mais, Este [vídeo introdutório da Microsoft](http://video.ch9.ms/ch9/4ae3/062c336d-9cf0-498f-ae9a-582b87954ae3/B881_mid.mp4) fornece uma boa visão geral do porquê do idioma foi criado. como funciona, como usá-la, e para onde ela vai.

Há também um [manual](https://www.typescriptlang.org/docs/handbook/basic-types.html) e um [playground](https://www.typescriptlang.org/play/index.html) no site oficial TypeScript.

Como TypeScript é um superconjunto de JavaScript, seu código JavaScript existente já é válido TypeScript. Isso significa que você pode transicionar gradualmente um projeto JavaScript existente para TypeScript, espalhando novos recursos de idioma conforme necessário.

## Agradecimentos

Este projeto não teria sido possível sem a ajuda da comunidade do Electron's de mantenedores de código aberto. Graças a [Samuel Attard](https://github.com/MarshallOfSound), [Felix Rieseberg](https://github.com/felixrieseberg), [Birundo Mohanathas](https://github.com/poiru), [Milão Burda](https://github.com/miniak), , [Brendan Forster](https://github.com/shiftkey), e muitos outros por suas correções de bugs, melhorias de documentação, orientações técnicas.

## Suporte

Se você encontrar algum problema usando os novos arquivos de definição de TypeScript, por favor registre um problema no repositório [electron-typescript-definitions](https://github.com/electron/electron-typescript-definitions/issues).

Feliz TypeScripting!
