# Distribuce aplikací

Chcete-li aplikaci distribuovat pomocí Electronu, musíte ji balit a znovu značit. Nejjednodušší způsob, jak to udělat, je použít jeden z následujících obalových nástrojů třetí strany:

* [elektronová kovárna](https://github.com/electron-userland/electron-forge)
* [elektronický stavitel](https://github.com/electron-userland/electron-builder)
* [elektronický balík](https://github.com/electron/electron-packager)

Tyto nástroje se postarají o všechny kroky, které potřebujete k tomu, abyste skončili s distribuovatelnými aplikacemi Electron. např. balení vaší aplikace, nové označení spustitelného souboru, nastavení správných ikon a volitelně vytváření instalátorů.

## Ruční distribuce
Můžete si také vybrat manuální přípravu vaší aplikace k distribuci. Kroky potřebné k tomu jsou nastíněny níže.

Chcete-li aplikaci distribuovat pomocí Electronu, musíte stáhnout [předkompilované binárky Electronu](https://github.com/electron/electron/releases). Dále, složka obsahující vaši aplikaci by měla být pojmenována `aplikace` a umístěna do adresáře Electronu , jak je zobrazeno v následujících příkladech. Všimněte si, že umístění Předsestavených binárních souborů Electronu je v příkladech uvedeno `elektronickou/` níže.

Na platformě macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Na platformě Windows a Linux:

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

## Balení vaší aplikace do souboru

Kromě odeslání vaší aplikace kopírováním všech jejích zdrojových souborů, můžete také balíček vaší aplikace do archivu [asar](https://github.com/electron/asar) , abyste se vyhnuli vystavení zdrojového kódu vaší aplikace uživatelům.

Chcete-li použít archiv `asar` k nahrazení složky `aplikace` , musíte přejmenovat archiv na aplikaci `. bezpečí`a vložte jej do adresáře zdrojů Electronu, jako je níže, a Electron se pak pokusí přečíst archiv a začít od něj.

Na platformě macOS:

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

Na platformě Windows a Linux:

```plaintext
electron/resources/
└── app.asar
```

Více informací naleznete v [Aplikační obal](application-packaging.md).

## Rebranování se staženými binárními soubory

Po vložení vaší aplikace do Electronu budete chtít znovu značit Electron před tím, než ji budete distribuovat uživatelům.

### Windows

You can rename `electron.exe` to any name you like, and edit its icon and other information with tools like [rcedit](https://github.com/atom/rcedit).

### macOS

Můžete přejmenovat `Electron. pp` na libovolné jméno, které chcete, a také musíte přejmenovat `CFBundleDisplayName`, `pole CFBundleIdentifier` a `CFBundleName` v následujících souborech :

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

Můžete také přejmenovat pomocnou aplikaci, abyste se vyhnuli zobrazování `Electron Helper` v Monitoru aktivity, ale ujistěte se, že jste přejmenovali název souboru aplikace Helper.

Struktura přejmenované aplikace bude:

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

Můžete přejmenovat soubor `electron` na libovolné jméno, které se vám líbí.

## Rebranding obnovou Electronu ze zdroje

Je také možné změnit značku Electron změnou názvu výrobku a jeho vybudování ze zdroje. K tomu je třeba nastavit stavební argument odpovídající názvu produktu (`electron_product_name = "YourProductName"`) v `nákladech. n` soubor a znovu sestaven.

### Vytvoření vlastního rozštěpení Electronu

Vytvoření vlastního forku Electronu téměř jistě není něco, co musíte udělat, abyste mohli vytvořit vaši aplikaci, i pro aplikace "Úroveň výroby". Pomocí nástroje jako `elektron-packager` nebo `elektronická forge` vám umožní "Rebrand" Electron bez nutnosti dělat tyto kroky.

Musíte rozštěpit Electron, když máte vlastní C++ kód, který jste upravili přímo do Electronu, buď nemůže být aktualizován, nebo byl odmítnut z oficiální verze. Jako správci Electronu bychom si velmi přáli aby váš scénář fungoval, prosím, zkuste to co nejvíce, abyste dostali své změny do oficiální verze Electronu, bude to pro vás mnohem jednodušší a oceňujeme vaši pomoc.

#### Vytvoření vlastního vydání pomocí surf-build

1. Nainstalujte [Surf](https://github.com/surf-build/surf)pomocí npm: `npm install -g surf-build@latest`

2. Vytvořit nový S3 kbelík a vytvořit následující prázdnou strukturu adresáře:

    ```sh
    - elektronika/
      - symboly/
      - vzdálenost/
    ```

3. Nastavte následující proměnné prostředí:

  * `ELECTRON_GITHUB_TOKEN` - token, který může vytvářet vydání na GitHub
  * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - místo, kde nahrajete hlavičky Node.js i symboly
  * `ELECTRON_RELEASE` - Nastavte na `true` a bude spuštěna část nahrávání, ponechte odstavení a `surf-build` bude provádět kontroly typu CI, které jsou vhodné pro každý požadavek na natažení .
  * `CI` - Nastavte na `true` nebo jinak selže
  * `GITHUB_TOKEN` - nastavte ho na stejnou úroveň jako `ELECTRON_GITHUB_TOKEN`
  * `SURF_TEMP` - nastavit na `C:\Temp` v systému Windows, aby se zabránilo příliš dlouhým problémům
  * `TARGET_ARCH` - nastaveno na `ia32` nebo `x64`

4. In `script/upload.py`, you _must_ set `ELECTRON_REPO` to your fork (`MYORG/electron`), especially if you are a contributor to Electron proper.

5. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Počkejte velmi, velmi dlouho, než bude sestavení dokončeno.
