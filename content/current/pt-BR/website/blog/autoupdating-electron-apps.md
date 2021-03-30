---
title: Atualização mais fácil para aplicativos Open-Source
author: zeke
date: '2018-05-01'
---

Hoje estamos lançando um webservice de [gratuito, de código aberto, hospedado][update.electronjs.org] e [pacote npm][update-electron-app] para habilitar atualizações automáticas fáceis para aplicativos Electron de código aberto. Este é um passo para capacitar os desenvolvedores de aplicativos a pensarem menos sobre implantação e mais sobre desenvolver experiências de alta qualidade para seus usuários.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Screenshot das atualizações">
    <figcaption>O novo módulo de atualização em ação</figcaption>
  </a>
</figure>

## Tornar a vida mais fácil

A Electron tem uma [autoUpdater][] API que dá aos aplicativos a capacidade de consumir metadados de um ponto final remoto para verificar se há atualizações, baixá-los em segundo plano e instalá-los automaticamente.

Ativar essas atualizações tem sido um passo pesado no processo de implantação para muitos desenvolvedores de aplicativos do Electron porque requer que um servidor web seja implantado e mantido apenas para servir metadados de histórico de versão do aplicativo.

Hoje estamos anunciando uma nova solução drop-in para atualizações automáticas do app. Se seu aplicativo do Electron está em um repositório do GitHub público e você está usando o GitHub Releases para publicar compilações, você pode usar este serviço para fornecer atualizações contínuas de aplicativos aos seus usuários.

## Usando o novo módulo

Para minimizar a configuração de sua parte, criamos [][]de atualização-elétron-app, um módulo npm que se integra com o novo webservice [update.electronjs.org][] .

Instalando o módulo:

```sh
npm install update-electron-app
```

Chame-o de qualquer lugar do processo principal [do seu aplicativo][]:

```js
require('update-electron-app')()
```

É isso! O módulo irá verificar se há atualizações na inicialização do aplicativo e, em seguida, a cada dez minutos. Quando uma atualização for encontrada, ele baixará automaticamente em segundo plano, e uma caixa de diálogo será exibida quando a atualização estiver pronta.

## Migrando apps existentes

Apps já usando a API de autoUpdater do Electron também podem usar este serviço. Para isso, você pode [personalizar o módulo `update-electron-app`][update-electron-app] ou [integrar diretamente com update.electronjs.org][update.electronjs.org].

## Alternativas

Se você estiver usando [][] de construtor de elétrons para empacotar seu aplicativo, você pode usar seu updater embutido. Para obter detalhes, consulte [electron.build/auto-update](https://www.electron.build/auto-update).

Se seu app é privado, você pode precisar executar seu próprio servidor de atualização. Há uma série de ferramentas de código aberto para isso, incluindo o [Hazel][] da Zeit e </a>do Núcleo

da Atlassian. Consulte o [Implantando um tutorial de][] de servidor de atualização para obter mais informações .</p> 



## Agradecimentos

Graças ao [Julian Gruber][] por ajudar a projetar e construir este serviço web simples e escalável. Graças ao pessoal da [Zeit][] por seu serviço de [hazel][] de código aberto, do qual nos inspiramos no design. Graças ao [Samuel Attard][] por as revisões de código. Obrigado pela comunidade do Electron por ajudar a testar este serviço.

🌲 Aqui está um futuro eterno para aplicativos do Electron!

[autoUpdater]: https://electronjs.org/docs/tutorial/updates
[10]: https://github.com/electron-userland/electron-builder
[11]: https://github.com/electron-userland/electron-builder
[hazel]: https://github.com/zeit/hazel
[Hazel]: https://github.com/zeit/hazel
[Julian Gruber]: http://juliangruber.com/
[do seu aplicativo]: https://electronjs.org/docs/glossary#main-process
[Implantando um tutorial de]: https://electronjs.org/docs/tutorial/updates#deploying-an-update-server
[Samuel Attard]: https://www.samuelattard.com/
[4]: https://github.com/electron/update-electron-app
[5]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[Zeit]: https://zeit.co