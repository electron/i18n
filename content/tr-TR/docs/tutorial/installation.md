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

In almost all cases, these errors are the result of network problems and not actual issues with the `electron` npm package. Errors like `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, and `ETIMEDOUT` are all indications of such network problems. The best resolution is to try switching networks, or just wait a bit and try installing again.

You can also attempt to download Electron directly from [electron/electron/releases](https://github.com/electron/electron/releases) if installing via `npm` is failing.

If installation fails with an `EACCESS` error you may need to [fix your npm permissions](https://docs.npmjs.com/getting-started/fixing-npm-permissions).

If the above error persists, the [unsafe-perm](https://docs.npmjs.com/misc/config#unsafe-perm) flag may need to be set to true:

```sh
sudo npm install electron --unsafe-perm=true
```

On slower networks, it may be advisable to use the `--verbose` flag in order to show download progress:

```sh
npm install --verbose electron
```

If you need to force a re-download of the asset and the SHASUM file set the `force_no_cache` enviroment variable to `true`.