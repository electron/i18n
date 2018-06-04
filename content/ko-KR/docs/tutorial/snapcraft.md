# Snapcraft Guide (우분투 소프트웨어 센터 및 기타)

이 가이드는 Ubuntu Software Center를 포함한, 모든 Snapcraft 환경에서 Electron 애플리케이션을 패키징하는 방법에 대한 정보를 제공합니다.

## 배경 및 요구 사항

Canonical은 보다 광범위한 Linux 커뮤니티와 함께 [`snapcraft`](https://snapcraft.io/) 프로젝트의 다양한 일반적인 소프트웨어 설치 문제의 해결을 목적으로 하고 있습니다. 스냅은 필요한 종속성, 자동 업데이트를 포함하는 컨테이너화된 소프트웨어 패키지이며, 시스템 수정 없이 모든 주요 Linux 배포판에서 작동합니다.

`.snap</0 파일을 생성하는 3가지 방법을 소개합니다.</p>

<p>1) <code>snap`과 함께 사용되는 [`electron-forge`](https://github.com/electron-userland/electron-forge) 또는 [`electron-builder`](https://github.com/electron-userland/electron-builder) 두가지 툴 모두 즉시 지원합니다. 이것이 가장 쉬운 방법입니다. 2) `electron-packager`의 결과물을 가지고, `electron-installer-snap`을 사용합니다. 3) 이미 생성된 `.deb` 패키지를 사용합니다.

모든 경우에, `snapcraft`도구를 설치되어 있어야 합니다. Ubuntu 16.04 (또는 현재 LTS 버전) 를 사용하는 것을 권장합니다.

```sh
snap install snapcraft --classic
```

Homebrew를 사용하여 macOS 상에서 `snapcraft`의 설치는 *가능*하지만, `snap`패키지를 빌드할 수는 없으며 저장소의 패키지 관리에 중점을 둡니다.

## `electron-installer-snap` 사용

The module works like [`electron-winstaller`](https://github.com/electron/windows-installer) and similar modules in that its scope is limited to building snap packages. You can install it with:

```sh
npm install --save-dev electron-installer-snap
```

### Step 1: Package Your Electron Application

Package the application using [electron-packager](https://github.com/electron-userland/electron-packager) (or a similar tool). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

The output should look roughly like this:

```text
.
└── dist
    └── app-linux-x64
        ├── LICENSE
        ├── LICENSES.chromium.html
        ├── content_shell.pak
        ├── app
        ├── icudtl.dat
        ├── libgcrypt.so.11
        ├── libnode.so
        ├── locales
        ├── natives_blob.bin
        ├── resources
        ├── snapshot_blob.bin
        └── version
```

### Step 2: Running `electron-installer-snap`

From a terminal that has `snapcraft` in its `PATH`, run `electron-installer-snap` with the only required parameter `--src`, which is the location of your packaged Electron application created in the first step.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

If you have an existing build pipeline, you can use `electron-installer-snap` programmatically. For more information, see the [Snapcraft API docs](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Using an Existing Debian Package

Snapcraft is capable of taking an existing `.deb` file and turning it into a `.snap` file. The creation of a snap is configured using a `snapcraft.yaml` file that describes the sources, dependencies, description, and other core building blocks.

### Step 1: Create a Debian Package

If you do not already have a `.deb` package, using `electron-installer-snap` might be an easier path to create snap packages. However, multiple solutions for creating Debian packages exist, including [`electron-forge`](https://github.com/electron-userland/electron-forge), [`electron-builder`](https://github.com/electron-userland/electron-builder) or [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### Step 2: Create a snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax](https://docs.snapcraft.io/build-snaps/syntax). Let's look at an example:

```yaml
name: myApp
version: '2.0.0'
summary: A little description for the app.
description: |
 You know what? This app is amazing! It does all the things
 for you. Some say it keeps you young, maybe even happy.

grade: stable
confinement: classic

parts:
  slack:
    plugin: dump
    source: my-deb.deb
    source-type: deb
    after:

      - desktop-gtk3
    stage-packages:
      - libasound2
      - libgconf2-4
      - libnotify4
      - libnspr4
      - libnss3
      - libpcre3
      - libpulse0
      - libxss1
      - libxtst6
  electron-launch:
    plugin: dump
    source: files/
    prepare: |
      chmod +x bin/electron-launch

apps:
  myApp:
    command: bin/electron-launch $SNAP/usr/lib/myApp/myApp
    desktop: usr/share/applications/myApp.desktop
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    environment:
      TMPDIR: $XDG_RUNTIME_DIR
```

As you can see, the `snapcraft.yaml` instructs the system to launch a file called `electron-launch`. In this example, it passes information on to the app's binary:

```sh
#!/bin/sh

exec "$@" --executed-from="$(pwd)" --pid=$$ > /dev/null 2>&1 &
```

Alternatively, if you're building your `snap` with `strict` confinement, you can use the `desktop-launch` command:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```