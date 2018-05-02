# एप्लीकेशन अपडेट

इलेक्ट्रॉन एप्प को अपडेट करने के कई तरीकें हैं | सबसे सरल और आधिकारिक तरीका है अंतर-निर्मित[स्कुइर्रेल](https://github.com/Squirrel) फ्रेमवर्क और इलेक्ट्रान के [ऑटोअपडेटर](../api/auto-updater.md) मोड्यूल का इस्तेमाल करना|

## Using `update.electronjs.org`

GitHub's Electron team maintains [update.electronjs.org](https://github.com/electron/update.electronjs.org), a free and open-source webservice that Electron apps can use to self-update. The service is designed for Electron apps that meet the following criteria:

- App runs on macOS or Windows
- App has a public GitHub repository
- Builds are published to GitHub Releases
- Builds are code-signed

The easiest way to use this service is by installing [update-electron-app](https://github.com/electron/update-electron-app), a Node.js module preconfigured for use with update.electronjs.org.

Install the module:

```sh
npm install update-electron-app
```

Invoke the updater from your app's main process file:

```js
require('update-electron-app')()
```

By default, this module will check for updates at app startup, then every ten minutes. When an update is found, it will automatically be downloaded in the background. When the download completes, a dialog is displayed allowing the user to restart the app.

If you need to customize your configuration, you can [pass options to `update-electron-app`](https://github.com/electron/update-electron-app) or [use the update service directly](https://github.com/electron/update.electronjs.org).

## Using `electron-builder`

If your app is packaged with [`electron-builder`](https://github.com/electron-userland/electron-builder) you can use the [electron-updater](https://www.electron.build/auto-update) module, which does not require a server and allows for updates from S3, GitHub or any other static file host. This sidesteps Electron's built-in update mechanism, meaning that the rest of this documentation will not apply to `electron-builder`'s updater.

## Deploying an Update Server

If you're developing a private Electron application, or if you're not publishing releases to GitHub Releases, it may be necessary to run your own update server.

आपकी आवश्यकताओं के अनुसार, आप निम्नलिखित में से कोई भी चुन सकते हैं:

- [Hazel](https://github.com/zeit/hazel) – Update server for private or open-source apps which can be deployed for free on [Now](https://zeit.co/now). It pulls from [GitHub Releases](https://help.github.com/articles/creating-releases/) and leverages the power of GitHub's CDN.
- [Nuts](https://github.com/GitbookIO/nuts) – Also uses [GitHub Releases](https://help.github.com/articles/creating-releases/), but caches app updates on disk and supports private repositories.
- [electron-release-server](https://github.com/ArekSredzki/electron-release-server) – Provides a dashboard for handling releases and does not require releases to originate on GitHub.
- [Nucleus](https://github.com/atlassian/nucleus) – A complete update server for Electron apps maintained by Atlassian. Supports multiple applications and channels; uses a static file store to minify server cost.

## Implementing Updates in Your App

एक बार जब आपने अपना अपडेट सर्वर स्थापित कर दिया हो, फिर आप आवश्यक मोडयुल्स को अपने कोड में इम्पोर्ट करना शुरू कर सकते हैं | निम्नलिखित कोड विभिन्न सर्वर सॉफ्टवेर के लिए अलग हो सकता है, पर [हेज़ल](https://github.com/zeit/hazel) का इस्तेमाल करने के दौरान यह नीचे दिए गये विवरण की तरह काम करता है |

**महत्वपूर्ण:** कृप्या ध्यान दें कि निम्नलिखित कोड केवल आपकी पैकेज्ड एप्प में चलेगा, न कि विकास में | वातावरण को जाँचने के लिए आप [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) का इस्तेमाल कर सकते हैं |

```javascript
const { app, autoUpdater, dialog } = require('electron')
```

उसके बाद, अपडेट सर्वर का यूआरएल निर्मित करें और [ऑटोअपडेटर](../api/auto-updater.md) को उसके बारे में बतायें:

```javascript
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}
/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

अंतिम चरण में, अपडेटस के लिए जाँचें | निम्नलिखित उदाहरण हर मिनट जाँचेगा:

```javascript
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

Once your application is [packaged](../tutorial/application-distribution.md), it will receive an update for each new [GitHub Release](https://help.github.com/articles/creating-releases/) that you publish.

## Applying Updates

अब जब आपने अपनी एप्लीकेशन के लिए बुनियादी अपडेट प्रणाली को कॉन्फ़िगर कर लिया है, तो आपको यह सुनिश्चित करना होगा कि जब भी एक अपडेट आये तो उपयोगकर्ता को उसके बारे में सुचना मिलें | इसे आप ऑटोअपडेटर ऐपीआई [इवेंट्स](../api/auto-updater.md#events) का इस्तेमाल कर के प्राप्त कर सकते हैं:

```javascript
autoUpdater.on('update-downloaded', (event, releaseNotes,
releaseName) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Later'],
    title: 'Application Update',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
 }

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) autoUpdater.quitAndInstall()
  })
})
```

साथ ही यह भी सुनिश्चित करें कि त्रुटियाँ [संभाली जा रही है](../api/auto-updater.md#event-error) | `stderr` में उनकी लॉगिंग करने का यह एक उदाहरण है:

```javascript
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```