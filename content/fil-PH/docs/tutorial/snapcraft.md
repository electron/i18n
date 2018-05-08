# Snapcraft Guide (Ubuntu Software Center & More)

Ang gabay na ito ay nagbibigay ng impormasyon kung paano i-package ang iyong application sa Electron para sa anumang kapaligiran ng Snapcraft, kabilang ang Ubuntu Software Center.

## Background at Mga Kinakailangan

Kasama ang mas malawak na komunidad ng Linux, ang Canonical ay naglalayong ayusin ang marami sa karaniwang problema sa pag-install ng software sa [`snapcraft`](https://snapcraft.io/) na proyekto. Ang mga snaps ay containerized software packages na kinabibilangan ng kinakailangan ng mga dependency, auto-update, at gumagana sa lahat ng mga pangunahing distribusyon ng Linux nang walang pagbabago ng system.

Mayroong tatlong paraan upang lumikha ng file na `.snap`:

1) Gamit ang [`electron-forge`](https://github.com/electron-userland/electron-forge) o [` electron-builder`](https://github.com/electron-userland/electron-builder), parehong mga tool na may `snap` na suportado sa labas ng kahon. Ito ang pinakamadaling opsyon. 2) Paggamit ng ` electron-installer-snap `, na tumatagal ang output ng ` electron-packager `. 3) Gamit ang nilikha na `.deb` na package.

Sa lahat ng kaso, kakailanganin mong mai-install ang tool na `snapcraft`. Inirerekumenda namin na ang paggawa sa Ubuntu 16.04 (o sa kasalukuyang LTS).

```sh
snap install snapcraft --classic
```

Habang ito ay *is posible *to install`snapcraft ` sa macOS gamit ang Homebrew, ito ay hindi nakakagawa ng mga packages ng `snap ` at nakatuon sa pamamahala ng mga packages sa tindahan.

## Paggamit ng ` electron-installer-snap `

Ang module ay gumagana tulad ng [` electron-winstaller `](https://github.com/electron/windows-installer) at katulad mga module sa saklaw nito ay limitado sa pagbuo ng mga snap na packages. Maaari mong i-install ito sa:

```sh
npm install --save-dev electron-installer-snap
```

### Unang hakbang: Package ng Iyong Application sa Electron

I-package ang application gamit ang [ electron-packager ](https://github.com/electron-userland/electron-packager) (o isang katulad na kasangkapan). Make sure to remove `node_modules` that you don't need in your final application, since any module you don't actually need will increase your application's size.

Ang output ay dapat magmukhang halos katulad nito:

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

### Ikalawang hakbang: Pagpapatakbo ng `electron-installer-snap`

Mula sa terminal na may `snapcraft ` sa `PATH`, patakbuhin ang `electron-installer-snap ` gamit lamang ang kinakailangang parameter `--src `, na kung saan ay ang lokasyon ng iyong packaged na application na electron na nilikha sa unang hakbang.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

Kung mayroon kang isang umiiral na build pipeline, maaari mong gamitin ang ` electron-installer-snap ` sa programming. Para sa higit pang impormasyon, tingnan ang [ Snapcraft API docs ](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## Paggamit ng isang Umiiral na Debian Package

Ang snapcraft ay may kakayahang kumuha ng isang umiiral na `.deb ` file at gwain itong isang file na `.snap `. Ang paglikha ng snap ay isinaayos gamit ang isang ` snapcraft.yaml ` file na naglalarawan ng mga pinagkukunan, mga dependency, paglalarawan, at iba pang mga core building blocks.

### Unang hakbang: Lumikha ng isang Debian Package

Kung wala kang package na `.deb `, gamit ang ` electron-installer-snap ` maaaring maging isang mas madaling landas upang lumikha ng mga package ng snap. Gayunpaman, maraming mga solusyon para sa paglikha ng mga package ng Debian na umiiral, kabilang ang [` elektron-hiling `](https://github.com/electron-userland/electron-forge), [` elektron-tagabuo `](https://github.com/electron-userland/electron-builder) o [` elektron-installer-debian `](https://github.com/unindented/electron-installer-debian).

### Ikalawang hakbang: Gumawa ng snapcraft.yaml

Para sa higit pang impormasyon sa magagamit na mga opsyon sa pagsasaayos, tingnan ang [documentation on the snapcraft syntax ](https://docs.snapcraft.io/build-snaps/syntax). Tingnan natin ang halimbawa:

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

Bilang alternatibo, kung ikaw ay nagtatayo ng iyong ` snap ` na may `strict` na confinement, maaaring mong gamitin ang command na ` desktop-launch`:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```