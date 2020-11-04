---
title: "Novo no Electron 2: Compras In-App"
author: zeke
date: '2018-04-04'
---
  
A nova linha de versão 2.0 do Electron é [empacotada](https://github.com/electron/electron/releases/tag/v2.0.0-beta.1) com novas funcionalidades e correções. Um dos destaques desta nova versão principal é um novo [`inAppPurchase` API](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) para a [Mac App Store](https://support.apple.com/en-us/HT202023) da Apple.

---

Compras no aplicativo permitem a compra de conteúdo ou assinaturas diretamente de dentro de apps. Isto dá aos desenvolvedores uma maneira fácil de abraçar o [modelo de negócios freemium](https://developer.apple.com/app-store/freemium-business-model/), onde os usuários não pagam nada para baixar um aplicativo e recebem compras opcionais dentro do aplicativo para recursos premium, conteúdo adicional ou assinaturas.

A nova API foi adicionada ao Electron pelo colaborador da comunidade [Adrien Fery](https://github.com/AdrienFery) para permitir compras dentro do aplicativo em [Amanote](https://amanote.com/), um app com anotações do Electron para aulas e conferências. Amanote é gratuito para baixar e permite que notas limpas e estruturadas sejam adicionadas aos PDFs, com recursos como fórmulas matemáticas, desenhos, gravação de áudio e muito mais.

Desde a adição de suporte no aplicativo para a versão Mac de Amanote, o Adrien registrou um aumento de **40% nas vendas**!

## Introdução

O novo [`inAppPurchase`](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md) API já desembarcou no último beta do Electrô:

```sh
npm i -D electron@beta
```

A documentação para a API pode ser [encontrada no GitHub](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md), e o Adrien foram gentis o suficiente para escrever um tutorial sobre como usar a API. Para começar a adicionar compras dentro do aplicativo ao seu app, [veja o tutorial](https://github.com/AdrienFery/electron/blob/a69bbe882aed1a5aee2b7910afe09900275b2bf6/docs/tutorial/in-app-purchases.md).

Mais [melhorias na API](https://github.com/electron/electron/pull/12464) estão em funcionamento, e em breve estarão disponíveis em uma próxima versão beta do Electron.

## Windows pode ser o próximo

A seguir, o Adrien espera abrir um novo canal de receita para a Amanote adicionando suporte para compras dentro do app da Microsoft Store no Electron. Fique atento para desenvolvimentos sobre isso!