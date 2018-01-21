# सुरक्षा, मूल क्षमतायें, और आपकी जिम्मेदारी

वेब डेवलपर्स के रूप में हम अक्सर ब्राउज़र के सुरक्षा कवच से सुरक्षित महसूस करते हैं - कोडिंग से जुड़े जोखिम अपेक्षाकृत कम होते हैं | हमारी वेबसाइट्स को एक सैंडबॉक्स में सीमित शक्तियाँ ही मिलती हैं, और हमें विश्वास है कि हमारे उपयोगकर्ता एक ऐसा ब्राउज़र इस्तेमाल करते हैं जिसे इंजिनियर्स की एक बड़ी टीम ने बनाया है और जो नये सुरक्षा खतरों के पता चलने पर त्वरित प्रतिक्रिया देते हैं |

इलेक्ट्रॉन इस्तेमाल करते समय, यह समझना बेहद ज़रूरी है कि यह एक वेब ब्राउज़र नहीं है | यह आपको परिचित वेब तकनीकों का इस्तेमाल कर सुविधा-संपन्न डेस्कटॉप एप्लीकेशनस बनाने की क्षमता प्रदान करता है, पर आपके कोड के पास कहीं ज्यादा शक्ति होती है | जावास्क्रिप्ट फाइलसिस्टम, यूजर शैल और दूसरी बहुत सी चीजों तक पहुँच सकता है | इससे आप उच्च गुणवत्ता की मूल एप्लीकेशनस बना सकते हैं, पर आपके कोड को मिली अधिक शक्तियों से सुरक्षा जोकिम भी अधिक हो जाते हैं |

इस बात को ध्यान में रखते हुए, आपके के लिये यह जानना ज़रूरी है कि अविश्वश्नीय स्त्रोतों से मनमानी सामग्री प्रदर्शित करने पर एक गंभीर सुरक्षा जोखिम उत्पन्न हो सकता है, जिसे संभालने के लिए इलेक्ट्रॉन हस्तक्षेप नहीं कर सकता | असल में, बहुत सी लोकप्रिय इलेक्ट्रॉन एप्प्स (एटम, स्लैक, विसुअल स्टूडियो कोड, आदि) मूलतः स्थनीय सामग्री प्रदर्शित करती हैं (या विश्वसनीय, नोड इंटीग्रेशन के बिना सुरक्षित दूरस्थ सामग्री ) - अगर आपकी एप्लीकेशन एक ऑनलाइन स्त्रोत से कोड चलाती है, तो यह यह सुनिश्चित करने की आपकी जिम्मेदारी है कि वह कोड बुरा नहीं है|

## सुरक्षा समस्याओं को रिपोर्ट करना

एक इलेक्ट्रॉन सुरक्षाछिद्र को कैसे रिपोर्ट करें, इसकी जानकारी पाने के लिए [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md) देखें

## क्रोमियम सुरक्षा समस्यायें और अपग्रेडस

हालाँकि इलेक्ट्रॉन की कोशिश क्रोमियम के नये संस्करणों को जल्द से जल्द समर्थित करने की होती है, डेवलपर्स के लिए यह जानना आवश्यक है कि अपग्रेड करना एक बेहद बड़ा काम है - जिसमे कई दर्जन या फिर कई बार सैकड़ों फाइल्स को भी खुद एडिट करना होता पड़ता है | आज के हिसाब से मौज़ूद संसाधनों और योगदानों के हिसाब से, इलेक्ट्रॉन के पास अक्सर क्रोमियम का नवीनतम संस्करण उपलब्ध नहीं होगा, और यह देरी कुछ दिनों या हफ़्तों की भी हो सकती है |

हमें लगता है कि क्रोमियम तत्व को अपडेट करने का हमारा मौजादा सिस्टम हमारे पास उपलब्ध संसाधनों और फ्रेमवर्क पर निर्मित ज्यादातर एप्लीकेशनस की आवश्यकताओं के बीच में एक उचित संतुलन बनाता है | जो लोग इलेक्ट्रॉन के ऊपर एप्लीकेशनस का निर्माण करते हैं, हम उनसे निश्चित रूप से विशिष्ट उपयोग मामलों के बारे में और अधिक जानना चाहेंगे | इस प्रयास का समर्थन करने वाले पुल रेकुएस्ट्स और योगदानों का सर्वदा स्वागत है |

## उपरोक्त सलाह की अनदेखी

जब भी आप एक दूरस्थ स्त्रोत से कोड प्राप्त कर उसे स्थानीय रूप से चलाते है तो एक सुरक्षा समस्या जरूर उत्पन्न होती है | उदाहरण के तौर पर, एक दूरस्थ वेबसाइट लीजिये जो कि एक ब्राउज़र विंडो में प्रदर्शित हो रही है | If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

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