# ऑफस्क्रीन रेंडरिंग

ऑफस्क्रीन रेंडरिंग आपको ब्राउज़र विंडो की सामग्री एक बिटमैप में प्राप्त करने की सुविधा प्रदान करती है, ताकि उसे कही भी रेंडर किया जा सके, जैसे कि एक 3डी दृश्य में एक टेक्सचर के ऊपर | इलेक्ट्रॉन में ऑफस्क्रीन रेंडरिंग वही तरीका इस्तेमाल करती है जो [Chromium Embedded Framework](https://bitbucket.org/chromiumembedded/cef) प्रोजेक्ट करता है |

रेंडरिंग के दो मोड इस्तेमाल किये जा सकते हैं और ज्यादा कुशलता के लिए `'paint'` इवेंट में केवल गन्दा क्षेत्र पास किया जाता है | रेंडरिंग को रोका या जारी रखा जा सकता है और फ्रेम रेट को भी सेट किया जा सकता है | निर्दिष्ट फ्रेम रेट एक शीर्ष सीमा मान है, जब एक वेबपेज पर कुछ न हो रहा हो, तो कोई फ्रेम्स उत्पन्न नहीं होते हैं | अधिकतम फ्रेम रेट 60 है, क्योंकि इससे ज्यादा का कोई फायदा नहीं है, केवल कार्यक्षमता का नुक्सान है |

**नोट:** एक ऑफस्क्रीन विंडो हमेशा एक [फ्रेमलेस विंडो](../api/frameless-window.md) की तरह निर्मित होती है |

## रेंडरिंग के दो मोड

### GPU accelerated

GPU accelerated rendering means that the GPU is used for composition. Because of that the frame has to be copied from the GPU which requires more performance, thus this mode is quite a bit slower than the other one. The benefit of this mode that WebGL and 3D CSS animations are supported.

### Software output device

This mode uses a software output device for rendering in the CPU, so the frame generation is much faster, thus this mode is preferred over the GPU accelerated one.

To enable this mode GPU acceleration has to be disabled by calling the [`app.disableHardwareAcceleration()`](../api/app.md#appdisablehardwareacceleration) API.

## Usage

```javascript
const {app, BrowserWindow} = require('electron')

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