---
title: 'Projeto da Semana: Navegador do Beaker'
author:
  - pfrazee
  - zeke
date: '2017-02-07'
---

Esta semana nós pegamos [Paul Frazee](http://pfrazee.github.io/), criador do [Beaker Browser](https://beakerbrowser.com/). Beaker é um navegador web peer-to-peer experimental que usa o protocolo Dat para hospedar sites dos dispositivos dos usuários.

---<iframe width="100%" height="420" src="https://www.youtube.com/embed/Bem9nRpyPEs" frameborder="0" allowfullscreen mark="crwd-mark"></iframe>

## O que é Beaker e por que você o criou?

Beaker é um navegador participativo. É um navegador de hackers indie.

A Web é fonte fechada. Se você quer influenciar a forma como as redes sociais funcionam, você tem que trabalhar no Facebook ou no Twitter. Para pesquisar, Google. O controlo está nas mãos das empresas, e não dos próprios utilizadores.

Com Beaker, temos um novo protocolo Web: o [Transporte de arquivo descentralizado](https://datprotocol.com). "Dat." It creates sites on demand, for free, and then shares them from the device. Nenhum servidor necessário. Essa é a nossa inovação.

![Protocolos de bichos](https://cloud.githubusercontent.com/assets/2289/22560648/3defed5c-e92a-11e6-93f8-956cafafe3be.jpg)

Quando você visita um site do Dat no Beaker, você baixa os arquivos. O site é seu, para sempre. Você pode salvá-lo, fazer fork, modificá-lo e compartilhar sua nova versão gratuitamente. É tudo de código-aberto.

Então é disso que se trata: estamos criando um navegador para sites de código aberto. Queremos que seja um instrumento de hacker social.

## Quem deveria estar usando Beaker?

Hackers. Modders. Tipos criativos. Pessoas que gostam de mexer.

## Como faço para criar um novo projeto que usa Dados?

Nós temos [uma ferramenta de linha de comando chamada bkr](https://github.com/beakerbrowser/bkr) que é como git + npm. Está criando um site:

```bash
$ cd ~/my-site
$ bkr init
$ echo "Hello, world!" > index.html
$ bkr publish
```

E aqui está o fork de um site:

```bash
$ bkr fork dat://0ff7d4c7644d0aa19914247dc5dbf502d6a02ea89a5145e7b178d57db00504cd/ ~/my-fork
$ cd ~/my-fork
$ echo "My fork has no regard for the previous index.html!" > index.html
$ bkr publish
```

Em seguida, esses sites são hospedados fora do seu navegador. É um pouco como o BitTorrent; você compartilha os sites em uma malha P2P.

Se você quer uma interface gráfica, temos algumas ferramentas básicas construídas no navegador, mas estamos empurrando essas ferramentas para a userland. Tudo vai ser um aplicativo modificável para usuários.

## Por que você escolheu construir o Beaker no Electron?

Era óbvio para este projecto. Se eu fizesse o fork do Chrome pessoalmente, estaria escrevendo em C++ agora! Ninguém quer fazer isso. Eu conheço a pilha da Web e posso trabalhar rapidamente com ela. É puro hábil.

A verdade é que, eu não sei se poderia fazer algo disso sem Electron. É um ótimo software.

## Quais são os desafios que você enfrentou ao construir um Beaker?

Metade disso é cutucar as ferramentas e descobrir o quanto eu posso fugir.

Fazer o próprio navegador foi bastante fácil. O Electron é praticamente um kit de ferramentas para fazer navegadores. ...Exceto pelas abas do navegador; isso me levou para sempre para acertar. Finalmente eu quebrei e aprendi como fazer SVGs. É muito melhor olhar, mas precisou de 3 ou 4 iterações antes que eu pegasse certo.

## Em que áreas o Electron deve ser melhorado?

Seria muito bom se eu pudesse ancorar os devtools dentro de uma webview.

## O que vem a seguir em Beaker?

Nomes DNS seguros para sites Dat. Um esquema de URL socialmente configurável, chamado ["esquema de app"](https://github.com/beakerbrowser/beaker/wiki/App-Scheme) Mais Dat APIs.

## Para as pessoas que possam estar interessadas em contribuir para o projeto, em que áreas Beaker precisa de ajuda?

Temos muitas questões em aberto. Não tenha medo de me pingar. #beakerbrowser no freenode. Manteremos uma página [para contribuidores](https://beakerbrowser.com/docs/team.html) e vamos adicioná-lo. E se você visitar Austin, eu lhe comprarei uma cerveja.

## Quaisquer dicas do Electron que possam ser úteis para outros desenvolvedores?

1. Use as ferramentas de construção que estão por aí. Você não quer lutar com suas próprias soluções, confie em mim. Use o electron-builder. Use um repo de boilerplate
2. Se você precisar abrir um problema no repositório de Electron, clique no quilômetro extra para facilitar a reprodução. Você receberá uma resposta muito mais rapidamente, e a equipe agradecerá. Melhor ainda, tente consertar você mesmo. Na verdade, é muito interessante ver as vísceras.
3. Leia todos os guias e documentos avançados pelo menos uma vez.
4. Não construa um navegador, é um mercado saturado.

