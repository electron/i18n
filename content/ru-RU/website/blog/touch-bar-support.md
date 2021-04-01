---
title: Поддержка Touch Bar
author: kevinsawicki
date: '2017-03-08'
---

Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) бета-версия содержит первоначальную поддержку macOS [Touch Bar](https://developer.apple.com/macos/touch-bar).

---

Новый Touch Bar API позволяет добавлять кнопки, ярлыки, всплывающие окна, цветовые палитры и слайдеры. Эти элементы могут быть динамически обновлены, и также выделяет события при взаимодействии.

Это первый релиз этого API, поэтому он будет развиваться в течение следующих нескольких релизов Electron. Пожалуйста, ознакомьтесь с информацией о выпуске для дальнейших обновлений и откройте [проблемы](https://github.com/electron/electron/issues) с любыми проблемами или недостающими функциями.

Вы можете установить эту версию через `npm установить electron@beta` и узнать больше об этом в [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) и [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Electron docs.

Большое спасибо [@MarshallOfSound](https://github.com/MarshallOfSound) за вклад в Electron. :tada:

## Пример сенсорной панели

![Сенсорная панель Gif](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Ниже приведен пример создания простого игрового автомата в сенсорной панели. Он демонстрирует, как создать панель инструментов, стилировать предметы, связать их с окном , кнопка щелкните на событиях и динамически обновите метки.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new TouchBarLabel()
const reel3 = new TouchBarLabel()

// Спин result label
const result = new TouchBarLabel()

// Кнопка Spin
const spin = new TouchBarButton({
  label: '🎰 Spin',
  цвет фона: '#7851A9',
  клик: () => {
    // Игнорировать клики при уже вращении
    if (spinning) {
      return
    }

    spinning = true
    результат. abel = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 4 секунды
    const startTime = Date. ow()

    const spinReels = () => {
      updateReels()

      if ((Date. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Замедляем немного на каждом вращении
        timeout *= 1. setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

const getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  возвращаемых значений[Math. loor(Math.random() * values.length)]
}

const updateReels = () => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin = () => {
  const uniqueValues = new Set([reel1. abel, reel2.label, reel3.label]). ize
  if (uniqueValues === 1) {
    // Все 3 значения являются тем же
    результатом. abel = '💰 Jackpot!'
    result.textColor = '#FDFF00'
  } else if (uniqueValues === 2) {
    // 2 values are the same
    result.label = '😍 Winner!'
    extColor = '#FDFF00'
  } else {
    // Нет одинаковых значений
    результата. abel = '🙁 Spin Again'
    result. extColor = null
  }
  вращение = false
}

const touchbar = new TouchBar([
  вращения,
  новый TouchBarSpacer({size: 'large'}),
  reel1,
  новый TouchBarSpacer({size: 'small'}),
  reel2,
  новый TouchBarSpacer({size: 'small'}),
  reel3,
  нового TouchBarSpacer({size: 'large'}),
  результат
])

пустое окно

. nce('ready', () => {
  window = new BrowserWindow({
    frame: false,
    titleBarStyle: 'hidden-inset',
    ширина: 200,
    высота: 200,
    цвет фона: '#000'
  })
  окно. oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

