---
title: npm install electron
author: zeke
date: '2016-08-16'
---

A partir do Electron versão 1.3.1, você pode `npm instalar electron --save-dev` para instalar a última versão pré-compilada do Electron em seu aplicativo.

---

![npm install electron](https://cloud.githubusercontent.com/assets/378023/17259327/3e3196be-55cb-11e6-8156-525e9c45e66e.png)

## O binário pré-construído do Electron

Se você já trabalhou em um app do Electron antes, você provavelmente se deparou com o pacote npm `do electron-prebuilt`. Este pacote é uma parte indispensável de quase cada projeto Electron. Quando instalado, ele detecta seu sistema operacional e baixa um binário pré-construído que é compilado para funcionar na arquitetura do seu sistema.

## O novo nome

O processo de instalação do Electron foi muitas vezes um obstáculo para novos desenvolvedores. Muitas pessoas corajosas tentaram começar a desenvolver um Electron por app executando `npm install electron` ao invés de `npm install electron-prebuilt`, apenas para descobrir (muitas vezes após muita confusão) que não era o `elétrons` que eles estavam procurando.

Isto foi porque havia um projeto existente de `electron` no npm, criado antes do projeto Electron do GitHub existir. Para ajudar a tornar o desenvolvimento do Electron mais fácil e intuitivo para novos desenvolvedores, nós chegamos ao dono do pacote existente de `elétrons` npm para perguntar se ele estaria disposto a nos deixar usar o nome. Felizmente ele era um fã de nosso projeto e concordou em nos ajudar a reencaminhar o nome.

## Vidas pré-construídas em

A partir da versão 1.3.1, começamos a publicar os pacotes [`electron`](https://www.npmjs.com/package/electron) e `electron-prebuilt` no npm no tandem. Os dois pacotes são idênticos. Optámos por continuar a publicar o pacote com ambos os nomes por um tempo, para não incomodar os milhares de desenvolvedores que estão atualmente usando `electron-prebuilt` em seus projetos. Recomendamos atualizar seu `pacote. son` arquivos para usar a nova dependência de `electron` , mas continuaremos lançando novas versões de `electron-pré-construídas` até o final de 2016.

The [electron-userland/electron-prebuilt](https://github.com/electron-userland/electron-prebuilt) repository will remain the canonical home of the `electron` npm package.

## Muito obrigado

Devemos um agradecimento especial a [@mafintosh](https://github.com/mafintosh), [@maxogden](https://github.com/maxogden), e muitos outros [contribuintes](https://github.com/electron-userland/electron-prebuilt/graphs/contributors) por criar e manter `electron-prebuilt`, e por seu serviço incansável ao JavaScript, Node. s, e comunidades Electron.

E graças a [@logicalparadox](https://github.com/logicalparadox) por permitir que tomemos conta do `pacote de elétrons` no npm.

## Atualizando seus projetos

Trabalhamos com a comunidade para atualizar pacotes populares que são afetados por esta mudança. Pacotes como [electron-packager](https://github.com/electron-userland/electron-packager), [electron-rebuild](https://github.com/electron/electron-rebuild), e [builder do electron](https://github.com/electron-userland/electron-builder) já foram atualizados para trabalhar com o novo nome enquanto continua a suportar o nome antigo.

Se você encontrar algum problema ao instalar este novo pacote, Por favor, deixe-nos saber abrindo uma issue no repositório [electron-userland/electron-prebuild](https://github.com/electron-userland/electron-prebuilt/issues) .

For any other issues with Electron, please use the [electron/electron](https://github.com/electron/electron/issues) repository.

