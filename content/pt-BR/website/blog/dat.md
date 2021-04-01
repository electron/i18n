---
title: 'Projeto da Semana: Dat'
author:
  - karissa
  - yoshuawuyts
  - maxogden
  - zeke
date: '2017-02-21'
---

O projeto em destaque desta semana é [Dat](https://datproject.org/), uma [financiada por fundos de financiamento](https://changelog.com/rfc/6), de código aberto e ferramenta descentralizada para distribuir conjuntos de dados. Datal é construído e mantido por uma [equipe geodistribuída](https://datproject.org/team), muitos dos quais ajudaram a escrever esta publicação.

---

[![Uma captura de tela da visão principal da área de trabalho, exibindo algumas linhas de dados de
compartilhados](https://cloud.githubusercontent.com/assets/2289/23175925/dbaee7ec-f815-11e6-80cc-3041203c7842.png)](https://github.com/datproject/dat-desktop)

## Primeiro o que é Dado?

Queríamos trazer as melhores partes dos sistemas peer-to-peer e distribuídos para o compartilhamento de dados. Começámos com a partilha de dados científicos e começámos a promover instituições de investigação, governo, serviço público e também equipas de fonte aberta.

Outra maneira de pensar sobre isso é sincronizar e fazer upload de app como Dropbox ou BitTorrent Sync, exceto Dat é [de código aberto](https://github.com/datproject). Nosso objetivo é ser um software de compartilhamento de dados potente e sem fins lucrativos para os dados grandes, pequenos, médios, pequenos lotes e grandes lotes.

Para usar a ferramenta `dat` CLI, tudo que você tem que digitar é:

```sh
dat share caminho/para/meu/pasta
```

E o dat criará um link que você pode usar para enviar essa pasta para outra pessoa -- nenhum servidor central ou terceiros terão acesso aos seus dados. Ao contrário do BitTorrent, é também impossível sniff quem está compartilhando o que ([ver o rascunho do papel Dat para mais detalhes](https://github.com/datproject/docs/blob/master/papers/dat-paper.md)).

## Agora sabemos o que é Dat. Como o Dat Desktop se encaixa?

[Dat Desktop](https://github.com/datproject/dat-desktop) é uma maneira de tornar Dat acessível para pessoas que não podem ou não querem usar a linha de comando. Você pode hospedar várias informações no seu computador e servir os dados através da sua rede.

## Você consegue compartilhar alguns casos de uso legais?

### DataRefuge + Projeto Svalbard

Estamos trabalhando em uma coisa codificada [Project Svalbard](https://github.com/datproject/svalbard) que está relacionada a [DataRefuge](http://www.ppehlab.org/datarefuge), um grupo que trabalha para apoiar os dados climáticos governamentais, correndo o risco de desaparecer. Svalbard tem o nome de Svalbard Global Seed Vault no Árctico, que tem uma grande biblioteca de backup subterrânea de DNA vegetal. Nossa versão é uma grande coleção controlada de conjuntos de dados científicos públicos. Assim que soubermos e pudermos confiar nos metadados, podemos construir outros projetos legais como uma [rede de armazenamento de dados de voluntários distribuída](https://github.com/datproject/datasilo/).

### Coligação de Dados Cívicos da Califórnia

[CACivicData](http://www.californiacivicdata.org/) é um arquivo de código aberto que serve downloads diários do CAL-ACCESS, o rastreamento de banco de dados da Califórnia em política. Eles fazem [lançamentos diários](http://calaccess.californiacivicdata.org/downloads/0), o que significa hospedar muitos dados duplicados em seus arquivos zip. Estamos trabalhando em hospedar os dados deles como um repositório Dat, o que reduzirá a quantidade de aborrecimentos e largura de banda necessária para consultar uma versão específica ou atualizar para uma versão mais recente.

## Atualizações do Electron

Este ainda não é concreto, mas achamos que um caso divertido seria colocar um aplicativo compilado do Electron em um repositório de Dat, em seguida, usar um cliente Dat no Electron para puxar os deltas mais recentes do executável do aplicativo, para economizar tempo de download, mas também para reduzir os custos de banda para o servidor.

## Quem deve estar usando o Dat Desktop?

Qualquer pessoa que queira compartilhar e atualizar dados em uma rede p2p. Cientistas de dados, hackers abertos, pesquisadores, desenvolvedores. Nós estamos super receptivos a feedback se alguém tiver um caso de uso legal que ainda não imaginámos. Você pode jogar no nosso [Chat do Gitter](https://gitter.im/datproject/discussions) e nos perguntar qualquer coisa!

## O que vem a seguir em Dat e Dat Desktop?

Contas de usuários e publicação de metadados. Estamos trabalhando em um aplicativo da Web Dat registry para ser implantado no [projeto de dados. rg](https://datproject.org/) que basicamente será um 'NPM para conjuntos de dados', exceto a advertência, nós vamos ser um diretório de metadados e os dados podem ficar em qualquer lugar on-line (ao contrário do NPM ou GitHub, onde todos os dados são hospedados centralmente, porque o código fonte é pequeno o bastante você pode caber tudo em um sistema). Uma vez que muitos conjuntos de dados são enormes, precisamos de um registro federado (semelhante a como os rastreadores do BitTorrent funcionam). Queremos facilitar para as pessoas encontrar ou publicar conjuntos de dados com o registro do Dat Desktop, para tornar o processo de compartilhamento de dados friccional.

Outro recurso são pastas multiescritor/colaborativas. Temos grandes planos de fazer fluxos de trabalho colaborativos, talvez com filiais, semelhantes ao git, exceto projetados em torno da colaboração do conjunto de dados. Mas ainda estamos trabalhando em estabilidade geral e em padronizar nossos protocolos agora!

## Por que você escolheu construir um Dat Desktop no Electron?

Dat é construído usando Node.js, então era um ajuste natural para nossa integração. Além disso, nossos usuários usam uma variedade de máquinas desde cientistas, pesquisadores e oficiais do governo podem ser forçados a usar certas configurações para suas instituições - isso significa que precisamos ser capazes de usar o Windows e o Linux, bem como Mac. Gordo Desktop nos dá isso facilmente.

## Quais são os desafios que você enfrentou ao construir Dat e Dat Desktop?

Descubra o que as pessoas querem. Começamos com conjunto de dados tabular, mas percebemos que era um problema complicado resolver e que a maioria das pessoas não usa banco de dados. Então, a meio do projeto, nós redesenhamos tudo do zero para usar um sistema de arquivos e não olhamos para trás.

Também encontramos alguns problemas gerais de infraestrutura do Electron, incluindo:

- Telemetria - como capturar estatísticas anônimas de uso
- Atualizações - É um tipo de forma fragmentada e mágica configurar atualizações automáticas
- Lançamentos - assinatura de XCode, compilando lançamentos no Travis, fazendo compilações beta, todos foram desafios.

Também usamos Browserify e algumas Transformas legais do Browserify no código de 'front-end' no Dat Desktop (que é meio estranho, porque ainda temos o pacote nativo `necessário` -- mas é porque queremos as Transformes). Para melhor ajudar a gerenciar nosso CSS mudamos de Sass para [sheetify](https://github.com/stackcss/sheetify). Isso nos ajudou muito a modularizar o nosso CSS e tornou mais fácil mover a nossa interface de usuário para uma arquitetura orientada ao componente com dependências compartilhadas. Por exemplo, [dad-colors](https://github.com/Kriesse/dat-colors) contém todas nossas cores e é compartilhado entre todos os nossos projetos.

Sempre fomos um grande fã de padrões e abstrações mínimas. Nossa interface é construída utilizando nós do DOM regulares com apenas algumas bibliotecas auxiliares. Começamos a mover alguns desses componentes para [elementos da base](https://base.choo.io), uma biblioteca de componentes de baixo nível. Tal como com a maior parte de nossa tecnologia, nós continuamos iterando sobre ela até acertarmos. mas como equipe temos a sensação de que estamos indo na direção certa aqui.

## Em que áreas o Electron deve ser melhorado?

Nós achamos que o maior ponto de dor são os módulos nativos. Ter que reconstruir seus módulos para Electron com npm adiciona complexidade ao fluxo de trabalho. Nossa equipe desenvolveu um módulo chamado [`pré-build`](http://npmjs.org/prebuild) que lida com binários pré-construídos, que funcionou bem para o Node, mas os fluxos de trabalho do Electron ainda exigiam um passo personalizado após a instalação, geralmente `npm run rebuild`. Era irritante. Para resolver isso, mudamos recentemente para uma estratégia em que agrupamos todas as versões binárias compiladas de todas as plataformas dentro do npm tarball. Isso significa que as tarballs ficam maiores (embora isso possa ser otimizado com `. o` arquivos - bibliotecas compartilhadas), essa abordagem evita ter que rodar scripts de pós-instalação e também evita o padrão `npm run rebuild` completamente. Significa que `npm install` faz a coisa certa para o Electron na primeira vez.

## Quais são as suas coisas favoritas sobre o Electron?

As APIs parecem bastante bem pensadas, é relativamente estável, e faz um excelente trabalho em manter-se atualizado com as versões do Nó a montante, não é muito mais que possamos pedir!

## Quaisquer dicas do Electron que possam ser úteis para outros desenvolvedores?

Se você usar módulos nativos, dê [pré-construir](https://www.npmjs.com/package/prebuild) uma paz!

## Qual é a melhor maneira de acompanhar os desenvolvimentos de Dat?

Siga [@dat_project](https://twitter.com/dat_project) no Twitter ou assinar a nossa [newsletter por e-mail](https://tinyletter.com/datdata).

