# Electron sürüm oluşturma

> Sürüm oluşturma politikamıza ve uygulamanıza ayrıntılı bir bakış.

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

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

<h2 spaces-before="0">Sürüm 2.0 ve Ötesi</h2>

<p spaces-before="0">There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.</p>

<ol start="1">
<li>Semver'in sıkı kullanımı</li>
<li>Semver-uyumlu <code>-beta` etiketlerinin tanıtımı</li>
3 [Konvansiyonel taahhüt mesajları](https://conventionalcommits.org/)'na giriş
4 Well-defined stabilization branches
5 The `master` branch is versionless; only stabilization branches contain version information</ol>

Git dallanmasının nasıl çalıştığını, npm etiketinin nasıl çalıştığını, geliştiricilerin neler bekleyebileceğini ve değişikliklerin nasıl geri alınabileceğini ayrıntılı olarak ele alacağız.

# semver

Electron 2.0'dan itibaren semver'i izleyecek.

Aşağıda, değişiklik türlerini ilgili semver kategorilerine (örn. Majör, Minör, Yama) açıkça eşleyen bir tablo verilmiştir.

| Büyük Sürüm Artışları             | Küçük Versiyon Artımları             | Yama Sürümü Artımları         |
| --------------------------------- | ------------------------------------ | ----------------------------- |
| Elektron API kırma değişiklikleri | Elektron kırılmaz API değişiklikleri | Electron hata düzeltmeleri    |
| Node.js major version updates     | Node.js minor version updates        | Node.js patch version updates |
| Chromium sürümü güncellemeleri    |                                      | fix-related chromium yamaları |


Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# Dengeleme Dalları

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

Eşzamanlı olarak birden fazla dengeleme dalının bulunmasına izin veriyoruz, her zaman paralel olarak en az ikisini desteklemeyi ve gerektiğinde güvenlik düzeltmelerini geri göndermeyi düşünüyoruz. ![](../images/versioning-sketch-2.png)

Eski satırlar GitHub tarafından desteklenmeyecek, ancak diğer gruplar kendi kendilerine sahiplik ve backport kararlılığı ve güvenlik düzeltmeleri alabilir. Bunu birlikte cesaretlendiriyoruz çünkü birçok uygulamanın geliştiricileri için hayatı kolaylaştırdığının farkındayız.

# Beta Bültenleri ve Hata Düzeltmeleri

Geliştiriciler hangi sürümlerin _güvenli_ olacağını bilmek istiyor. Görünüşte masum özellikler bile karmaşık uygulamalarda gerileme yaratabilir. Aynı zamanda sabit bir sürüme kilitleme tehlikelidir, çünkü sürümünüzden bu yana çıkan güvenlik yamalarını ve hata düzeltmelerini görmezden geliyorsunuzdur. Amacımız `package.json`'da aşağıdaki standart semver aralıklarına izin vermektir:

* ` 2.0.0 </ 0> sürümünüze yalnızca kararlılık veya güvenlikle ilgili düzeltmeler kabul etmek için <code> ~ 2.0.0 </ 0> kullanın.</li>
<li>Güvenlik ve hata düzeltmelerinin yanı sıra kırılmaz <em x-id="4"> makul derecede kararlı </ 1> özellik işi kabul etmek için <code> ^ 2.0.0 </ 0> kullanın.</li>
</ul>

<p spaces-before="0">İkinci nokta ile ilgili önemli olan <code> ^ </ 0> kullanan uygulamaların makul düzeyde bir kararlılık beklemesi gerektiğidir. To accomplish this, semver allows for a <em x-id="4">pre-release identifier</em> to indicate a particular version is not yet <em x-id="4">safe</em> or <em x-id="4">stable</em>.</p>

<p spaces-before="0">Hangisini seçerseniz seçin, bozucu değişiklikler Chromium hayatının bir gerçeği olduğu için periyodik olarak <code> package.json </ 0> sürümününe geçmek zorunda kalacaksınız.</p>

<p spaces-before="0">Süreç şöyledir:</p>

<ol start="1">
<li>All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of <code>beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions:
    1. The change is backwards API-compatible (deprecations are allowed)
    2. The risk to meeting our stability timeline must be low.
2 If allowed changes need to be made once a release is beta, they are applied and the prerelease tag is incremented, e.g. `2.0.0-beta.2`.
3 If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`. After the first stable, all changes must be backwards-compatible bug or security fixes.
4 If future bug fixes or security patches need to be made once a release is stable, they are applied and the _patch_ version is incremented e.g. `2.0.1`.</ol>

Specifically, the above means:

1. Admitting non-breaking-API changes early in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort very late in the beta cycle is 👎 without a very good reason.

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

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* Beta _genellikle kararlı_ olarak kabul edilir ve `2.0.0` altında tekrar beta olmayan olarak yayınlanır. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Çeşitli semver aralıklarının yeni sürümleri nasıl alacağına ilişkin birkaç örnek:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas
Stratejimiz, şu an uygun olduğunu düşündüğümüz birkaç takas hattı içeriyor. En önemlisi, master'daki yeni özelliklerin kararlı bir sürüm hattına erişmeden önce biraz zaman alması. Hemen yeni bir özellik denemek isterseniz, Electron'u kendiniz kurmanız gerekecek.

Gelecekteki değerlendirmelerde, aşağıdakilerden birini veya her ikisini birlikte sunabiliriz:

* beta sürümlerine göre daha serbest denge kısıtlamaları olan alfa sürümleri; örneğin, bir denge kanalı _alpha_ da ise, yeni özellikleri kabul etmek için izin verir

# Özellik bayrakları
Özellik bayrakları Chromium'da yaygın bir uygulamadır ve web geliştirme ekosisteminde iyi kurulmuştur. Elektron bağlamında, özellik bayrağı veya ** soft branch </ 0> aşağıdaki özelliklere sahip olmalıdır:</p>

* it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
* bu bölümler tamamen yeni ve eski kod yollarıdır: Bu yeni özellik yeni ve eski kodların yenıden yapılandırılması içindir _uygun değil_ koşullu kontrat özellikleri
* feature flags are eventually removed after the feature is released

# Anlamsal örneklendirme

Biz güncelleme ve serbest bırakma sürecinin her düzeyinde netliği arttırmaya çalışıyoruz. ` 2.0.0 </ 0> ile başlayarak, aşağıdaki gibi özetlenebilecek olan <a href="https://conventionalcommits.org/"> Konvansiyonel Karar Verme </ 1> spesifikasyonuna uymak için çekme talepleri isteyeceğiz:</p>

<ul>
<li>Commits that would result in a semver <strong x-id="1">major</strong> bump must start their body with <code>BREAKING CHANGE:`.</li>
* Semver ile sonuçlanan **minor** tümseği ile başlamalıdır `feat:`.
* Semver ** yamasına yol açacak komitelerin </ 0> bump'ı ` fix: </ 1> ile başlamalıdır.</p></li>
<li><p spaces-before="0">Sıkıştırılmış mesajın yukarıdaki ileti biçimine uyması koşuluyla, taahhütlerin ezilmesine izin veririz.</p></li>
<li>It is acceptable for some commits in a pull request to not include a semantic prefix, as long as the pull request title contains a meaningful encompassing semantic message.</li>
</ul>

<h1 spaces-before="0">Versioned <code>master`</h1>

- The `master` branch will always contain the next major version `X.0.0-nightly.DATE` in its `package.json`
- Serbest branşlar asla ustaya birleştirilmez
- Release branches _do_ contain the correct version in their `package.json`
- As soon as a release branch is cut for a major, master must be bumped to the next major.  I.e. `master` is always versioned as the next theoretical release branch
