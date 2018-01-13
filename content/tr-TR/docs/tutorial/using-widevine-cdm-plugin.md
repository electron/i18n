# Widevine CDM Eklentisini Kullanma

Electron'da Chrome tarayıcısına yüklenmiş Widevine CDM eklentisini kullanabilirsiniz.

## Eklenti edin

Electron, lisans nedeni ile Widevine CDM eklentisiyle birlikte gönderilmez, bunu elde etmek için kullandığınız Electron yapısının mimari ve Chrome sürümüyle eşleşen resmi Chrome tarayıcısını ilk önce yüklemeniz gerekir.

**Not:** Chrome tarayıcısının ana sürümü, Electron'un kullandığı Chrome sürümü ile aynı olmalıdır; aksi takdirde, `navigator.plugins` yüklendiğini gösterse bile eklenti çalışmayacaktır.

### Windows & macOS

Chrome tarayıcısında `chrome://components/`'i açın, `WidevineCdm`'yi bulun ve güncel olduğundan emin olun, ardından tüm eklenti ikililiklerini`APP_DATA/Google/Chrome/WidevineCDM/VERSION/_platform_specific/PLATFORM_ARCH/`dizininden bulabilirsiniz.

`APP_DATA` uygulama verilerini depolamak için sistemin bulunduğu konumdur. Windows' ta `%LOCALAPPDATA%`, on macOS it is `~/Library/Application Support`. `VERSION` is Widevine CDM eklentisinin sürüm dizesi, `1.4.8.866` gibi. `PLATFORM` is `mac` or `win`. `ARCH` is `x86` or `x64`.

Windows'ta gerekli ikili dosyalar `widevinecdm.dll` ve `widevinecdmadapter.dll`, macOS'da `libwidevinecdm.dylib` ve `widevinecdmadapter.plugin`'dir. Onları istediğiniz bir yerde kopyalayabilirsiniz fakat bir araya getirilmeleri gerekmektedir.

### Linux

Linux'ta eklenti ikili dosyaları Chrome tarayıcısı ile birlikte gönderilir, dosya adı `libwidevinecdm.so` ve `libwidevinecdmadapter.so` bunları `/opt/google/chrome` altında bulabilirsiniz.

## Eklenti kullanılıyor

Eklenti dosyalarını aldıktan sonra, `widevinecdmadapter`'ın yolunu `--widevine-cdm-path` komut satırı anahtarına geçirmeli ve eklentinin versiyonunu `--widevine-cdm-version`'a geçirmelisiniz.

**Note:** Though only the `widevinecdmadapter` binary is passed to Electron, the `widevinecdm` binary has to be put aside it.

Komut satırı anahtarları, `app` modülünün `ready` olayının yayımlanmasından önce geçirilmelidir ve bu eklentiyi kullanan sayfanın eklentisi etkinleştirilmiş olmalıdır.

Kod orneği:

```javascript
const {app, BrowserWindow} = require('electron')

// You have to pass the filename of `widevinecdmadapter` here, it is
// * `widevinecdmadapter.plugin` on macOS,
// * `libwidevinecdmadapter.so` on Linux,
// * `widevinecdmadapter.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// The version of plugin can be got from `chrome://plugins` page in Chrome.
app.commandLine.appendSwitch('widevine-cdm-version', '1.4.8.866')

let win = null
app.on('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      // `Eklentiler` etkinleştirilmelidir.
      plugins: true
    }
  })
  win.show()
})
```

## Eklenti doğrulanıyor

Eklentinin çalışıp çalışmadığını doğrulamak adına aşağıda bulunan adımları takip edebilirsiniz:

* Open devtools and check whether `navigator.plugins` includes the Widevine CDM plugin.
* Open https://shaka-player-demo.appspot.com/ and load a manifest that uses `Widevine`.
* Open http://www.dash-player.com/demo/drm-test-area/, check whether the page says `bitdash uses Widevine in your browser`, then play the video.