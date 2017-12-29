# Güvenlik, Yerli Yetenekler ve Sorumluluklarınız

Web geliştiricileri olarak, genellikle tarayıcının güçlü güvenlik ağının tadını çıkarırız - Yazdığımız kodla ilişkili riskler nispeten azdır. Our websites are granted limited powers in a sandbox, and we trust that our users enjoy a browser built by a large team of engineers that is able to quickly respond to newly discovered security threats.

Elektron ile çalışırken, Elektronun bir web tarayıcısı olmadığını bilmeniz önemlidir. Tanıdık web teknolojileri ile zengin özelliklere sahip masaüstü uygulamaları oluşturmanıza izin verir, ancak kodunuz daha fazla güç sağlar. JavaScript; dosya sistemine, kullanıcı kabuğuna ve daha fazlasına erişebilir. Bu, yüksek kaliteli yerli uygulamalar oluşturmanızı sağlar, ancak doğal güvenlik riskleri kodunuza verilen ek güçlerle ölçeklenir.

Bunu göz önünde bulundurarak, güvenilmeyen kaynaklardan keyfi içeriğin görüntülenmesinin, Electron'un ele alması tasarlanmamış ciddi bir güvenlik riski taşıdığına dikkat edin. In fact, the most popular Electron apps (Atom, Slack, Visual Studio Code, etc) display primarily local content (or trusted, secure remote content without Node integration) – if your application executes code from an online source, it is your responsibility to ensure that the code is not malicious.

## Güvenlik sorunlarını raporlama

For information on how to properly disclose an Electron vulnerability, see [SECURITY.md](https://github.com/electron/electron/tree/master/SECURITY.md)

## Chromium Güvenlik Sorunları ve Yükseltmeleri

Electron, Chromium'un yeni sürümünü mümkün olan en kısa sürede desteklemeye çalışsa da geliştiriciler, düzinelerce veya hatta yüzlerce dosyanın manuel olarak düzenlenmesini içeren ciddi bir girişim olduğunu farkında olmalıdır. Given the resources and contributions available today, Electron will often not be on the very latest version of Chromium, lagging behind by either days or weeks.

Mevcut Chromium bileşenlerini güncellediğimiz sistemin bize sağladığı kaynaklarla çerçeve üzerine inşa edilen çoğu uygulamanın ihtiyaçları arasında doğru dengede olduğuna inanıyoruz. Elektronların üstünde veri üreten insanlardan gelen özel kullanım davaları hakkında daha fazla bilgi almak istiyoruz. Bu çabaları destekleyen çekme talepleri ve katkılar her zaman açığız.

## Ignoring Above Advice

Uzak bir hedeften kod alıp yerel olarak çalıştırdığınızda bir güvenlik sorunu var demektir. Örnek olarak, bir tarayıcı penceresinin içinde görüntülenen uzak bir web sitesini düşünün. If an attacker somehow manages to change said content (either by attacking the source directly, or by sitting between your app and the actual destination), they will be able to execute native code on the user's machine.

> :warning: Under no circumstances should you load and execute remote code with Node integration enabled. Instead, use only local files (packaged together with your application) to execute Node code. To display remote content, use the `webview` tag and make sure to disable the `nodeIntegration`.

#### Kontrol Listesi

Bu kusursuz değildir, ancak en azından aşağıdakileri denemelisiniz:

* Only display secure (https) content
* Disable the Node integration in all renderers that display remote content (setting `nodeIntegration` to `false` in `webPreferences`)
* Enable context isolation in all renderers that display remote content (setting `contextIsolation` to `true` in `webPreferences`)
* Use `ses.setPermissionRequestHandler()` in all sessions that load remote content
* Do not disable `webSecurity`. Disabling it will disable the same-origin policy.
* Define a [`Content-Security-Policy`](http://www.html5rocks.com/en/tutorials/security/content-security-policy/) , and use restrictive rules (i.e. `script-src 'self'`)
* [Override and disable `eval`](https://github.com/nylas/N1/blob/0abc5d5defcdb057120d726b271933425b75b415/static/index.js#L6-L8) , which allows strings to be executed as code.
* Do not set `allowRunningInsecureContent` to true.
* Do not enable `experimentalFeatures` or `experimentalCanvasFeatures` unless you know what you're doing.
* Do not use `blinkFeatures` unless you know what you're doing.
* WebViews: Do not add the `nodeintegration` attribute.
* WebViews: Do not use `disablewebsecurity`
* WebViews: Do not use `allowpopups`
* WebViews: Do not use `insertCSS` or `executeJavaScript` with remote CSS/JS.
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

Yine, bu liste yalnızca riski en aza indirir, kaldırmaz. Amacınız bir web sitesini görüntülemek ise, tarayıcı daha güvenli bir seçenek olacaktır .