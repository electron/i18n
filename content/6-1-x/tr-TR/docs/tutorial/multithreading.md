# Çoklu İşbirimleri

[Web Workers](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers) ile OS-seviyesi iş parçacıklarında JavaScript çalıştırmak mümkündür.

## Çok iş parçacıklı Node.js

Elektron'un Web Workers'ında Node.js özelliklerini kullanmak mümkündür, bunu yapmak için `nodeIntegrationInWorker` seçeneği `webPreferences`'de `true` olarak ayarlanmalıdır.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

`nodeIntegrationInWorker`, `nodeIntegration`'dan bağımsız olarak kullanılabilir, ancak `sandbox`, `true` olarak ayarlanmamalıdır.

## Kullanılabilir API'ler

Node.js'in yerleşik tüm modülleri Web Workers tarafından desteklenir ve `asar` arşivleri hala Node.js API'ları ile okunabilir. Ancak Electron'un hiçbir dahili modülü, çok iş parçacıklı bir ortamda kullanılamaz.

## Yerel Node.js modülleri

Herhangi bir yerel Node.js modülü doğrudan Web İşçileri'ne yüklenebilir, ancak şiddetle tavsiye edilmiyor. Mevcut yerel modüllerin çoğu tek iş parçacıklı ortam varsayılarak yazılmış, onları Web İşçileri'nde kullanmak, çökmeler ve bellek yolsuzluklarına neden olabilir.

`process.dlopen` işlevinin, iş parçacığı güvenliliği olmadığından, yerel bir Node.js modülünün iş parçacığı güvenliliği olsa bile bir Web Workers'a yüklemek için güvenli olmadığını unutmayın.

Şimdilik yerel bir modülü güvenle yüklemenin tek yolu uygulamanın Web Workers çalıştığında yerel modül yüklemediğinden emin olmaktır.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```
