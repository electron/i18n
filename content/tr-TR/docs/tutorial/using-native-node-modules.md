# Yerel Düğüm Modüllerini Kullanmak

Yerel düğüm modülleri Electron tarafından desteklenir , ancak Electron'un sisteminizde kurulu olan Node ikilisinden farklı bir V8 versiyonu kullanması muhtemel olduğundan, yerli modülleri oluştururken Electron'un üstbilgilerinin konumunu elle belirtmeniz gerekir.

## Yerel modüller nasıl kurulabilir

Yerel modülleri kurmanın üç yolu:

### `npm` kullanılıyor

Birkaç ortam değişkenini ayarlayarak, `npm` değerini modülleri doğrudan yüklemek için kullanabilirsiniz.

An example of installing all dependencies for Electron:

```sh
# Electron'un sürümü.
export npm_config_target=1.2.3
# The architecture of Electron, can be ia32 or x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Electron başlıklarını indir.
export npm_config_disturl=https://atom.io/download/electron
# node-pre-gyp'e Electron'u build ettiğimizi belirt.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Modülleri kurma ve Elektron için yeniden inşa etme

Ayrıca, diğer Node projeleri gibi modülleri yüklemeyi ve ardından [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild) paketiyle modülleri Electron için yeniden kurmayı seçebilirsiniz. Bu modül Elektron versiyonunu ele alabilir ve başlıkları indirmenin otomatik olmayan adımlarını halledebilir ve uygulamanız için yerel modüller oluşturabilir.

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
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

The `HOME=~/.electron-gyp` changes where to find development headers. The `--target=1.2.3` is version of Electron. The `--dist-url=...` specifies where to download the headers. The `--arch=x64` says the module is built for 64bit system.

## Arıza giderme

Yerel bir modül yüklediyseniz ve çalışmadığını tespit ettiyseniz, aşağıdaki hususları kontrol etmeniz gerekir:

* Modülün mimarisi, Electron'un mimarisiyle (ia32 veya x64) eşleşmelidir.
* Electron'u yükselttikten sonra genellikle modülleri yeniden oluşturmanız gerekir.
* Şüpheniz olduğunda, önce ` elektron yeniden inşa </ 0> 'yı çalıştırın.</li>
</ul>

<h2><code>prebuild`'e dayanan modüller</h2> 
    [`prebuild`](https://github.com/mafintosh/prebuild), Node ve Elektronun birden fazla sürümüne yönelik önceden oluşturulmuş ikili dosyalarla yerel Node modüllerini kolayca yayınlamak için bir yol sağlar.
    
    Eğer modüller Electron'da kullanım için ikili dosyalar sağlıyorsa, önceden oluşturulmuş ikili dosyalardan tam avantaj sağlamak için `--build-from-source` ve `npm_config_build_from_source` ortam değişkenlerini dahil etmediğinizden emin olun.
    
    ## `node-pre-gyp`'e dayanan modüller
    
    [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp), yerleşik Node modüllerini önceden oluşturulmuş ikili dosyalarla uygulamanın bir yolunu sunar ve birçok popüler modül bunu kullanmaktadır.
    
    Genellikle bu modüller Elektron altında iyi çalışır , ancak bazen Elektron V8'in Düğümden daha yeni bir sürümünü kullandığında ABI değişiklikleri vardır, kötü şeyler olabilir. Bu nedenle, genel olarak kaynak kodundan yerel modüller oluşturmak önerilir.
    
    `npm` modül yükleme yolunu izliyorsanız, bu varsayılan olarak yapılır, değilse, `--build-from-source`'dan `npm`'ye geçmeniz veya `npm_config_build_from_source` ortam değişkenini ayarlamanız gerekir.