# Widevine CDM Eklentisini Kullanma

Electron'da Chrome tarayıcısına yüklenmiş Widevine CDM eklentisini kullanabilirsiniz.

## Eklenti edin

Electron, lisans nedeni ile Widevine CDM eklentisiyle birlikte gönderilmez, bunu elde etmek için kullandığınız Electron yapısının mimari ve Chrome sürümüyle eşleşen resmi Chrome tarayıcısını ilk önce yüklemeniz gerekir.

**Not:** Chrome tarayıcısının ana sürümü, Electron'un kullandığı Chrome sürümü ile aynı olmalıdır; aksi takdirde, `navigator.plugins` yüklendiğini gösterse bile eklenti çalışmayacaktır.

### Windows & macOS

Open `chrome://components/` in Chrome browser, find `WidevineCdm` and make sure it is up to date, then you can find all the plugin binaries from the `Program Files(x86)/Google/Chrome/Application/VERSION/WidevineCDM/_platform_specific/PLATFORM_ARCH/` directory.

`APP_DATA` uygulama verilerini depolamak için sistemin bulunduğu konumdur. Windows' ta `%LOCALAPPDATA%`, on macOS it is `~/Library/Application Support`. `VERSION` is Widevine CDM eklentisinin sürüm dizesi, `1.4.8.866` gibi. `PLATFORM` is `mac` or `win`. `ARCH` is `x86` or `x64`.

Windows'ta gerekli ikili dosyalar `widevinecdm.dll` ve `widevinecdmadapter.dll`, macOS'da `libwidevinecdm.dylib` ve `widevinecdmadapter.plugin`'dir. Onları istediğiniz bir yerde kopyalayabilirsiniz fakat bir araya getirilmeleri gerekmektedir.

### Linux

Linux'ta eklenti ikili dosyaları Chrome tarayıcısı ile birlikte gönderilir, dosya adı `libwidevinecdm.so` ve `libwidevinecdmadapter.so` bunları `/opt/google/chrome` altında bulabilirsiniz.

## Eklenti kullanılıyor

Eklenti dosyalarını aldıktan sonra, `widevinecdmadapter`'ın yolunu `--widevine-cdm-path` komut satırı anahtarına geçirmeli ve eklentinin versiyonunu `--widevine-cdm-version`'a geçirmelisiniz.

**Note:** sadece `widevinecdmadapter` iki değeri elektrona geçmesine rağmen, `widevinecdm` ikili değerinin bir kenara bırakılması gerekir.

Komut satırı anahtarları, `app` modülünün `ready` olayının yayımlanmasından önce geçirilmelidir ve bu eklentiyi kullanan sayfanın eklentisi etkinleştirilmiş olmalıdır.

Kod orneği:

```javascript
const {app, BrowserWindow} = require('electron')

// Burada `widevinecdmadapter` dosya adını iletmek zorundasınız
// * `widevinecdmadapter.plugin` on macOS,
// * `libwidevinecdmadapter.so` on Linux,
// * `widevinecdmadapter.dll` on Windows.
app.commandLine.appendSwitch('widevine-cdm-path', '/path/to/widevinecdmadapter.plugin')
// Eklenti sürümü Chrome' un `chrome://plugins` sayfasından edinilebilir.
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

* Devtools' ı açın ve `navigator.plugins` Widevine CDM eklentisini içerip içermediğini kontrol edin.
* Https://shaka-player-demo.appspot.com/ adresini açın ve `Widevine` kodunu kullanan bir komut ekleyin.
* Http://www.dash-player.com/demo/drm-test-area/ sayfasın açın, Sayfanın `bitdash uses Widevine in your browser` komutunu verip vermediğini kontrol edin, ardından videoyu oynatın.