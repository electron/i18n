# 네이티브 노드 모듈 사용하기

Native Node modules are supported by Electron, but since Electron is very likely to use a different V8 version from the Node binary installed on your system, the modules you use will need to be recompiled for Electron. Otherwise, you will get the following class of error when you try to run your app:

```sh
Error: The module '/path/to/native/module.node'
was compiled against a different Node.js version using
NODE_MODULE_VERSION $XYZ. This version of Node.js requires
NODE_MODULE_VERSION $ABC. 모듈을 다시 컴파일하거나 다시 설치해주세요. (예를 들어, `npm rebuild` 나 `npm install` 가 있습니다.)
```

## 네이티브 모듈들을 설치하는 방법

네이티브 모듈을 설치하는 몇 가지 다른 방법이 있습니다.

### 모듈을 설치하고 Electron용으로 다시 빌드하기

다른 노드 프로젝트 처럼 모듈을 설치하고 [`electron-rebuild`](https://github.com/electron/electron-rebuild) 패키지를 사용해서 모듈을 Electron용으로 다시 빌드할 수 있습니다. This module can automatically determine the version of Electron and handle the manual steps of downloading headers and rebuilding native modules for your app.

For example, to install `electron-rebuild` and then rebuild modules with it via the command line:

```sh
npm install --save-dev electron-rebuild

# "npm install"을 실행할 때마다, 이것을 실행하세요:
./node_modules/.bin/electron-rebuild

# Windows에서 문제가 있다면, 이것을 시도해 보세요:
.\node_modules\.bin\electron-rebuild.cmd
```

For more information on usage and integration with other tools, consult the project's README.

### `npm` 사용하기

몇 가지 환경 변수를 설정하여, `npm`을 이용하여 모듈을 바로 설치할 수 있습니다.

For example, to install all dependencies for Electron:

```sh
# Electron의 버전
export npm_config_target=1.2.3
# The architecture of Electron, see https://electronjs.org/docs/tutorial/support#supported-platforms
# for supported architectures.
export npm_config_arch=x64
export npm_config_target_arch=x64
# Electron의 헤더 다운 받기
export npm_config_disturl=https://atom.io/download/electron
# node-pre-gyp에게 Electron을 빌드하고 있다는 것을 알려줍니다.
export npm_config_runtime=electron
# node-pre-gyp에 소스 코드로부터 모듈을 빌드하라고 알려줍니다.
export npm_config_build_from_source=true
# 모든 종속성을 설치하고 ~/.electron-gyp에 캐시 저장하기
HOME=~/.electron-gyp npm install
```

### 수동으로 빌드하기

만약 네이티브 모듈을 개발하는 개발자이며 Electron에서 시험해 보고 싶을 때, 수동으로 Electron을 위한 모듈을 다시 빌드 하고 싶을 수도 있습니다. 직접 `node-gyp`를 사용하여 Electron을 빌드 할 수 있습니다:

```sh
cd /path-to-module/
HOME=~/.electron-gyp node-gyp rebuild --target=1.2.3 --arch=x64 --dist-url=https://atom.io/download/electron
```

* `HOME=~/.electron-gyp` changes where to find development headers.
* `--target=1.2.3` is the version of Electron.
* `--dist-url=...` specifies where to download the headers.
* `--arch=x64` says the module is built for a 64-bit system.

### Manually building for a custom build of Electron

To compile native Node modules against a custom build of Electron that doesn't match a public release, instruct `npm` to use the version of Node you have bundled with your custom build.

```sh
npm rebuild --nodedir=/path/to/electron/vendor/node
```

## 문제 해결

If you installed a native module and found it was not working, you need to check the following things:

* 의심스러운 경우 `electron-rebuild`를 먼저 실행하십시오.
* Make sure the native module is compatible with the target platform and architecture for your Electron app.
* Make sure `win_delay_load_hook` is not set to `false` in the module's `binding.gyp`.
* Electron를 업그레이드 한 후에는 일반적으로 모듈을 다시 빌드해야합니다.

### A note about `win_delay_load_hook`

Windows인 경우에, 기본적으로 `node-gyp`가 네이티브 모듈을 `node.dll`에 링크합니다. 하지만, Electron 4.x 및 그 이상에서는 네이티브 모듈에서 필요한 심볼이 `node.dll`이 아닌 `electron.exe`에서 내보냅니다. In order to load native modules on Windows, `node-gyp` installs a [delay-load hook](https://msdn.microsoft.com/en-us/library/z9h1h6ty.aspx) that triggers when the native module is loaded, and redirects the `node.dll` reference to use the loading executable instead of looking for `node.dll` in the library search path (which would turn up nothing). As such, on Electron 4.x and higher, `'win_delay_load_hook': 'true'` is required to load native modules.

`Module did not self-register`, 혹은 `The specified
procedure could not be found`같은 에러가 발생한다면, delay-load hook을 올바르게 포함하지 않은 상태로 모듈을 사용하려고 한다는 의미입니다.  If the module is built with node-gyp, ensure that the `win_delay_load_hook` variable is set to `true` in the `binding.gyp` file, and isn't getting overridden anywhere.  If the module is built with another system, you'll need to ensure that you build with a delay-load hook installed in the main `.node` file. Your `link.exe` invocation should look like this:

```text
 link.exe /OUT:"foo.node" "...\node.lib" delayimp.lib /DELAYLOAD:node.exe /DLL
     "my_addon.obj" "win_delay_load_hook.obj"
```

In particular, it's important that:

- you link against `node.lib` from _Electron_ and not Node. If you link against the wrong `node.lib` you will get load-time errors when you require the module in Electron.
- you include the flag `/DELAYLOAD:node.exe`. If the `node.exe` link is not delayed, then the delay-load hook won't get a chance to fire and the node symbols won't be correctly resolved..
- `win_delay_load_hook.obj` is linked directly into the final DLL. If the hook is set up in a dependent DLL, it won't fire at the right time.

김기태 kimkitae71

## `prebuild`에 의존하는 모듈

[`prebuild`](https://github.com/prebuild/prebuild) provides a way to publish native Node modules with prebuilt binaries for multiple versions of Node and Electron.

모듈이 Electron에서 사용을 위한 바이너리를 제공한다면 미리 만들어진 바이너리를 최대한 활용하기 위해 `-- build-from-source`와 `npm_config_build_from_source` 환경 변수를 생략해야합니다.

## `node-pre-gyp`에 의존하는 모듈

[`node-pre-gyp`도구](https://github.com/mapbox/node-pre-gyp)는 미리 만들어진 바이너리로 네이티브 노드 모듈을 배포하는 방법을 제공하며 많은 인기 모듈이 이것을 사용하고 있습니다.

Usually those modules work fine under Electron, but sometimes when Electron uses a newer version of V8 than Node and/or there are ABI changes, bad things may happen. So in general, it is recommended to always build native modules from source code. `electron-rebuild` handles this for you automatically.

모듈을 설치 방법인 `npm`을 따르고 있다면, 이것은 기본적으로 수행됩니다. 그렇지 않으면 `--build-from-source`를 `npm`에 전달하거나 또는 `npm_config_build_from_source` 환경 변수를 설정하십시오.
