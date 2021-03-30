---
title: 'Projeto da Semana: Kap'
author:
  - skllcrn
  - sinorhus
  - zeke
date: '2017-01-31'
---

A comunidade do Electron está crescendo rapidamente e as pessoas estão criando novos apps e ferramentas a uma taxa surpreendente. Para celebrar este ímpeto criativo e manter a comunidade informada de alguns destes novos projetos, Decidimos começar uma série semanal de blog com projetos notáveis relacionados ao Electron.

---

Esta postagem é a primeira da série, e recursos de [Kap](https://getkap.co/), um aplicativo de gravação de tela de código aberto criado por [Wulkano](https://wulkano.com/), uma equipe geodistribuída de designers e desenvolvedores autônomos.

[![Transmissão por Kap](https://cloud.githubusercontent.com/assets/2289/22439463/8f1e509e-e6e4-11e6-9c32-3a9db63fc9a1.gif)](https://getkap.co/)

## O que é Kap?

[Kap é um gravador de tela de código aberto](https://getkap.co) construído principalmente para designers e desenvolvedores capturarem facilmente seu trabalho. As pessoas o usam para compartilhar protótipos animados, bugs de documentos, criar GIFs bobos e tudo o que pode.

Vimos pessoas de todas as idades e origens usá-lo em ambientes educacionais, screencasts, tutoriais... a lista continua. Mesmo para criar ativos de produção! Nós estamos completamente impressionados pelo quão bem recebido foi o nosso pequeno projeto lateral.

## Por que você o construiu?

Essa é uma pergunta muito boa, não é como se houvesse falta de gravadores de tela lá fora! Pareceu-nos que as alternativas eram demasiado complexas, demasiado dispendiosas ou demasiado limitadas. Nada sentiu *certo* para nossas necessidades cotidianas. Também achamos que é ótimo quando as ferramentas que utilizamos para fazer nosso trabalho são de código aberto, assim todos podem ajudar a moldá-los. [Construir Kap acabou sendo o mesmo sobre o que não fizemos](https://medium.com/wulkano-friends/from-idea-to-product-and-beyond-a12850403c38). Está tudo nos detalhes, uma acumulação de pequenas melhorias que se tornaram o esboço de uma ferramenta que queríamos usar.

No entanto, e talvez o mais importante, Kap tornou-se um lugar para deixarmos as nossas preocupações à porta e para nos divertirmos a construir algo para nós e para pessoas como nós. É muito importante criar um ambiente no qual você pode simplesmente mover, experimentar novas habilidades e aproveitar suas criações. Sem requisitos, sem pressões, sem expectativas. Os designers e os desenvolvedores devem seguir o projeto? Porque, sim. Sim, sim.

## Por que você escolheu construir um Kap no Electron?

Houve uma série de razões:

* Tecnologia Web
* A maioria da equipe são desenvolvedores web
* Estamos investidos em JavaScript
* Abre a porta para que mais pessoas contribuam
* O Electron em si é de código aberto
* O poder e a facilidade de manutenção de modularidade `node_modules`
* Potenciais multiplataformas

Achamos que o futuro dos aplicativos está no navegador, mas ainda não estamos lá. O Electron é um passo importante na caminhada para esse futuro. Isso não só torna os próprios aplicativos mais acessíveis, mas também o código com o qual foram construídos. Uma ideia interessante é imaginar um futuro onde o SO é um navegador, e as abas são essencialmente aplicativos Electron.

Além disso, sendo principalmente desenvolvedores da web, nós somos grandes fãs da natureza isomorfica de JavaScript, nisso você pode executar o JS no cliente, servidor e agora na área de trabalho. Com a tecnologia web (HTML, CSS e JS), muitas coisas são muito mais simples que nativas: Protótipos mais rápidos, menos código, flexbox > auto-layout (macOS/iOS).

## Quais são os desafios que você enfrentou ao construir o Kap?

Usar os recursos do Electron está disponível para gravar a tela foi o maior desafio. Eles simplesmente não eram performativos o suficiente para atender às nossas exigências e tornariam o projeto um fracasso em nossos olhos. Embora não seja culpa do Electron em si, ainda há uma lacuna entre o desenvolvimento nativo e a construção de aplicativos de desktop com tecnologia web.

Passamos muito tempo tentando contornar o fraco desempenho do `getUserMedia` API, um problema originário do Chromium. Um dos nossos principais objetivos quando estabelecemos fazer Kap era construir todo o aplicativo com tecnologia web. Depois de tudo que podíamos fazer com que ele funcionasse (o requisito mínimo é de 30 FPS em uma tela de Retina), Finalmente, tivemos que encontrar outra solução.

## Vejo alguns códigos Swift no repositório. Do que se trata?

Sendo forçado a procurar por alternativas para `getUserMedia`, nós começamos a experimentar `ffmpeg`. Além de ser uma das melhores ferramentas de conversão de áudio e vídeo, ele tem a funcionalidade de gravar a tela em quase qualquer sistema operacional, e fomos capazes de gravar vídeos nítidos e atender nossa exigência mínima de 30 FPS em uma tela Retina. Problema? O desempenho era de ":weary:", o uso da CPU estava ocorrendo a fio. Por isso, voltámos à mesa de elaboração, discutimos as nossas opções e percebemos que tínhamos de chegar a um compromisso. Isso resultou em [Aperture](https://github.com/wulkano/aperture), nossa própria biblioteca de gravação de tela para o macOS escrito em Swift.

## Em que áreas o Electron deve ser melhorado?

Todos sabemos que os apps do Electron podem ter algo para usar a memória RAM, mas, novamente, isso é realmente uma coisa do Chromium É parte de como funciona e realmente depende do que você estiver correndo por exemplo, Kap e Hyper normalmente usam menos de 100MB de memória.

Uma das maiores áreas de melhoria que vemos é o payload, especialmente como o Electron distribui o Chromium. Uma ideia seria ter um Electron núcleo compartilhado e fazer os instaladores do app verificarem se ele já está presente no sistema.

Criar apps multiplataforma com Electron poderia ser uma experiência melhor. No momento existem muitas inconsistências, APIs específicas de plataforma e recursos ausentes entre as plataformas, fazendo sua base de código ficar coberta com instruções se-senão. Por exemplo, a vibração só é suportada no macOS, o atualizador automático funciona de forma diferente no macOS e no Windows e nem mesmo é suportado no Linux. A transparência é um golpe ou um erro no Linux, geralmente falha.

Também deve ser mais fácil chamar APIs nativas do sistema. O Electron vem com um bom conjunto de APIs, mas às vezes você precisa de funcionalidade que não fornece. Criar uma extensão nativa do Node.js é uma opção, mas é doloroso para trabalhar. Idealmente Electron iria ser enviado com um bom [FFI](https://en.wikipedia.org/wiki/Foreign_function_interface) API, como [`fastcall`](https://github.com/cmake-js/fastcall). Isto ter-nos-ia permitido escrever a parte Swift em JavaScript.

## Quais são as suas coisas favoritas sobre o Electron?

Nosso favorito é facilmente o fato de que qualquer pessoa com conhecimento sobre a criação da web pode construir e contribuir para experiências nativas multi-plataformas. Para já não falar da facilidade e da alegria com que se desenvolve o seu trabalho, da excelente documentação e do excelente ecossistema próspero.

De uma perspectiva front-end, construir Kap não sentiu diferente de construir um site simples usando APIs do navegador. Electron faz um ótimo trabalho tornando o desenvolvimento de aplicativos semelhantes (basicamente idêntico) ao desenvolvimento web. Na verdade, é tão simples que não havia necessidade de frameworks ou similares para nos ajudar, mas apenas de JS e CSS limpos e modulares.

Somos também grandes adeptos da criação da equipa, da sua dedicação e apoio, e da comunidade activa e amigável que eles mantêm. Abraça a todos vocês!

## O que vem a seguir no Kap?

O próximo passo para nós é revisar o aplicativo que está se preparando para nossa versão 2.0. marco, que inclui uma reescrita em React, além de suporte para plugins, permitindo que desenvolvedores estendam a funcionalidade do Kap! Convidamos todos a acompanhar o projeto e contribuir no nosso [repositório do GitHub](https://github.com/wulkano/kap). Estamos ouvindo e querendo ouvir o maior número possível de vocês. [conte-nos como podemos fazer Kap a melhor ferramenta possível para você](https://wulkano.typeform.com/to/BIvJKz)!

## O que é Wulkano?

[Wulkano](https://wulkano.com) é um estúdio de design e coletivo digital, uma equipe de tecnólogos remotos que adoram trabalhar em conjunto tanto nos ramos dos clientes quanto nos nossos próprios projetos. Nós somos um grupo distribuído, mas estreito, de pessoas de lugares e planos de fundo diferentes, compartilhando conhecimento, ideias, experiências, mas o mais importante é que GIFs e memes bobos, em nosso escritório virtual (que acontece de ser o Electron baseado no Slack!).

## Quaisquer dicas do Electron que possam ser úteis para outros desenvolvedores?

Aproveite a vantagem e envolva-se na fantástica [comunidade](https://discuss.atom.io/c/electron), confira [Incrível Electron](https://github.com/sindresorhus/awesome-electron), Veja os [exemplos](https://github.com/electron/electron-api-demos) e use a grande documentação [](https://electronjs.org/docs/)!

