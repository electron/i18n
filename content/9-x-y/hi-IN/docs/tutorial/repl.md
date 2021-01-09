# आरईपीएल

रीड-इवल-प्रिंट-लूप (आरईपीएल) एक सरल, इंटरैक्टिव कंप्यूटर प्रोग्रामिंग वातावरण है जो कि एकल उपयोगकर्ता इनपुट्स लेता है (यानी कि एकल एक्सप्रेशंस), उन्हें परखता है, और फिर परिणाम वापस उपयोगकर्ता को भेज देता है |

`आरईपीएल` मोड्यूल एक आरईपीएल उपयोग प्रदान करता है जिस तक पहुँचा जा सकता है इससे:

* मान लीजिये कि `इलेक्ट्रॉन` या `इलेक्ट्रॉन-पुर्वनिर्मित` स्थानीय परियोजना निर्भरता के रूप में इनस्टॉल है:

  ```sh
  ./node_modules/.bin/electron --interactive
  ```
* मान लीजिये कि `इलेक्ट्रॉन` या `इलेक्ट्रॉन-पुर्वनिर्मित` वैश्विक रूप में इनस्टॉल है:

  ```sh
  electron --interactive
  ```

This only creates a REPL for the main process. You can use the Console tab of the Dev Tools to get a REPL for the renderer processes.

**नोट:** `electron --interactive` विंडोज पर उपलब्ध नहीं है |

और अधिक जानकारी [Node.js REPL docs](https://nodejs.org/dist/latest/docs/api/repl.html) पर प्राप्त की जा सकती है |
