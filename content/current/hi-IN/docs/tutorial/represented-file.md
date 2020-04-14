# Represented File for macOS BrowserWindows

मैकओएस पर एक विंडो अपनी प्रतिनिधित्व फ़ाइल सेट कर सकती है, ताकि फाइल का आइकॉन शीर्षक बार में दिखाई डे सके और फिर जब उपयोगकर्ता शीर्षक पर कमांड-क्लिक या कंट्रोल-क्लिक करें तो एक पथ पॉपअप दिखे |

आप एक विंडो की संपादित अवस्था भी सेट कर सकते हैं, ताकि फाइल आइकॉन यह बता सके कि अगर विंडो में मौज़ूद दस्तावेज को बदला गया है |

__प्रतिनिधित्व फाइल पॉपअप मेन्यु:__

![Represented File](https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png)

एक विंडो की प्रतिनिधित्व फ़ाइल सेट करने के लिए, आप [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) और [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) ऐपीआई का इस्तेमाल कर सकते हैं:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```
