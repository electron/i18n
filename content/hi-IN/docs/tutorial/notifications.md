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

* विंडोज 10 पर, नोटीफीकेशंस "बस काम" करती है ।
* विंडोज 8.1 और विंडोज 8 पर, एक [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx) के साथ आपके एप्प की एक शॉर्टकट, स्टार्ट स्क्रीन पर इनस्टॉल होनी चाहिये | हालाँकि, उसका स्टार्ट स्क्रीन पर पिनड होना ज़रूरी नहीं है |
* विंडोज 7 पर, नोटीफीकेशंस एक कस्टम इम्प्लीमेंटेशन के द्वारा काम करती हैं जो कि नये सिस्टम्स पर मूल वाले की तरह दिखाई देता है |

इसके अलावा, विंडोज 8 में नोटीफीकेशन की अधिकतम लम्बाई सीमा 250 अक्षरों की है, और विंडोज टीम की सलाह है कि इसे 200 अक्षरों तक ही सीमित रखा जाये | विंडोज 10 में यह सीमा हटा दी गयी है, पर विंडोज टीम ने डेवलपर्स को वाज़िब सीमा रखने की सलाह दी है | ऐपीआई को बहुत सारा टेक्स्ट (हजारों अक्षर) भेजने की कोशिश करने से अस्थिरता उत्पन्न हो सकती है |

### उन्नत नोटीफीकेशंस

विंडोज के नवीनतम संस्करणों में उन्नत नोटीफीकेशंस भेजने की सुविधा मौज़ूद है, जिसमे कि कस्टम टेम्पलेटस, चित्र, और दुसरे लचीले तत्व शामिल हैं | उन नोटीफीकेशंस को भेजेने के लिए (मुख्य प्रक्रिया से या फिर रेंदेरेर प्रक्रिया से), यूजरलैंड मोड्यूल [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications) का इस्तेमाल करें, जो कि `ToastNotification` और `TileNotification` ऑब्जेक्ट्स को भेजने के लिए मूल नोड ऐडओंन्स का इस्तेमाल करते हैं |

हालाँकि बटन्स को शामिल करने वाली नोटीफीकेशंस केवल `electron-windows-notifications` के साथ भी सही काम करती है, पर उत्तरों को सँभालने के लिए [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications) के इस्तेमाल की ज़रुरत पड़ती है, जो कि आवश्यक COM तत्वों को रजिस्टर करने और आपकी इलेक्ट्रॉन एप्प को उपयोगकर्ता द्वारा एंटर किये गये डाटा के साथ कॉल करने में मदद करता है |

### शांत घंटे/ प्रेजेंटेशन मोड

आपको एक नोटीफीकेशन भेजने की इजाज़त है या नहीं, यह जाँचने के लिए, यूजरलैंड मोड्यूल [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) का इस्तेमाल करें |

इससे आपको समय से पहले ही यह पता चल जायेगा कहीं विंडोज आपकी नोटीफीकेशन को चुपके से फेंक तो नहीं देगी |

## मैकओएस

मैकओएस पर नोटीफीकेशंस भेजना काफी सरल है, पर आपको [नोटीफीकेशंस सम्बंधित एप्पल की ह्यूमन इंटरफ़ेस गाइडलाइन्स](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html) के बारे में ज्ञात होना चाहिये |

याद रखें कि नोटीफीकेशंस का आकार 256 बाय्टेस तक ही सीमीत है और अगर आप इस सीमा के बाहर जाते हैं, तो बाकी की नोटीफीकेशन काट दी जायेगी |

### उन्नत नोटीफीकेशंस

मैकओएस के नवीनतम संस्करणों में नोटीफीकेशंस में एक इनपुट फील्ड भी शामिल है, जिससे कि उपयोगकर्ता एक नोटीफीकेशन को तुरंत रिप्लाई कर सकता है | In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Do not disturb / Session State

आपको एक नोटीफीकेशन भेजने की इजाज़त है या नहीं, यह जाँचने के लिए, यूजरलैंड मोड्यूल [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state) का इस्तेमाल करें |

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.