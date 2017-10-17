# Security, Native Capabilities, and Your Responsibility

As web developers, we usually enjoy the strong security net of the browser - the risks associated with the code we write are relatively small. Our websites are granted limited powers in a sandbox, and we trust that our users enjoy a browser built by a large team of engineers that is able to quickly respond to newly discovered security threats.

When working with Electron, it is important to understand that Electron is not a web browser. It allows you to build feature-rich desktop applications with familiar web technologies, but your code wields much greater power. JavaScript can access the filesystem, user shell, and more. This allows you to build high quality native applications, but the inherent security risks scale with the additional powers granted to your code.

With that in mind, be aware that displaying arbitrary content from untrusted sources poses a severe security risk that Electron is not intended to handle. In fact, the most popular Electron apps (Atom, Slack, Visual Studio Code, etc) display primarily local content (or trusted, secure remote content without Node integration) – if your application executes code from an online source, it is your responsibility to ensure that the code is not malicious.

## Báo cáo vấn đề bảo mật

For information on how to properly disclose an Electron vulnerability, see [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Vấn đề bảo mật của Chromium và các cập nhật

While Electron strives to support new versions of Chromium as soon as possible, developers should be aware that upgrading is a serious undertaking - involving hand-editing dozens or even hundreds of files. Given the resources and contributions available today, Electron will often not be on the very latest version of Chromium, lagging behind by either days or weeks.

We feel that our current system of updating the Chromium component strikes an appropriate balance between the resources we have available and the needs of the majority of applications built on top of the framework. We definitely are interested in hearing more about specific use cases from the people that build things on top of Electron. Pull requests and contributions supporting this effort are always very welcome.

## Bỏ qua lời khuyên trên

A security issue exists whenever you receive code from a remote destination and execute it locally. As an example, consider a remote website being displayed inside a browser window. If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :warning: Under no circumstances should you load and execute remote code with Node integration enabled. Instead, use only local files (packaged together with your application) to execute Node code. To display remote content, use the `webview` tag and make sure to disable the `nodeIntegration`.

#### Danh sách kiểm tra

Danh sách này không dùng để chống đạn, nhưng ít nhất, bạn nên cố gắng làm theo những điều sau đây:

* Chỉ hiển thị các nội dung an toàn (https)
* Disable the Node integration in all renderers that display remote content (setting `nodeIntegration` to `false` in `webPreferences`)
* Enable context isolation in all renderers that display remote content (setting `contextIsolation` to `true` in `webPreferences`)
* Sử dụng `ses.setPermissionRequestHandler()` trong tất cả các session tải nội dung từ xa
* Không vô hiệu hóa `webSecurity`. Vô hiệu hóa nó sẽ vô hiệu hóa luôn các chính sách có cùng một nguồn gốc.
* Define a [`Content-Security-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) , and use restrictive rules (i.e. `script-src 'self'`)
* [Override and disable `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8) , which allows strings to be executed as code.
* Không đặt `allowRunningInsecureContent` thành true.
* Không bật `experimentalFeatures` hoặc `experimentalCanvasFeatures` trừ khi bạn biết những gì bạn đang làm.
* Không sử dụng `blinkFeatures` trừ khi bạn biết bạn đang làm gì.
* WebViews: Không thêm các thuộc tính `nodeintegration`.
* WebViews: Không sử dụng `disablewebsecurity`
* WebViews: Không sử dụng `allowpopups`
* WebViews: Không sử dụng `insertCSS` hoặc `executeJavaScript` với CSS/JS từ xa.
* WebViews: Verify the options and params of all `<webview>` tags before they get attached using the `will-attach-webview` event:

```js
app.on('web-contents-created', (event, contents) => {
  contents.on('will-attach-webview', (event, webPreferences, params) => {
    // Strip away preload scripts if unused or verify their location is legitimate
    delete webPreferences.preload
    delete webPreferences.preloadURL

    // Disable node integration
    webPreferences.nodeIntegration = false

    // Verify URL being loaded
    if (!params.src.startsWith('https://yourapp.com/')) {
      event.preventDefault()
    }
  })
})
```

Again, this list merely minimizes the risk, it does not remove it. If your goal is to display a website, a browser will be a more secure option.