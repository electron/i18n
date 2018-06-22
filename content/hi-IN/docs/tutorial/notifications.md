# नोटीफीकेशंस (विंडोज, लिनक्स, मैकओएस)

ये तीनों ऑपरेटिंग सिस्टम्स उपयोगकर्ताओं तक नोटीफीकेशंस भेजने के लिए एप्लीकेशनस को मार्ग उपलब्ध कराते हैं | इलेक्ट्रॉन डेवलपर्स [एचटीएमएल5 नोटीफिकेशन ऐपीआई](https://notifications.spec.whatwg.org/) के साथ बड़ी आसानी से नोटीफिकेशंस भेज सकते हैं, और मौजूदा ऑपरेटिंग सिस्टम की मूल नोटीफिकेशन ऐपीआई का इस्तेमाल कर उन्हें प्रदर्शित कर सकते हैं |

**नोट:** चूँकि यह एक एचटीएमएल ऐपीआई है इसलिए यह केवल रेंदेरेर प्रक्रिया में उपलब्ध है | अगर आप मुख्य प्रक्रिया में नोटीफीकेशंस को दिखाना चाहते हैं तो कृप्या [नोटीफीकेशन](../api/notification.md) मोड्यूल पढ़ें |

```javascript
let myNotification = new Notification('Title', {
  body: 'Lorem Ipsum Dolor Sit Amet'
})

myNotification.onclick = () => {
  console.log('Notification clicked')
}
```

हालाँकि सभी ऑपरेटिंग सिस्टम्स में कोड और उपयोगकर्ता अनुभव समान हैं, पर फिर भी कुछ सूक्ष्म अंतर है |

## विंडोज

* On Windows 10, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start Menu.
* On Windows 8.1 and Windows 8, a shortcut to your app with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) must be installed to the Start screen. हालाँकि, उसका स्टार्ट स्क्रीन पर पिनड होना ज़रूरी नहीं है |
* विंडोज 7 पर, नोटीफीकेशंस एक कस्टम इम्प्लीमेंटेशन के द्वारा काम करती हैं जो कि नये सिस्टम्स पर मूल वाले की तरह दिखाई देता है |

Electron attempts to automate the work around the Application User Model ID. When Electron is used together with the installation and update framework Squirrel, [shortcuts will automatically be set correctly](https://github.com/electron/windows-installer/blob/master/README.md#handling-squirrel-events). Furthermore, Electron will detect that Squirrel was used and will automatically call `app.setAppUserModelId()` with the correct value. During development, you may have to call [`app.setAppUserModelId()`][[set-app-user-model-id](../api/app.md#appsetappusermodelidid-windows)] yourself.

इसके अलावा, विंडोज 8 में नोटीफीकेशन की अधिकतम लम्बाई सीमा 250 अक्षरों की है, और विंडोज टीम की सलाह है कि इसे 200 अक्षरों तक ही सीमित रखा जाये | विंडोज 10 में यह सीमा हटा दी गयी है, पर विंडोज टीम ने डेवलपर्स को वाज़िब सीमा रखने की सलाह दी है | ऐपीआई को बहुत सारा टेक्स्ट (हजारों अक्षर) भेजने की कोशिश करने से अस्थिरता उत्पन्न हो सकती है |

### उन्नत नोटीफीकेशंस

विंडोज के नवीनतम संस्करणों में उन्नत नोटीफीकेशंस भेजने की सुविधा मौज़ूद है, जिसमे कि कस्टम टेम्पलेटस, चित्र, और दुसरे लचीले तत्व शामिल हैं | उन नोटीफीकेशंस को भेजेने के लिए (मुख्य प्रक्रिया से या फिर रेंदेरेर प्रक्रिया से), यूजरलैंड मोड्यूल [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications) का इस्तेमाल करें, जो कि `ToastNotification` और `TileNotification` ऑब्जेक्ट्स को भेजने के लिए मूल नोड ऐडओंन्स का इस्तेमाल करते हैं |

While notifications including buttons work with `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### शांत घंटे/ प्रेजेंटेशन मोड

आपको एक नोटीफीकेशन भेजने की इजाज़त है या नहीं, यह जाँचने के लिए, यूजरलैंड मोड्यूल [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) का इस्तेमाल करें |

इससे आपको समय से पहले ही यह पता चल जायेगा कहीं विंडोज आपकी नोटीफीकेशन को चुपके से फेंक तो नहीं देगी |

## मैकओएस

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/macos/human-interface-guidelines/system-capabilities/notifications/).

याद रखें कि नोटीफीकेशंस का आकार 256 बाय्टेस तक ही सीमीत है और अगर आप इस सीमा के बाहर जाते हैं, तो बाकी की नोटीफीकेशन काट दी जायेगी |

### उन्नत नोटीफीकेशंस

मैकओएस के नवीनतम संस्करणों में नोटीफीकेशंस में एक इनपुट फील्ड भी शामिल है, जिससे कि उपयोगकर्ता एक नोटीफीकेशन को तुरंत रिप्लाई कर सकता है | नोटीफीकेशंस को इनपुट फील्ड के साथ भेजने के लिए, यूजरलैंड मोड्यूल [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier) का इस्तेमाल करें |

### परेशान न करें/ सेशन स्टेट

आपको एक नोटीफीकेशन भेजने की इजाज़त है या नहीं, यह जाँचने के लिए, यूजरलैंड मोड्यूल [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) का इस्तेमाल करें |

इससे आपको समय से पहले यह पता चल जायेगा कि नोटीफीकेशन को दिखाया जायेगा या नहीं |

## लिनक्स

नोटीफीकेशंस को भेजने के लिए `libnotify` का इस्तेमाल किया जाता है, जो कि [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/) का अनुसरण करने वाले सभी डेस्कटॉप वातावरणों में नोटीफीकेशंस को दिखा सकता है, जिनमे शामिल हैं सिन्नामन, एनलाइटमेंट, यूनिटी, ग्नोम, केडीई आदि |