# Yerel Düğüm Modüllerini Kullanmak

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed on your system, the modules you use will need to be recompiled for Electron. Otherwise, you will get the following class of error when you try to run your app:

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. Please try re-compiling or re-installing
the module (for instance, using `npm rebuild` or `npm install`).
```

## Yerel modüller nasıl kurulabilir

There are several different ways to install native modules:

### Modülleri kurma ve Elektron için yeniden inşa etme

You can install modules like other Node projects, and then rebuild the modules for Electron with the [`electron-rebuild`](https://github.com/electron/electron-rebuild) package. This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app.

For example, to install `electron-rebuild` and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# "npm install"ı çalıştırdığınız her zaman şunu da çalıştırın:
./node_modules/.bin/electron-rebuild

#Windows'ta sorun yaşıyorsanız bunu deneyin:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools, consult the project's README.

### `npm` kullanarak

Birkaç ortam değişkenini ayarlayarak, `npm` değerini modülleri doğrudan yüklemek için kullanabilirsiniz.

For example, to install all dependencies for Electron:

```sh
# Electron'un sürümü.
export npm_config_target=1.2.3
# The architecture of Electron, see https://electronjs.org/docs/tutorial/support#supported-platforms
# for supported architectures.
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

### Elektron için manuel olarak inşa

Yerli bir modül geliştiren bir geliştiriciyseniz ve Electron'a karşı test etmek istiyorsanız, Electron modülünü manuel olarak yeniden oluşturmak isteyebilirsiniz. Elektron için inşa etmek için doğrudan `node-gyp` kullanabilirsiniz:

```sh
cd /path-to-module/ HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

* `HOME=~/.electron-gyp` changes where to find development headers.
* `--target=1.2.3` is the version of Electron.
* `--dist-url=...` specifies where to download the headers.
* `--arch=x64` says the module is built for a 64-bit system.

### Özel yapım bir Electron sürümü için elle kurulum

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## Arıza giderme

If you installed a native module and found it was not working, you need to check the following things:

* Şüpheniz olduğunda, önce ` elektron yeniden inşa </ 0> 'yı çalıştırın.</li>
<li><p spaces-before="0">Make sure the native module is compatible with the target platform and
architecture for your Electron app.</p></li>
<li><p spaces-before="0">Make sure <code>win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.</p>
* Electron'u yükselttikten sonra genellikle modülleri yeniden oluşturmanız gerekir.

### A note about `win_delay_load_hook`

On Windows, by default, `node-gyp` links native modules against `node.dll`. However, in Electron 4.x and higher, the symbols needed by native modules are exported by `electron.exe`, and there is no `node.dll`. In order to load native modules on Windows, `node-gyp` installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

If you get an error like `Module did not self-register`, or `The specified
procedure could not be found`, it may mean that the module you're trying to use did not correctly include the delay-load hook.  If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere.  If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from _Electron_ and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved.
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

See [`node-gyp`](https://github.com/nodejs/node-gyp/blob/e2401e1395bef1d3c8acec268b42dc5fb71c4a38/src/win_delay_load_hook.cc) for an example delay-load hook if you're implementing your own.

## `prebuild`'e dayanan modüller

[`prebuild`](https://github.com/prebuild/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

Eğer modüller Electron'da kullanım için ikili dosyalar sağlıyorsa, önceden oluşturulmuş ikili dosyalardan tam avantaj sağlamak için `--build-from-source` ve `npm_config_build_from_source` ortam değişkenlerini dahil etmediğinizden emin olun.

## `node-pre-gyp`'e dayanan modüller

[`node-pre-gyp` tool](https://github.com/mapbox/node-pre-gyp), yerleşik Node modüllerini önceden oluşturulmuş ikili dosyalarla uygulamanın bir yolunu sunar ve birçok popüler modül bunu kullanmaktadır.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node and/or there are ABI changes, bad things may happen. So in general, it is recommended to always build native modules from source code. `electron-rebuild` handles this for you automatically.

`npm` modül yükleme yolunu izliyorsanız, bu varsayılan olarak yapılır, değilse, `--build-from-source`'dan `npm`'ye geçmeniz veya `npm_config_build_from_source` ortam değişkenini ayarlamanız gerekir.
