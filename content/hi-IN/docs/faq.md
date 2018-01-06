# इलेक्ट्रॉन के अकसर पूछे जाने वाले सवाल

## मुझे इलेक्ट्रॉन स्थापित करने में समस्या क्यों आ रही है?

`एनपीएम इन्स्टाल इलेक्ट्रॉन` चलाने के दौरान, कुछ उपयोगकर्ताओं को कभी-कभी इंस्टालेशन त्रुटियों का सामना करना पड़ता है |

लगभग सभी मामलों में, यह त्रुटियाँ नेटवर्क समस्याओं के कारण होती है, न कि `इलेक्ट्रॉन` एनपीएम पैकेज में मौज़ूद किसी वास्तविक समस्या से | `ELIFECYCLE`, `EAI_AGAIN`, `ECONNRESET`, और `ETIMEDOUT` जैसी त्रुटियाँ नेटवर्क समस्याओं का संकेत हैं | सबसे उत्तम उपाय नेटवर्क बदलना, या फिर थोड़ा इंतज़ार कर के दोबारा इन्स्टॉल करने की कोशिश करना है |

आप इलेक्ट्रॉन को सीधे [electron/electron/releases](https://github.com/electron/electron/releases) से भी डाउनलोड कर सकते हैं, अगर `एनपीएम` के द्वारा इंस्टालेशन कामयाब नहीं हो रही है |

## इलेक्ट्रॉन नवीनतम क्रोम तक कब अपग्रेड होगा?

इलेक्ट्रॉन का क्रोम संस्करण, अक्सर नये स्थिर क्रोम संस्करण के जारी होने के 1-2 हफ़्तों में ही बढ़ जाता है | यह अनुमान गलत भी हो सकता है और अपग्रेड करने में लगने वाले कार्य पर निर्भर करता है |

क्रोम का केवल स्थिर चैनल ही इस्तेमाल किया जाता है |अगर कोई महत्वपूर्ण मरम्मत बीटा या डेव चैनल में हो, तो हम उसे बैक-पोर्ट कर देते हैं |

और अधिक जानकारी के लिए, कृपया [सुरक्षा परिचय](tutorial/security.md) देखें |

## इलेक्ट्रॉन नवीनतम नोड.जेएस तक कब अपग्रेड होगा?

जब नोड.जेएस का एक नया संस्करण जारी होता है, तो इलेक्ट्रॉन के नोड संस्करण को अपग्रेड करने से पहले हम अक्सर करीब एक महीने का इंतज़ार करते हैं | ऐसा इसलिए ताकि नये नोड.जेएस में आने वाले बग्स से हम प्रभावित न हों, जो किअक्सर आते ही हैं|

नोड.जेएस की नई सुविधायें अक्सर वी8 अपग्रेडस के द्वारा लायी जाती हैं | चूँकि इलेक्ट्रॉन क्रोम ब्राउज़र द्वारा दिए गये वी8 का इस्तेमाल करता है, इसलिए नोड.जेएस का नया संस्करण अक्सर इलेक्ट्रॉन में पहले से ही शामिल होता है |

## वेब पेजों के बीच डाटा कैसे साझा करें ?

वेब पेजों (रेंदेरेर प्रक्रियायें) के बीच डाटा साझा करने के लिए सबसे आसान तरीका है एचटीएमएल5 ऐपीआई, जो कि ब्राउज़र में पहले से ही मौज़ूद होती हैं| [स्टोरेजऐपीआई](https://developer.mozilla.org/en-US/docs/Web/API/Storage),[`लोकलस्टोरेज`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage), [`सेशनस्टोरेज`](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage) और [इंडेक्स्डडीबी](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) इसके अच्छे उम्मीदवार हैं |

या फिर आप आईपीसी सिस्टम भी इस्तेमाल कर सकते हैं, जो कि ख़ास इलेक्ट्रॉन के लिए है | इसके द्वारा आप मुख्य प्रक्रिया में ऑब्जेक्ट्स को एक वैश्विक वेरिएबल की तरह स्टोर कर सकते हैं, और फिर उन तक रेंदेरेर्स से `इलेक्ट्रॉन` मोड्यूल के `दूरस्थ` गुण के द्वारा पहुँच सकते हैं |

```javascript
// मुख्य प्रक्रिया में |
 global.sharedObject = {
   someProperty: 'default value' 
}
```

```javascript
// पेज 1 में |
require('electron').remote.getGlobal('sharedObject').someProperty =
'new value'
```

```javascript
// पेज 2 में |
console.log(require('electron').remote.getGlobal('sharedObject').
someProperty)
```

## मेरी एप्प की विंडो/ट्रे कुछ मिनटों बाद गायब हो गयी |

ऐसा तब होता है जब विंडोज/ट्रे को स्टोर करने में इस्तेमाल होने वाला वेरिएबल, गार्बेज द्वारा एकत्र कर लिया जाता है |

अगर आपको इस समस्या का सामना करना पड़ें, तो नीचे दिए गये लेख आपके लिए मददगार साबित होंगे:

* [मेमोरी प्रबंधन](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Memory_Management)
* [वेरिएबल स्कोप](https://msdn.microsoft.com/library/bzt2dkta(v=vs.94).aspx)

अगर आप एक तेज़ उपाय चाहते हैं, तो आप अपने कोड में बदलाव कर वेरिएबल्स को वैश्विक बना सकते हैं, ऐसे:

```javascript
const {app, Tray} = require('electron')
app.on('ready', () => {
  const tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world') 
})
```

to this:

```javascript
const {app, Tray} = require('electron')
let tray = null
app.on('ready', () => {
  tray = new Tray('/path/to/icon.png')
  tray.setTitle('hello world')
})
```

## I can not use jQuery/RequireJS/Meteor/AngularJS in Electron.

Due to the Node.js integration of Electron, there are some extra symbols inserted into the DOM like `module`, `exports`, `require`. This causes problems for some libraries since they want to insert the symbols with the same names.

To solve this, you can turn off node integration in Electron:

```javascript
// In the main process.
const {BrowserWindow} = require('electron')
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false
  }
})
win.show()
```

But if you want to keep the abilities of using Node.js and Electron APIs, you have to rename the symbols in the page before including other libraries:

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

## `require('electron').xxx` is undefined.

When using Electron's built-in module you might encounter an error like this:

```sh
> require('electron').webFrame.setZoomFactor(1.0)
Uncaught TypeError: Cannot read property 'setZoomLevel' of undefined
```

This is because you have the [npm `electron` module](https://www.npmjs.com/package/electron) installed either locally or globally, which overrides Electron's built-in module.

To verify whether you are using the correct built-in module, you can print the path of the `electron` module:

```javascript
console.log(require.resolve('electron'))
```

and then check if it is in the following form:

```sh
"/path/to/Electron.app/Contents/Resources/atom.asar/renderer/api/lib/exports/electron.js"
```

If it is something like `node_modules/electron/index.js`, then you have to either remove the npm `electron` module, or rename it.

```sh
npm uninstall electron
npm uninstall -g electron
```

However if you are using the built-in module but still getting this error, it is very likely you are using the module in the wrong process. For example `electron.app` can only be used in the main process, while `electron.webFrame` is only available in renderer processes.