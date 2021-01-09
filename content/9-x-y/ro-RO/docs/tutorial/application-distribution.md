# Distribuția aplicației

Pentru a distribui aplicația ta cu Electron, trebuie să o împachetezi și să-l redenumești. Cel mai simplu mod de a face acest lucru este de a utiliza unul dintre următoarele instrumente terțe de ambalare:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [ambalator de electroni](https://github.com/electron/electron-packager)

Aceste instrumente vor avea grijă de toți pașii pe care trebuie să îi faceți pentru a ajunge la o aplicație Electron distribuabilă, cum ar fi împachetarea aplicației, remarcarea executabilului, setarea pictogramelor corecte și, opțional, crearea de instalatori.

## Distribuție manuală
Puteți, de asemenea, să alegeți manual ca aplicația să fie pregătită pentru distribuție. Măsurile necesare în acest sens sunt prezentate mai jos.

Pentru a distribui aplicația ta cu Electron, trebuie să descarci binariile [preconstruite de Electron,](https://github.com/electron/electron/releases). Apoi, dosarul care conține aplicația dvs. ar trebui să fie numit `aplicația` și plasat în directorul de resurse Electron așa cum se arată în următoarele exemple. Țineți cont că locația binarelor preconstruite de Electron este indicată cu `electron/` în exemplele de mai jos.

Pe macOS:

```plaintext
electron/Electron.app/Contents/Resurse/app/
• pachete.json
<unk> · ─ main.js
• ─ index.html
```

Pe Windows și Linux:

```plaintext
electron/resources/app
<unk> • ─ package.json
<unk> • ─ main.js
• ─ index.html
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

## Ambalarea aplicației într-un fișier

În afară de expedierea aplicației tale prin copierea tuturor fișierelor sursă, poți împacheta aplicația ta într-o arhivă [asar](https://github.com/electron/asar) pentru a evita expunerea codului sursă al aplicației tale către utilizatori.

Pentru a folosi o arhivă `asar` pentru a înlocui folderul `app` , trebuie să redenumești arhiva în `aplicație. sar`, și pune-l în directorul de resurse Electron ca dedesubt, și Electron va încerca să citească arhiva și să înceapă de la ea.

Pe macOS:

```plaintext
electron/Electron.app/Conținut/Resurse/
Ribavirin ─ app.asar
```

Pe Windows și Linux:

```plaintext
electron/resources/
<unk> ─ app.asar
```

Mai multe detalii pot fi găsite în [ambalajul aplicației](application-packaging.md).

## Rebranding cu Binare Descărcate

După ce ați împachetat aplicația în Electron, veți dori să remarcați Electron înainte de a o distribui utilizatorilor.

### Ferestre

You can rename `electron.exe` to any name you like, and edit its icon and other information with tools like [rcedit](https://github.com/atom/rcedit).

### macOS

Poți redenumi `Electron. pp` la orice nume dorești și trebuie de asemenea să redenumești `CFBundleDisplayName`, `CFBundleIdentifier` și `CFBundleName` în următoarele fișiere:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

De asemenea, poți redenumi aplicația de ajutor pentru a evita afișarea `Electron Helper` în Monitorizarea Activității dar asigură-te că ai redenumit numele executabil al fișierului al aplicației ajutătoare.

Structura unei aplicații redenumite ar fi:

```plaintext
MyApp.app/Contents
├── Info.plist
├── MacOS/
│   └── MyApp
└── Frameworks/
    └── MyApp Helper.app
        ├── Info.plist
        └── MacOS/
         └── MyApp Helper
```

### Linux

Poți redenumi `electronul` executabil cu orice nume dorești.

## Rebranding prin reconstruirea Electron de la sursă

De asemenea, este posibil să remarcați Electron schimbând numele produsului și construindu-l din sursă. To do this you need to set the build argument corresponding to the product name (`electron_product_name = "YourProductName"`) in the `args.gn` file and rebuild.

### Crearea unei forcuri Electron Personalizate

Crearea unei forcuri personalizate de Electron nu este aproape sigur ceva ce va trebui să faci pentru a-ți construi aplicația, chiar și pentru aplicațiile de nivel de producție. Folosind o unealtă precum `electron-packer` sau `electron-forge` îți va permite să "Rebrand" Electron fără să fie nevoie să faci acești pași.

Trebuie să forjezi Electron când ai codul C++ personalizat pe care l-ai modificat direct în Electron, care fie nu pot fi inaintate, fie a fost respinsa din versiunea oficiala. În calitate de susținători ai Electron, am dori foarte mult să vă facem scenariul să funcționeze. așa că vă rugăm să încercați cât mai greu posibil pentru a obține schimbările în versiunea oficială a Electron, îți va fi mult mai ușor și îți apreciem ajutorul.

#### Crearea unei versiuni personalizate cu surf-build

1. Instalează [Navighează](https://github.com/surf-build/surf), via npm: `npm install -g surf-build@latest`

2. Creați o nouă găleată S3 și creați următoarea structură goală a directorului:

    ```sh
    - electron/
      - simboluri/
      - distanță/
    ```

3. Setați următoarele variabile de mediu:

  * `ELECTRON_GITHUB_TOKEN` - un token care poate crea versiuni pe GitHub
  * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - locul unde vei încărca headers Node.js precum și simboluri
  * `ELECTRON_ELIBERARE` - Setat la `adevărat` și partea de încărcare va rula, lasă nestabilit și `surf-build` va efectua verificări de tip CI, adecvate pentru a rula pentru fiecare pull request.
  * `CI` - Setat la `true` sau va eșua
  * `GITHUB_TOKEN` - setează-l la `ELECTRON_GITHUB_TOKEN`
  * `SURF_TEMP` - setat la `C:\Temp` pe Windows pentru a preveni probleme prea lungi
  * `TARGET_ARCH` - setat la `ia32` sau `x64`

4. In `script/upload.py`, you _must_ set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

5. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Așteaptă foarte, foarte mult timp pentru finalizarea construcției.
