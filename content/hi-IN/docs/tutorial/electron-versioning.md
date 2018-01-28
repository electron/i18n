# इलेक्ट्रॉन वर्ज़निंग

> हमारी वर्ज़निंग नीति और उसके कार्यान्वयन पर एक विस्तृत लेख |

संस्करण 2.0.0 से, इलेक्ट्रॉन [semver](#semver) का प्रयोग करता है | निम्नलिखित कमांड इलेक्ट्रॉन की सबसे नवीनतम स्थिर बनावट इनस्टॉल करती है:

```sh
npm install --save-dev electron
```

एक मौज़ूदा प्रोजेक्ट को नवीनतम स्थिर संस्करण तक अपडेट करने के लिए:

```sh
npm install --save-dev electron@latest
```

## संस्करण 1.x

इलेक्ट्रॉन संस्करण *< 2.0*, [semver](http://semver.org) स्पेक के अनुरूप नहीं थें | मुख्य संस्करण एंड-यूजर ऐपीआई परिवर्तनों के अनुकूल हैं | लघु संस्करण क्रोमियम की मुख्य रिलीज़ के अनुरूप हैं | पैच संस्करण नयी सुविधाओं और बग फिक्सेस के अनुकूल हैं | हालाँकि यह उन डेवलपर्स के लिए आरामदायक हैं जो सुविधायें जोड़ते हैं, पर क्लाइंट-फेसिंग एप्लीकेशनस के डेवलपर्स के लिए यह मुश्किलें कड़ी करते हैं | स्लैक, टीम्स, स्काइप, वीएस कोड, एटम, और डेस्कटॉप जैसी मुख्य एप्प्स के क्युऐ परिक्षण चरण काफी लम्बे हो सकते हैं और स्थिरता बेहद आवश्यक निश्कर्ष है | त्रुटियों को सही करने के दौरान नयी सुविधायें को अपनाने में बहुत बड़ा खतरा है |

1.x रणनीति का एक उदाहरण:

![](../images/versioning-sketch-0.png)

`1.8.1` से निर्मित एप्प बिना `1.8.2` की सुविधा अपनायें `1.8.3` का बग फिक्स इस्तेमाल नहीं कर सकती, या फिर वह फिक्स को बैकपोर्ट करें और फिर एक नयी रिलीज़ पंक्ति को बनाये रखें |

## संस्करण 2.0 और उससे आगे

हमारी 1.x रणनीति से कई सारे परिवर्तन हुए हैं, जो नीचे दिए गये हैं | हर परिवर्तन का उद्देश्य डेवलपर्स/मैन्तैनेर्स और एप्प डेवलपर्स की ज़रूरतों और प्राथमिकताओं को संतुष्ट करना है |

1. semver का कड़ाई से इस्तेमाल
2. semver-अनुरूप `-beta` टैग से परिचय
3. [पारंपरिक कमिट संदेशों](https://conventionalcommits.org/) से परिचय
4. स्पष्ट रूप से परिभाषित स्थिरीकरण शाखायें
5. `master` शाखा बिना संस्करण के है; केवल स्थिरता शाखाओं के पास संस्करण जानकारी उपलब्ध है

गिट शाखा, एनपीएम टैगिंग, डेवलपर्स को कैसी अपेक्षा रखनी चाहिये, और कैसे कोई बैकपोर्ट परिवर्तन करें, इन सब चीजों पर हम विस्तार से बात करेंगे |

# semver

2.0 संस्करण से, इलेक्ट्रॉन semver का पालन करेगा।

नीचे एक टेबल दिया गया है जो परिवर्तनों के प्रकारों को उनके अनुरूप semver की श्रेणी (जैसे कि मुख्य, लघु, पैच आदि) से मैप करता है |

* **मुख्य संस्करण वृद्धि** 
    * क्रोमियम संस्करण अपडेटस
    * नोड.जेएस मुख्य संस्करण अपडेटस
    * इलेक्ट्रॉन ब्रेकिंग ऐपीआई परिवर्तन
* **लघु संस्करण वृद्धि** 
    * नोड.जेएस लघु संस्करण अपडेटस
    * इलेक्ट्रॉन नॉन-ब्रेकिंग ऐपीआई परिवर्तन
* **पैच संस्करण वृद्धि** 
    * नोड.जेएस पैच संस्करण अपडेटस
    * त्रुटी-सुधार क्रोमियम पैच
    * इलेक्ट्रॉन बग-फिक्सेस

ध्यान दें कि ज्यादातर क्रोमियम अपडेटस ब्रेकिंग माने जायेंगे | सुधार जिन्हें बैकपोर्ट किया जा सके, उन्हीं में से कुछ के पैच के तौर पर चुने जाने की संभावना है |

# स्थिरीकरण शाखायें

स्थिरीकरण शाखायें वे शाखायें हैं जो मास्टर के साथ-साथ चलती हैं, और केवल उन ख़ास कमिटस को चुनती हैं जो सुरक्षा या स्थिरता से सम्बंधित हैं | ये शाखायें कभी भी मास्टर में विलय नहीं की जाती |

![](../images/versioning-sketch-1.png)

स्थिरीकरण शाखायें हमेशा **मुख्य** या **लघु** संस्करण पंक्ति होती हैं, और इनका नाम निन्मलिखित टेम्पलेट `$MAJOR-$MINOR-x` e.g. `2-0-x` के अनुरूप होता है |

हम विभिन्न स्थिरीकरण शाखाओं को एक साथ मौज़ूद होने की सुविधा प्रदान करते हैं, और हमारा उद्देश्य है कि हर समय कम से कम 2 शाखाओं को एक साथ समर्थित करें, और आवश्यकता अनुसार सुरक्षा सुधार बैकपोर्ट करते रहें | ![](../images/versioning-sketch-2.png)

Older lines will not be supported by GitHub, but other groups can take ownership and backport stability and security fixes on their own. We discourage this, but recognize that it makes life easier for many app developers.

# Beta Releases and Bug Fixes

Developers want to know which releases are *safe* to use. Even seemingly innocent features can introduce regressions in complex applications. At the same time, locking to a fixed version is dangerous because you’re ignoring security patches and bug fixes that may have come out since your version. Our goal is to allow the following standard semver ranges in `package.json` :

* Use `~2.0.0` to admit only stability or security related fixes to your `2.0.0` release.
* Use `^2.0.0` to admit non-breaking *reasonably stable* feature work as well as security and bug fixes.

What’s important about the second point is that apps using `^` should still be able to expect a reasonable level of stability. To accomplish this, semver allows for a *pre-release identifier* to indicate a particular version is not yet *safe* or *stable*.

Whatever you choose, you will periodically have to bump the version in your `package.json` as breaking changes are a fact of Chromium life.

The process is as follows:

1. All new major and minor releases lines begin with a `-beta.N` tag for `N >= 1`. At that point, the feature set is **locked**. That release line admits no further features, and focuses only on security and stability. e.g. `2.0.0-beta.1`.
2. Bug fixes, regression fixes, and security patches can be admitted. Upon doing so, a new beta is released incrementing `N`. e.g. `2.0.0-beta.2`
3. If a particular beta release is *generally regarded* as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the *patch* version is incremented accordingly e.g. `2.0.1`.

For each major and minor bump, you should expect too see something like the following:

```text
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

An example lifecycle in pictures:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be pack-ported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* The beta is considered *generally stable* and it is published again as a non-beta under `2.0.0`. ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We pack-port the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

A few examples of how various semver ranges will pick up new releases:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas, and Nightly

Our strategy has a few tradeoffs, which for now we feel are appropriate. Most importantly that new features in master may take a while before reaching a stable release line. If you want to try a new feature immediately, you will have to build Electron yourself.

As a future consideration, we may introduce one or both of the following:

* nightly builds off of master; these would allow folks to test new features quickly and give feedback
* alpha releases that have looser stability constraints to betas; for example it would be allowable to admit new features while a stability channel is in *alpha*

# Feature Flags

Feature flags are a common practice in Chromium, and are well-established in the web-development ecosystem. In the context of Electron, a feature flag or **soft branch** must have the following properties:

* is is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
* it completely segments new and old code paths; refactoring old code to support a new feature *violates* the feature-flag contract
* feature flags are eventually removed after the soft-branch is merged

We reconcile flagged code with our versioning strategy as follows:

1. we do not consider iterating on feature-flagged code in a stability branch; even judicious use of feature flags is not without risk
2. you may break API contracts in feature-flagged code without bumping the major version. Flagged code does not adhere to semver

# Semantic Commits

We seek to increase clarity at all levels of the update and releases process. Starting with `2.0.0` we will require pull requests adhere to the [Conventional Commits](https://conventionalcommits.org/) spec, which can be summarized as follows:

* Commits that would result in a semver **major** bump must start with `BREAKING CHANGE:`.
* Commits that would result in a semver **minor** bump must start with `feat:`.
* Commits that would result in a semver **patch** bump must start with `fix:`.

* We allow squashing of commits, provided that the squashed message adheres the the above message format.

* It is acceptable for some commits in a pull request to not include a semantic prefix, as long as a later commit in the same pull request contains a meaningful encompassing semantic message.

# Versionless `master`

* The `master` branch will always contain `0.0.0-dev` in its `package.json`
* Release branches are never merged back to master
* Release branches *do* contain the correct version in their `package.json`