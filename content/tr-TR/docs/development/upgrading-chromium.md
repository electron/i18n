# Chromium yükseltiliyor

Bu adımlar Electron'un Chromium 'u yükseltmek için gerekli genel taslağıdır.

- libcc ürününü yeni bir Chromium sürümüne yükseltin
- Electron kodunu yeni libcc ile uyumlu hale getirin
- Gerekirse Electron bağımlılıklarını (crashpad, NodeJS, etc.) Güncelleyin
- Libcc ve electronun iç yapılarını oluşturun
- Gerekirse Electron dokümanlarını güncelleyin

## `libcc` ürünü yeni bir Chromium sürümüne yükseltin

1. Kodu alın ve projeyi başlatın: 
      sh
      $ git clone git@github.com:electron/libchromiumcontent.git
      $ cd libchromiumcontent
      $ ./script/bootstrap -v

2. Chromium anlık görüntüsünü güncelle 
  - Bir sürüm numarası seçin [OmahaProxy](https://omahaproxy.appspot.com/) ve güncelleme `SÜRÜM` Bu dosya ile 
    - Bu, tarayıcıda manuel olarak OmahaProxy'yi ziyaret ederek veya otomatik olarak yapılabilir:
    - En son kararlı mac sürümü için: `curl -so- https://omahaproxy.appspot.com/mac > VERSION`
    - En yeni win64 beta sürümü için: `curl -so- https://omahaproxy.appspot.com/all | grep "win64,beta" | awk -F, 'NR==1{print $3}' > VERSION`
  - çalıştır `$ ./script/update` 
    - Biraz çay demleyin -- bu yaklaşık 30dk yada daha fazla sürebilir.
    - Bu büyük ihtimalle ek paketler uygulanırken başarısız olacak.
3. Klasör`*.patch` files in the `patches/` and `patches-mas/` düzenleme.
4. (Tercihe bağlı) `script/update` yamaları uygular, ancak birden fazla deneme yapılması gerekiyorsa aynı komut dosyasını manuel olarak çalıştırabilirsiniz `güncelle` çağrılar: `$ ./script/apply-patches` 
  - İkinci bir senaryo var, `script/patch.py` that may be useful. Read `./script/patch.py -h` daha fazla bilgi için.
5. Tüm yamalar hatasız uygulandığında derlemeyi çalıştırın 
  - `$ ./script/build`
  - Bazı yamalar Chromium kodu ile uyumlu değilse, Derleme hatalarını düzeltin.
6. Oluşturma başarılı olduğunda, oluşturun bir `dist` Electron hakkında 
  - `$ ./script/create-dist --no_zip` 
    - Libcc repo'nun kökünde bir ` dist /main ` klasörü oluşturacaktır. Electron'u oluşturmak için buna ihtiyacınız olacak.
7. (İsteğe bağlı) Dosyalardan kaynaklanan hatalar varsa komut dosyası içeriğini güncelleyin kaldırıldı veya yeniden adlandırıldı. (`--no_zip` prevents script from create `dist` Arşivler. Bunlar gerekmez.)

## Electron kodunu güncelleyin

1. Kod al: 
      sh
      $ git clone git@github.com:electron/electron.git
      $ cd electron

2. Makinenizin kendi repo'sunda libcc kurulmuşsa, Elektron'a şunu kullanmasını söyle: 
      sh
      $ ./script/bootstrap.py -v \
        --libcc_source_path <libcc_folder>/src \
        --libcc_shared_library_path <libcc_folder>/shared_library \
        --libcc_static_library_path <libcc_folder>/static_library

3. Eğer hala bir libcc oluşturmadıysanız ama yine de yükseltilmesi gerekiyorsa yeni Chromium'a, bootstrap Electron as usual `$ ./script/bootstrap.py -v`
  
  - Libcc alt modülünün(`vendor/libchromiumcontent`) işaret ettiğinden emin olun doğru revizyon

4. Sürüm ile eşleşecek şekilde ayarlayın `CLANG_REVISION` in `script/update-clang.sh` Chromium kullanıyor.
  
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

Electron'un bir Hata Ayıklama derlemesi başarılı olduğunda, sınamaları çalıştırın: `$ ./script/test.py` Başarısız testleri düzeltin.

Desteklenen tüm platformlarda Electron kodunu düzeltmek için yukarıdaki adımları izleyin.

## Hata yolu güncelleştiriliyor

Hata yolu ile ilgili herhangi bir derleme hatası varsa, muhtemelen ayrılmayı yeni bir revizyonla güncellemeniz gerekir. Gör [Upgrading Crashpad](upgrading-crashpad.md) Bunun nasıl yapılacağı ile ilgili talimatlar için.

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