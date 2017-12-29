# इलेक्ट्रॉन दस्तावेज़ीकरण स्टाइलगाइड

ये इलेक्ट्रॉन दस्तावेज़ीकरण के लिए दिशानिर्देश हैं ।

## शीर्षक

* प्रत्येक पेज के शीर्ष पर एकल `#`-स्तर का शीर्षक होना आवश्यक है |
* एक ही पेज पर मौज़ूद अध्यायों के `##`-स्तर के शीर्षक होने आवश्यक हैं ।
* उप-अध्यायों को अपनी नेस्टिंग की गहराई के अनुसार शीर्षक में `#` की संख्या बढ़ाने की जरूरत होगी |
* "की" और "और" जैसे संयोजनों को छोड़कर, पेज के शीर्षक में मौज़ूद सभी शब्दों को कैपिटल में होना चाहिए ।
* अध्याय शीर्षक का केवल पहला शब्द ही कैपिटल में होना चाहिये |

उदहारण के रूप में `त्वरित प्रारंभ` का उपयोग:

```markdown
# त्वरित प्रारंभ 
... 
## मुख्य प्रक्रिया
... 
## रेंदेरेर प्रक्रिया
... 
## अपनी एप्प चलायें 
... 
### वितरण की तरह चलायें 
...
 ### इलेक्ट्रॉन बाइनरी मैन्युअली डाउनलोड की गयी
...
```

ऐपीआई रेफरेन्सेस के लिए, इस नियम के कुछ अपवाद हैं |

## मार्कडाउन नियम

* कोड खण्डों में `cmd` की जगह `sh` का प्रयोग करें (सिंटेक्स हाइलाइटर के कारण)|
* 80 कॉलमस पर पंक्तियाँ व्रैप की जानी चाहिये |
* कोई भी नेस्टिंग सूची 2 स्तर से ज्यादा नहीं होनी चाहिये (मार्कडाउन रेंदेरेर के कारण) |
* सभी `जेएस` और `जावास्क्रिप्ट` कोड खंड [मानक-मार्कडाउन](http://npm.im/standard-markdown) से सूचीबद्ध हैं |

## शब्द चुनना

* जब परिणाम का वर्णन कर रहे हों, तो "विल" की जगह "वुड" का प्रयोग करें |
* "__प्रक्रिया के ऊपर" की बजाये "__प्रक्रिया के अन्दर" को तरजीह दें |

## ऐपीआई रेफरेंस

निम्नलिखित नियम केवल ऐपीआई के दस्तावेज़ीकरण के लिए मान्य हैं |

### पेज शीर्षक

प्रत्येक पेज का शीर्षक उस वास्तविक ऑब्जेक्ट का नाम होना चाहिये जो कि `रिक़ुआइर('इलेक्ट्रॉन')` द्वारा भेजा गया हो, जैसे कि `ब्राउज़रविंडो`, `स्वतःअपडेटर`, और `सेशन` |

पेज शीर्षक के नीचे एक पंक्ति का विवरण होना चाहिये जो कि `>` से शुरू होता हो |

उदहारण के रूप में `सेशन` का उपयोग:

```markdown
#सेशन
> ब्राउज़र सेशन का प्रबंधन, कूकीज, कैश, प्रॉक्सी सेटिंग्स आदि |
```

### मोड्यूल विधि और इवेंट्स

वे मोडयुल्स जो कि क्लासेज नहीं हैं, उनके मेथड्स और इवेंट्स `## मेथड्स` और `## इवेंट्स` अध्याय के नीचे सूचीबद्ध होने चाहियें |

उदहारण के रूप में `स्वतः अपडेटर` का उपयोग:

```markdown
# autoUpdater

## Events

### Event: 'error'

## Methods

### `autoUpdater.setFeedURL(url[, requestHeaders])`
```

### Classes

* API classes or classes that are part of modules must be listed under a `## Class: TheClassName` chapter.
* One page can have multiple classes.
* Constructors must be listed with `###`-level titles.
* [Static Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static) must be listed under a `### Static Methods` chapter.
* [Instance Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Prototype_methods) must be listed under an `### Instance Methods` chapter.
* All methods that have a return value must start their description with "Returns `[TYPE]` - Return description" 
  * If the method returns an `Object`, its structure can be specified using a colon followed by a newline then an unordered list of properties in the same style as function parameters.
* Instance Events must be listed under an `### Instance Events` chapter.
* Instance Properties must be listed under an `### Instance Properties` chapter. 
  * Instance properties must start with "A [Property Type] ..."

Using the `Session` and `Cookies` classes as an example:

```markdown
# session

## Methods

### session.fromPartition(partition)

## Properties

### session.defaultSession

## Class: Session

### Instance Events

#### Event: 'will-download'

### Instance Methods

#### `ses.getCacheSize(callback)`

### Instance Properties

#### `ses.cookies`

## Class: Cookies

### Instance Methods

#### `cookies.get(filter, callback)`
```

### Methods

The methods chapter must be in the following form:

```markdown
### `objectName.methodName(required[, optional]))`

* `required` String - A parameter description.
* `optional` Integer (optional) - Another parameter description.

...
```

The title can be `###` or `####`-levels depending on whether it is a method of a module or a class.

For modules, the `objectName` is the module's name. For classes, it must be the name of the instance of the class, and must not be the same as the module's name.

For example, the methods of the `Session` class under the `session` module must use `ses` as the `objectName`.

The optional arguments are notated by square brackets `[]` surrounding the optional argument as well as the comma required if this optional argument follows another argument:

```sh
required[, optional]
```

Below the method is more detailed information on each of the arguments. The type of argument is notated by either the common types:

* [`String`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)
* [`Number`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)
* [`Object`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
* [`Array`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [`Boolean`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)
* Or a custom type like Electron's [`WebContent`](api/web-contents.md)

If an argument or a method is unique to certain platforms, those platforms are denoted using a space-delimited italicized list following the datatype. Values can be `macOS`, `Windows`, or `Linux`.

```markdown
* `animate` Boolean (optional) _macOS_ _Windows_ - Animate the thing.
```

`Array` type arguments must specify what elements the array may include in the description below.

The description for `Function` type arguments should make it clear how it may be called and list the types of the parameters that will be passed to it.

### Events

The events chapter must be in following form:

```markdown
### Event: 'wake-up'

Returns:

* `time` String

...
```

The title can be `###` or `####`-levels depending on whether it is an event of a module or a class.

The arguments of an event follow the same rules as methods.

### Properties

The properties chapter must be in following form:

```markdown
### session.defaultSession

...
```

The title can be `###` or `####`-levels depending on whether it is a property of a module or a class.

## Documentation Translations

See [electron/electron-i18n](https://github.com/electron/electron-i18n#readme)