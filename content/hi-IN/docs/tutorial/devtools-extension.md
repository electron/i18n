# डेवटूल्स एक्सटेंशन

इलेक्ट्रॉन [क्रोम डेवटूल्स एक्सटेंशन](https://developer.chrome.com/extensions/devtools) समर्थन करता है, यह लोकप्रिय वेब रूपरेखा डिबगिंग के लिए डेवटूल्स की क्षमता का विस्तार करने के लिए उपयोग किया जाता है।

## डेवटूल्स एक्सटेंशन कैसे लोड करें

यह दस्तावेज़ मैन्युअल रूप से किसी एक्सटेंशन को लोड करने की प्रक्रिया को रेखांकित करता है आप भी आजमा सकते हैं [ इलेक्ट्रॉन डेवटूल्स-संस्थापक ](https://github.com/GPMDP/electron-devtools-installer), तृतीय-पक्ष उपकरण जो सीधे Chrome वेबस्टोर से एक्सटेंशन डाउनलोड करता है |

इलेक्ट्रॉन में एक्सटेंशन लोड करने के लिए, आपको इसे क्रोम ब्राउज़र में डाउनलोड करना होगा, इसके फ़ाइल सिस्टम पथ का पता लगाएं, और फिर इसे कॉल करके लोड करें `BrowserWindow.addDevToolsExtension (विस्तार)` एपीआई।

उदाहरण के रूप में [रिएक्टर डेवलपर उपकरण ](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) का उपयोग करना:

1. इसे क्रोम ब्राउजर में इंस्टॉल करें।
2. पर जाए `chrome://extensions`, और उसकी एक्सटेंशन आईडी खोजें, जो एक हैश है तार की तरह `fmkadmapgofadopljbjfkapdkoienihi` |
3. एक्सटेंशन संग्रहीत करने के लिए Chrome द्वारा उपयोग की जाने वाली फ़ाइल सिस्टम स्थिति का पता लगाएं: 
    * विंडोज पर यह है `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    * लिनक्स पर यह हो सकता है: 
        * `~/.config/google-chrome/Default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/`
        * `~/.config/chromium/Default/Extensions/`
    * on macOS it is `~/Library/Application Support/Google/Chrome/Default/Extensions`.
4. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like: `~/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0`

**Note:** The `BrowserWindow.addDevToolsExtension` API cannot be called before the ready event of the app module is emitted.

The name of the extension is returned by `BrowserWindow.addDevToolsExtension`, and you can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to unload it.

## Supported DevTools Extensions

Electron only supports a limited set of `chrome.*` APIs, so some extensions using unsupported `chrome.*` APIs for chrome extension features may not work. Following Devtools Extensions are tested and guaranteed to work in Electron:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/debugger.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### What should I do if a DevTools Extension is not working?

First please make sure the extension is still being maintained, some extensions can not even work for recent versions of Chrome browser, and we are not able to do anything for them.

Then file a bug at Electron's issues list, and describe which part of the extension is not working as expected.