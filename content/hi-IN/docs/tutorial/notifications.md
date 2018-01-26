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

* On Windows 10, notifications "just work".
* On Windows 8.1 and Windows 8, a shortcut to your app, with an [Application User Model ID](https://msdn.microsoft.com/en-us/library/windows/desktop/dd378459(v=vs.85).aspx), must be installed to the Start screen. Note, however, that it does not need to be pinned to the Start screen.
* On Windows 7, notifications work via a custom implementation which visually resembles the native one on newer systems.

Furthermore, in Windows 8, the maximum length for the notification body is 250 characters, with the Windows team recommending that notifications should be kept to 200 characters. That said, that limitation has been removed in Windows 10, with the Windows team asking developers to be reasonable. Attempting to send gigantic amounts of text to the API (thousands of characters) might result in instability.

### Advanced Notifications

Later versions of Windows allow for advanced notifications, with custom templates, images, and other flexible elements. To send those notifications (from either the main process or the renderer process), use the userland module [electron-windows-notifications](https://github.com/felixrieseberg/electron-windows-notifications), which uses native Node addons to send `ToastNotification` and `TileNotification` objects.

While notifications including buttons work with just `electron-windows-notifications`, handling replies requires the use of [`electron-windows-interactive-notifications`](https://github.com/felixrieseberg/electron-windows-interactive-notifications), which helps with registering the required COM components and calling your Electron app with the entered user data.

### Quiet Hours / Presentation Mode

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This allows you to determine ahead of time whether or not Windows will silently throw the notification away.

## macOS

Notifications are straight-forward on macOS, but you should be aware of [Apple's Human Interface guidelines regarding notifications](https://developer.apple.com/library/mac/documentation/UserExperience/Conceptual/OSXHIGuidelines/NotificationCenter.html).

Note that notifications are limited to 256 bytes in size and will be truncated if you exceed that limit.

### Advanced Notifications

Later versions of macOS allow for notifications with an input field, allowing the user to quickly reply to a notification. In order to send notifications with an input field, use the userland module [node-mac-notifier](https://github.com/CharlieHess/node-mac-notifier).

### Do not disturb / Session State

To detect whether or not you're allowed to send a notification, use the userland module [electron-notification-state](https://github.com/felixrieseberg/electron-notification-state).

This will allow you to detect ahead of time whether or not the notification will be displayed.

## Linux

Notifications are sent using `libnotify` which can show notifications on any desktop environment that follows [Desktop Notifications Specification](https://developer.gnome.org/notification-spec/), including Cinnamon, Enlightenment, Unity, GNOME, KDE.