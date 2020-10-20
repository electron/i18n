# Recent Documents (Windows & macOS)

## Overview

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

__जम्पलिस्ट:__

![जम्पलिस्ट हाल ही की फाइल्स](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

__एप्लीकेशन डॉक मेन्यु:__

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

To add a file to recent documents, you need to use the [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) API.

## उदाहरण

### Add an item to recent documents

Starting with a working application from the [Quick Start Guide](quick-start.md), add the following lines to the `main.js` file:

```javascript
const { app } = require('electron')

app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

After launching the Electron application, right click the application icon. You should see the item you just added. In this guide, the item is a Markdown file located in the root of the project:

![Recent document](../images/recent-documents.png)

### Clear the list of recent documents

To clear the list of recent documents, you need to use [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) API in the `main.js` file:

```javascript
const { app } = require('electron')

app.clearRecentDocuments()
```

## Additional information

### विंडोज नोट्स

To use this feature on Windows, your application has to be registered as a handler of the file type of the document, otherwise the file won't appear in JumpList even after you have added it. अपनी एप्लीकेशन का पंजीकरण करने के बारे में आप सारी जानकारी [एप्लीकेशन पंजीकरण](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx) में प्राप्त कर सकते हैं |

जब एक उपयोगकर्ता जम्पलिस्ट से फाइल क्लिक करेगा, तो आपकी एप्लीकेशन का एक नया इंस्टैंस शुरू हो जायेगा, जिसमे फाइल का पथ कमांड लाइन आर्गुमेंट के रूप में शामिल होगा |

### मैकओस नोट्स

#### Add the Recent Documents list to the application menu

You can add menu items to access and clear recent documents by adding the following code snippet to your menu template:

```json
{
  "submenu":[
    {
      "label":"Open Recent",
      "role":"recentdocuments",
      "submenu":[
        {
          "label":"Clear Recent",
          "role":"clearrecentdocuments"
        }
      ]
    }
  ]
}
```

![macOS Recent Documents menu item](https://user-images.githubusercontent.com/3168941/33003655-ea601c3a-cd70-11e7-97fa-7c062149cfb1.png)

जब एक फाइल हाल ही एक दस्तावेजों से मंगाई जाती है, तो `app` मोड्यूल का `open-file` इवेंट उसके लिए छोड़ा जायेगा|
