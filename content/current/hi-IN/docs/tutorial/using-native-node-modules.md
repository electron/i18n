# मूल नोड मोड्यूल का इस्तेमाल

Native Node.js modules are supported by Electron, but since Electron has a different [application binary interface (ABI)](https://en.wikipedia.org/wiki/Application_binary_interface) from a given Node.js binary (due to differences such as using Chromium's BoringSSL instead of OpenSSL), the native modules you use will need to be recompiled for Electron. Otherwise, you will get the following class of error when you try to run your app:

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

## मूल मोडयुल्स को इन्स्टॉल कैसे करें

There are several different ways to install native modules:

### मोड्यूल इन्स्टॉल और इलेक्ट्रॉन के लिए पुनर्निर्माण करना

You can install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`](https://github.com/electron/electron-rebuild) package. This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app. If you are using [Electron Forge](https://electronforge.io/), this tool is used automatically in both development mode and when making distributables.

For example, to install the standalone `electron-rebuild` tool and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# If you have trouble on Windows, try:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools such as [Electron Packager](https://github.com/electron/electron-packager), consult the project's README.

### `एनपीएम` का इस्तेमाल कर

कुछ वातावरण वेरिएबल्स को सेट कर के, आप `एनपीएम` का इस्तेमाल मोडयुल्स को सीधे ही इन्स्टॉल करने के लिए कर सकते हैं |

For example, to install all dependencies for Electron:

```sh
#इलेक्ट्रॉन का संस्करण
export npm_config_target=1.2.3
# The architecture of Electron, see https://electronjs.org/docs/tutorial/support#supported-platforms
# for supported architectures.
export npm_config_arch=x64 export
npm_config_target_arch=x64
# इलेक्ट्रॉन के लिए हेडर्स डाउनलोड करें |
export npm_config_disturl=https://electronjs.org/headers
# नोड-प्री-जीवायपी को बतायें कि हम इलेक्ट्रॉन के लिए निर्माण कर रहे हैं |
export npm_config_runtime=electron
# नोड-प्री-जीवायपी को स्त्रोत कोड से मोड्यूल बनाने को कहें |
export npm_config_build_from_source=true
# सभी निर्भरताएँ इन्स्टॉल करें, और कैश को ~/.electron-gyp में स्टोर करें |
HOME=~/.electron-gyp npm install
```

### इलेक्ट्रॉन के लिए मैन्युअली निर्माण करना

अगर आप एक मूल मोड्यूल का निर्माण करने वाले डेवलपर हैं और उसका इलेक्ट्रॉन के विपरीत परीक्षण करना चाहते हैं, तो आपको इलेक्ट्रॉन के लिए मोड्यूल का मैन्युअली पुनर्निर्माण करना होगा | सीधे इलेक्ट्रॉन के लिए निर्माण करने के लिए आप `नोड-जीवायपी` इस्तेमाल कर सकते हैं:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3
--arch=x64 --dist-url=https://electronjs.org/headers
```

* `HOME=~/.electron-gyp` changes where to find development headers.
* `--target=1.2.3` is the version of Electron.
* `--dist-url=...` specifies where to download the headers.
* `--arch=x64` says the module is built for a 64-bit system.

### Manually building for a custom build of Electron

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## समस्या निवारण

If you installed a native module and found it was not working, you need to check the following things:

* अगर संशय हो, तो पहले `इलेक्ट्रॉन-रिबिल्ड` चलायें |
* Make sure the native module is compatible with the target platform and architecture for your Electron app.
* Make sure `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
* इलेक्ट्रॉन अपग्रेड करने के बाद, आपको अक्सर मोडयुल्स का पुनर्निर्माण करने की ज़रूरत पड़ेगी |

### A note about `win_delay_load_hook`

On Windows, by default, `node-gyp` links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll`. In order to load native modules on Windows, `node-gyp` installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook.  If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere.  If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```plaintext
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

* you link against `node.lib` from _Electron_ and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
* you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
* `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## `पूर्वनिर्मित` पर निर्भर मोडयुल्स

[`prebuild`](https://github.com/prebuild/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

If the `prebuild`-powered module provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.

## `नोड-प्री-जीवायपी` पर निर्भर मोडयुल्स

[`नोड-प्री-जीवायपी` औज़ार](https://github.com/mapbox/node-pre-gyp) पूर्वनिर्मित बाइनरिज़ के साथ मूल नोड मोडयुल्स को स्थापित करने का एक रास्ता देता है, और बहुत से मशहूर मोडयुल्स इसका इस्तेमाल कर रहे हैं |

Sometimes those modules work fine under Electron, but when there are no Electron-specific binaries available, you'll need to build from source. Because of this, it is recommended to use `electron-rebuild` for these modules.

If you are following the `npm` way of installing modules, you'll need to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.
