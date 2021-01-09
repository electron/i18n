# मैक एप्प स्टोर सबमिशन गाइड

Since v0.34.0, Electron allows submitting packaged apps to the Mac App Store (MAS). This guide provides information on: how to submit your app and the limitations of the MAS build.

**Note:** Submitting an app to Mac App Store requires enrolling in the [Apple Developer Program][developer-program], which costs money.

## अपनी एप्प कैसे सबमिट करें

निम्नलिखित चरण आपको अपनी एप्प को मैक एप्पल स्टोर में सबमिट करने के लिए एक सरल मार्ग सुझायेंगे | हालाँकि, यह चरण यह सुनिश्चित नहीं करते कि आपकी एप्प एप्पल से अप्परुव होगी ही; आपको अभी भी मैक एप्पल स्टोर की आवश्यकताओं को कैसे पूरा करने पर लिखी गाइड [अपनी एप्प सबमिट करना][submitting-your-app] पढ़नी होगी |

### प्रमाणपत्र प्राप्त करें

अपनी एप्प को मैक एप्पल स्टोर में सबमिट करने के लिए, आपको पहले एप्पल से एक प्रमाण पत्र प्राप्त करना होगा | आप वेब पर उपलब्ध इन [मौजूदा गाइड्स][nwjs-guide] को पढ़ सकते हैं |

### टीम आईडी प्राप्त करें

अपनी एप्प पर हस्ताक्षर करने से पहले, आपको अपने अकाउंट की टीम आईडी पता होनी चाहिये | अपनी टीम आईडी खोजने के लिए, [एप्पल डेवलपर सेंटर](https://developer.apple.com/account/) में साय्न इन करें, और साइडबार में मेम्बरशिप क्लिक करें | आपकी टीम आईडी, मेम्बरशिप इनफार्मेशन सेक्शन में टीम नाम के नीचे दिखाई देगी |

### अपनी एप्प पर हस्ताक्षर करें

सभी तैयारियां पूरी करने के बाद, आप अपनी एप्प को [एप्लीकेशन डिस्ट्रीब्यूशन](application-distribution.md) को पढ़ कर पैकेज कर सकते हैं, और फिर अपनी एप्प पर हस्ताक्षर कर सकते हैं |

First, you have to add a `ElectronTeamID` key to your app's `Info.plist`, which has your Team ID as its value:

```xml
<plist version="1.0">
<dict>
  ...
  <key>ElectronTeamID</key>
  <string>TEAM_ID</string>
</dict>
</plist>
```

फिर आपको 3 एनटाइटलमेंट फाइल्स का निर्माण करना होगा |

`child.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.inherit</key>
    <true/>
  </dict>
</plist>
```

`parent.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
    <key>com.apple.security.application-groups</key>
    <array>
      <string>TEAM_ID.your.bundle.id</string>
    </array>
  </dict>
</plist>
```

`loginhelper.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>com.apple.security.app-sandbox</key>
    <true/>
  </dict>
</plist>
```

आपको `TEAM_ID` को अपनी टीम आई डी से बदलना होगा, और `your.bundle.id` को अपनी एप्प की बंडल आईडी से |

और फिर अपनी एप्प पर निम्नलिखित स्क्रिप्ट से हस्ताक्षर करना होगा:

```sh
#!/bin/bash

# Name of your app.
APP="YourApp"
# The path of your app to sign.
APP_PATH="/path/to/YourApp.app"
# हस्ताक्षरित पैकेज को भेजने की जगह का पथ
RESULT_PATH="~/Desktop/$APP.pkg"
# उन प्रमाणपत्रों के नाम जिनका आपने अनुरोध किया हैं |
APP_KEY="3rd Party Mac Developer Application: Company Name (APPIDENTITY)"
INSTALLER_KEY="3rd Party Mac Developer Installer: Company Name (APPIDENTITY)"
# आपकी पीलिस्ट फाइल्स तक का पथ |
CHILD_PLIST="/path/to/child.plist"
PARENT_PLIST="/path/to/parent.plist"
LOGINHELPER_PLIST="/path/to/loginhelper.plist"

FRAMEWORKS_PATH="$APP_PATH/Contents/Frameworks"

codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Electron Framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libffmpeg.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework/Versions/A/Libraries/libnode.dylib"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/Electron Framework.framework"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/Contents/MacOS/$APP Helper"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$FRAMEWORKS_PATH/$APP Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/Contents/MacOS/$APP Login Helper"
codesign -s "$APP_KEY" -f --entitlements "$LOGINHELPER_PLIST" "$APP_PATH/Contents/Library/LoginItems/$APP Login Helper.app/"
codesign -s "$APP_KEY" -f --entitlements "$CHILD_PLIST" "$APP_PATH/Contents/MacOS/$APP"
codesign -s "$APP_KEY" -f --entitlements "$PARENT_PLIST" "$APP_PATH"

productbuild --component "$APP_PATH" /Applications --sign "$INSTALLER_KEY" "$RESULT_PATH"
```

If you are new to app sandboxing under macOS, you should also read through Apple's [Enabling App Sandbox][enable-app-sandbox] to have a basic idea, then add keys for the permissions needed by your app to the entitlements files.

Apart from manually signing your app, you can also choose to use the [electron-osx-sign][electron-osx-sign] module to do the job.

#### मूल मोडयुल्स पर हस्ताक्षर करना

Native modules used in your app also need to be signed. If using electron-osx-sign, be sure to include the path to the built binaries in the argument list:

```sh
electron-osx-sign YourApp.app YourApp.app/Contents/Resources/app/node_modules/nativemodule/build/release/nativemodule
```

साथ ही यह भी याद रखें कि मूल मोडयुल्स की कुछ मध्यवर्ती फाइल्स भी हो सकती है जिन्हें शामिल नहीं करना (नहीं तो उन पर भी हस्ताक्षर करना पड़ेगा) | If you use [electron-packager][electron-packager] before version 8.1.0, add `--ignore=.+\.o$` to your build step to ignore these files. Versions 8.1.0 and later ignore those files by default.

### अपनी एप्प अपलोड करें

After signing your app, you can use Application Loader to upload it to iTunes Connect for processing, making sure you have [created a record][create-record] before uploading.

### अपनी एप्प को समीक्षा के लिए सबमिट करें

After these steps, you can [submit your app for review][submit-for-review].

## एमऐएस बनावट की सीमायें

एप्प सैंडबॉक्सिंग की सभी आवश्यकताओं को पूरा करने के लिए, निम्लिखित मोडयुल्स एमऐएस बनावट में डिसएबल कर दिए गये हैं:

* `क्रेश रिपोर्टर`
* `स्वतः अपडेटर`

और निम्नलिखित व्यवहार बदल दिए गये हैं:

* कुछ मशीनों में विडियो कैप्चर शायद काम न करें |
* कुछ एक्सेसबिलिटी सुविधायें शायद काम न करें |
* एप्प्स को डीएनएस बदलावों के बारे में पता नहीं चलेगा |

Also, due to the usage of app sandboxing, the resources which can be accessed by the app are strictly limited; you can read [App Sandboxing][app-sandboxing] for more information.

### अतिरिक्त एनटाइटलमेंट्स

आपकी एप्प के द्वारा उपयोग किए जाने वाले इलेक्ट्रॉन ऐपीआई के आधार पर, आपको `parent.plist` फाइल में अतिरिक्त एनटाइटलमेंट्स जोड़नी पड़ सकती हैं, ताकि आप इन ऐपीआई का इस्तेमाल अपनी एप्प के मैक एप्पल स्टोर बनवात से कर सकें|

#### नेटवर्क पहुँच

अपनी एप्प को एक सर्वर से कनेक्ट होने की अनुमति देने के लिए आउटगोइंग नेटवर्क कनेक्शनस इनेबल करें:

```xml
<key>com.apple.security.network.client</key>
<true/>
```

अपनी एप्प को एक नेटवर्क लिसनिंग पोर्ट खोलने की अनुमति देने के लिए इनकमिंग नेटवर्क कनेक्शनस इनेबल करें:

```xml
<key>com.apple.security.network.server</key>
<true/>
```

See the [Enabling Network Access documentation][network-access] for more details.

#### dialog.showOpenDialog

```xml
<key>com.apple.security.files.user-selected.read-only</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

#### dialog.showSaveDialog

```xml
<key>com.apple.security.files.user-selected.read-write</key>
<true/>
```

See the [Enabling User-Selected File Access documentation][user-selected] for more details.

## इलेक्ट्रॉन द्वारा इस्तेमाल क्रिप्टोग्राफ़िक अल्गोरिथ्म्स

Depending on the countries in which you are releasing your app, you may be required to provide information on the cryptographic algorithms used in your software. See the [encryption export compliance docs][export-compliance] for more information.

इलेक्ट्रॉन निम्नलिखित क्रिप्टोग्राफ़िक अल्गोरिथम इस्तेमाल करता है:

* AES - [NIST SP 800-38A](https://csrc.nist.gov/publications/nistpubs/800-38a/sp800-38a.pdf), [NIST SP 800-38D](https://csrc.nist.gov/publications/nistpubs/800-38D/SP-800-38D.pdf), [RFC 3394](https://www.ietf.org/rfc/rfc3394.txt)
* HMAC - [FIPS 198-1](https://csrc.nist.gov/publications/fips/fips198-1/FIPS-198-1_final.pdf)
* ECDSA - ANS X9.62–2005
* ECDH - ANS X9.63–2001
* HKDF - [NIST SP 800-56C](https://csrc.nist.gov/publications/nistpubs/800-56C/SP-800-56C.pdf)
* PBKDF2 - [RFC 2898](https://tools.ietf.org/html/rfc2898)
* RSA - [RFC 3447](http://www.ietf.org/rfc/rfc3447)
* SHA - [FIPS 180-4](https://csrc.nist.gov/publications/fips/fips180-4/fips-180-4.pdf)
* Blowfish - https://www.schneier.com/cryptography/blowfish/
* CAST - [RFC 2144](https://tools.ietf.org/html/rfc2144), [RFC 2612](https://tools.ietf.org/html/rfc2612)
* DES - [FIPS 46-3](https://csrc.nist.gov/publications/fips/fips46-3/fips46-3.pdf)
* DH - [RFC 2631](https://tools.ietf.org/html/rfc2631)
* DSA - [ANSI X9.30](https://webstore.ansi.org/RecordDetail.aspx?sku=ANSI+X9.30-1%3A1997)
* EC - [SEC 1](http://www.secg.org/sec1-v2.pdf)
* IDEA - "On the Design and Security of Block Ciphers" book by X. Lai
* MD2 - [RFC 1319](https://tools.ietf.org/html/rfc1319)
* MD4 - [RFC 6150](https://tools.ietf.org/html/rfc6150)
* MD5 - [RFC 1321](https://tools.ietf.org/html/rfc1321)
* MDC2 - [ISO/IEC 10118-2](https://wiki.openssl.org/index.php/Manual:Mdc2(3))
* RC2 - [RFC 2268](https://tools.ietf.org/html/rfc2268)
* RC4 - [RFC 4345](https://tools.ietf.org/html/rfc4345)
* RC5 - http://people.csail.mit.edu/rivest/Rivest-rc5rev.pdf
* RIPEMD - [ISO/IEC 10118-3](https://webstore.ansi.org/RecordDetail.aspx?sku=ISO%2FIEC%2010118-3:2004)

[developer-program]: https://developer.apple.com/support/compare-memberships/
[submitting-your-app]: https://developer.apple.com/library/mac/documentation/IDEs/Conceptual/AppDistributionGuide/SubmittingYourApp/SubmittingYourApp.html
[nwjs-guide]: https://github.com/nwjs/nw.js/wiki/Mac-App-Store-%28MAS%29-Submission-Guideline#first-steps
[enable-app-sandbox]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html
[create-record]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/CreatingiTunesConnectRecord.html
[electron-osx-sign]: https://github.com/electron-userland/electron-osx-sign
[electron-packager]: https://github.com/electron/electron-packager
[submit-for-review]: https://developer.apple.com/library/ios/documentation/LanguagesUtilities/Conceptual/iTunesConnect_Guide/Chapters/SubmittingTheApp.html
[app-sandboxing]: https://developer.apple.com/app-sandboxing/
[export-compliance]: https://help.apple.com/app-store-connect/#/devc3f64248f
[user-selected]: https://developer.apple.com/library/mac/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW6
[network-access]: https://developer.apple.com/library/ios/documentation/Miscellaneous/Reference/EntitlementKeyReference/Chapters/EnablingAppSandbox.html#//apple_ref/doc/uid/TP40011195-CH4-SW9
