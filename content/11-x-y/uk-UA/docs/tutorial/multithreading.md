# Багатонитевість

With [Web Workers][web-workers], it is possible to run JavaScript in OS-level threads.

## Багатопотоковий Node.js

Можно використовувати Node. s функції в Веб-Workers Electron, щоб зробити так `nodeIntegrationInWorker` параметр повинен бути встановлений на `true` в `webPreferences`.

```javascript
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

`nodeIntegrationInWorker` може бути використаний незалежно від `nodeIntegration`, але `пісочниці` не може бути встановлено `true`.

## Доступні API

Усі вбудовані модулі Node.js підтримуються у Web Workers і `asar` архіви все ще можуть прочитати з Node.js APIs. Однак, жоден з Electron не може бути використаний в багатопотоковому оточенні.

## Нативні модулі Node.js

Будь-який рідний модуль Node.js може бути завантажений безпосередньо у Web Workers, але це наполегливо рекомендується цього не робити. Більшість існуючих модулів було написано на основі однопотокового середовища, використовуючи їх у Web Workers призведе до збоїв і пошкодження в пам'яті.

Зауважте, якщо є рідний вузол. s module є потоком читчитання-безпечного досі завантажити його в Веб-Worker, оскільки `процес. функція lopen` не є потоком безпечною.

Єдиний спосіб зараз завантажити вбудований модуль, щоб переконатися, що програма не завантажує рідні модулі після початку роботи Веб Workers.

```javascript
process.dlopen = () => {
  throw new Error('Завантажити стандартний модуль не безпечний')

const worker = new Worker('script.js')
```

[web-workers]: https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers
