# स्नेपक्राफ्ट गाइड (उबुन्तु सॉफ्टवेर सेंटर & अधिक)

यह गाइड इलेक्ट्रॉन एप्लीकेशन को किसी भी स्नेपक्राफ्ट वातावरण के लिए, (जिसमे उबुन्तु सॉफ्टवेर सेंटर शामिल है) पैकेज करने के लिए जानकारी उपलब्ध कराती है |

## पृष्ठभूमि और आवश्यकतायें

व्यापक लिनक्स समुदाय का साथ चल कर, कैनोनिकल का मकसद [`स्नेपक्राफ्ट`](https://snapcraft.io/) परियोजना के साथ होने वाली कई सारी आम सॉफ्टवेयर इंस्टालेशन सम्बंधित दिक्कतों को दूर करना है | स्नेप्स कंटेनराआइज़ड सॉफ्टवेर पैकेज हैं जिनमें ज़रूरी निर्भार्तायें शामिल होती हैं, स्वतः-अपडेट होते हैं, और ये सभी प्रमुख लिनक्स वितरणों पर बिना सिस्टम बदलावों के काम करते हैं |

एक `.snap` फाइल का निर्माण करने के 3 तरीके हैं:

1) [`इलेक्ट्रॉन-फोर्ज`](https://github.com/electron-userland/electron-forge) या [`इलेक्ट्रॉन-बिल्डर`](https://github.com/electron-userland/electron-builder) का इस्तेमाल कर, ये दोनों `स्नेप` सपोर्ट के साथ आउट ऑफ़ दा बॉक्स आते हैं | यह सबसे आसान विकल्प है | 2) `इलेक्ट्रॉन-इंस्टालर-स्नेप` का इस्तेमाल कर, जो कि `इलेक्ट्रॉन-पैकेजर` का आउटपुट लेता है | 3) पहले से निर्मित एक `.deb` पैकेज का इस्तेमाल कर |

सभी मामलों में, `स्नेपक्राफ्ट` टूल इनस्टॉल होना चाहिये | हम उबुन्तु 16.04 (या वर्तमान LTS) के ऊपर निर्माण करने की सलाह देते हैं |

```sh
snap install snapcraft --classic
```

हालाँकि *यह संभव* है कि `स्नेपक्राफ्ट` को होमब्रिऊ का इस्तेमाल कर मैकओएस पर इनस्टॉल किया जा सके, पर वह `स्नेप` पैकेजेस का निर्माण करने में सक्षम नहीं है और उसका ध्यान स्टोर में पैकेजेस का प्रबंधन करने पर केन्द्रित है |

## `इलेक्ट्रॉन-इंस्टालर-स्नेप` का इस्तेमाल

मोड्यूल [`electron-winstaller`](https://github.com/electron/windows-installer) और इसी तरह के मोडयुल्स की तरह काम करता है कि इसकी परिधि स्नेप पैकेजेस का निर्माण करने तक ही सीमित है | आप इसको इनस्टॉल कर सकते है इसके साथ:

```sh
npm install --save-dev electron-installer-snap
```

### पहला चरण: अपनी इलेक्ट्रॉन एप्लीकेशन पैकेज करें

[इलेक्ट्रॉन-पैकेजर](https://github.com/electron-userland/electron-packager) (या ऐसे ही किसी दुसरे औज़ार) से एप्लीकेशन को पैकेज करें | Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

आउटपुट कुछ इस तरह का दिखना चाहिये:

```text
.
└── dist
    └── app-linux-x64
        ├── LICENSE
        ├── LICENSES.chromium.html
        ├── content_shell.pak
        ├── app
        ├── icudtl.dat
        ├── libgcrypt.so.11
        ├── libnode.so
        ├── locales
        ├── natives_blob.bin
        ├── resources
        ├── snapshot_blob.bin
        └── version
```

### दूसरा चरण: `इलेक्ट्रॉन-इंस्टालर-स्नेप` को चलाना

एक टर्मिनल जिसके `पथ` में `स्नेपक्राफ्ट` शामिल हो, उससे केवल `--src` पैरामीटर के साथ`इलेक्ट्रॉन-इंस्टालर-स्नेप` चलायें, जो कि पहले चरण में निर्मित आपकी पैकेज्ड इलेक्ट्रॉन एप्लीकेशन का स्थान है |

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

अगर आपके पास एक पहले से निर्मित पाइपलाइन है, तो आप `इलेक्ट्रॉन-इंस्टालर-स्नेप` को प्रोग्रामेटिकल्ली भी इस्तेमाल कर सकते हैं | और अधिक जानकारी के लिए, कृपया [स्नेपक्राफ्ट ऐपीआई डॉक्स](https://docs.snapcraft.io/build-snaps/syntax) देखें |

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## एक मौजूदा डेबियन पैकेज का इस्तेमाल करना

स्नेपक्राफ्ट एक मौज़ूदा `.deb` को लेकर उसे एक `.snap` फाइल में बदलने में सक्षम है | एक `snapcraft.yaml` फाइल जो कि स्त्रोत, निर्भार्तायें, विवरण, और अन्य मुख्य निर्माण ब्लॉक्स का वर्णन करती है, उसका इस्तेमाल कर एक स्नेप का निर्माण कॉन्फ़िगर किया जाता है |

### पहला चरण: एक डेबियन पैकेज का निर्माण करें

अगर आपके पास पहले से एक `.deb` पैकेज उपलब्ध नहीं है, तो स्नेप पैकेजेस का निर्माण करने के लिए `इलेक्ट्रॉन-इंस्टालर-स्नेप` का इस्तेमाल करना एक ज्यादा आसान मार्ग है | हालाँकि, डेबियन पैकेजेस का निर्माण करने के लिए विभिन्न तरीके मौज़ूद हैं, जिनमे [`इलेक्ट्रॉन-फोर्ज`](https://github.com/electron-userland/electron-forge), [`इलेक्ट्रॉन-बिल्डर`](https://github.com/electron-userland/electron-builder) या [`इलेक्ट्रॉन-इंस्टालर-डेबियन`](https://github.com/unindented/electron-installer-debian) शामिल हैं |

### दूसरा चरण: एक snapcraft.yaml का निर्माण करें

उपलब्ध कॉन्फ़िगरेशन विकल्पों के बारे में और ज्यादा जानकारी के लिए, [स्नेपक्राफ्ट सिंटेक्स पर मौज़ूद दस्तावेज़ीकरण](https://docs.snapcraft.io/build-snaps/syntax) पढ़ें | आइये एक उदाहरण देखते हैं:

```yaml
name: myApp
version: '2.0.0'
summary: एप्प का एक छोटा सा विवरण |
description: |
क्या आपको पता है? यह एप्प शानदार है! यह आपके लिए सब चीज़े करती है | कुछ लोग कहते हैं कि यह आपको जवान रखती है, शायद खुश भी |

grade: stable
confinement: classic

parts:
  slack:
    plugin: dump
    source: my-deb.deb
    source-type: deb
    after:

      - desktop-gtk3
    stage-packages:
      - libasound2
      - libgconf2-4
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  electron-launch:
    plugin: dump
    source: files/
    prepare: |
      chmod +x bin/electron-launch

apps:
  myApp:
    command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    # क्रोमियम फ्रेमवर्क/इलेक्ट्रॉन के लिए TMPDIR पथ सही करें ताकि यह सुनिश्चित किया जा सके
    # libappindicator के पास पढ़े जाने योग्य संसाधन उपलब्ध हो |
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

या फिर, अगर आप `स्नेप` को `विशुद्ध` कन्फायीनमेंट के साथ बना रहे हैं, तो आप `desktop-launch` कमांड का इस्तेमाल कर सकते हैं:

```yaml
apps:
  myApp:
   # क्रोमियम फ्रेमवर्क/इलेक्ट्रॉन के लिए TMPDIR पथ सही करें ताकि यह सुनिश्चित किया जा सके
    # libappindicator के पास पढ़े जाने योग्य संसाधन उपलब्ध हो |
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```