# Windows Taskbar

## Overview

Electron has APIs to configure the app's icon in the Windows taskbar. This API supports both Windows-only features like [creation of a `JumpList`](#jumplist), [custom thumbnails and toolbars](#thumbnail-toolbars), [icon overlays](#icon-overlays-in-taskbar), and the so-called ["Flash Frame" effect](#flash-frame), and cross-platform features like [recent documents][recent-documents] and [application progress][progress-bar].

## जम्पलिस्ट

Windows allows apps to define a custom context menu that shows up when users right-click the app's icon in the taskbar. That context menu is called `JumpList`. You specify custom actions in the `Tasks` category of JumpList, as quoted from [MSDN][msdn-jumplist]:

> प्रोग्राम के फीचर्स और एक उपयोगकर्ता मुख्यतः उनसे क्या कर सकता है, इन दोनों चीजों के आधार पर एप्लीकेशनस कार्य निर्दिष्ट करती हैं | कार्य सन्दर्भ मुक्त होने चाहिये, यानी कि उनके पूरे होने के लिए एप्लीकेशन का चलना ज़रूरी नहीं होना चाहिये | सांख्यिकीय आधार पर वे एक सामान्य उपयोगकर्ता द्वारा एक एप्लीकेशन में किये जाने वाले आम कार्य होने चाहियें, जैसे कि एक ईमेल सन्देश का निर्माण या एक मेल प्रोग्राम में कैलेंडर खोलना, वर्ड प्रोसेसर में एक नया दस्तावेज बनाना, एक ख़ास मोड में एक एप्लीकेशन को खोलना, या उसकी एक उप-कमांड को लांच करना | एक एप्लीकेशन को चाहिये कि वह मेन्यु को उन उन्नत फीचर्स से न भर दें, जिनकी सामान्य उपयोगकर्ताओं को जरूरत न हों या एक बार किये जाने वाले कार्य जैसे कि पंजीकरण | टास्कस का इस्तेमाल प्रचार आइटम्स जैसे कि अपग्रेडस या विशेष ऑफर्स के लिए न करें |
> 
> टास्क सूची स्थिर हो, इस बात की विशेष सलाह दी जाती है | एप्लीकेशन की स्थिति या अवस्था जो भी हो, वह एक समान की रहनी चाहिये | हालाँकि सूची को सक्रिय रूप से बदला जा सकता है, पर ऐसा करने से उपयोगकर्ता भ्रमित भी हो सकता है जो कि गंतव्य सूची के उस हिस्से की बदलने की अपेक्षा नहीं कर रहा था |

![IE](https://i-msdn.sec.s-msft.com/dynimg/IC420539.png)

> NOTE: The screenshot above is an example of general tasks of Internet Explorer

Unlike the dock menu in macOS which is a real menu, user tasks in Windows work like application shortcuts. For example, when a user clicks a task, the program will be executed with specified arguments.

To set user tasks for your application, you can use [app.setUserTasks][setusertaskstasks] API.

#### Examples

##### Set user tasks

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

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

##### Clear tasks list

To clear your tasks list, you need to call `app.setUserTasks` with an empty array in the `main.js` file.

```javascript
const { app } = require('electron')

app.setUserTasks([])
```

> NOTE: The user tasks will still be displayed even after closing your application, so the icon and program path specified for a task should exist until your application is uninstalled.

### थंबनेल टूलबार्स

On Windows, you can add a thumbnail toolbar with specified buttons to a taskbar layout of an application window. It provides users with a way to access a particular window's command without restoring or activating the window.

As quoted from [MSDN][msdn-thumbnail]:

> This toolbar is the familiar standard toolbar common control. इसमें अधिकतम सात बटनस होते हैं | हर बटन की आईडी, चित्र, टूलटिप, और स्थिति एक सरंचना में निर्दिष्ट होते हैं, जो कि फिर टास्कबार में पास कर दिए जाते हैं | एप्लीकेशन, थंबनेल टूलबार से बटनस को दिखा, इनेबल, डिसएबल, या छुपा सकती है, उसकी वर्तमान स्थिति के अनुसार |
> 
> उदाहरण के लिए, विंडोज मीडिया प्लेयर मानक मीडिया ट्रांसपोर्ट कंट्रोलस जैसे कि प्ले, पॉज, म्यूट एंड स्टॉप उपलब्ध करा सकता है |

![पल्येर](https://i-msdn.sec.s-msft.com/dynimg/IC420540.png)

> NOTE: The screenshot above is an example of thumbnail toolbar of Windows Media Player

To set thumbnail toolbar in your application, you need to use [BrowserWindow.setThumbarButtons][setthumbarbuttons]

#### Examples

##### Set thumbnail toolbar

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

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

##### Clear thumbnail toolbar

To clear thumbnail toolbar buttons, you need to call `BrowserWindow.setThumbarButtons` with an empty array in the `main.js` file.

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()
win.setThumbarButtons([])
```

### Icon Overlays in Taskbar

On Windows, a taskbar button can use a small overlay to display application status.

As quoted from [MSDN][msdn-icon-overlay]:

> आइकॉन ओवरलेस, स्टेटस की एक प्रासंगिक नोटिफिकेशन का काम करते हैं, और इनका मकसद उपयोगकर्ता को वह जानकारी देने के लिए एक अलग नोटिफिकेशन क्षेत्र स्टेटस आइकॉन की जरूरत को खत्म करना है | उदाहरण के लिए, माइक्रोसॉफ्ट आउटलुक में मौज़ूद नया मेल स्टेटस, जो कि वर्तमान में नोटिफिकेशन क्षेत्र में दिखाई देता है, अब टास्कबार बटन के ऊपर ओवरले के द्वारा भी दिखाया जा सकता है | पर, आपको निर्माण चक्र के दौरान ही यह निर्णय लेना होगा कि आपकी एप्लीकेशन के लिए सबसे अच्छा कौन सा तरीका है | ओवरले आइकॉनस का इस्तेमाल महत्वपूर्ण, लम्बी-अवधि के स्टेटस या नेटवर्क स्टेटस, मैसेंजर स्टेटस, या नया मेल जैसी नोटिफिकेशनस  दिखाने के लिए किया जा सकता है | उपयोगकर्ता के सामने सतत बदलते ओवरले या एनीमेशनस नहीं प्रस्तुत करने चाहिये |

![टास्कबार बटन पर ओवरले](https://i-msdn.sec.s-msft.com/dynimg/IC420441.png)

> NOTE: The screenshot above is an example of overlay on a taskbar button

To set the overlay icon for a window, you need to use the [BrowserWindow.setOverlayIcon][setoverlayicon] API.

#### उदाहरण

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.setOverlayIcon('path/to/overlay.png', 'Description for overlay')
```

### Flash Frame

On Windows, you can highlight the taskbar button to get the user's attention. This is similar to bouncing the dock icon in macOS.

As quoted from [MSDN][msdn-flash-frame]:

> आम तौर पर, एक विंडो की तरफ उपयोगकर्ता का ध्यान खीचने के लिए उसे फ़्लैश किया जाता है पर तब जब विंडो को कीबोर्ड का ध्यान न प्राप्त हो |

To flash the BrowserWindow taskbar button, you need to use the [BrowserWindow.flashFrame][flashframe] API.

#### उदाहरण

Starting with a working application from the [Quick Start Guide](quick-start.md), update the `main.js` file with the following lines:

```javascript
const { BrowserWindow } = require('electron')

const win = new BrowserWindow()

win.once('focus', () => win.flashFrame(false))
win.flashFrame(true)
```

> NOTE: Don't forget to call `win.flashFrame(false)` to turn off the flash. In the above example, it is called when the window comes into focus, but you might use a timeout or some other event to disable it.

[msdn-jumplist]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#tasks

[msdn-thumbnail]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#thumbnail-toolbars

[msdn-icon-overlay]: https://docs.microsoft.com/en-us/windows/win32/shell/taskbar-extensions#icon-overlays

[msdn-flash-frame]: https://docs.microsoft.com/en-us/windows/win32/api/winuser/nf-winuser-flashwindow#remarks

[setthumbarbuttons]: ../api/browser-window.md#winsetthumbarbuttonsbuttons-windows
[setusertaskstasks]: ../api/app.md#appsetusertaskstasks-windows
[setoverlayicon]: ../api/browser-window.md#winsetoverlayiconoverlay-description-windows
[flashframe]: ../api/browser-window.md#winflashframeflag
[recent-documents]: ./recent-documents.md
[progress-bar]: ./progress-bar.md
