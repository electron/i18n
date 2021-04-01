---
title: Mac App Store e Windows Updater automático no Electron
author: lorde
date: '2015-11-05'
---

Recentemente o Electron adicionou dois recursos interessantes: uma compilação compatível com a Mac App Store e uma atualização automática integrada do Windows.

---

## Suporte à Mac App Store

<img src='https://cloud.githubusercontent.com/assets/1305617/10928574/a301640c-825e-11e5-918e-a06b7a55dcb4.png' width="300" />

A partir de `v0.34.0` cada lançamento Electron inclui uma compilação compatível com a Mac App Store. Anteriormente, um aplicativo desenvolvido com Electron não corresponderia aos requisitos da Apple para a Mac App Store. A maioria destes requisitos está relacionada com o uso de APIs privadas. Para poder sandbox Electron de tal forma que ele atenda aos requisitos que dois módulos precisam ser removidos:

- `relator-travado`
- `atualizador automático`

Além disso, alguns comportamentos mudaram em relação a detecção de alterações no DNS, captura de vídeo e acessibilidade recursos. Você pode ler mais sobre as alterações e [enviar seu aplicativo para a loja Mac App](https://electronjs.org/docs/latest/tutorial/mac-app-store-submission-guide) na documentação. As distribuições podem ser encontradas na [página do Electron lançamentos](https://github.com/electron/electron/releases), prefixados com `massa -`.

Pull Requests: [electron/electron#3108](https://github.com/electron/electron/pull/3108), [electron/electron#2920](https://github.com/electron/electron/pull/2920)

## Atualizações automáticas do Windows

No Electron `v0.34.1` o módulo `auto atualizador` foi melhorado para trabalhar com [`Squirrel.Windows`](https://github.com/Squirrel/Squirrel.Windows). Isto significa que o Electron vem com maneiras fáceis de atualizar automaticamente seu aplicativo no OS X e Windows. Você pode ler mais na [configuração do seu aplicativo para atualização automática no Windows](https://github.com/electron/electron/blob/master/docs/api/auto-updater.md#windows) na documentação.

Pull Request: [electron/electron#1984](https://github.com/electron/electron/pull/1984)

