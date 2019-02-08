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

# जब भी आप "एनपीएम इन्स्टॉल" चलायें, तो इसे चलायें:
./node_modules/.bin/electron-rebuild

# अगर विंडोज पर आपको परेशानी आ रही है, तो प्रयास करें:
.\node_modules\.bin\electron-rebuild.cmd
```

### इलेक्ट्रॉन के लिए मैन्युअली निर्माण करना

अगर आप एक मूल मोड्यूल का निर्माण करने वाले डेवलपर हैं और उसका इलेक्ट्रॉन के विपरीत परीक्षण करना चाहते हैं, तो आपको इलेक्ट्रॉन के लिए मोड्यूल का मैन्युअली पुनर्निर्माण करना होगा | सीधे इलेक्ट्रॉन के लिए निर्माण करने के लिए आप `नोड-जीवायपी` इस्तेमाल कर सकते हैं:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3
--arch=x64 --dist-url=https://atom.io/download/electron
```

`HOME=~/.electron-gyp` डेवलपमेंट हेअदेर्स को खोजने की लोकेशन परिवर्तित कर देता है | `--target=1.2.3` इलेक्ट्रॉन का संस्करण है | `--dist-url=...` निर्दिष्ट करता है कि हेडर्स कहाँ से डाउनलोड करने हैं | `--arch=x64` का मतलब है कि मोड्यूल 64बिट सिस्टम के लिए बना है |

### Manually building for a custom build of Electron

To compile native Node addons against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=$HOME/.../path/to/electron/vendor/node
```

## समस्या निवारण

अगर आपने एक मूल मोड्यूल इन्स्टॉल किया है पर वह चल नहीं रहा है, तो आपको निम्नलिखित चीज़े जाँचनी होगी:

- मोड्यूल की बनावट इलेक्ट्रॉन की बनावट (आईऐ32 या x64) के अनुकूल होनी चाहिये |
- `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
- इलेक्ट्रॉन अपग्रेड करने के बाद, आपको अक्सर मोडयुल्स का पुनर्निर्माण करने की ज़रूरत पड़ेगी |
- अगर संशय हो, तो पहले `इलेक्ट्रॉन-रिबिल्ड` चलायें |

### A note about `win_delay_load_hook`

On Windows, by default, node-gyp links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll` in Electron 4.x. In order to load native modules on Windows, node-gyp installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [node-gyp](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## `पूर्वनिर्मित` पर निर्भर मोडयुल्स

[`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

अगर मोडयुल्स इलेक्ट्रॉन में इस्तेमाल करने के लिए बाइनरिज़ प्रदान कर रहे हैं, तो पूर्वनिर्मित बाइनरिज़ का पूरा लाभ उठाने के लिए यह सुनिश्चित कर लें कि आपने वातावरण वेरिएबल से `--build-from-source` और `npm_config_build_from_source` को हटा दिया है |

## `नोड-प्री-जीवायपी` पर निर्भर मोडयुल्स

[`नोड-प्री-जीवायपी` औज़ार](https://github.com/mapbox/node-pre-gyp) पूर्वनिर्मित बाइनरिज़ के साथ मूल नोड मोडयुल्स को स्थापित करने का एक रास्ता देता है, और बहुत से मशहूर मोडयुल्स इसका इस्तेमाल कर रहे हैं |

अक्सर वे मोडयुल्स इलेक्ट्रॉन के अंतर्गत सही काम करते हैं, पर कभी-कभी जब इलेक्ट्रॉन नोड से नया वी8 संस्करण इस्तेमाल करता है, और कुछ ऐबीआई परिवर्तन होते हैं, तो बुरी घटनायें घट सकती हैं | तो आम तौर पर इसलिये हमेशा स्त्रोत कोड से मूल मोडयुल्स को बनाने की सलाह दी जाती है |

अगर आप `एनपीएम` के ज़रिये मोडयुल्स इन्स्टॉल करने की कोशिश कर रहे हैं, तो यह अपने आप ही हो जाता है, अगर नहीं होता, तो `एनपीएम` में `--build-from-source` पास करना होगा, या फिर `npm_config_build_from_source` वातावरण वेरिएबल सेट करना होगा |