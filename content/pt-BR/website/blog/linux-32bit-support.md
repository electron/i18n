---
title: Descontinuando o suporte para Linux de 32 bits
author: revestimento
date: '2019-03-04'
---

A equipe do Electron descontinuará o suporte para Linux de 32 bits (ia32 / i386) começando com Electron v4.0. A última versão do Electron que suporta instalações baseadas em 32 bits do Linux é o Electron v3.1, que receberá versões de suporte até que o Electron v6 seja lançado. O suporte para Linux com base em 64 bits e `armv7l` continuará inalterado.

---

## O que o Electron não suporta exatamente?

Você pode ter visto a descrição "64-bit" e "32-bit" como stickers em seu computador ou como opções para baixar software. O termo é usado para descrever uma arquitetura de computador específica. A maioria dos computadores feitos na década de 1990 e início de 2000 foram feitos com CPUs que eram baseados na arquitetura de 32 bits, enquanto a maioria dos computadores feitos mais tarde eram baseados na arquitetura de 64 bits mais recente e mais poderosa. O Nintendo 64 (conseguir? e o PlayStation 2 foram os primeiros dispositivos de consumo amplamente disponíveis com a nova arquitectura, os computadores vendidos após 2010 continham quase exclusivamente processadores de 64 bits. Como resultado, o suporte tem diminuído: o Google parou de liberar o Chrome para Linux de 32 bits em março de 2016, Canônica parou de fornecer imagens de área de trabalho de 32 bits em 2017 e deixou de receber suporte de 32 bits junto com Ubuntu 18.10. O Arch Linux, o Sistema Operacional elementar e outras distribuições proeminentes de Linux já tem suporte para a arquitetura do processador envelhecido.

Até agora, o Electron tem fornecido e suportado compilações que são executadas na arquitetura 32-bit mais antiga. Da versão v4.0 em diante, a equipe Electron não poderá mais fornecer binários ou suporte para Linux de 32 bits.

O Electron sempre foi um vibrante projeto de código aberto e continuamos a apoiar e incentivar desenvolvedores interessados em construir Electron para arquiteturas exóticas.

## O que isso significa para os desenvolvedores?

Se você não estiver fornecendo distribuições de 32 bits do seu aplicativo para Linux, nenhuma ação é necessária.

Projetos que fornecem Linux Electron com 32 bits terão de decidir como proceder. Linux 32-bit será suportado no Electron 3 [até](https://electronjs.org/docs/tutorial/support#supported-versions) a versão do Electron 6, o que dá algum tempo para tomar decisões e planos.

## O que significa isso para os utilizadores?

Se você é um usuário do Linux e não sabe se você está executando ou não um sistema baseado em 64 bits, você provavelmente está rodando em uma arquitetura baseada em 64 bits. Para ter certeza, você pode executar os comandos `lscpu` ou `uname -m` no seu terminal. Ou um imprimirá sua arquitetura atual.

Se você estiver usando Linux no processador de 32 bits, você provavelmente já encontrou dificuldades em encontrar software lançado recentemente para o seu sistema operacional. A equipe do Electron se junta a outros membros proeminentes da comunidade Linux, recomendando que você faça um upgrade para uma arquitetura baseada em 64 bits.
