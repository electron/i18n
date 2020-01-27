# ऑफस्क्रीन रेंडरिंग

ऑफस्क्रीन रेंडरिंग आपको ब्राउज़र विंडो की सामग्री एक बिटमैप में प्राप्त करने की सुविधा प्रदान करती है, ताकि उसे कही भी रेंडर किया जा सके, जैसे कि एक 3डी दृश्य में एक टेक्सचर के ऊपर | इलेक्ट्रॉन में ऑफस्क्रीन रेंडरिंग वही तरीका इस्तेमाल करती है जो [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) प्रोजेक्ट करता है |

रेंडरिंग के दो मोड इस्तेमाल किये जा सकते हैं और ज्यादा कुशलता के लिए `'paint'` इवेंट में केवल गन्दा क्षेत्र पास किया जाता है | रेंडरिंग को रोका या जारी रखा जा सकता है और फ्रेम रेट को भी सेट किया जा सकता है | निर्दिष्ट फ्रेम रेट एक शीर्ष सीमा मान है, जब एक वेबपेज पर कुछ न हो रहा हो, तो कोई फ्रेम्स उत्पन्न नहीं होते हैं | The maximum frame rate is 60, because above that there is no benefit, only performance loss.

**नोट:** एक ऑफस्क्रीन विंडो हमेशा एक [फ्रेमलेस विंडो](../api/frameless-window.md) की तरह निर्मित होती है |

## Rendering Modes

### जीपीयु एक्स्सलरेटेड

जीपीयु एक्स्सलरेटेड रेंडरिंग का मतलब है कि कम्पोजीशन के लिए जीपीयु का इस्तेमाल किया जाता है | इसकी वज़ह से फ्रेम को जीपीयु से कॉपी किया जाता है जिसे ज्यादा शक्ति की ज़रुरत पड़ती है, और इसलिए यह मोड दुसरे मोड के मुकाबले थोड़ा धीरे है | The benefit of this mode is that WebGL and 3D CSS animations are supported.

### सॉफ्टवेयर आउटपुट डिवाइस

यह मोड सीपीयु में रेंडरिंग के लिए एक सॉफ्टवेयर आउटपुट डिवाइस का इस्तेमाल करता है, जिससे कि फ्रेम रेट का उत्पादन कही ज्यादा तेज़ी से होता है, और इसलिए जीपीयु एक्स्सलरेटेड मोड से ज्यादा प्राथमिकता इसे मिलती है |

इस मोड को चालु करने के लिए जीपीयु एक्स्सलरेशन को [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) ऐपीआई कॉल कर डिसएबल करना होगा |

## उपयोग

```javascript
const { app, BrowserWindow } = require('electron')

app.disableHardwareAcceleration()

let win

app.once('ready', () => {
  win = new BrowserWindow({
    webPreferences: {
      offscreen: true
    }
  })

  win.loadURL('http://github.com')
  win.webContents.on('paint', (event, dirty, image) => {
    // updateBitmap(dirty, image.getBitmap())
  })
  win.webContents.setFrameRate(30)
})
```