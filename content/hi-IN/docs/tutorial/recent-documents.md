# Recent Documents (Windows & macOS)

Windows and macOS provide access to a list of recent documents opened by the application via JumpList or dock menu, respectively.

**जम्पलिस्ट:**

![जम्पलिस्ट हाल ही की फाइल्स](https://cloud.githubusercontent.com/assets/2289/23446924/11a27b98-fdfc-11e6-8485-cc3b1e86b80a.png)

**एप्लीकेशन डॉक मेन्यु:**

![macOS Dock Menu](https://cloud.githubusercontent.com/assets/639601/5069610/2aa80758-6e97-11e4-8cfb-c1a414a10774.png)

हाल ही के दस्तावेजों में एक फाइल को शामिल करने के लिए, आप [app.addRecentDocument](../api/app.md#appaddrecentdocumentpath-macos-windows) ऐपीआई का इस्तेमाल कर सकते हैं:

```javascript
const { app } = require('electron')
app.addRecentDocument('/Users/USERNAME/Desktop/work.type')
```

और आप [app.clearRecentDocuments](../api/app.md#appclearrecentdocuments-macos-windows) ऐपीआई का इस्तेमाल हाल ही के दस्तावेजों की सूची को खाली करने के लिए कर सकते हैं:

```javascript
const { app } = require('electron')
app.clearRecentDocuments()
```

## विंडोज नोट्स

विंडोज पर इस सुविधा का इस्तेमाल करने के लिए, आपकी एप्लीकेशन दस्तावेज के फाइल प्रकार के एक हैंडलर के रूप में पंजीकृत होनी चाहिये, अन्यथा फाइल जम्पलिस्ट में दिखाई नहीं देगी, उसे शामिल करने के बाद भी नहीं | अपनी एप्लीकेशन का पंजीकरण करने के बारे में आप सारी जानकारी [एप्लीकेशन पंजीकरण](https://msdn.microsoft.com/en-us/library/cc144104(VS.85).aspx) में प्राप्त कर सकते हैं |

जब एक उपयोगकर्ता जम्पलिस्ट से फाइल क्लिक करेगा, तो आपकी एप्लीकेशन का एक नया इंस्टैंस शुरू हो जायेगा, जिसमे फाइल का पथ कमांड लाइन आर्गुमेंट के रूप में शामिल होगा |

## मैकओस नोट्स

जब एक फाइल हाल ही एक दस्तावेजों से मंगाई जाती है, तो `app` मोड्यूल का `open-file` इवेंट उसके लिए छोड़ा जायेगा|