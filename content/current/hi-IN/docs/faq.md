# इलेक्ट्रॉन के अकसर पूछे जाने वाले सवाल

## मुझे इलेक्ट्रॉन स्थापित करने में समस्या क्यों आ रही है?

`एनपीएम इन्स्टाल इलेक्ट्रॉन` चलाने के दौरान, कुछ उपयोगकर्ताओं को कभी-कभी इंस्टालेशन त्रुटियों का सामना करना पड़ता है |

लगभग सभी मामलों में, यह त्रुटियाँ नेटवर्क समस्याओं के कारण होती है, न कि `इलेक्ट्रॉन` एनपीएम पैकेज में मौज़ूद किसी वास्तविक समस्या से | `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, और `ETIMEDOUT` जैसी त्रुटियाँ नेटवर्क समस्याओं का संकेत हैं | नेटवर्क स्विच करने का प्रयास करने के लिए सबसे अच्छा संकल्प है, या थोड़ा इंतजार करें और फिर से स्थापित करने का प्रयास करें।

आप इलेक्ट्रॉन को सीधे [electron/electron/releases](https://github.com/electron/electron/releases) से भी डाउनलोड कर सकते हैं, अगर `एनपीएम` के द्वारा इंस्टालेशन कामयाब नहीं हो रही है |

## इलेक्ट्रॉन नवीनतम क्रोम तक कब अपग्रेड होगा?

इलेक्ट्रॉन का क्रोम संस्करण, अक्सर नये स्थिर क्रोम संस्करण के जारी होने के 1-2 हफ़्तों में ही बढ़ जाता है | यह अनुमान गलत भी हो सकता है और अपग्रेड करने में लगने वाले कार्य पर निर्भर करता है |

Only the stable channel of Chrome is used. If an important fix is in beta or dev channel, we will back-port it.

और अधिक जानकारी के लिए, कृपया [सुरक्षा परिचय](tutorial/security.md) देखें |

## इलेक्ट्रॉन नवीनतम नोड.जेएस तक कब अपग्रेड होगा?

जब नोड.जेएस का एक नया संस्करण जारी होता है, तो इलेक्ट्रॉन के नोड संस्करण को अपग्रेड करने से पहले हम अक्सर करीब एक महीने का इंतज़ार करते हैं | ऐसा इसलिए ताकि नये नोड.जेएस में आने वाले बग्स से हम प्रभावित न हों, जो किअक्सर आते ही हैं|

नोड.जेएस की नई सुविधायें अक्सर वी8 अपग्रेडस के द्वारा लायी जाती हैं | चूँकि इलेक्ट्रॉन क्रोम ब्राउज़र द्वारा दिए गये वी8 का इस्तेमाल करता है, इसलिए नोड.जेएस का नया संस्करण अक्सर इलेक्ट्रॉन में पहले से ही शामिल होता है |

## वेब पेजों के बीच डाटा कैसे साझा करें ?

वेब पेजों (रेंदेरेर प्रक्रियायें) के बीच डाटा साझा करने के लिए सबसे आसान तरीका है एचटीएमएल5 ऐपीआई, जो कि ब्राउज़र में पहले से ही मौज़ूद होती हैं| [स्टोरेजऐपीआई](https://developer.mozilla.org/en-US/docs/Web/API/Storage),[`लोकलस्टोरेज`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`सेशनस्टोरेज`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) और [इंडेक्स्डडीबी](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) इसके अच्छे उम्मीदवार हैं |

Alternatively, you can use the IPC primitives that are provided by Electron. To share data between the main and renderer processes, you can use the [`ipcMain`](api/ipc-main.md) and [`ipcRenderer`](api/ipc-renderer.md) modules. To communicate directly between web pages, you can send a [`MessagePort`](https://developer.mozilla.org/en-US/docs/Web/API/MessagePort) from one to the other, possibly via the main process using [`ipcRenderer.postMessage()`](api/ipc-renderer.md#ipcrendererpostmessagechannel-message-transfer). Subsequent communication over message ports is direct and does not detour through the main process.

## My app's tray disappeared after a few minutes.

This happens when the variable which is used to store the tray gets garbage collected.

अगर आपको इस समस्या का सामना करना पड़ें, तो नीचे दिए गये लेख आपके लिए मददगार साबित होंगे:

* [मेमोरी प्रबंधन](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [वेरिएबल स्कोप](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

अगर आप एक तेज़ उपाय चाहते हैं, तो आप वेरिएबल्स को वैश्विक बना सकते हैं, अपने कोड में बदलाव कर इससे:

```javascript
const { app, Tray } = require('electron')
app.whenReady().then(() => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

इसमें:

```javascript
const { app, Tray } = require('electron')
let tray = null
app.whenReady().then(() => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## मैं इलेक्ट्रॉन में जेक्वेरी/रेकुआयरजेएस/मेटेओर/एंगुलरजेएस इस्तेमाल नहीं कर पा रहा हूँ |

इलेक्ट्रॉन में नोड.जेएस के एकीकरण के कारण, डीओएम में कुछ अतिरिक्त सिम्बल्स डाले गये हैं, जैसे कि `मोड्यूल`, `एक्सपोर्ट्स`, `रेकुआयर` आदि | इसकी वज़ह से कुछ लाइब्रेरीज के लिए समस्या उत्पन्न हो जाती हैं, क्योंकि वे समान नामों से ही सिम्बल्स डालना चाहती हैं |

इसे हल करने के लिए, आप इलेक्ट्रॉन में नोड एकीकरण को बंद कर सकते हैं:

```javascript
// In the main process.
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

पर अगर आप नोड.जेएस और इलेक्ट्रॉन की क्षमताओं का इस्तेमाल करना ज़ारी रखना चाहते हैं, तो आपको पेज में मौज़ूद सिम्बल्स के नाम बदलने होंगे, उन्हें लाइब्रेरीज में डालने से पहले:

```html
<head>
<script>
window.nodeRequire = require;
delete window.require;
delete window.exports;
delete window.module;
</script>
<script type="text/javascript" src="jquery.js"></script>
</head>
```

## `require('electron').xxx` अपरिभाषित है |

इलेक्ट्रॉन के अंतर-निर्मित मोड्यूल का इस्तेमाल करने के दौरान आपको कुछ इस तरह की त्रुटी का सामना करना पड़ सकता है:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of
undefined
```

It is very likely you are using the module in the wrong process. उदाहरण के लिए, `इलेक्ट्रॉन.एप्प` केवल मुख्य प्रक्रिया में इस्तेमाल की जा सकती है, जबकि `इलेक्ट्रान.वेबफ्रेम` सिर्फ़ रेंदेरेर प्रक्रिया में उपलब्ध है |

## The font looks blurry, what is this and what can I do?

If [sub-pixel anti-aliasing](http://alienryderflex.com/sub_pixel/) is deactivated, then fonts on LCD screens can look blurry. उदाहरण:

![subpixel rendering example](images/subpixel-rendering-screenshot.gif)

Sub-pixel anti-aliasing needs a non-transparent background of the layer containing the font glyphs. (See [this issue](https://github.com/electron/electron/issues/6344#issuecomment-420371918) for more info).

To achieve this goal, set the background in the constructor for [BrowserWindow](api/browser-window.md):

```javascript
const { BrowserWindow } = require('electron')
const win = new BrowserWindow({
  backgroundColor: '#fff'
})
```

The effect is visible only on (some?) LCD screens. Even if you don't see a difference, some of your users may. It is best to always set the background this way, unless you have reasons not to do so.

Notice that just setting the background in the CSS does not have the desired effect.
