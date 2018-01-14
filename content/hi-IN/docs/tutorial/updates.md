# एप्लीकेशन अपडेट

इलेक्ट्रॉन एप्प को अपडेट करने के कई तरीकें हैं | सबसे सरल और आधिकारिक तरीका है अंतर-निर्मित[स्कुइर्रेल](https://github.com/Squirrel) फ्रेमवर्क और इलेक्ट्रान के [ऑटोअपडेटर](../api/auto-updater.md) मोड्यूल का इस्तेमाल करना|

## एक अपडेट सर्वर को स्थापित करना

शुरुआत करने के लिए, आपको सबसे पहले एक सर्वर स्थापित करना होगा जिससे [ऑटोअपडेटर](../api/auto-updater.md) मोड्यूल नये अपडेटस डाउनलोड करेगा |

आपकी आवश्यकताओं के अनुसार, आप निम्नलिखित में से कोई भी चुन सकते हैं:

- [हेज़ल](https://github.com/zeit/hazel) - निजी या मुक्त-स्त्रोत एप्प्स के लिए अपडेट सर्वर | [नाउ](https://zeit.co/now) पर मुफ़्त में स्थापित किया जा सकता है (केवल एक कमांड इस्तेमाल कर के), [गिटहब रिलीज़](https://help.github.com/articles/creating-releases/) से पुल करता है और गिटहब की सीडीएन शक्ति का पूर्ण इस्तेमाल करता है |
- [नट्स](https://github.com/GitbookIO/nuts) - यह भी [गिटहब रिलीज़](https://help.github.com/articles/creating-releases/) इस्तेमाल करता है, पर यह एप्प अपडेटस को डिस्क पर कैश करता है और निजी रिपॉजिटरिज़ का समर्थन करता है |
- [इलेक्ट्रान-रिलीज़-सर्वर](https://github.com/ArekSredzki/electron-release-server) - रिलीज़ संभालने के लिए एक डैशबोर्ड प्रदान करता है
- [न्यूकलिअस](https://github.com/atlassian/nucleus) - इलेक्ट्रॉन एप्प्स के लिए ऐटलेस्सियन द्वारा मेन्टेन किया गया एक पूर्ण अपडेट सर्वर | विभिन्न एप्लीकेशनस और चैनल्स का समर्थन करता है; सर्वर लागत कम करने के लिए एक स्टैटिक फाइल स्टोर का इस्तेमाल करता है |

अगर आपकी एप्प [इलेक्ट्रॉन-बिल्डर](https://github.com/electron-userland/electron-builder) के साथ पैकेज्ड है तो आप [इलेक्ट्रान-अपडेटर](https://www.electron.build/auto-update) मोड्यूल का इस्तेमाल कर सकते हैं, जिसे एक सर्वर की आवश्यकता नहीं पड़ती और एस3, गिटहब या किसी अन्य स्टैटिक फाइल होस्ट से अपडेटस प्रदान कर सकता है|

## अपनी एप्प में अपडेटस लागू करना

एक बार जब आपने अपना अपडेट सर्वर स्थापित कर दिया हो, फिर आप आवश्यक मोडयुल्स को अपने कोड में इम्पोर्ट करना शुरू कर सकते हैं | निम्नलिखित कोड विभिन्न सर्वर सॉफ्टवेर के लिए अलग हो सकता है, पर [हेज़ल](https://github.com/zeit/hazel) का इस्तेमाल करने के दौरान यह नीचे दिए गये विवरण की तरह काम करता है |

**महत्वपूर्ण:** कृप्या ध्यान दें कि निम्नलिखित कोड केवल आपकी पैकेज्ड एप्प में चलेगा, न कि विकास में | वातावरण को जाँचने के लिए आप [electron-is-dev](https://github.com/sindresorhus/electron-is-dev) का इस्तेमाल कर सकते हैं |

```js
const {app, autoUpdater, dialog} = require('electron')
```

उसके बाद, अपडेट सर्वर का यूआरएल निर्मित करें और [ऑटोअपडेटर](../api/auto-updater.md) को उसके बारे में बतायें:

```js
const server = 'https://your-deployment-url.com'
const feed = `${server}/update/${process.platform}
/${app.getVersion()}`

autoUpdater.setFeedURL(feed)
```

अंतिम चरण में, अपडेटस के लिए जाँचें | निम्नलिखित उदाहरण हर मिनट जाँचेगा:

```js
setInterval(() => {
  autoUpdater.checkForUpdates()
}, 60000)
```

एक बार जब आपकी एप्लीकेशन [पैकेज्ड](../tutorial/application-distribution.md) हो जाये, तो उसे हर नई [गिटहब रिलीज़](https://help.github.com/articles/creating-releases/) का अपडेट मिलेगा, जिसे आप प्रकाशित करेंगे |

## अपडेटस लागू करना

अब जब आपने अपनी एप्लीकेशन के लिए बुनियादी अपडेट प्रणाली को कॉन्फ़िगर कर लिया है, तो आपको यह सुनिश्चित करना होगा कि जब भी एक अपडेट आये तो उपयोगकर्ता को उसके बारे में सुचना मिलें | इसे आप ऑटोअपडेटर ऐपीआई [इवेंट्स](../api/auto-updater.md#events) का इस्तेमाल कर के प्राप्त कर सकते हैं:

```js
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

Also make sure that errors are [being handled](../api/auto-updater.md#event-error). Here's an example for logging them to `stderr`:

```js
autoUpdater.on('error', message => {
  console.error('There was a problem updating the application')
  console.error(message)
})
```