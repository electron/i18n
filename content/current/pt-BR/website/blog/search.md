---
title: Buscar
author:
  - echjordan
  - vanessayuenn
  - zeke
date: '2018-06-21'
---

O site do Electron tem um novo motor de busca que oferece resultados instantâneos para documentação de API, tutoriais, pacotes npm relacionados à Electron, e muito mais.

<figure>
  <a href="https://electronjs.org/?query=resize" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/41683719-417ca80a-7490-11e8-9a52-fb145f4251ba.png" alt="Screenshot da Busca do Electron">
  </a>
</figure>

---

Aprender uma nova tecnologia ou quadro, como o Electron pode intimidar tudo. Uma vez que você passar pela fase [][] de início rápido, pode ser difícil aprender as melhores práticas, encontrar as APIs certas ou descobrir as ferramentas que o ajudarão a construir o aplicativo dos seus sonhos. Queremos que o site do Electron seja uma ferramenta melhor para encontrar os recursos que você precisa para criar aplicativos mais rápido e mais facilmente.

Visite qualquer página no [electronjs.org](https://electronjs.org) e você encontrará a nova entrada de pesquisa no topo da página.

## O Mecanismo de Busca

Quando começamos a adicionar pesquisa ao site, lançamos nosso próprio mecanismo de pesquisa usando GraphQL como um backend. Gráfico do QL foi divertido para trabalhar e o motor de busca foi intérprete, mas nós rapidamente percebemos que construir um motor de pesquisa não é uma tarefa trivial. Coisas como busca e detecção de erros de digitação exigem muito trabalho para acertar. Em vez de reinventar a roda, decidimos usar uma solução de busca existente: [Algolia][].

Algolia é um serviço de pesquisa hospedado que rapidamente se tornou o mecanismo de busca escolha entre projetos de código aberto populares como React, Vue, Bootstrap, Yarn e [muitos outros](https://community.algolia.com/docsearch/).

Aqui estão alguns dos recursos que fizeram com que Algolia se encaixe bem no projeto Electron:

- [InstantSearch.js](https://community.algolia.com/instantsearch.js) fornece resultados conforme você digita, geralmente em cerca de 1ms.
- [tolerância ao erro de digitação](https://www.algolia.com/doc/guides/textual-relevance/typo-tolerance/) significa que você ainda terá resultados mesmo quando digitar [`widnow`][].
- [Sintaxe de consulta avançada](https://www.algolia.com/doc/api-reference/api-parameters/advancedSyntax/) habilita `"correspondências de cotações exatas"` e `-exclusão`.
- [Clientes de API](https://www.algolia.com/doc/api-client/javascript/getting-started/) são código aberto e com bem documentado.
- [Analise](https://www.algolia.com/doc/guides/analytics/analytics-overview/) nos diz o que as pessoas estão procurando mais, bem como o que estão procurando mas não encontrando. Isso dar-nos-á uma informação valiosa sobre como melhorar a documentação do Electron.
- O Algolia é [gratuito para projetos de código aberto](https://www.algolia.com/for-open-source).

## API Docs

Sometimes you know *what* you want to accomplish, but you don't know exactly *how* to do it. O Electron tem mais de 750 métodos, eventos e propriedades da API. Nenhum humano se recorda de todos eles, mas os computadores são bons nessas coisas. Usando a [documentação da API JSON do Electron](https://electronjs.org/blog/api-docs-json-schema), indexamos todos esses dados no Algolia, E agora você pode encontrar facilmente a API exata que está procurando.

Tentando redimensionar uma janela? Procure [`resize`][] e pule direto para o método que você precisa.

## Tutoriais

Electron tem uma coleção cada vez maior de tutoriais para complementar sua documentação da API. Agora você pode encontrar mais facilmente tutoriais em um determinado tópico, junto com documentação de API relacionada.

Procurando as melhores práticas em matéria de segurança? Procure por [`security`][].

## Pacotes npm

Agora há mais de 700.000 pacotes no registro npm e não é sempre fácil encontrar o que você precisa. Para facilitar a descoberta desses módulos, criamos [`electron-npm-packages`][], uma coleção dos mais de 3400 módulos em o registro que são construídos especificamente para uso com a Electron.

O pessoal [Libraries.io][] criou [SourceRank][], um sistema para pontuação de projetos de software baseado em uma combinação de métricas como código de , comunidade, documentação e uso. Criamos um módulo [`sourceranks`][] que inclui a pontuação de cada módulo no registro npm, e usar essas pontuações para classificar os resultados do pacote.

Quer alternativas aos módulos IPC integrados do Electron? Procure por [`is:package ipc`][].

## Apps Electron

É [fácil indexar dados com o Algolia](https://github.com/electron/algolia-indices), então adicionamos a lista de apps existentes a partir de [electron/apps](https://github.com/electron/apps).

Tente procurar [`music`][] ou [`homebrew`][].

## Filtrando resultados

Se você usou a pesquisa de código [do GitHub](https://github.com/search) antes, você provavelmente está ciente de seus filtros de chave-valor separados por vírgula, como `extensão:js` ou `user:defunkt`. Nós achamos que essa técnica de filtragem é bastante poderosa, então adicionamos uma `é:` palavra-chave na pesquisa do Electron, que permite que você os resultados do filtro para mostrar somente um único tipo:

- [`é:miniatura de api`][]
- [`é:segurança tutorial`][]
- [`é:pacote ipc`][]
- [`é:graphql de aplicativo`][]

## Navegação do teclado

Pessoas adoram atalhos de teclado! A nova pesquisa pode ser usada sem remover seus dedos do teclado:

- <kbd>/</kbd> concentra-se na entrada de pesquisa
- <kbd>esc</kbd> concentra a entrada de pesquisa e a limpa
- <kbd>para baixo</kbd> se move para o próximo resultado
- <kbd>para cima</kbd> se move para o resultado anterior, ou para a entrada de pesquisa
- <kbd>enter</kbd> abre um resultado

Também abrimos o [módulo](https://github.com/electron/search-with-your-keyboard/) que permite esta interação com o teclado. Ele é projetado para uso com o Algolia InstantSearch, mas é generalizado para ativar a compatibilidade com diferentes implementações de pesquisa.

## Queremos o seu feedback

Se você tiver algum problema com a nova ferramenta de pesquisa, nós queremos que nos pronunciemos!

A melhor maneira de enviar seu feedback é deixando um problema no GitHub no repositório apropriado:

- [electron/electronjs.org](https://github.com/electron/electronjs.org) é o site do Electron. Se você não sabe onde arquivar um problema, essa é sua melhor aposta.
- [Electron/algolia-indices](https://github.com/electron/algolia-indices) é onde todos os dados pesquisáveis do Electron são compilados.
- [electron/search-with-your-keyboard](https://github.com/electron/search-with-your-keyboard) torna a interface de busca navegável pelo teclado.
- [algolia/instantsearch.js](https://github.com/algolia/instantsearch.js) é o cliente do navegador que habilita a pesquisa de achd-as-you-ty.
- [Algum/algoliasearch-client-javascript](https://github.com/algolia/algoliasearch-client-javascript) é o cliente Node.js para o upload de dados para os servidores do Algolia.

## Agradecimentos

Agradecimentos especiais à [Emily Jordan](https://github.com/echjordan) e à [Vanessa Yuen](https://github.com/vanessayuenn) para construir essas novas capacidades de busca, para [Libraries.io][] para fornecer [SourceRank][] pontuações, e para a equipe da Algolia para nos ajudar a começar. 🍹

[`electron-npm-packages`]: https://ghub.io/electron-npm-packages
[`homebrew`]: https://electronjs.org/?query=homebrew
[`é:miniatura de api`]: https://electronjs.org/?query=is%3Aapi%20thumbnail
[`é:graphql de aplicativo`]: https://electronjs.org/?query=is%3Aapp%20graphql
[`é:pacote ipc`]: https://electronjs.org/?query=is%3Apackage%20ipc
[`is:package ipc`]: https://electronjs.org/?query=is%3Apackage%20ipc
[`é:segurança tutorial`]: https://electronjs.org/?query=is%3Atutorial%20security
[`music`]: https://electronjs.org/?query=music
[`resize`]: https://electronjs.org/?query=resize
[`security`]: https://electronjs.org/?query=security
[`sourceranks`]: https://github.com/nice-registry/sourceranks
[`widnow`]: https://electronjs.org/?query=widnow
[Algolia]: https://algolia.com
[Libraries.io]: https://libraries.io
[1]: https://github.com/electron/electron-quick-start
[2]: https://github.com/electron/electron-quick-start
[SourceRank]: https://docs.libraries.io/overview.html#sourcerank