---
title: Suporte à barra de toque
author: kevinsawicki
date: '2017-03-08'
---

A versão beta de [Electron 1.6.3][] contém suporte inicial para o</a>detouch bar do macOS .</p> 



---

A nova API Touch Bar permite que você adicione botões, rótulos, pausas, cor seletores, controles deslizantes e espaçadores. Esses elementos podem ser atualizados dinamicamente e também emite eventos quando são interagidos.

Esta é a primeira versão desta API, por isso ela evoluirá durante as próximas poucas versões do Electron. Por favor, confira as notas de lançamento para mais atualizações e abra [issues](https://github.com/electron/electron/issues) para quaisquer problemas ou funcionalidade que não sejam usada.

Você pode instalar esta versão via `npm install electron@beta` e aprender mais sobre isso no [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) e [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Electron docs.

Um grande agradecimento para [@MarshallOfSound](https://github.com/MarshallOfSound) por contribuir com o Electron. :tada:



## Exemplo da Barra de Toque

![Barra de toque Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Abaixo está um exemplo de criação de um jogo de máquina de slot simples na barra de toque. Isso demonstra como criar uma barra de toque, estilize os itens, associe-a a uma janela , Gerencie eventos de botão e atualize os rótulos de forma dinâmica.



```js
const {app, BrowserWindow, TouchBar} = require ('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

deixar girar = falso

// Etiquetas de bobina
bobina const1 = novo TouchBarLabel()
reel2 = novo TouchBarLabel()
bobina const3 = novo TouchBarLabel()

// Rótulo de resultado de spin
resultado const = novo TouchBarLabel()

// Botão de spin
giro const = novo touchbarbutton({
  rótulo: '🎰 Spin',
  backgroundColor: '#7851A9',
  clique: () => {
    // Ignore cliques se já estiver girando
    se (girando) {
      return
    }

    girando = resultado verdadeiro
    .label = ''

    deixar o tempo limite = 10
    giro constLength = 4 * 100 0 // 4 segundos
    const startTime = Date.now()

    const spinReels = () => {
      updateReels()

      se (((Date.now() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Desacelere um pouco em cada rodada
        tempo limite *= 1,1
        setTimeout (spinReels, tempo limite)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  valores de const = ['🍒', '💎', '7️', '🍊', '🔔', '⭐', '🍇', '🍀']
  valores de retorno[Math.floor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1.label = getRandomValue()
  reel2.label = getRandomValue()
  reel3.label
}

acabamento constSpin = () => {
  const uniqueValues = novo Conjunto ([reel1.label, reel2.label, reel3.label]).tamanho
  se (uniqueValues === 1) {
    // Todos os valores 3 são os mesmos
    resultado.label = '💰 jackpot!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    result.textColor = '#FDFF00'
  } else {
    // Nenhum valor é o mesmo
    resultado.rótulo = '🙁 Spin Again'
    resultado.textColor = nulo
  }
  spinning = falso
}

const touchBar = novo TouchBar([
  spin,
  novo TouchBarSpacer({size: 'large'}),
  bobina1,
  novo TouchBarSpacer({size: 'small'}),
  bobina2,
  novo TouchBarSpacer({size: 'small'}),
  bobina3,
  novo TouchBarSpacer({size: 'large'}), resultado

])

deixar janela

app.once('ready', () => { janela
  = novo BrowserWindow({
    quadro : falso,
    títuloBarStyle: 'hidden-inset',
    largura: 200,
    altura: 200,
    fundoColor: '#000'
  })
  janela.loadURL('about:blank')
  window.setTouchBar (touchBar)
})
```

[Electron 1.6.3]: https://github.com/electron/electron/releases/tag/v1.6.3

