# Yerel Düğüm Modüllerini Kullanmak

Yerel düğüm modülleri Electron tarafından desteklenir , ancak Electron'un sisteminizde kurulu olan Node ikilisinden farklı bir V8 versiyonu kullanması muhtemel olduğundan, yerli modülleri oluştururken Electron'un üstbilgilerinin konumunu elle belirtmeniz gerekir.

## Yerel modüller nasıl kurulabilir

Yerel modülleri kurmanın üç yolu:

### `npm` kullanarak

Birkaç ortam değişkenini ayarlayarak, `npm` değerini modülleri doğrudan yüklemek için kullanabilirsiniz.

Electron için tüm bağlantıları kurmanın bir örneği:

```sh
# Electron'un sürümü.
npm_config_target=1.2.3 dışa aktar
# Electron mimarisi ia32 or x64 olabilir.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Electron başlıklarını indir.
export npm_config_disturl=https://atom.io/download/electron
# node-pre-gyp'e Electron'u build ettiğimizi belirt.
npm_config_runtime=electron dışarı aktar
# node-pre-gyp modülü ana kod üzerinden yap.
npm_config_build_from_source=true dışa aktar
# Gereklilikleri yükleyiniz, ve önbelleği to ~/.electron-gyp içine saklayın.
HOME=~/.electron-gyp npm yükle
```

### Modülleri kurma ve Elektron için yeniden inşa etme

Ayrıca, diğer Node projeleri gibi modülleri yüklemeyi ve ardından [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild) paketiyle modülleri Electron için yeniden kurmayı seçebilirsiniz. Bu modül Electron versiyonunu ele alabilir ve başlıkları indirmenin otomatik olmayan adımlarını halledebilir ve uygulamanız için yerel modüller oluşturabilir.

`electron-rebuild`'ı kurma ve ardından modülleri onunla yeniden oluşturma örneği:

```sh
npm install --save-dev electron-rebuild

# "npm install"ı çalıştırdığınız her zaman şunu da çalıştırın:
./node_modules/.bin/electron-rebuild

#Windows'ta sorun yaşıyorsanız bunu deneyin:
.\node_modules\.bin\electron-rebuild.cmd
```

### Elektron için manuel olarak inşa

Yerli bir modül geliştiren bir geliştiriciyseniz ve Electron'a karşı test etmek istiyorsanız, Electron modülünü manuel olarak yeniden oluşturmak isteyebilirsiniz. Elektron için inşa etmek için doğrudan `node-gyp` kullanabilirsiniz:

```sh
cd /path-to-module/ HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

`HOME=~/.electron-gyp` geliştirme başlıklarını nerede bulacağınızı değiştirir. `--target=1.2.3` Electron versiyonudur. `--dist-url=...` Başlıkların yükleneceği noktayı belirler. `--arch=x64`: Modül 64bit sistem için kurulmuştur.

### Özel yapım bir Electron sürümü için elle kurulum

Umumi sürümle eşlenmeyen özel Electron sürümlerine yerel Node eklentileri derlemek için `npm`'i paketlediğiniz özel Node'un sürüme ile çalışması için yapılandırın.

```sh
npm rebuild --nodedir=$HOME/.../path/to/electron/vendor/node
```

## Arıza giderme

Yerel bir modül yüklediyseniz ve çalışmadığını tespit ettiyseniz, aşağıdaki hususları kontrol etmeniz gerekir:

- Modülün mimarisi, Electron'un mimarisiyle (ia32 veya x64) eşleşmelidir.
- `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
- Electron'u yükselttikten sonra genellikle modülleri yeniden oluşturmanız gerekir.
- Şüpheniz olduğunda, önce ` elektron yeniden inşa </ 0> 'yı çalıştırın.</li>
</ul>

<h3>A note about <code>win_delay_load_hook`</h3> 
    On Windows, by default, node-gyp links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll` in Electron 4.x. In order to load native modules on Windows, node-gyp installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.
    
    If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook. If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere. If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:
    
    ```text
     link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
         "my_addon.obj" "win_delay_load_hook.obj"
    ```
    
    In particular, it's important that:
    
    - you link against `node.lib` from *Electron* and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
    - you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
    - `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.
    
    See [node-gyp](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.
    
    ## `prebuild`'e dayanan modüller
    
    [`prebuild`](https://github.com/mafintosh/prebuild), Node ve Electron'un birçok sürümü için önceden oluşturulmuş umumi Node modüllerini kolayca yayınlamak için bir yol sağlar.
    
    Eğer modüller Electron'da kullanım için ikili dosyalar sağlıyorsa, önceden oluşturulmuş ikili dosyalardan tam avantaj sağlamak için `--build-from-source` ve `npm_config_build_from_source` ortam değişkenlerini dahil etmediğinizden emin olun.
    
    ## `node-pre-gyp`'e dayanan modüller
    
    [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp), yerleşik Node modüllerini önceden oluşturulmuş ikili dosyalarla uygulamanın bir yolunu sunar ve birçok popüler modül bunu kullanmaktadır.
    
    Genellikle bu modüller Elektron altında iyi çalışır , ancak bazen Elektron V8'in Düğümden daha yeni bir sürümünü kullandığında ABI değişiklikleri vardır, kötü şeyler olabilir. Bu nedenle, genel olarak kaynak kodundan yerel modüller oluşturmak önerilir.
    
    `npm` modül yükleme yolunu izliyorsanız, bu varsayılan olarak yapılır, değilse, `--build-from-source`'dan `npm`'ye geçmeniz veya `npm_config_build_from_source` ortam değişkenini ayarlamanız gerekir.