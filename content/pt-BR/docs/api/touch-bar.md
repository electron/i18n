## Class: TouchBar

> Crie layouts TouchBar para aplicativos nativos do macOS

Processo: [Main](../glossary.md#main-process)

### `novas opções touchBar (opções)`

* objeto `options`
  * `items` (</a> | touchbarbutton[ [](touch-bar-color-picker.md) | TouchBarColorPicker [TouchBarGroup](touch-bar-group.md) |](touch-bar-button.md) | TouchBarLabel

 [TouchBarPopover](touch-bar-popover.md) | [](touch-bar-scrubber.md) | TouchBarScrubber [](touch-bar-segmented-control.md) | TouchBarSegmentedControl [TouchBarSlider](touch-bar-slider.md) | [](touch-bar-spacer.md)TouchBarSpacer )[] (opcional)</li> 
    
      * `escapeItem` (</a> | touchbarbutton[ [](touch-bar-color-picker.md) | TouchBarColorPicker [TouchBarGroup](touch-bar-group.md) |](touch-bar-button.md) | TouchBarLabel  [TouchBarPopover](touch-bar-popover.md) | [](touch-bar-scrubber.md) | TouchBarScrubber [](touch-bar-segmented-control.md) | TouchBarSegmentedControl [TouchBarSlider](touch-bar-slider.md) | [](touch-bar-spacer.md) | TouchBarSpacer nulo) (opcional)</li> </ul></li> </ul> 
    
    Cria uma nova barra de toque com os itens especificados. Use `BrowserWindow.setTouchBar` para adicionar o `TouchBar` a uma janela.
    
    **Nota:** A API touchbar é atualmente experimental e pode alterar ou ser removido em futuras versões eletrônicas.
    
    **Dica:** Se você não tem um MacBook com Touch Bar, você pode usar [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) para testar o uso da Touch Bar em seu aplicativo.
    
    

### Propriedades estáticas



#### `TouchBarButton`

Uma referência [`typeof TouchBarButton`](./touch-bar-button.md) à classe `TouchBarButton` .



#### `TouchBarColorPicker`

Uma referência [`typeof TouchBarColorPicker`](./touch-bar-color-picker.md) à classe `TouchBarColorPicker` .



#### `TouchBarGroup`

Uma referência [`typeof TouchBarGroup`](./touch-bar-group.md) à classe `TouchBarGroup` .



#### `TouchBarLabel`

Uma referência [`typeof TouchBarLabel`](./touch-bar-label.md) à classe `TouchBarLabel` .



#### `TouchBarPopover`

Uma referência [`typeof TouchBarPopover`](./touch-bar-popover.md) à classe `TouchBarPopover` .



#### `TouchBarScrubber`

Uma referência [`typeof TouchBarScrubber`](./touch-bar-scrubber.md) à classe `TouchBarScrubber` .



#### `TouchBarSegmentedControl`

Uma referência [`typeof TouchBarSegmentedControl`](./touch-bar-segmented-control.md) à classe `TouchBarSegmentedControl` .



#### `TouchBarSlider`

Uma referência [`typeof TouchBarSlider`](./touch-bar-slider.md) à classe `TouchBarSlider` .



#### `TouchBarSpacer`

Uma referência [`typeof TouchBarSpacer`](./touch-bar-spacer.md) à classe `TouchBarSpacer` .



#### `TouchBarOtherItemsProxy`

Uma referência [`typeof TouchBarOtherItemsProxy`](./touch-bar-other-items-proxy.md) à classe `TouchBarOtherItemsProxy` .



### Propriedades de Instância

As seguintes propriedades estão disponíveis em instâncias de `TouchBar`:



#### `touchBar.escapeItem`

Uma `TouchBarItem` que substituirá o botão "esc" na barra de toque quando estiver configurado. A configuração para `null` restaura o botão "esc" padrão. Alterar esse valor atualiza imediatamente o item de fuga na barra de toque.



## Exemplos

Abaixo está um exemplo de um simples jogo de barra de toque da máquina caça-níqueis com um botão e alguns rótulos.



```javascript
const { app, BrowserWindow, TouchBar } = require ('electron')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } = TouchBar

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
  } mais se (uniqueValues === 2) {
    // 2 valores são os mesmos
    resultado.label = '😍 Winner!'
    result.textColor = '#FDFF00'
  } else {
    // Nenhum valor é o mesmo resultado
    .label = '🙁 Spin Again'
    resultado.textColor = nulo
  }
  girando = falso
}

const touchBar = novo TouchBar({
  itens: [
    , spin, spin
    novo TouchBarSpacer({ size: 'large' }),
    bobina1,
    novo TouchBarSpacer({ size: 'small' }),
    bobina2,
    novo TouchBarSpacer({ size: 'small' }),
    bobina3,
    novo TouchBarSpacer({ size: 'large' }),
    resultado
  ]
})

deixar janela

app.whenReady().( (() = janela> {
  = nova janela BrowserWindow({
    frame : falso,
    títuloBarStyle: 'hiddenInset',
    largura: 200,
    altura: 200,
    fundoColor: '#000'
  })
  janela.loadURL('about:blank')
  window.setTouchBar (touchBar)
})
```




### Executando o exemplo acima

Para executar o exemplo acima, você precisará (assumindo que você tem um terminal aberto no diretório que você deseja executar o exemplo):

1. Salve o arquivo acima para o seu computador como `touchbar.js`
2. Instale o Electron via `npm install electron`
3. Execute o exemplo dentro de Electron: `./node_modules/.bin/electron touchbar.js`

Em seguida, você deve ver uma nova janela Electron e o aplicativo em execução em sua barra de toque (ou emulador de barra de toque).
