# מדריך לשימוש ב־Snapcraft (מרכז התכנה של אובונטו ועוד)

מדריך זה מספק מידע בנוגע לאריזת יישומי ה־Electron שלך עבור כל סביבת Snapcraft שהיא, לרבות מרכז התכנה של אובונטו.

## רקע ודרישות

בשיתוף עם קהילת הלינוקס הרחבה, מנסה Canonical לתקן כמה שיותר מהבעיות הנפוצות בהתקנת תכניות באמצעות מיזם [`snapcraft`](https://snapcraft.io/). חבילות Snap הן מארזים קטנים של תכניות שכוללים תלויות נדרשות, עדכונים אוטומטיים ויכולים לרוץ על מגוון הפצות לינוקס ללא עריכת שינויים במערכת.

ישנן שלוש דרכים ליצירת קובץ `‎.snap`:

1) בעזרת [`electron-forge`](https://github.com/electron-userland/electron-forge) או [`electron-builder`](https://github.com/electron-userland/electron-builder), שניהם כלים שכוללים תמיכה ב־`snap` באופן מובנה. זאת הדרך הקלה ביותר. 2) בעזרת `electron-installer-snap`, שלוקח את הפלט של `electron-packager`. 3) באמצעות חבילת `.deb` קיימת.

In all cases, you will need to have the `snapcraft` tool installed. We recommend building on Ubuntu 16.04 (or the current LTS).

```sh
snap install snapcraft --classic
```

על אף ש_ניתן_ להתקין את `snapcraft` על macOS בעזרת Homebrew, אין שם אפשרות לבנות חבילות `snap` ועיקר ההתמקדות שם היא על ניהול חבילות בחנות.

## בעזרת `electron-installer-snap`

המודול עובד כמו [`electron-winstaller`](https://github.com/electron/windows-installer) ומודולים דומים בכך שהטווח שלהם מוגבל לבניית חבילות snap. ניתן להתקין אותו באופן הבא:

```sh
npm install --save-dev electron-installer-snap
```

### שלב 1: אריזת יישומון ה־Electron שלך

עליך לארוז את היישום שלך בעזרת [electron-packager](https://github.com/electron-userland/electron-packager) (או כל כלי דומה). מוטב להסיר מ־`node_modules` רכיבים שאינם נחוצים לתוצר הסופי מאחר שכל מודול שאינו נחוץ יגדיל את נפח היישום שלך.

הפלט אמור להיראות פחות או יותר כך:

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
        ├── v8_context_snapshot.bin
        └── version
```

### שלב 2: הרצת `electron-installer-snap`

ממסוף שכולל את `snapcraft` ב־`PATH` שלו, יש להריץ את `electron-installer-snap` עם המשתנה היחידי שנדרש `‎--src`, שהוא המיקום של יישום ה־Electron הארוז שלך שנוצר בשלב הראשון.

```sh
npx electron-installer-snap --src=out/myappname-linux-x64
```

אם יש לך תהליך בנייה מסודר קיים, באפשרותך להשתמש ב־`electron-installer-snap` באופן תכנותי. למידע נוסף, מוטב לעיין ב[תיעוד ה־API של Snapcraft](https://docs.snapcraft.io/build-snaps/syntax).

```js
const snap = require('electron-installer-snap')

snap(options)
  .then(snapPath => console.log(`Created snap at ${snapPath}!`))
```

## שימוש בחבילת דביאן קיימת

ל־Snapcraft יש את היכולת לקחת קובץ `.deb` קיים ולהפוך אותו לקובץ `.snap`. יצירת ה־snap מוגדרת באמצעות קובץ `snapcraft.yaml` שמתאר את המקורות, התלויות, התיאור ואבני ליבה נוספות לבניית התוצר.

### שלב 1: יצירת חבילת דביאן

אם עדיין אין לך חבילת `‎.deb`, יתכן שהשימוש ב־`electron-installer-snap` יקל עליך ביצירת חבילות snap. עם זאת, קיימים מגוון פתרונות ליצירת חבילות דביאן, לרבות [`electron-forge`](https://github.com/electron-userland/electron-forge),‏ [`electron-builder`](https://github.com/electron-userland/electron-builder) או [`electron-installer-debian`](https://github.com/unindented/electron-installer-debian).

### שלב 2: יצירת snapcraft.yaml

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

לחלופין, אם בחירתך היא לבנות את ה־`snap` שלך בתצורת `strict`, ניתן להשתמש בפקודה `desktop-launch`:

```yaml
apps:
  myApp:
    # Correct the TMPDIR path for Chromium Framework/Electron to ensure
    # libappindicator has readable resources.
    command: env TMPDIR=$XDG_RUNTIME_DIR PATH=/usr/local/bin:${PATH} ${SNAP}/bin/desktop-launch $SNAP/myApp/desktop
    desktop: usr/share/applications/desktop.desktop
```
