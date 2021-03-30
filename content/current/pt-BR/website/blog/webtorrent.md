---
title: 'Projeto da Semana: WebTorrent'
author:
  - feross
  - zeke
date: '2017-03-14'
---

Esta semana nós nos encontramos com [@feross](https://github.com/feross) e [@dcposch](https://github.com/dcposch) para falar sobre o WebTorrent, o cliente torrent fortalecido pela web que conecta os usuários juntos para formar uma rede distribuída entre navegadores.

---

## O que é WebTorrent?

[WebTorrent](https://webtorrent.io) é o primeiro cliente de torrent que funciona no navegador. Está completamente escrito em JavaScript e pode usar WebRTC para o transporte peer-to-peer. Não é necessário plugin, extensão ou instalação do navegador.

Usar padrões abertos da web, o WebTorrent conecta os usuários do site juntos para formar uma rede distribuída e descentralizada de navegador para uma transferência eficiente de arquivos.

Você pode ver uma demonstração do WebTorrent em ação aqui: [webtorrent.io](https://webtorrent.io/).

<a href="https://webtorrent.io/">
  <img alt="homepage do webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912149/1543d2ce-089c-11e7-8519-613740c82b47.jpg">
</a>

## Por que isso é legal?

Imagine um site de vídeo como o YouTube, mas onde os visitantes ajudam a hospedar o conteúdo do site. Quanto mais pessoas usarem um site baseado em WebTorrents, mais rápido e resiliente ele se torna.

A comunicação do Navegador-para-navegador corta o intermediário e permite que as pessoas se comuniquem nos seus próprios termos. Sem cliente/servidor – apenas uma rede de pares, todos iguais. WebTorrent é o primeiro passo da jornada para descentralizar a Web.

## Onde o Electron entra na imagem?

Há cerca de um ano, decidimos construir [WebTorrent Desktop](https://webtorrent.io/desktop/), uma versão do WebTorrent que é executada como um aplicativo para desktop.

[![Janela de reprodutor WebTorrent](https://cloud.githubusercontent.com/assets/2289/23912152/154aef0a-089c-11e7-8544-869b0cd642b1.jpg)](https://webtorrent.io/desktop/)

Nós criamos o WebTorrent Desktop por três razões:

1. Queríamos um aplicativo torrent limpo, leve, sem anúncios, de código aberto
2. Nós queríamos um aplicativo torrent com suporte a bom streaming
3. Precisamos de um "cliente híbrido" que conecta as redes BitTorrent e WebTorrent

## Se já podemos baixar torrents no meu navegador web, por que um aplicativo para desktop?

Primeiro, um pouco de fundo no design do WebTorrent.

<a href="https://webtorrent.io/desktop/">
  <img alt="logotipo do desktop webtorrent" src="https://cloud.githubusercontent.com/assets/2289/23912151/154657e2-089c-11e7-9889-6914ce71ebc9.png" width="200" align="right">
</a>

No início dos dias, o BitTorrent usava o TCP como seu protocolo de transporte. Mais tarde, o uTP veio prometendo melhor desempenho e vantagens adicionais sobre o TCP. Todo cliente de torrent mainstream eventualmente adotou uTP, e hoje você pode usar o BitTorrent através de qualquer protocolo. O protocolo WebRTC é o próximo passo lógico. Ele traz a promessa de interoperabilidade com navegadores de web - uma gigante rede P2P composta por todos os clientes de desktop BitTorrent e milhões de navegadores da web.

"Web peers" (pares de torrents que executam em um navegador da web) tornam a rede do BitTorrent mais forte adicionando milhões de novos peers, e espalhando BitTorrent para dezenas de novos casos de uso. O WebTorrent segue a especificação BitTorrent o mais próximo possível, para facilitar que clientes BitTorrent existentes adicionem suporte para WebTorrent.

Alguns aplicativos de torrents como o [Vuze](https://www.vuze.com/) já suportam web peers, mas nós não queríamos esperar pelo restante para adicionar suporte. **Portanto basicamente, o WebTorrent Desktop era nossa maneira de acelerar a adoção do protocolo WebTorrent.** Criando um incrível aplicativo torrent que as pessoas realmente querem usar, nós aumentamos o número de pares na rede que podem compartilhar torrents com web peers (i. . Usuários em sites).

## Quais são alguns casos de uso interessante para torrents além do que as pessoas já sabem que podem fazer?

Um dos usos mais emocionantes para WebTorrent é a entrega assistida por pares. Projetos sem fins lucrativos como a [Wikipedia](https://www.wikipedia.org/) e o [Arquivo de Internet](https://archive.org/) poderiam reduzir os custos de hospedagem e largura de banda ao deixar os visitantes acessarem. O conteúdo popular pode ser servido navegador a navegador, de forma rápida e barata. Conteúdo acessado raramente pode ser servido confiavelmente por HTTP do servidor de origem.

O Arquivo da Internet realmente já atualizou seus arquivos torrents para que eles funcionem muito bem com o WebTorrent. Portanto, se você quiser incorporar o conteúdo do Arquivo de Internet no seu site, você pode fazer isso de uma forma que reduz os custos de hospedagem do arquivo, permitindo que dediquem mais dinheiro a arquivar a web!

Existem também casos de uso de negócios, de CDNs para entrega de aplicativos através de P2P.

## Quais são alguns dos seus projetos favoritos que usam o WebTorrent?

![captura de tela gaia](https://cloud.githubusercontent.com/assets/2289/23912148/154392c8-089c-11e7-88a8-3d4bcb1d2a94.jpg)

A coisa mais legal construída com WebTorrent, mãos para baixo, provavelmente é [Gaia 3D Star Map](http://charliehoey.com/threejs-demos/gaia_dr1.html). É uma simulação interativa leve 3D da Via Láctea. Os dados carregam de um torrent, direto em seu navegador. É inspirador voar através de nosso sistema estelar e perceber quão pouco nós humanos somos comparados à vastidão do nosso universo.

Você pode ler sobre como isso foi feito em [Torrents A Galáxia](https://medium.com/@flimshaw/torrenting-the-galaxy-extracting-2-million-3d-stars-from-180gb-of-csvs-457ff70c0f93), , um post de blog onde o autor, Charlie Hoey, explica como ele construiu o mapa estelar com WebGL e WebTorrent.

<a href="https://brave.com/">
  <img alt="logotipo brave" src="https://cloud.githubusercontent.com/assets/2289/23912147/1542ad4a-089c-11e7-8106-15c8e34298a9.png" width="150" align="left">
</a>

Também somos grandes fãs do [Brave](https://brave.com/). Brave é um navegador que bloqueia automaticamente anúncios e rastreadores para tornar a web mais rápida e mais segura. O Brave recentemente adicionou suporte a torrents, então você pode [visualizar torrents tradicionais sem usar um aplicativo separado](https://torrentfreak.com/brave-a-privacy-focused-browser-with-built-in-torrent-streaming-170219/). Esse recurso é alimentado por WebTorrent.

Então, assim como a maioria dos navegadores pode renderizar arquivos PDF, Brave pode renderizar links magnet e arquivos torrent. Eles são apenas mais um tipo de conteúdo que o navegador suporta nativamente.

Um dos co-fundadores do Brave é na verdade Brendan Eich, o criador de JavaScript, a língua em que escrevemos o WebTorrent, então achamos que é bem legal que o Brave escolheu integrar o WebTorrent.

## Por que você escolheu construir o WebTorrent Desktop no Electron?

<a href="https://webtorrent.io/desktop/">
  <img alt="Janela principal do WebTorrent" src="https://cloud.githubusercontent.com/assets/2289/23912150/15444542-089c-11e7-91ab-7fe3f1e5ee43.jpg" align="right" width="450">
</a>

Há um meme de que os aplicativos Electron estão "inchados" porque incluem todo o módulo de conteúdo do Chrome em todos os aplicativos. Em alguns casos, isso é parcialmente verdade (um instalador de aplicativo Electron geralmente é ~40MB, onde um instalador de aplicativo específico do SISTEMA É geralmente ~20MB).

No entanto, no caso do WebTorrent Desktop, usamos quase todos os recursos do Electron e muitas dezenas de recursos do Chrome no decurso da operação normal. Se quiséssemos implementar esses recursos do zero para cada plataforma, teria levado meses ou anos mais para construir nosso aplicativo, ou só poderíamos liberar para uma única plataforma.

Só para ter uma ideia, usamos a [integração do dock do Electron](https://electronjs.org/docs/api/app/#appdockbouncetype-macos) (para mostrar o progresso do download), [integração da barra de menu](https://electronjs.org/docs/api/menu) (para executar em segundo plano), [registro do protocolo](https://electronjs.org/docs/api/app/#appsetasdefaultprotocolclientprotocol-path-args-macos-windows) (para abrir links magnet), [economia de energia](https://electronjs.org/docs/api/power-save-blocker/) (para evitar suspensão durante a reprodução de vídeo) e [atualizador automático](https://electronjs.org/docs/api/auto-updater). Quanto aos recursos do Chrome, usamos plenty: a tag `<video>` (para reproduzir vários formatos de vídeo diferentes), a tag `<track>` (para suporte a legendas encerradas) suporte a arrastar e soltar, e WebRTC (que não é trivial para usar em um aplicativo nativo).

Sem falar: nosso motor de torrents está escrito em JavaScript e assume a existência de muitas APIs de Nó, mas especialmente `require('net')` e `require('dgram')` para suporte ao soquete TCP e UDP.

Basicamente, o Electron é exatamente o que precisávamos e tínhamos um conjunto exato de recursos que precisávamos para enviar um aplicativo sólido e polido em tempo recorde.

## Quais são as suas coisas favoritas sobre o Electron?

A biblioteca WebTorrent está em desenvolvimento como projeto de código aberto há dois anos. **Fizemos a WebTorrent Desktop em quatro semanas.** Electron é a principal razão por que fomos capazes de construir e enviar nosso aplicativo tão rapidamente.

Como o nó. s tornaram a programação de servidores acessível para uma geração de programadores de front-end jQuery, o Electron torna o desenvolvimento nativo acessível a qualquer um que esteja familiarizado com a Web ou com o Node. Desenvolvimento de s. O Electron é extremamente empoderador.

## O site e o cliente de área de trabalho compartilham?

Sim, o [`webtorrent` pacote npm](https://npmjs.com/package/webtorrent) funciona no Node.js, no navegador e no Electron. O mesmo código pode ser executado em todos os ambientes – esse é a beleza do JavaScript. É hoje tempo de corrida universal. A Java Applets prometeu "Escrever Ontem, Executar Em Qualquer Luz" aplicativos, mas essa visão realmente nunca se materializou por várias razões. Electron, mais do que qualquer outra plataforma, na verdade fica muito escuro perto daquele ideal.

## Quais são os desafios que você enfrentou ao construir o WebTorrent?

Em versões iniciais do aplicativo, temos dificuldade em fazer a interface do usuário ser executada. Colocamos o motor de torrent no mesmo processo de renderização que desenha a janela principal do app que, previsivelmente, levou a lentidão a qualquer momento que havia atividade intensa da CPU do motor torrent (como verificar os pedaços de torrent recebidos dos pares).

Nós corrigimos isso movendo o motor de torrents para um segundo processo de renderização invisível que comunicamos com através do [IPC](https://electronjs.org/docs/api/ipc-main/). Desta forma, se esse processo usar brevemente um monte de CPU, o tópico da interface de usuário não será afetado. A rolagem suave e as animações são tão satisfatórias.

Nota: tivemos que colocar o motor torrent em um processo de renderização, em vez de um processo "principal", porque precisamos de acesso ao WebRTC (que só está disponível no renderizador.)

## Em que áreas o Electron deve ser melhorado?

Uma coisa que adoraríamos ver é uma melhor documentação sobre como construir e enviar aplicativos preparados para a produção especialmente por assuntos complicados, como assinatura de código e atualização automática. Tivemos que aprender sobre as melhores práticas, cavando o código-fonte e perguntando pelo Twitter!

## WebTorrent Desktop está feito? Se não, o que virá a seguir?

Achamos que a versão atual do WebTorrent Desktop é excelente, mas há sempre espaço para melhorias. Estamos trabalhando para melhorar o suporte a polarização, performance, suporte a legendas e codec de vídeo.

Se você estiver interessado em se envolver no projeto, confira [nossa página no GitHub](https://github.com/feross/webtorrent-desktop)!

## Quaisquer dicas de desenvolvimento do Electron que possam ser úteis para outros desenvolvedores?

[Feross](http://feross.org/), um dos colaboradores do WebTorrent Desktop, recentemente deu uma palestra *"Real world Electron: Building Cross-platform desktop apps with JavaScript"* na NodeConf Argentina que contém dicas úteis para lançar um aplicativo Electron polido. A conversa é especialmente útil se você estiver no estágio em que você tem um aplicativo básico de trabalho e você está tentando levá-lo para o próximo nível de polimento e profissionalismo.

[Assista aqui](https://www.youtube.com/watch?v=YLExGgEnbFY): <iframe width="100%" height="360" src="https://www.youtube.com/embed/YLExGgEnbFY?rel=0" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

[Slides aqui](https://speakerdeck.com/feross/real-world-electron):

<script async class="speakerdeck-embed" data-id="5aae08bb7c5b4dbd89060cff11bb1300" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>

[DC](https://dcpos.ch/), outro colaborador da WebTorrent, escreveu [uma lista de verificações que você pode fazer](https://blog.dcpos.ch/how-to-make-your-electron-app-sexy) para que seu aplicativo se sinta polido e nativo. Ele vem com exemplos de códigos e cobre coisas como integração do dock do macOS, arrastar e soltar, notificações para desktop, e certificando-se de que o aplicativo carrega rapidamente.

