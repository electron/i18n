# Node Yükseltmesi

## Tartışma

One upgrade issue is building all of Electron with a single copy of V8 to ensure compatibility. Bu önemlidir çünkü upstream Node ve [libchromiumcontent](upgrading-chromium.md) her ikisi de kendi V8 sürümlerini kullanır.

Node'u Yükseltme, libchromiumcontent'i yükseltmekten çok daha kolaydır; bu nedenle birincisi libchromiumcontenti yükseltir ve daha sonra V8'ine en yakın olan upstream Node sürümünü seçerse daha az çatışma ortaya çıkar.

Elektron'un yukarıda bahsedilen V8 yapım detayları için değişikliklerle ve Electron'un ihtiyaç duyduğu API'yı göstermesi için kendi [Node fork](https://github.com/electron/node) 'u vardır. Bir upstream Node çıkışı seçildiğinde, Electron'un Node 'u bir dala yerleştirilir ve orada herhangi bir Electron Node yaması uygulanır.

Bir diğer faktör, Node projesinin V8 sürümünü yamalamasıdır. Yukarıda belirtildiği gibi, Electron her şeyi tek bir V8 kopyasıyla oluşturur, bu nedenle Node 'un V8 yamaları bu kopyaya taşınmalıdır.

Electron'un bağımlılıklarının tamamı V8'in aynı kopyasını oluşturup kullandıktan sonra, bir sonraki adım Node yükseltmesinin neden olduğu herhangi bir Elektron kodu sorununu gidermektir.

[FIXME] Atom 'da (ör. Deepak) kullanan ve onaylamamız gereken bir Node hata ayıklayıcı hakkında bir şey Node güncellemesi ile sorunları çözemez mı?

Özetle, ana adımlar şunlardır:

1. Elektron 'un Node fork sürümünü istediğiniz sürüme güncelleyin
2. Backport Node 'un V8 yamalarını kendi V8 'inize kopyalayın
3. Node 'un yeni sürümünü kullanmak için Electron 'u güncelleyin 
  - Alt modülleri güncelleştirin
  - Node.js yapılandırmasını güncelleyin

## Electron Node' unu [fork](https://github.com/electron/node) güncelleme

1. `electron/node` üzerindeki `master` öğesinin `nodejs/node` adresindeki yayın etiketlerinin güncellendiğinden emin olun
2. Https://github.com/electron/node 'da bir dal oluşturun: `electron-node-vX.X.X` burada oluşturduğunuz dal tabanı, istenen güncelleme için etikettir 
  - `vX.X.X` Mevcut chromium versiyonuyla uyumlu bir node sürümünü kullanmalısınız
3. Kabullerimizi kullandığımız önceki düğüm sürümünden yeniden uygulayın (`vY.Y.Y`) to `v.X.X.X` 
  - Yayın etiketini kontrol edin ve tekrar uygulamak için gereken taahhüt aralığını seçin
  - Cherry-pick seçme aralığı: 
    1. İkisine birden bakın `vY.Y.Y` & `v.X.X.X`
    2. `git cherry-pick FIRST_COMMIT_HASH..LAST_COMMIT_HASH`
  - Karşılaşılan her dosyada birleştirme çakışmalarını çözmek, şöyle: 
    1. `git add <conflict-file>`
    2. `git cherry-pick --continue`
    3. Bitene kadar tekrarlayın

## [V8](https://github.com/electron/node/src/V8) Yamalarını Güncelleştirme

V8'e uygulanan her düzeltme ekinden bir yama dosyası oluşturmamız gerekir.

1. Electron'un libcc fork 'unun bir kopyasını edinin 
  - `$ git clone https://github.com/electron/libchromiumcontent`
2. Çalıştır `komut/güncelleme` en yeni libcc 'yi almak için 
  - Bu biraz zaman alacaktır
3. Eski Node v8 yamalarınızın kopyalarını kaldırın 
  - (In libchromiumcontent repo) Son güncelleme sırasında hangi patchfile'lerin oluşturulduğunu görmek için `patches/v8/README.md` 'i okuyun
  - Şu dosyaları kaldırın `patches/v8/`: 
    - `git rm` düzeltme ek dosyaları
    - değiştir `patches/v8/README.md`
    - bu kaldırma işlemlerini tamamla
4. Node 'u inceleyin [repo](https://github.com/electron/node) node'un versiyonuyla çakıştıktan sonra v8'lerinde hangi yamalar kullandığını görmek için 
  - `git log --oneline deps/V8`
5. Yamalar için bir kontrol listesi oluşturun. Bu, çalışmalarınızı izlemek ve aşağıda kullanılacak `git diff-tree` tamamlama karmalarına hızlı bir referans sağlamak için kullanışlıdır.
6. Oku `patches/v8/README.md` hangi düzeltme eki dosyalarının V8'in önceki sürümünden geldiğini ve bu nedenle kaldırılması gerektiğini görmek için. 
  - `patches/v8/README.md` 'de başvurulan her bir düzeltme eki dosyasını silin
7. Her yama için şunları yapın: 
  - (In node repo) `git diff-tree --patch HASH > ~/path_to_libchromiumcontent/patches/v8/xxx-patch_name.patch` 
    - `xxx` artan üç haneli bir sayıdır (yama sırasını güçlendirmek için)
    - `patch_name` taahhüt edilen node iletileriyle biraz olsun eşleşmelidir, Node gönderme iletisi "cherry-pick cc55747" ise Ör. `030-cherry_pick_cc55747,patch`
  - (libchromium repo'daki adımların geri kalan kısmı) `.patch` upstream V8 'in dosya eşleme rehberi: 
    - Bir fark bölümünde örnek yoksa `deps/V8`, tamamen kaldırın. 
      - Bu yamaları yapmak istemiyoruz çünkü yalnızca V8'e yama yapıyoruz.
    - Örneklerini değiştir `a/deps/v8/filename.ext` ile `a/filename.ext` 
      - Node upstream, V8 dosyalarını bir alt dizinde tutar, çünkü bu gereklidir
  - Lokal durumun temiz olduğundan emin olun: aşamasız değişiklikler olmadığından emin olmak için `git status`.
  - Yamanın `script/patch.py -r src/V8 -p patches/v8/xxx-patch_name.patch.patch` ile düzgün şekilde uygulandığını onaylayın
  - Düzeltme ekinin yeni bir kopyasını oluşturun: 
    - `cd src/v8 && git diff > ../../test.patch && cd ../..`
    - İlk yamanın Node 'u istemediğimiz tamamlama sağlama toplamı olmaması için bu gereklidir
  - Sağlama toplamlarının iki düzeltme eki arasındaki tek fark olduğunu doğrulayın: 
    - `diff -u test.patch patches/v8/xxx-patch_name.patch`
  - Eski yamayı yenisiyle değiştirin: 
    - `mv test.patch patches/v8/xxx-patch_name.patch`
  - Düzeltme eklenmiş kodu dizine ekleyin *işleme* olmadan: 
    - `cd src/v8 && git add . && cd ../..`
    - Değişiklikleri tamamlamak istemiyoruz (patchfile'lerde tutuluyorlar), ancak daha fazla yamayla iterasyon yaparken sonraki diff'lerde görünmemeleri için yerel olarak onlara ihtiyaç duyuyoruz
  - Düzeltme eklenmiş kodu dizine ekleyin: 
    - `git add a patches/v8/`
  - (İsteğe bağlı olarak), Eğer bir adımda yanlış yaptıysanız, yedekleyebilmeniz için her düzeltme eki dosyasına taahhütte bulunun: 
    - `git commit patches/v8/`
8. Bir sonraki kişinin hangi yamanın kaldırılması gerektiğini bilmesi için, `patches/v8/README.md` 'yi eklenen tüm yeni yamalara yapılan başvuruları güncelleyin.
9. Electron 'un alt modül başvurularını güncelleyin: 
      sh
      $ cd electron/vendor/node
      electron/vendor/node$ git fetch
      electron/vendor/node$ git checkout electron-node-vA.B.C
      electron/vendor/node$ cd ../libchromiumcontent
      electron/vendor/libchromiumcontent$ git fetch
      electron/vendor/libchromiumcontent$ git checkout upgrade-to-chromium-X
      electron/vendor/libchromiumcontent$ cd ../..
      electron$ git add vendor
      electron$ git commit -m "update submodule referefences for node and libc"
      electron$ git pso upgrade-to-chromium-62
      electron$ script/bootstrap.py -d
      electron$ script/build.py -c -D

## Notlar

- libcc ve V8, tek bir birim olarak değerlendirilir
- Node kendi V8 çatısını tutar 
  - Gereksinim duyulduğunda küçük bir miktarı geri göndermektedirler
  - Node 'daki belgeler nasıl yapılacağı hakkında [they work with V8](https://nodejs.org/api/v8.html)
- Kodu güncelleyerek sadece elektron genelinde V8 'in bir kopyasını kullanacağız 
  - Ör. electron, libcc, and node
- Upstream 'ı biçimsel nedenlerle yakından takip etmiyoruz: 
  - Upstream birden çok repo kullanır ve bu nedenle tek bir repoya dönüştürülürse geçmişin kaybolmasına neden olur. Bu yüzden, sadece electron 'da bir node versiyonu planladığımızda güncelliyoruz.
- libcc güncellemesi çok büyük ve zaman alıcıdır, bu nedenle hangi node 'ların hangi libcc 'de en çok kullandığımız sürüm olan V8 sürümüne dayanan node sürümünü kullanıyoruz. 
  - Yeni libcc'deki V8 sürümüyle daha yakın bir şekilde senkronize olacağından, bazen bir sonraki periyodik Node sürümünü beklemek zorundayız
  - Elektron, tüm yamalarını libcc'de tutar çünkü her upstream projesi için yamalar için farklı repolar sürdürmekten daha kolaydır. 
    - Crashpad, node, libcc, vb. Yamalar hepsi aynı yerde saklanır
  - Node Yapılandırması: 
    - Yapı değişikliklerimizi, node 'un istediği yapı bayraklarıyla eşleşecek şekilde değiştirmek için bir şansımız var `node/common.gypi`