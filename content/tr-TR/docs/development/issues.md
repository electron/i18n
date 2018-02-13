# Elektrondaki Sorunlar

# Sorunlar

* [Sorunlara nasıl müdahil olunur](#how-to-contribute-in-issues)
* [Genel Yardım İstemek](#asking-for-general-help)
* [Hata raporu gönderme](#submitting-a-bug-report)
* [Bir hata raporu düzenle](#triaging-a-bug-report)
* [Bir hata raporu çözümlendir](#resolving-a-bug-report)

## Sorunlara nasıl müdahil olunur

Herhangi bir sorun için temelde bireyin katkı sağlayabileceği üç yöntem vardır:

1. Konuyu tartışmaya açmak: Eğer bir sorun bulduğunuza inanıyorsanız, `elektron/elektron` sayı izleyicisini açarak bunu rapor edin.
2. Sorunun öncelikli bir hale getirilmesine yardımcı olmak: Bunu ya detaylandırarak (hata gösteren bir yeniden üretilebilir sınama durumu) ya da sorunu gidermek için öneriler sunarak sağlayın.
3. Bu sorunu gidermek için yardımcı olmak: Bunu bir hata olmadığını ya da düzeldiğini göstererek; fakat da çok somut ve incelenebilir biçimde ` elektron / elektron </ 0> 'da kaynağında görünmesini sağlayın.</li>
</ol>

<h2>Genel Yardım İsteğinde Bulunmak</h2>

<p>Çünkü, etkinlik düzeyi <code>Elektron/elektron` deposundaki aktivite düzeyi çok yüksek olduğundan, soru sorarak veya elektron kullanarak genel yardım talepleri [topluluk bölümü Kanal](https://atomio.slack.com) veya [forum](https://discuss.atom.io/c/electron) yönelik olmalıdır.</p> 
    ## Hata raporu gönderme
    
    Sorun izleyici içinde yeni bir başlık açarken `electron/electron`, kullanıcılar tarafından doldurulması gereken bir şablon sunulacaktır.
    
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

Katkıda bulunanların, konuları birlikte çalışarak çözmeleri ve birbirlerine ilerleme konusunda yardım etmeleri önerilir. Geçersiz olduğunuzu düşündüğünüz veya hatalı bir bilgi içeren bir sorunla karşılaşırsanız, destek kısımında bunun neden bu şekilde olduğunuzu açıklayın ve yanlış olabileceğinden emin olmaya istekli olun. By doing so, we can often reach the correct outcome faster.

## Bir hata raporu çözümlendir

Most issues are resolved by opening a pull request. The process for opening and reviewing a pull request is similar to that of opening and triaging issues, but carries with it a necessary review and approval workflow that ensures that the proposed changes meet the minimal quality and functional guidelines of the Electron project.