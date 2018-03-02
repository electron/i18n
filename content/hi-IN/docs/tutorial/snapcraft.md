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

[इलेक्ट्रॉन-पैकेजर](https://github.com/electron-userland/electron-packager) (या ऐसे ही किसी दुसरे औज़ार) से एप्लीकेशन को पैकेज करें | अपनी पूर्ण एप्लीकेशन में जो `नोड_मोड्यूलस` आपको नहीं चाहिये, उन्हें ज़रूर निकाल दें, नहीं तो गैर-ज़रूरी मोड्यूलस बस आपकी एप्लीकेशन का आकार ही बढ़ायेंगे |

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

From a terminal that has `snapcraft` in its `PATH`, run `electron-installer-snap` with the only required parameter `--src`, which is the location of your packaged Electron application created in the first step.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

If you have an existing build pipeline, you can use `electron-installer-snap` programmatically. For more information, see the [Snapcraft API docs](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Using an Existing Debian Package

Snapcraft is capable of taking an existing `.deb` file and turning it into a `.snap` file. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### Step 1: Create a Debian Package

If you do not already have a `.deb` package, using `electron-installer-snap` might be an easier path to create snap packages. However, multiple solutions for creating Debian packages exist, including [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) or [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Step 2: Create a snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
name: myApp
version: '2.0.0'
summary: A little description for the app.
description: |
 You know what? This app is amazing! It does all the things
 for you. Some say it keeps you young, maybe even happy.

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
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it simply passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternatively, if you're building your `snap` with `strict` confinement, you can use the `desktop-launch` command:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```