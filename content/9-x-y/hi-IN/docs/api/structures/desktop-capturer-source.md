# DesktopCapturerSource वस्तु

* `id` String - एक विन्डो या स्क्रीन की पहचानकर्ता जिसे `chromeMediaSourceId` के रूप में इस्तेमाल किया जा सकता है [`navigator.webkitGetUserMedia`] को कॉल करते समय । पहचानकर्ता का प्रारूप होगा `window:XX` या `screen:XX`, जहाँ `XX` क्रमरहित उत्पन्न संख्या है।
* `name` String - एक स्क्रीन स्रोत का नाम या तो `Entire Screen` या `Screen <index>` होगा, जबकि विन्डो स्रोत का नाम विन्डो शीर्षक से मेल खाएगा।
* `thumbnail` [NativeImage](../native-image.md) - A thumbnail image. **Note:** इस बात की कोई गारंटी नहीं है कि थंबनेल का आकार `thumbnailSize` के समान हो, जो `options` में निर्दिष्ट है और `desktopCapturer.getSources` में पास किया गया हो। वास्तविक आकार स्क्रीन या विन्डो के पैमाने पर निर्भर करता है।
* `display_id` String - A unique identifier that will correspond to the `id` of the matching [Display](display.md) returned by the [Screen API](../screen.md). On some platforms, this is equivalent to the `XX` portion of the `id` field above and on others it will differ. It will be an empty string if not available.
* `appIcon` [NativeImage](../native-image.md) - An icon image of the application that owns the window or null if the source has a type screen. The size of the icon is not known in advance and depends on what the the application provides.
