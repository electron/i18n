# सुरक्षा, मूल क्षमतायें, और आपकी जिम्मेदारी

वेब डेवलपर्स के रूप में हम अक्सर ब्राउज़र के सुरक्षा कवच से सुरक्षित महसूस करते हैं - कोडिंग से जुड़े जोखिम अपेक्षाकृत कम होते हैं | हमारी वेबसाइट्स को एक सैंडबॉक्स में सीमित शक्तियाँ ही मिलती हैं, और हमें विश्वास है कि हमारे उपयोगकर्ता एक ऐसा ब्राउज़र इस्तेमाल करते हैं जिसे इंजिनियर्स की एक बड़ी टीम ने बनाया है और जो नये सुरक्षा खतरों के पता चलने पर त्वरित प्रतिक्रिया देते हैं |

इलेक्ट्रॉन इस्तेमाल करते समय, यह समझना बेहद ज़रूरी है कि यह एक वेब ब्राउज़र नहीं है | यह आपको परिचित वेब तकनीकों का इस्तेमाल कर सुविधा-संपन्न डेस्कटॉप एप्लीकेशनस बनाने की क्षमता प्रदान करता है, पर आपके कोड के पास कहीं ज्यादा शक्ति होती है | जावास्क्रिप्ट फाइलसिस्टम, यूजर शैल और दूसरी बहुत सी चीजों तक पहुँच सकता है | इससे आप उच्च गुणवत्ता की मूल एप्लीकेशनस बना सकते हैं, पर आपके कोड को मिली अधिक शक्तियों से सुरक्षा जोकिम भी अधिक हो जाते हैं |

इस बात को ध्यान में रखते हुए, आपके के लिये यह जानना ज़रूरी है कि अविश्वश्नीय स्त्रोतों से मनमानी सामग्री प्रदर्शित करने पर एक गंभीर सुरक्षा जोखिम उत्पन्न हो सकता है, जिसे संभालने के लिए इलेक्ट्रॉन हस्तक्षेप नहीं कर सकता | असल में, बहुत सी लोकप्रिय इलेक्ट्रॉन एप्प्स (एटम, स्लैक, विसुअल स्टूडियो कोड, आदि) मूलतः स्थनीय सामग्री प्रदर्शित करती हैं (या विश्वसनीय, नोड इंटीग्रेशन के बिना सुरक्षित दूरस्थ सामग्री ) - अगर आपकी एप्लीकेशन एक ऑनलाइन स्त्रोत से कोड चलाती है, तो यह यह सुनिश्चित करने की आपकी जिम्मेदारी है कि वह कोड बुरा नहीं है|

## सुरक्षा समस्याओं को रिपोर्ट करना

एक इलेक्ट्रॉन सुरक्षाछिद्र को कैसे रिपोर्ट करें, इसकी जानकारी पाने के लिए [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md) देखें

## क्रोमियम सुरक्षा समस्यायें और अपग्रेडस

While Electron strives to support new versions of Chromium as soon as possible, developers should be aware that upgrading is a serious undertaking - involving hand-editing dozens or even hundreds of files. Given the resources and contributions available today, Electron will often not be on the very latest version of Chromium, lagging behind by either days or weeks.

We feel that our current system of updating the Chromium component strikes an appropriate balance between the resources we have available and the needs of the majority of applications built on top of the framework. We definitely are interested in hearing more about specific use cases from the people that build things on top of Electron. Pull requests and contributions supporting this effort are always very welcome.

## Ignoring Above Advice

A security issue exists whenever you receive code from a remote destination and execute it locally. As an example, consider a remote website being displayed inside a browser window. If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :warning: Under no circumstances should you load and execute remote code with Node integration enabled. Instead, use only local files (packaged together with your application) to execute Node code. To display remote content, use the `webview` tag and make sure to disable the `nodeIntegration`.

#### Checklist

This is not bulletproof, but at the least, you should attempt the following:

* Only display secure (https) content
* Disable the Node integration in all renderers that display remote content (setting `nodeIntegration` to `false` in `webPreferences`)
* Enable context isolation in all renderers that display remote content (setting `contextIsolation` to `true` in `webPreferences`)
* Use `ses.setPermissionRequestHandler()` in all sessions that load remote content
* Do not disable `webSecurity`. Disabling it will disable the same-origin policy.
* Define a [`Content-Security-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) , and use restrictive rules (i.e. `script-src 'self'`)
* [Override and disable `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8) , which allows strings to be executed as code.
* Do not set `allowRunningInsecureContent` to true.
* Do not enable `experimentalFeatures` or `experimentalCanvasFeatures` unless you know what you're doing.
* Do not use `blinkFeatures` unless you know what you're doing.
* WebViews: Do not add the `nodeintegration` attribute.
* WebViews: Do not use `disablewebsecurity`
* WebViews: Do not use `allowpopups`
* WebViews: Do not use `insertCSS` or `executeJavaScript` with remote CSS/JS.
* WebViews: Verify the options and params of all `<webview>` tags before they get attached using the `will-attach-webview` event:

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable node integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.