# Snapcraft Guide (Ubuntu Software Center & More)

Ang gabay na ito ay nagbibigay ng impormasyon kung paano i-package ang iyong application sa Electron para sa anumang kapaligiran ng Snapcraft, kabilang ang Ubuntu Software Center.

## Background at Mga Kinakailangan

Kasama ang mas malawak na komunidad ng Linux, ang Canonical ay naglalayong ayusin ang marami sa karaniwang problema sa pag-install ng software sa [`snapcraft`](https://snapcraft.io/) na proyekto. Ang mga snaps ay containerized software packages na kinabibilangan ng kinakailangan ng mga dependency, auto-update, at gumagana sa lahat ng mga pangunahing distribusyon ng Linux nang walang pagbabago ng system.

Mayroong tatlong paraan upang lumikha ng file na `.snap`:

1) Gamit ang [`electron-forge`][electron-forge] o [` electron-builder`][electron-builder], parehong mga tool na may `snap` na suportado sa labas ng kahon. Ito ang pinakamadaling opsyon. 2) Paggamit ng ` electron-installer-snap `, na tumatagal ang output ng ` electron-packager `. 3) Gamit ang nilikha na `.deb` na package.

In some cases, you will need to have the `snapcraft` tool installed. Instructions to install `snapcraft` for your particular distribution are available [here](https://snapcraft.io/docs/installing-snapcraft).

## Paggamit ng ` electron-installer-snap `

Ang module ay gumagana tulad ng [` electron-winstaller `][electron-winstaller] at katulad mga module sa saklaw nito ay limitado sa pagbuo ng mga snap na packages. Maaari mong i-install ito sa:

```sh
npm install --save-dev electron-installer-snap
```

### Unang hakbang: Package ng Iyong Application sa Electron

I-package ang application gamit ang [ electron-packager ][electron-packager] (o isang katulad na kasangkapan). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

Ang output ay dapat magmukhang halos katulad nito:

```plaintext
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
        ├── resources
        ├── v8_context_snapshot.bin
        └── version
```

### Ikalawang hakbang: Pagpapatakbo ng `electron-installer-snap`

Mula sa terminal na may `snapcraft ` sa `PATH`, patakbuhin ang `electron-installer-snap ` gamit lamang ang kinakailangang parameter `--src `, na kung saan ay ang lokasyon ng iyong packaged na application na electron na nilikha sa unang hakbang.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Kung mayroon kang isang umiiral na build pipeline, maaari mong gamitin ang ` electron-installer-snap ` sa programming. Para sa higit pang impormasyon, tingnan ang [ Snapcraft API docs ][snapcraft-syntax].

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Using `snapcraft` with `electron-packager`

### Step 1: Create Sample Snapcraft Project

Create your project directory and add add the following to `snap/snapcraft.yaml`:

```yaml
name: electron-packager-hello-world
version: '0.1'
summary: Hello World Electron app
description: |
  Simple Hello World Electron app as an example
base: core18
confinement: strict
grade: stable

apps:
  electron-packager-hello-world:
    command: electron-quick-start/electron-quick-start --no-sandbox
    extensions: [gnome-3-34]
    plugs:
    - browser-support
    - network
    - network-bind
    environment:
      # Correct the TMPDIR path for Chromium Framework/Electron to ensure
      # libappindicator has readable resources.
      TMPDIR: $XDG_RUNTIME_DIR

parts:
  electron-quick-start:
    plugin: nil
    source: https://github.com/electron/electron-quick-start.git
    override-build: |
        npm install electron electron-packager
        npx electron-packager . --overwrite --platform=linux --output=release-build --prune=true
        cp -rv ./electron-quick-start-linux-* $SNAPCRAFT_PART_INSTALL/electron-quick-start
    build-snaps:
    - node/14/stable
    build-packages:
    - unzip
    stage-packages:
    - libnss3
    - libnspr4
```

If you want to apply this example to an existing project:

- Replace `source: https://github.com/electron/electron-quick-start.git` with `source: .`.
- Replace all instances of `electron-quick-start` with your project's name.

### Step 2: Build the snap

```sh
$ snapcraft

<output snipped>
Snapped electron-packager-hello-world_0.1_amd64.snap
```

### Step 3: Install the snap

```sh
sudo snap install electron-packager-hello-world_0.1_amd64.snap --dangerous
```

### Step 4: Run the snap

```sh
electron-packager-hello-world
```

## Paggamit ng isang Umiiral na Debian Package

Ang snapcraft ay may kakayahang kumuha ng isang umiiral na `.deb ` file at gwain itong isang file na `.snap `. Ang paglikha ng snap ay isinaayos gamit ang isang ` snapcraft.yaml ` file na naglalarawan ng mga pinagkukunan, mga dependency, paglalarawan, at iba pang mga core building blocks.

### Unang hakbang: Lumikha ng isang Debian Package

Kung wala kang package na `.deb `, gamit ang ` electron-installer-snap ` maaaring maging isang mas madaling landas upang lumikha ng mga package ng snap. Gayunpaman, maraming mga solusyon para sa paglikha ng mga package ng Debian na umiiral, kabilang ang [` elektron-hiling `][electron-forge], [` elektron-tagabuo `][electron-builder] o [` elektron-installer-debian `][electron-installer-debian].

### Ikalawang hakbang: Gumawa ng snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Let's look at an example:

```yaml
name: myApp
version: '2.0.0'
summary: A little description for the app.
paglalarawan: |
 Alam mo ba? Ang app na ito ay kamangha-mangha! Ginagawa nito ang lahat ng mga bagay
 para sa iyo. Ang ilan ay nagsasabi na ito ay nagpapanatili sa iyong kabataan, marahil kahit na masaya.

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

Bilang alternatibo, kung ikaw ay nagtatayo ng iyong ` snap ` na may `strict` na confinement, maaaring mong gamitin ang command na ` desktop-launch`:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```

[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[snapcraft-syntax]: https://docs.snapcraft.io/build-snaps/syntax
[electron-packager]: https://github.com/electron/electron-packager
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-forge]: https://github.com/electron-userland/electron-forge
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
