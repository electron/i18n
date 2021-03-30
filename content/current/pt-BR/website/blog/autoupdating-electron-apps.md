---
title: Atualização mais fácil para aplicativos Open-Source
author: zeke
date: '2018-05-01'
---

Today we're releasing a free, open-source, hosted [updates webservice][update.electronjs.org] and companion [npm package][update-electron-app] to enable easy automatic updates for open-source Electron apps. Este é um passo para capacitar os desenvolvedores de aplicativos a pensarem menos sobre implantação e mais sobre desenvolver experiências de alta qualidade para seus usuários.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Screenshot das atualizações">
    <figcaption>O novo módulo de atualização em ação</figcaption>
  </a>
</figure>

## Tornar a vida mais fácil

Electron has an [autoUpdater][] API that gives apps the ability to consume metadata from a remote endpoint to check for updates, download them in the background, and install them automatically.

Ativar essas atualizações tem sido um passo pesado no processo de implantação para muitos desenvolvedores de aplicativos do Electron porque requer que um servidor web seja implantado e mantido apenas para servir metadados de histórico de versão do aplicativo.

Hoje estamos anunciando uma nova solução drop-in para atualizações automáticas do app. Se seu aplicativo do Electron está em um repositório do GitHub público e você está usando o GitHub Releases para publicar compilações, você pode usar este serviço para fornecer atualizações contínuas de aplicativos aos seus usuários.

## Usando o novo módulo

To minimize configuration on your part, we've created [update-electron-app][], an npm module which integrates with the new [update.electronjs.org][] webservice.

Instalando o módulo:

```sh
npm install update-electron-app
```

Call it from anywhere in your app's [main process][]:

```js
require('update-electron-app')()
```

É isso! O módulo irá verificar se há atualizações na inicialização do aplicativo e, em seguida, a cada dez minutos. Quando uma atualização for encontrada, ele baixará automaticamente em segundo plano, e uma caixa de diálogo será exibida quando a atualização estiver pronta.

## Migrando apps existentes

Apps já usando a API de autoUpdater do Electron também podem usar este serviço. To do so, you can [customize the `update-electron-app`][update-electron-app] module or [integrate directly with update.electronjs.org][update.electronjs.org].

## Alternativas

If you're using [electron-builder][] to package your app, you can use its built-in updater. Para obter detalhes, consulte [electron.build/auto-update](https://www.electron.build/auto-update).

Se seu app é privado, você pode precisar executar seu próprio servidor de atualização. There are a number of open-source tools for this, including Zeit's [Hazel][] and Atlassian's [Nucleus][]. See the [Deploying an Update Server][] tutorial for more info.

## Agradecimentos

Thanks to [Julian Gruber][] for helping design and build this simple and scalable web service. Thanks to the folks at [Zeit][] for their open-source [Hazel][] service, from which we drew design inspiration. Thanks to [Samuel Attard][] for the code reviews. Obrigado pela comunidade do Electron por ajudar a testar este serviço.

🌲 Aqui está um futuro eterno para aplicativos do Electron!

[autoUpdater]: https://electronjs.org/docs/tutorial/updates
[electron-builder]: https://github.com/electron-userland/electron-builder
[Hazel]: https://github.com/zeit/hazel
[Julian Gruber]: http://juliangruber.com/
[main process]: https://electronjs.org/docs/glossary#main-process
[Deploying an Update Server]: https://electronjs.org/docs/tutorial/updates#deploying-an-update-server
[Nucleus]: https://github.com/atlassian/nucleus
[Samuel Attard]: https://www.samuelattard.com/
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update-electron-app]: https://github.com/electron/update-electron-app
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[update.electronjs.org]: https://github.com/electron/update.electronjs.org
[Zeit]: https://zeit.co