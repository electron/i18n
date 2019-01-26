# Electron 與 NW.js (原名 node-webkit) 的技術差異

**註: Electron 以前叫做 Atom Shell。**

正如同 NW.js，Electron 亦能透過 JavaScript 與 HTML 開發桌面應用程式，並與 Node 整合提供底層系統的存取能力。

儘管如此，Electron 與 NW.js 在原生技術上完全不同。

**1. 應用程式入口點**

在 NW.js 中，應用程式的主要進入點為網頁或 Javascript。 以瀏覽器開啟在 `package.json` 內預設的 html 或 Javasceript 檔 ，作為應用程式的主視窗 (若預設為 html 檔) 或直接執行 Javascript。

然而 Electron 則直接以 Javascript 作為程式進入點。 用以取代 URL，使您能直接建立一個客製化的瀏覽器視窗，並載入 Electron API 的 HTML 檔。 您亦能透過監聽事件 window events 來決定關閉應用程式的時機。

Electron 的運作方式更像 Node.js。Electron 所提供的 API 能夠直接控制底層系統的功能，您甚至能用它來代替[ PhantomJS ](http://phantomjs.org/)進行瀏覽器測試。

**2. 建置系統**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` is a single shared library that includes the Chromium Content module and all of its dependencies. Users don't need a powerful machine to build Electron.

**3. Node 整合**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**多行文本**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](https://github.com/nodejs/node-v0.x-archive/commit/756b622) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.