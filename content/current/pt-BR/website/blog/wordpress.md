---
title: 'Projeto da Semana: Computador WordPress'
author:
  - mkaz
  - joasilva
  - zeke
date: '2017-02-28'
---

Esta semana nós pegamos o pessoal da [Automática](https://automattic.com/) para falar sobre [WordPress Desktop](https://apps.wordpress.com/desktop/), um cliente de desktop open-source para gerenciar o conteúdo do WordPress.

---

[![Aplicativos WordPress](https://cloud.githubusercontent.com/assets/2289/23391881/ea54d52e-fd2c-11e6-86ec-98fe466d5c5c.gif)](https://apps.wordpress.com/desktop/)

## Todo mundo sabe sobre o WordPress, mas o que é WordPress Desktop?

O [WordPress. O app om Desktop](https://apps.wordpress.com/desktop/) fornece uma experiência multiplataforma ininterrupta que permite que você se concentre em seu conteúdo e design sem guias do navegador para distraí-lo — ou para manter seus sites laterais mas acessíveis. Em combinação com nosso navegador de suporte e aplicativo móvel, você pode criar seu site em qualquer lugar, de qualquer maneira você ajuda você a fazer seu trabalho.

## Por que construir um aplicativo para Desktop para gerenciar sites do WordPress? Não poderia ser tudo baseado na web?

Na verdade, ele está usando exatamente a mesma tecnologia que você obtém ao visitar [WordPress.com](https://wordpress.com) no seu navegador. No entanto, é tudo hospedado localmente, então tem o tempo mínimo de carregamento. Com o benefício de recursos nativos como estar na sua doca, notificações, etc., você realmente pode se concentrar em seus sites WordPress e blogging.

## Por que você optou por construir uma área de trabalho WordPress com Electron?

No final de 2015, reconstruímos grande parte do WordPress.com na forma de [Calypso](https://github.com/automattic/wp-calypso), um aplicativo JavaScript moderno de código aberto usando React. Nós começamos a olhar para o Electron e com algumas alterações para o Calypso conseguiram que ele funcione localmente. Foi uma experiência convincente e pensámos que era muito útil desenvolvê-la.

Tivemos várias equipes trabalhando no Calypso. Para fazer um cliente de GUI multiplataforma completo, que corresponda a isso usando as tecnologias de desktop tradicionais, teria trabalhado mais. Usando Electron, uma pequena equipe de 2-4 de nós foi capaz de alavancar os esforços da outra equipe e construir o aplicativo para computador em alguns meses.

## Quais são alguns desafios que você enfrentou ao construir uma Mesa WordPress?

Nós temos uma versão inicial do aplicativo funcionando muito rapidamente. mas ajustá-lo para se comportar de forma ideal, pois um aplicativo levou muito tempo. Um grande desafio com o app é que você está realmente executando uma cópia do Calypso na sua própria máquina - é puramente uma interface de usuário orientada pela API. Havia muita obra de ponte envolvida nesta questão e mudanças foram remetidas para o próprio Calypso.

Além disso, muito esforço foi gasto empacotando o app para diferentes plataformas - nós fornecemos Windows, versões macOS e Linux - e existem diferenças suficientes para tornar esse processo complicado.

Na época, o Electron era relativamente novo e continuamos enfrentando problemas que foram resolvidos em breve (às vezes no mesmo dia!)

## Em que áreas o Electron deve ser melhorado?

O Electron já fornece a maior parte do que precisamos para o aplicativo Desktop, e ele é progressivo desde que começamos a usá-lo. Dito isto, existem algumas áreas que são tomadas como adquiridas num aplicativo para desktop, tais como a verificação ortográfica e encontrar/substituir, que é mais difícil de replicar com o Electron como está.

Nós também adoraríamos ver algumas das tecnologias mais recentes do Chrome filtrando o Electron também. Estamos particularmente interessados em experimentar o WebVR.

## Quais são as suas coisas favoritas sobre o Electron?

A principal razão pela qual escolhemos o Electron, e sua maior força, é a comunidade muito ativa e aberta. O automatismo sempre acreditou em fonte aberta. É um dos nossos princípios centrais. e o projeto e comunidade Electron seguem muitas das principais crenças de ser muito aberto e positivo.

## O que vem a seguir no WordPress Desktop?

O que há de melhor no nosso modelo é que o aplicativo para computador se beneficia de qualquer novo recurso de Calypso - existem melhorias constantes. Esperamos poder adicionar recursos adicionais ao aplicativo, como suporte offline, que realmente leva o aplicativo em território nativo, e melhores notificações do sistema.

## Há algum time na Automática trabalhando em outros aplicativos Electron?

Sim, após os nossos esforços no aplicativo Desktop, a equipe do Simplenote decidiu usar o Electron para construir aplicativos para Windows e Linux (um cliente nativo Mac já existe). O [Simplenote Electron](https://github.com/Automattic/simplenote-electron) também é de código aberto e está disponível no Github.

Nós também temos uma futura integração com Raspberry Pi que usa o Electron.

Se algum desses sons interessantes, [adoraríamos ouvir de você](https://automattic.com/work-with-us/)!

## Quaisquer dicas do Electron que possam ser úteis para outros desenvolvedores?

O processo de envio assinado desktop software é relativamente novo para nós, especialmente para o Windows. escrevemos um artigo para a [Assinatura de código de um aplicativo Windows](https://mkaz.blog/code/code-signing-a-windows-application/) que inclui o processo e alguns dos obstáculos que atravessamos para fazer isso corretamente.

