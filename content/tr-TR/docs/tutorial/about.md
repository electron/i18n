# Electron Hakkında

[Electron](https://electronjs.org), HTML, CSS ve JavaScript ile çok platformlu masaüstü uygulamaları oluşturmak için GitHub tarafından geliştirilen bir açık kaynak kütüphanesidir. Electron bunu, [Chromium](https://www.chromium.org/Home) ve [Node.js](https://nodejs.org)'yi tek bir çalışma zamanında birleştirerek gerçekleştirir ve uygulamalar Mac, Windows ve Linux için paketlenebilir.

Elektron 2013'te, GitHub'ın değiştirilebilir metin editörü olan  Atom </ 0> 'ın kurulacağı çerçeve olarak başladı. İkisi de 2014 baharında açık kaynaklıydı.</p> 

O zamandan beri açık kaynaklı geliştiriciler, yeni teşebbüsler ve kurulu şirketler tarafından kullanılan popüler bir araç haline geldi.  Electron inşasını gör </ 0>.</p> 

[Quick Start Guide](quick-start.md) Electron'un katılımcıları ve bültenleri hakkında daha fazla bilgi edinmek veya Electron ile inşa etmeye başlamak için okumaya devam edin.

## Çekirdek Takım ve Katkıda Bulunanlar

Elektron, GitHub'daki bir ekip tarafından ve ayrıca topluluktan bir grup olan [active contributors](https://github.com/electron/electron/graphs/contributors) tarafından sağlanır. Katkıda bulunanların bir kısmı bireylerdir ve bazıları Electron üzerinde gelişmekte olan büyük şirketlerde çalışır. Sık sık katkıda bulunan geliştiricileri projeye eklemekten mutluyuz. [Electron'a katkıda bulunmak](https://github.com/electron/electron/blob/master/CONTRIBUTING.md) hakkında daha fazla bilgi edinin.

## Sürümler

Sık sık [Electron yayınlanır](https://github.com/electron/electron/releases). Önemli hata düzeltmeleri, yeni API'lar, Chromium veya Node.js sürümlerini güncelleyerek yayınlıyoruz.

### Bağımlılıklar güncelleniyor

Electron'un Chromium sürümü, yeni bir kararlı Chromium sürümünün piyasaya sürülmesinden sonra bir iki hafta içinde güncellenir.

Node.js'nin yeni bir sürümü piyasaya çıktığında, Electron genellikle daha kararlı bir sürümü getirmek için yükseltmeden önce yaklaşık bir ay bekler.

Electron'da, Node.js ve Chromium tek bir V8 örneğini paylaşıyor-genellikle Chromium'un kullandığı sürüm. Çoğu zaman, bu *işe yarıyor* ancak bazen Node.js'ye yama yapmak anlamına geliyor.

### Versiyonlama

2.0 sürümünden itibaren Electron [`semver`'i takip eder](https://semver.org). Çoğu uygulama için ve npm'nin son sürümünü kullandığınızda, `$ npm install electron` doğru şeyi yapacaktır.

Versiyon güncelleme işlemi [Versiyon Dökümanında](electron-versioning.md) detaylı bir şekilde açıklanmaktadır.

### LTS

Elektron'un eski sürümlerinin uzun vadeli desteği şu anda mevcut değildir. Mevcut Elektron sürümünüz sizde çalışıyorsa, istediğiniz süre boyunca kullanabilirsiniz. Kullandıkça yeni özelliklerden yararlanmak isterseniz daha yeni bir sürüme geçmelisiniz.

Büyük güncelleme sürümü `v1.0.0` ile geldi. Eğer bu sürümü kullanmıyorsanız, `v1.0.0` [değişiklikleri hakkında bilgi alın](https://electronjs.org/blog/electron-1-0).

## Temel felsefe

Elektronu küçük (dosya boyutu) ve sürdürülebilir (bağımlılıkların ve API'ların yayılımı) tutmak için, proje çekirdek projenin kapsamını sınırlar.

For instance, Electron uses Chromium's rendering library rather than all of Chromium. Bu, Chromium'u yükseltmeyi kolaylaştırır, ancak Google Chrome'da bulunan bazı tarayıcı özelliklerinin Electron'da bulunmadığı anlamına gelir.

Electron'a eklenen yeni özellikler esas olarak yerel API'ler olmalıdır. Bir özellik kendi Node.js modülü olabilir, büyük olasılıkla olmalıdır. [Topluluk tarafından geliştirilen Electron araçlarını](https://electronjs.org/community) keşfedin.

## Tarihçe

Electron tarihçesinin kilometre taşları aşağıdadır.

| Takvim:          | :tada:                                                                                                         |
| ---------------- | -------------------------------------------------------------------------------------------------------------- |
| **Nisan 2013**   | [Atom Shell başlatıldı](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45). |
| **Mayıs 2014**   | [Atom Shell açık kaynaklı oldu](https://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                 |
| **Nisan 2015**   | [Atom Shell'in ismi Electron olarak değişti](https://github.com/electron/electron/pull/1389).                  |
| **Mayıs 2016**   | [Electron `v1.0.0` sürümü yayınlandı](https://electronjs.org/blog/electron-1-0).                               |
| **Mayıs 2016**   | [Electron uygulamaları Mac Uygulama Mağazası'yla uyumlu hale getirildi](mac-app-store-submission-guide.md).    |
| **Ağustos 2016** | [Electron uygulamaları için Windows Mağaza desteği](windows-store-guide.md).                                   |