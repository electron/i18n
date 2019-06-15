## Promise 化

Electron チームは現在、Electron のコールバックベースの関数を Promise を返すように変換するイニシアチブを進めています。 この移行期間中は、これらの関数のコールバックバージョンと Promise ベースバージョンの両方が正しく機能し、両方とも文書化されます。

これら更新された関数に対する非推奨の警告を有効にするには、実行時フラグ`process.enablePromiseAPI` を使用します。

影響を受ける機能の大部分が移行されると、このフラグはデフォルトで有効になり、すべての開発者はこれら非推奨の警告を見られるようになります。 その時点で、コールバックベースのバージョンもドキュメントから削除されます。 この文書は、より多くの関数が変換されるにつれて継続的に更新されます。

### 候補の関数

- [app.importCertificate(options, callback)](https://github.com/electron/electron/blob/master/docs/api/app.md#importCertificate)
- [contentTracing.getTraceBufferUsage(callback)](https://github.com/electron/electron/blob/master/docs/api/content-tracing.md#getTraceBufferUsage)
- [dialog.showOpenDialog([browserWindow, ]options[, callback])](https://github.com/electron/electron/blob/master/docs/api/dialog.md#showOpenDialog)
- [dialog.showSaveDialog([browserWindow, ]options[, callback])](https://github.com/electron/electron/blob/master/docs/api/dialog.md#showSaveDialog)
- [dialog.showMessageBox([browserWindow, ]options[, callback])](https://github.com/electron/electron/blob/master/docs/api/dialog.md#showMessageBox)
- [dialog.showCertificateTrustDialog([browserWindow, ]options, callback)](https://github.com/electron/electron/blob/master/docs/api/dialog.md#showCertificateTrustDialog)
- [inAppPurchase.purchaseProduct(productID, quantity, callback)](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md#purchaseProduct)
- [inAppPurchase.getProducts(productIDs, callback)](https://github.com/electron/electron/blob/master/docs/api/in-app-purchase.md#getProducts)
- [netLog.stopLogging([callback])](https://github.com/electron/electron/blob/master/docs/api/net-log.md#stopLogging)
- [protocol.isProtocolHandled(scheme, callback)](https://github.com/electron/electron/blob/master/docs/api/protocol.md#isProtocolHandled)
- [ses.getCacheSize(callback)](https://github.com/electron/electron/blob/master/docs/api/session.md#getCacheSize)
- [ses.clearCache(callback)](https://github.com/electron/electron/blob/master/docs/api/session.md#clearCache)
- [ses.clearStorageData([options, callback])](https://github.com/electron/electron/blob/master/docs/api/session.md#clearStorageData)
- [ses.setProxy(config, callback)](https://github.com/electron/electron/blob/master/docs/api/session.md#setProxy)
- [ses.resolveProxy(url, callback)](https://github.com/electron/electron/blob/master/docs/api/session.md#resolveProxy)
- [ses.clearHostResolverCache([callback])](https://github.com/electron/electron/blob/master/docs/api/session.md#clearHostResolverCache)
- [ses.getBlobData(identifier, callback)](https://github.com/electron/electron/blob/master/docs/api/session.md#getBlobData)
- [ses.clearAuthCache(options[, callback])](https://github.com/electron/electron/blob/master/docs/api/session.md#clearAuthCache)
- [contents.executeJavaScript(code[, userGesture, callback])](https://github.com/electron/electron/blob/master/docs/api/web-contents.md#executeJavaScript)
- [contents.hasServiceWorker(callback)](https://github.com/electron/electron/blob/master/docs/api/web-contents.md#hasServiceWorker)
- [contents.unregisterServiceWorker(callback)](https://github.com/electron/electron/blob/master/docs/api/web-contents.md#unregisterServiceWorker)
- [contents.print([options], [callback])](https://github.com/electron/electron/blob/master/docs/api/web-contents.md#print)
- [contents.printToPDF(options, callback)](https://github.com/electron/electron/blob/master/docs/api/web-contents.md#printToPDF)
- [contents.savePage(fullPath, saveType, callback)](https://github.com/electron/electron/blob/master/docs/api/web-contents.md#savePage)
- [webFrame.executeJavaScript(code[, userGesture, callback])](https://github.com/electron/electron/blob/master/docs/api/web-frame.md#executeJavaScript)
- [webFrame.executeJavaScriptInIsolatedWorld(worldId, scripts[, userGesture, callback])](https://github.com/electron/electron/blob/master/docs/api/web-frame.md#executeJavaScriptInIsolatedWorld)
- [webviewTag.executeJavaScript(code[, userGesture, callback])](https://github.com/electron/electron/blob/master/docs/api/webview-tag.md#executeJavaScript)
- [webviewTag.printToPDF(options, callback)](https://github.com/electron/electron/blob/master/docs/api/webview-tag.md#printToPDF)

### 変換済みの関数

- [app.getFileIcon(path[, options], callback)](https://github.com/electron/electron/blob/master/docs/api/app.md#getFileIcon)
- [contents.capturePage([rect, ]callback)](https://github.com/electron/electron/blob/master/docs/api/web-contents.md#capturePage)
- [contentTracing.getCategories(callback)](https://github.com/electron/electron/blob/master/docs/api/content-tracing.md#getCategories)
- [contentTracing.startRecording(options, callback)](https://github.com/electron/electron/blob/master/docs/api/content-tracing.md#startRecording)
- [contentTracing.stopRecording(resultFilePath, callback)](https://github.com/electron/electron/blob/master/docs/api/content-tracing.md#stopRecording)
- [cookies.flushStore(callback)](https://github.com/electron/electron/blob/master/docs/api/cookies.md#flushStore)
- [cookies.get(filter, callback)](https://github.com/electron/electron/blob/master/docs/api/cookies.md#get)
- [cookies.remove(url, name, callback)](https://github.com/electron/electron/blob/master/docs/api/cookies.md#remove)
- [cookies.set(details, callback)](https://github.com/electron/electron/blob/master/docs/api/cookies.md#set)
- [debugger.sendCommand(method[, commandParams, callback])](https://github.com/electron/electron/blob/master/docs/api/debugger.md#sendCommand)
- [desktopCapturer.getSources(options, callback)](https://github.com/electron/electron/blob/master/docs/api/desktop-capturer.md#getSources)
- [protocol.isProtocolHandled(scheme, callback)](https://github.com/electron/electron/blob/master/docs/api/protocol.md#isProtocolHandled)
- [shell.openExternal(url[, options, callback])](https://github.com/electron/electron/blob/master/docs/api/shell.md#openExternal)
- [webviewTag.capturePage([rect, ]callback)](https://github.com/electron/electron/blob/master/docs/api/webview-tag.md#capturePage)
- [win.capturePage([rect, ]callback)](https://github.com/electron/electron/blob/master/docs/api/browser-window.md#capturePage)