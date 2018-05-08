# Windows Taskbar

Electron has APIs to configure the app's icon in the Windows taskbar. Supported are the [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar-windows), and the so-called ["Flash Frame" effect](#flash-frame), but Electron also uses the app's dock icon to implement cross-platform features like [recent documents](./recent-documents.md) and [application progress](./progress-bar.md).

## जम्पलिस्ट

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the task bar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from MSDN:

> प्रोग्राम के फीचर्स और एक उपयोगकर्ता मुख्यतः उनसे क्या कर सकता है, इन दोनों चीजों के आधार पर एप्लीकेशनस कार्य निर्दिष्ट करती हैं | कार्य सन्दर्भ मुक्त होने चाहिये, यानी कि उनके पूरे होने के लिए एप्लीकेशन का चलना ज़रूरी नहीं होना चाहिये | सांख्यिकीय आधार पर वे एक सामान्य उपयोगकर्ता द्वारा एक एप्लीकेशन में किये जाने वाले आम कार्य होने चाहियें, जैसे कि एक ईमेल सन्देश का निर्माण या एक मेल प्रोग्राम में कैलेंडर खोलना, वर्ड प्रोसेसर में एक नया दस्तावेज बनाना, एक ख़ास मोड में एक एप्लीकेशन को खोलना, या उसकी एक उप-कमांड को लांच करना | एक एप्लीकेशन को चाहिये कि वह मेन्यु को उन उन्नत फीचर्स से न भर दें, जिनकी सामान्य उपयोगकर्ताओं को जरूरत न हों या एक बार किये जाने वाले कार्य जैसे कि पंजीकरण | टास्कस का इस्तेमाल प्रचार आइटम्स जैसे कि अपग्रेडस या विशेष ऑफर्स के लिए न करें |
> 
> टास्क सूची स्थिर हो, इस बात की विशेष सलाह दी जाती है | एप्लीकेशन की स्थिति या अवस्था जो भी हो, वह एक समान की रहनी चाहिये | हालाँकि सूची को सक्रिय रूप से बदला जा सकता है, पर ऐसा करने से उपयोगकर्ता भ्रमित भी हो सकता है जो कि गंतव्य सूची के उस हिस्से की बदलने की अपेक्षा नहीं कर रहा था |

**इन्टरनेट एक्स्प्लोरर के टास्कस:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

मैकओएस की डॉक मेन्यु से भिन्न जो कि एक असल मेन्यु है, विंडोज में उपयोगकर्ता टास्कस एप्लीकेशन शोर्टकट्स की तरह काम करते हैं, जैसे जब एक उपयोगकर्ता एक टास्क को क्लिक करें, तो एक प्रोग्राम ख़ास आर्गुमेंट्स के साथ चले |

अपनी एप्लीकेशन के लिए उपयोगकर्ता टास्कस सेट करने के लिए, आप [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) ऐपीआई का इस्तेमाल कर सकते हैं:

```javascript
const { app } = require('electron')
app.setUserTasks([
  {
    program: process.execPath,
    arguments: '--new-window',
    iconPath: process.execPath,
    iconIndex: 0,
    title: 'New Window',
    description: 'Create a new window'
  }
])
```

To clean your tasks list, call `app.setUserTasks` with an empty array:

```javascript
const { app } = require('electron')
app.setUserTasks([])
```

आपकी एप्लीकेशन के बंद होने के बाद भी उपयोगकर्ता टास्कस दिखाई देंगे, ताकि आइकॉन और एक टास्क के लिए निर्दिष्ट प्रोग्राम पथ आपकी एप्लीकेशन के अनइनस्टॉल होने तक मौज़ूद रहें |

## थंबनेल टूलबार्स

विंडोज पर आप एक एप्लीकेशन विंडो के टास्कबार लेआउट में मौज़ूद निर्दिष्ट बटनों के साथ थंबनेल टूलबार को शामिल कर सकते हैं | यह उपयोगकर्ताओं को एक ख़ास विंडो की कमांड तक पहुँचने के लिए एक मार्ग उपलब्ध करता है, बिना विंडो को बहाल या सक्रीय करे |

MSDN से, यह कहा गया है:

> This toolbar is the familiar standard toolbar common control. इसमें अधिकतम सात बटनस होते हैं | हर बटन की आईडी, चित्र, टूलटिप, और स्थिति एक सरंचना में निर्दिष्ट होते हैं, जो कि फिर टास्कबार में पास कर दिए जाते हैं | एप्लीकेशन, थंबनेल टूलबार से बटनस को दिखा, इनेबल, डिसएबल, या छुपा सकती है, उसकी वर्तमान स्थिति के अनुसार |
> 
> उदाहरण के लिए, विंडोज मीडिया प्लेयर मानक मीडिया ट्रांसपोर्ट कंट्रोलस जैसे कि प्ले, पॉज, म्यूट एंड स्टॉप उपलब्ध करा सकता है |

**विंडोज मीडिया प्लेयर की थंबनेल टूलबार:**

![पल्येर](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

अपनी एप्लीकेशन में थंबनेल टूलबार को सेट करने के लिए आप [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) का इस्तेमाल कर सकते हैं:

```javascript
const { BrowserWindow } = require('electron')
const path = require('path')

const win = new BrowserWindow()

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  }, {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

थंबनेल टूलबार बटनस को साफ़ करने के लिए, आपको केवल एक खाली ऐरे के साथ `BrowserWindow.setThumbarButtons` को बुलाना है:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

## Icon Overlays in Taskbar

विंडोज पर एक टास्कबार बटन एक छोटा सा ओवेरले इस्तेमाल कर एप्लीकेशन स्टेटस दिखा सकता है, जैसा कि MSDN से उद्धृत है:

> आइकॉन ओवरलेस, स्टेटस की एक प्रासंगिक नोटिफिकेशन का काम करते हैं, और इनका मकसद उपयोगकर्ता को वह जानकारी देने के लिए एक अलग नोटिफिकेशन क्षेत्र स्टेटस आइकॉन की जरूरत को खत्म करना है | उदाहरण के लिए, माइक्रोसॉफ्ट आउटलुक में मौज़ूद नया मेल स्टेटस, जो कि वर्तमान में नोटिफिकेशन क्षेत्र में दिखाई देता है, अब टास्कबार बटन के ऊपर ओवरले के द्वारा भी दिखाया जा सकता है | पर, आपको निर्माण चक्र के दौरान ही यह निर्णय लेना होगा कि आपकी एप्लीकेशन के लिए सबसे अच्छा कौन सा तरीका है | ओवरले आइकॉनस का इस्तेमाल महत्वपूर्ण, लम्बी-अवधि के स्टेटस या नेटवर्क स्टेटस, मैसेंजर स्टेटस, या नया मेल जैसी नोटिफिकेशनस दिखाने के लिए किया जा सकता है | उपयोगकर्ता के सामने सतत बदलते ओवरले या एनीमेशनस नहीं प्रस्तुत करने चाहिये |

**टास्कबार बटन पर ओवेरले:**

![टास्कबार बटन पर ओवरले](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

एक विंडो के लिए ओवरले आइकॉन सेट करने के लिए, आप [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) ऐपीआई का उपयोग कर सकते हैं:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> आम तौर पर, एक विंडो की तरफ उपयोगकर्ता का ध्यान खीचने के लिए उसे फ़्लैश किया जाता है पर तब जब विंडो को कीबोर्ड का ध्यान न प्राप्त हो |

ब्राउज़रविंडो टास्कबार बटन को फ़्लैश करने के लिए, आप [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) ऐपीआई का इस्तेमाल कर सकते हैं:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

फ़्लैश को बंद करने के लिए `flashFrame` मेथड को `false` के साथ बुलाना न भूलें | ऊपर दिए गये उदाहरण में, उसे तब बुलाया गया है जब विंडो केंद्र में आती है, पर आप एक टाइमआउट या कोई और इवेंट इस्तेमाल कर के उसे डिसएबल कर सकते हैं |