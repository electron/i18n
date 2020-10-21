# Dystrybuowanie Aplikacji

Aby rozpowszechniać swoją aplikację za pomocą Electrona, musisz ją zapakować i przemarkować. Najprostszym sposobem na to jest korzystanie z jednego z następujących narzędzi do pakowania przez osoby trzecie:

* [electron-forge](https://github.com/electron-userland/electron-forge)
* [electron-builder](https://github.com/electron-userland/electron-builder)
* [electron-packager](https://github.com/electron/electron-packager)

Narzędzia te będą obejmować wszystkie kroki, które należy podjąć, aby ostatecznie doprowadzić do rozproszonych aplikacji Electrona, na przykład zapakowanie aplikacji, przeredagowanie pliku wykonywalnego, ustawienie prawych ikon i opcjonalnie tworzenie instalatorów.

## Ręczna dystrybucja
Możesz również wybrać ręcznie przygotować swoją aplikację do dystrybucji. Działania niezbędne do tego celu przedstawiono poniżej.

Aby rozpowszechniać swoją aplikację za pomocą Electrona, musisz pobrać [wstępnie zbudowane pliki binarne Electrona](https://github.com/electron/electron/releases). Next, the folder containing your app should be named `app` and placed in Electron's resources directory as shown in the following examples. Zauważ, że lokalizacja wstępnie wbudowanych binariuszy Electrona jest wskazana `electron/` w przykładach poniżej.

Na macOS:

```plaintext
electron/Electron.app/Contents/Resources/app/
├── package.json
├── main.js
└── index.html
```

Na systemach Windows i Linux:

```plaintext
electron/resources/app
├── package.json
├── main.js
└── index.html
```

Then execute `Electron.app` (or `electron` on Linux, `electron.exe` on Windows), and Electron will start as your app. The `electron` directory will then be your distribution to deliver to final users.

## Pakowanie Aplikacji do Pliku

Poza wysyłką aplikacji kopiując wszystkie jej pliki źródłowe, możesz również spakować swoją aplikację do archiwum [asar](https://github.com/electron/asar) aby uniknąć pokazania użytkownikom kodu źródłowego twojej aplikacji.

Aby użyć archiwum `asar` aby zastąpić folder `app` , musisz zmienić nazwę archiwum na aplikację `. sar`i umieść go w katalogu zasobów Electrona, jak poniżej, i Electron spróbuje następnie odczytać archiwum i zacząć od niego.

Na macOS:

```plaintext
electron/Electron.app/Contents/Resources/
└── app.asar
```

Na systemach Windows i Linux:

```plaintext
electron/resources/
└── app.asar
```

Więcej szczegółów można znaleźć w [Pakiet aplikacji](application-packaging.md).

## Rebranding z pobranymi binarami

Po połączeniu aplikacji z Electronem będziesz chciał odświeżyć Electron przed dystrybucją jej do użytkowników.

### Windows

Możesz zmienić nazwę `electron.exe` na dowolną nazwę, którą chcesz, i edytować jej ikonę i inne informacje za pomocą narzędzi takich jak [rcedit](https://github.com/electron/rcedit).

### macOS

You can rename `Electron.app` to any name you want, and you also have to rename the `CFBundleDisplayName`, `CFBundleIdentifier` and `CFBundleName` fields in the following files:

* `Electron.app/Contents/Info.plist`
* `Electron.app/Contents/Frameworks/Electron Helper.app/Contents/Info.plist`

You can also rename the helper app to avoid showing `Electron Helper` in the Activity Monitor, but make sure you have renamed the helper app's executable file's name.

Struktura zmienionej nazwy aplikacji byłaby taka:

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

Możesz zmienić nazwę `electron` na dowolną nazwę, którą chcesz.

## Rekonstruowanie Electron ze źródła

Możliwe jest również remarkowanie Electrona poprzez zmianę nazwy produktu i zbudowanie go ze źródła. Aby to zrobić, musisz ustawić argument budowy odpowiadający nazwie produktu (`electron_product_name = "YourProductName"`) w opłatach `. n` plik i przebudowane.

### Tworzenie niestandardowego forku Electron

Stworzenie niestandardowego forku Electron prawie na pewno nie jest czymś, co musisz zrobić aby zbudować swoją aplikację, nawet dla aplikacji „Poziom produkcji”. Używanie narzędzia takiego jak `electron-packer` lub `electron-forge` pozwoli ci "Rebrand" Electron bez konieczności wykonywania tych kroków.

Musisz rozwidlić Electron, gdy masz niestandardowy kod C++, który naklejono bezpośrednio do Electrona, które nie mogą być przesłane lub zostały odrzucone z oficjalnej wersji. Jako opiekunowie Electrona, chcielibyśmy aby Twój scenariusz działał, więc spróbuj jak najmocniej, aby wprowadzić zmiany do oficjalnej wersji Electron, będzie o wiele łatwiej dla Ciebie i doceniamy Twoją pomoc.

#### Tworzenie niestandardowego wydania z budową surfu

1. Zainstaluj [Surf](https://github.com/surf-build/surf), poprzez npm: `npm install -g surf-build@latest`

2. Utwórz nowe wiadro S3 i utwórz następującą pustą strukturę katalogu:

    ```sh
    - electron/
      - symbols/
      - dist/
    ```

3. Ustaw następujące zmienne środowiskowe:

  * `ELECTRON_GITHUB_TOKEN` - a token that can create releases on GitHub
  * `ELECTRON_S3_ACCESS_KEY`, `ELECTRON_S3_BUCKET`, `ELECTRON_S3_SECRET_KEY` - miejsca, w którym wgrasz nagłówki Node.js oraz symbole
  * `ELECTRON_RELEASE` - Ustaw `true` a część przesyłania zostanie uruchomiona, pozostaw nieustawione i `kompilacja operacyjna` wykona kontrole typu CI, odpowiednie do uruchomienia każdego pull requesta.
  * `CI` - Ustaw na `true` lub w przeciwnym razie nie uda się
  * `GITHUB_TOKEN` - ustaw to samo co `ELECTRON_GITHUB_TOKEN`
  * `SURF_TEMP` - ustaw `C:\Temp` w systemie Windows, aby zapobiec zbyt długim problemom ze ścieżką
  * `TARGET_ARCH` - ustaw na `ia32` lub `x64`

4. W `skrypt/upload. y`, _musisz_ ustawić `ELECTRON_REPO` na fork (`MYORG/electron`), zwłaszcza, jeśli jesteś współtwórcą Electrona.

5. `surf-build -r https://github.com/MYORG/electron -s YOUR_COMMIT -n 'surf-PLATFORM-ARCH'`

6. Poczekaj bardzo bardzo dużo czasu dla tej kompilacji do zakończenia.
