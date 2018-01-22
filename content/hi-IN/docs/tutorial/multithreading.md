# मल्टीथ्रेडिंग

[Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers) के साथ, जावास्क्रिप्ट को ओएस-स्तर के थ्रेड्स में चलाना संभव है |

## मल्टी-थ्रेडेड नोड.जेएस

इलेक्ट्रॉन के वेब वर्कर्स में नोड.जेएस की सुविधाओं को इस्तेमाल करना संभव है, इसके लिए आपको `webPreferences` में `nodeIntegrationInWorker` विकल्प को `true` सेट करना होगा |

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

The `nodeIntegrationInWorker` can be used independent of `nodeIntegration`, but `sandbox` must not be set to `true`.

## Available APIs

All built-in modules of Node.js are supported in Web Workers, and `asar` archives can still be read with Node.js APIs. However none of Electron's built-in modules can be used in a multi-threaded environment.

## Native Node.js modules

Any native Node.js module can be loaded directly in Web Workers, but it is strongly recommended not to do so. Most existing native modules have been written assuming single-threaded environment, using them in Web Workers will lead to crashes and memory corruptions.

Note that even if a native Node.js module is thread-safe it's still not safe to load it in a Web Worker because the `process.dlopen` function is not thread safe.

The only way to load a native module safely for now, is to make sure the app loads no native modules after the Web Workers get started.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```