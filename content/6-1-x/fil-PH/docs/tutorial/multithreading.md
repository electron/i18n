# Multithreading

Sa mga [ nagtra-trabaho ng Web](https://developer.mozilla.org/en/docs/Web/API/Web_Workers_API/Using_web_workers), posibling magpatakbo ng JavaScript sa OS-level threads.

## Multi-threaded Node.js

Posibling gumamit ng mga tampok ng Node.js sa manggagawa ng Electron's Web, upang gawin ito ay ang `nodeIntegrationInWorker` na opsyon ay dapat na itakda sa `true` sa `webPreferences`.

```javascript
let win = new BrowserWindow({
  webPreferences: {
    nodeIntegrationInWorker: true
  }
})
```

Ang `nodeIntegrationInWorker` ay pwedeng gamitin ng nagsasarili sa `nodeIntegration`, pero `sandbox` ay dapat hindi itakda sa `true`.

## Magagamit na APIs

Lahat ng built-in na modyul ng Node.js ay suportado ng manggagawa ng Web, at `asar` archives ay maari paring mabasa gamit ang Node.js APIs. Gayunpaman wala sa mga Electron's built-in modyuls ay maaring gamitin sa multi-threaded na kapaligiran.

## Native Node.js modyuls

Anumang native Node.js modyul ay maaaring i-karga ng direkta sa Web Workers, ngunit mahigpit na inirerekomenda na hindi gawin ito. Kadalasan na umiiral na native modyul ay nakasulat na ipagpapalagay na iisang-threaded na kapaligiran, ang paggamit nila sa Web Workers ay hahantong sa paglagapak at pagsira ng memorya.

Tandaan na kahit na ang native Node.js modyul ay isang thread-safe hindi parin ligtas na ikarga ito sa Web Worker dahil ang `process.dlopen` na ginagawa ay hindi ligtas na thread.

Ang tanging paraan para i-load ang native modyul na ligtas sa ngayon, ay siguraduhin na ang karga ng apps ay walang native modyul simulan ng mga Web Workers.

```javascript
process.dlopen = () => {
  throw new Error('Load native module is not safe')
}
let worker = new Worker('script.js')
```
