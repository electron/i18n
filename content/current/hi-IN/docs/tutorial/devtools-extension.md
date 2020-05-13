# डेवटूल्स एक्सटेंशन

इलेक्ट्रॉन [क्रोम डेवटूल्स एक्सटेंशन](https://developer.chrome.com/extensions/devtools) समर्थन करता है, यह लोकप्रिय वेब रूपरेखा डिबगिंग के लिए डेवटूल्स की क्षमता का विस्तार करने के लिए उपयोग किया जाता है।

## डेवटूल्स एक्सटेंशन कैसे लोड करें

यह दस्तावेज़ मैन्युअल रूप से किसी एक्सटेंशन को लोड करने की प्रक्रिया को रेखांकित करता है आप भी आजमा सकते हैं [ इलेक्ट्रॉन डेवटूल्स-संस्थापक ](https://github.com/GPMDP/electron-devtools-installer), तृतीय-पक्ष उपकरण जो सीधे Chrome वेबस्टोर से एक्सटेंशन डाउनलोड करता है |

इलेक्ट्रॉन में एक्सटेंशन लोड करने के लिए, आपको इसे क्रोम ब्राउज़र में डाउनलोड करना होगा, इसके फ़ाइल सिस्टम पथ का पता लगाएं, और फिर इसे कॉल करके लोड करें `BrowserWindow.addDevToolsExtension (विस्तार)` एपीआई।

उदाहरण के रूप में [रिएक्टर डेवलपर उपकरण ](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) का उपयोग करना:

1. इसे क्रोम ब्राउजर में इंस्टॉल करें।
1. पर जाए `chrome://extensions`, और उसकी एक्सटेंशन आईडी खोजें, जो एक हैश है तार की तरह `fmkadmapgofadopljbjfkapdkoienihi` |
1. एक्सटेंशन संग्रहीत करने के लिए Chrome द्वारा उपयोग की जाने वाली फ़ाइल सिस्टम स्थिति का पता लगाएं:
   * विंडोज पर यह है `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
   * लिनक्स पर यह हो सकता है:
     * `~/.config/google-chrome/Default/Extensions/`
     * `~/.config/google-chrome-beta/Default/Extensions/`
     * `~/.config/google-chrome-canary/Default/Extensions/`
     * `~/.config/chromium/Default/Extensions/`
   * macOS पर यह है `~/Library/Application Support/Google/Chrome/Default/Extensions`
1. Pass the location of the extension to `BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like:
   ```javascript
   const path = require('path')
   const os = require('os')

   BrowserWindow.addDevToolsExtension(
      path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/4.3.0_0')
   )
   ```

**ध्यान दें** इस `BrowserWindow.addDevToolsExtension` एपीआई को पहले नहीं बुलाया जा सकता है ऐप मॉड्यूल का तैयार ईवेंट उत्सर्जित होता है।

The extension will be remembered so you only need to call this API once per extension. If you try to add an extension that has already been loaded, this method will not return and instead log a warning to the console.

### How to remove a DevTools Extension

You can pass the name of the extension to the `BrowserWindow.removeDevToolsExtension` API to remove it. The name of the extension is returned by `BrowserWindow.addDevToolsExtension` and you can get the names of all installed DevTools Extensions using the `BrowserWindow.getDevToolsExtensions` API.

## समर्थित डेवटूल्स एक्सटेंशन

इलेक्ट्रॉन केवल सीमित सेट का `chrome.*` एपीआई समर्थन करता है, ओ कुछ एक्सटेंशन असमर्थित `chrome.*` एपीआई काम नहीं कर सकते हैं। डेवटूल्स एक्सटेंशन्स का परीक्षण और इलेक्ट्रॉन में काम करने की गारंटी के बाद:

* [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
* [Backbone Debugger](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
* [jQuery Debugger](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
* [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
* [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
* [Cerebral Debugger](https://cerebraljs.com/docs/introduction/devtools.html)
* [Redux DevTools Extension](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
* [MobX Developer Tools](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)

### यदि एक डेवटूल्स एक्सटेंशन काम नहीं कर रहा है तो मुझे क्या करना चाहिए?

हले कृपया सुनिश्चित करें कि एक्सटेंशन अभी भी बनाए रखा जा रहा है, कुछ एक्सटेंशन Chrome ब्राउज़र के हाल के संस्करणों के लिए भी काम नहीं कर सकता, और हम करने में सक्षम नहीं हैं उनके लिए कुछ भी करो।

फिर इलेक्ट्रॉन के मुद्दों की सूची में एक बग दर्ज करें, और किस भाग का वर्णन करें विस्तार अपेक्षित रूप से काम नहीं कर रहा है।
