# Node Yükseltmesi

## Tartışma

Bir yükseltme sorunu, uyumluluğu sağlamak için tüm Elektronları V8'in tek bir kopyasıyla oluşturuyor. Bu önemlidir çünkü upstream Node ve [libchromiumcontent](upgrading-chrome.md) her ikisi de kendi V8 sürümlerini kullanır.

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
3. Kabullerimizi kullandığımız önceki düğüm sürümünden yeniden uygulayın (`vY.Y.Y`) dan `v.X.X.X` 
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
2. Çalıştır `script/update` en yeni libcc 'yi almak için 
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
      - This is needed because upstream Node keeps its V8 files in a subdirectory
  - Ensure that local status is clean: `git status` to make sure there are no unstaged changes.
  - Confirm that the patch applies cleanly with `script/patch.py -r src/V8 -p patches/v8/xxx-patch_name.patch.patch`
  - Create a new copy of the patch: 
    - `cd src/v8 && git diff > ../../test.patch && cd ../..`
    - This is needed because the first patch has Node commit checksums that we don't want
  - Confirm that checksums are the only difference between the two patches: 
    - `diff -u test.patch patches/v8/xxx-patch_name.patch`
  - Replace the old patch with the new: 
    - `mv test.patch patches/v8/xxx-patch_name.patch`
  - Add the patched code to the index *without* committing: 
    - `cd src/v8 && git add . && cd ../..`
    - We don't want to commit the changes (they're kept in the patchfiles) but need them locally so that they don't show up in subsequent diffs while we iterate through more patches
  - Add the patch file to the index: 
    - `git add a patches/v8/`
  - (Optionally) commit each patch file to ensure you can back up if you mess up a step: 
    - `git commit patches/v8/`
8. Update `patches/v8/README.md` with references to all new patches that have been added so that the next person will know which need to be removed.
9. Update Electron's submodule references: 
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

## Notes

- libcc and V8 are treated as a single unit
- Node maintains its own fork of V8 
  - They backport a small amount of things as needed
  - Documentation in node about how [they work with V8](https://nodejs.org/api/v8.html)
- We update code such that we only use one copy of V8 across all of electron 
  - E.g electron, libcc, and node
- We don’t track upstream closely due to logistics: 
  - Upstream uses multiple repos and so merging into a single repo would result in lost history. So we only update when we’re planning a node version bump in electron.
- libcc is large and time-consuming to update, so we typically choose the node version based on which of its releases has a version of V8 that’s closest to the version in libcc that we’re using. 
  - We sometimes have to wait for the next periodic Node release because it will sync more closely with the version of V8 in the new libcc
  - Electron keeps all its patches in libcc because it’s simpler than maintaining different repos for patches for each upstream project. 
    - Crashpad, node, libcc, etc. patches are all kept in the same place
  - İnşaat düğümü: 
    - There’s a chance we need to change our build configuration to match the build flags that node wants in `node/common.gypi`