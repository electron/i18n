# net

> Выполнение HTTP/HTTPS запросов с использованием родной сетевой библиотеки Chromium

Процесс: [Главный](../glossary.md#main-process)

Модуль `net` представляет собой клиентский API для выдачи HTTP(S) запросов. Он похож на модули [HTTP](https://nodejs.org/api/http.html) и [HTTPS](https://nodejs.org/api/https.html) в Node.js, но использует собственную сетевую библиотеку Chromium вместо реализации Node.js, обеспечивая лучшую поддержку веб-прокси.

Ниже приведен неполный список причин, по которым вы можете рассмотреть использование модуля `net` вместо собственных модулей Node.js:

* Автоматическое управление конфигурацией прокси системы, поддержка протокола wpad и файлов pac конфигурации прокси.
* Автоматическое туннелирование HTTPS запросов.
* Поддержка аутентификации прокси с помощью BASIC, DIGEST, NTLM, KERBEROS или NEGOTIATE схем аутентификации.
* Поддержка прокси-серверов для мониторинга трафика: Fiddler-подобные прокси, используемые для контроля доступа и мониторинга.

Компоненты API (включая классы, методы, свойства и имена событий) похожи на компоненты, используемые в Node.js.

Пример использования:

```javascript
const { app } = require('electron')
app.on('ready', () => {
  const { net } = require('electron')
  const request = net.request('https://github.com')
  request.on('response', (response) => {
    console.log(`STATUS: ${response.statusCode}`)
    console.log(`HEADERS: ${JSON.stringify(response.headers)}`)
    response.on('data', (chunk) => {
      console.log(`BODY: ${chunk}`)
    })
    response.on('end', () => {
      console.log('No more data in response.')
    })
  })
  request.end()
})
```

The `net` API can be used only after the application emits the `ready` event. Trying to use the module before the `ready` event will throw an error.

## Методы

Модуль `net` имеет следующие методы:

### `net.request(options)`

* `options` (ClientRequestConstructorOptions | String) - Параметры конструктора `ClientRequest`.

Возвращает [`ClientRequest`](./client-request.md)

Создает экземпляр [`ClientRequest`](./client-request.md), используя предоставленные `options`, которые напрямую передаются конструктору `ClientRequest`. Метод `net.request` будет использован для выполнения как безопасных, так и небезопасных HTTP-запросов в соответствии со схемой указанного протокола в объекте `options`.
