# Yerel Düğüm Modüllerini Kullanmak

Yerel düğüm modülleri Electron tarafından desteklenir , ancak Electron'un sisteminizde kurulu olan Node ikilisinden farklı bir V8 versiyonu kullanması muhtemel olduğundan, yerli modülleri oluştururken Electron'un üstbilgilerinin konumunu elle belirtmeniz gerekir.

## Yerel modüller nasıl kurulabilir

Yerel modülleri kurmanın üç yolu:

### `npm` kullanılıyor

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

## Arıza giderme

Yerel bir modül yüklediyseniz ve çalışmadığını tespit ettiyseniz, aşağıdaki hususları kontrol etmeniz gerekir:

* Modülün mimarisi, Electron'un mimarisiyle (ia32 veya x64) eşleşmelidir.
* Electron'u yükselttikten sonra genellikle modülleri yeniden oluşturmanız gerekir.
* Şüpheniz olduğunda, önce ` elektron yeniden inşa </ 0> 'yı çalıştırın.</li>
</ul>

<h2><code>prebuild`'e dayanan modüller</h2> 
    [`prebuild`](https://github.com/mafintosh/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.
    
    Eğer modüller Electron'da kullanım için ikili dosyalar sağlıyorsa, önceden oluşturulmuş ikili dosyalardan tam avantaj sağlamak için `--build-from-source` ve `npm_config_build_from_source` ortam değişkenlerini dahil etmediğinizden emin olun.
    
    ## `node-pre-gyp`'e dayanan modüller
    
    [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp), yerleşik Node modüllerini önceden oluşturulmuş ikili dosyalarla uygulamanın bir yolunu sunar ve birçok popüler modül bunu kullanmaktadır.
    
    Genellikle bu modüller Elektron altında iyi çalışır , ancak bazen Elektron V8'in Düğümden daha yeni bir sürümünü kullandığında ABI değişiklikleri vardır, kötü şeyler olabilir. Bu nedenle, genel olarak kaynak kodundan yerel modüller oluşturmak önerilir.
    
    `npm` modül yükleme yolunu izliyorsanız, bu varsayılan olarak yapılır, değilse, `--build-from-source`'dan `npm`'ye geçmeniz veya `npm_config_build_from_source` ortam değişkenini ayarlamanız gerekir.