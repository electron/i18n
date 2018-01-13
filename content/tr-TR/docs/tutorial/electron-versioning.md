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

Electron versiyonları *< 2.0*, [semver](http://semver.org) belirtimine uymadı. Ana sürümler, son kullanıcı API değişikliklerine karşılık gelmektedir. Küçük versiyonlar Chromium'un ana sürümlerine karşılık gelir. Yama sürümleri, yeni özelliklere ve hata düzeltmelerine karşılık gelmiştir. Özellikleri birleştiren geliştiriciler için elverişli olsa da, müşteri tarafından yönlendirilen uygulamaların geliştiricileri için sorunlar yaratmaktadır. Slack, Stride, Teams, Skype, VS Code, Atom ve Masaüstü gibi büyük uygulamaların QA test çevrimleri uzun olabilir ve istikrar son derece istenen bir sonuçtur. Hata düzeltmelerini kavramaya çalışırken yeni özelliklerin benimsenmesinde yüksek bir risk söz konusudur.

1.x stratejisine bir örnek:

![](../images/versioning-sketch-0.png)

An app developed with `1.8.1` cannot take the `1.8.3` bug fix without either absorbing the `1.8.2` feature, or by backporting the fix and maintaining a new release line.

## Sürüm 2.0 ve Ötesi

Aşağıda özetlenen 1.x stratejimizden birkaç önemli değişiklik var. Her değişiklik, geliştiricilerin/sürdürücülerin ve uygulama geliştiricilerin gereksinimlerini ve önceliklerini karşılamak üzere tasarlanmıştır.

1. Semver'in sıkı kullanımı
2. Semver-uyumlu `-beta` etiketlerinin tanıtımı
3. [Konvansiyonel taahhüt mesajları](https://conventionalcommits.org/)'na giriş
4. Açıkça tanımlanan stabilizasyon dalları
5. The `master` branch is versionless; only stability branches contain version information

Git dallanmasının nasıl çalıştığını, npm etiketinin nasıl çalıştığını, geliştiricilerin neler bekleyebileceğini ve değişikliklerin nasıl geri alınabileceğini ayrıntılı olarak ele alacağız.

# semver

Electron 2.0'dan itibaren semver'i izleyecek.

Aşağıda, değişiklik türlerini ilgili semver kategorilerine (örn. Majör, Minör, Yama) açıkça eşleyen bir tablo verilmiştir.

* **Büyük Sürüm Artışları** 
    * Chromium sürümü güncellemeleri
    * node.js ana sürüm güncellemeleri
    * Elektron API kırma değişiklikleri
* **Küçük Versiyon Artımları** 
    * node.js minor version updates
    * Elektron kırılmaz API değişiklikleri
* **Yama Sürümü Artımları** 
    * node.js yama sürümü güncelleştirmeleri
    * fix-related chromium yamaları
    * Electron hata düzeltmeleri

Çoğu krom güncellemesinin kırılma olarak değerlendirileceğini unutmayın. Geri gönderilebilecek düzeltmeler muhtemelen kiraz yamalar olarak seçilecek.

# Dengeleme Dalları

Dengeleme dalları, yalnızca emniyet veya istikrarla ilgili kiraz toplama taahhütlerini alarak, ustaya paralel çalışan dallardır. Bu dallar hiçbir zaman ustaya birleştirilmezler.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

Eşzamanlı olarak birden fazla dengeleme dalının bulunmasına izin veriyoruz, her zaman paralel olarak en az ikisini desteklemeyi ve gerektiğinde güvenlik düzeltmelerini geri göndermeyi düşünüyoruz. ![](../images/versioning-sketch-2.png)

Eski satırlar GitHub tarafından desteklenmeyecek, ancak diğer gruplar kendi kendilerine sahiplik ve backport kararlılığı ve güvenlik düzeltmeleri alabilir. Bunu birlikte cesaretlendiriyoruz çünkü birçok uygulamanın geliştiricileri için hayatı kolaylaştırdığının farkındayız.

# Beta Bültenleri ve Hata Düzeltmeleri

Geliştiriciler hangi sürümlerin *güvenli* olacağını bilmek istiyor. Görünüşte masum özellikler bile karmaşık uygulamalarda gerileme yaratabilir. Aynı zamanda sabit bir sürüme kilitleme tehlikelidir, çünkü sürümünüzden bu yana çıkan güvenlik yamalarını ve hata düzeltmelerini görmezden geliyorsunuzdur. Amacımız `package.json`'da aşağıdaki standart semver aralıklarına izin vermektir:

* Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
* Use `^2.0.0` to admit non-breaking *reasonably stable* feature work as well as security and bug fixes.

İkinci nokta ile ilgili önemli olan ` ^ </ 0> kullanan uygulamaların makul düzeyde bir kararlılık beklemesi gerektiğidir. Bunu gerçekleştirmek için Semver, belirli bir sürümün henüz <em>güvenli</em> veya <em>kararlı</em> olmadığını belirtmek için <em>yayın öncesi tanımlayıcıya</em> izin verir.</p>

<p>Hangisini seçerseniz seçin, bozucu değişiklikler Chromium hayatının bir gerçeği olduğu için periyodik olarak <code> package.json </ 0> sürümününe geçmek zorunda kalacaksınız.</p>

<p>Süreç şöyledir:</p>

<ol>
<li>Tüm yeni büyük ve küçük yayın satırları, <code>N >= 1` için `-beta.N` etiketi ile başlar. Tam da burada, özellik seti **kilitli** olur. Bu sürüm satırı, başka hiçbir özelliği kabul etmiyor ve yalnızca güvenlik kararlılıkları ile ilgilidir. örneğin `2.0.0-beta.1`.</li> 

* Hata düzeltmeleri, regresyon düzeltmeleri ve güvenlik yamaları kabul edilebilir. Bunu yaptıktan sonra `N` bir arttırılarak yeni bir beta yayınlandı. Örneğin. `2.0.0-beta.2`
* Belirli bir beta sürümünün kararlılığı *genel olarak kabul edilirse*, yalnızca sürüm bilgisi değiştirilerek, kararlı yapı olarak yeniden yayınlanacaktır. Örneğin. `2.0.0`.
* Gelecekteki hata düzeltmeleri veya güvenlik yamalarının yayın kararlı iken bir araya getirilmesi gerekiyorsa, bunlar uygulanır ve buna göre *yama* sürümü artırılır. Örneğin. `2.0.1`.</ol> 

Her büyük ve küçük darbe için, aşağıdakiler gibi bir şey beklemelisiniz:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

Resimlerdeki bir yaşam döngüsü:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* Paketin sürüm şemasına aktarılan bir hata düzelme uzmana gelir, Düzeltme eki uygulanır ve yeni bir beta sürümü şu şeklide yayınlanır `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* Beta *genellikle kararlı* olarak kabul edilir ve `2.0.0` altında tekrar beta olmayan olarak yayınlanır. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We pack-port the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Çeşitli semver aralıklarının yeni sürümleri nasıl alacağına ilişkin birkaç örnek:

![](../images/versioning-sketch-7.png)

# Kayıp Özellikler: Alfalar, ve Gececiler

Stratejimiz, şu an uygun olduğunu düşündüğümüz birkaç takas hattı içeriyor. En önemlisi, master'daki yeni özelliklerin kararlı bir sürüm hattına erişmeden önce biraz zaman alması. Hemen yeni bir özellik denemek isterseniz, Electron'u kendiniz kurmanız gerekecek.

Gelecekteki değerlendirmelerde, aşağıdakilerden birini veya her ikisini birlikte sunabiliriz:

* gece boyunca inşa eden ustalar; bunlar milletlerin yeni özellikleri hızlıca test etmesine ve geri bildirimde bulunmasına izin verecektir
* beta sürümlerine göre daha serbest denge kısıtlamaları olan alfa sürümleri; örneğin, bir denge kanalı *alpha* da ise, yeni özellikleri kabul etmek için izin verir

# Özellik bayrakları

Özellik bayrakları Chromium'da yaygın bir uygulamadır ve web geliştirme ekosisteminde iyi kurulmuştur. In the context of Electron, a feature flag or **soft branch** must have the following properties:

* çalışma ya da derleme zamanı sırasında etkinleştirilir/devre dışı bırakılır. Biz istek kapsamlı özellik bayrağı anlayışını desteklemiyoruz
* bu bölümler tamamen yeni ve eski kod yollarıdır: Bu yeni özellik yeni ve eski kodların yenıden yapılandırılması içindir *uygun değil* koşullu kontrat özellikleri
* belirleyici işaretler hassas bölümler birleştirildikten sonra doğal olarak kaldırılır

İşaretlenen kodu sürüm verme stratejimizle aşağıdaki şekilde eşleştiriyoruz:

1. istikrar dalında özellik işaretli kod üzerinde yinelemeyi düşünmüyoruz; Hatta özellik bayrakları dikkatli kullanımı risklidir
2. aPI sözleşmelerini özellik işaretli kodda, ana sözcüğe darbe indirmeden geçirebilirsiniz. İşaretlenen kod semver'e uymuyor olabilir

# Anlamsal örneklendirme

Biz güncelleme ve serbest bırakma sürecinin her düzeyinde netliği arttırmaya çalışıyoruz. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

* Semver ile sonuçlanan **major** tümseği ile başlamalıdır `BREAKING CHANGE:`.
* Semver ile sonuçlanan **minor** tümseği ile başlamalıdır `feat:`.
* Commits that would result in a semver **patch** bump must start with `fix:`.

* Sıkıştırılmış mesajın yukarıdaki ileti biçimine uyması koşuluyla, taahhütlerin ezilmesine izin veririz.

* Çekme isteğinde bulunan bazı taahhütlerin semantik önek içermemesi, aynı çekme isteğinden daha sonra yapılan bir taahhüt anlamlı bir mesaj içerdiği sürece kabul edilebilir.

# Versionless `master`

* The `master` branch will always contain `0.0.0-dev` in its `package.json`
* Serbest branşlar asla ustaya birleştirilmez
* Release branches *do* contain the correct version in their `package.json`