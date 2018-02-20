# डेस्कटॉप वातावरण एकीकरण

अलग-अलग ऑपरेटिंग सिस्टमस, डेस्कटॉप एप्लीकेशनस को उनके डेस्कटॉप वातावरण में एकीकृत करने के लिए अलग-अलग सुविधायें प्रदान करते हैं | उदाहरण के लिए, विंडोज पर, एप्लीकेशनस टास्क बार की जम्पलिस्ट में शोर्टकट्स डाल सकती हैं, और मैक पर, एप्लीकेशनस डॉक मेन्यु में एक कस्टम मेन्यु डाल सकती हैं |

यह गाइड विस्तार से बताएगी कि कैसे आप इलेक्ट्रॉन ऐपीआई का इस्तेमाल कर अपनी एप्लीकेशन को उन डेस्कटॉप वातावरणों के साथ एकीकृत कर सकते हैं |

## नोटीफीकेशनस

[नोटीफीकेशनस](notifications.md) देखें

## हाल के दस्तावेज़ (विंडोज & मैकओएस)

विंडोज और मैकओसएस, एप्लीकेशन के द्वारा हाल ही में खोले गये दस्तावेजों की एक सूची तक जम्पलिस्ट या डॉक मेन्यु के द्वारा आसान पहुँच उपलब्ध कराते हैं |

**जम्पलिस्ट:**

![JumpList Recent Files](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**एप्लीकेशन डॉक मेन्यु:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png" height="353" width="428" />

हाल ही के दस्तावेजों में एक फाइल को शामिल करने के लिए, आप [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) ऐपीआई का इस्तेमाल कर सकते हैं:

```javascript
const {app} = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

और आप [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) ऐपीआई का इस्तेमाल हाल ही के दस्तावेजों की सूची को खाली करने के लिए कर सकते हैं:

```javascript
const {app} = require('electron')
app.clearRecentDocuments()
```

### विंडोज नोट्स

विंडोज पर इस सुविधा का इस्तेमाल करने के लिए, आपकी एप्लीकेशन दस्तावेज के फाइल प्रकार के एक हैंडलर के रूप में पंजीकृत होनी चाहिये, अन्यथा फाइल जम्पलिस्ट में दिखाई नहीं देगी, उसे शामिल करने के बाद भी नहीं | अपनी एप्लीकेशन का पंजीकरण करने के बारे में आप सारी जानकारी [एप्लीकेशन पंजीकरण](https://msdn.microsoft.com/en-us/library/windows/desktop/ee872121(v=vs.85).aspx) में प्राप्त कर सकते हैं |

जब एक उपयोगकर्ता जम्पलिस्ट से फाइल क्लिक करेगा, तो आपकी एप्लीकेशन का एक नया इंस्टैंस शुरू हो जायेगा, जिसमे फाइल का पथ कमांड लाइन आर्गुमेंट के रूप में शामिल होगा |

### मैकओस नोट्स

जब एक फाइल हाल ही एक दस्तावेजों से मंगाई जाती है, तो `app` मोड्यूल का `open-file` इवेंट उसके लिए छोड़ा जायेगा|

## कस्टम डॉक मेन्यु (मैकओएस)

मैकओएस डेवलपर्स को डॉक के लिए एक कस्टम मेन्यु निर्दिष्ट करने की सुविधा प्रदान करता है, जिसमे अक्सर आपकी एप्लीकेशन के आम तौर पर इस्तेमाल होने वाले फीचर्स के लिए कुछ शोर्टकटस शामिल होती हैं:

**Terminal.app की डॉक मेन्यु:**

<img src="https://cloud.githubusercontent.com/assets/639601/5069962/6032658a-6e9c-11e4-9953-aa84006bdfff.png" height="354" width="341" />

अपनी कस्टम डॉक मेन्यु को सेट करने के लिए, आप `app.dock.setMenu` ऐपीआई का इस्तेमाल कर सकते हैं, जो केवल मैकओएस पर उपलब्ध होती है:

```javascript
const {app, Menu} = require('electron')

const dockMenu = Menu.buildFromTemplate([
  {label: 'New Window', click () { console.log('New Window') }},
  {label: 'New Window with Settings',
    submenu: [
      {label: 'Basic'},
      {label: 'Pro'}
    ]
  },
  {label: 'New Command...'}
])
app.dock.setMenu(dockMenu)
```

## उपयोगकर्ता टास्कस (विंडोज)

विंडोज में आप जम्पलिस्ट की `Tasks` श्रेणी में कस्टम कार्य निर्दिष्ट कर सकते हैं, जैसे कि MSDN से उद्धृत है:

> प्रोग्राम के फीचर्स और एक उपयोगकर्ता मुख्यतः उनसे क्या कर सकता है, इन दोनों चीजों के आधार पर एप्लीकेशनस कार्य निर्दिष्ट करती हैं | कार्य सन्दर्भ मुक्त होने चाहिये, यानी कि उनके पूरे होने के लिए एप्लीकेशन का चलना ज़रूरी नहीं होना चाहिये | सांख्यिकीय आधार पर वे एक सामान्य उपयोगकर्ता द्वारा एक एप्लीकेशन में किये जाने वाले आम कार्य होने चाहियें, जैसे कि एक ईमेल सन्देश का निर्माण या एक मेल प्रोग्राम में कैलेंडर खोलना, वर्ड प्रोसेसर में एक नया दस्तावेज बनाना, एक ख़ास मोड में एक एप्लीकेशन को खोलना, या उसकी एक उप-कमांड को लांच करना | एक एप्लीकेशन को चाहिये कि वह मेन्यु को उन उन्नत फीचर्स से न भर दें, जिनकी सामान्य उपयोगकर्ताओं को जरूरत न हों या एक बार किये जाने वाले कार्य जैसे कि पंजीकरण | टास्कस का इस्तेमाल प्रचार आइटम्स जैसे कि अपग्रेडस या विशेष ऑफर्स के लिए न करें |
> 
> टास्क सूची स्थिर हो, इस बात की विशेष सलाह दी जाती है | एप्लीकेशन की स्थिति या अवस्था जो भी हो, वह एक समान की रहनी चाहिये | हालाँकि सूची को सक्रिय रूप से बदला जा सकता है, पर ऐसा करने से उपयोगकर्ता भ्रमित भी हो सकता है जो कि गंतव्य सूची के उस हिस्से की बदलने की अपेक्षा नहीं कर रहा था |

**इन्टरनेट एक्स्प्लोरर के टास्कस:**

![IE](http://i.msdn.microsoft.com/dynimg/IC420539.png)

मैकओएस की डॉक मेन्यु से भिन्न जो कि एक असल मेन्यु है, विंडोज में उपयोगकर्ता टास्कस एप्लीकेशन शोर्टकट्स की तरह काम करते हैं, जैसे जब एक उपयोगकर्ता एक टास्क को क्लिक करें, तो एक प्रोग्राम ख़ास आर्गुमेंट्स के साथ चले |

अपनी एप्लीकेशन के लिए उपयोगकर्ता टास्कस सेट करने के लिए, आप [app.setUserTasks](../api/app.md#appsetusertaskstasks-windows) ऐपीआई का इस्तेमाल कर सकते हैं:

```javascript
const {app} = require('electron')
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

टास्कस सूची को खाली करने के लिए, आपको केवल एक खाली ऐरे के साथ `app.setUserTasks` को बुलाना है:

```javascript
const {app} = require('electron')
app.setUserTasks([])
```

आपकी एप्लीकेशन के बंद होने के बाद भी उपयोगकर्ता टास्कस दिखाई देंगे, ताकि आइकॉन और एक टास्क के लिए निर्दिष्ट प्रोग्राम पथ आपकी एप्लीकेशन के अनइनस्टॉल होने तक मौज़ूद रहें |

## थंबनेल टूलबार्स

विंडोज पर आप एक एप्लीकेशन विंडो के टास्कबार लेआउट में मौज़ूद निर्दिष्ट बटनों के साथ थंबनेल टूलबार को शामिल कर सकते हैं | यह उपयोगकर्ताओं को एक ख़ास विंडो की कमांड तक पहुँचने के लिए एक मार्ग उपलब्ध करता है, बिना विंडो को बहाल या सक्रीय करे |

MSDN से, यह कहा गया है:

> यह टूलबार सिर्फ जानी-पहचानी मानक टूलबार कॉमन कंट्रोल है | इसमें अधिकतम सात बटनस होते हैं | Each button's ID, image, tooltip, and state are defined in a structure, which is then passed to the taskbar. The application can show, enable, disable, or hide buttons from the thumbnail toolbar as required by its current state.
> 
> For example, Windows Media Player might offer standard media transport controls such as play, pause, mute, and stop.

**Thumbnail toolbar of Windows Media Player:**

![player](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

You can use [BrowserWindow.setThumbarButtons](../api/browser-window.md#winsetthumbarbuttonsbuttons-windows) to set thumbnail toolbar in your application:

```javascript
const {BrowserWindow} = require('electron')
const path = require('path')

let win = new BrowserWindow({
  width: 800,
  height: 600
})

win.setThumbarButtons([
  {
    tooltip: 'button1',
    icon: path.join(__dirname, 'button1.png'),
    click () { console.log('button1 clicked') }
  },
  {
    tooltip: 'button2',
    icon: path.join(__dirname, 'button2.png'),
    flags: ['enabled', 'dismissonclick'],
    click () { console.log('button2 clicked.') }
  }
])
```

To clean thumbnail toolbar buttons, just call `BrowserWindow.setThumbarButtons` with an empty array:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setThumbarButtons([])
```

## Unity Launcher Shortcuts (Linux)

In Unity, you can add custom entries to its launcher via modifying the `.desktop` file, see [Adding Shortcuts to a Launcher](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles#Adding_shortcuts_to_a_launcher).

**Launcher shortcuts of Audacious:**

![audacious](https://help.ubuntu.com/community/UnityLaunchersAndDesktopFiles?action=AttachFile&do=get&target=shortcuts.png)

## Progress Bar in Taskbar (Windows, macOS, Unity)

On Windows a taskbar button can be used to display a progress bar. This enables a window to provide progress information to the user without the user having to switch to the window itself.

On macOS the progress bar will be displayed as a part of the dock icon.

The Unity DE also has a similar feature that allows you to specify the progress bar in the launcher.

**Progress bar in taskbar button:**

![Taskbar Progress Bar](https://cloud.githubusercontent.com/assets/639601/5081682/16691fda-6f0e-11e4-9676-49b6418f1264.png)

To set the progress bar for a Window, you can use the [BrowserWindow.setProgressBar](../api/browser-window.md#winsetprogressbarprogress) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setProgressBar(0.5)
```

## Icon Overlays in Taskbar (Windows)

On Windows a taskbar button can use a small overlay to display application status, as quoted from MSDN:

> Icon overlays serve as a contextual notification of status, and are intended to negate the need for a separate notification area status icon to communicate that information to the user. For instance, the new mail status in Microsoft Outlook, currently shown in the notification area, can now be indicated through an overlay on the taskbar button. Again, you must decide during your development cycle which method is best for your application. Overlay icons are intended to supply important, long-standing status or notifications such as network status, messenger status, or new mail. The user should not be presented with constantly changing overlays or animations.

**Overlay on taskbar button:**

![Overlay on taskbar button](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

To set the overlay icon for a window, you can use the [BrowserWindow.setOverlayIcon](../api/browser-window.md#winsetoverlayiconoverlay-description-windows) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

## Flash Frame (Windows)

On Windows you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon on macOS. From the MSDN reference documentation:

> Typically, a window is flashed to inform the user that the window requires attention but that it does not currently have the keyboard focus.

To flash the BrowserWindow taskbar button, you can use the [BrowserWindow.flashFrame](../api/browser-window.md#winflashframeflag) API:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

Don't forget to call the `flashFrame` method with `false` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

## Represented File of Window (macOS)

On macOS a window can set its represented file, so the file's icon can show in the title bar and when users Command-Click or Control-Click on the title a path popup will show.

You can also set the edited state of a window so that the file icon can indicate whether the document in this window has been modified.

**Represented file popup menu:**

<img src="https://cloud.githubusercontent.com/assets/639601/5082061/670a949a-6f14-11e4-987a-9aaa04b23c1d.png" height="232" width="663" />

To set the represented file of window, you can use the [BrowserWindow.setRepresentedFilename](../api/browser-window.md#winsetrepresentedfilenamefilename-macos) and [BrowserWindow.setDocumentEdited](../api/browser-window.md#winsetdocumenteditededited-macos) APIs:

```javascript
const {BrowserWindow} = require('electron')
let win = new BrowserWindow()
win.setRepresentedFilename('/etc/passwd')
win.setDocumentEdited(true)
```

## Dragging files out of the window

For certain kinds of apps that manipulate on files, it is important to be able to drag files from Electron to other apps. To implement this feature in your app, you need to call `webContents.startDrag(item)` API on `ondragstart` event.

In web page:

```html
<a href="#" id="drag">item</a>
<script type="text/javascript" charset="utf-8">
  document.getElementById('drag').ondragstart = (event) => {
    event.preventDefault()
    ipcRenderer.send('ondragstart', '/path/to/item')
  }
</script>
```

In the main process:

```javascript
const {ipcMain} = require('electron')
ipcMain.on('ondragstart', (event, filePath) => {
  event.sender.startDrag({
    file: filePath,
    icon: '/path/to/icon.png'
  })
})
```