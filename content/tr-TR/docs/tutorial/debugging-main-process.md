# Ana İşlem Hata Ayıklama

Bir Electron tarayıcı penceresinde DevTools sadece o pencereden (yani web sayfaları) yürütülen JavaScript ile hataları düzeltebilirsiniz. Ana işlemde çalıştırılan JavaScript'te hata ayıklamak için harici bir hata ayıklayıcı kullanmanız gerekir ve `--inspect` ya da `--inspect-brk` kodları ile Electron'u başlatmanız gerekir.

## Komut satırı anahtarları

Ana hata ayıklamasını etkinleştirmek için aşağıdaki komut satırı anahtarlarından birini kullanın:

### `--inspect=[port]`

Elektron, belirtilen ` port </ 0> V8 denetçi protokolü mesajlarını dinleyecek, harici bir hata ayıklayıcı bu porta bağlanmalıdır. Varsayılan <code> port</ 0><code> 5858 </ 0>.</p>

<pre><code class="shell">electron --inspect=5858 uygu/laman
`</pre> 

### `--inspect-brk=[port]`

`--Inspect` gibi ama JavaScript'in ilk satırında çalıştırmayı durdurur.

## Harici hata ayıklayıcıları

V8 denetçi protokolünü destekleyen bir hata ayıklayıcı kullanmanız gerekecektir.

- `chrome://inspect` burayı ziyaret ederek chroma baglanmayı seçin ve piyasaya sürülen Electron uygulamasını inceleyin.
- [VSCode da ki Ana Sürecin Hata Ayıklaması](debugging-main-process-vscode.md)