# Elektrondaki Sorunlar

# Sorunlar

* [Sorunlara nasıl müdahil olunur](#how-to-contribute-in-issues)
* [Genel Yardım İsteğinde Bulunmak](#asking-for-general-help)
* [Hata raporu gönderme](#submitting-a-bug-report)
* [Bir hata raporu düzenle](#triaging-a-bug-report)
* [Bir hata raporu çözümlendir](#resolving-a-bug-report)

## Sorunlara nasıl müdahil olunur

Herhangi bir sorun için temelde bireyin katkı sağlayabileceği üç yöntem vardır:

1. Konuyu tartışmaya açmak: Eğer bir sorun bulduğunuza inanıyorsanız, `elektron/elektron` sayı izleyicisini açarak bunu rapor edin.
2. Sorunun öncelikli bir hale getirilmesine yardımcı olmak: Bunu ya detaylandırarak (hata gösteren bir yeniden üretilebilir sınama durumu) ya da sorunu gidermek için öneriler sunarak sağlayın.
3. Bu sorunu gidermek için yardımcı olmak: Bunu bir hata olmadığını ya da düzeldiğini göstererek; fakat da çok somut ve incelenebilir biçimde ` elektron / elektron </ 0> 'da kaynağında görünmesini sağlayın.</li>
</ol>

<h2>Genel Yardım İstemek</h2>

<p><a href="../tutorial/support.md#finding-support">"Finding Support"</a> has a
list of resources for getting programming help, reporting security issues,
contributing, and more. Please use the issue tracker for bugs only!</p>

<h2>Hata raporu gönderme</h2>

<p>Sorun izleyici içinde yeni bir başlık açarken <code>electron/electron`, kullanıcılar tarafından doldurulması gereken bir şablon sunulacaktır.</p> 
    ```markdown
& Lt;! -
Bir sorunu açtığınız için teşekkür ederiz! Akılda tutulması gereken birkaç şey: 

- Sorun izleyici yalnızca hatalar ve özellik istekleri içindir.
- Bir hata bildirmeden önce lütfen Electron'un en son sürümünde sorununuzu tekrar deneyin.
- Genel bir tavsiyeye ihtiyacınız varsa, Slack'e katılın: http://atom-slack.herokuapp.com
-->

* Elektron versiyonu:
* İşletim sistemi:

### Beklenti

<!-- Sizce ne olmalı? -->

### Gerçek davranış

<!-- Aslında ne oluyor? -->

### Nasıl yeniden üretilir?

<!--

Bu hatayı hızlı bir şekilde gözden geçirmek için en doğru yöntem, klonlanıp çalıştırılabilecek bir REPOSITORY sağlamaktır.

Https://github.com/electron/electron-quick-start'u forklayabilir ve değişliklerinizle şubeye bir bağlantı ekleyebilirsiniz.

Bir URL girerseniz, lütfen repo örneğinizi kopyalamak / ayarlamak / çalıştırmak için gerekli komutları listeleyin. Örneğin,

  $ git clone $YOUR_URL -b $BRANCH
  $ npm install
  $ npm start || electron.

-->
```

Elektron'da bir hata bulduğunuzu düşünüyorsanız, lütfen bu formu en iyi şekilde doldurun.

Raporu değerlendirmek önemli olan önemli iki şey var; hata açıklaması yapmak ve yeniden oluşturmak için basit bir test yapmak. Yeniden üretilebiliyorsa, bir hatayı düzeltmek daha kolaydır.

Bkz.  Minimum, Tam ve Doğrulanabilir örnek nasıl oluşturulur? </ 0>.</p> 

## Bir hata raporu düzenle

Açık kaynak kodlarında tartışmalar sıklıkla görülür. Bazı katılımcılar farklı görüşlere sahip olabilir, bu tartışma sürecin bir parçasıdır. Asıl konuya odaklanmak daha faydalı profesyonel bir tutum olur.

Ne çok kısa açıklamalar ne de çok fazla ayrıntı pek işe yaramaz ve profesyonelce olmaz. Çoğu kimseye bu tür tutumu sinir bozucu ve düşmanca bulur.

Katkıda bulunanların, konuları birlikte çalışarak çözmeleri ve birbirlerine ilerleme konusunda yardım etmeleri önerilir. Geçersiz olduğunu düşündüğünüz veya hatalı bilgi içeren bir sorunla karşılaşırsanız, ek destek bölümünde *neden<0> böyle düşündüğünüz açıklayın ve yanlış olabileceğinizi kabullenmeyi de göz önünde bulundurun. Bunu yaparak, çoğunlukla doğru sonuca daha hızlı ulaşabiliriz.</p> 

## Bir hata raporu çözümlendir

Çoğu sorun bir çekme isteği açarak çözülür. Bir çekme isteğini açma ve inceleme süreci, açılış ve triyaj konularına benzer ancak, önerilen değişikliklerin Electron projesinin asgari kalitesini ve işlevsel yönergelerini karşılamasını sağlayan gerekli inceleme ve onay iş akışını da beraberinde getirir.