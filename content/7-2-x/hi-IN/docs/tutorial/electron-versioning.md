# इलेक्ट्रॉन वर्ज़निंग

> हमारी वर्ज़निंग नीति और उसके कार्यान्वयन पर एक विस्तृत लेख |

As of version 2.0.0, Electron follows [semver](#semver). The following command will install the most recent stable build of Electron:

```sh
npm install --save-dev electron
```

एक मौज़ूदा प्रोजेक्ट को नवीनतम स्थिर संस्करण तक अपडेट करने के लिए:

```sh
npm install --save-dev electron@latest
```

## संस्करण 1.x

Electron versions *< 2.0* did not conform to the [semver](http://semver.org) spec: major versions corresponded to end-user API changes, minor versions corresponded to Chromium major releases, and patch versions corresponded to new features and bug fixes. हालाँकि यह उन डेवलपर्स के लिए आरामदायक हैं जो सुविधायें जोड़ते हैं, पर क्लाइंट-फेसिंग एप्लीकेशनस के डेवलपर्स के लिए यह मुश्किलें कड़ी करते हैं | स्लैक, टीम्स, स्काइप, वीएस कोड, एटम, और डेस्कटॉप जैसी मुख्य एप्प्स के क्युऐ परिक्षण चरण काफी लम्बे हो सकते हैं और स्थिरता बेहद आवश्यक निश्कर्ष है | त्रुटियों को सही करने के दौरान नयी सुविधायें को अपनाने में बहुत बड़ा खतरा है |

1.x रणनीति का एक उदाहरण:

![](../images/versioning-sketch-0.png)

`1.8.1` से निर्मित एप्प बिना `1.8.2` की सुविधा अपनायें `1.8.3` का बग फिक्स इस्तेमाल नहीं कर सकती, या फिर वह फिक्स को बैकपोर्ट करें और फिर एक नयी रिलीज़ पंक्ति को बनाये रखें |

## संस्करण 2.0 और उससे आगे

There are several major changes from our 1.x strategy outlined below. Each change is intended to satisfy the needs and priorities of developers/maintainers and app developers.

1. semver का कड़ाई से इस्तेमाल
2. semver-अनुरूप `-beta` टैग से परिचय
3. [पारंपरिक कमिट संदेशों](https://conventionalcommits.org/) से परिचय
4. Well-defined stabilization branches
5. The `master` branch is versionless; only stabilization branches contain version information

गिट शाखा, एनपीएम टैगिंग, डेवलपर्स को कैसी अपेक्षा रखनी चाहिये, और कैसे कोई बैकपोर्ट परिवर्तन करें, इन सब चीजों पर हम विस्तार से बात करेंगे |

# semver

2.0 संस्करण से, इलेक्ट्रॉन semver का पालन करेगा।

नीचे एक टेबल दिया गया है जो परिवर्तनों के प्रकारों को उनके अनुरूप semver की श्रेणी (जैसे कि मुख्य, लघु, पैच आदि) से मैप करता है |

| मुख्य संस्करण वृद्धि               | लघु संस्करण वृद्धि                     | पैच संस्करण वृद्धि            |
| ---------------------------------- | -------------------------------------- | ----------------------------- |
| इलेक्ट्रॉन ब्रेकिंग ऐपीआई परिवर्तन | इलेक्ट्रॉन नॉन-ब्रेकिंग ऐपीआई परिवर्तन | इलेक्ट्रॉन बग-फिक्सेस         |
| Node.js major version updates      | Node.js minor version updates          | Node.js patch version updates |
| क्रोमियम संस्करण अपडेटस            |                                        | त्रुटी-सुधार क्रोमियम पैच     |


Note that most Chromium updates will be considered breaking. Fixes that can be backported will likely be cherry-picked as patches.

# स्थिरीकरण शाखायें

Stabilization branches are branches that run parallel to master, taking in only cherry-picked commits that are related to security or stability. These branches are never merged back to master.

![](../images/versioning-sketch-1.png)

Stabilization branches are always either **major** or **minor** version lines, and named against the following template `$MAJOR-$MINOR-x` e.g. `2-0-x`.

हम विभिन्न स्थिरीकरण शाखाओं को एक साथ मौज़ूद होने की सुविधा प्रदान करते हैं, और हमारा उद्देश्य है कि हर समय कम से कम 2 शाखाओं को एक साथ समर्थित करें, और आवश्यकता अनुसार सुरक्षा सुधार बैकपोर्ट करते रहें | ![](../images/versioning-sketch-2.png)

पुरानी पंक्तियाँ गिटहब द्वारा समर्थित नहीं होगी, पर दुसरे समहू स्वामित्व प्राप्त कर सकते हैं और खुद ही स्थिरता और सुरक्षा सुधार बैकपोर्ट कर सकते हैं | हम ऐसा न करने की सलाह देते हैं, पर यह भी समझते हैं की इससे एप्प डेवलपर्स का काम काफी आसान हो जाता है |

# बीटा रिलीज़ और बग फिक्सेस

डेवलपर्स जानना चाहते हैं कि कौन सी रिलीजिज़ इस्तेमाल करने के लिए_सुरक्षित_ हैं | हानिरहित दिखने वाली सुविधायें भी जटिल एप्लीकेशनस में त्रुटियाँ ला सकती हैं | पर साथ ही, एक स्थायी संस्करण पर टिके रहना काफी ख़तरनाक हो सकता है क्योंकि आप सुरक्षा पैच और बग फिक्सेस को नज़रअंदाज़ कर रहे हैं जो आप के इस्तेमाल में आने वाले संस्करण के बाद जारी किये गये हों | हमारा लक्ष्य, `package.json` में निम्नलिखित मानक semver सीमाओं को अनुमति देने का है:

* `2.0.0` में स्थिरता या सुरक्षा सम्बंधित फिक्सेस लाने के लिए ही `~2.0.0` का इस्तेमाल करें |
* `^2.0.0` का इस्तेमाल नॉन-ब्रेकिंग _काफी हद तक स्थिर_ सुविधाओं और साथ ही सुरक्षा और बग फिक्सेस को अनुमति देने के लिए करें |

दूसरी बिंदु में जो आवश्यक बात है वह यह कि `^` को इस्तेमाल करने वाली एप्प्स भी कुछ हद तक स्थिरता की अपेक्षा रख सकें | To accomplish this, semver allows for a _pre-release identifier_ to indicate a particular version is not yet _safe_ or _stable_.

आप कुछ भी चुनें, पर आपको समय-समय पर `package.json` का संस्करण बढ़ाना ही होगा क्योंकि ब्रेकिंग चेंजेस क्रोमियम जीवन का एक सत्य है |

इसकी प्रक्रिया निम्नलिखित है:

1. All new major and minor releases lines begin with a beta series indicated by semver prerelease tags of `beta.N`, e.g. `2.0.0-beta.1`. After the first beta, subsequent beta releases must meet all of the following conditions:
    1. The change is backwards API-compatible (deprecations are allowed)
    2. The risk to meeting our stability timeline must be low.
2. If allowed changes need to be made once a release is beta, they are applied and the prerelease tag is incremented, e.g. `2.0.0-beta.2`.
3. If a particular beta release is _generally regarded_ as stable, it will be re-released as a stable build, changing only the version information. e.g. `2.0.0`. After the first stable, all changes must be backwards-compatible bug or security fixes.
4. If future bug fixes or security patches need to be made once a release is stable, they are applied and the _patch_ version is incremented e.g. `2.0.1`.

Specifically, the above means:

1. Admitting non-breaking-API changes before Week 3 in the beta cycle is okay, even if those changes have the potential to cause moderate side-affects
2. Admitting feature-flagged changes, that do not otherwise alter existing code paths, at most points in the beta cycle is okay. Users can explicitly enable those flags in their apps.
3. Admitting features of any sort after Week 3 in the beta cycle is 👎 without a very good reason.

For each major and minor bump, you should expect to see something like the following:

```plaintext
2.0.0-beta.1
2.0.0-beta.2
2.0.0-beta.3
2.0.0
2.0.1
2.0.2
```

तस्वीरों में एक जीवनकाल का उदाहरण:

* A new release branch is created that includes the latest set of features. It is published as `2.0.0-beta.1`. ![](../images/versioning-sketch-3.png)
* A bug fix comes into master that can be backported to the release branch. The patch is applied, and a new beta is published as `2.0.0-beta.2`. ![](../images/versioning-sketch-4.png)
* बीटा को _सामान्यतः स्थिर_ मान जाता है और उसे दोबारा नॉन-बीटा के रूप में `2.0.0` के नीचे प्रकाशित किया जाता है | ![](../images/versioning-sketch-5.png)
* Later, a zero-day exploit is revealed and a fix is applied to master. We backport the fix to the `2-0-x` line and release `2.0.1`. ![](../images/versioning-sketch-6.png)

कुछ उदाहरण कि कैसे semver सीमायें नयी रिलीज़िस चुनती हैं:

![](../images/versioning-sketch-7.png)

# Missing Features: Alphas
हमारी रणनीति की भी कुछ खामियाँ है, पर हम समझते हैं कि फिलहाल उनसे कोई फर्क नहीं पड़ता | ख़ासकर यह कि मास्टर में नयी सुविधायें शामिल करने में कुछ समय लग सकता है, इससे पहले कि वह एक स्थिर रिलीज़ पंक्ति तक पहुंचे | अगर आप नयी सुविधाओं को तुरंत ही इस्तेमाल करना चाहते हैं, तो आप को खुद ही इलेक्ट्रॉन का निर्माण करना होगा |

भविष्य को ध्यान में रखते हुए, हम निम्नलिखित में से एक या दोनों को ला सकते हैं:

* अल्फा रिलीज़िस जिनके पास बीटा से ज्यादा लचीले स्थिरता तत्व हैं; जैसे कि इस बात की अनुमति होगी कि जब एक स्थिरता चैनल _अल्फा_ में मौज़ूद हो, तब भी नयी सुविधाओं को शामिल किया जा सके |

# फीचर ध्वज
फीचर ध्वज क्रोमियम में काफी आम हैं, और वेब-डेवलपमेंट वातावरण में बहुत अच्छी तरह से स्थापित हैं | इलेक्ट्रॉन के सन्दर्भ में, एक फीचर ध्वज या **सॉफ्ट ब्रांच** के निम्नलिखित गुण होने चाहियें:

* it is enabled/disabled either at runtime, or build-time; we do not support the concept of a request-scoped feature flag
* उसे नये और पुराने कोड पथों को बिल्कुल अलग रखना चाहिये; पुराने कोड को नये फीचर समर्थित के लिए बदलने से फीचर-ध्वज अनुबंध का _उल्लंघन _ होता है
* feature flags are eventually removed after the feature is released

# सिमेंटिक कम्मिट्स

हमारा लक्ष्य अपडेट और रिलीज़ प्रक्रिया के हर स्तर पर पारदर्शिता बढ़ाना है | `2.0.0` से शुरुआत करते हुए, हमे सभी पुल रिक्वेस्ट [कन्वेंशनल कम्मिट्स](https://conventionalcommits.org/) स्पेक का पालन करने वाली चाहिये होंगी, जिनका सारांश निम्नलिखित है:

* Commits that would result in a semver **major** bump must start their body with `BREAKING CHANGE:`.
* कम्मिट्स जिनका परिणाम सेमवर **लघु** बढ़त होगा, वे `feat:` से शुरू होने चाहियें |
* कम्मिट्स जिनका परिणाम सेमवर **पैच** बढ़त होगा, वे `fix:` से शुरू होने चाहियें |

* हम कम्मिट्स के स्क्वाशिंग की अनुमति देते हैं, बस स्क्वाशड सन्देश ऊपर दिए गये सन्देश फॉर्मेट का पालन करता हो |
* It is acceptable for some commits in a pull request to not include a semantic prefix, as long as the pull request title contains a meaningful encompassing semantic message.

# Versioned `master`

- The `master` branch will always contain the next major version `X.0.0-nightly.DATE` in its `package.json`
- रिलीज़ शाखायें कभी भी वापस मास्टर शाखा में संयोजित नहीं की जाती
- रिलीज़ शाखायें सही संस्करण को शामिल _करती_ हैं अपने `package.json` में
- As soon as a release branch is cut for a major, master must be bumped to the next major.  I.e. `master` is always versioned as the next theoretical release branch
