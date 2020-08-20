# Chromium yükseltiliyor

Bu adımlar Electron'un Chromium 'u yükseltmek için gerekli genel taslağıdır.

- libcc ürününü yeni bir Chromium sürümüne yükseltin
- Electron kodunu yeni libcc ile uyumlu hale getirin
- Gerekirse Electron bağımlılıklarını (crashpad, NodeJS, etc.) Güncelleyin
- Libcc ve electronun iç yapılarını oluşturun
- Gerekirse Electron dokümanlarını güncelleyin


## `libcc` ürünü yeni bir Chromium sürümüne yükseltin

1. Kodu alın ve projeyi başlatın:
  ```sh
  $ git clone git@github.com:electron/libchromiumcontent.git
  $ cd libchromiumcontent
  $ ./script/bootstrap -v
  ```
2. Chromium anlık görüntüsünü güncelle
  - Choose a version number from [OmahaProxy](https://omahaproxy.appspot.com/) and update the `VERSION` file with it
    - Bu, tarayıcıda manuel olarak OmahaProxy'yi ziyaret ederek veya otomatik olarak yapılabilir:
    - En son kararlı mac sürümü için: `curl -so- https://omahaproxy.appspot.com/mac > VERSION`
    - En yeni win64 beta sürümü için: `curl -so- https://omahaproxy.appspot.com/all | grep "win64,beta" | awk -F, 'NR==1{print $3}' > VERSION`
  - run `$ ./script/update`
    - Biraz çay demleyin -- bu yaklaşık 30dk yada daha fazla sürebilir.
    - Bu büyük ihtimalle ek paketler uygulanırken başarısız olacak.
3. Klasör`*.patch` files in the `patches/` and `patches-mas/` düzenleme.
4. (Optional) `script/update` applies patches, but if multiple tries are needed you can manually run the same script that `update` calls: `$ ./script/apply-patches`
  - There is a second script, `script/patch.py` that may be useful. Read `./script/patch.py -h` for more information.
5. Tüm yamalar hatasız uygulandığında derlemeyi çalıştırın
  - `$ ./script/build`
  - If some patches are no longer compatible with the Chromium code, fix compilation errors.
6. When the build succeeds, create a `dist` for Electron
  - `$ ./script/create-dist --no_zip`
    - It will create a `dist/main` folder in the libcc repo's root. You will need this to build Electron.
7. (Optional) Update script contents if there are errors resulting from files that were removed or renamed. (`--no_zip` prevents script from create `dist` archives. Bunlar gerekmez.)


## Electron kodunu güncelleyin

1. Kod al:
  ```sh
  $ git clone git@github.com:electron/electron.git
  $ cd electron
  ```
2. If you have libcc built on your machine in its own repo, tell Electron to use it:
  ```sh
  $ ./script/bootstrap.py -v \
    --libcc_source_path <libcc_folder>/src \
    --libcc_shared_library_path <libcc_folder>/shared_library \
    --libcc_static_library_path <libcc_folder>/static_library
  ```
3. If you haven't yet built libcc but it's already supposed to be upgraded to a new Chromium, bootstrap Electron as usual `$ ./script/bootstrap.py -v`
  - Libcc alt modülünün(`vendor/libchromiumcontent`) işaret ettiğinden emin olun doğru revizyon

4. Set `CLANG_REVISION` in `script/update-clang.sh` to match the version Chromium is using.
  - Konumlanmış `electron/libchromiumcontent/src/tools/clang/scripts/update.py`

5. Chromium kontrolü henüz yapmadıysanız:
  - https://chromium.googlesource.com/chromium/src.git/+/{VERSION}/tools/clang/scripts/update.py
    - (Yukarıdaki url'de ` {VERSION} ` yer tutucusunu Chromium ile değiştirin sürüm libcc kullanır.)
6. Electron kurmak.
  - Önce hata yakalama sürümünü oluşturmayı deneyin: `$ ./script/build.py -c D`
  - Testleri çalıştırmak için ihtiyacınız olacak
7. Derleme ve bağlantı hatalarını düzeltme
8. Serbest bırakma derlemesininde oluşturulabileceğinden emin olun
  - `$ ./script/build.py -c R`
  - Sürüm oluşturmak sıkça düzeltmeniz gereken birbirine bağlantılı farklı hatalar meydana getirir.
  - Bazı tamamlamalar ve zincirleme hatalar libcc `dist`deki kayıp kaynak/nesne dosyası eksikliğinden kaynaklanır
9. libcc reposunun içindeki `./script/create-dist`'i güncelleyin, `dist`'i yeniden yaratın ve Electron bootstrap komutunu yeniden çalıştırın.

### Derleme hatalarını düzeltmek için ipuçları
- Önce yapılandırma hatalarını düzelt
- Önemli hataları düzelttin, eksik dosya ve derleyici ile ilgili hataları bayrakla veya tanımla
- Karmaşık hataları mümkün olan en kısa sürede saptamaya çalışın.
  - Onları nasıl düzelteceğinizden emin değilseniz yardım isteyin
- Tüm Electron özelliklerini devre dışı bırakın, yapıyı düzeltin, sonra özellikleri tek tek etkinleştirin
- Oluşturma zamanında özellikleri devre dışı bırakmak için daha fazla yapı bayrağı ekleyin.

When a Debug build of Electron succeeds, run the tests: `$ npm run test` Fix the failing tests.

Desteklenen tüm platformlarda Electron kodunu düzeltmek için yukarıdaki adımları izleyin.


## Hata yolu güncelleştiriliyor

Hata yolu ile ilgili herhangi bir derleme hatası varsa, muhtemelen ayrılmayı yeni bir revizyonla güncellemeniz gerekir. See [Upgrading Crashpad](upgrading-crashpad.md) for instructions on how to do that.


## NodeJS güncelleniyor

Upgrade `vendor/node` to the Node release that corresponds to the v8 version used in the new Chromium release. See the v8 versions in Node on

Bununla ilgili bilgiler için [Upgrading Node](upgrading-node.md) ' a bakın.

## Ffmpeg desteği doğrulama

Electron, varsayılan olarak özel codec bileşenlerini içeren `ffmpeg` sürümü ile birlikte gelir. Codec bileşenleri olmadan her sürümle birlikte dağıtılan bir sürüm insa edilmiştir. Her Chrome yükseltmesi halen desteklenmekte olan versiyonu değiştirdiğini doğrulamalıdır.

Sıradaki sayfayı yükleyerek çoklu `ffmpeg` yapıları için Electron desteğinini doğrulayabilirsin. Electron ile dağıtılan varsayılan `ffmpeg` kütüphanesi ile çalışmalıdır ve özel codec olmadan oluşturulmuş `ffmpeg` kütüphanesi ile çalışmamalıdır.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Proprietary Codec Check</title>
  </head>
  <body>
    <p>Checking if Electron is using proprietary codecs by loading video from http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4</p>
    <p id="outcome"></p>
    <video style="display:none" src="http://www.quirksmode.org/html5/videos/big_buck_bunny.mp4" autoplay></video>
    <script>
      const video = document.querySelector('video')
      video.addEventListener('error', ({ target }) => {
        if (target.error.code === target.error.MEDIA_ERR_SRC_NOT_SUPPORTED) {
          document.querySelector('#outcome').textContent = 'Not using proprietary codecs, video emitted source not supported error event.'
        } else {
          document.querySelector('#outcome').textContent = `Unexpected error: ${target.error.code}`
        }
      })
      video.addEventListener('playing', () => {
        document.querySelector('#outcome').textContent = 'Using proprietary codecs, video started playing.'
      })
    </script>
  </body>
</html>
```

## Faydalı bağlantılar

- [Chrome Açılış Planı](https://www.chromium.org/developers/calendar)
- [OmahaProxy](http://omahaproxy.appspot.com)
- [Chromium konu takip](https://bugs.chromium.org/p/chromium)
