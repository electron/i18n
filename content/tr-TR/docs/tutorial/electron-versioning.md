# Electron sürüm oluşturma

> Sürüm oluşturma politikamıza ve uygulamanıza ayrıntılı bir bakış.

2.0.0 sürümünden itibaren Electron [semver](#semver)'i izler. Aşağıdaki komut, Electron'un en son kararlı yapısını yükleyecektir:

```sh
npm install --save-dev electron
```

Mevcut bir projeyi en son kararlı sürümü kullanacak şekilde güncellemek için:

```sh
npm install --save-dev electron@latest
```

## Sürüm 1.x

Electron versions *< 2.0* did not conform to the [semver](http://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. Özellikleri birleştiren geliştiriciler için elverişli olsa da, müşteri tarafından yönlendirilen uygulamaların geliştiricileri için sorunlar yaratmaktadır. Slack, Stride, Teams, Skype, VS Code, Atom ve Masaüstü gibi büyük uygulamaların QA test çevrimleri uzun olabilir ve istikrar son derece istenen bir sonuçtur. Hata düzeltmelerini kavramaya çalışırken yeni özelliklerin benimsenmesinde yüksek bir risk söz konusudur.

1.x stratejisine bir örnek:

![](../images/versioning-sketch-0.png)

` 1.8.1 </ 0> ile geliştirilen bir uygulama, <code> 1.8.2 </ 0> özelliğini emme veya düzeltmeyi geri gönderme olmadan <code> 1.8.3 </ 0> hata düzeltmesini alamaz ve yeni bir serbest bırakma hattının sürdürülmesini gerçekleştiremez.</p>

<h2>Sürüm 2.0 ve Ötesi</h2>

<p>Aşağıda özetlenen 1.x stratejimizden birkaç önemli değişiklik var. Her değişiklik, geliştiricilerin/sürdürücülerin ve uygulama geliştiricilerin gereksinimlerini ve önceliklerini karşılamak üzere tasarlanmıştır.</p>

<ol>
<li>Semver'in sıkı kullanımı</li>
<li>Semver-uyumlu <code>-beta` etiketlerinin tanıtımı</li> 

- [Konvansiyonel taahhüt mesajları](https://conventionalcommits.org/)'na giriş
- Well-defined stabilization branches
- The `master` branch is versionless; only stabilization branches contain version information</ol> 

Git dallanmasının nasıl çalıştığını, npm etiketinin nasıl çalıştığını, geliştiricilerin neler bekleyebileceğini ve değişikliklerin nasıl geri alınabileceğini ayrıntılı olarak ele alacağız.

# semver

Electron 2.0'dan itibaren semver'i izleyecek.

Aşağıda, değişiklik türlerini ilgili semver kategorilerine (örn. Majör, Minör, Yama) açıkça eşleyen bir tablo verilmiştir.

| Büyük Sürüm Artışları             | Küçük Versiyon Artımları             | Yama Sürümü Artımları         |
| --------------------------------- | ------------------------------------ | ----------------------------- |
| Elektron API kırma değişiklikleri | Elektron kırılmaz API değişiklikleri | Electron hata düzeltmeleri    |
| Node.js major version updates     | Node.js minor version updates        | Node.js patch version updates |
| Chromium sürümü güncellemeleri    |                                      | fix-related chromium yamaları |

Çoğu krom güncellemesinin kırılma olarak değerlendirileceğini unutmayın. Geri gönderilebilecek düzeltmeler muhtemelen kiraz yamalar olarak seçilecek.

# Dengeleme Dalları

Dengeleme dalları, yalnızca emniyet veya istikrarla ilgili kiraz toplama taahhütlerini alarak, ustaya paralel çalışan dallardır. Bu dallar hiçbir zaman ustaya birleştirilmezler.

![](../images/versioning-sketch-1.png)

Stabilizasyon dalları daima ** major</ i> veya ** minor</ i> sürüm çizgileridir ve aşağıdaki şablona göre adlandırılmıştır: ` $ MAJOR- $ MINOR-x </ 1> e.g. <code> 2-0-X </ 1>.</p>

<p>Eşzamanlı olarak birden fazla dengeleme dalının bulunmasına izin veriyoruz, her zaman paralel olarak en az ikisini desteklemeyi ve gerektiğinde güvenlik düzeltmelerini geri göndermeyi düşünüyoruz.
<img src="../images/versioning-sketch-2.png" alt="" /></p>

<p>Eski satırlar GitHub tarafından desteklenmeyecek, ancak diğer gruplar kendi kendilerine sahiplik ve backport kararlılığı ve güvenlik düzeltmeleri alabilir. Bunu birlikte cesaretlendiriyoruz çünkü birçok uygulamanın geliştiricileri için hayatı kolaylaştırdığının farkındayız.</p>

<h1>Beta Bültenleri ve Hata Düzeltmeleri</h1>

<p>Geliştiriciler hangi sürümlerin <em>güvenli</em> olacağını bilmek istiyor. Görünüşte masum özellikler bile karmaşık uygulamalarda gerileme yaratabilir. Aynı zamanda sabit bir sürüme kilitleme tehlikelidir, çünkü sürümünüzden bu yana çıkan güvenlik yamalarını ve hata düzeltmelerini görmezden geliyorsunuzdur. Amacımız <code>package.json`'da aşağıdaki standart semver aralıklarına izin vermektir:</p> 

- ` 2.0.0 </ 0> sürümünüze yalnızca kararlılık veya güvenlikle ilgili düzeltmeler kabul etmek için <code> ~ 2.0.0 </ 0> kullanın.</li>
<li>Güvenlik ve hata düzeltmelerinin yanı sıra kırılmaz <em> makul derecede kararlı </ 1> özellik işi kabul etmek için <code> ^ 2.0.0 </ 0> kullanın.</li>
</ul>

<p>İkinci nokta ile ilgili önemli olan <code> ^ </ 0> kullanan uygulamaların makul düzeyde bir kararlılık beklemesi gerektiğidir. Bunu gerçekleştirmek için Semver, belirli bir sürümün henüz <em>güvenli</em> veya <em>kararlı</em> olmadığını belirtmek için <em>yayın öncesi tanımlayıcıya</em> izin verir.</p>

<p>Hangisini seçerseniz seçin, bozucu değişiklikler Chromium hayatının bir gerçeği olduğu için periyodik olarak <code> package.json </ 0> sürümününe geçmek zorunda kalacaksınız.</p>

<p>Süreç şöyledir:</p>

<ol>
<li>Tüm yeni büyük ve küçük yayın satırları, <code>N >= 1` için `-beta.N` etiketi ile başlar. Tam da burada, özellik seti **kilitli** olur. Bu sürüm satırı, başka hiçbir özelliği kabul etmiyor ve yalnızca güvenlik kararlılıkları ile ilgilidir. örneğin `2.0.0-beta.1`.
- Hata düzeltmeleri, regresyon düzeltmeleri ve güvenlik yamaları kabul edilebilir. Bunu yaptıktan sonra `N` bir arttırılarak yeni bir beta yayınlandı. Örneğin. `2.0.0-beta.2`
- Belirli bir beta sürümünün kararlılığı *genel olarak kabul edilirse*, yalnızca sürüm bilgisi değiştirilerek, kararlı yapı olarak yeniden yayınlanacaktır. Örneğin. `2.0.0`.
- Gelecekteki hata düzeltmeleri veya güvenlik yamalarının yayın kararlı iken bir araya getirilmesi gerekiyorsa, bunlar uygulanır ve buna göre *yama* sürümü artırılır. Örneğin. `2.0.1`.</ol> 

For each major and minor bump, you should expect to see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Resimlerdeki bir yaşam döngüsü:

- En yeni özellikleri içeren yeni bir sürüm oluşturuldu. ` 2.0.0-beta.1 </ 0> olarak yayınlandı.
<img src="../images/versioning-sketch-3.png" alt="" /></li>
<li>A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as <code>2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
- Beta *genellikle kararlı* olarak kabul edilir ve `2.0.0` altında tekrar beta olmayan olarak yayınlanır. ![](../images/versioning-sketch-5.png)
- Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Çeşitli semver aralıklarının yeni sürümleri nasıl alacağına ilişkin birkaç örnek:

![](../images/versioning-sketch-7.png)

# Eksik Özellikleri: Alfalar ve Gececiler

Stratejimiz, şu an uygun olduğunu düşündüğümüz birkaç takas hattı içeriyor. En önemlisi, master'daki yeni özelliklerin kararlı bir sürüm hattına erişmeden önce biraz zaman alması. Hemen yeni bir özellik denemek isterseniz, Electron'u kendiniz kurmanız gerekecek.

Gelecekteki değerlendirmelerde, aşağıdakilerden birini veya her ikisini birlikte sunabiliriz:

- gece boyunca inşa eden ustalar; bunlar milletlerin yeni özellikleri hızlıca test etmesine ve geri bildirimde bulunmasına izin verecektir
- beta sürümlerine göre daha serbest denge kısıtlamaları olan alfa sürümleri; örneğin, bir denge kanalı *alpha* da ise, yeni özellikleri kabul etmek için izin verir

# Özellik bayrakları

Özellik bayrakları Chromium'da yaygın bir uygulamadır ve web geliştirme ekosisteminde iyi kurulmuştur. Elektron bağlamında, özellik bayrağı veya ** soft branch </ 0> aşağıdaki özelliklere sahip olmalıdır:</p> 

- it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
- bu bölümler tamamen yeni ve eski kod yollarıdır: Bu yeni özellik yeni ve eski kodların yenıden yapılandırılması içindir *uygun değil* koşullu kontrat özellikleri
- belirleyici işaretler hassas bölümler birleştirildikten sonra doğal olarak kaldırılır

İşaretlenen kodu sürüm verme stratejimizle aşağıdaki şekilde eşleştiriyoruz:

1. istikrar dalında özellik işaretli kod üzerinde yinelemeyi düşünmüyoruz; Hatta özellik bayrakları dikkatli kullanımı risklidir
2. aPI sözleşmelerini özellik işaretli kodda, ana sözcüğe darbe indirmeden geçirebilirsiniz. İşaretlenen kod semver'e uymuyor olabilir

# Anlamsal örneklendirme

Biz güncelleme ve serbest bırakma sürecinin her düzeyinde netliği arttırmaya çalışıyoruz. ` 2.0.0 </ 0> ile başlayarak, aşağıdaki gibi özetlenebilecek olan <a href="https://conventionalcommits.org/"> Konvansiyonel Karar Verme </ 1> spesifikasyonuna uymak için çekme talepleri isteyeceğiz:</p>

<ul>
<li>Semver ile sonuçlanan <strong>major</strong> tümseği ile başlamalıdır <code>BREAKING CHANGE:`.</li> 

- Semver ile sonuçlanan **minor** tümseği ile başlamalıdır `feat:`.
- Semver ** yamasına yol açacak komitelerin </ 0> bump'ı ` fix: </ 1> ile başlamalıdır.</p></li>
<li><p>Sıkıştırılmış mesajın yukarıdaki ileti biçimine uyması koşuluyla, taahhütlerin ezilmesine izin veririz.</p></li>
<li>Çekme isteğinde bulunan bazı taahhütlerin semantik önek içermemesi, 
aynı çekme isteğinden daha sonra yapılan bir taahhüt anlamlı bir mesaj içerdiği sürece kabul edilebilir.</li>
</ul>

<h1>Versionless <code>master`</h1> 
    
    - `master` şubesi `package.json` içerisinde daima `0.0.0-dev` içerecektir
    - Serbest branşlar asla ustaya birleştirilmez
    - Serbest şubeler `package.json` içerisinde doğru sürümler bulundurmalıdır