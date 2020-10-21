---
title: Atualização mais fácil para aplicativos Open-Source
author: zeke
date: '2018-05-01'
---

Hoje estamos lançando um código aberto gratuito, hospedado [atualiza o webservice](https://github.com/electron/update.electronjs.org) e o companion [pacote npm](https://github.com/electron/update-electron-app) para habilitar atualizações automáticas fáceis para aplicativos Electron de código aberto. Este é um passo para capacitar os desenvolvedores de aplicativos a pensarem menos sobre implantação e mais sobre desenvolver experiências de alta qualidade para seus usuários.

---

<figure>
  <a href="https://github.com/electron/update-electron-app" style="display: block; text-align: center;">
    <img class="screenshot" src="https://user-images.githubusercontent.com/2289/39480716-e9990910-4d1d-11e8-8901-9549c6ff6050.png" alt="Screenshot das atualizações">
    <figcaption>O novo módulo de atualização em ação</figcaption>
  </a>
</figure>

## Tornar a vida mais fácil

Electron tem uma API [autoUpdater](https://electronjs.org/docs/tutorial/updates) que dá aos aplicativos a capacidade de consumir metadados de um ponto de extremidade remota para verificar se há atualizações, baixe-os em segundo plano e instale-os automaticamente.

Ativar essas atualizações tem sido um passo pesado no processo de implantação para muitos desenvolvedores de aplicativos do Electron porque requer que um servidor web seja implantado e mantido apenas para servir metadados de histórico de versão do aplicativo.

Hoje estamos anunciando uma nova solução drop-in para atualizações automáticas do app. Se seu aplicativo do Electron está em um repositório do GitHub público e você está usando o GitHub Releases para publicar compilações, você pode usar este serviço para fornecer atualizações contínuas de aplicativos aos seus usuários.

## Usando o novo módulo

Para minimizar a configuração de sua parte, criamos [update-electron-app](https://github.com/electron/update-electron-app), um módulo npm que se integra ao novo

webservice [ update.electronjs.org](https://github.com/electron/update.electronjs.org).</p> 

Instalando o módulo:



```sh
npm install update-electron-app
```


Chame-a de qualquer lugar do [processo principal do seu aplicativo](https://electronjs.org/docs/glossary#main-process):



```js
require('update-electron-app')()
```


É isso! O módulo irá verificar se há atualizações na inicialização do aplicativo e, em seguida, a cada dez minutos. Quando uma atualização for encontrada, ele baixará automaticamente em segundo plano, e uma caixa de diálogo será exibida quando a atualização estiver pronta.



## Migrando apps existentes

Apps já usando a API de autoUpdater do Electron também podem usar este serviço. Para fazer isso, é possível [personalizar o `módulo update-electron-app`](https://github.com/electron/update-electron-app) ou [se integrar diretamente com update.electronjs.org](https://github.com/electron/update.electronjs.org).



## Alternativas

Se você estiver usando o [electron-builder](https://github.com/electron-userland/electron-builder) para empacotar seu aplicativo, você poderá usar o atualizador built-in dele. Para obter detalhes, consulte [electron.build/auto-update](https://www.electron.build/auto-update).

Se seu app é privado, você pode precisar executar seu próprio servidor de atualização. Há uma série de ferramentas de código aberto para isso, incluindo [de Zeit](https://github.com/zeit/hazel) e Nucleus [da Atlassian](https://github.com/atlassian/nucleus). Veja o [Tutorial](https://electronjs.org/docs/tutorial/updates#deploying-an-update-server) de Atualização do Servidor para mais informações.



## Agradecimentos

Graças ao [Julian Gruber](http://juliangruber.com/) por ajudar a projetar e construir este simples e escalável serviço da web . Graças aos funcionários do [Zeit](https://zeit.co) pelo seu serviço open-source [Hazel](https://github.com/zeit/hazel) do qual saímos uma inspiração de design. Graças ao [Samuel Attard](https://www.samuelattard.com/) para análises de código. Obrigado pela comunidade do Electron por ajudar a testar este serviço.

🌲 Aqui está um futuro eterno para aplicativos do Electron!