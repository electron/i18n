# हेडलेस सीआई सिस्टम (ट्रेविस सीआई, जेनकिंस) पर परिक्षण

क्रोमियम पर आधारित होने के कारण, इलेक्ट्रॉन को कार्य करने के लिए एक डिस्प्ले ड्राइवर की आवश्यकता होती है । If Chromium can't find a display driver, Electron will fail to launch - and therefore not executing any of your tests, regardless of how you are running them. इसलिए इलेक्ट्रॉन आधारित एप्प्स का त्रविस, सर्किल, जेन्किन्स या ऐसे ही अन्य सिस्टम्स पर परिक्षण करने के लिए थोड़ी सी कॉन्फ़िगरेशन की आवश्यकता होती है | संक्षेप में, हमे एक वर्चुअल डिस्प्ले ड्राईवर की ज़रुरत है |

## वर्चुअल डिस्प्ले सर्वर को कॉन्फ़िगर करना

पहले, [एक्स वी ऍफ़ बी](https://en.wikipedia.org/wiki/Xvfb) इनस्टॉल करें | यह एक वर्चुअल फ्रेमबफर है, जो कि x11 डिस्प्ले सर्वर प्रोटोकॉल का इस्तेमाल करता है - यह बिना कोई स्क्रीन आउटपुट दिखाये सभी ग्राफिकल प्रक्रियाओं को मेमोरी में क्रियान्वित करता है, और हमे यही चाहिये |

Then, create a virtual Xvfb screen and export an environment variable called DISPLAY that points to it. इलेक्ट्रॉन में मौज़ूद क्रोमियम स्वतः ही `$DISPLAY` को ढूंढ लेगा, तो इसलिए आपकी एप्प को और कोई कॉन्फ़िगरेशन की ज़रुरत नहीं पड़ेगी | This step can be automated with Anaïs Betts' [xvfb-maybe](https://github.com/anaisbetts/xvfb-maybe): Prepend your test commands with `xvfb-maybe` and the little tool will automatically configure Xvfb, if required by the current system. On Windows or macOS, it will do nothing.

```sh
## On Windows or macOS, this invokes electron-mocha
## On Linux, if we are in a headless environment, this will be equivalent
## to xvfb-run electron-mocha ./test/*.js
xvfb-maybe electron-mocha ./test/*.js
```

### त्रविस सीआई

त्रविस पर, आपकी `.त्रविस.वायएमएल` कुछ इस तरह से लगनी चाहिये:

```yml
ऐडओंस:
   ऐपीटी:
     पैकेज:
       - एक्सवीऍफ़बी
 इनस्टॉल:
   - एक्सपोर्ट डिस्प्ले=':99.0'
   - एक्सवीऍफ़बी :99 -स्क्रीन 0 1024x768x24 > /डेव/नल्ल 2>&1 &
```

### जेन्किन्स

जेन्किन्स के लिए, एक [एक्सवीऍफ़बी प्लगइन उपलब्ध है](https://wiki.jenkins-ci.org/display/JENKINS/Xvfb+Plugin) |

### सर्किल सीआई

Circle CI is awesome and has Xvfb and `$DISPLAY` [already set up, so no further configuration is required](https://circleci.com/docs/environment#browsers).

### एप्पवेयोर

एप्पवेयोर विंडोज पर चलता है, सेलेनियम, क्रोमियम, इलेक्ट्रॉन और ऐसे ही अन्य टूल्स को सीधे ही सपोर्ट करता है - किसी कॉन्फ़िगरेशन की ज़रुरत नहीं है |
