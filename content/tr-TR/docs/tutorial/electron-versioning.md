# Electron sürüm oluşturma

> Sürüm oluşturma politikamıza ve uygulamanıza ayrıntılı bir bakış.

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

```sh
npm install --save-dev electron
```

To update an existing project to use the latest stable version:

```sh
npm install --save-dev electron@latest
```

## Sürüm 1.x

Electron versions *< 2.0* did not conform to the [semver](http://semver.org) spec. Major versions corresponded to end-user API changes. Minor versions corresponded to Chromium major releases. Patch versions corresponded to new features and bug fixes. While convenient for developers merging features, it creates problems for developers of client-facing applications. The QA testing cycles of major apps like Slack, Stride, Teams, Skype, VS Code, Atom, and Desktop can be lengthy and stability is a highly desired outcome. There is a high risk in adopting new features while trying to absorb bug fixes.

Here is an example of the 1.x strategy:

![](../images/versioning-sketch-0.png)

An app developed with `1.8.1` cannot take the `1.8.3` bug fix without either absorbing the `1.8.2` feature, or by backporting the fix and maintaining a new release line.

## Sürüm 2.0 ve Ötesi

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

1. Semver'in sıkı kullanımı
2. Introduction of semver-compliant `-beta` tags
3. Introduction of [conventional commit messages](https://conventionalcommits.org/)
4. Açıkça tanımlanan stabilizasyon dalları
5. The `master` branch is versionless; only stability branches contain version information

Git dallanmasının nasıl çalıştığını, npm etiketinin nasıl çalıştığını, geliştiricilerin neler bekleyebileceğini ve değişikliklerin nasıl geri alınabileceğini ayrıntılı olarak ele alacağız.

# semver

From 2.0 onward, Electron will follow semver.

Below is a table explicitly mapping types of changes to their corresponding category of semver (e.g. Major, Minor, Patch).

* **Büyük Sürüm Artışları** 
    * Chromium sürümü güncellemeleri
    * node.js ana sürüm güncellemeleri
    * Elektron API kırma değişiklikleri
* **Küçük Versiyon Artımları** 
    * node.js küçük sürüm güncellemeleri
    * Electron non-breaking API changes
* **Yama Sürümü Artımları** 
    * node.js patch version updates
    * fix-related chromium patches
    * Electron hata düzeltmeleri

Çoğu krom güncellemesinin kırılma olarak değerlendirileceğini unutmayın. Geri gönderilebilecek düzeltmeler muhtemelen kiraz yamalar olarak seçilecek.

# Dengeleme Dalları

Dengeleme dalları, yalnızca emniyet veya istikrarla ilgili kiraz toplama taahhütlerini alarak, ustaya paralel çalışan dallardır. Bu dallar hiçbir zaman ustaya birleştirilmezler.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

Eşzamanlı olarak birden fazla dengeleme dalının bulunmasına izin veriyoruz, her zaman paralel olarak en az ikisini desteklemeyi ve gerektiğinde güvenlik düzeltmelerini geri göndermeyi düşünüyoruz. ![](../images/versioning-sketch-2.png)

Older lines will not be supported by GitHub, but other groups can take ownership and backport stability and security fixes on their own. We discourage this, but recognize that it makes life easier for many app developers.

# Beta Bültenleri ve Hata Düzeltmeleri

Developers want to know which releases are *safe* to use. Görünüşte masum özellikler bile karmaşık uygulamalarda gerileme yaratabilir. Aynı zamanda sabit bir sürüme kilitleme tehlikelidir, çünkü sürümünüzden bu yana çıkan güvenlik yamalarını ve hata düzeltmelerini görmezden geliyorsunuzdur. Our goal is to allow the following standard semver ranges in `package.json` :

* Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
* Use `^2.0.0` to admit non-breaking *reasonably stable* feature work as well as security and bug fixes.

İkinci nokta ile ilgili önemli olan ` ^ </ 0> kullanan uygulamaların makul düzeyde bir kararlılık beklemesi gerektiğidir. To accomplish this, semver allows for a <em>pre-release identifier</em> to indicate a particular version is not yet <em>safe</em> or <em>stable</em>.</p>

<p>Hangisini seçerseniz seçin, bozucu değişiklikler Chromium hayatının bir gerçeği olduğu için periyodik olarak <code> package.json </ 0> sürümününe geçmek zorunda kalacaksınız.</p>

<p>Süreç şöyledir:</p>

<ol>
<li>All new major and minor releases lines begin with a <code>-beta.N` tag for `N >= 1`. At that point, the feature set is **locked**. Bu sürüm satırı, başka hiçbir özelliği kabul etmiyor ve yalnızca güvenlik kararlılıkları ile ilgilidir. örneğin `2.0.0-beta.1`.</li> 

* Bug fixes, regression fixes, and security patches can be admitted. Upon doing so, a new beta is released incrementing `N`. e.g. `2.0.0-beta.2`
* If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`.
* If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented accordingly e.g. `2.0.1`.</ol> 

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

* En son özellik setini içeren yeni bir sürüm şubesi oluşturuldu. ` 2.0.0-beta.1 </ 0> olarak yayınlandı.
<img src="../images/versioning-sketch-3.png" alt="" /></li>
<li>A bug fix comes into master that can be pack-ported to the release branch. The patch is applied, and a new beta is published as <code>2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* The beta is considered *generally stable* and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We pack-port the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

Çeşitli semver aralıklarının yeni sürümleri nasıl alacağına ilişkin birkaç örnek:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas, and Nightly

Stratejimiz, şu an uygun olduğunu düşündüğümüz birkaç takas hattı içeriyor. En önemlisi, master'daki yeni özelliklerin kararlı bir sürüm hattına erişmeden önce biraz zaman alması. Hemen yeni bir özellik denemek isterseniz, Electron'u kendiniz kurmanız gerekecek.

Gelecekteki değerlendirmelerde, aşağıdakilerden birini veya her ikisini birlikte sunabiliriz:

* gece boyunca inşa eden ustalar; bunlar milletlerin yeni özellikleri hızlıca test etmesine ve geri bildirimde bulunmasına izin verecektir
* alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in *alpha*

# Özellik bayrakları

Özellik bayrakları Chromium'da yaygın bir uygulamadır ve web geliştirme ekosisteminde iyi kurulmuştur. In the context of Electron, a feature flag or **soft branch** must have the following properties:

* is is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
* it completely segments new and old code paths; refactoring old code to support a new feature *violates* the feature-flag contract
* feature flags are eventually removed after the soft-branch is merged

İşaretlenen kodu sürüm verme stratejimizle aşağıdaki şekilde eşleştiriyoruz:

1. istikrar dalında özellik işaretli kod üzerinde yinelemeyi düşünmüyoruz; Hatta özellik bayrakları dikkatli kullanımı risklidir
2. aPI sözleşmelerini özellik işaretli kodda, ana sözcüğe darbe indirmeden geçirebilirsiniz. İşaretlenen kod semver'e uymuyor olabilir

# Semantic Commits

We seek to increase clarity at all levels of the update and releases process. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

* Commits that would result in a semver **major** bump must start with `BREAKING CHANGE:`.
* Commits that would result in a semver **minor** bump must start with `feat:`.
* Commits that would result in a semver **patch** bump must start with `fix:`.

* Sıkıştırılmış mesajın yukarıdaki ileti biçimine uyması koşuluyla, taahhütlerin ezilmesine izin veririz.

* Çekme isteğinde bulunan bazı taahhütlerin semantik önek içermemesi, aynı çekme isteğinden daha sonra yapılan bir taahhüt anlamlı bir mesaj içerdiği sürece kabul edilebilir.

# Versionless `master`

* The `master` branch will always contain `0.0.0-dev` in its `package.json`
* Serbest branşlar asla ustaya birleştirilmez
* Release branches *do* contain the correct version in their `package.json`