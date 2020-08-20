# Отладка главного процесса

DevTools, который открывается в окне браузера может отлаживать только тот JavaScript, который выполняется в этом окне (т.е. веб-страницы). Для отладки кода основного процесса вам нужно будет использовать внешний отладчик и запускать Electron с ключом `--inspect` или `--inspect-brk`.

## Параметры командной строки

Для отладки основного процесса используйте один из следующих параметров командной строки:

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 ваше/приложение
```

### `--inspect-brk=[port]`

Работает так же, как `--inspect`, но останавливает выполнение в первой строке JavaScript.

## Внешние отладчики

Вам нужно будет использовать отладчик, поддерживающий протокол инспектора V8.

- Откройте `chrome://inspect` в Chrome и выберите для проверки запущенное приложение Electron.
- [Отладка главного процесса в VSCode](debugging-main-process-vscode.md)
