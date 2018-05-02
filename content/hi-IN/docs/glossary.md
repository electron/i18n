# शब्दावली

इस पेज पर उन कुछ शब्दों को परिभाषित किया गया है, जो इलेक्ट्रॉन के विकास में अक्सर इस्तेमाल किये गये हैं |

### ऐ एस ऐ आर

ऐ एस ऐ आर का मतलब है एटम शैल आर्काइव फॉर्मेट | एक [ऐ एस ऐ आर](https://github.com/electron/asar) आर्काइव, `टार`-जैसा एक सरल फॉर्मेट है जो कि बहुत सारी फाइल्स को एक ही फाइल में जोड़ देता है | इससे इलेक्ट्रॉन बिना पूरी फाइल खोले किसी भी तरह से फाइल्स को पढ़ सकता है |

ऐ एस ऐ आर फॉर्मेट मुख्य रूप से विंडोज पर प्रदर्शन सुधारने के लिए बनाया गया था.... करना है

### ब्राइटरे

ब्राइटरे एक स्थिर लाइब्रेरी [थी](https://github.com/electron-archive/brightray) जिसने [लिब क्रोमियम कंटेंट](#libchromiumcontent) का एप्लीकेशनस में इस्तेमाल करना आसान बनाया था | यह अब हटा दी गयी है और इसका विलय इलेक्ट्रॉन के कोडबेस में कर दिया गया है |

### सीआरटी

सी रन टाइम लाइब्रेरी (सीआरटी), सी++ मानक लाइब्रेरी का एक भाग है जो आईएसओ सी99 मानक लाइब्रेरी को शामिल करती है | विसुअल सी++ लाइब्रेरीज जो सीआरटी का इस्तेमाल करती हैं, वे मूल कोड विकास का समर्थन करती हैं, और दोनों मिश्रित मूल और प्रबंधित कोड का; और शुद्ध प्रबंधित कोड का .एनईटी विकास के लिए |

### डीएमजी

एप्पल डिस्क इमेज एक पैकेजिंग फॉर्मेट है जो मैकओएस द्वारा इस्तेमाल किया जाता है | डीएमजी फाइल्स अक्सर एप्लीकेशन "इनस्टॉलर्स" का वितरण करने के लिए इस्तेमाल की जाती हैं | [इलेक्ट्रॉन -बिल्डर](https://github.com/electron-userland/electron-builder), `डीएमजी` का एक निर्माण लक्ष्य के रूप में समर्थन करता है |

### आईएमई

इनपुट मेथड एडिटर | एक ऐसा प्रोग्राम, जो उपयोगकर्ताओं को उन करैक्टर्स और सिम्बल्स को इस्तेमाल करने की सुविधा देता है, जो कि उनके कीबोर्ड पर उपलब्ध नहीं होते | उदहारण के लिए, ये लैटिन कीबोर्ड के उपयोगकर्ताओं को चीनी, जापानी और इंडिक करैक्टरर्स को इस्तेमाल करने की सुविधा देता है |

### IDL

Interface description language. Write function signatures and data types in a format that can be used to generate interfaces in Java, C++, JavaScript, etc.

### IPC

IPC stands for Inter-Process Communication. Electron uses IPC to send serialized JSON messages between the [main](#main-process) and [renderer](#renderer-process) processes.

### libchromiumcontent

A shared library that includes the [Chromium Content module](https://www.chromium.org/developers/content-module) and all its dependencies (e.g., Blink, [V8](#v8), etc.). Also referred to as "libcc".

- [github.com/electron/libchromiumcontent](https://github.com/electron/libchromiumcontent)

### main process

The main process, commonly a file named `main.js`, is the entry point to every Electron app. It controls the life of the app, from open to close. It also manages native elements such as the Menu, Menu Bar, Dock, Tray, etc. The main process is responsible for creating each new renderer process in the app. The full Node API is built in.

Every app's main process file is specified in the `main` property in `package.json`. This is how `electron .` knows what file to execute at startup.

In Chromium, this process is referred to as the "browser process". It is renamed in Electron to avoid confusion with renderer processes.

See also: [process](#process), [renderer process](#renderer-process)

### MAS

Acronym for Apple's Mac App Store. For details on submitting your app to the MAS, see the [Mac App Store Submission Guide](tutorial/mac-app-store-submission-guide.md).

### Mojo

An IPC system for communicating intra- or inter-process, and that's important because Chrome is keen on being able to split its work into separate processes or not, depending on memory pressures etc.

See https://chromium.googlesource.com/chromium/src/+/master/mojo/README.md

### native modules

Native modules (also called [addons](https://nodejs.org/api/addons.html) in Node.js) are modules written in C or C++ that can be loaded into Node.js or Electron using the require() function, and used just as if they were an ordinary Node.js module. They are used primarily to provide an interface between JavaScript running in Node.js and C/C++ libraries.

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron’s headers when building native modules.

See also [Using Native Node Modules](tutorial/using-native-node-modules.md).

### NSIS

Nullsoft Scriptable Install System is a script-driven Installer authoring tool for Microsoft Windows. It is released under a combination of free software licenses, and is a widely-used alternative to commercial proprietary products like InstallShield. [electron-builder](https://github.com/electron-userland/electron-builder) supports NSIS as a build target.

### OSR

OSR (Off-screen rendering) can be used for loading heavy page in background and then displaying it after (it will be much faster). It allows you to render page without showing it on screen.

### प्रक्रिया

A process is an instance of a computer program that is being executed. Electron apps that make use of the [main](#main-process) and one or many [renderer](#renderer-process) process are actually running several programs simultaneously.

In Node.js and Electron, each running process has a `process` object. This object is a global that provides information about, and control over, the current process. As a global, it is always available to applications without using require().

See also: [main process](#main-process), [renderer process](#renderer-process)

### renderer process

The renderer process is a browser window in your app. Unlike the main process, there can be multiple of these and each is run in a separate process. They can also be hidden.

सामान्य ब्राउज़र्स में, वेब पेजेस अक्सर सैंडबॉक्स वातावरण में चलते हैं और इन्हें मूल संसाधनों तक पहुँच उपलब्ध नहीं होती | पर इलेक्ट्रॉन उपयोगकर्ताओं के पास वेब पेजेज में नोड.जेएस का इस्तेमाल करने की शक्ति होती है, जिससे कि वे ऑपरेटिंग सिस्टम के निचले स्तर की इंटरेक्शन कर सकते हैं |

See also: [process](#process), [main process](#main-process)

### Squirrel

Squirrel is an open-source framework that enables Electron apps to update automatically as new versions are released. See the [autoUpdater](api/auto-updater.md) API for info about getting started with Squirrel.

### userland

This term originated in the Unix community, where "userland" or "userspace" referred to programs that run outside of the operating system kernel. More recently, the term has been popularized in the Node and npm community to distinguish between the features available in "Node core" versus packages published to the npm registry by the much larger "user" community.

Like Node, Electron is focused on having a small set of APIs that provide all the necessary primitives for developing multi-platform desktop applications. This design philosophy allows Electron to remain a flexible tool without being overly prescriptive about how it should be used. Userland enables users to create and share tools that provide additional functionality on top of what is available in "core".

### V8

V8 is Google's open source JavaScript engine. It is written in C++ and is used in Google Chrome. V8 can run standalone, or can be embedded into any C++ application.

Electron builds V8 as part of Chromium and then points Node to that V8 when building it.

V8's version numbers always correspond to those of Google Chrome. Chrome 59 includes V8 5.9, Chrome 58 includes V8 5.8, etc.

- [developers.google.com/v8](https://developers.google.com/v8)
- [nodejs.org/api/v8.html](https://nodejs.org/api/v8.html)
- [docs/development/v8-development.md](development/v8-development.md)

### webview

`webview` tags are used to embed 'guest' content (such as external web pages) in your Electron app. They are similar to `iframe`s, but differ in that each webview runs in a separate process. It doesn't have the same permissions as your web page and all interactions between your app and embedded content will be asynchronous. This keeps your app safe from the embedded content.