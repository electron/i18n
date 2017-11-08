# Electron이 NW.js(node-webkit)와 기술적으로 다른점

**참고: Electron은 Atom Shell의 새로운 이름입니다.**

NW.js 처럼 Electron은 JavaScript와 HTML 그리고 Node 통합 환경을 제공함으로써 웹 페이지에서 저 수준 시스템에 접근할 수 있도록 하여 웹 기반 데스크탑 애플리케이션을 작성할 수 있도록 하는 프레임워크 입니다.

하지만 Electron과 NW.js는 근본적인 개발흐름의 차이도 있습니다:

**1. 애플리케이션의 엔트리 포인트**

In NW.js the main entry point of an application is a web page. You specify a main page URL in the `package.json` and it is opened in a browser window as the application's main window.

In Electron, the entry point is a JavaScript script. Instead of providing a URL directly, you manually create a browser window and load an HTML file using the API. You also need to listen to window events to decide when to quit the application.

Electron works more like the Node.js runtime. Electron's APIs are lower level so you can use it for browser testing in place of [PhantomJS](http://phantomjs.org/).

**2. Build System**

In order to avoid the complexity of building all of Chromium, Electron uses [`libchromiumcontent`](https://github.com/electron/libchromiumcontent) to access Chromium's Content API. `libchromiumcontent` is a single shared library that includes the Chromium Content module and all of its dependencies. Users don't need a powerful machine to build Electron.

**3. Node Integration**

In NW.js, the Node integration in web pages requires patching Chromium to work, while in Electron we chose a different way to integrate the libuv loop with each platform's message loop to avoid hacking Chromium. See the [`node_bindings`](https://github.com/electron/electron/tree/master/atom/common) code for how that was done.

**4. Multi-context**

If you are an experienced NW.js user, you should be familiar with the concept of Node context and web context. These concepts were invented because of how NW.js was implemented.

By using the [multi-context](http://strongloop.com/strongblog/whats-new-node-js-v0-12-multiple-context-execution/) feature of Node, Electron doesn't introduce a new JavaScript context in web pages.

Note: NW.js has optionally supported multi-context since 0.13.