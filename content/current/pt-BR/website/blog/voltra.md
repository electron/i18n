---
title: 'Projeto da Semana: Voltra'
author:
  - '0x00A'
  - aprileelcich
  - zeke
date: '2017-03-07'
---

Esta semana nos encontramos com [abril Elcich](https://twitter.com/aprileelcich) e [Paolo Fragomeni](https://twitter.com/0x00A) para conversar sobre Voltra, um player de música baseado na Electron.

---

## O que é Voltra?

[Voltra](https://voltra.co/) é um reprodutor de músicas para pessoas que querem possuir suas músicas. Também é uma loja onde você pode descobrir e comprar músicas novas, com base no que você já possui. É sem anúncios, multiplataforma para desktop e celular. Também não te espiona.

[![voltra-artista](https://cloud.githubusercontent.com/assets/2289/23670061/4db0323c-031b-11e7-81fd-128e714e911c.jpg)](https://voltra.co/)

## Para quem é Voltra?

Quem escuta música.

## O que você motivou a criar Voltra?

A rádio sempre teve uma grande quota de ouvintes. Está se afastando das ondas de ar e para a Internet. Agora você pode alugar músicas a pedido — é um revival! Por isso, surgiram muitos produtos e serviços novos. mas transmitir rádio ainda deixa outra pessoa no controle de sua música e como você experimenta.

Queríamos um produto que estava inteiramente focado em música que você possui. Algo que facilitou a descoberta e a compra de novas músicas diretamente de artistas ou etiquetas.

## Existe uma versão gratuita?

O jogador da área de trabalho é completamente grátis. [Vender sua música também é grátis!](https://voltra.co/artists) Nós não somos suportados por anúncios.

Como o app é gratuito, podemos abrir fontes mais tarde. No momento não temos a banda larga para gerenciar isso. Temos também ideias muito específicas sobre as características e a direcção que queremos tomar. Nós temos uma comunidade beta ativa e levamos a sério os nossos comentários.

## Como você ganha dinheiro?

Nós temos recursos premium!

Nosso [Arquivo de Áudio](https://voltra.co/premium/) é um serviço de backup na nuvem projetado especificamente para música. Não comprimimos ou compartilhamos blocos de dados. Sua coleção de músicas está com backup físico para você.

Para artistas e etiquetas, nossa [Assinatura Pro](https://voltra.co/artists/pro) oferece ferramentas para ajudá-los a alcançar públicos mais relevantes, como páginas de análise e artistas profissionais.

## O que torna Voltra diferente?

O design e a usabilidade são para nós incrivelmente importantes. Queremos dar aos ouvintes uma experiência sem distrações! Há alguns jogadores de música interessantes lá fora. Mas muitos deles são mais avançados e mais difíceis de usar do que seus criadores perceberam. Queremos tornar a Voltra acessível ao maior número possível de pessoas.

Nós também não pegamos nenhum corte do artista ou da etiqueta. Esse é um diferenciador de chaves para nós. É muito importante porque reduz a barreira para os artistas colocarem suas músicas no mercado.

## O que são alguns design & decisões técnicas que você tomou?

Ao projetar a Voltra, nós consideramos as convenções da interface do usuário a partir de aplicativos nativos e da web, nós também pensamos muito sobre o que poderíamos remover. Temos um grupo beta privado ativo que nos deu uma opinião crítica nos últimos meses.

Descobrimos que a arte do álbum e a fotografia são muito importantes para as pessoas. Muitos jogadores são apenas listas de arquivos. Uma das coisas legais sobre possuir álbuns físicos é a arte do álbum, e queríamos colocar ênfase nisso na aplicação Voltra Desktop.

[![voltra-albumview](https://cloud.githubusercontent.com/assets/2289/23670056/4b0c18d4-031b-11e7-89e1-539e927a380d.jpg)](https://voltra.co/)

Também nos certificámos de que não irrompemos com os arquivos das pessoas. Nós usamos o arquivo de visualização para que você possa colocar seus arquivos onde quiser, e não renomeamos eles nem os movemos para você. Temos uma base de dados incorporada para rastrear o estado dos diretórios observados para que possamos acompanhar o que há de novo Mesmo quando o processo não está em execução.

## Quais são alguns desafios que você enfrentou ao construir o Voltra?

Nós passamos muito tempo focado no desempenho. Começamos com frameworks mas movemos para o Javascript vanilla. Em nossa experiência, as abstrações generalizadas proporcionam superam as penalidades de desempenho e a cerimónia que introduzem.

Neste momento, lidamos com coleções muito grandes. Grandes coleções significam, possivelmente, dezenas de milhares de imagens! Com o nó. O módulo de sistema de arquivos diretamente disponível no processo de renderização facilitou muito a carga preguiçosa e descarregou muitas imagens super rapidamente com base em eventos DOM.

Em geral, *[setImmediar][]* e *[solicitaçãoIdleCallback][]* foram ferramentas super importantes para realizar muitos processamentos, mantendo a interface do usuário responsiva. Mais especificamente, distribuir tarefas com CPU em processos separados realmente ajuda a manter a interface do usuário responsiva. Por exemplo, mudamos o contexto real de áudio para um processo separado, comunicando-se com ele sobre [][] IPC para evitar possíveis interrupções de uma Interface do Usuário ocupada.

## Por que você escolheu construir o Voltra no Electron?

A caixa de areia do navegador é muito restrita para o nosso aplicativo. Mas também estamos desenvolvendo um web player. Por isso, é uma grande vitória que possamos compartilhar quase 100% do código entre as duas implementações.

Nós realmente começamos construindo um aplicativo nativo com Swift. O principal problema que encontrámos foi que estávamos a reinventar muitas coisas. A Internet tem o maior ecossistema de fonte aberta do mundo. Então nós rapidamente mudamos para o Electron.

Também, e mais importante, com o Electron que você desenvolve uma vez e ele deve apenas WorkTM em todas as principais plataformas. Isso não é garantido, mas o custo nativo de codificação para cada plataforma definitivamente supera quaisquer outros custos introduzidos pelo Electron.

## Quais são as suas coisas favoritas sobre o Electron?

**GTD!**: Ter a pilha de rede de Node.js e a camada de apresentação do Chromium empacotada juntos é uma receita para fazer as coisas.

**Competência**: é apenas a pilha da web, então literalmente toda nossa equipe está envolvida na construção do produto.

**Comunidade**: Há uma comunidade altamente organizada que sabe como se comunicar muito bem! Estamos bastante satisfeitos com o desenvolvimento com esse apoio.

## Quais as áreas em que o Electron poderia ser melhorado?

Gostaríamos que o Electron apoiasse um único pacote. O embalador é tão importante para o Electron quanto o gerenciador de pacotes é para o Node. Existem vários pacotes na terra de usuários, cada um com recursos interessantes, mas cada um com bugs. O consenso da comunidade ajudaria a direcionar a energia que está a ser gasta pelos contribuintes.

## O que vem a seguir?

Desenvolvemos atualmente um aplicativo móvel, e trabalhamos com artistas e rótulos para adicionar suas músicas à loja Voltra. Ei! Se você é um artista ou etiqueta, [Cadastre-se agora](https://admin.voltra.co/signup)! Planeamos abrir a loja quando atingirmos o nosso objetivo de 10 milhões de trilhas.

[setImmediar]: https://developer.mozilla.org/en-US/docs/Web/API/Window/setImmediate
[solicitaçãoIdleCallback]: https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback
[3]: https://electronjs.org/docs/glossary/#ipc
[4]: https://electronjs.org/docs/glossary/#ipc

