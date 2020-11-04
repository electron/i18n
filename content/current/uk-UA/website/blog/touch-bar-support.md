---
title: Підтримка Touch Bar
author: kevinsawicki
date: '2017-03-08'
---

Бета-реліз Electron [1.6.3](https://github.com/electron/electron/releases/tag/v1.6.3) містить початкову підтримку macOS [Touch Bar](https://developer.apple.com/macos/touch-bar).

---

Новий сенсорний рядок API дозволяє додавати кнопки, мітки, спливаючі вікна, колір тих, повзунків і пробілів. Ці елементи можуть бути динамічно оновлені і і також випромінювати події під час їх взаємодії.

Це перша версія цього API, тому він буде розвиватися над наступними кількома релізами Electron. Будь ласка, перевірте примітки до випуску для подальших оновлень і відкрийте [задачі](https://github.com/electron/electron/issues) з будь-якими проблемами чи відсутню функціональність.

Ви можете встановити цю версію за допомогою `npm встановити electron@beta` і дізнатися більше про це в [TouchBar](https://github.com/electron/electron/blob/master/docs/api/touch-bar.md) і [BrowserWindow](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#winsettouchbartouchbar-macos) Документації Electron.

Велика подяка [@MarshallOfSound](https://github.com/MarshallOfSound) за сприяння цьому Electron. :tada:

## Приклад панелі дотику

![Натискання на панель навігації](https://cloud.githubusercontent.com/assets/671378/23723516/5ff1774c-03fe-11e7-97b8-c693a0004dc8.gif)

Нижче наводиться приклад створення простої гри для ігрової машини на сенсорній панелі. Це демонструє, як створити сенсорну панель, стилізувати елементи, асоціювати її за допомогою вікна , обробляти події натисненням на кнопку і оновлювати мітки динамічно.

```js
const {app, BrowserWindow, TouchBar} = require('electron')

const {TouchBarButton, TouchBarLabel, TouchBarSpacer} = TouchBar

let spinning = false

// Reel labels
const reel1 = new TouchBarLabel()
const reel2 = new BarLabel()
const reel3 = new TouchBarLabel()

// Spin result
const result = new BarLabel()

// Spin button
const spst in = new TouchBarButton({
  'label:slot_e: Spin', machinin',
  фоновий колір: '#7851A9',
  клацання: () => {
    // Ігноруйте кліки, якщо вже обертаються
    , якщо (шпигунування) {
      return
    }

    обертається = true
    результат. abel = ''

    let timeout = 10
    const spinLength = 4 * 1000 // 1000 // 4 секунди
    const startTime = Date. ow()

    const spinReels = () => {
      updateReels()

      якщо ((Date. ow() - startTime) >= spinLength) {
        finishSpin()
      } else {
        // Повільне зниження трохи відносно кожного Spin
        timeout *= 1.
        setTimeout(spinReels, timeout)
      }
    }

    spinReels()
  }
})

конст getRandomValue = () => {
  const values = ['🍒', '💎', '7️⃣', '🍊', '🔔', '⭐', '🍇', '🍀']
  повертає числа[Math. loor(Math.random() * values.length)]
}

const updateReels => {
  reel1. abel = getRandomValue()
  reel2.label = getRandomValue()
  reel3. abel = getRandomValue()
}

const finishSpin => {
  const uniqueValues = new Set([reel1. абелем, reel2.label, reel3.label]). змініть
  якщо (uniqueValues === 1) {
    // Всі 3 значення однакові
    результатів. abel = '💰 Джекпот!'
    результат. extColor = '#FDFF00'
  } else якщо (uniqueValues === 2) {
    // 2 значення мають однаковий
    результат. abel = '😍 Переможець!'
    результат. extColor = '#FDFF00'
  } else {
    // Ніяких значень не є одним
    результатом. abel = '🙁 поверніть знову'
    результат. extColor = null
  }
  обертінг = false
}

const touchBar = new TouchBar([
  spin,
  новий TouchBarSpacer({size: 'large'}),
  reel1,
  нові TouchBarSpacer({size: 'small'}),
  reel2,
  new TouchBarSpacer({size: 'small'}),
  reel3,
  нових TouchBarSpacer({size: 'large'}),
  результат
])

видає вікно

програм. nce('ready', () => {
  вікно = new BrowserWindow({
    кадрів: false,
    titleBarStyle: 'hidden-inset',
    ширина: 200,
    висот: 200,
    фоновий колір: '#000'
  })
  вікно. oadURL('about:blank')
  window.setTouchBar(touchBar)
})
```

