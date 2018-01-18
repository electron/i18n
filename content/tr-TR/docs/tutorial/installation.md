# Kurulum

> Electron'u yüklemek için ipuçları

Önceden yapılandırılmış Electron ikilileri, kullan [`npm`](https://docs.npmjs.com/). Tercih edilen Electronu geliştirme özgürlüğüyle sizin için kurmaktır:

```sh
npm yükle electron --kaydet-dev
```

Electron versiyon dökümanını [Gör](electron-versioning.md) Electron versiyonlarını nasıl yöneteceğinizin bilgisi uygulamanızda.

## Genel kurulum

`electron` komutunu genel `$PATH` 'nıza da yükleyebilirsiniz:

```sh
npm yükle electron -g
```

## Özelleştirme

Eğer bu makinedeki yüklenen mimariyi değiştirmek istiyorsanız (örneğin. `ia32` bir `x64` makinede), `--arch` kullanabilirsin npm yükle ile birlikte ayarla `npm_ayar_arch` çevre değeri ile:

```shell
npm yükle --arch=ia32 electron
```

Mimariyi değiştirmenin yanında platformu da belirleyebilirsiniz. `--platform` bayrağını kullanarak (örneğin, `win32`, `linux`, ve başka):

```shell
npm yükle --platform=win32 electron
```

## Vekil sunucular

Bir vekil sunucu kullanmaya ihtiyacınız varsa [ bu çevre değişkenleri ayarlayabilirsiniz](https://github.com/request/request/tree/f0c4ec061141051988d1216c24936ad2e7d5c45d#controlling-proxy-behaviour-using-environment-variables).

## Arıza giderme

`npm yükle electron` bazen çalıştırılırken bazı kullanıcılar hatayla karşılaşmaktadırlar.

Genelde bütün durumlarda bu hatalar, ağ sorunları ve `electron` npm paketi ile ilişkili olmayan hatalar sonucudur. `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, ve `ETIMEDOUT` gibi hatalar, ağ bağıntı hatalarının belirtisidir. Ağ ayarlarını değiştirmek ya da biraz bekleyip tekrar kurmayı denemek en iyi çözümdür.

Eğer `npm` ile yükleme başarısız oluyorsa, Electron'u doğrudan [electron/electron/releases](https://github.com/electron/electron/releases) ' den indirebilirsiniz.

Yükleme `EACCESS` ile başarısız oluyorsa [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions) gerekebilir.

Üstteki devam ediyorsa, [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) bayrağının Doğru olarak ayarlanması gerekebilir:

```sh
sudo npm install electron --unsafe-perm= doğru
```

İnternet erişiminiz yavaşsa `--verbose` indirme sürecinizde tavsiye edilir:

```sh
npm yükle --verbose electron
```

SHASUM ve öğeyi yeniden indirmeye zorlamak istiyorsanız `force_no_cache` değişkenini `true` olarak ayarlayın.