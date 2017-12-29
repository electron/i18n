# Yerel Düğüm Modüllerini Kullanmak

The native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed in your system, you have to manually specify the location of Electron's headers when building native modules.

## Yerel modüller nasıl kurulabilir

Yerel modülleri kurmanın üç yolu:

### `npm` kullanılıyor

By setting a few environment variables, you can use `npm` to install modules directly.

An example of installing all dependencies for Electron:

```sh
# Electron'un sürümü.
export npm_config_target=1.2.3
# The architecture of Electron, can be ia32 or x64.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Download headers for Electron.
export npm_config_disturl=https://atom.io/download/electron
# Tell node-pre-gyp that we are building for Electron.
export npm_config_runtime=electron
# Tell node-pre-gyp to build module from source code.
export npm_config_build_from_source=true
# Install all dependencies, and store cache to ~/.electron-gyp.
HOME=~/.electron-gyp npm install
```

### Modülleri kurma ve Elektron için yeniden inşa etme

You can also choose to install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`](https://github.com/paulcbetts/electron-rebuild) package. This module can get the version of Electron and handle the manual steps of downloading headers and building native modules for your app.

An example of installing `electron-rebuild` and then rebuild modules with it:

```sh
npm install --save-dev electron-rebuild

# Every time you run "npm install", run this:
./node_modules/.bin/electron-rebuild

# On Windows if you have trouble, try:
.\node_modules\.bin\electron-rebuild.cmd
```

### Elektron için manuel olarak inşa

Yerli bir modül geliştiren bir geliştiriciyseniz ve Electron'a karşı test etmek istiyorsanız, Electron modülünü manuel olarak yeniden oluşturmak isteyebilirsiniz. You can use `node-gyp` directly to build for Electron:

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

<h2>Modules that rely on <code>prebuild`</h2> 
    [`prebuild`](https://github.com/mafintosh/prebuild) provides a way to easily publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.
    
    If modules provide binaries for the usage in Electron, make sure to omit `--build-from-source` and the `npm_config_build_from_source` environment variable in order to take full advantage of the prebuilt binaries.
    
    ## Modules that rely on `node-pre-gyp`
    
    The [`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp) provides a way to deploy native Node modules with prebuilt binaries, and many popular modules are using it.
    
    Genellikle bu modüller Elektron altında iyi çalışır , ancak bazen Elektron V8'in Düğümden daha yeni bir sürümünü kullandığında ABI değişiklikleri vardır, kötü şeyler olabilir. Bu nedenle, genel olarak kaynak kodundan yerel modüller oluşturmak önerilir.
    
    If you are following the `npm` way of installing modules, then this is done by default, if not, you have to pass `--build-from-source` to `npm`, or set the `npm_config_build_from_source` environment variable.