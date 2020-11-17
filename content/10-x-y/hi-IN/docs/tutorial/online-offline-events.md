# ऑनलाइन/ऑफलाइन ईवेंट का पता लगाना

[ऑनलाइन और ऑफलाइन इवेंट](https://developer.mozilla.org/en-US/docs/Online_and_offline_events) खोज को [`navigator.onLine`](http://html5index.org/Offline%20-%20NavigatorOnLine.html) एट्रिब्यूट (एचटीएमएल5 ऐपीआई का एक हिस्सा) का इस्तेमाल कर के रेंदेरेर प्रक्रिया में लागू किया जा सकता है | अगर किसी नेटवर्क अनुरोध के विफल होने की पूरी संभावना है, यानी कि निश्चित रूप से ऑफलाइन (नेटवर्क से कटा हुआ), तो `navigator.onLine` एट्रिब्यूट `false` रिटर्न करता है | बाकी सभी मामलों में वह `true` रिटर्न करता है | चूँकि बाकी सभी स्थितियाँ `true` रिटर्न करती है, इसलिए आपको झूठे सही के प्रति सचेत रहना होगा, क्योंकि हम यह नहीं मान सकते कि हर `true` वैल्यू का मतलब यही है कि इलेक्ट्रॉन इन्टरनेट इस्तेमाल कर सकता है | Such as in cases where the computer is running a virtualization software that has virtual ethernet adapters that are always “connected.” Therefore, if you really want to determine the internet access status of Electron, you should develop additional means for checking.

उदाहरण:

_main.js_

```javascript
const { app, BrowserWindow } = require('electron')

let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})
```

_online-status.html_

```html
<!DOCTYPE html>
 <html>
 <body>
 <script>
   const alertOnlineStatus = () => {
     window.alert(navigator.onLine ? 'online' : 'offline')
   }

   window.addEventListener('online', alertOnlineStatus)
   window.addEventListener('offline', alertOnlineStatus)

   alertOnlineStatus()
 </script>
 </body>
 </html>
```

ऐसे भी कुछ उदाहरण हो सकते हैं जहाँ आप इन इवेंट्स की मुख्य प्रक्रिया में भी प्रतिक्रिया देना चाहेंगे | लेकिन मुख्य प्रक्रिया के पास एक `navigator` ऑब्जेक्ट नहीं होता और इसलिए वह इन इवेंट्स को सीधे नहीं खोज सकता | इलेक्ट्रॉन की अंतर-प्रक्रिया संचार यूटिलिटीज का प्रयोग कर, इवेंट्स को मुख्य प्रक्रिया तक भेजा जा सकता है और फिर ज़रुरत के हिसाब से संभाला जा सकता है, जैसे कि निम्नलिखित उदाहरण में दिखाया गया है |

_main.js_

```javascript
const { app, BrowserWindow, ipcMain } = require('electron')
let onlineStatusWindow

app.whenReady().then(() => {
  onlineStatusWindow = new BrowserWindow({ width: 0, height: 0, show: false, webPreferences: { nodeIntegration: true } })
  onlineStatusWindow.loadURL(`file://${__dirname}/online-status.html`)
})

ipcMain.on('online-status-changed', (event, status) => {
  console.log(status)
})
```

_online-status.html_

```html
<!DOCTYPE html>
<html>
<body>
<script>
  const { ipcRenderer } = require('electron')
  const updateOnlineStatus = () => {
    ipcRenderer.send('online-status-changed', navigator.onLine ? 'online' : 'offline')
  }

  window.addEventListener('online',  updateOnlineStatus)
  window.addEventListener('offline',  updateOnlineStatus)

  updateOnlineStatus()
</script>
</body>
</html>
```
