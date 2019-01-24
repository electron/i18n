# DevTools Eklentisi

Electron, popüler web yapılarının hata ayıklamasında Devtool'ların yeteneğini genişletmek için kullanılabilen [Chrome DevTools Extension](https://developer.chrome.com/extensions/devtools) destekler.

## DevTools eklentileri nasıl yüklenir

Bu belge bir uzantıyı manuel olarak yükleme işlemini özetliyor. [electron-devtools-installer](https://github.com/GPMDP/electron-devtools-installer), üçüncü parti araç uzantılarını Chrome web mağzasından doğrudan indirmeyi deniyebilirsiniz.

Electron'da bir uzantı yüklemek için Chrome tarayıcısında indirmeniz, dosya sistemi yolunu bulmanız ve ardından `BrowserWindow.addDevToolsExtension (uzantı)` API'sını çağırarak yüklemeniz gerekir.

Örnek olarak [Reaksiyonel geliştirici araçları](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) kullanılabilir:

1. Chrome tarayıcısna yükle.
2. `chrome://extensions`'e gidin ve `fmkadmapgofadopljbjfkapdkoienihi` gibi bir karma dize olan uzantı kimliğini bulun.
3. Uzantıları saklamak için Chrome tarafından kullanılan dosya sistemi konumunu öğrenin: 
    * Windows'ta şu şekildedir `%LOCALAPPDATA%\Google\Chrome\User Data\Default\Extensions`;
    * Linux'ta şu şekilde olabilir: 
        * `~/.config/google-chrome/Default/Extensions/`
        * `~/.config/google-chrome-beta/Default/Extensions/`
        * `~/.config/google-chrome-canary/Default/Extensions/
`
        * `~/.config/chromium/Default/Extensions/`
    * macOS'ta ` ~ / Kütüphane / Uygulama Desteği / Google / Chrome / Varsayılan / Uzantılar </ 0>.</li>
</ul></li>
<li><p>Pass the location of the extension to <code>BrowserWindow.addDevToolsExtension` API, for the React Developer Tools, it is something like:</p> 
        ```javascript
        const path = require('path')
        const os = require('os')
        
        BrowserWindow.addDevToolsExtension(
          path.join(os.homedir(), '/Library/Application Support/Google/Chrome/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/0.15.0_0')
        )
        ```</ol> 
    
    **Not:**`BrowserWindow.addDevToolsExtension` API'sı, uygulama modülünün hazır olayı yayınlanmadan çağrılamaz.
    
    Uzantının adı `BrowserWindow.addDevToolsExtension` tarafından döndürüldü ve uzantının adını kaldırmak için `BrowserWindow.removeDevToolsExtension` API'sine geçirebilirsiniz.
    
    ## Desteklenen DevTools Eklentileri
    
    Elektron yalnızca `chrome.*` API'larının sınırlı bir listesini desteklemektedir; bu nedenle, chrome uzantı özellikleri için desteklenmeyen `chrome.*` API'lerini kullanan bazı uzantılar çalışmayabilir. Devtools Uzantılarının Electron'da çalışma durumu test edilip garanti edilmektedir:
    
    * [Kahraman müfettiş](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
    * [Geliştirici araçları tepkisi](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
    * [Omurga hata ayıklayıcı](https://chrome.google.com/webstore/detail/backbone-debugger/bhljhndlimiafopmmhjlgfpnnchjjbhd)
    * [jQuery hata ayıklayıcısı](https://chrome.google.com/webstore/detail/jquery-debugger/dbhhnnnpaeobfddmlalhnehgclcmjimi)
    * [AngularJS Batarang](https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk)
    * [Vue.js devtools](https://chrome.google.com/webstore/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
    * [Serebral hata ayıklayıcı](https://cerebraljs.com/docs/introduction/debugger.html)
    * [Redux DevTools Eklentisi](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
    * [MobX geliştirici araçları](https://chrome.google.com/webstore/detail/mobx-developer-tools/pfgnfdagidkfgccljigdamigbcnndkod)
    
    ### DevTools Eklentisi çalışmıyorsa ne yap malıyım?
    
    Öncelikle uzantının hala korunduğundan emin olun, hatta bazı uzantıların Chrome tarayıcısının son sürümlerinde bile çalışamaz ve biz onlar için hiçbir şey yapamıyoruz.
    
    Daha sonra Electronların sayı listesinde bir hata dosyası ve uzantısının hangi kısmının beklendiği gibi çalışmadığını belirtin.