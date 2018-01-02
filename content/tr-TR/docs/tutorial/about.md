# Electron Hakkında

[Electron](https://electronjs.org), HTML, CSS ve JavaScript ile çok platformlu masaüstü uygulamaları oluşturmak için GitHub tarafından geliştirilen bir açık kaynak kütüphanesidir. Electron bunu, [Chromium](https://www.chromium.org/Home) ve [Node.js](https://nodejs.org)'yi tek bir çalışma zamanında birleştirerek gerçekleştirir ve uygulamalar Mac, Windows ve Linux için paketlenebilir.

Elektron 2013'te, GitHub'ın değiştirilebilir metin editörü olan  Atom </ 0> 'ın kurulacağı çerçeve olarak başladı. İkisi de 2014 baharında açık kaynaklıydı.</p> 

O zamandan beri açık kaynaklı geliştiriciler, yeni teşebbüsler ve kurulu şirketler tarafından kullanılan popüler bir araç haline geldi.  Electron inşasını gör </ 0>.</p> 

Read on to learn more about the contributors and releases of Electron or get started building with Electron in the [Quick Start Guide](quick-start.md).

## Çekirdek Takım ve Katkıda Bulunanlar

Electron is maintained by a team at GitHub as well as a group of [active contributors](https://github.com/electron/electron/graphs/contributors) from the community. Katkıda bulunanların bir kısmı bireylerdir ve bazıları Electron üzerinde gelişmekte olan büyük şirketlerde çalışır. Sık sık katkıda bulunan geliştiricileri projeye eklemekten mutluyuz. Read more about [contributing to Electron](https://github.com/electron/electron/blob/master/CONTRIBUTING.md).

## Sürümler

[Electron releases](https://github.com/electron/electron/releases) frequently. We release when there are significant bug fixes, new APIs or are updating versions of Chromium or Node.js.

### Bağımlılıklar güncelleniyor

Electron'un Chromium sürümü, yeni bir kararlı Chromium sürümünün piyasaya sürülmesinden sonra bir iki hafta içinde güncellenir.

Node.js'nin yeni bir sürümü piyasaya çıktığında, Electron genellikle daha kararlı bir sürümü getirmek için yükseltmeden önce yaklaşık bir ay bekler.

In Electron, Node.js and Chromium share a single V8 instance—usually the version that Chromium is using. Most of the time this *just works* but sometimes it means patching Node.js.

### Sürüm

As of version 2.0 Electron [follows `semver`](http://semver.org). For most applications, and using any recent version of npm, running `$ npm install electron` will do the right thing.

The version update process is detailed explicitly in our [Versioning Doc](electron-versioning.md).

### LTS

Elektron'un eski sürümlerinin uzun vadeli desteği şu anda mevcut değildir. Mevcut Elektron sürümünüz sizde çalışıyorsa, istediğiniz süre boyunca kullanabilirsiniz. Kullandıkça yeni özelliklerden yararlanmak isterseniz daha yeni bir sürüme geçmelisiniz.

Büyük güncelleme sürümü `v1.0.0` ile geldi. Eğer bu sürümü kullanmıyorsanız, `v1.0.0` [değişiklikleri hakkında bilgi alın](https://electronjs.org/blog/electron-1-0).

## Temel felsefe

In order to keep Electron small (file size) and sustainable (the spread of dependencies and APIs) the project limits the scope of the core project.

Örneğin, Electron, yalnızca Chromium'un tamamında değil, Chromium'daki işleme kütüphanesini kullanır. Bu, Chromium'u yükseltmeyi kolaylaştırır, ancak Google Chrome'da bulunan bazı tarayıcı özelliklerinin Electron'da bulunmadığı anlamına gelir.

Electron'a eklenen yeni özellikler esas olarak yerel API'ler olmalıdır. If a feature can be its own Node.js module, it probably should be. See the [Electron tools built by the community](https://electronjs.org/community).

## Tarihçe

Electron tarihçesinin kilometre taşları aşağıdadır.

| Takvim:          | :tada:                                                                                                                                        |
| ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nisan 2013**   | [Atom Shell başlatıldı](https://github.com/electron/electron/commit/6ef8875b1e93787fa9759f602e7880f28e8e6b45).                                |
| **Mayıs 2014**   | [Atom Shell açık kaynaklı oldu](http://blog.atom.io/2014/05/06/atom-is-now-open-source.html).                                                 |
| **Nisan 2015**   | [Atom Shell'in ismi Electron olarak değişti](https://github.com/electron/electron/pull/1389).                                                 |
| **Mayıs 2016**   | [Electron `v1.0.0` sürümü yayınlandı](https://electronjs.org/blog/electron-1-0).                                                              |
| **Mayıs 2016**   | [Electron uygulamaları Mac Uygulama Mağazası'yla uyumlu hale getirildi](https://electronjs.org/docs/tutorial/mac-app-store-submission-guide). |
| **Ağustos 2016** | [Electron uygulamaları için Windows Mağaza desteği](https://electronjs.org/docs/tutorial/windows-store-guide).                                |