# Ana İşlem Hata Ayıklama

Bir Elektron tarayıcı penceresinde DevTools sadece o pencerede (yani web sayfaları) yürütülen JavaScript ile hataları düzeltebilirsiniz. To debug JavaScript that's executed in the main process you will need to use an external debugger and launch Electron with the `--inspect` or `--inspect-brk` switch.

## Komut satırı anahtarları

Ana hata ayıklamasını etkinleştirmek için aşağıdaki komut satırı anahtarlarından birini kullanın:

### `--inspect=[port]`

Electron will listen for V8 inspector protocol messages on the specified `port`, an external debugger will need to connect on this port. The default `port` is `5858`.

```shell
electron --inspect=5858 uygu/laman
```

### `--inspect-brk=[port]`

Like `--inspect` but pauses execution on the first line of JavaScript.

## Harici hata ayıklayıcıları

V8 denetçi protokolünü destekleyen bir hata ayıklayıcı kullanmanız gerekecektir.

- `chrome://inspect` burayı ziyaret ederek chroma baglanmayı seçin ve piyasaya sürülen Electron uygulamasını inceleyin.
- [VSCode da ki Ana Sürecin Hata Ayıklaması](debugging-main-process-vscode.md)