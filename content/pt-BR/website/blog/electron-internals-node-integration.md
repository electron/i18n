---
title: 'Electron Internals: Message Loop Integration'
author: zcbenz
date: '2016-07-28'
---

Este é o primeiro post de uma série que explica os internos da Electron. Esta postagem introduz como o loop de eventos do Node é integrado com o Chromium no Electron.

---

Houve muitas tentativas de usar o Node para a programação da GUI, como [node-gui](https://github.com/zcbenz/node-gui) para ligações GTK+, e [node-qt](https://github.com/arturadib/node-qt) para ligações de TQ. Mas nenhum deles funciona em produção porque as ferramentas da GUI têm sua própria mensagem de laços enquanto o Node usa libuv para seu próprio laço de evento, e o thread principal pode apenas executar um loop ao mesmo tempo. Assim o truque comum de executar o loop de mensagens de GUI no Node é bombar o loop de mensagem em um temporizador com um intervalo muito pequeno, que faz com que a resposta da interface GUI seja lenta e ocupe muitos recursos da CPU.

Durante o desenvolvimento do Electron enfrentamos o mesmo problema, embora de um jeito invertido: tivemos que integrar o loop de eventos do Node no loop de mensagens do Chromium .

## O processo principal e o processo de renderização

Antes de aprofundarmos os detalhes da integração de laços de mensagens, eu primeiro explicarei a arquitetura multi-processo do Chromium.

No Electron existem dois tipos de processos: o processo principal e o processo de renderização (isso é realmente extremamente simplificado, para uma visualização completa, por favor veja [Arquitetura Multiprocesso](http://dev.chromium.org/developers/design-documents/multi-process-architecture)). O processo principal é responsável pela GUI funciona como a criação de janelas, enquanto o processo de renderização lida apenas com executando e renderizando páginas da web.

O Electron permite o uso de JavaScript para controlar tanto o processo principal quanto o processo de renderização , o que significa que temos que integrar o Node em ambos os processos.

## Substituindo o loop de mensagens do Chromium por libuv

Minha primeira tentativa foi reimplementar o loop de mensagens do Chromium com libuv.

Foi fácil para o processo de renderização, uma vez que o seu loop de mensagem ouviu apenas descritores de arquivos e temporizadores, e eu só precisava implementar a interface com libuv.

No entanto, foi significativamente mais difícil para o processo principal. Cada plataforma tem seu próprio tipo de laço de mensagem de GUI. macOS Chromium usa `NSRunLoop`, enquanto Linux usa glib. I tried lots of hacks to extract the underlying file descriptors out of the native GUI message loops, and then fed them to libuv for iteration, but I still met edge cases that did not work.

Então finalmente adicionei um cronômetro para enquete o loop de mensagens da GUI em um pequeno intervalo. Como resultado o processo levou um uso constante da CPU, e certas operações tiveram longos atrasos.

## Laço de eventos do Nó em um tópico separado

Tal como o libuv amadureceu, foi possível adoptar uma outra abordagem.

O conceito de fd backend foi introduzido em libuv, que é um descritor de arquivo (ou handle) que libuv enquetes para seu loop de eventos. Então, ao consultar o back-end é possível ser notificado quando houver um novo evento em libuv.

So in Electron I created a separate thread to poll the backend fd, and since I was using the system calls for polling instead of libuv APIs, it was thread safe. E sempre que houve um novo evento no loop de eventos do libuv, uma mensagem seria postada no loop de mensagens do Chromium, e os eventos de libuv seriam processados no tópico principal.

Dessa forma, eu evitei remendar o Chromium e o Node, e o mesmo código foi usado nos processos tanto do principal quanto do renderizador.

## O código

You can find the implemention of the message loop integration in the `node_bindings` files under [`electron/atom/common/`][node-bindings]. Ele pode ser facilmente reutilizado para projetos que querem integrar o Node.

*Update: Implementation moved to [`electron/shell/common/node_bindings.cc`](https://github.com/electron/electron/blob/master/shell/common/node_bindings.cc).*

[node-bindings]: https://github.com/electron/electron/tree/main/atom/common
