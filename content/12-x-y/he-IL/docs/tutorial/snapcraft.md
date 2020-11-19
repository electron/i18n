# מדריך לשימוש ב־Snapcraft (מרכז התכנה של אובונטו ועוד)

מדריך זה מספק מידע בנוגע לאריזת יישומי ה־Electron שלך עבור כל סביבת Snapcraft שהיא, לרבות מרכז התכנה של אובונטו.

## רקע ודרישות

בשיתוף עם קהילת הלינוקס הרחבה, מנסה Canonical לתקן כמה שיותר מהבעיות הנפוצות בהתקנת תכניות באמצעות מיזם [`snapcraft`](https://snapcraft.io/). חבילות Snap הן מארזים קטנים של תכניות שכוללים תלויות נדרשות, עדכונים אוטומטיים ויכולים לרוץ על מגוון הפצות לינוקס ללא עריכת שינויים במערכת.

ישנן שלוש דרכים ליצירת קובץ `‎.snap`:

1) בעזרת [`electron-forge`][electron-forge] או [`electron-builder`][electron-builder], שניהם כלים שכוללים תמיכה ב־`snap` באופן מובנה. זאת הדרך הקלה ביותר. 2) בעזרת `electron-installer-snap`, שלוקח את הפלט של `electron-packager`. 3) באמצעות חבילת `.deb` קיימת.

In some cases, you will need to have the `snapcraft` tool installed. Instructions to install `snapcraft` for your particular distribution are available [here](https://snapcraft.io/docs/installing-snapcraft).

## בעזרת `electron-installer-snap`

המודול עובד כמו [`electron-winstaller`][electron-winstaller] ומודולים דומים בכך שהטווח שלהם מוגבל לבניית חבילות snap. ניתן להתקין אותו באופן הבא:

```sh
npm install --save-dev electron-installer-snap
```

### שלב 1: אריזת יישומון ה־Electron שלך

עליך לארוז את היישום שלך בעזרת [electron-packager][electron-packager] (או כל כלי דומה). מוטב להסיר מ־`node_modules` רכיבים שאינם נחוצים לתוצר הסופי מאחר שכל מודול שאינו נחוץ יגדיל את נפח היישום שלך.

הפלט אמור להיראות פחות או יותר כך:

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

### שלב 2: הרצת `electron-installer-snap`

ממסוף שכולל את `snapcraft` ב־`PATH` שלו, יש להריץ את `electron-installer-snap` עם המשתנה היחידי שנדרש `‎--src`, שהוא המיקום של יישום ה־Electron הארוז שלך שנוצר בשלב הראשון.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

אם יש לך תהליך בנייה מסודר קיים, באפשרותך להשתמש ב־`electron-installer-snap` באופן תכנותי. למידע נוסף, מוטב לעיין ב[תיעוד ה־API של Snapcraft][snapcraft-syntax].

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

## שימוש בחבילת דביאן קיימת

ל־Snapcraft יש את היכולת לקחת קובץ `.deb` קיים ולהפוך אותו לקובץ `.snap`. יצירת ה־snap מוגדרת באמצעות קובץ `snapcraft.yaml` שמתאר את המקורות, התלויות, התיאור ואבני ליבה נוספות לבניית התוצר.

### שלב 1: יצירת חבילת דביאן

אם עדיין אין לך חבילת `‎.deb`, יתכן שהשימוש ב־`electron-installer-snap` יקל עליך ביצירת חבילות snap. עם זאת, קיימים מגוון פתרונות ליצירת חבילות דביאן, לרבות [`electron-forge`][electron-forge],‏ [`electron-builder`][electron-builder] או [`electron-installer-debian`][electron-installer-debian].

### שלב 2: יצירת snapcraft.yaml

For more information on the available configuration options, see the [documentation on the snapcraft syntax][snapcraft-syntax]. Let's look at an example:

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

לחלופין, אם בחירתך היא לבנות את ה־`snap` שלך בתצורת `strict`, ניתן להשתמש בפקודה `desktop-launch`:

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
[electron-builder]: https://github.com/electron-userland/electron-builder
[electron-installer-debian]: https://github.com/unindented/electron-installer-debian
[electron-winstaller]: https://github.com/electron/windows-installer
