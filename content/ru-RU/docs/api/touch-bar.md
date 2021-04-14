## Класс: TouchBar

> Создание макетов TouchBar для родных приложений macOS

Процесс: [Основной](../glossary.md#main-process)

### `новый TouchBar (варианты)`

* `options` Object
  * `items` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md)) (по желанию)
  * `escapeItem` ([TouchBarButton](touch-bar-button.md) | [TouchBarColorPicker](touch-bar-color-picker.md) | [TouchBarGroup](touch-bar-group.md) | [TouchBarLabel](touch-bar-label.md) | [TouchBarPopover](touch-bar-popover.md) | [TouchBarScrubber](touch-bar-scrubber.md) | [TouchBarSegmentedControl](touch-bar-segmented-control.md) | [TouchBarSlider](touch-bar-slider.md) | [TouchBarSpacer](touch-bar-spacer.md) | null) (необязательно)

Создает новую сенсорную планку с указанными элементами. Используйте `BrowserWindow.setTouchBar` , чтобы добавить `TouchBar` в окно.

**Примечание:** TouchBar API в настоящее время является экспериментальным и может быть изменен или удален в будущих версиях Electron.

**Совет:** Если у вас нет MacBook с touch Bar, вы можете использовать [Touch Bar Simulator](https://github.com/sindresorhus/touch-bar-simulator) для проверки использования Touch Bar в приложении.

### Статические свойства

#### `TouchBarButton`

Ссылка [`typeof TouchBarButton`](./touch-bar-button.md) на класс `TouchBarButton` .

#### `TouchBarColorPicker`

Ссылка [`typeof TouchBarColorPicker`](./touch-bar-color-picker.md) на класс `TouchBarColorPicker` .

#### `TouchBarGroup`

Ссылка [`typeof TouchBarGroup`](./touch-bar-group.md) на класс `TouchBarGroup` .

#### `TouchBarLabel`

Ссылка [`typeof TouchBarLabel`](./touch-bar-label.md) на класс `TouchBarLabel` .

#### `TouchBarПоповер`

Ссылка [`typeof TouchBarPopover`](./touch-bar-popover.md) на класс `TouchBarPopover` .

#### `TouchBarScrubber`

Ссылка [`typeof TouchBarScrubber`](./touch-bar-scrubber.md) на класс `TouchBarScrubber` .

#### `TouchBarSegmentedControl`

Ссылка [`typeof TouchBarSegmentedControl`](./touch-bar-segmented-control.md) на класс `TouchBarSegmentedControl` .

#### `TouchBarSlider`

Ссылка [`typeof TouchBarSlider`](./touch-bar-slider.md) на класс `TouchBarSlider` .

#### `TouchBarSpacer`

Ссылка [`typeof TouchBarSpacer`](./touch-bar-spacer.md) на класс `TouchBarSpacer` .

#### `TouchBarOtherItemsПрокси`

Ссылка [`typeof TouchBarOtherItemsProxy`](./touch-bar-other-items-proxy.md) на класс `TouchBarOtherItemsProxy` .

### Свойства экземпляра

Следующие свойства доступны на экземплярах `TouchBar`:

#### `touchBar.escapeItem`

Набор `TouchBarItem` который заменит кнопку "esc" на сенсорной панели при наборе. Настройка для `null` восстанавливает кнопку "esc" по умолчанию. Изменение этого значения немедленно обновляет элемент побега в сенсорной панели.

## Примеры

Ниже приведен пример простой игровой автомат сенсорный бар игры с кнопкой некоторые этикетки.

```javascript
const { app, BrowserWindow, TouchBar } - требуют ('электрон')

const { TouchBarLabel, TouchBarButton, TouchBarSpacer } - TouchBar

пусть спиннинг - ложные

// Катушка этикетки
const reel1 - новый TouchBarLabel ()
const reel2 - новый TouchBarLabel ()
const reel3 TouchBarLabel ()

// Спиновая метка результатов
конст-результат - новый TouchBarLabel ()

// Кнопка спина
конст спина - новый TouchBarButton (яп.
  метка: '🎰 Spin',
  backgroundColor: '#7851A9',
  клик: ()> -
    // Игнорировать клики, если уже спиннинг
    если (спиннинг) {
      return
    }

    спиннинг - истинный
    result.label - ''

    пусть тайм-аут - 10
    const spinLength - 4 и 100 0 // 4 секунды
    const startTime - Date.now ()

    const spinReels () -> -
      updateReels ()

      если ((Date.now)) - startTime) >- spinLength) -
        finishSpin ()
      -
        // Замедление немного на каждом спину
        тайм-аут - 1,1
        setTimeout (spinReels, тайм-аут)
      -
    -

    spinReels ()

)

const getRandomValue () -> ,
  const values - "🍒", "💎", "7️", "🍊", "🔔". '⭐', '🍇', '🍀''
  значения возврата (Math.random() - значения.длина)"
-

const updateReels () ->
  reel1.label - getRandomValue()
  reel2.label - getRandomValue ()
  reel3.label.домВалю ()
-

конст отделкаSpin ()>
  конст уникальныйВью - новый набор ("reel1.label, reel2.label, reel3.label"). размер
  если (уникальныеValues No 1) -
    // Все 3 значения одинаковые
    result.label - "💰 Jackpot!".
    result.textColor - '#FDFF00'
  - еще если (уникальныеValues No 2) -
    // 2 значения одинаковы
    result.label и "😍 Winner!"
    result.textColor - '#FDFF00'
  - else -
    // Нет значений одинаковы
    result.label - '🙁 Spin Again'
    result.textColor - null
  -
  спиннинг -
    ложный
-

const touchBar - новый TouchBar ( )
  элементы:
    TouchBarSpacer ({ size: 'large' }),
    reel1,
    TouchBarSpacer ({ size: 'small' }),
    reel2,
    TouchBarSpacer ({ size: 'small' }),
    reel3,
    новый TouchBarSpacer ({ size: 'large' }),
    результат
  -
)

пусть окно

app.whenReady ()...,
    >
  : ложное,
    titleBarStyle: 'hiddenInset', ширина
    : 200, высота
    : 200,
    backgroundColor: '#000'
  )
  window.loadURL ('about:blank')
  window.setTouchBar (touchBar)
)
```

### Запуск приведенного выше примера

Чтобы выработать приведенную выше примеру, необходимо (при условии, что в каталоге открыт терминал, который вы хотите запустить пример):

1. Сохраните вышеуказанный файл на компьютере в `touchbar.js`
2. Установка Electron через `npm install electron`
3. Вы запустите пример внутри Electron: `./node_modules/.bin/electron touchbar.js`

Затем вы должны увидеть новое окно Electron и приложение, запущенное в сенсорной панели (или эмулятор сенсорной панели).
