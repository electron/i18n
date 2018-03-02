# डेवलपर वातावरण

इलेक्ट्रॉन विकास मूलतः नोड.जेएस विकास ही है | अपने ऑपरेटिंग सिस्टम को इलेक्ट्रॉन के साथ डेस्कटॉप एप्प्स का निर्माण करने में सक्षम एक वातावरण में बदलने के लिए, आपको बस नोड.जेएस, अपनी पसंद का एक कोड एडिटर, और अपने ऑपरेटिंग सिस्टम के कमांड लाइन क्लाइंट की एक बुनियादी समझ की ज़रुरत होगी |

## मैकओएस का सेटअप करना

> इलेक्ट्रॉन मैक ओएस एक्स 10.9 (और सभी मैकओएस नामित संस्करण) और उनसे ऊपर का समर्थन करता है | एप्पल मैकओएस को वर्चुअल मशीन में चलाने की अनुमति नहीं देता जब तक कि होस्ट कंप्यूटर खुद एक एप्पल कंप्यूटर न हो, तो अगर आपको एक मैक की ज़रुरत महसूस हो, तो आप एक क्लाउड सर्विस का इस्तेमाल कर सकते हैं जो कि किराया लेकर मैक तक पहुँच उपलब्ध कराती हो (जैसे कि [MacInCloud](https://www.macincloud.com/) या [xcloud](https://xcloud.me)) |

पहले, नोड.जेएस का एक ताज़ा संस्करण इनस्टॉल करें | हम सलाह देंगे कि आप या तो नवीनतम `LTS` या `वर्तमान` उपलब्ध संस्करण इनस्टॉल करें | [नोड.जेएस डाउनलोड पेज](https://nodejs.org/en/download/) पर जाकर `macOS Installer` चुनें | हालाँकि होमब्रियु भी एक उपलब्ध विकल्प है, पर हम उसे इस्तेमाल न करने की सलाह देंगे - जिस तरह से होमब्रियु नोड.जेएस को इनस्टॉल करता है उससे कई सारे टूल्स बेमेल हो जायेंगे |

एक बार डाउनलोड होने के बाद, इंस्टालर को चलायें और फिर इंस्टालेशन विज़ार्ड के निर्देशानुसार इंस्टालेशन पूरी करें |

इनस्टॉल करने के बाद, यह सुनिश्चित कर लें कि सब अपेक्षानुसार चल रहा हो| अपने `/Applications/Utilities` फोल्डर में मैकओएस `Terminal` एप्लीकेशन खोजें (या केवल `Terminal` शब्द को स्पॉटलाइट में खोज के) | `Terminal` या अपनी पसंद का कोई दूसरा कमांड लाइन क्लाइंट खोलें और यह सुनिश्चित करें कि `नोड` और `एनपीएम` दोनों उपलब्ध हों:

```sh
# यह कमांड नोड.जेएस के संस्करण को दिखाती है
node -v

# यह कमांड एनपीएम के संस्करण को दिखाती है
npm -v
```

अगर दोनों कमांड्स ने एक संस्करण संख्या दिखाई, तो आप आगे बढ़ सकते हैं! शुरू करने से पहले, आपको जावास्क्रिप्ट विकास के लिए उपयुक्त एक [कोड-एडिटर](#a-good-editor) इनस्टॉल करना चाहिये |

## विंडोज का सेटअप करना

> इलेक्ट्रॉन विंडोज 7 और उसके बाद के संस्करणों का समर्थन करता है - इससे पहले के विंडोज संस्करणों पर इलेक्ट्रॉन का विकास करना संभव नहीं है | डेवलपर्स के लिए माइक्रोसॉफ्ट [विंडोज 10 के साथ वर्चुअल मशीन इमेजेस](https://developer.microsoft.com/en-us/windows/downloads/virtual-machines) मुफ़्त में उपलब्ध कराता है |

पहले, नोड.जेएस का एक ताज़ा संस्करण इनस्टॉल करें | हम सलाह देंगे कि आप या तो नवीनतम `LTS` या `वर्तमान` उपलब्ध संस्करण इनस्टॉल करें | Visit [the Node.js download page](https://nodejs.org/en/download/) and select the `Windows Installer`. एक बार डाउनलोड होने के बाद, इंस्टालर को चलायें और फिर इंस्टालेशन विज़ार्ड के निर्देशानुसार इंस्टालेशन पूरी करें |

On the screen that allows you to configure the installation, make sure to select the `Node.js runtime`, `npm package manager`, and `Add to PATH` options.

इनस्टॉल करने के बाद, यह सुनिश्चित कर लें कि सब अपेक्षानुसार चल रहा हो| Find the Windows PowerShell by simply opening the Start Menu and typing `PowerShell`. Open up `PowerShell` or another command line client of your choice and confirm that both `node` and `npm` are available:

```powershell
# यह कमांड नोड.जेएस के संस्करण को दिखाती है
node -v

# यह कमांड एनपीएम के संस्करण को दिखाती है
npm -v
```

अगर दोनों कमांड्स ने एक संस्करण संख्या दिखाई, तो आप आगे बढ़ सकते हैं! शुरू करने से पहले, आपको जावास्क्रिप्ट विकास के लिए उपयुक्त एक [कोड-एडिटर](#a-good-editor) इनस्टॉल करना चाहिये |

## Setting up Linux

> Generally speaking, Electron supports Ubuntu 12.04, Fedora 21, Debian 8 and later.

पहले, नोड.जेएस का एक ताज़ा संस्करण इनस्टॉल करें | Depending on your Linux distribution, the installation steps might differ. Assuming that you normally install software using a package manager like `apt` or `pacman`, use the official [Node.js guidance on installing on Linux](https://nodejs.org/en/download/package-manager/).

You're running Linux, so you likely already know how to operate a command line client. Open up your favorite client and confirm that both `node` and `npm` are available globally:

```sh
# यह कमांड नोड.जेएस के संस्करण को दिखाती है
node -v

# यह कमांड एनपीएम के संस्करण को दिखाती है
npm -v
```

अगर दोनों कमांड्स ने एक संस्करण संख्या दिखाई, तो आप आगे बढ़ सकते हैं! शुरू करने से पहले, आपको जावास्क्रिप्ट विकास के लिए उपयुक्त एक [कोड-एडिटर](#a-good-editor) इनस्टॉल करना चाहिये |

## A Good Editor

We might suggest two free popular editors built in Electron: GitHub's [Atom](https://atom.io/) and Microsoft's [Visual Studio Code](https://code.visualstudio.com/). Both of them have excellent JavaScript support.

If you are one of the many developers with a strong preference, know that virtually all code editors and IDEs these days support JavaScript.