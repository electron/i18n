# Тестування Widevine CDM

В Electron ви можете використовувати бібліотеку Widevine CDM, відправлену за допомогою веб-переглядача Chrome.

Модулі дешифрування вмісту Widevine (CDM) розповідають про те, як сервіси трансляції захищають вміст, використовуючи HTML5 відео для веб-браузерів, не покладаючись на плагін NPAPI , такий як Flash чи Silverlight. Widevine support is an alternative solution for streaming services that currently rely on Silverlight for playback of DRM-protected video content. Це дозволить веб-сайтам показувати захищене від DRM-відео вміст у Firefox без використання плагінів NPAPI. Програма Widevine CDM працює у пісочниці з відкритим вихідним кодом забезпечує краще безпеку користувачів, ніж NPAPI плагіни.

#### Примітка про VMP

Станом на [`Electron v1.8. (Chrome v59)`](https://electronjs.org/releases#1.8.1), нижче кроки можуть бути лише деякими необхідними кроками для увімкнення Widevine; будь яке додаток увімкнено або після того, як ця версія має намір використовувати Widevine CDM може знадобитися можливо підписано з використанням ліцензії, отриманої з [Widevine](https://www.widevine.com/) самого себе.

Per [Widevine](https://www.widevine.com/):

> Chrome 59 (і пізніше) включає підтримку Verified Media Path (VMP). VMP забезпечує спосіб перевірки автентичності на платформі пристрою. Для браузеру розгортання, це дає додатковий сигнал для визначення надійної і надійної реалізації на основі браузера .
> 
> Керівництво з інтеграції проксі оновлено з інформацією про VMP і як видавати ліцензії.
> 
> Widevine recommends our browser-based integrations (vendors and browser-based applications) add support for VMP.

Для увімкнення відтворення відео з цим новим обмеженням, [castLabs](https://castlabs.com/open-source/downstream/) створив [форк](https://github.com/castlabs/electron-releases) , які реалізували необхідні зміни щоб увімкнути Widevine для відтворення в програмі Electron, якщо отримав необхідні ліцензії від widevine.

## Отримання бібліотеки

Відкрийте `chrome://components/` у браузері Chrome, знайти `модуль дешифрування вмісту Widevine` і переконатися, що він є повністю застарілим, після цього ви можете знайти файли бібліотеки з папки .

### На Windows

Файл бібліотеки `widevinecdm.dll` буде у версії `Файл Program Files(x86)/Google/Chrome/Application/CHROME_VERSION/WidevineCdm/_platform_specific/win_(x86|x64)/`директорія .

### On MacOS

The library file `libwidevinecdm.dylib` will be under `/Applications/Google Chrome.app/Contents/Versions/CHROME_VERSION/Google Chrome Framework.framework/Versions/A/Libraries/WidevineCdm/_platform_specific/mac_(x86|x64)/` directory.

**Примітка.** Переконайтеся, що версія chrome, яку використовує Electron більше або дорівнює `min_chrome_version` значення жолоба widevine cdm компонента. Значення можна знайти в каталозі `manifest.json` під `WidevineCdm`.

## Використовувати бібліотеку

Після отримання файлів з бібліотеки, ви повинні передати шлях до файлу за допомогою `--widevine-cdm-path` перемикачем командного рядка, і версія бібліотеки з `--widevine-cdm-version`. Перемикачі командного рядка мають бути прийняті до після встановлення `готової` події `додатку` модуля.

Приклад коду:

```javascript
const { app, BrowserWindow } = require('electron')

// Вам потрібно передати каталог, що містить widevine library тут, це
// * `libwidevinecm. ylib` на macOS,
// * `widevinecdm.dll` для Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevine_library')
// Версія плагіна може бути отримана з сторінки `chrome://components` в Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow()
  win.show()
})
```

## Перевірка підтримки Widevine CDM

Щоб перевірити, чи працює widevine - ви можете використовувати наступні шляхи:

* Відкрийте https://shaka player-demo.appspot.com/ і завантажте маніфест, який використовує `Widevine`.
* Відкрийте http://www.dash-player.com/demo/drm-test-area/, перевірте, чи говорить сторінка `bitdash використовує Widevine у вашому браузері`, потім програти відео.
