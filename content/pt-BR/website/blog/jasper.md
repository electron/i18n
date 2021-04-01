---
title: 'Projeto da Semana: Jasper'
author:
  - h13i32maru
  - watilde
  - zeke
date: '2017-03-21'
---

Esta semana, entrevistamos o criador do [Jasper](https://jasperapp.io), uma ferramenta baseada em Electron para gerenciar notificações do GitHub.

---

## Olá! Quem são vocês?

Sou [Ryo Maruyama](https://github.com/h13i32maru), um desenvolvedor de software no Japão. Estou desenvolvendo [Jasper](https://jasperapp.io) e [ESDoc](https://esdoc.org).

## O que é Jasper?

[Jasper](https://jasperapp.io) é um leitor de issues flexível e poderoso para o GitHub. Ele suporta problemas e pull requests no github.com e no GitHub Enterprise.

[![Captura de tela do Jasper](https://cloud.githubusercontent.com/assets/2289/24108647/75ef131e-0d4b-11e7-945b-27dd50cb03ab.png)](https://jasperapp.io/)

## Por que você o fez?

Quando as pessoas usam o GitHub em suas atividades de trabalho ou OSS, elas tendem a receber muitas notificações diariamente. Como forma de se inscrever nas notificações, o GitHub fornece o email e as [notificações da web](https://github.com/notifications). Utilizei-as durante dois anos, mas enfrentei os seguintes problemas:

- É fácil ignorar as questões em que fui mencionado, comentei ou estou a assistir.
- Coloquei algumas questões num canto da cabeça para verificar mais tarde, mas às vezes esqueci-as.
- Para não esquecer os problemas, eu mantenho muitas abas abertas no meu navegador.
- É difícil verificar todos os problemas que estão relacionados a mim.
- É difícil entender todas as atividades da minha equipe.

Passei muito tempo e energia a tentar evitar esses problemas. decidi fazer um leitor de issues para o GitHub para resolver esses problemas de forma eficiente, e comecei a desenvolver o Jasper.

## Quem está usando o Jasper?

O Jasper é usado por desenvolvedores, designers, e gerentes de várias empresas que estão usando o GitHub. Claro, alguns desenvolvedores de software de código aberto também estão usando. E também é usado por algumas pessoas no GitHub!

<a href="https://twitter.com/mistydemeo/status/778841101109080064"><img src="https://cloud.githubusercontent.com/assets/2289/24108650/75f87706-0d4b-11e7-8fcb-9fbedf2f66ea.png" width="500"></a>

<a href="https://twitter.com/jna_sh/status/798283937344651264"><img src="https://cloud.githubusercontent.com/assets/2289/24108649/75f4b9e0-0d4b-11e7-9701-24a0ef251ad2.png" width="500"></a>

## Como funciona o Jasper?

Uma vez configurada o Jasper, a seguinte tela aparece. Da esquerda para a direita, você pode ver "lista de transmissões", "lista de problemas" e "corpo da issue".

[![Tela inicial do Jasper](https://cloud.githubusercontent.com/assets/2289/24108645/75ae3786-0d4b-11e7-9a1a-3c270ae33cba.png)](https://jasperapp.io/)

Este "stream" é o principal recurso do Jasper. Por exemplo, se você quiser ver "issues atribuídas ao @zeke no repositório electron/electron", você cria o seguinte fluxo:

```
repo:electron/electron responsável:zeke é:issue
```

[![Tela inicial do Jasper 2](https://cloud.githubusercontent.com/assets/2289/24108648/75f403ec-0d4b-11e7-9ed4-4599ecd26b78.png)](https://jasperapp.io/)

Depois de criar o fluxo e esperar alguns segundos, você pode ver os problemas que atendem às condições.

[![Tela inicial do Jasper 3](https://cloud.githubusercontent.com/assets/2289/24108646/75b7fea6-0d4b-11e7-9d05-7dd4e595403c.png)](https://jasperapp.io/)

## O que podemos fazer com os streams?

Eu introduzirei que tipo de condições podem ser usadas para o fluxo.

### Usuários e Equipes

| Transmissão                                        | Problemas                                                                 |
| -------------------------------------------------- | ------------------------------------------------------------------------- |
| `menciona:cat menciona: cachorro`                  | Problemas que mencionam o usuário `gato` ou `cão`                         |
| `autor:autor do gato: cachorro`                    | Issues criadas pelo usuário `gato` ou `cão`                               |
| `incumbido:cat atribuído:cão`                      | Problemas atribuídos a `gato` ou `cão`                                    |
| `comentarista:cat comentador:dog`                  | Problemas que o `gato` ou `cão` comentaram sobre                          |
| `involves:cat envolve:cão`                         | Problemas que "envolve" `gato` ou `bob`                                   |
| `equipe:animal/equipe white-cat :animal/black-dog` | Problemas que `animal/white-cat` ou `animal/black-dog` são mencionados em |

`envolve` significa `mencionar`, `autor`, `atribuído` ou `comentador`

### Repositórios e Organizações

| Transmissão                                | Problemas                                 |
| ------------------------------------------ | ----------------------------------------- |
| `repositório:cat/jump repo:dog/run`        | Issues em `cat/jump` ou `dog/run`         |
| `org:electron usuário:usuário de gato:cão` | Problemas com `electron`, `gato` ou `cão` |

`org` é o mesmo que `usuário`

### Atributos

| Transmissão                                       | Problemas                                                        |
| ------------------------------------------------- | ---------------------------------------------------------------- |
| `repo:cat/jump milestone:v1.0.0 milestone:v1.0.1` | Issues que estão anexadas a `v1.0.0` ou `v1.0.1` em `cat/jump`   |
| `repositório:cat/jump label:bug label:blocker`    | Problemas que estão anexados `bug` **e** `blocker` em `cat/jump` |
| `electron OU atomshell`                           | Problemas que incluem `elétrron` ou `atomshell`                  |

### Status da revisão

| Transmissão                  | Problemas                                                                                             |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- |
| `é:pr revisão:obrigatório`   | Issues que são revisões necessárias em `cat/jump`                                                     |
| `is:pr review-requested:cat` | Issues que são solicitadas como revisão pelo `gato`. <br/> Mas estas ainda não foram revisadas. |
| `is:pr revisado-por:cat`     | Problemas que são revisados pelo `gato`                                                               |

<br/>

Como você pode ter percebido ao olhar para estes, os streams podem usar as consultas de pesquisa do GitHub. Para obter detalhes sobre como usar transmissões e consultas de pesquisa, veja as seguintes URLs.

- [jasperapp.io/doc.html#stream](https://jasperapp.io/doc.html#stream)
- [help.github.com/articles/searching-issues](https://help.github.com/articles/searching-issues/)
- [help.github.com/articles/search-syntax](https://help.github.com/articles/search-syntax/)

O Jasper também tem recursos para gerenciamento de problemas não lidos, gerenciamento de comentários não lidos, marcar estrelas, atualização de notificações, filtragem de issues, atalhos de teclado, etc.

## O Jasper é um produto pago? Quanto isso custa?

Jasper é $12. No entanto, você pode usar a [edição de teste gratuito](https://jasperapp.io/) por 30 dias.

## Por que você escolheu construir o Jasper no Electron?

Eu gosto dos seguintes aspectos do Electron:

- Aplicativos podem ser desenvolvidos com JavaScript/CSS/HTML.
- Aplicativos podem ser construídos para plataformas Windows, Mac e Linux.
- O Electron está ativamente desenvolvido e tem uma grande comunidade.

Esses recursos permitem o desenvolvimento rápido e simples de aplicativos para desktop. É fantástico! Se tiver alguma ideia de produto, deverá considerar a utilização do Electron por todos os meios.

## Quais são alguns desafios que você enfrentou ao desenvolver o Jasper?

Eu tive dificuldade em descobrir o conceito de "stream". No começo eu considerei usar o [API de Notificações do GitHub](https://developer.github.com/v3/activity/notifications/). No entanto, constatei que não apoia certos casos de utilização. Depois disso, considerei o uso da [API de problemas](https://developer.github.com/v3/issues/) e [Pull Requests API](https://developer.github.com/v3/pulls/), além da API de notificação. Mas nunca se tornou o que eu queria. Então, enquanto pensando em vários métodos, eu percebi que [API de pesquisa](https://developer.github.com/v3/search/) do GitHub ofereceria a maior flexibilidade. Demorou cerca de um mês de experimentação para chegar a esse ponto. então eu implementei um protótipo de Jasper com o conceito de fluxo em dois dias.

Nota: A votação é limitada a cada 10 segundos, no máximo. Isto é aceitável o suficiente para a restrição da API do GitHub.

## O que vem a seguir?

Tenho um plano para desenvolver as seguintes funcionalidades:

- **Um fluxo filtrado**: Um fluxo tem um fluxo filtrado que filtra problemas no fluxo. É como se fosse uma visão de SQL.
- **Várias contas**: você será capaz de usar github.com e GHE
- **Melhorar o desempenho**: Por enquanto, a carga de um problema no WebView é baixa velocidade do que o navegador normal.

Siga [@jasperappio](https://twitter.com/jasperappio) no Twitter para mais atualizações.

