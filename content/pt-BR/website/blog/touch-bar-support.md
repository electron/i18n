---
title: Suporte à barra de toque
author: kevinsawicki
date: '2017-03-08'
---

A versão beta do Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) contém suporte inicial para o macOS [Barra de Toque](https://developer.apple.com/macos/touch-bar).

---

A nova API Touch Bar permite que você adicione botões, rótulos, pausas, cor seletores, controles deslizantes e espaçadores. Esses elementos podem ser atualizados dinamicamente e também emite eventos quando são interagidos.

Esta é a primeira versão desta API, por isso ela evoluirá durante as próximas poucas versões do Electron. Por favor, confira as notas de lançamento para mais atualizações e abra [issues](https://github.com/electron/electron/issues) para quaisquer problemas ou funcionalidade que não sejam usada.

Você pode instalar esta versão via `npm install electron@beta` e aprender mais sobre isso no [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) e [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Electron docs.

Um grande agradecimento para [@MarshallOfSound](https://github.com/MarshallOfSound) por contribuir com o Electron. :tada:

## Exemplo da Barra de Toque

![Barra de toque Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Abaixo está um exemplo de criação de um jogo de máquina de slot simples na barra de toque. Isso demonstra como criar uma barra de toque, estilize os itens, associe-a a uma janela , Gerencie eventos de botão e atualize os rótulos de forma dinâmica.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let girando = false

// Etiquetas de realm
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Rótulo de resultado de giração
const result = new TouchBarLabel()

// Botão de girar
const spin = new TouchBarButton({
  rótulo: '🎰 Giro ',
  fundoCor: '#7851A9',
  clique: () => {
    // Ignore cliques se já estiver girando
    if (girando) {
      return
    }

    giros = true
    result . abel = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 segundos
    const startTime = Date. ow()

    const spinReels = () => {
      updateReels()

      if ((Date. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Desacelere um pouco em cada giro
        timeout *= 1. setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', ':gem_pedra:', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  valores de retorno[Matemática. loor(Math.random() * valores.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1. abel, reel2.label, reel3.label]). ize
  if (uniqueValues === 1) {
    // Todos os 3 valores são o mesmo resultado
    . abel = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    extColor = '#FDFF00'
  } else {
    // Nenhum valor é o mesmo resultado
    . abel = '🙁 Girar Novamente'
    resultados. extColor = null
  }
  giros = false
}

const touchBar = new TouchBar([
  giros,
  novo TouchBarSpacer({size: 'large'}),
  fileira,
  novo TouchBarSpacer({size: 'small'}),
  fileiras2,
  new TouchBarSpacer({size: 'small'}),
  fileiras 3
  novos TouchBarSpacer({size: 'large'}),
  resultado
])

let janela

app. nce('ready', () => {
  janela = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden-inset',
    largura: 200,
    de altura: 200,
    backgroundColor: '#000'
  })
  janela. oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

