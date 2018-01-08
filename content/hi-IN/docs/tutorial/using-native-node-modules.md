# मूल नोड मोड्यूल का इस्तेमाल

मूल नोड मोडयुल्स इलेक्ट्रॉन द्वारा समर्थित हैं, पर चूँकि इस बात की काफी सम्भावना है कि इलेक्ट्रॉन आपके सिस्टम में इन्स्टाल नोड बाइनरी से अलग वी8 संस्करण इस्तेमाल करता हो; इसलिए मूल मोडयुल्स का निर्माण करते वक़्त आपको मैन्युअली ही इलेक्ट्रॉन के हेडर्स की लोकेशन निर्दिष्ट करनी होगी |

## मूल मोडयुल्स को इन्स्टॉल कैसे करें

मूल मोडयुल्स को इन्स्टॉल करने के 3 तरीकें:

### `एनपीएम` का इस्तेमाल कर

कुछ वातावरण वेरिएबल्स को सेट कर के, आप `एनपीएम` का इस्तेमाल मोडयुल्स को सीधे ही इन्स्टॉल करने के लिए कर सकते हैं |

इलेक्ट्रॉन के लिए सभी निर्भरताएँ इन्स्टॉल करने का एक उदाहरण:

```sh
#इलेक्ट्रॉन का संस्करण
export npm_config_target=1.2.3
# इलेक्ट्रॉन की बनावट, आईऐ32 या x64 हो सकती है |
export npm_config_arch=x64 export
npm_config_target_arch=x64
# इलेक्ट्रॉन के लिए हेडर्स डाउनलोड करें |
export npm_config_disturl=https://atom.io/download/electron
# नोड-प्री-जीवायपी को बतायें कि हम इलेक्ट्रॉन के लिए निर्माण कर रहे हैं |
export npm_config_runtime=electron
# नोड-प्री-जीवायपी को स्त्रोत कोड से मोड्यूल बनाने को कहें |
export npm_config_build_from_source=true
# सभी निर्भरताएँ इन्स्टॉल करें, और कैश को ~/.electron-gyp में स्टोर करें |
HOME=~/.electron-gyp npm install
```

### मोड्यूल इन्स्टॉल और इलेक्ट्रॉन के लिए पुनर्निर्माण करना

आप चाहें तो दुसरे नोड प्रोजेक्ट्स की तरह मोडयुल्स इन्स्टॉल कर सकते हैं, और फिर [`इलेक्ट्रॉन-रिबिल्ड`](https://github.com/paulcbetts/electron-rebuild) पैकेज के साथ इलेक्ट्रॉन के लिए मोडयुल्स का पुनर्निर्माण कर सकते हैं | यह मोड्यूल इलेक्ट्रॉन का संस्करण प्राप्त कर सकता है और आपकी एप्प के लिए हेडर्स डाउनलोड करने और मूल मोडयुल्स का पुनर्निर्माण करने के मैन्युअल कामों को संभाल सकता है |

`इलेक्ट्रॉन-रिबिल्ड` इन्स्टॉल करने और फिर उससे मोडयुल्स का पुनर्निर्माण करने का एक उदाहरण:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try:
.\node_modules\.bin\electron-rebuild.cmd
```

### Manually building for Electron

If you are a developer developing a native module and want to test it against Electron, you might want to rebuild the module for Electron manually. You can use `node-gyp` directly to build for Electron:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

The `HOME=~/.electron-gyp` changes where to find development headers. The `--target=1.2.3` is version of Electron. The `--dist-url=...` specifies where to download the headers. The `--arch=x64` says the module is built for 64bit system.

## Troubleshooting

If you installed a native module and found it was not working, you need to check following things:

* The architecture of the module has to match Electron's architecture (ia32 or x64).
* After you upgrade Electron, you usually need to rebuild the modules.
* When in doubt, run `electron-rebuild` first.

## Modules that rely on `prebuild`

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to easily publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## Modules that rely on `node-pre-gyp`

The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node, and there are ABI changes, bad things may happen. So in general it is recommended to always build native modules from source code.

If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.