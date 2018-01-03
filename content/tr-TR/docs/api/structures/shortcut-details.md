# Kısayol Ayrıntıları Nesnesi

* `hedef` String - Bu kısayoldan başlatılacak hedef.
* `cwd` String (isteğe bağlı) - Çalışma dizini. Varsayılan boştur.
* `args` String (isteğe bağlı) - `Hedefe` uygulanacak bağımsız değişkenler bu kısayoldan başlatılıyor. Varsayılan boştur.
* `Açıklama` Dize (isteğe bağlı) - Kısayolun açıklaması. Varsayılan.
* `icon` String (isteğe bağlı) - icona olan yol, DLL ya da EXE olabilir. `icon` ve `iconIndex` beraber ayarlanmalıdır. Hedefin iconunu kullananın varsayılan değeri boştur.
* `iconIndex` Number (optional) - The resource ID of icon when `icon` is a DLL or EXE. Default is 0.
* `appUserModelId` String (optional) - The Application User Model ID. Default is empty.